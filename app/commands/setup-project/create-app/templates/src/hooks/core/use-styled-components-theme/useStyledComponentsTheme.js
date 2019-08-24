import { themeObject } from '../use-material-theme/theme'


// take the material theme and map to something that is useable for styled-system
const mapMaterialTheme = (materialTheme) => {
  const theme = {}

  theme.colors = {
    primary: materialTheme.palette.primary.main,
    error: materialTheme.palette.error.main
  }

  theme.typography = {
    subtitle2: {
      fontSize: '0.9em'
    }
  }

  return theme
}

export const useStyledComponentsTheme = () => {
  const styledComponentsTheme = mapMaterialTheme(themeObject)

  return { styledComponentsTheme }
}
