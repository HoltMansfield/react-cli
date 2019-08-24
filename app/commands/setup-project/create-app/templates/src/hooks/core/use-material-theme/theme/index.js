/*
  This is the single source of truth for the look and feel
  of all our applications
*/

export const themeObject = {
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#eeeeee',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main,
    },
    secondary: {
      // light: will be calculated from palette.primary.main,
      main: '#000000',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main,
    },
    error: {
      main: "#f44336"
    }
  },
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiPrivateNotchedOutline: {
      root: {
        // this removes the round corners from all of our inputs, for example: textfields and selects
        borderRadius: '5px !important'
      },
    },
    MuiButton: {
      root: {
        // this makes all buttons squared off
        borderRadius: '5px !important',
      },
    },
    MuiChip: {
      root: {
        // this removes the round corners from chips
        borderRadius: '5px !important'
      }
    },
    MuiAvatar: {
      root: {
        // this removes the round corners from Avatars
        borderRadius: '5px !important'
      }
    },
    MuiToolbar: {
      regular: {
        minHeight: '48px !important'
      }
    }
  }
}
