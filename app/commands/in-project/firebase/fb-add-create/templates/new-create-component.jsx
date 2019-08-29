import React from 'react'
import { useToaster } from 'hooks/core/use-toaster/useToaster'
import { <%= collectionNameSingularPascalCase %>Form } from '../forms/<%= collectionNameSingularPascalCase %>Form'
import { use<%= collectionNamePascalCase %> } from 'hooks/core/firebase/collections/use-<%= collectionNameSnakeCase %>/use<%= collectionNamePascalCase %>'

export function Create<%= collectionNameSingularPascalCase %> ({ onCreate }) {
  const { success } = useToaster()
  const <%= collectionName %> = use<%= collectionNamePascalCase %>()

  const onSubmit = async (data, resetForm) => {
    const result = await <%= collectionName %>.create(data)

    if (result) {
      resetForm(null)
      success('A <%= collectionNameSingularPascalCase %> was created')
      onCreate({...data, id: result.uid})
    }
  }

  return (
    <<%= collectionNameSingularPascalCase %>Form onSubmit={onSubmit} />
  )
}
