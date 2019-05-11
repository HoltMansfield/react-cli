import React from 'react'
import { render, cleanup } from 'react-testing-library'
import { sleep } from 'setupTests'


// testdoubles
const useSubstateDouble = td.replace('use-substate')

// useGlobalStyle
const useGlobalStyleDouble = {
  useGlobalStyle: () => {
    return {
      createGlobalStyleComponent: () => () => (
        <div>Dummy component</div>
      )
    }
  }
}
td.replace('hooks/core/use-global-style/useGlobalStyle', useGlobalStyleDouble)
// useLoadUser
const initializeSentry = td.func()
const useLoadUserDouble = {
  useLoadUser: () => {
    return {
      initializeSentry
    }
  }
}
td.replace('hooks/core/use-sentry/useLoadUser', useLoadUserDouble)

// useLanguageImporter
const useLanguageImporterDouble = {
  useLanguageImporter: () => {
    return {
      languageState: {
        loadedLanguage: 'en'
      }
    }
  }
}
td.replace('hooks/core/use-language-importer/useLanguageImporter', useLanguageImporterDouble)


// always REQUIRE in module under test LAST so it gets the testdoubles
const { FoundationApp } = require('./FoundationApp')

beforeEach(() => {
  td.reset()

  td.when(useSubstateDouble.useSubstate(td.matchers.anything()))
    .thenReturn([])
})
afterEach(cleanup)

test('renders', async () => {
  render(<FoundationApp />)

  // how do I test useEffect ? I tried to rerender also
  // sleep(500)
  // td.verify(initializeSentry())
})
