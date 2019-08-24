import React from 'react'
import styled from 'styled-components'


const ErrorText = styled.div`
  color: ${props => props.theme.colors.error.main};
  font-size: ${props => props.theme.typography.subtitle2.fontSize};
`

export function ErrorMessage ({ text }) {
  return (
    <ErrorText>{text}</ErrorText>
  )
}
