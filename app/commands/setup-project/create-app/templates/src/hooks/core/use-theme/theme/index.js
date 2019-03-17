/*
  This is the single source of truth for the look and feel
  of all our applications
*/

export const themeObject = {
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#0F718D',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main,
    },
    secondary: {
      // light: will be calculated from palette.primary.main,
      main: '#607d8b',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main,
    }
  },
  typography: {
    useNextVariants: true,
  }
}
