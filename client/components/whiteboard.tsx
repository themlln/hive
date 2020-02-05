import * as React from 'react'
import Panel from './panel'
import Canvas from './canvas'
interface State {

}

export class Whiteboard extends React.Component < {}, {} > {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount() {

    }

    public render() {
        return (
        <>
        <div>
          <Panel />
          <Canvas />

        </div>
        </>
        )
    }
}
