<script setup lang="ts">
import type { CompareProvider, CompareTarget } from '~/models/compare'
import type { Link } from '~/models/result'

interface Props {
  link: Link
  target: CompareTarget
}

const { link, target } = defineProps<Props>()
const { compare, setCompare } = inject<CompareProvider>('compare') as CompareProvider

function onChange(event: Event) {
  const { checked } = event.target as HTMLInputElement
  setCompare(target, checked ? link : null)
}
</script>

<template>
  <div class="flex items-center gap-3 p-2 md:p-3 bg-neutral border border-neutral-800 rounded-lg">
    <UCheckbox name="active" :checked="link.id === compare[target]?.id" @change="onChange($event)" />
    <div class="flex flex-col md:flex-row items-start md:items-center gap-3">
      <img class="min-h-12 md:min-h-16 h-12 md:h-16 min-w-12 md:min-w-16 aspect-square rounded-lg" :src="link.images[0].url" :alt="link.name">
      <div>
        <p class="text-xs md:text-sm font-bold">
          {{ link.name }}
        </p>
        <p class="text-[8px] md:text-xs text-neutral-500">
          {{ link.id }}
        </p>
        <p class="text-[8px] md:text-xs text-neutral-500">
          {{ link.playable_platform.join(',') }} | {{ link.gameContentTypesList.map((i) => i.key).join(',') }}
        </p>
      </div>
    </div>
  </div>
</template>
