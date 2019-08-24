/*
  This reducer holds a single object value.

  The single object value is shallow merged with an incoming object
  whenever the state changes.

  This pattern is identical to this.setState in React.js class components

  const state = { a: 1, b: 2}
  const stateUpdate = { a: 2 }
  const merged = { ...state, ...stateUpdate }

  merged is { a: 2, b: 2 }

  Any properties in stateUpdate get overwritten over values in state
*/


// initial state is set in useEffect of each routed component
const initialState = {
  value: {}
}

const routeState = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VALUE':
      const merged = { ...state.value, ...action.value }
      return {
        value: merged
      }
    default:
      return state
  }
}


export { routeState, initialState }
