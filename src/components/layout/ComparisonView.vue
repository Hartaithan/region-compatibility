<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { CompareState, ExtendedCompareState } from '../../models/compare'
import Placeholder from './Placeholder.vue'
import ComparisonItem from './ComparisonItem.vue'
import { extendCompare } from '@/utils/compare'

interface Props {
  compare: CompareState
}

interface Reactive<T> {
  value: T
}

const { compare } = defineProps<Props>()
const extended = reactive<Reactive<ExtendedCompareState>>({ value: compare as ExtendedCompareState })

watch(compare, () => {
  extended.value = extendCompare(compare)
})
</script>

<template>
  <div
    class="bg-card rounded-lg ring-1 ring-border shadow w-full h-20 md:h-24 flex justify-center items-center px-2 py-3 sm:px-2 sm:py-3 md:px-4 md:py-5"
  >
    <p v-if="extended.value.left === null && extended.value.right === null" class="text-xl">
      There's nothing to compare.
    </p>
    <div v-else class="w-full flex flex-col gap-2 justify-center items-center">
      <ComparisonItem v-if="extended.value.left" :compare="extended.value.left" :status="extended.value.status" />
      <Placeholder v-else classes="h-[20px] sm:h-[22px] md:h-[28px] w-[95%] xs:w-[90%] sm:w-[80%] md:w-[600px]" />
      <ComparisonItem v-if="extended.value.right" :compare="extended.value.right" :status="extended.value.status" />
      <Placeholder v-else classes="h-[20px] sm:h-[22px] md:h-[28px] w-[95%] xs:w-[90%] sm:w-[80%] md:w-[600px]" />
    </div>
    <div class="hidden bg-slate-700" />
    <div class="hidden bg-green-700" />
    <div class="hidden bg-red-700" />
  </div>
</template>
