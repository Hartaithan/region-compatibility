<script setup lang="ts">
import type { CompareState } from '~/models/compare'

interface Props {
  compare: CompareState
}

const { compare } = defineProps<Props>()
</script>

<template>
  <UCard class="w-full h-32 flex justify-center items-center  overflow-auto">
    <p v-if="compare.left === null && compare.right === null" class="text-xl">
      There's nothing to compare.
    </p>
    <div v-else class="flex gap-9">
      <p>{{ compare.left?.name }}</p>
      <p>{{ compare.right?.name }}</p>
    </div>
  </UCard>
</template>
