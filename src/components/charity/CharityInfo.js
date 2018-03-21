import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import numeral from 'numeral'

const CharityHeader = styled.div`
  font-size: 28px;
`

const CharityOverview = ({ charity }) => (
  <div>
    <div>AKA: {charity.alternativeNames.filter(x => x !== charity.name).join(', ')}</div>
    <div>Charity Commission Id: {charity.ids['GB-CHC']}</div>
    <div>Companies House Id: {charity.companiesHouseNumber || 'none'}</div>
    <div>Activities: {charity.activities}</div>
    <div>{charity.subsidiaries.length} subsidiaries</div>
    <div>Area of Benefit: {charity.areaOfBenefit}</div>
    <div>Areas of Operation: {charity.areasOfOperation.map(x => x.name).join(',')}</div>
    <div>Contact: {JSON.stringify(charity.contact)}</div>
    <div>Is Welsh: {charity.isWelsh ? 'True' : 'False'}</div>
    <div>Is School: {charity.isSchool ? 'True' : 'False'}</div>
    <div>Trustees Incorporated: {charity.trustees.incorporated ? 'True' : 'False'}</div>
    <div>Trustees: {charity.trustees.names.join(',')}</div>
    <a href={charity.website}>{charity.website}</a>
    <div>Latest Income: {numeral(charity.income.latest.total).format('($ 0.0 a)').replace('$', '£')}</div>
    <div>Financial Year End: {charity.fyend}</div>
    <div>Categories: {charity.categories.map(x => x.name).join(',')}</div>
    <div>Beneficiaries: {charity.beneficiaries.map(x => x.name).join(',')}</div>
    <div>Operations: {charity.operations.map(x => x.name).join(',')}</div>
  </div>
)
CharityOverview.propTypes = {
  charity: PropTypes.object,
}


const CharityContact = ({ email, person, phone, postcode, address, website }) => (
  <div>
    <div>Website: {website}</div>
    <div>Email: {email}</div>
    <div>Person: {person}</div>
    <div>Phone: {phone}</div>
    <div>Postcode: {postcode}</div>
    <div>Address: {address.join(', ')}</div>
  </div>
)
CharityContact.propTypes = {
  website: PropTypes.string,
  email: PropTypes.string,
  person: PropTypes.string,
  phone: PropTypes.string,
  postcode: PropTypes.string,
  address: PropTypes.array,
}


const CharityPeople = ({ trustees }) => (
  <div>
    <div>One of Trustees is incorporated entity: {trustees.incorporated ? 'True' : 'False'}</div>
    <div>{trustees.names.length} Trustees: {trustees.names.map((x, i) => <div key={i}>{x}</div>)}</div>
  </div>
)
CharityPeople.propTypes = {
  trustees: PropTypes.object,
}


const CharityPlaces = ({ areaOfBenefit, areasOfOperation }) => (
  <div>
    <div>Area of Benefit: {areaOfBenefit}</div>
    <div>Areas of Operation: {areasOfOperation.map((x, i) => <div key={i}>{x.name}</div>)}</div>
  </div>
)
CharityPlaces.propTypes = {
  areaOfBenefit: PropTypes.string,
  areasOfOperation: PropTypes.array,
}


const CharityCategories = ({ categories, beneficiaries, operations }) => (
  <div>
    <div><b>Activities:</b> {categories.map((x, i) => <div key={i}>{x.name}</div>)}</div>
    <div><b>Beneficiaries:</b>  {beneficiaries.map((x, i) => <div key={i}>{x.name}</div>)}</div>
    <div><b>Operations:</b>  {operations.map((x, i) => <div key={i}>{x.name}</div>)}</div>
  </div>
)
CharityCategories.propTypes = {
  categories: PropTypes.array,
  beneficiaries: PropTypes.array,
  operations: PropTypes.array,
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


const CharityReports = () => (
  <div>
    <div>Link to reports..</div>
  </div>
)
CharityReports.propTypes = {}


const CharityInfo = ({ selectedKey, charity }) => (
  <div>
    <CharityHeader>{charity.name}</CharityHeader>
    {selectedKey === 'Overview' && (
      <CharityOverview charity={charity} />
    )}
    {selectedKey === 'Contact' && (
      <CharityContact {...charity.contact} website={charity.website} />
    )}
    {selectedKey === 'People' && (
      <CharityPeople trustees={charity.trustees} />
    )}
    {selectedKey === 'Places' && (
      <CharityPlaces areaOfBenefit={charity.areaOfBenefit} areasOfOperation={charity.areasOfOperation} />
    )}
    {selectedKey === 'Categories' && (
      <CharityCategories categories={charity.categories} beneficiaries={charity.beneficiaries} operations={charity.operations} />
    )}
    {selectedKey === 'Finances' && (
      <CharityFinancial income={charity.income} fyend={charity.fyend} />
    )}
    {selectedKey === 'Reports' && (
      <CharityReports />
    )}
  </div>
)
CharityInfo.propTypes = {
  selectedKey: PropTypes.string,
  charity: PropTypes.object,
}

export { CharityInfo }
