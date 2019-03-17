import { combineReducers } from 'redux'

// reducers from npm
import { foundationReducer as foundation } from '@dol/react-app-essentials'
// reducers from this project

// end of reducers from this project


const rootReducer = combineReducers({
  foundation
})

export { rootReducer }
