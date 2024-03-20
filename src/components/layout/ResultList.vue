<script setup lang="ts">
import type { CompareTarget } from '../../models/compare'
import type { Link } from '../../models/result'
import Result from './Result.vue'

interface Props {
  data: Link[] | null
  target: CompareTarget
}

const { data, target } = defineProps<Props>()
</script>

<template>
  <div class="bg-card rounded-lg ring-1 ring-border shadow w-full overflow-auto px-2 py-3 sm:px-2 sm:py-3 md:px-4 md:py-5">
    <div v-if="data == null" class="flex h-full items-center justify-center">
      <p class="text-sm md:text-base text-center text-neutral-500">
        Start your search and find out compatibility!
      </p>
    </div>
    <div v-if="data != null && data.length === 0" class="flex h-full items-center justify-center">
      <p class="text-sm md:text-base text-center text-neutral-500">
        Nothing found!
      </p>
    </div>
    <div v-if="data != null && data.length > 0" class="flex flex-col gap-2">
      <Result v-for="link of data" :key="link.id" :link="link" :target="target" />
    </div>
  </div>
</template>
