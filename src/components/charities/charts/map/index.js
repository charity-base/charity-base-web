import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { message } from 'antd'
import charityBase from '../../../../lib/charityBaseClient'
import { ContainerWidthConsumer } from '../../../general/ContainerWidthConsumer'
import CharitiesMapView from './CharitiesMapView'
import { esBoundsToString } from '../../../../lib/mapHelpers'

const defaultGeoBoundsString = '57.6266733,-8.4016438,50.9843918,1.8224393'

class CharitiesMap extends Component {
  state = {
    buckets: [],
    geoBoundsString: defaultGeoBoundsString,
    isLoading: false,
  }
  componentDidMount() {
    this.getData(this.props.query, undefined, undefined)
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.queryString !== this.props.queryString) {
      this.getData(this.props.query, undefined, undefined)
    }
  }
  getData = (query, aggGeoBounds, aggGeoPrecision) => {
    this.setState({
      isLoading: true,
    })
    charityBase.charity.aggregate({
      ...query,
      accessToken: localStorage.getItem('access_token'),
      aggTypes: 'geo',
      aggGeoBounds,
      aggGeoPrecision,
    })
    .then(({ aggregations }) => {
      const buckets = (aggregations && aggregations.addressLocation) ? aggregations.addressLocation.grid.buckets : []
      const geoBoundsString = (aggregations && aggregations.addressLocation) ? esBoundsToString(aggregations.addressLocation.map_zoom.bounds) : defaultGeoBoundsString
      this.setState({
        buckets,
        geoBoundsString,
        isLoading: false,
      })
    })
    .catch(e => {
      this.setState({
        buckets: [],
        geoBoundsString: defaultGeoBoundsString,
        isLoading: false,
      })
      message.error('Oops, something went wrong')
    })
  }
  render() {
    const { buckets, isLoading, geoBoundsString } = this.state
    return (
      <ContainerWidthConsumer>
        {width => width && (
          <CharitiesMapView
            data={buckets}
            geoBoundsString={geoBoundsString}
            loading={isLoading}
            width={width}
            height={500}
          />
        )}
      </ContainerWidthConsumer>
    )
  }
}
CharitiesMap.propTypes = {
  query: PropTypes.object.isRequired,
  queryString: PropTypes.string.isRequired,
}

export default CharitiesMap
