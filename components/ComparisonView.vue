<script setup lang="ts">
import { statusColors } from '~/constants/status'
import type { CompareState, ExtendedCompareState } from '~/models/compare'

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
  <UCard
    class="w-full h-20 md:h-24 flex justify-center items-center overflow-auto"
    :ui="{ body: { padding: 'flex h-full grow flex-col items-center justify-center px-2 py-3 sm:px-2 sm:py-3 md:px-4 md:py-5' } }"
  >
    <p v-if="extended.value.left === null && extended.value.right === null" class="text-xl">
      There's nothing to compare.
    </p>
    <div v-else class="w-full flex flex-col gap-2 justify-center items-center">
      <UBadge
        v-if="extended.value.left"
        :class="`py-0.5 px-1 text-[10px] sm:text-sm md:text-base relative whitespace-pre ${statusColors[extended.value.status]}`"
      >
        <p class="absolute right-[97%]">
          {{ `${extended.value.left.parts[0]}-` }}
        </p>
        <p>
          {{ extended.value.left.parts[1] }}
        </p>
        <p class="absolute left-[97%]">
          {{ `-${extended.value.left.parts[2]}` }}
        </p>
      </UBadge>
      <Placeholder v-else classes="h-[20px] sm:h-[22px] md:h-[28px] w-[95%] xs:w-[90%] sm:w-[80%] md:w-[600px]" />
      <UBadge
        v-if="extended.value.right"
        :class="`py-0.6 px-1 text-[10px] sm:text-sm md:text-base relative whitespace-pre ${statusColors[extended.value.status]}`"
      >
        <p class="absolute right-[97%]">
          {{ `${extended.value.right.parts[0]}-` }}
        </p>
        <p>
          {{ extended.value.right.parts[1] }}
        </p>
        <p class="absolute left-[97%]">
          {{ `-${extended.value.right.parts[2]}` }}
        </p>
      </UBadge>
      <Placeholder v-else classes="h-[20px] sm:h-[22px] md:h-[28px] w-[95%] xs:w-[90%] sm:w-[80%] md:w-[600px]" />
    </div>
    <div class="hidden bg-slate-700" />
    <div class="hidden bg-green-700" />
    <div class="hidden bg-red-700" />
  </UCard>
</template>
