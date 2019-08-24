/* eslint react-hooks/exhaustive-deps: "off" */
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
import { useMaterialTheme } from 'hooks/core/use-material-theme/useMaterialTheme'
import { useSentry } from 'hooks/core/use-sentry/useSentry'
import { useGlobalStyle } from 'hooks/core/use-global-style/useGlobalStyle'
import { useLanguageImporter } from 'hooks/core/use-language-importer/useLanguageImporter'
import { useFirebaseAuthState } from 'hooks/core/firebase/use-firebase-auth-state/useFirebaseAuthState'
import { App } from './App'
import { Overlay } from 'components/core/overlay/Overlay'
import { Spinner } from 'components/core/spinner/Spinner'



export function FoundationApp () {
  const { languageState } = useLanguageImporter()
  const { materialTheme } = useMaterialTheme()
  const { styledComponentsTheme } = useStyledComponentsTheme()
  const { createGlobalStyleComponent } = useGlobalStyle()
  const { initializeSentry, captureException } = useSentry()
  const { loadAuthState } = useFirebaseAuthState()
  const GlobalStyle = createGlobalStyleComponent()

  useEffect(() => {
    //debugger
    initializeSentry()
    loadAuthState()
  }, [])

  return (
    <ProvideLanguageTranslations selectedLanguage={languageState.loadedLanguage} messages={languageState.messages}>
      <ErrorBoundary captureException={captureException}>
        <BrowserRouter>
          <MuiThemeProvider theme={materialTheme}>
            <ThemeProvider theme={styledComponentsTheme}>
              <>
                <Spinner />
                <Overlay />
                <ToastContainer />
                <GlobalStyle />
                <CssBaseline />
                <App/>
              </>
            </ThemeProvider>
          </MuiThemeProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </ProvideLanguageTranslations>
  )
}
