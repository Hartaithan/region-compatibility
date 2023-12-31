<script setup lang="ts">
const search = ref('')
const results = ref<any | null>(null)

watch(search, debounce(async () => {
  const response = await fetch(`https://store.playstation.com/store/api/chihiro/00_09_000/tumbler/tr/tr/999/${search.value}`)
  const data = await response.json()
  results.value = data
}, 500))
</script>

<template>
  <UInput
    v-model="search" class="border-gray-200" icon="i-heroicons-magnifying-glass-20-solid" size="xl"
    placeholder="Search..."
    autocomplete="off" :ui="{ icon: { trailing: { pointer: '' } } }"
  >
    <template #trailing>
      <UButton
        v-show="search !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid" :padded="false"
        @click="search = ''"
      />
    </template>
  </UInput>
  <div class="flex grow w-full gap-4">
    <ResultList :data="results" />
    <ResultList :data="results" />
  </div>
  <ComparisonView />
</template>
