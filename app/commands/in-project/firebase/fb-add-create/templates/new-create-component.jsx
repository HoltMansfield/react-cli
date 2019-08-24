import React from 'react'
import { <%= collectionNamePascalCase %>Form } from './<%= collectionNamePascalCase %>Form'
import { use<%= collectionNamePascalCase %> } from 'hooks/core/firebase/collections/use-<%= collectionNameSnakeCase %>/use<%= collectionNamePascalCase %>'

export function Create<%= collectionNamePascalCase %> () {
  const <%= collectionName %> = use<%= collectionNamePascalCase %>

  const onSubmit = (data) => {
    <%= collectionName %>.create(data)
  }

  return (
    <<%= collectionNamePascalCase %>Form onSubmit={onSubmit} />
  )
}
