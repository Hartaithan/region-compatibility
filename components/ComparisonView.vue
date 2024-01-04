<script setup lang="ts">
import type { CompareState, ExtendedCompareState } from '~/models/compare'

interface Props {
  compare: CompareState
}

interface Reactive<T> {
  value: T
}

const { compare } = defineProps<Props>()
const extended = reactive<Reactive<ExtendedCompareState>>({ value: compare as ExtendedCompareState })
const isCompatible = reactive<Reactive<boolean>>({ value: false })

watch(compare, () => {
  const value = extendCompare(compare)
  extended.value = value
  isCompatible.value = value.status === 'compatible'
})
</script>

<template>
  <UCard class="w-full h-24 flex justify-center items-center overflow-auto" :ui="{ body: { padding: 'flex h-full grow flex-col items-center justify-center sm:p-4 px-4 py-4' } }">
    <p v-if="extended.value.left === null && extended.value.right === null" class="text-xl">
      There's nothing to compare.
    </p>
    <div v-else class="w-full flex flex-col gap-2 justify-center items-center">
      <UBadge v-if="extended.value.left" :class="`py-0.5 px-1 text-md relative whitespace-pre ${isCompatible.value ? '!bg-green-700' : '!bg-red-700'} `">
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
      <UBadge v-if="extended.value.right" :class="`py-0.5 px-1 text-md relative whitespace-pre ${isCompatible.value ? '!bg-green-700' : '!bg-red-700'}`">
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
    </div>
  </UCard>
</template>
