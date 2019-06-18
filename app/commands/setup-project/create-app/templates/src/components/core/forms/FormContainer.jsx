import React from 'react'
import styled from 'styled-components'
import Flex from 'flexbox-react'
import Card from '@material-ui/core/Card'
import { useScreenSizes } from 'hooks/core/use-screen-sizes/useScreenSizes'


const FlexContainer = styled.div`
  display: flex;
  align-content: flex-start;
  width: ${props => props.maxWidth || '400' }px;
  margin-left: auto;
  margin-right: auto;
`
const FormCard = styled(Card)`
  padding-bottom: 10px;
`

export function FormContainer ({ children }) {
  const { isDevice } = useScreenSizes()

  if (isDevice) {
    return (
      <Flex>
        {children}
      </Flex>
    )
  }

  return (
    <FlexContainer>
      <FormCard>
        { children }
      </FormCard>
    </FlexContainer>
  )
}
