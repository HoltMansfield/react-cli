import { combineReducers } from 'redux'

// reducers
import { foundation } from './foundation/foundation'
import { firebase } from './firebase/firebase'
import { routeState } from './route-state/route-state'
// end of reducers


const rootReducer = combineReducers({
	firebase,
	foundation,
	routeState,
})

export { rootReducer }
