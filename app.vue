<template>
  <UInput v-model="value" placeholder="Search..." />
  <UButton class="mt-3 mx-auto w-32 justify-center">Hello World!</UButton>
</template>

<script setup lang="ts">
const value = ref('');
</script>