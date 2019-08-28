import React from 'react'
import { Loading } from 'carbon-components-react'
import { FadeIn } from 'animate-css-styled-components'
import Flex from 'flexbox-react'


export function RouteLoading () {
  return (
    <div>
      <Flex flexGrow={1} justifyContent="center" marginTop="50px">
        <FadeIn>
          <Loading small active={true} />
        </FadeIn>
      </Flex>
    </div>
  )
}
