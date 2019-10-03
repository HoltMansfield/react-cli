import React from 'react'
import { Link } from 'react-router-dom'
import Flex from 'flexbox-react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
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
    <Flex flexDirection="column">
      <Flex flexGrow={1}>
        <Link to="/list-<%= collectionName %>">
          <Flex alignItems="center">
            <ArrowBackIcon /><span>List of <%= collectionNamePascalCase %></span>
          </Flex>
        </Link>
      </Flex>
      <Flex>
        <<%= collectionNameSingularPascalCase %>Form onSubmit={onSubmit} />
      </Flex>
    </Flex>
  )
}
