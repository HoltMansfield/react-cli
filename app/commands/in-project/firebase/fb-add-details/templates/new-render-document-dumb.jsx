import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import Flex from 'flexbox-react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import EditIcon from '@material-ui/icons/Edit'


export function <%= collectionNameSingularPascalCase %>Details ({ <%= collectionNameSingular %> }) {
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
          <Flex marginLeft="auto">
            <Link to="//GeneratorToken: <edit-link>">
              <EditIcon />
            </Link>
          </Flex>
        </Flex>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            //GeneratorToken: <body-content>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
