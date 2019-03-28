import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import numeral from 'numeral'
import { Select } from 'antd'
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
const formatCurrency = x => `£${numeral(x).format('0.0a')}`
const limitBuckets = buckets => {
  const nonZero = buckets
    .reduce((agg, x) => (x.count > 0 ? [...agg, x] : agg), [])
    .sort((a, b) => parseFloat(a.key) - parseFloat(b.key))
    .map(x => ({
      ...x,
      key: parseFloat(x.key),
    }))
  // todo: add in buckets with count=0?
  return nonZero
}

const dataKeys = {
  count: {
    tooltipSuffix: 'charities',
    selectorLabel: 'Number Charities',
    formatter: formatCount,
  },
  sum: {
    tooltipSuffix: 'combined income',
    selectorLabel: 'Combined Income',
    formatter: formatCurrency,
  },
}

const CharitiesIncome = ({ filtersObj }) => {
  const [dataKey, setDataKey] = useState(Object.keys(dataKeys)[0])
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
                data={limitBuckets(buckets)}
                layout='vertical'
              >
                <CartesianGrid strokeDasharray='3 3' />
                <YAxis
                  dataKey='key'
                  tickFormatter={key => formatCurrency(Math.pow(10, key))}
                  domain={[0, 9]}
                  type='number'
                />
                <XAxis
                  tickFormatter={dataKeys[dataKey].formatter}
                  type='number'
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
              onChange={setDataKey}
              value={dataKey}
              style={{ position: 'absolute', top: 10, right: 10 }}
            >
              {Object.keys(dataKeys).map(x => (
                <Option
                  key={x}
                  value={x}
                >
                  {dataKeys[x].selectorLabel}
                </Option>
              ))}
            </Select>
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
