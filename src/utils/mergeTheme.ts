// Types
import type { DefaultTheme } from '../types/theme'

// Utils
import { fallbackTheme } from '../theme/theme'

/**
 * Merges the user's theme over {@link fallbackTheme}. Top-level keys are shallow-spread and
 * `breakpoints` is merged one level deep so any missing breakpoints fall back to the defaults.
 *
 * @param {Partial<DefaultTheme>} theme The user's theme
 * @returns {DefaultTheme} The theme with fallbacks applied
 *
 * @private
 */
const mergeTheme = (theme: Partial<DefaultTheme> = {}): DefaultTheme => ({
  ...fallbackTheme,
  ...theme,
  breakpoints: Array.isArray(theme.breakpoints) ? theme.breakpoints : { ...fallbackTheme.breakpoints, ...theme.breakpoints }
})

export { mergeTheme }
