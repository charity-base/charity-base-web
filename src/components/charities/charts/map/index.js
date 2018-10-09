import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { message } from 'antd'
import charityBase from '../../../../lib/charityBaseClient'
import CharitiesMapView from './CharitiesMapView'

class CharitiesMap extends Component {
  state = {
    buckets: [],
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
      console.log(aggregations)
      this.setState({
        isLoading: false,
        buckets,
      })
    })
    .catch(e => {
      this.setState({
        isLoading: false,
        buckets: [],
      })
      message.error('Oops, something went wrong')
    })
  }
  render() {
    const { buckets, isLoading } = this.state
    return (
      <CharitiesMapView
        data={buckets}
        loading={isLoading}
      />
    )
  }
}
CharitiesMap.propTypes = {
  query: PropTypes.object.isRequired,
  queryString: PropTypes.string.isRequired,
}

export default CharitiesMap
