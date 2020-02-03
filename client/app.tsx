import * as React from 'react'
import 'reflect-metadata'

import Navbar from './components/navbar'
import Routes from './routes'
import { Whiteboard } from './components/whiteboard'

export default class App extends React.Component {
  public render() {
    return (
      <div>
        <Navbar />
        <Routes />
        <Whiteboard />
      </div>
    )
  }
}
