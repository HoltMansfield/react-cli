import React from 'react'
import styled from 'styled-components'


const StyledLabel = styled.span`
  opacity: 0.6;
`

export function Label ({ children }) {
  return (
    <StyledLabel>{ children }</StyledLabel>
  )
}
