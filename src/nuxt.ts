import { addVitePlugin, defineNuxtModule } from '@nuxt/kit'
import type { Options } from './node'
import Inspect from './node'

export default defineNuxtModule<Options>({
  meta: {
    name: 'vite-plugin-mpa-inspect',
    configKey: 'inspect',
  },
  setup(options) {
    addVitePlugin(() => Inspect(options))
  },
}) as any
