import { combineReducers } from 'redux'

// reducers
import { foundation } from './foundation/foundation'
// end of reducers from this project


const rootReducer = combineReducers({
  foundation
})

export { rootReducer }
