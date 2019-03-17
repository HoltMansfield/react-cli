import { themeObject } from '../use-theme/theme'


// take the material theme and map to something that is useable for styled-system
const mapMaterialTheme = (materialTheme) => {
  const theme = {}

  theme.colors = {
    primary: materialTheme.palette.primary.main
  }

  return theme
}

export const useStyledComponentsTheme = () => {
  const styledComponentsTheme = mapMaterialTheme(themeObject)

  return { styledComponentsTheme }
}
