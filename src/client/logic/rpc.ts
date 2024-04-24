import { createRPCClient } from 'vite-dev-rpc'
import type { BirpcReturn } from 'birpc'
import { createHotContext } from 'vite-hot-client'
import type { RPCFunctions } from '../../types'
import { refetch } from './state'

export const isStaticMode = document.body.getAttribute('data-vite-inspect-mode') === 'BUILD'

function createStaticRpcClient(): RPCFunctions {
  return {
    list: async () => {
      return await fetch('./reports/list.json').then(r => r.json())
    },
    moduleUpdated() {},
  }
}

export const rpc = isStaticMode
  ? createStaticRpcClient() as BirpcReturn<RPCFunctions>
  : createRPCClient<RPCFunctions, Pick<RPCFunctions, 'moduleUpdated'>>('vite-plugin-mpa-inspect', (await createHotContext('/___', `${location.pathname.split('/__inspect_mpa')[0] || ''}/`.replace(/\/\//g, '/')))!, {
    moduleUpdated() {
      refetch()
    },
  })
