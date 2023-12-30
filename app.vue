<template>
  <UInput v-model="search" class="border-gray-200" icon="i-heroicons-magnifying-glass-20-solid" size='xl'
    placeholder="Search..." autocomplete="off" :ui="{ icon: { trailing: { pointer: '' } } }">
    <template #trailing>
      <UButton v-show="search !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid" :padded="false"
        @click="search = ''" />
    </template>
  </UInput>
  <div class="flex grow w-full gap-4">
    <ResultList />
    <ResultList />
  </div>
  <ComparisonView />
</template>

<script setup lang="ts">
const search = ref('');
</script>