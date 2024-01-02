import type { Link } from './result'

export interface CompareState {
  left: Link | null
  right: Link | null
}

export type CompareTarget = 'left' | 'right'

export interface CompareProvider {
  compare: Ref<CompareState>
  setCompare: (target: CompareTarget, value: Link | null) => void
}
