import * as React from 'react'

import Navbar from './components/navbar'
import Routes from './routes'

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
