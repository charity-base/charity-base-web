import React from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import { Table } from 'antd'

const {
  Column,
} = Table

const formatCurrency = x => `£${numeral(x).format('0a')}`

const FinancesTable = ({ finances }) => {
  return (
    <Table
      dataSource={finances}
      footer={() => {}}
      loading={false}
      locale={{ emptyText: 'No finances recorded' }}
      pagination={false}
      rowKey={x => x.financialYear.end}
    >
      <Column
        title='Income'
        dataIndex='income'
        render={formatCurrency}
      />
      <Column
        title='Spending'
        dataIndex='spending'
        render={formatCurrency}
      />
      <Column
        title='Year End'
        dataIndex='financialYear.end'
        render={x => x.substring(0,10)}
      />
    </Table>
  )
}
FinancesTable.propTypes = {
  finances: PropTypes.arrayOf(PropTypes.shape({
    income: PropTypes.number.isRequired,
    spending: PropTypes.number.isRequired,
    financialYear: PropTypes.shape({
      end: PropTypes.string.isRequired,
    }),
  })),
}
FinancesTable.defaultProps = {
  finances: []
}

export default FinancesTable
