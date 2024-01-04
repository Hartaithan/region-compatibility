import type { ExtendedLink, Link } from './result'

export interface CompareState {
  left: Link | null
  right: Link | null
}

export type CompareStatus = 'not-ready' | 'compatible' | 'not-compatible'

export interface ExtendedCompareState {
  left: ExtendedLink | null
  right: ExtendedLink | null
  status: CompareStatus
}

export type CompareTarget = 'left' | 'right'

export interface CompareProvider {
  compare: Ref<CompareState>
  setCompare: (target: CompareTarget, value: Link | null) => void
}
