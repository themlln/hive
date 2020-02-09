import * as React from 'react'
import {Whiteboard} from './whiteboard'
import Navbar from './navbar'
import Chat from './chat'

export class Home extends React.Component < {}, {} > {
    constructor(props) {
        super(props)
        this.state = {
          showLogin: false
        }
        this.toggleLogin = this.toggleLogin.bind(this)
    }

    toggleLogin() {

    }

    public render() {
        return (
        <div>
          <Navbar />
          <Whiteboard />
          <Chat />
        </div>
        )
    }
}
