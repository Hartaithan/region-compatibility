<script setup lang="ts">
const props = defineProps(['data'])
</script>

<template>
  <UCard class="w-full">
    <pre class="text-[8px]">{{ props.data }}</pre>
  </UCard>
</template>
