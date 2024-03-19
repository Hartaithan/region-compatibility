<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/classes'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <svg
    :class="cn('h-5 w-5 animate-spin', props.class)"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
</template>
