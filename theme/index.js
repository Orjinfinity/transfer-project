import { ThemeProvider } from 'styled-components'

import breakpoints from './breakpoints'
import colors from './colors'
import space from './space'
import fontWeights from './fontWeights'
import fontSizes from './fontSizes'
import fonts from './fonts'
import radii from './radii'
import mediaQueries from './mediaQueries'
import zIndices from './zIndices'

export const defaultTheme = {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  breakpoints,
  mediaQueries,
  borders: [],
  space,
  radii,
  sizes: [],
  shadows: [],
  zIndices
}

export const ThemeProviderComponent = ({ children, theme = defaultTheme }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)
