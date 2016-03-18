// @flow
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Render from './index.render'
import type {Props} from './index.render'

type State = {
  deviceName: ?string
}

export class SetPublicName extends Component<void, Props, State> {
  state: State;

  constructor (props: Props) {
    super(props)

    this.state = {
      deviceName: null
    }
  }

  render () {
    const nameTaken = !!(this.props.existingDevices && this.props.existingDevices.indexOf(this.state.deviceName) !== -1)
    const submitEnabled = !!(this.state.deviceName && this.state.deviceName.length && !nameTaken)
    const nameTakenError = nameTaken ? `The device name: ${this.state.deviceName} is already taken` : null

    return (
      <Render
        deviceName={this.state.deviceName}
        onChange={deviceName => this.setState({deviceName})}
        onSubmit={() => this.props.onSubmit(this.state.deviceName)}
        onBack={this.props.onBack}
        deviceNameError={nameTakenError || this.props.deviceNameError}
        submitEnabled={submitEnabled}
      />
    )
  }

  static parseRoute (store, currentPath, nextPath) {
    return {
      componentAtTop: {
        title: '',
        component: SetPublicName,
        leftButtonTitle: ''
      }
    }
  }
}

export default connect(
  state => ({})
)(SetPublicName)

