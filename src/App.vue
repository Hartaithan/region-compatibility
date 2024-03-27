<script setup lang="ts">
import { provide, ref } from 'vue'
import { Search } from 'lucide-vue-next'
import { debounce } from './utils/debounce'
import { Input } from './components/ui/input'
import { Spinner } from './components/ui/spinner'
import type { Link, Results } from './models/result'
import type { CompareProvider, CompareState, CompareTarget } from './models/compare'
import ResultList from './components/layout/ResultList.vue'
import ComparisonView from './components/layout/ComparisonView.vue'
import { Select } from './components/ui/select'
import RegionOptions from './components/layout/RegionOptions.vue'

interface ResultState {
  left: Link[] | null
  right: Link[] | null
  isLoading: boolean
}

interface RegionsState {
  left: string
  right: string
}

const API_URL = import.meta.env.VITE_API_URL as string
const params = new URLSearchParams({ gameContentType: 'games' })

const search = ref<string>('')
const results = ref<ResultState>({ left: null, right: null, isLoading: false })
const compare = ref<CompareState>({ left: null, right: null })
const regions = ref<RegionsState>({ left: 'tr:tr', right: 'ru:ru' })

function formatRegion(value: string) {
  const [language, country] = value.split(':')
  return `${country}/${language}`
}

const fetchResults = debounce(async () => {
  results.value.isLoading = true
  const left: Promise<Results> = fetch(`${API_URL}/${formatRegion(regions.value.left)}/999/${search.value}?${params}`).then(res => res.json())
  const right: Promise<Results> = fetch(`${API_URL}/${formatRegion(regions.value.right)}/999/${search.value}?${params}`).then(res => res.json())
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

function handleSearch(event: Event) {
  const { value } = event.target as HTMLInputElement
  if (value.trim().length === 0)
    resetState()
  else
    fetchResults()
}

provide<CompareProvider>('compare', {
  compare,
  setCompare,
})
</script>

<template>
  <div class="relative w-full items-center">
    <Input id="search" v-model="search" type="text" placeholder="Search..." class="pl-11" @input="handleSearch" />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3 pointer-events-none">
      <Spinner v-if="results.isLoading" />
      <Search v-else class="size-5 text-muted-foreground" />
    </span>
  </div>
  <div class="flex w-full gap-3 md:gap-4">
    <Select v-model="regions.left">
      <RegionOptions />
    </Select>
    <Select v-model="regions.right">
      <RegionOptions />
    </Select>
  </div>
  <div class="flex flex-col md:flex-row grow h-16 w-full gap-3 md:gap-4">
    <ResultList :data="results.left" target="left" />
    <ResultList :data="results.right" target="right" />
  </div>
  <ComparisonView :compare="compare" />
</template>
