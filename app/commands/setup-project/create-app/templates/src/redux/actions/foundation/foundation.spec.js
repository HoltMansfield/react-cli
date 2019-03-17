import * as actions from '../'

test('setLoggedInUser should create SET_USER action', () => {
  const expected = {}

  expect(actions.foundation.setLoggedInUser(expected)).toEqual({
    type: 'SET_USER',
    loggedInUser: expected
  })
})

test('setSelectedLanguage should create SET_SELECTED_LANGUAGE action', () => {
  const expected = 'en'

  expect(actions.foundation.setSelectedLanguage(expected)).toEqual({
    type: 'SET_SELECTED_LANGUAGE',
    selectedLanguage: expected
  })
})

test('setShowSpinner should create SET_SHOW_SPINNER action', () => {
  const expected = true

  expect(actions.foundation.setShowSpinner(expected)).toEqual({
    type: 'SET_SHOW_SPINNER',
    newSpinnerState: expected,
  })
})

test('setShowOverlay should create SET_SHOW_OVERLAY action', () => {
  const expected = true

  expect(actions.foundation.setShowOverlay(expected)).toEqual({
    type: 'SET_SHOW_OVERLAY',
    newOverlayState: expected,
  })
})

test('setModalState should create SET_MODAL_STATE action', () => {
  const expected = 'Please wait...'

  expect(actions.foundation.setModalState(expected)).toEqual({
    type: 'SET_MODAL_STATE',
    newModalState: expected,
  })
})
