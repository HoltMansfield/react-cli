import React from 'react'
import { NoClickyShield, OverlayPanel } from './styled'
import { FadeIn } from 'animate-css-styled-components'
import { useOverlay } from 'hooks/core/use-overlay/useOverlay'


export function Overlay () {
  const { showOverlay } = useOverlay()

  if (!showOverlay) {
    return null
  }

  return (
    <NoClickyShield>
      <FadeIn duration="1.5s">
        <OverlayPanel />
      </FadeIn>
    </NoClickyShield>
  )
}
