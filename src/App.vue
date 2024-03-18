<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { Input } from './components/ui/input'
</script>

<template>
  <div class="relative w-full items-center">
    <Input id="search" type="text" placeholder="Search..." class="pl-11" />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3 pointer-events-none">
      <Search class="size-5 text-muted-foreground" />
    </span>
  </div>
</template>
