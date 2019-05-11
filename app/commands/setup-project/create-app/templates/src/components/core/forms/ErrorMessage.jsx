import React, { Component } from 'react'
import styled from 'styled-components'
import { withTheme } from '@material-ui/core/styles'


const ErrorTextRaw = styled.div`
  color: ${props => props.theme.palette.error.main};
  font-size: ${props => props.theme.typography.subtitle2.fontSize};
`
const ErrorText = withTheme()(ErrorTextRaw)

class ErrorMessage extends Component {
  render() {
    return (
      <ErrorText>{this.props.text}</ErrorText>
    )
  }
}


export { ErrorMessage }
