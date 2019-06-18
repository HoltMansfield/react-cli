import { useMedia } from 'use-media'

export const useScreenSizes = () => {
  // below 1280 is device
  const isDevice = useMedia({ maxWidth: 1279 })

  // smallish desktop between 1280 and 1440
  const isDesktop = useMedia({ minWidth: 1280, maxWidth: 1439 })
  
  // large isDesktop is 1440 and up
  const isLargeDesktop = useMedia({ minWidth: 1640 })

  return {
    isDevice,
    isDesktop,
    isLargeDesktop
  }
}
