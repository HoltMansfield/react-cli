/* eslint react-hooks/exhaustive-deps: "off" */
import React, { useEffect, useState } from 'react'
import { RouteLoading } from 'components/core/routing/route-loading/RouteLoading'
import { use<%= collectionNamePascalCase %> } from 'hooks/core/firebase/collections/use-<%= collectionNameSnakeCase %>/use<%= collectionNamePascalCase %>'
import { List<%= collectionNamePascalCase %> } from './List<%= collectionNamePascalCase %>'


export function ListAll<%= collectionNamePascalCase %> ({ onSelect }) {
  const [<%= collectionName %>List, set<%= collectionNamePascalCase %>List] = useState(null)
  const <%= collectionName %> = use<%= collectionNamePascalCase %>()

  const load<%= collectionNamePascalCase %>List = async () => {
    const result = await <%= collectionName %>.getAll()

    if (result) {
      set<%= collectionNamePascalCase %>List(result)
    }
  }

  useEffect(() => {
    load<%= collectionNamePascalCase %>List()
  }, [])

  if (!<%= collectionName %>List) {
    return <RouteLoading/>
  }

  return (
    <List<%= collectionNamePascalCase %> <%= collectionName %>={<%= collectionName %>List} onSelect={onSelect} />
  )
}
