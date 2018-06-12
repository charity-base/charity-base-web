import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'antd'
import { SectionOverview } from './SectionOverview'
import { NoneText } from '../general/NoneText'
import { DividerTitle } from '../general/DividerTitle'

const aobExists = aob => (
  aob && aob!=='\u0000' && aob!=='NOT DEFINED'
)


const CharityPlacesOverview = ({ areaOfBenefit, areasOfOperation, onClick }) => (
  <SectionOverview title="Places" onClick={onClick} hoverable>
    <Row style={{ margin: '10px' }}>
      <Col span={12}><b>Area of Benefit:</b></Col>
      <Col span={12}>{aobExists(areaOfBenefit) ? areaOfBenefit : <NoneText>none recorded</NoneText>}</Col>
    </Row>
    <p>Operates {areasOfOperation.some(x => x.locationType === 'UK Division') && `${areasOfOperation.filter(x => (x.locationType === 'UK Division')).map(x => x.name).join(', ')}, `} across {areasOfOperation.reduce((agg, x) => (x.locationType === 'Local Authority' ? agg + 1 : agg), 0)} local authorities and {areasOfOperation.reduce((agg, x) => (x.locationType === 'Country' ? agg + 1 : agg), 0)} countries.</p>
  </SectionOverview>
)
CharityPlacesOverview.propTypes = {
  areaOfBenefit: PropTypes.string,
  areasOfOperation: PropTypes.array,
  onClick: PropTypes.func,
}


const CharityPlaces = ({ areaOfBenefit, areasOfOperation }) => (
  <div>
    <DividerTitle title="Area of Benefit" />
    <p>{aobExists(areaOfBenefit) ? areaOfBenefit : <NoneText>none recorded</NoneText>}</p>
    <DividerTitle title="Areas of Operation" />
    {areasOfOperation.map((x, i) => <p key={i}>{x.name}</p>)}
  </div>
)
CharityPlaces.propTypes = {
  areaOfBenefit: PropTypes.string,
  areasOfOperation: PropTypes.array,
}

export { CharityPlaces, CharityPlacesOverview }
