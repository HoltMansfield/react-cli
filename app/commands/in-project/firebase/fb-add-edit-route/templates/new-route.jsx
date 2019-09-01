/* eslint react-hooks/exhaustive-deps: "off" */
import React, { useEffect } from 'react'
import { useRouteState } from 'hooks/core/use-route-state/useRouteState'
import { Edit<%= collectionNameSingularPascalCase %> } from 'components/firebase/collections/<%= collectionName %>/edit/Edit<%= collectionNameSingularPascalCase %>'


export default function <%= urlPascalCase %> ({ match, history }) {
  const { setRouteState } = useRouteState()

  useEffect(() => {
    // set or clear all state for this route here (we need to clear it even if we're not using it)
    setRouteState({})
  },[])

  const onDelete = () => {
    history.push('/list-<%= collectionName %>')
  }

  return (
    <Edit<%= collectionNameSingularPascalCase %>
      onDelete={onDelete}
      <%= collectionNameSingular %>Id={match.params.id}
    />
  )
}
