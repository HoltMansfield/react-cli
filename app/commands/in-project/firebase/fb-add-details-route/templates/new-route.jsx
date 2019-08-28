/* eslint react-hooks/exhaustive-deps: "off" */
import React, { useEffect } from 'react'
import { useRouteState } from 'hooks/core/use-route-state/useRouteState'
import { FetchAndRender<%= collectionNameSingularPascalCase %>Details } from 'components/firebase/collections/<%= collectionName %>/details/FetchAndRender<%= collectionNameSingularPascalCase %>Details'


export default function <%= urlPascalCase %> ({ match }) {
  const { setRouteState } = useRouteState()

  useEffect(() => {
    // set or clear all state for this route here (we need to clear it even if we're not using it)
    setRouteState({})
  },[])

  return (
    <FetchAndRender<%= collectionNameSingularPascalCase %>Details <%= collectionNameSingular %>Id={match.params.id} />
  )
}
