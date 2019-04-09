import React from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import { Table } from 'antd'

const {
  Column,
} = Table

const currencies = {
  GBP: '£',
  USD: '$',
}

const formatCurrency = (x, currency) => `${currencies[currency]}${numeral(x).format('0a')}`

const GrantsTable = ({ grants }) => {
  return (
    <Table
      dataSource={grants}
      footer={() => {}}
      loading={false}
      locale={{ emptyText: 'No finances recorded' }}
      pagination={false}
      rowKey='id'
    >
      <Column
        title='ID'
        dataIndex='id'
        render={x => (
          <a href={`http://grantnav.threesixtygiving.org/grant/${x}`}>{x}</a>
        )}
      />
      <Column
        title='Title'
        dataIndex='title'
      />
      <Column
        title='Description'
        dataIndex='description'
      />
      <Column
        title='Funder'
        dataIndex='fundingOrganization[0].name'
      />
      <Column
        title='Amount'
        dataIndex='amountAwarded'
        render={(x, record) => formatCurrency(x, record.currency)}
      />
      <Column
        title='Date'
        dataIndex='awardDate'
        render={x => x.substring(0,10)}
      />
    </Table>
  )
}
GrantsTable.propTypes = {
  grants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    fundingOrganization: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })),
    amountAwarded: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    awardDate: PropTypes.string.isRequired,
  })),
}
GrantsTable.defaultProps = {
  grants: []
}

export default GrantsTable
