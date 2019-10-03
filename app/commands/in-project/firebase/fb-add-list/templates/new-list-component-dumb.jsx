import React from 'react'
import Flex from 'flexbox-react'
import { Link } from 'react-router-dom'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'
import Button from '@material-ui/core/Button'
import { useRenderDocument } from 'hooks/core/firebase/use-render-document/useRenderDocument'
import { Heading } from 'components/core/firebase'


export function List<%= collectionNamePascalCase %> ({ <%= collectionName %>, onSelect }) {
  const { renderBoolean, renderCheckboxes, renderDate, renderTime } = useRenderDocument()

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
    <Flex flexDirection="column" flexGrow={1}>
      <Flex flexGrow={1} margin="20px">
        <Flex flexGrow={1} margin="10px" justifyContent="center">
          <Heading>List of <%= collectionNamePascalCase %></Heading>
        </Flex>
        <Flex marginLeft="auto">
          <Link to="/create-<%= collectionNameSingular %>">
            <Button variant="contained">
              <PlaylistAddIcon />
            </Button>
          </Link>
        </Flex>
      </Flex>
      <Flex flexGrow={1}>
        <Table size="small">
          <TableHead>
            {renderHeader()}
          </TableHead>
          <TableBody>
            {renderBody()}
          </TableBody>
        </Table>
      </Flex>
    </Flex>
  )
}
