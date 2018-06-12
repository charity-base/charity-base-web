import React from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import { SectionOverview } from './SectionOverview'

const CharityFinancialOverview = ({ income, fyend, onClick }) => (
  <SectionOverview title="Financial" onClick={onClick} hoverable>
    <p>Latest Income: {numeral(income.latest.total).format('($ 0.0 a)').replace('$', '£')}</p>
    <p>Financial Year End: {fyend}</p>
  </SectionOverview>
)
CharityFinancialOverview.propTypes = {
  income: PropTypes.object,
  fyend: PropTypes.string,
  onClick: PropTypes.func,
}


const CharityFinancial = ({ income, fyend }) => (
  <div>
    <div>Latest Income: {numeral(income.latest.total).format('($ 0.0 a)').replace('$', '£')}</div>
    <div>Financial Year End: {fyend}</div>
  </div>
)
CharityFinancial.propTypes = {
  income: PropTypes.object,
  fyend: PropTypes.string,
}

export { CharityFinancial, CharityFinancialOverview }
