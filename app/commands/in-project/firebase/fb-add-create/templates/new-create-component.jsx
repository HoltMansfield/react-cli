import React from 'react'
import { <%= collectionNameSingularPascalCase %>Form } from './<%= collectionNameSingularPascalCase %>Form'
import { use<%= collectionNamePascalCase %> } from 'hooks/core/firebase/collections/use-<%= collectionNameSnakeCase %>/use<%= collectionNamePascalCase %>'

export function Create<%= collectionNameSingularPascalCase %> () {
  const <%= collectionName %> = use<%= collectionNamePascalCase %>()

  const onSubmit = (data) => {
    <%= collectionName %>.create(data)
  }

  return (
    <<%= collectionNameSingularPascalCase %>Form onSubmit={onSubmit} />
  )
}
