const isMergeable = (value: unknown): value is Record<string, any> =>
  typeof value === 'object' && value !== null && !Array.isArray(value) && !(value instanceof Date) && !(value instanceof RegExp)

/**
 * Recursively merges `source` into `target` without mutating either. Plain objects are merged,
 * arrays are concatenated and any other value from `source` replaces the one in `target`.
 *
 * @param {Record<string, any>} target Base object
 * @param {Record<string, any>} source Object whose values take precedence
 * @returns {Record<string, any>} The merged object
 *
 * @example
 * deepMerge({ '@media': { color: 'red' } }, { '@media': { margin: 0 } })
 * // { '@media': { color: 'red', margin: 0 } }
 *
 * @private
 */
const deepMerge = <T extends Record<string, any>, S extends Record<string, any>>(target: T, source: S): T & S => {
  const result: Record<string, any> = { ...target }

  Object.keys(source).forEach(key => {
    const prev = result[key]
    const next = source[key]

    if (Array.isArray(prev) && Array.isArray(next)) {
      result[key] = [...prev, ...next]
    } else if (isMergeable(prev) && isMergeable(next)) {
      result[key] = deepMerge(prev, next)
    } else {
      result[key] = next
    }
  })

  return result as T & S
}

export { deepMerge }
