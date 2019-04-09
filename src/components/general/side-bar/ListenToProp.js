import { Component } from 'react'
import PropTypes from 'prop-types'

class ListenToProp extends Component {
  componentDidMount() {
    this.onChange()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.stringProp !== this.props.stringProp) {
      this.onChange()
    }
  }
  onChange = () => {
    this.props.onChange(this.props.stringProp)
  }
  render() {
    return null
  }
}
ListenToProp.propTypes = {
  stringProp: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default ListenToProp
