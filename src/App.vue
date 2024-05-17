<script setup lang="ts">
import { type Ref, provide, ref } from 'vue'
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

interface LoadersState {
  input: boolean
  left: boolean
  right: boolean
}

interface ResultState {
  left: Link[] | null
  right: Link[] | null
}

interface RegionsState {
  left: string
  right: string
}

const API_URL = import.meta.env.VITE_API_URL as string
const params = new URLSearchParams({ gameContentType: 'games' })

const search = ref<string>('')
const loaders = ref<LoadersState>({ input: false, left: false, right: false })
const results = ref<ResultState>({ left: null, right: null })
const compare = ref<CompareState>({ left: null, right: null })
const regions = ref<RegionsState>({ left: 'tr:tr', right: 'ru:ru' })

function formatRegion(value: string) {
  const [language, country] = value.split(':')
  return `${country}/${language}`
}

function getSearchRequest(region: string, search: string, params: URLSearchParams) {
  return fetch(`${API_URL}/${formatRegion(region)}/999/${search}?${params}`).then(res => res.json())
}

function handleStateValue<T>(state: Ref<Record<string, T>>, value: T) {
  for (const key in state.value)
    state.value[key] = value
}

const fetchResults = debounce(async () => {
  handleStateValue(loaders, true)
  const left: Promise<Results> = getSearchRequest(regions.value.left, search.value, params)
  const right: Promise<Results> = getSearchRequest(regions.value.right, search.value, params)
  try {
    const [leftRes, rightRes] = await Promise.allSettled([left, right])
    if (leftRes.status === 'fulfilled')
      results.value.left = leftRes.value?.links ?? []
    if (rightRes.status === 'fulfilled')
      results.value.right = rightRes.value?.links ?? []
    handleStateValue(loaders, false)
  }
  catch (error) {
    console.error('fetch results error', error)
    handleStateValue(loaders, false)
  }
}, 700)

function resetState() {
  handleStateValue<Link[] | null>(results, null)
  handleStateValue(loaders, false)
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

async function handleRegion(value: string, field: 'left' | 'right') {
  if (search.value.trim().length === 0)
    return
  loaders.value[field] = true
  try {
    const response = await getSearchRequest(value, search.value, params)
    results.value[field] = response?.links ?? []
    loaders.value[field] = false
  }
  catch (error) {
    console.error(`fetch ${field} results error`, error)
    loaders.value[field] = false
  }
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
      <Spinner v-if="loaders.input" />
      <Search v-else class="size-5 text-muted-foreground" />
    </span>
  </div>
  <div class="flex w-full gap-3 md:gap-4">
    <Select v-model="regions.left" @update:model-value="handleRegion($event, 'left')">
      <RegionOptions />
    </Select>
    <Select v-model="regions.right" @update:model-value="handleRegion($event, 'right')">
      <RegionOptions />
    </Select>
  </div>
  <div class="flex flex-col md:flex-row grow h-16 w-full gap-3 md:gap-4 md:flex-[2]">
    <ResultList :data="results.left" :loading="loaders.left" target="left" />
    <ResultList :data="results.right" :loading="loaders.right" target="right" />
  </div>
  <ComparisonView :compare="compare" />
</template>
