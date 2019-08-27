import React, { useEffect } from 'react'
import Flex from 'flexbox-react'
import { useRouteState } from 'hooks/core/use-route-state/useRouteState'
import { Create<%= collectionNameSingularPascalCase %> as Create<%= collectionNameSingularPascalCase %>Container } from 'components/firebase/collections/<%= collectionName %>/create/Create<%= collectionNameSingularPascalCase %>'


export default function <%= urlPascalCase %> ({ history }) {
  const { routeState, setRouteState } = useRouteState()

  useEffect(() => {
    // set or clear all state for this route here (we need to clear it even if we're not using it)
    setRouteState({})
  },[])

  const onCreate = (data) => {
    history.push('/list-<%= collectionName %>')
  }

  return (
    <Create<%= collectionNameSingularPascalCase %>Container onCreate={onCreate} />
  )
}
