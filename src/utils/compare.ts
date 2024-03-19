import type { CompareState, CompareStatus, ExtendedCompareState } from '../models/compare'
import type { ExtendedLink } from '../models/result'

export function extendCompare(compare: CompareState): ExtendedCompareState {
  if (compare.left === null && compare.right === null)
    return compare as ExtendedCompareState
  let status: CompareStatus = 'not-ready'
  const left: ExtendedLink | null = compare.left ? JSON.parse(JSON.stringify(compare.left)) : null
  if (left)
    left.parts = left.id.split('-')
  const right: ExtendedLink | null = compare.right ? JSON.parse(JSON.stringify(compare.right)) : null
  if (right)
    right.parts = right.id.split('-')
  const isCompareReady = left && right
  const isPartsNotEmpty = isCompareReady && left.parts.length > 0 && right.parts.length > 0
  if (isPartsNotEmpty)
    status = left.parts[1] === right.parts[1] ? 'compatible' : 'not-compatible'
  return { left, right, status }
}
