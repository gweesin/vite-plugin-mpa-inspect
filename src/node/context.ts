import path from 'node:path'
import type { ResolvedConfig, ViteDevServer } from 'vite'
import type { InputOption } from 'rollup'
import type { EntryInfo } from '../types'

export class ViteInspectContext {
  public config: ResolvedConfig = undefined!

  constructor(public options: any) {
  }

  // eslint-disable-next-line unused-imports/no-unused-vars
  getList(server: ViteDevServer) {
    return {
      root: this.config.root,
      entries: this.getEntriesInfo(this.config.build.rollupOptions.input),
    }
  }

  getEntriesInfo(
    rollupInput?: InputOption,
  ) {
    if (!rollupInput) {
      return [{
        entryName: 'index',
        entryPath: 'index.html',
      }]
    }

    if (typeof rollupInput === 'string') {
      return [{
        entryName: path.basename(rollupInput, '.html'),
        entryPath: rollupInput,
      }] as EntryInfo[]
    }

    if (Array.isArray(rollupInput)) {
      return rollupInput.map(id => ({
        entryName: path.basename(id, '.html'),
        entryPath: id,
      })) as EntryInfo[]
    }

    return Object.entries(rollupInput).map(([entryName, entryPath]) => ({
      entryName,
      entryPath,
    })) as EntryInfo[]
  }
}
