import * as React from 'react'
import {draw, setupCanvas, canvas} from '../whiteboard-utilities'

export class Whiteboard extends React.Component<{}, {}> {
  constructor() {
    super()
    this.setup = this.setup.bind(this)
  }

  setup() {
    document.body.appendChild(canvas)
    setupCanvas()
  }

  componentDidMount() {
    this.setup()
  }

  public render() {
    return (
      <>
        <button onClick={ () => draw([1,1], [100,100], 'black', true)}>Draw a Line!</button>
      </>
    )
  }
}
