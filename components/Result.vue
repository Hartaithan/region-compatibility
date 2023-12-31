<script setup lang="ts">
import type { Link } from '~/models/result'

interface Props {
  link: Link
}

const { link } = defineProps<Props>()
</script>

<template>
  <div>
    <p class="text-sm">
      ID: {{ link.id }}
    </p>
    <p class="text-sm">
      NAME: {{ link.name }}
    </p>
  </div>
</template>
