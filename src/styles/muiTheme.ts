import { createTheme } from '@mui/material/styles'

import theme from './theme'

// MUI follows the styled-components theme: same family, same purple, and the
// html root is 62.5% (10px), so rem values from MUI must be computed on 10.
const muiTheme = createTheme({
  palette: {
    primary: { main: theme.colors.lightBlue },
    error: { main: theme.font.colors.error },
  },
  typography: {
    fontFamily: theme.font.family.base,
    htmlFontSize: 10,
    button: { textTransform: 'none', letterSpacing: 0 },
  },
  shape: { borderRadius: 8 },
  components: {
    // Press feedback comes from scale(0.98) on the button itself.
    MuiButtonBase: { defaultProps: { disableRipple: true } },
  },
})

export default muiTheme
