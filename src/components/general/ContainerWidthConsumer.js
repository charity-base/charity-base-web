import React, { Component, createContext } from 'react'

const { Provider, Consumer } = createContext()

class ContainerWidthConsumer extends Component {
  containerNode = React.createRef()
  getWidth = () => {
    return this.containerNode && this.containerNode.current ? (
      this.containerNode.current.clientWidth
    ) : (
      null
    )
  }
  render() {
    return (
      <Provider
        value={this.getWidth()}
      >
        <div ref={this.containerNode}>
          <Consumer>
            {this.props.children}
          </Consumer>
        </div>
      </Provider>
    )
  }
}

export { ContainerWidthConsumer }
