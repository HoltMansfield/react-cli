/* eslint default-case: "off" */
import produce from 'immer'


const initialState = {
  loggedInUser: null,
  selectedLanguage: 'en',
  showSpinner: false,
  showOverlay: false,
  modalState: {
    modal: 'site-details',
    data: null
  }
}

const foundation = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case 'SET_USER':
        draft.loggedInUser = action.loggedInUser
        return
      case 'SET_SELECTED_LANGUAGE':
        draft.selectedLanguage = action.selectedLanguage
        return
      case 'SET_SHOW_SPINNER':
        draft.showSpinner = action.newSpinnerState
        return
      case 'SET_SHOW_OVERLAY':
        draft.showOverlay = action.newOverlayState
        return
      case 'SET_SPINNER_MESSAGE':
        draft.spinnerMessage = action.newSpinnerMessage
        return
      case 'SET_MODAL_STATE':
        draft.modalState = action.newModalState
        return
    }
  })

export { foundation, initialState }
