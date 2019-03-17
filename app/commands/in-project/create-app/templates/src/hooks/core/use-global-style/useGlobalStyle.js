import { createGlobalStyle } from 'styled-components'


export const useGlobalStyle = () => {
  const createGlobalStyleComponent = () => createGlobalStyle`
    a {
      text-decoration: none; /* no underline */
      color: black;
    }
  `

  return { createGlobalStyleComponent }
}
