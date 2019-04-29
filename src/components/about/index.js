import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Layout, Row, Col, Typography } from 'antd'
import { CenteredContent, ContentLayout, ResponsiveScroll } from '../general/Layout'
import SideBar from '../general/side-bar'

const {
  Paragraph,
  Title,
} = Typography

const Section = styled.div`
  margin-bottom: 5em;
  h1, h2, h3, h4 {
    color: rgba(0,0,0,.65) !important;
    ${({ id, selectedId }) => id === selectedId && 'color: #EC407A !important;'}
  }
  h1 {
    font-weight: 350 !important;
    letter-spacing: 0.05em !important;
  }
  h4 {
    font-size: 1em !important;
  }
`

const SectionText = styled.div`
  font-size: 1.3em;
  margin: 1.5em auto;
  max-width: 730px;
`

class About extends Component {
  render() {
    const { questionId } = this.props
    return (
      <Layout>
        <SideBar />
        <ContentLayout>
          <ResponsiveScroll>
            <CenteredContent>
              <Section id="what-is-it" selectedId={questionId}>
                <Title level={3}>
                  What is CharityBase?
                </Title>
                <SectionText>
                  <Paragraph>
                    CharityBase is a database, <Link to='/api-portal'>API</Link> and web platform which provides public information on the activities, locations and finances of the 168,000 charities registered in England and Wales.  It's free and open source!
                  </Paragraph>
                  <Paragraph>
                    The Charity Commission for England and Wales have four online services for accessing their data but none of them are comprehensive: <a rel='noopener noreferrer' target='_blank' href='http://apps.charitycommission.gov.uk/showcharity/registerofcharities/RegisterHomePage.aspx'>original website</a>, <a rel='noopener noreferrer' target='_blank' href='http://beta.charitycommission.gov.uk'>beta website</a>, <a rel='noopener noreferrer' target='_blank' href='http://data.charitycommission.gov.uk/'>file downloads</a> & <a rel='noopener noreferrer' target='_blank' href='http://apps.charitycommission.gov.uk/Showcharity/API/APIHome.aspx'>SOAP API</a>.
                  </Paragraph>
                  <Paragraph>
                    CharityBase is an unofficial project to clean up, aggregate and supplement the data they publish and make it accessible to every kind of user.
                  </Paragraph>
                </SectionText>
              </Section>
              <Section id="who-uses-it" selectedId={questionId}>
                <Title level={3}>
                  Who uses CharityBase?
                </Title>
                <SectionText>
                  <Paragraph>
                    <strong>Developers</strong> and service designers use the API to help build services for and about charities.
                  </Paragraph>
                  <Paragraph>
                    <strong>Researchers</strong> at universities and non-profits use the raw data to analyse the charity sector.
                  </Paragraph>
                  <Paragraph>
                    <strong>Donors</strong>, grantmakers and philanthropists use the web platform to look up charities and carry out due diligence.
                  </Paragraph>
                </SectionText>
              </Section>
              <Section id="download" selectedId={questionId}>
                <Title level={3}>
                  Can I Download the Data?
                </Title>
                <SectionText>
                  <Paragraph>
                    Yes, you can download the entire results from any query to CSV or JSON. <Link to='/chc'>Search charities</Link> to get started.
                  </Paragraph>
                </SectionText>
              </Section>
              <Section id="other-countries" selectedId={questionId}>
                <Title level={3}>
                  What About Other Countries?
                </Title>
                <SectionText>
                  <Paragraph>
                    We plan to add Scottish and Northern Irish charities to the register soon but don't have a set deadline.  Get in touch if you'd like to see these or any other countries in our database: <strong>support@charitybase.uk</strong>
                  </Paragraph>
                </SectionText>
              </Section>
              <Section id="who-makes-it" selectedId={questionId}>
                <Title level={3}>
                  Who's behind it?
                </Title>
                <SectionText>
                  <Row type='flex'>
                    <Col xxl={21} xl={19} lg={18} md={16} sm={12} xs={24} >
                      <Paragraph>All the CharityBase code is open source at <a rel='noopener noreferrer' target='_blank' href='https://github.com/charity-base'>github.com/charity-base</a> and continuously improving thanks to a growing community of charity data enthusiasts.</Paragraph>
                      <Paragraph>It was initiated in 2016 by <a rel='noopener noreferrer' target='_blank' href='https://twitter.com/dan_kwiat'>Dan Kwiatkowski</a> - a freelance data scientist and fellow of <a rel='noopener noreferrer' target='_blank' href='https://nwspk.com'>Newspeak House</a>.</Paragraph>
                    </Col>
                    <Col xxl={3} xl={5} lg={6} md={8} sm={12} xs={24} style={{ padding: '20px' }}>
                      <a rel='noopener noreferrer' target='_blank' href='https://twitter.com/dan_kwiat'><img style={{ width: '80px', height: '80px', borderRadius: '80px', }} alt='' src='https://avatars.io/twitter/dan_kwiat' /></a>
                    </Col>
                  </Row>
                </SectionText>
              </Section>
              <Section id="contact" selectedId={questionId}>
                <Title level={3}>
                  Contact
                </Title>
                <SectionText>
                  <Paragraph>
                    If you encounter any problems or have a feature request, please <a rel='noopener noreferrer' target='_blank' href='https://github.com/charity-base/charity-base-web/issues/new'>add an issue</a>.
                  </Paragraph>
                  <Paragraph>
                    For any other feedback or questions, email <strong>support@charitybase.uk</strong> or tweet <a href='https://twitter.com/charitybase_uk' >@charitybase_uk</a>.
                  </Paragraph>
                </SectionText>
              </Section>
              <Section id="licence" selectedId={questionId}>
                <Title level={3}>
                  Licence
                </Title>
                <SectionText>
                  <Paragraph>
                    The bulk of the database comes from <a rel='noopener noreferrer' target='_blank' href='http://data.charitycommission.gov.uk/'>Charity Commission data files</a> shared under an <a rel='noopener noreferrer' target='_blank' href='https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/'>Open Government Licence</a>.
                  </Paragraph>
                  <Paragraph>
                    The grant funding data comes from <a rel='noopener noreferrer' target='_blank' href='http://grantnav.threesixtygiving.org/datasets/'>GrantNav</a>, a <a rel='noopener noreferrer' target='_blank' href='http://www.threesixtygiving.org/'>360Giving</a> application released under the terms of the <a rel='noopener noreferrer' target='_blank' href='https://creativecommons.org/licenses/by-sa/4.0/'>Creative Commons Attribution Sharealike licence (CC-BY-SA)</a>.  Here's <a rel='noopener noreferrer' target='_blank' href='http://grantnav.threesixtygiving.org/datasets/#copyright'>copyright and attribution</a> information for the original datasets.
                  </Paragraph>
                  <Paragraph>Contains OS data © Crown copyright and database right 2018.</Paragraph>
                  <Paragraph>Contains Royal Mail data © Royal Mail copyright and database right 2018.</Paragraph>
                  <Paragraph>Contains National Statistics data © Crown copyright and database right 2018.</Paragraph>
                </SectionText>
              </Section>
            </CenteredContent>
          </ResponsiveScroll>
        </ContentLayout>
      </Layout>
    )
  }
}
About.propTypes = {
  questionId: PropTypes.string,
}

export default About
