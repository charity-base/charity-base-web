import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { desaturate, transparentize } from 'polished'
import GoogleMapReact from 'google-map-react'
import { Button, Row, Col } from 'antd'
// import { googleApiKey } from '../../../lib/constants'
import { zoomToPrecision, gmapsBoundsToString, geoHashToLatLon, geoHashToBoundingBox, getCenterZoom } from '../../../lib/mapHelpers'
import ContainerSizeConsumer from '../../general/ContainerSizeConsumer'
import { Alerts } from '../../general/Alerts'

const MarkerContainer = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  left: -25px;
  top: -25px;
`

const HoverableG = styled.g`
  fill: ${({ percentage }) => transparentize(0.3, desaturate(1-2*(percentage || 0), '#EC407A'))};
  :hover {
    fill: ${({ percentage }) => transparentize(0, desaturate(1-2*(percentage || 0), '#EC407A'))};
  }
`

const CharityMarker = ({ count, size, onClick, minWidth, maxWidth }) => (
  <MarkerContainer>
    <svg style={{ width: '50px', height: '50px', }}>
      <HoverableG
        onClick={onClick}
        percentage={size}
      >
        <circle
          cx='25px'
          cy='25px'
          r={Math.max(minWidth, Math.min(maxWidth, 30*Math.pow(size, 0.5)))}
        />
        <text x='25px' y='25px' textAnchor='middle' fill='#000' strokeWidth='0px' dy='.3em'>
          {count > 9999 ? '9999+' : count}
        </text>
      </HoverableG>
    </svg>
  </MarkerContainer>
)
CharityMarker.defaultProps = {
  minWidth: 10,
  maxWidth: 25,
}


class CharitiesMap extends Component {
  state = {
    geoBoundsString: null,
    zooming: false,
  }
  componentDidUpdate(prevProps, prevState) {
    const { isFreshSearch, geoBoundsString } = this.props
    if (!isFreshSearch) {
      return
    }
    if (geoBoundsString !== this.state.geoBoundsString) {
      this.setState({ geoBoundsString })
    }
  }
  onBoundsFilter = boundsString => this.props.onQueryUpdate('addressWithin', boundsString)
  onMapChange = ({ bounds, zoom, center }) => {
    const geoBoundsString = gmapsBoundsToString(bounds)
    const precision = zoomToPrecision(zoom)
    this.props.onBoundsChange(geoBoundsString, precision)
    this.setState({ geoBoundsString })
  }
  onMarkerClick = hash => {
    const geoBoundsString = geoHashToBoundingBox(hash)
    this.setState({ geoBoundsString })
  }
  render() {
    const { buckets, isGeoFilterApplied, loading } = this.props
    const minCount = Math.min(...buckets.map(x => x.doc_count))
    const maxCount = Math.max(...buckets.map(x => x.doc_count))
    const height = 500
    return (
      <Row type='flex' justify='center' align='middle' style={{ minHeight: height }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={8}>
          <Alerts
            alertsObjects={[
              {
                message: 'This map shows the registered address locations of grant-receiving charities.  Click on a bubble to zoom into that region, and click "Filter this area" to apply a geographical filter across all charts.',
              },
              {
                message: `Remember it's interactive and will update based on the search and filters above, as well as any other filters added in the left hand sidebar.`,
              },
            ]}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={16}>
          <ContainerSizeConsumer>
            {({ width: containerWidth }) => {
              const width = containerWidth
              if (!width || !this.state.geoBoundsString) return
              const { center, zoom } = getCenterZoom(this.state.geoBoundsString, width, height)
              return width && (
                <div style={{ width, height, position: 'relative', opacity: loading || this.state.zooming ? 0.5 : 1 }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      // key: googleApiKey,
                    }}
                    zoom={zoom}
                    center={center}
                    options={{}}
                    onChange={this.onMapChange}
                    onZoomAnimationStart={() => this.setState({ zooming: true })}
                    onZoomAnimationEnd={() => this.setState({ zooming: false })}
                  >
                    {!this.state.zooming && buckets.sort((a,b) => a.doc_count - b.doc_count).map(x => {
                      const size = maxCount > minCount ? (x.doc_count - minCount)/(maxCount - minCount) : 1
                      const { latitude, longitude } = geoHashToLatLon(x.key)
                      return <CharityMarker
                        key={x.key}
                        count={x.doc_count}
                        lat={latitude}
                        lng={longitude}
                        size={size}
                        onClick={() => this.onMarkerClick(x.key)}
                      />
                    })}
                  </GoogleMapReact>
                  <Button
                    onClick={() => this.onBoundsFilter(this.state.geoBoundsString)}
                    disabled={this.state.zooming}
                    style={{ position: 'absolute', top: '10px', right: 5 + width/2 }}
                  >
                    Filter this area
                  </Button>
                  <Button
                    onClick={() => this.onBoundsFilter(undefined)}
                    disabled={this.state.zooming || !isGeoFilterApplied}
                    style={{ position: 'absolute', top: '10px', left: 5 + width/2 }}
                  >
                    Reset map filter
                  </Button>
                </div>
              )
            }}
          </ContainerSizeConsumer>
        </Col>
      </Row>
    )
  }
}
CharitiesMap.propTypes = {
  buckets: PropTypes.array,
  onBoundsChange: PropTypes.func,
  onQueryUpdate: PropTypes.func,
  isGeoFilterApplied: PropTypes.bool,
  geoBoundsString: PropTypes.string,
  isFreshSearch: PropTypes.bool,
  loading: PropTypes.bool,
}

export { CharitiesMap }
