import History from 'history'

const appHistory =
  process.env.NODE_ENV === 'test'
    ? History.createMemoryHistory()
    : History.createBrowserHistory()

export default appHistory
