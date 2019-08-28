import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'


export function List<%= collectionNamePascalCase %> ({ <%= collectionName %>, onSelect }) {
  const handleSelect = (event, id) => {
    onSelect(id)
  }

  const renderHeader = () => {
    return (
      //GeneratorToken: <header-content>
    )
  }

  const renderBody = () => {
    return <%= collectionName %>.map(<%= collectionNameSingular %> => (
        //GeneratorToken: <body-content>
    ))
  }

  return (
    <Paper>
      <Table size="small">
        <TableHead>
          {renderHeader()}
        </TableHead>
        <TableBody>
          {renderBody()}
        </TableBody>
      </Table>
    </Paper>
  )
}
