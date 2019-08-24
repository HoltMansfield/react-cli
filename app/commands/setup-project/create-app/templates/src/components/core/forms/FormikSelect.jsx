import React from 'react'
import Flex from 'flexbox-react'
import styled from 'styled-components'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { getErrors } from './forms'
import { ErrorMessage } from './ErrorMessage'
/*

  <FormikSelect
    id="ID_HERE"
    label="LABEL_HERE"
    formikProps={props}
    items={ see instructions below }
    width={300}
  />

  const items = ['array', 'of', 'strings']

  OR

  const items = [
    { id: 1, value: 'array' },
    { id: 1, value: 'of' },
    { id: 1, value: 'objects' },
  ]

*/
const getWidth = (props) => {
  if (!props.width) {
    return 'width: 100%;'
  }

  if (props.width) {
    return `width: ${props.width}px`
  }
}
const WideSelect = styled(Select)`
  ${props => getWidth(props)};
`
export function FormikSelect (props) {
  const { id, label, items, width } = props
  const { values, setFieldValue, setFieldTouched, errors, touched } = props.formikProps

  const getMenuItems = (items) => {
    return items.map((item, i) => {
      if (item.id) {
        // array of objects
        return <MenuItem key={item.id} value={item.id}>{item.value}</MenuItem>
      }
      // array of strings
      return <MenuItem key={i} value={item}>{item}</MenuItem>
    })
  }

  return (
    <Flex flexGrow={1} flexDirection="column" margin="0 10px">
      <Flex flexGrow={1} marginTop="10px" marginBottom="5px">{label}</Flex>
      <WideSelect
        id={id}
        value={values[id]}
        onChange={(e) => setFieldValue(id, e.target.value)}
        inputProps={{
          name: id,
          id,
        }}
        MenuProps={{
          onExited: () => setFieldTouched(id, true)
        }}
        width={width}
      >
        {getMenuItems(items)}
      </WideSelect>
      <Flex marginTop="10px">
        <ErrorMessage text={getErrors(id, errors, touched)} />
      </Flex>
    </Flex>
  )
}
