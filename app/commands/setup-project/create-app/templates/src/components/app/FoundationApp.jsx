import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ErrorBoundary } from '../core/error-boundary/ErrorBoundary'
import { ProvideLanguageTranslations } from '../core/provide-language-translations/ProvideLanguageTranslations'
import { useStyledComponentsTheme } from 'hooks/core/use-styled-components-theme/useStyledComponentsTheme'
import { useTheme } from 'hooks/core/use-theme/useTheme'
import { useSentry } from 'hooks/core/use-sentry/useSentry'
import { useGlobalStyle } from 'hooks/core/use-global-style/useGlobalStyle'
import { useLanguageImporter } from 'hooks/core/use-language-importer/useLanguageImporter'
import { App } from './App'
import { Overlay } from 'components/core/overlay/Overlay'
import { Spinner } from 'components/core/spinner/Spinner'


export function FoundationApp () {
  const { languageState } = useLanguageImporter()
  const { theme } = useTheme()
  const { styledComponentsTheme } = useStyledComponentsTheme()
  const { createGlobalStyleComponent } = useGlobalStyle()
  const { initializeSentry, captureException } = useSentry()
  const GlobalStyle = createGlobalStyleComponent()

  useEffect(() => {
    initializeSentry()
  },[])

  return (
    <ProvideLanguageTranslations selectedLanguage={languageState.loadedLanguage} messages={languageState.messages}>
      <ErrorBoundary captureException={captureException}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <ThemeProvider theme={styledComponentsTheme}>
              <div>
                <Spinner />
                <Overlay />
                <ToastContainer />
                <GlobalStyle />
                <CssBaseline />
                <App/>
              </div>
            </ThemeProvider>
          </MuiThemeProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </ProvideLanguageTranslations>
  )
}
