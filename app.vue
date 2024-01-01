<script setup lang="ts">
import type { Link, Results } from './models/result'

interface ResultState {
  left: Link[]
  right: Link[]
  isLoading: boolean
}

const API_URL = 'https://store.playstation.com/store/api/chihiro/00_09_000/tumbler'
const params = new URLSearchParams({
  gameContentType: 'games',
})

const search = ref<string>('')
const results = ref<ResultState>({ left: [], right: [], isLoading: false })

watch(search, debounce(async () => {
  results.value.isLoading = true
  const left: Promise<Results> = fetch(`${API_URL}/tr/tr/999/${search.value}?${params}`).then(res => res.json())
  const right: Promise<Results> = fetch(`${API_URL}/ru/ru/999/${search.value}?${params}`).then(res => res.json())
  try {
    const [leftRes, rightRes] = await Promise.allSettled([left, right])
    if (leftRes.status === 'fulfilled')
      results.value.left = leftRes.value?.links ?? []
    if (rightRes.status === 'fulfilled')
      results.value.right = rightRes.value?.links ?? []
    results.value.isLoading = false
  }
  catch (error) {
    console.error('fetch results error', error)
    results.value.isLoading = false
  }
}, 500))
</script>

<template>
  <UInput
    v-model="search" class="border-gray-200" icon="i-heroicons-magnifying-glass-20-solid" size="xl"
    placeholder="Search..." autocomplete="off" :ui="{ icon: { trailing: { pointer: '' } } }"
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
