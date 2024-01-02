<script setup lang="ts">
import type { Link } from '~/models/result'

interface Props {
  link: Link
  compare: Link | null
}

interface Emits {
  (eventName: 'set', value: Link | null): void
}

const { link, compare } = defineProps<Props>()
const emit = defineEmits<Emits>()

function onChange(event: Event) {
  const { checked } = event.target as HTMLInputElement
  emit('set', checked ? link : null)
}
</script>

<template>
  <div class="flex items-center gap-3 p-3 bg-neutral border border-neutral-800 rounded-lg">
    <UCheckbox name="active" :checked="link.id === compare?.id" @change="onChange($event)" />
    <img class="min-h-16 h-16 min-w-16 aspect-square rounded-lg" :src="link.images[0].url" :alt="link.name">
    <div>
      <p class="text-sm font-bold">
        {{ link.name }}
      </p>
      <p class="text-xs text-neutral-500">
        {{ link.id }}
      </p>
      <p class="text-xs text-neutral-500">
        {{ link.playable_platform.join(',') }} | {{ link.gameContentTypesList.map((i) => i.key).join(',') }}
      </p>
    </div>
  </div>
</template>
