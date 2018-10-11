import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContainerSizeConsumer from '../../general/ContainerSizeConsumer'
import CharitiesMap from './map'

class CharitiesChart extends Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
        <ContainerSizeConsumer>
          {({ width, height }) => width && height && (
            <CharitiesMap
              {...this.props}
              width={width}
              height={height}
            />
          )}
        </ContainerSizeConsumer>
      </div>
    )
  }
}
CharitiesChart.propTypes = {
  query: PropTypes.object.isRequired,
  queryString: PropTypes.string.isRequired,
  onQueryUpdate: PropTypes.func.isRequired,
  hoveredItem: PropTypes.object.isRequired,
}

export default CharitiesChart