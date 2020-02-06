import * as React from 'react'

import Navbar from './components/navbar.js'
import Routes from './routes.js'

export default class App extends React.Component {
  public render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }
}
