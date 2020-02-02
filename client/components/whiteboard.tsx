import * as React from 'react'

// interface Props {
//   text: string;
//   age?: number;
// }

interface State {
  email: string;
  name: string;
}

export default class Whiteboard extends React.Component<{}, State> {
  private state = {
    email: '',
    name: ''
  }

  public render() {
    return (

    )
  }
}
