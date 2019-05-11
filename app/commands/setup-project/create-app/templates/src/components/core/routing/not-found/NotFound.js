import React from 'react'
import { injectIntl, defineMessages } from 'react-intl'


const messages = defineMessages({
  title: {
    id: '404Page.title',
    defaultMessage: '404: Page not found'
  }
})


function NotFoundRaw (props) {
  const { intl: { formatMessage } } = props

  return (
    <div>{formatMessage(messages.title)}</div>
  )
}
const NotFound = injectIntl(NotFoundRaw)
export { NotFound }
