const getConfig = () => {
  const enviro = process.env.REACT_APP_ENV || 'local'
  const { config } = require(`./${enviro}`)
  return config
}
export { getConfig }
