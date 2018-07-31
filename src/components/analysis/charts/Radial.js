import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts'
import { Row, Col } from 'antd'
import { ContainerWidthConsumer } from '../../general/ContainerWidthConsumer'
import { Alerts } from '../../general/Alerts'
import { causes, operations, beneficiaries, grantTopics } from '../../../lib/filterValues'

const RadialChart = ({ data, width, height }) => (
  <RadarChart cx={width/2} cy={height/2} outerRadius={Math.min(width/2 - 50, 150)} width={width} height={height} data={data}>
    <PolarGrid />
    <PolarAngleAxis dataKey='name' />
    <PolarRadiusAxis/>
    <Tooltip />
    <Radar dataKey='value' stroke='#EC407A' fill='#EC407A' fillOpacity={0.6}/>
  </RadarChart>
)
RadialChart.propTypes = {
  data: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
}

class CharityCategoriesRadial extends Component {
  getCategories = categoryType => {
    switch (categoryType) {
      case 'causes':
        return causes.filter(x => x.id !== 101 && x.id !== 117).sort((a,b) => a.order - b.order)
      case 'beneficiaries':
        return beneficiaries.filter(x => x.id !== 206).sort((a,b) => a.order - b.order)
      case 'operations':
        return operations.filter(x => x.id !== 310).sort((a,b) => a.order - b.order)
      case 'grantTopics':
        return grantTopics.sort((a,b) => a.order - b.order)
      default:
        return []
    }
  }
  getAlertObject = categoryType => {
    switch (categoryType) {
      case 'causes':
        return {
          message: 'This chart shows the causes being tackled by grant-receiving charities.  The causes are defined by the Charity Commission and typically charities will select a few from the list.',
        }
      case 'beneficiaries':
        return {
          message: 'This chart shows the beneficiary groups helped by grant-receiving charities.  The beneficiaries are defined by the Charity Commission and typically charities will select a few from the list.',
        }
      case 'operations':
        return {
          message: 'This chart shows the operations undertaken by grant-receiving charities.  The operations are defined by the Charity Commission and typically charities will select a few from the list.',
        }
      case 'grantTopics':
        return {
          message: 'These 20 themes were generated automatically from 80,000 grant descriptions using a method of unsupervised machine learning called Topic Modelling.',
        }
      default:
        return {}
    }
  }
  getValues = filterValue => {
    const name = filterValue.altName
    const bucket = this.props.buckets.find(b => b.key === filterValue.id)
    if (!bucket) return { name, value: 0 }
    if (bucket.score) return { name, value: Math.round(bucket.score.value*100)/100 }
    return { name, value: bucket.doc_count }
  }
  render() {
    const { categoryType } = this.props
    return (
      <Row type='flex' justify='center' align='middle' style={{ minHeight: 400 }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={8}>
          <Alerts
            alertsObjects={[
              this.getAlertObject(categoryType),
              {
                message: `Remember it's interactive and will updated based on the search and filters above, as well as any other filters added in the left hand sidebar.`,
              },
            ]}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={16}>
          <ContainerWidthConsumer>
            {width => (
              <RadialChart
                data={this.getCategories(categoryType).map(this.getValues)}
                width={width}
                height={400}
              />
            )}
          </ContainerWidthConsumer>
        </Col>
      </Row>
    )
  }
}
CharityCategoriesRadial.propTypes = {
  buckets: PropTypes.array,
  categoryType: PropTypes.string,
}


export { RadialChart, CharityCategoriesRadial }
