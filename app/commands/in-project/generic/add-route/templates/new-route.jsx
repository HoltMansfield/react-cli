import React, { useEffect } from 'react'
import Flex from 'flexbox-react'
import { useRouteState } from 'hooks/core/use-route-state/useRouteState'
import { use<%= urlPascalCase %>Logic } from './use<%= urlPascalCase %>Logic'
// import { } from './styled'


export default function <%= urlPascalCase %> () {
  const { routeState, setRouteState } = useRouteState()
  const { someValue } = use<%= urlPascalCase %>Logic()

  useEffect(() => {
    // set or clear all state for this route here (we need to clear it even if we're not using it)
    setRouteState({})
  },[])

  return (
    <Flex flexDirection="column" flexGrow={1}>
      <Flex><%= urlPascalCase %></Flex>
      <Flex>Displaying value: { someValue } from companion hook</Flex>
    </Flex>
  )
}
