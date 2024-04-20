import { useStorage } from '@vueuse/core'
import { computed } from 'vue'
import Fuse from 'fuse.js'
import { list } from './state'

export const searchText = useStorage('vite-inspect-search-text', '')
export const exactSearch = useStorage('vite-inspect-exact-search', false)

export const searchResults = computed(() => {
  const data = list.value?.entries || []

  if (!searchText.value)
    return data

  if (exactSearch.value) {
    return data.filter(item =>
      item.entryName.includes(searchText.value)
      || item.entryPath.includes(searchText.value),
    )
  }
  else {
    const fuse = new Fuse(data, {
      shouldSort: true,
      keys: ['entryName', 'entryPath'],
    })
    return fuse.search(searchText.value).map(i => i.item)
  }
})
