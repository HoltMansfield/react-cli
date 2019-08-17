import React from 'react'
import Flex from 'flexbox-react'
import Grid from '@material-ui/core/Grid'


export function FullPageForm ({ children }) {
  return (
    <Flex flexGrow={1}>
      <Grid container spacing={0}>
        <Grid item xs={false} md={4}>{/* Spacer */}</Grid>
        <Grid item xs={12} md={4}>
          {children}
        </Grid>
        <Grid item xs={false} md={4}>{/* Spacer */}</Grid>
      </Grid>
    </Flex>
  )
}
