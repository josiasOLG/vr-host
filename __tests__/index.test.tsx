import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import Home from '../pages/index'

const createTestStore = () => {
  return configureStore({
    reducer: {
    },
    preloadedState: {},
  })
}

describe('Home Page', () => {
  let store: ReturnType<typeof createTestStore>

  beforeEach(() => {
    store = createTestStore()
  })

  it('renders the home page without crashing', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    )

    expect(document.body).toBeInTheDocument()
  })
})
