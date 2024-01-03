<script setup lang="ts">
import type { CompareState } from '~/models/compare'

interface Props {
  compare: CompareState
}

const { compare } = defineProps<Props>()
const extended = extendCompare(compare)
</script>

<template>
  <UCard class="w-full h-32 flex justify-center items-center  overflow-auto">
    <p v-if="extended.left === null && extended.right === null" class="text-xl">
      There's nothing to compare.
    </p>
    <div v-else class="flex flex-col justify-center items-center">
      <div v-if="extended.left" class="flex gap-1">
        <p v-for="(part, i) in extended.left.parts" :key="i">
          {{ part }}
        </p>
      </div>
      <div v-if="extended.right" class="flex gap-1">
        <p v-for="(part, i) in extended.right.parts" :key="i">
          {{ part }}
        </p>
      </div>
      <p>{{ extended.status }}</p>
    </div>
  </UCard>
</template>
