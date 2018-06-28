import React from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import { SectionOverview } from './SectionOverview'
import { NoneText } from '../general/NoneText'
import { DividerTitle } from '../general/DividerTitle'

const formatNumber = x => numeral(x).format('0,0')

const CharityPeopleOverview = ({ trustees, employees, volunteers, onClick }) => (
  <SectionOverview title="People" onClick={onClick} hoverable>
    {trustees > 0 && <p>{formatNumber(trustees)} Trustees</p>}
    {employees > 0 && <p>{formatNumber(employees)} Employees</p>}
    {volunteers > 0 && <p>{formatNumber(volunteers)} Volunteers</p>}
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
    {volunteers > 0 && <DividerTitle title={`${formatNumber(volunteers)} Volunteer${volunteers > 1 ? 's' : ''}`} />}
    {employees > 0 && <DividerTitle title={`${formatNumber(employees)} Employee${employees > 1 ? 's' : ''}`} />}
    <DividerTitle title={`${formatNumber(trustees)} Trustee${trustees > 1 ? 's' : ''}`} />
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
