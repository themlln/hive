import * as React from 'react'
import { Link } from 'react-router-dom'
import { creatingNewCanvas } from '../store/Canvas'
import { connect } from 'react-redux'
import FormDialog from './setRoom'

class Welcome extends React.Component<WelcomeDispatchProps> {
  constructor(props) {
    super(props)
  }

  handleClick() {
    // this.props.onClickCreateCanvas()
  }

  render(){
    return(
      <div>
      <FormDialog createCanvas={this.props.onClickCreateCanvas} />
      </div>

          // <div>
      //   <h3><button type="button" onClick={()=>this.handleClick()}>Collabo by MLLN.</button></h3>
      // </div>
    )
  }
}

interface WelcomeDispatchProps {
  onClickCreateCanvas: () => {};
}
const mapDispatch = (dispatch) => {
  return { onClickCreateCanvas: () =>
    dispatch(creatingNewCanvas())
  }
}
export default connect(null,mapDispatch)(Welcome)
