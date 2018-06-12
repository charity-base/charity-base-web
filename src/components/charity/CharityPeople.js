import React from 'react'
import PropTypes from 'prop-types'
import { SectionOverview } from './SectionOverview'
import { NoneText } from '../general/NoneText'
import { DividerTitle } from '../general/DividerTitle'

const CharityPeopleOverview = ({ trustees, onClick }) => (
  <SectionOverview title="People" onClick={onClick} hoverable>
    <p>{trustees.names.length} Trustees {trustees.incorporated ? '(included incorporated entity)' : ''}</p>
    <p>45 (for example) employees</p>
    <p>12 (for example) volunteers</p>
  </SectionOverview>
)
CharityPeopleOverview.propTypes = {
  trustees: PropTypes.object,
  onClick: PropTypes.func,
}


const CharityPeople = ({ trustees }) => (
  <div>
    <DividerTitle title={`${trustees.names.length} Trustee${trustees.names.length > 1 ? 's' : ''}`} />
    {trustees.incorporated && <p><NoneText>(this list includes an incorporated entity)</NoneText></p>}
    {trustees.names.map((x, i) => <p key={i}>{x}</p>)}
  </div>
)
CharityPeople.propTypes = {
  trustees: PropTypes.object,
}

export { CharityPeople, CharityPeopleOverview }
