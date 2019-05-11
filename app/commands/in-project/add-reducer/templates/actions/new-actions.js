/* eslint import/prefer-default-export: "off" */
export const <%= setReducerPropertyFunction %> = <%= reducerProperty %> => (
  {
    type: '<%= actionType %>',
    <%= reducerProperty %>
  }
)
