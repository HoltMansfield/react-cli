import React from 'react'
import Flex from 'flexbox-react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { FadeIn } from 'animate-css-styled-components'


export function RouteLoading () {
  return (
    <Flex flexGrow={1} justifyContent="center" marginTop="30px">
      <FadeIn>
        <CircularProgress color="secondary" />
      </FadeIn>
    </Flex>
  )
}
