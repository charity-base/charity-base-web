import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon } from 'antd'
import { transparentize, desaturate } from 'polished'

const BubbleMarkerContainer = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  left: -25px;
  top: -25px;
`

const PointMarkerContainer = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  left: -15px;
  top: -30px;
`

const HoverableG = styled.g`
  fill: ${({ percentage }) => transparentize(0.3, desaturate(1-2*(percentage || 0), '#EC407A'))};
  :hover {
    fill: ${({ percentage }) => transparentize(0, desaturate(1-2*(percentage || 0), '#EC407A'))};
  }
`

const BubbleMarker = ({ count, size, onClick, minWidth, maxWidth }) => (
  <BubbleMarkerContainer>
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
  </BubbleMarkerContainer>
)
BubbleMarker.propTypes = {
  count: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  minWidth: PropTypes.number.isRequired,
  maxWidth: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}
BubbleMarker.defaultProps = {
  minWidth: 10,
  maxWidth: 25,
}

const PointMarker = () => (
  <PointMarkerContainer>
    <Icon
      type='environment'
      theme='filled'
      style={{ width: '30px', height: '30px', fontSize: '30px', }}
    />
  </PointMarkerContainer>
)

export {
  BubbleMarker,
  PointMarker,
}