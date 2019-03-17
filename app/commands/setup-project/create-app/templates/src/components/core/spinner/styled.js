import styled from 'styled-components'


export const FixedPosition = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3; /* Specify a stack order in case you're using a different order for other elements */
`
