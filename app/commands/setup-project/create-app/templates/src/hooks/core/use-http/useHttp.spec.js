import { renderHook } from 'react-hooks-testing-library'
import { sleep } from 'setupTests'


// testdoubles go here
const axiosDouble = td.replace('axios')
const configDouble = td.replace('config/clear-text')
const setShowOverlay = td.func()
const useOverlayDouble = {
  useOverlay: () => {
    return {
      setShowOverlay
    }
  }
}
td.replace('hooks/core/use-overlay/useOverlay', useOverlayDouble)
const setShowSpinner = td.func()
const useSpinnerDouble = {
  useSpinner: () => {
    return {
      setShowSpinner
    }
  }
}
td.replace('hooks/core/use-spinner/useSpinner', useSpinnerDouble)
const handleError = td.func()
const useHandleErrorDouble = {
  useHandleError: () => {
    return {
      handleError
    }
  }
}
td.replace('hooks/core/use-handle-error/useHandleError', useHandleErrorDouble)

// always REQUIRE in module under test LAST so it gets the testdoubles
const { useHttp } = require('./useHttp')

// some basic var shared by all tests
const apiUrl = 'IcanHazData.api.com'
const url = '/movies'

beforeEach(() => {
  td.when(configDouble.getConfig())
    .thenReturn({
      apiUrl
    })
})

afterEach(() => {
  td.reset() // resets all test doubles
})

test('get() shows and hides overlay by default', async () => {
  const data = { expected: 'data' }

  td.when(axiosDouble.get(`${apiUrl}/${url}`))
    .thenResolve({
      data
    })

  // render the hook in an unseen component
  const { result } = renderHook(() => useHttp())

  const actual = await result.current.get(url)

  // assert that our intial value is as expected
  expect(actual).toEqual(data)
  // setShowOverlay & setShowSpinner is called as default behaviour
  td.verify(setShowOverlay(true), { times: 1 })
  td.verify(setShowSpinner(true), { times: 1 })
  // wait for the setTimeout to fire for hiding the overlay
  await sleep(300)
  // verify the overlay & spinner were hidden
  td.verify(setShowOverlay(false), { times: 1 })
  td.verify(setShowSpinner(false), { times: 1 })
})

test('get() does not show and hide overlay when useOverlay=false', async () => {
  const data = { expected: 'data' }

  td.when(axiosDouble.get(`${apiUrl}/${url}`))
    .thenResolve({
      data
    })

  // render the hook in an unseen component
  const { result } = renderHook(() => useHttp())

  const actual = await result.current.get(url, { useOverlay: false })

  // assert that our intial value is as expected
  expect(actual).toEqual(data)
  // setShowOverlay & setShowSpinner are called as default behaviour
  // give the setTimeout a chance to fire so we can be more sure that it didn't
  await sleep(300)
  // make sure setShowOverlay & setShowSpinner were never called
  td.verify(setShowOverlay(td.matchers.anything()), { times: 0 })
  td.verify(setShowSpinner(td.matchers.anything()), { times: 0 })
})

// react-hooks-testing-library somehow swallows errors, so we call this hook as a vanilla function
test('get() displays error on catch()', async () => {
  const data = { expected: 'data' }
  const expectedErrorMessage = 'if-at-first-you-dont-succeed'
  const expectedError = new Error(expectedErrorMessage)
  const expectedUrl = `${apiUrl}//movies`
  const messageId = 'api.get.failed'
  const defaultMessage = 'An API error has occurred'
  const errorInstance = {
    messageId,
    defaultMessage
  }

  td.when(axiosDouble.get(td.matchers.anything()))
    .thenReturn(Promise.reject(expectedError))

  const { get } = useHttp()

  try {
    actual = await get(url, { errorInstance, useOverlay: false })
  } catch (e) {
    expect(e).toBe(expectedError)
    td.verify(handleError({
      messageId,
      defaultMessage,
      error: expectedError,
      data: { source: "useHttp.get", url: expectedUrl }
    }))
  }
})

// react-hooks-testing-library somehow swallows errors, so we call this hook as vanilla function
test('get() displays DEFAULT error on catch()', async () => {
  const expectedErrorMessage = 'if-at-first-you-dont-succeed'
  const expectedError = new Error(expectedErrorMessage)
  const expectedUrl = `${apiUrl}//movies`

  td.when(axiosDouble.get(td.matchers.anything()))
    .thenReturn(Promise.reject(expectedError))

  const { get } = useHttp()

  try {
    actual = await get(url, { useOverlay: false })
  } catch (e) {
    expect(e).toBe(expectedError)
    td.verify(handleError({
      messageId: "api.genericError",
      defaultMessage: "An error occurred while fetching data",
      error: expectedError,
      data: { source: "useHttp.get", url: expectedUrl }
    }))
  }
})

test('post() calls axios post with expected data', async () => {
  const data = { expected: 'data' }
  const requestData = { request: 'data' }

  td.when(axiosDouble.post(`${apiUrl}/${url}`, requestData))
    .thenResolve({
      data
    })

  // render the hook in an unseen component
  const { result } = renderHook(() => useHttp())

  const actual = await result.current.post(url, requestData)

  expect(actual).toEqual(data)
})

test('put() calls axios put with expected data', async () => {
  const data = { expected: 'data' }
  const requestData = { request: 'data' }

  td.when(axiosDouble.put(`${apiUrl}/${url}`, requestData))
    .thenResolve({
      data
    })

  // render the hook in an unseen component
  const { result } = renderHook(() => useHttp())

  const actual = await result.current.put(url, requestData)

  expect(actual).toEqual(data)
})

test('delete() calls axios delete with expected url', async () => {
  const data = { expected: 'data' }

  td.when(axiosDouble.delete(`${apiUrl}/${url}`))
    .thenResolve({
      data
    })

  // render the hook in an unseen component
  const { result } = renderHook(() => useHttp())

  const actual = await result.current.destroy(url)

  expect(actual).toEqual(data)
})
