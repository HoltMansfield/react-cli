import { combineReducers } from 'redux'

// reducers
import { foundation } from './foundation/foundation'
import { routeState } from './route-state/route-state'
// end of reducers


const rootReducer = combineReducers({
	foundation,
	routeState,
})

export { rootReducer }
