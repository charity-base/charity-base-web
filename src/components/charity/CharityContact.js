import React from 'react'
import PropTypes from 'prop-types'
import { SectionOverview } from './SectionOverview'
import { CleanLink } from '../general/CleanLink'
import { NoneText } from '../general/NoneText'
import { DividerTitle } from '../general/DividerTitle'


const CharityContactOverview = ({ website, email, address, postcode, onClick }) => (
  <SectionOverview title="Contact" onClick={onClick} hoverable >
    <p>{email ? email : <NoneText>no email recorded</NoneText>}</p>
    <p>{website ? <CleanLink url={website} stopPropagation /> : <NoneText>no website recorded</NoneText>}</p>
    <div>{[address[address.length - 1], postcode].join(', ')}</div>
  </SectionOverview>
)
CharityContactOverview.propTypes = {
  website: PropTypes.string,
  email: PropTypes.string,
  address: PropTypes.array,
  postcode: PropTypes.string,
  onClick: PropTypes.func,
}


const CharityContact = ({ email, person, phone, postcode, address }) => (
  <div>
    <DividerTitle title="Point of Contact" />
    <p>{person ? person : <NoneText>no point of contact recorded</NoneText>}</p>
    <p>{email ? email : <NoneText>no email recorded</NoneText>}</p>
    <p>{phone ? phone : <NoneText>no phone recorded</NoneText>}</p>
    <DividerTitle title="Registered Address" />
    {[...address, postcode].map((x, i) => <p key={i}>{x}</p>)}
  </div>
)
CharityContact.propTypes = {
  email: PropTypes.string,
  person: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.array,
  postcode: PropTypes.string,
}

export { CharityContact, CharityContactOverview }
