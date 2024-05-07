<script setup lang="ts">
import { exactSearch, openNewPage, searchText } from '../logic'
</script>

<template>
  <input
    v-model="searchText"
    type="text"
    class="border border-main rounded bg-transparent px-3 py-1 !outline-none"
    placeholder="Search..."
  >
  <div class="h-min flex flex-col select-none gap-1 whitespace-nowrap text-xs">
    <div class="flex gap-2">
      <label class="flex">
        <input v-model="exactSearch" type="checkbox" class="my-auto">
        <div class="ml-1">exact search</div>
      </label>

      <label class="flex">
        <input v-model="openNewPage" type="checkbox" class="my-auto">
        <div class="ml-1">open in new page</div>
      </label>
    </div>
  </div>
</template>
