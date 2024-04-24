import type { Awaitable } from '@antfu/utils'

export interface EntriesList {
  root: string
  entries: EntryInfo[]
}

export interface EntryInfo {
  entryName: string
  entryPath: string
}

export interface RPCFunctions {
  list: () => Awaitable<EntriesList>
  moduleUpdated: () => void
}

export interface HMRData {
  ids: (string | null)[]
}
