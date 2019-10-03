import moment from 'moment'


export const useRenderDocument = () => {
  const renderBoolean = (value) => {
    if (value) {
      return value.toString()
    }

    return ''
  }

  const renderCheckboxes = (value) => {
    if (value) {
      return value.join(', ')
    }

    return ''
  }

  const getDateFormat = (format) => {
    switch (format) {
      case 'long':
        return 'MMMM D, YYYY'
      case 'numShort':
        return 'MM-DD-YYYY'
      case 'short':
        return 'MMM. D'
      default:
        return 'MMM. D, YYYY'
    }
  }

  const renderDate = (value, format) => {
    if (!value) {
      return ''
    }

    const dateFormat = getDateFormat(format)
    const formattedValue = moment.unix(value.seconds).format(dateFormat)
    return formattedValue
  }

  const renderTime = (value, format) => {
    if (!value) {
      return ''
    }

    const timeFormat = format || 'h:mm a'
    const formattedValue = moment.unix(value.seconds).format(timeFormat)
    return formattedValue
  }

  return {
    renderBoolean,
    renderCheckboxes,
    renderDate,
    renderTime
  }
}
