import { combineReducers } from 'redux'

// reducers from this project
import { foundation } from './foundation/foundation'
// end of reducers from this project


const rootReducer = combineReducers({
  foundation
})

export { rootReducer }
