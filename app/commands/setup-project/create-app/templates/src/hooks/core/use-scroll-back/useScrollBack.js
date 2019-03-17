import { useEffect } from 'react'

/*
  You're on page A.  You scroll way down because it's a long page.
  You navigate to page B.  You're still scrolled down.
  This fixes that inherent issue with SPA apps.
*/

export const useScrollBack = (history) => {
  useEffect(() => {
    // scroll browser back to top (setTimeout is needed when going back)
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 0)
  }, [history.location.pathname])
}
