import React from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import { Row, Col } from 'antd'
import { SectionOverview } from './SectionOverview'
import { DividerTitle } from '../general/DividerTitle'

const formatMoney = x => (
  numeral(x).format('($ 0.0 a)').replace('$', '£')
)

const formatDate = x => (
  new Date(Date.parse(x)).toDateString().substr(4)
)

const CharityFinancialOverview = ({ income, fyend, onClick }) => (
  <SectionOverview title="Financial" onClick={onClick} hoverable>
    <p>Latest Income: {formatMoney(income.latest.total)}</p>
  </SectionOverview>
)
CharityFinancialOverview.propTypes = {
  income: PropTypes.object,
  fyend: PropTypes.string,
  onClick: PropTypes.func,
}


const CharityFinancial = ({ income, fyend }) => (
  <div>
    {income.annual.sort((a, b) => Date.parse(b.financialYear.end) - Date.parse(a.financialYear.end)).map((x, i) => (
      <div key={i}>
        <DividerTitle title={formatDate(x.financialYear.end)} />
        <Row align='center' type='flex' gutter={16}>
          <Col span={12} style={{textAlign: 'right'}}>Income:</Col>
          <Col span={12} style={{textAlign: 'left'}}>{formatMoney(x.income)}</Col>
        </Row>
        <Row align='center' type='flex' gutter={16}>
          <Col span={12} style={{textAlign: 'right'}}>Expenditure:</Col>
          <Col span={12} style={{textAlign: 'left'}}>{formatMoney(x.expend)}</Col>
        </Row>
      </div>
    ))}
  </div>
)
CharityFinancial.propTypes = {
  income: PropTypes.object,
  fyend: PropTypes.string,
}

export { CharityFinancial, CharityFinancialOverview }
