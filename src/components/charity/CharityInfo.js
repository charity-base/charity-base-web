import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Col, Row, Modal } from 'antd'
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


class CharityOverview extends Component {
  render() {
    const { charity, onViewSelect } = this.props
    return (
      <div>
        <InfoText>
          {charity.activities}
        </InfoText>
        <Row gutter={16} type="flex" justify="center" align="top">
          <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
            <SectionOverview bordered={false} >
              <InfoText>Charity Commission Number: <strong>{charity.ids['GB-CHC']}</strong></InfoText>
            </SectionOverview>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
            <SectionOverview bordered={false} >
              <InfoText>Companies House Number: <strong>{charity.companiesHouseNumber || <NoneText>N/A</NoneText>}</strong></InfoText>
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
