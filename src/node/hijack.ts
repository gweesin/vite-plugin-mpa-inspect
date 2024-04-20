import type { ObjectHook, ResolveIdResult, TransformResult } from 'rollup'
import type { Plugin } from 'vite'
import Debug from 'debug'
import type { ViteInspectContext } from './context'

const debug = Debug('vite-plugin-mpa-inspect')

type HookHandler<T> = T extends ObjectHook<infer F> ? F : T
type HookWrapper<K extends keyof Plugin> = (
  fn: NonNullable<HookHandler<Plugin[K]>>,
  context: ThisParameterType<NonNullable<HookHandler<Plugin[K]>>>,
  args: NonNullable<Parameters<HookHandler<Plugin[K]>>>,
  order: string
) => ReturnType<HookHandler<Plugin[K]>>

function hijackHook<K extends keyof Plugin>(plugin: Plugin, name: K, wrapper: HookWrapper<K>) {
  if (!plugin[name])
    return

  debug(`hijack plugin "${name}"`, plugin.name)

  // @ts-expect-error future
  let order = plugin.order || plugin.enforce || 'normal'

  const hook = plugin[name] as any
  if ('handler' in hook) {
    // rollup hook
    const oldFn = hook.handler
    order += `-${hook.order || hook.enforce || 'normal'}`
    hook.handler = function (this: any, ...args: any) {
      return wrapper(oldFn, this, args, order)
    }
  }
  else if ('transform' in hook) {
    // transformIndexHTML
    const oldFn = hook.transform
    order += `-${hook.order || hook.enforce || 'normal'}`
    hook.transform = function (this: any, ...args: any) {
      return wrapper(oldFn, this, args, order)
    }
  }
  else {
    // vite hook
    const oldFn = hook
    plugin[name] = function (this: any, ...args: any) {
      return wrapper(oldFn, this, args, order)
    }
  }
}

export function hijackPlugin(
  plugin: Plugin,
  ctx: ViteInspectContext,
) {
  hijackHook(plugin, 'transform', async (fn, context, args) => {
    let _result: TransformResult
    let error: any

    try {
      _result = await fn.apply(context, args)
    }
    catch (_err) {
      error = _err
    }

    if (error)
      throw error

    return _result
  })

  hijackHook(plugin, 'load', async (fn, context, args) => {
    let _result: TransformResult
    let error: any

    try {
      _result = await fn.apply(context, args)
    }
    catch (err) {
      error = err
    }
    if (error)
      throw error

    return _result
  })

  hijackHook(plugin, 'resolveId', async (fn, context, args) => {
    const id = args[0]
    const ssr = args[2]?.ssr

    let _result: ResolveIdResult
    let error: any

    const start = Date.now()
    try {
      _result = await fn.apply(context, args)
    }
    catch (err) {
      error = err
    }
    const end = Date.now()

    const result = error ? stringifyError(error) : (typeof _result === 'object' ? _result?.id : _result)

    if (result && result !== id) {
      ctx
        .getRecorder(ssr)
        .recordResolveId(id, {
          name: plugin.name,
          result,
          start,
          end,
          error,
        })
    }

    if (error)
      throw error

    return _result
  })
}

function stringifyError(err: any) {
  return String(err.stack ? err.stack : err)
}
