<script setup lang="ts">
import { statusColors } from '@/constants/status'
import type { CompareStatus } from '@/models/compare'
import type { ExtendedLink } from '@/models/result'

interface Props {
  compare: ExtendedLink | null
  status: CompareStatus
}

const { compare, status } = defineProps<Props>()
</script>

<template>
  <div
    v-if="compare"
    :class="`inline-flex items-center font-medium rounded-md text-xs bg-primary-400 text-gray-900 py-0.5 px-1 text-[10px] sm:text-sm md:text-base relative whitespace-pre ${statusColors[status]}`"
  >
    <p class="absolute right-[97%]">
      {{ `${compare.parts[0]}-` }}
    </p>
    <p>
      {{ compare.parts[1] }}
    </p>
    <p class="absolute left-[97%]">
      {{ `-${compare.parts[2]}` }}
    </p>
  </div>
</template>

<style scoped></style>
