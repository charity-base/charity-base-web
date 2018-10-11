import React, { Component, createContext } from 'react'

const { Provider, Consumer } = createContext()

class ContainerSizeConsumer extends Component {
  containerNode = React.createRef()
  getSize = () => {
    const current = this.containerNode && this.containerNode.current
    return {
      width: current ? current.clientWidth : 0,
      height: current ? current.clientHeight : 0,
    }
  }
  render() {
    return (
      <Provider
        value={this.getSize()}
      >
        <div style={{ width: '100%', height: '100%' }} ref={this.containerNode}>
          <Consumer>
            {this.props.children}
          </Consumer>
        </div>
      </Provider>
    )
  }
}

export default ContainerSizeConsumer
