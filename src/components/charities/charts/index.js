import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ContainerWidthConsumer } from '../../general/ContainerWidthConsumer'
import CharitiesMap from './map'

class CharitiesChart extends Component {
  render() {
    return (
      <ContainerWidthConsumer>
        {width => width && (
          <CharitiesMap
            {...this.props}
            width={width}
            height={500}
          />
        )}
      </ContainerWidthConsumer>
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