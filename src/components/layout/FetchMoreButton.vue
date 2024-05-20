<script setup lang="ts">
import { Spinner } from '../ui/spinner'

interface Props {
  loading: boolean
}

const { loading } = defineProps<Props>()
</script>

<template>
  <button class="w-full flex justify-center items-center gap-3 bg-card rounded-lg ring-1 ring-border shadow px-2 py-1 sm:py-1.5 md:py-2">
    <Spinner v-if="loading" class="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px]" :stroke-width="2" />
    <svg v-else class="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
      <path d="M7 11l5 5l5 -5" />
      <path d="M12 4l0 12" />
    </svg>
    <p class="text-xs md:text-sm h-auto align-middle">
      Fetch more
    </p>
  </button>
</template>
