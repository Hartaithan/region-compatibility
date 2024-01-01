<script setup lang="ts">
import type { Link } from '~/models/result'

interface Props {
  data: Link[]
}

const { data } = defineProps<Props>()
</script>

<template>
  <UCard class="w-full overflow-auto">
    <div class="flex flex-col gap-2">
      <Result v-for="link of data" :key="link.id" :link="link" />
    </div>
  </UCard>
</template>
