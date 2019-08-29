import { useSubstate } from 'use-substate'
import * as actions from 'redux/actions'


export const <%= hookName %> = () => {
  const [<%= reducerProperty %>, dispatch] = useSubstate(state => {
    return state.<%= reducerName %>.<%= reducerProperty %>
  })

  const <%= actionCreator %> = (new<%= reducerPropertyPascalCase%>) => {
    dispatch(actions.<%= reducerName %>.<%= actionCreator %>(new<%= reducerPropertyPascalCase%>))
  }

  return {
    <%= reducerProperty %>,
    <%= actionCreator %>
  }
}
