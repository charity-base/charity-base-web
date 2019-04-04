import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import numeral from 'numeral'
import { Select, Switch } from 'antd'
import { AGG_INCOME_CHARITIES } from '../../../../lib/gql'
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from 'recharts'

const { Option } = Select

const formatCount = x => numeral(x).format('0a')
const formatCurrency = x => `£${numeral(x).format('0a')}`
const mapBucket = x => ({ ...x, key: parseFloat(x.key) })

const dataKeys = {
  count: {
    tooltipSuffix: 'charities',
    label: 'Number Charities',
    formatter: formatCount,
  },
  sum: {
    tooltipSuffix: 'combined income',
    label: 'Combined Income',
    formatter: formatCurrency,
  },
}

const CharitiesIncome = ({ filtersObj }) => {
  const [dataKey, setDataKey] = useState(Object.keys(dataKeys)[0])
  const [logScale, setLogScale] = useState(false)
  return (
    <Query
      query={AGG_INCOME_CHARITIES}
      variables={{ filters: filtersObj }}
    >
      {({ loading, error, data }) => {
        if (error) return null
        const buckets = loading ? [] : (
          data.CHC.getCharities.aggregate.finances.latestIncome.buckets
        )
        return (
          <Fragment>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart
                data={buckets.map(mapBucket)}
                layout='vertical'
                margin={{ top: 0, right: 5, left: 15, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <YAxis
                  dataKey='key'
                  tickFormatter={key => formatCurrency(Math.pow(10, key))}
                  domain={[0, 9]}
                  type='number'
                  label={{ value: 'Charity Income', fontSize: 20, angle: -90, position: 'insideLeft', offset: 10 }}
                />
                <XAxis
                  tickFormatter={dataKeys[dataKey].formatter}
                  type='number'
                  domain={logScale ? [1, 'maxData'] : [0, 'auto']}
                  allowDataOverflow
                  scale={logScale ? 'log' : 'linear'}
                  orientation='top'
                />
                <Tooltip
                  labelFormatter={key => `Income Band: ${formatCurrency(Math.pow(10, key))} - ${formatCurrency(Math.pow(10, key+0.5))}`}
                  formatter={x => ([
                    dataKeys[dataKey].tooltipSuffix,
                    dataKeys[dataKey].formatter(x),
                  ])}
                  separator=' '
                />
                <Bar
                  dataKey={dataKey}
                  fill='#EC407A'
                />
              </BarChart>
            </ResponsiveContainer>
            <Select
              onChange={x => setDataKey(x)}
              value={dataKey}
              style={{
                position: 'absolute',
                top: 40,
                right: 100,
                width: 170,
              }}
            >
              {Object.keys(dataKeys).map(x => (
                <Option
                  key={x}
                  value={x}
                >
                  {dataKeys[x].label}
                </Option>
              ))}
            </Select>
            <Switch
              checked={logScale}
              checkedChildren='log'
              unCheckedChildren='linear'
              onChange={x => setLogScale(x)}
              style={{ position: 'absolute', top: 45, right: 20 }}
            />
          </Fragment>
        )
      }}
    </Query>
  )
}
CharitiesIncome.propTypes = {
  filtersObj: PropTypes.object.isRequired,
}

export default CharitiesIncome
