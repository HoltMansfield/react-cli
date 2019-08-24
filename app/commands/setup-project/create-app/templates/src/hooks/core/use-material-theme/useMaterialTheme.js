import { createMuiTheme } from '@material-ui/core/styles'
import { themeObject } from './theme'


export const useMaterialTheme = () => {
  const materialTheme = createMuiTheme(themeObject)

  return { materialTheme }
}
