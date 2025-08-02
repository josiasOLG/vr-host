import '@testing-library/jest-dom'

beforeEach(() => {
  jest.clearAllMocks()
})

const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

afterAll(() => {
  console.error = originalError
})
