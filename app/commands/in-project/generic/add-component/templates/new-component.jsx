import React from 'react'
import Flex from 'flexbox-react'
import { use<%= componentNamePascalCase %>Logic } from './use<%= componentNamePascalCase %>Logic'
// import { } from './styled'


export function <%= componentNamePascalCase %> () {
  const { someValue } = use<%= componentNamePascalCase %>Logic()

  return (
    <Flex>
      <div>Empty component generated for: <%= componentNamePascalCase %></div>
      <div>Displaying value: { someValue } from companion hook</div>
    </Flex>
  )
}
