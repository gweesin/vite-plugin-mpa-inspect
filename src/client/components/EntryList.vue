<script setup lang="ts">
import type { EntryInfo } from '../../types'
import { listMode, searchText } from '../logic'

const props = defineProps<{
  entries: EntryInfo[]
  root: string
}>()

const fullPathEntries = computed(() => props.entries.map(e => ({
  ...e,
  entryPath: e.entryPath.replace(/\\/g, '/').replace(props.root, ''),
})))

const { list, containerProps, wrapperProps } = useVirtualList(
  fullPathEntries,
  {
    itemHeight: listMode.value === 'detailed' ? 53 : 37,
  },
)
</script>

<template>
  <div v-if="entries" class="h-full">
    <div v-if="!entries.length" px-6 py-4 italic op50>
      <div v-if="searchText">
        No search result
      </div>
      <div v-else>
        No module recorded yet, visit
        <a href="/" target="_blank">your app</a> first and then refresh this
        page.
      </div>
    </div>

    <div v-else v-bind="containerProps" class="h-full">
      <div v-bind="wrapperProps">
        <a
          v-for="m in list"
          :key="m.data.entryPath"
          class="block cursor-pointer border-b border-main px-3 py-2 text-left text-sm font-mono"
          :href="m.data.entryPath === 'index.html' ? '/' : m.data.entryPath"
        >
          <div v-if="listMode === &quot;detailed&quot;" text-xs flex="~ gap-1">
            {{ m.data.entryName }}
            <div flex-auto />
            <span op75>
              {{ m.data.entryPath }}
            </span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
