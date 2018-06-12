import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'antd'
import { SectionOverview } from './SectionOverview'
import { NoneText } from '../general/NoneText'

const CharitySubsidiariesOverview = ({ subsidiaries, onClick }) => (
  <SectionOverview title="Subsidiaries" onClick={onClick} hoverable >
    <p>{subsidiaries.length} subsidiaries</p>
  </SectionOverview>
)
CharitySubsidiariesOverview.propTypes = {
  subsidiaries: PropTypes.array,
  onClick: PropTypes.func,
}

const CharitySubsidiaries = ({ subsidiaries }) => (
  subsidiaries.length > 0 ? (
    <List
      size="large"
      bordered
      dataSource={subsidiaries.map(x => x.name)}
      renderItem={item => (<List.Item>{item}</List.Item>)}
    />
  ) : (
    <NoneText>no subsidiaries recorded</NoneText>
  )
)
CharitySubsidiaries.propTypes = {
  subsidiaries: PropTypes.array,
}

export { CharitySubsidiaries, CharitySubsidiariesOverview }
