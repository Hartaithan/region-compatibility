<script setup lang="ts">
import type { Link, Results } from './models/result'

interface ResultState {
  left: Link[]
  right: Link[]
  isLoading: boolean
}

const search = ref<string>('')
const results = ref<ResultState>({ left: [], right: [], isLoading: false })

watch(search, debounce(async () => {
  results.value.isLoading = true
  const left = await fetch(`https://store.playstation.com/store/api/chihiro/00_09_000/tumbler/tr/tr/999/${search.value}`)
  const data: Results = await left.json()
  results.value.left = data?.links || []
}, 500))
</script>

<template>
  <UInput
    v-model="search" class="border-gray-200" icon="i-heroicons-magnifying-glass-20-solid" size="xl"
    placeholder="Search..."
    autocomplete="off" :ui="{ icon: { trailing: { pointer: '' } } }"
  >
    <template #trailing>
      <UButton
        v-show="search !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid" :padded="false"
        @click="search = ''"
      />
    </template>
  </UInput>
  <div class="flex grow w-full gap-4">
    <ResultList :data="results.left" />
    <ResultList :data="results.right" />
  </div>
  <ComparisonView />
</template>
