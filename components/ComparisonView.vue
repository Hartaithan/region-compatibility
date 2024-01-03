<script setup lang="ts">
import type { CompareState, CompareStatus, ExtendedCompareState } from '~/models/compare'

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
  <UCard class="w-full h-32 flex justify-center items-center overflow-auto" :ui="{ body: { padding: 'flex h-full grow flex-col items-center justify-center sm:p-4 px-4 py-4' } }">
    <p v-if="extended.value.left === null && extended.value.right === null" class="text-xl">
      There's nothing to compare.
    </p>
    <div v-else class="w-full flex flex-col gap-2 justify-center items-center">
      <UBadge v-if="extended.value.left" :before="`${extended.value.left.parts[0]}-`" :after="`-${extended.value.left.parts[2]}`" :class="`!text-white before:text-white after:text-white py-0.5 px-1 ${isCompatible.value ? '!bg-green-700' : '!bg-red-700'} text-md relative whitespace-pre before:absolute before:right-[97%] before:content-[attr(before)] after:absolute after:left-[97%] after:content-[attr(after)]`">
        {{ extended.value.left.parts[1] }}
      </UBadge>
      <UBadge v-if="extended.value.right" :before="`${extended.value.right.parts[0]}-`" :after="`-${extended.value.right.parts[2]}`" :class="`!text-white before:text-white after:text-white py-0.5 px-1 ${isCompatible.value ? '!bg-green-700' : '!bg-red-700'} text-md relative whitespace-pre before:absolute before:right-[97%] before:content-[attr(before)] after:absolute after:left-[97%] after:content-[attr(after)]`">
        {{ extended.value.right.parts[1] }}
      </UBadge>
    </div>
  </UCard>
</template>
