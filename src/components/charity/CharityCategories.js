import React from 'react'
import PropTypes from 'prop-types'
import { SectionOverview } from './SectionOverview'
import { DividerTitle } from '../general/DividerTitle'

const CharityCategoriesOverview = ({ causes, beneficiaries, operations, onClick }) => (
  <SectionOverview title="Type of Work" onClick={onClick} hoverable >
    <p>{causes.length} Causes, {beneficiaries.length} Beneficiaries, {operations.length} Operations</p>
  </SectionOverview>
)
CharityCategoriesOverview.propTypes = {
  causes: PropTypes.array,
  beneficiaries: PropTypes.array,
  operations: PropTypes.array,
  onClick: PropTypes.func,
}

const CharityCategories = ({ causes, beneficiaries, operations }) => (
  <div>
    <DividerTitle title="Causes" />
    {causes.map((x, i) => <p key={i}>{x.name}</p>)}
    <DividerTitle title="Beneficiaries" />
    {beneficiaries.map((x, i) => <p key={i}>{x.name}</p>)}
    <DividerTitle title="Operations" />
    {operations.map((x, i) => <p key={i}>{x.name}</p>)}
  </div>
)
CharityCategories.propTypes = {
  causes: PropTypes.array,
  beneficiaries: PropTypes.array,
  operations: PropTypes.array,
}

export { CharityCategories, CharityCategoriesOverview }
