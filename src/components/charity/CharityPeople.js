import React from 'react'
import PropTypes from 'prop-types'
import { SectionOverview } from './SectionOverview'
import { NoneText } from '../general/NoneText'
import { DividerTitle } from '../general/DividerTitle'

const CharityPeopleOverview = ({ trustees, employees, volunteers, onClick }) => (
  <SectionOverview title="People" onClick={onClick} hoverable>
    <p>{trustees} Trustees</p>
    <p>{employees} Employees</p>
    <p>{volunteers} Volunteers</p>
  </SectionOverview>
)
CharityPeopleOverview.propTypes = {
  trustees: PropTypes.number,
  employees: PropTypes.number,
  volunteers: PropTypes.number,
  onClick: PropTypes.func,
}


const CharityPeople = ({ trustees, employees, volunteers, incorporated, names }) => (
  <div>
    {volunteers > 0 && <DividerTitle title={`${volunteers} Volunteer${volunteers > 1 ? 's' : ''}`} />}
    {employees > 0 && <DividerTitle title={`${employees} Employee${employees > 1 ? 's' : ''}`} />}
    <DividerTitle title={`${trustees} Trustee${trustees > 1 ? 's' : ''}`} />
    {incorporated && <p><NoneText>(this list includes an incorporated entity)</NoneText></p>}
    {names.map((x, i) => <p key={i}>{x}</p>)}
  </div>
)
CharityPeople.propTypes = {
  trustees: PropTypes.number,
  employees: PropTypes.number,
  volunteers: PropTypes.number,
  incorporated: PropTypes.bool,
  names: PropTypes.array,
}

export { CharityPeople, CharityPeopleOverview }
