<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/classes'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div :class="cn('bg-card rounded-lg ring-1 ring-border shadow px-2 py-3 sm:px-2 sm:py-3 md:px-4 md:py-5', props.class)">
    <slot />
  </div>
</template>
