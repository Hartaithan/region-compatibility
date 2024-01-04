<script setup lang="ts">
import type { CompareProvider, CompareState, CompareTarget } from './models/compare'
import type { Link, Results } from './models/result'

interface ResultState {
  left: Link[] | null
  right: Link[] | null
  isLoading: boolean
}

const runtimeConfig = useRuntimeConfig()
const API_URL = runtimeConfig.public.baseURL as string
const params = new URLSearchParams({ gameContentType: 'games' })

const search = ref<string>('')
const results = ref<ResultState>({ left: null, right: null, isLoading: false })
const compare = ref<CompareState>({ left: null, right: null })

const fetchResults = debounce(async () => {
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
}, 700)

function resetState() {
  results.value.left = null
  results.value.right = null
  results.value.isLoading = false
}

function setCompare(target: CompareTarget, value: Link | null) {
  compare.value[target] = value
}

provide<CompareProvider>('compare', {
  compare,
  setCompare,
})

watch(search, () => {
  if (search.value.trim().length === 0)
    resetState()
  else
    fetchResults()
})
</script>

<template>
  <UInput
    v-model="search" :loading="results.isLoading" class="border-gray-200"
    icon="i-heroicons-magnifying-glass-20-solid" size="xl" placeholder="Search..." autocomplete="off"
    :ui="{ icon: { trailing: { pointer: '' } } }"
  >
    <template #trailing>
      <UButton
        v-show="search !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid" :padded="false"
        @click="search = ''"
      />
    </template>
  </UInput>
  <div class="flex grow h-16 w-full gap-3 md:gap-4">
    <ResultList :data="results.left" target="left" />
    <ResultList :data="results.right" target="right" />
  </div>
  <ComparisonView :compare="compare" />
</template>
