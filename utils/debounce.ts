type Debounce = (...args: any[]) => void

export function debounce<T extends Debounce>(fn: T, delay: number): T {
  let timeout: NodeJS.Timeout | undefined
  return function (this: any, ...args: any[]) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  } as T
}
