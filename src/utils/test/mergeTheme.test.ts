import { mergeTheme } from '../mergeTheme'
import { defaultBreakpoints, fallbackTheme, mockTheme } from '../../theme/theme'

describe('mergeTheme', () => {
  it('should return the fallback theme when given an empty theme', () => {
    expect(mergeTheme({})).toEqual(fallbackTheme)
    expect(mergeTheme()).toEqual(fallbackTheme)
  })

  it('should fill in missing values from the fallback theme when given a partial theme', () => {
    const theme = { space: [0, 4, 8], breakpoints: { sm: 500 } as any }

    expect(mergeTheme(theme)).toEqual({
      space: [0, 4, 8],
      breakpoints: { ...defaultBreakpoints, sm: 500 }
    })
  })

  it('should return an equal theme when given a full theme', () => {
    expect(mergeTheme(mockTheme)).toEqual(mockTheme)
  })

  it('should use array breakpoints as given', () => {
    const breakpoints = [400, 800] as any

    expect(mergeTheme({ breakpoints }).breakpoints).toEqual([400, 800])
  })

  it('should not mutate the given theme or the fallback theme', () => {
    const theme = { breakpoints: { sm: 500 } as any }

    mergeTheme(theme)

    expect(theme).toEqual({ breakpoints: { sm: 500 } })
    expect(fallbackTheme.breakpoints).toEqual(defaultBreakpoints)
    expect(defaultBreakpoints.sm).toBe(640)
  })
})
