import React from 'react'
import Flex from 'flexbox-react'
import { useRenderDocument } from 'hooks/core/firebase/use-render-document/useRenderDocument'
import { Label } from './Label'


export function RenderCheckboxes ({ label, value }) {
  const { renderCheckboxes } = useRenderDocument()

  return (
    <Flex flexGrow={1}>
      <Flex width="170px" justifyContent="flex-end" marginRight="10px">
        <Label>{label}</Label>
      </Flex>
      <Flex>
        {renderCheckboxes(value)}
      </Flex>
    </Flex>
  )
}
