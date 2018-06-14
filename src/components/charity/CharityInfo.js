import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Card, Col, Row, Timeline, Divider, Modal } from 'antd'
import { SectionOverview } from './SectionOverview'
import { CharitySubsidiaries, CharitySubsidiariesOverview } from './CharitySubsidiaries'
import { CharityCategories, CharityCategoriesOverview } from './CharityCategories'
import { CharityContact, CharityContactOverview } from './CharityContact'
import { CharityFinancial, CharityFinancialOverview } from './CharityFinancial'
import { CharityPeople, CharityPeopleOverview } from './CharityPeople'
import { CharityPlaces, CharityPlacesOverview } from './CharityPlaces'
import { CharityReports } from './CharityReports'
import { NoneText } from '../general/NoneText'
import { CopyUrl } from '../general/CopyUrl'
import { InfoText } from '../general/InfoText'

const CharityHeader = styled.div`
  font-size: 28px;
`

const CharitySubheader = styled.div`
  font-size: 16px;
  color: rgba(0,0,0,.5);
`

const SmallIcon = styled.img`
  width: 40px;
  margin-left: 20px;
`

class CharityOverview extends Component {
  render() {
    const { charity, onViewSelect } = this.props
    return (
      <div>
        <div>
          <CharityHeader>
            {charity.name}
            {charity.isWelsh && <SmallIcon src="https://upload.wikimedia.org/wikipedia/commons/5/59/Flag_of_Wales_2.svg" />}
            {charity.isSchool && <SmallIcon src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Mortarboard.svg" />}
          </CharityHeader>
          {charity.alternativeNames.filter(x => x !== charity.name).length > 0 && (
            <CharitySubheader>
              Working names:  {charity.alternativeNames.filter(x => x !== charity.name).map((x, i) => <span key={i}>"{x}" <Divider type="vertical" /> </span>)}
            </CharitySubheader>
          )}
        </div>
        <Divider />
        <InfoText>
          {charity.activities}
        </InfoText>
        <Row gutter={16} type="flex" justify="center" align="top">
          <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
            <SectionOverview title="Charity Commission (England & Wales)" bordered={false} >
              <InfoText>Charity Number: {charity.ids['GB-CHC']}</InfoText>
              <div>
              <Timeline>
                <Timeline.Item color="green">Registered 1970</Timeline.Item>
                <Timeline.Item color="red">Deregistered 1982</Timeline.Item>
                <Timeline.Item color="green">Registered 1984</Timeline.Item>
              </Timeline>
              </div>
            </SectionOverview>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
            <SectionOverview title="Companies House (UK)" bordered={false} >
              {charity.companiesHouseNumber || <NoneText>none recorded</NoneText>}
            </SectionOverview>
          </Col>
        </Row>
        <Row gutter={16} type="flex" justify="space-around" align="top">
          {[
            <CharityContactOverview
              {...charity.contact}
              website={charity.website}
              onClick={() => onViewSelect('contact')}
            />,
            <CharityPeopleOverview
              {...charity.people}
              onClick={() => onViewSelect('people')}
            />,
            <CharitySubsidiariesOverview
              subsidiaries={charity.subsidiaries}
              onClick={() => onViewSelect('subsidiaries')}
            />,
            <CharityPlacesOverview
              {...charity}
              onClick={() => onViewSelect('places')}
            />,
            <CharityCategoriesOverview
              {...charity}
              onClick={() => onViewSelect('categories')}
            />,
            <CharityFinancialOverview
              {...charity}
              onClick={() => onViewSelect('finances')}
            />,
          ].map((x, i) => (
            <Col key={i} xxl={8} xl={8} lg={12} md={24} sm={24} xs={24}>
              {x}
            </Col>
          ))}
        </Row>
      </div>
    )
  }
}
CharityOverview.propTypes = {
  charity: PropTypes.object,
  onViewSelect: PropTypes.func,
}

const InfoModal = props => (
  <Modal {...props}
    bodyStyle={{ maxHeight: '80vh', overflowY: 'scroll', textAlign: 'center' }}
    width={600}
    footer={null}
  />
)


const viewNames = {
  subsidiaries: 'Subsidiaries',
  contact: 'Contact',
  people: 'People',
  places: 'Places',
  categories: 'Categories',
  finances: 'Finances',
  reports: 'Reports',
}


const CharityInfo = ({ view, charity, onViewSelect, goBack }) => (
  <div>
    <CharityOverview charity={charity} onViewSelect={onViewSelect} />
    <InfoModal
      visible={Object.keys(viewNames).indexOf(view) > -1}
      onCancel={goBack}
    >
      <Card.Meta
        title={charity.name}
        description={viewNames[view]}
      />
      <InfoText>
        <CopyUrl />
      </InfoText>
      {view === 'subsidiaries' && (
        <CharitySubsidiaries name={charity.name} subsidiaries={charity.subsidiaries} />
      )}
      {view === 'contact' && (
        <CharityContact {...charity.contact} />
      )}
      {view === 'people' && (
        <CharityPeople {...charity.people} {...charity.trustees} />
      )}
      {view === 'places' && (
        <CharityPlaces areaOfBenefit={charity.areaOfBenefit} areasOfOperation={charity.areasOfOperation} />
      )}
      {view === 'categories' && (
        <CharityCategories {...charity} />
      )}
      {view === 'finances' && (
        <CharityFinancial income={charity.income} fyend={charity.fyend} />
      )}
      {view === 'reports' && (
        <CharityReports />
      )}
    </InfoModal>
  </div>
)
CharityInfo.propTypes = {
  view: PropTypes.string,
  charity: PropTypes.object,
  onViewSelect: PropTypes.func,
  goBack: PropTypes.func,
}

export { CharityInfo }
