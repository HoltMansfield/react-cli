/* eslint react-hooks/exhaustive-deps: "off" */
import React, { useEffect } from 'react'
import { useRouteState } from 'hooks/core/use-route-state/useRouteState'
import { ListAll<%= collectionNamePascalCase %> } from 'components/firebase/collections/<%= collectionName %>/list/ListAll<%= collectionNamePascalCase %>'


export default function <%= urlPascalCase %> ({ history }) {
  const { setRouteState } = useRouteState()

  useEffect(() => {
    // set or clear all state for this route here (we need to clear it even if we're not using it)
    setRouteState({})
  },[])

  const onSelect = (id) => {
    history.push(`/<%= collectionNameSingular %>-details/${id}`)
  }

  return (
    <ListAll<%= collectionNamePascalCase %> onSelect={onSelect} />
  )
}
