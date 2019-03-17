import { createMuiTheme } from '@material-ui/core/styles'
import { themeObject } from './theme'


export const useTheme = () => {
  const theme = createMuiTheme(themeObject)

  return { theme }
}
