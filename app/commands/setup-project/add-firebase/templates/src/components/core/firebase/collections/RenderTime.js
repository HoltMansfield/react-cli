import React from 'react'
import Flex from 'flexbox-react'
import { Label } from './Label'
import { LabelColumn } from './styled'
import { useRenderDocument } from 'hooks/core/firebase/use-render-document/useRenderDocument'


export function RenderTime ({ label, value }) {
  const { renderTime } = useRenderDocument()

  return (
    <Flex flexGrow={1}>
      <LabelColumn>
        <Label>{label}</Label>
      </LabelColumn>
      <Flex>
        {renderTime(value)}
      </Flex>
    </Flex>
  )
}
