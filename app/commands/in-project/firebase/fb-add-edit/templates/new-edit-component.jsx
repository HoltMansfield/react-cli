/* eslint react-hooks/exhaustive-deps: "off" */
import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import Flex from 'flexbox-react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import DeleteIcon from '@material-ui/icons/Delete'
import { useToaster } from 'hooks/core/use-toaster/useToaster'
import { RouteLoading } from 'components/core/routing/route-loading/RouteLoading'
import { <%= collectionNameSingularPascalCase %>Form } from '../forms/<%= collectionNameSingularPascalCase %>Form'
import { use<%= collectionNamePascalCase %> } from 'hooks/core/firebase/collections/use-<%= collectionNameSnakeCase %>/use<%= collectionNamePascalCase %>'


export function Edit<%= collectionNameSingularPascalCase %> ({ onUpdate, onDelete, <%= collectionNameSingular %>Id }) {
  const [<%= collectionNameSingular %>, set<%= collectionNameSingularPascalCase %>] = useState(null)
  const { success, error } = useToaster()
  const <%= collectionName %> = use<%= collectionNamePascalCase %>()

  const load<%= collectionNameSingularPascalCase %> = async () => {
    const result = await <%= collectionName %>.get(<%= collectionNameSingular %>Id)

    if (result) {
      set<%= collectionNameSingularPascalCase %>(result)
    } else {
      error(`<%= collectionNameSingularPascalCase %> not found`)
      // empty object to stop the spinner from spinning
      set<%= collectionNameSingularPascalCase %>({})
    }
  }

  useEffect(() => {
    load<%= collectionNameSingularPascalCase %>()
  }, [])

  if (!<%= collectionNameSingular %>) {
    return <RouteLoading/>
  }

  const onSubmit = async (data) => {
    const result = await <%= collectionName %>.update(<%= collectionNameSingular %>Id, data)

    if (result) {
      success('<%= collectionNameSingularPascalCase %> was updated')
      if (onUpdate) {
        onUpdate({...data})
      }
    }
  }

  const handleDelete = async () => {
    const result = await <%= collectionName %>.destroy(<%= collectionNameSingular %>Id)

    if (result) {
      success('<%= collectionNameSingularPascalCase %> was deleted')
      if (onDelete) {
        onDelete()
      }
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Flex flexGrow={1} margin="10px">
          <Flex flexGrow={1}>
            <Link to="/list-<%= collectionName %>">
              <Flex alignItems="center">
                <ArrowBackIcon /><span>List of <%= collectionNamePascalCase %></span>
              </Flex>
            </Link>
          </Flex>
          <Flex marginLeft="auto" onClick={handleDelete}>
            <DeleteIcon />
          </Flex>
        </Flex>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <<%= collectionNameSingularPascalCase %>Form initialValues={<%= collectionNameSingular %>} onSubmit={onSubmit} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
