import React from 'react'
import Flex from 'flexbox-react'
import { Label } from './Label'


export function RenderStringProperty ({ label, value }) {
  return (
    <Flex flexGrow={1}>
      <Flex width="170px" justifyContent="flex-end" marginRight="10px">
        <Label>{label}</Label>
      </Flex>
      <Flex>
        {value}
      </Flex>
    </Flex>
  )
}
