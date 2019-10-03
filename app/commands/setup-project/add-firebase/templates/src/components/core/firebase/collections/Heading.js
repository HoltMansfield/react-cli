import React from 'react'
import styled from 'styled-components'


const StyledHeading = styled.span`
  font-weight: bold;
  font-size: 1.15em;
  opacity: 0.8;
`

export function Heading ({ children }) {
  return (
    <StyledHeading>{ children }</StyledHeading>
  )
}
