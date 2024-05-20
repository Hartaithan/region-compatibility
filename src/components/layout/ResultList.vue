<script setup lang="ts">
import type { CompareTarget } from '../../models/compare'
import type { Link, Pagination } from '../../models/result'
import { Spinner } from '../ui/spinner'
import Card from './Card.vue'
import Result from './Result.vue'
import FetchMoreButton from './FetchMoreButton.vue'

interface Props {
  data: Link[] | null
  loading: boolean
  target: CompareTarget
  pagination: Pagination | null
  paginationLoading: boolean
}

const { data, loading, target, pagination, paginationLoading } = defineProps<Props>()
const emit = defineEmits(['onNextPage'])
</script>

<template>
  <Card class="w-full grow md:grow-0 overflow-auto flex-1 md:flex-[2]">
    <div v-if="loading" class="flex h-full items-center justify-center">
      <Spinner class="w-10 h-10" :stroke-width="2" />
    </div>
    <div v-if="!loading && data == null" class="flex h-full items-center justify-center">
      <p class="text-sm md:text-base text-center text-neutral-500">
        Start your search and find out compatibility!
      </p>
    </div>
    <div v-if="!loading && data != null && data.length === 0" class="flex h-full items-center justify-center">
      <p class="text-sm md:text-base text-center text-neutral-500">
        Nothing found!
      </p>
    </div>
    <div v-if="!loading && data != null && data.length > 0" class="flex flex-col gap-2">
      <Result v-for="link of data" :key="link.id" :link="link" :target="target" />
      <FetchMoreButton v-if="pagination && data.length < pagination.total_results" :loading="paginationLoading" @click="emit('onNextPage')" />
    </div>
  </Card>
</template>
