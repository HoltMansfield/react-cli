import React, { Component } from 'react'
import { injectIntl, defineMessages } from 'react-intl'


const messages = defineMessages({
  title: {
    id: 'errorPage.title',
    defaultMessage: 'Something went wrong'
  },
  errorDetails: {
    id: 'errorPage.errorDetails',
    defaultMessage: 'Error Details:'
  }
})


class ErrorBoundaryRaw extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      errorInfo: null
    }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    })
    this.props.captureException(error, errorInfo)
  }

  render() {
    const { intl: { formatMessage } } = this.props
    if (this.state.error) {
      return (
        <div>
          <h2>{formatMessage(messages.title)}</h2>
          <p>
            {this.state.error && this.state.error.toString()}
          </p>
          <div>{formatMessage(messages.errorDetails)}</div>
          <p>{this.state.errorInfo.componentStack}</p>
        </div>
      )
    }

    return this.props.children
  }
}

const ErrorBoundary = injectIntl(ErrorBoundaryRaw)
export { ErrorBoundary, ErrorBoundaryRaw }
