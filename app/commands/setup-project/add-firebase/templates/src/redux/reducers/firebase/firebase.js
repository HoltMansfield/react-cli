/* eslint default-case: "off" */
import produce from 'immer'


const initialState = {

}

const firebase = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case 'SET_USER_PROFILE':
        draft.userProfile = action.userProfile
        return
    }
  })

export { firebase, initialState }
