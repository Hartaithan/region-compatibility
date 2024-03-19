<script setup lang="ts">
import { provide, ref, watch } from 'vue'
import { Search } from 'lucide-vue-next'
import { debounce } from './utils/debounce'
import { Input } from './components/ui/input'
import type { Link, Results } from './models/result'
import type { CompareProvider, CompareState, CompareTarget } from './models/compare'

interface ResultState {
  left: Link[] | null
  right: Link[] | null
  isLoading: boolean
}

const API_URL = import.meta.env.VITE_API_URL as string
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
  <div class="relative w-full items-center">
    <Input id="search" v-model="search" type="text" placeholder="Search..." class="pl-11" />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3 pointer-events-none">
      <Search class="size-5 text-muted-foreground" />
    </span>
  </div>
  <div>
    <pre class="text-[9px]">compare: {{ JSON.stringify(compare, null, 2) }}</pre>
    <br>
    <pre class="text-[9px]">results: {{ JSON.stringify(results, null, 2) }}</pre>
  </div>
</template>
