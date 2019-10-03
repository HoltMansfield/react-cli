import React from 'react'
import Flex from 'flexbox-react'
import { Label } from './Label'
import { LabelColumn } from './styled'
import { useRenderDocument } from 'hooks/core/firebase/use-render-document/useRenderDocument'


export function RenderTrueFalseProperty ({ label, value }) {
  const { renderBoolean } = useRenderDocument()

  return (
    <Flex flexGrow={1}>
      <LabelColumn>
        <Label>{label}</Label>
      </LabelColumn>
      <Flex>
        {renderBoolean(value)}
      </Flex>
    </Flex>
  )
}
