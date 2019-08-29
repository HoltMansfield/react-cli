/* eslint default-case: "off" */
import produce from 'immer'


const initialState = {

}

const <%= reducerName %> = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case '<%= actionType %>':
        draft.<%= reducerProperty %> = action.<%= reducerProperty %>
        return
    }
  })

export { <%= reducerName %>, initialState }
