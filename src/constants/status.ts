import type { CompareStatus } from '../models/compare'

export const statusColors: Record<CompareStatus, string> = {
  'not-ready': 'bg-slate-700 dark:bg-slate-700',
  'compatible': 'bg-green-700 dark:bg-green-700',
  'not-compatible': 'bg-red-700 dark:bg-red-700',
}
