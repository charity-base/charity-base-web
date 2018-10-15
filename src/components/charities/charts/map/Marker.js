import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon } from 'antd'
import { transparentize } from 'polished'

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

const HoverableG = styled.g.attrs({
  style: ({ weight }) => ({
    fill: transparentize(0.5*(1 - weight), '#EC407A')
  }),
})`
  cursor: pointer;
  opacity: 0.9;
  :hover {
    opacity: 1;
  }
`

const getRadius = normCount => {
  return 10 + 15*normCount
}

const BubbleMarker = ({ count, normCount, onClick }) => (
  <BubbleMarkerContainer>
    <svg style={{ width: '50px', height: '50px', }}>
      <HoverableG
        onClick={onClick}
        weight={normCount}
      >
        <circle
          cx='25px'
          cy='25px'
          r={getRadius(normCount)}
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
  normCount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
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