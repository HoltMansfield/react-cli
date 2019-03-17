/* eslint import/prefer-default-export: "off" */
export const setLoggedInUser = loggedInUser => (
  {
    type: 'SET_USER',
    loggedInUser
  }
)

export const setSelectedLanguage = selectedLanguage => (
  {
    type: 'SET_SELECTED_LANGUAGE',
    selectedLanguage
  }
)

// show and hide the spinner
export const setShowSpinner = newSpinnerState => (
  {
    type: 'SET_SHOW_SPINNER',
    newSpinnerState
  }
)

// show and hide the overlay
export const setShowOverlay = newOverlayState => (
  {
    type: 'SET_SHOW_OVERLAY',
    newOverlayState
  }
)

// set modalState to either an empty string or the name of the modal to display
export const setModalState = newModalState => (
  {
    type: 'SET_MODAL_STATE',
    newModalState
  }
)
