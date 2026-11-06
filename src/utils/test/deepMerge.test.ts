import { deepMerge } from '../deepMerge'

describe('deepMerge', () => {
  it('should return a copy of the target when given an empty source', () => {
    const target = { color: 'red' }
    const result = deepMerge(target, {})

    expect(result).toEqual({ color: 'red' })
    expect(result).not.toBe(target)
  })

  it('should merge nested objects recursively', () => {
    const target = { color: 'red', '@media (min-width: 640px)': { color: 'orange' } }
    const source = { margin: 0, '@media (min-width: 640px)': { margin: 4 } }

    expect(deepMerge(target, source)).toEqual({
      color: 'red',
      margin: 0,
      '@media (min-width: 640px)': { color: 'orange', margin: 4 }
    })
  })

  it('should let source values override target values', () => {
    expect(deepMerge({ color: 'red', nested: { a: 1 } }, { color: 'blue', nested: 'flat' })).toEqual({
      color: 'blue',
      nested: 'flat'
    })
  })

  it('should concatenate arrays', () => {
    expect(deepMerge({ list: [1, 2] }, { list: [3] })).toEqual({ list: [1, 2, 3] })
  })

  it('should not mutate its arguments', () => {
    const target = { nested: { a: 1 } }
    const source = { nested: { b: 2 } }

    deepMerge(target, source)

    expect(target).toEqual({ nested: { a: 1 } })
    expect(source).toEqual({ nested: { b: 2 } })
  })
})
