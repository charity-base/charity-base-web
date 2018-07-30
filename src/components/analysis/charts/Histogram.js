import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { formatCount, formatMoney } from '../../../lib/formatHelpers'
import { ContainerWidthConsumer } from '../../general/ContainerWidthConsumer'
import { Alerts } from '../../general/Alerts'

const CountMoneyHistogram = ({ data, width, height, rangeKey, countKey, moneyKey, xAxisLabel }) => (
  <BarChart
    width={width}
    height={height}
    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    data={data}
    barCategoryGap={3}
    barGap={0}
  >
    <CartesianGrid strokeDasharray='3 3'/>
    <XAxis dataKey={rangeKey} label={{ value: xAxisLabel, offset: -5, position: 'insideBottom' }} />
    <YAxis yAxisId='left' tickFormatter={formatCount} orientation='left' stroke='#64B5F6'/>
    <YAxis yAxisId='right' tickFormatter={formatMoney} orientation='right' stroke='#81C784'/>
    <Tooltip
      labelFormatter={x => <span style={{fontSize: '18px', fontWeight: 500}}>{x}</span>}
      formatter={(value, name) => `${name === countKey ? formatCount(value) : formatMoney(value)}`}
    />
    <Legend verticalAlign='top' align='center' layout='horizontal' height={36} />
    <Bar yAxisId='left' dataKey={countKey} fill='#64B5F6' />
    <Bar yAxisId='right' dataKey={moneyKey} fill='#81C784' />
  </BarChart>
)
CountMoneyHistogram.propTypes = {
  data: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  rangeKey: PropTypes.string,
  countKey: PropTypes.string,
  moneyKey: PropTypes.string,
  xAxisLabel: PropTypes.string,
}
CountMoneyHistogram.defaultProps = {
  width: 900,
  height: 300,
  rangeKey: 'name',
}

const CharitySizeHistogram = ({ buckets }) => (
  <Row type='flex' justify='center' align='middle' style={{ minHeight: 400 }}>
    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={8}>
      <Alerts
        alertsObjects={[
          {
            message: 'This chart shows the frequency and combined income of grant-receiving charities in different income brackets.',
          },
          {
            message: `Remember it's interactive and will updated based on your search and date range above, as well as any other filters added in the left hand sidebar.`,
          },
        ]}
      />
    </Col>
    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={16}>
      <ContainerWidthConsumer>
        {width => (
          <CountMoneyHistogram
            data={buckets.map(x => ({
              'name': `${formatMoney(Math.pow(10, x.key))} - ${formatMoney(Math.pow(10, x.key+0.5))}`,
              'Number of Charities': x.doc_count,
              'Combined Income': x.total_income.value,
            }))}
            width={width}
            height={400}
            rangeKey='name'
            countKey='Number of Charities'
            moneyKey='Combined Income'
            xAxisLabel='Charity Income'
          />
        )}
      </ContainerWidthConsumer>
    </Col>
  </Row>
)
CharitySizeHistogram.propTypes = {
  buckets: PropTypes.array,
}

const GrantSizeHistogram = ({ buckets }) => (
  <Row type='flex' justify='center' align='middle' style={{ minHeight: 400 }}>
    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={8}>
      <Alerts
        alertsObjects={[
          {
            message: 'This chart shows the frequency and combined value of grants in different size brackets.',
          },
          {
            message: `Remember it's interactive and will updated based on your search and date range above, as well as any other filters added in the left hand sidebar.`,
          },
        ]}
      />
    </Col>
    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={16}>
      <ContainerWidthConsumer>
        {width => (
          <CountMoneyHistogram
            data={buckets.map(x => ({
              'name': `${formatMoney(Math.pow(10, x.key))} - ${formatMoney(Math.pow(10, x.key+0.5))}`,
              'Number of Grants': x.doc_count,
              'Combined Value': x.total_awarded.value,
            }))}
            width={width}
            height={400}
            rangeKey='name'
            countKey='Number of Grants'
            moneyKey='Combined Value'
            xAxisLabel='Grant Size'
          />
        )}
      </ContainerWidthConsumer>
    </Col>
  </Row>
)
GrantSizeHistogram.propTypes = {
  buckets: PropTypes.array,
}

const GrantDateHistogram = ({ buckets }) => (
  <Row type='flex' justify='center' align='middle' style={{ minHeight: 400 }}>
    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={8}>
      <Alerts
        alertsObjects={[
          {
            message: 'This chart shows the frequency and combined value of grants over different time intervals.',
          },
          {
            message: `Remember it's interactive and will updated based on your search and date range above, as well as any other filters added in the left hand sidebar.`,
          },
        ]}
      />
    </Col>
    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={16}>
      <ContainerWidthConsumer>
        {width => (
          <CountMoneyHistogram
            data={buckets.map(x => ({
              'name': `${x.key_as_string}`,
              'Number of Grants': x.doc_count,
              'Combined Value': x.total_awarded.value,
            }))}
            width={width}
            height={400}
            rangeKey='name'
            countKey='Number of Grants'
            moneyKey='Combined Value'
            xAxisLabel='Grant Date'
          />
        )}
      </ContainerWidthConsumer>
    </Col>
  </Row>
)
GrantDateHistogram.propTypes = {
  buckets: PropTypes.array,
}


export { CountMoneyHistogram, CharitySizeHistogram, GrantSizeHistogram, GrantDateHistogram }
