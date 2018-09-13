import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Layout, Anchor, Row, Col } from 'antd'
import { Page, ScrollableContent, ResponsiveSider } from '../general/Layout'
import { DownloadResults } from '../general/download'

const Question = styled.div`
  ${({ id, hash }) => id === hash && 'color: #EC407A;'}
  font-size: 30px;
  font-weight: 300;
  padding-top: 20px;
  padding-bottom: 10px;
`

const Answer = styled.div`
  padding-left: 20px;
  font-size: 16px;
  letter-spacing: 0.05em;
  font-weight: 300;
`

const StyledAnchor = styled(Anchor)`
  padding-top: 24px;
  .ant-anchor-ink {
    ::before {
      content: none;
    }
  }
  .ant-anchor-link {
    padding-bottom: 20px;
    a.ant-anchor-link-title {
      :hover {
        color: #EC407A;
      }
    }
  }
  .ant-anchor-link-active {
    padding-bottom: 20px;
    a.ant-anchor-link-title {
      color: #EC407A;
    }
  }
`

class About extends Component {
  render() {
    const hash = window.location.toString().split('#')[1]
    const { isMobile } = this.props
    return (
      <Page isMobile={isMobile}>
        <ResponsiveSider isMobile={isMobile}>
          <StyledAnchor
            affix={false}
            offsetTop={isMobile ? 50 : 64}
          >
            <Anchor.Link href="#what-is-it" title="What is it?" />
            <Anchor.Link href="#already-exist" title="Doesn't that already exist?" />
            <Anchor.Link href="#who-uses-it" title="Who uses it?" />
            <Anchor.Link href="#api" title="What's an API?" />
            <Anchor.Link href="#download" title="Can I Download the Data?" />
            <Anchor.Link  href="#other-countries" title="What about other countries?" />
            <Anchor.Link href="#who-makes-it" title="Who's behind it?" />
            <Anchor.Link href="#contact" title="Contact" />
            <Anchor.Link href="#licence" title="Licence" />
          </StyledAnchor>
        </ResponsiveSider>
        <Layout.Content style={{ position: 'relative', backgroundColor: '#FFF' }}>
          <ScrollableContent paddingTop={0}>
            <Question id="what-is-it" hash={hash}>
              What is it?
            </Question>
            <Answer>
              <p>CharityBase is a database, API and web platform which provides public information on the activities, locations and finances of the 168,000 charities registered in England and Wales.</p>
              <p>It's free and open source!</p>
            </Answer>
            <Question id="already-exist" hash={hash}>
              Doesn't that already exist?
            </Question>
            <Answer>
              <p>The Charity Commission for England and Wales have four online services for accessing their data but none of them are comprehensive: <a rel='noopener noreferrer' target='_blank' href='http://apps.charitycommission.gov.uk/showcharity/registerofcharities/RegisterHomePage.aspx'>original website</a>, <a rel='noopener noreferrer' target='_blank' href='http://beta.charitycommission.gov.uk'>beta website</a>, <a rel='noopener noreferrer' target='_blank' href='http://data.charitycommission.gov.uk/'>file downloads</a> & <a rel='noopener noreferrer' target='_blank' href='http://apps.charitycommission.gov.uk/Showcharity/API/APIHome.aspx'>SOAP API</a>.</p>
              <p>CharityBase is an unofficial project to clean up, aggregate and supplement the data they publish and make it accessible to every kind of user.</p>
              <p>Several other unofficial projects exist including <a rel='noopener noreferrer' target='_blank' href='https://findthatcharity.uk'>Find that charity</a> and <a rel='noopener noreferrer' target='_blank' href='https://olib.uk/charity'>CharityData</a>.</p>
            </Answer>

            <Question id="who-uses-it" hash={hash}>
              Who uses it?
            </Question>
            <Answer>
              <p><strong>Researchers</strong> at universities and non-profits use the raw data to analyse the charity sector and spot trends.</p>
              <p><strong>Developers</strong> and service designers use the API to help build services for and about charities.</p>
              <p><strong>Donors</strong>, grantmakers and philanthropists use the web platform to look up charities and carry out due diligence.</p>
              <p>If CharityBase is useful to you, please let us know what you’re using it for! And feel free to get in touch with any questions, comments or feedback: <strong>dan@charitybase.uk</strong></p>
            </Answer>

            <Question id="api" hash={hash}>
              What's an API?
            </Question>
            <Answer>
              <p>An application programming interface is a set of clearly defined methods of communication between software components.</p>
              <p>The CharityBase RESTful API makes it very easy for web developers to pull charity data into their websites from our database, so if you're designing a service for or about charities this could be a great resource for you.</p>
            </Answer>

            <Question id="download" hash={hash}>
              Can I Download the Data?
            </Question>
            <Answer>
              <p>Yes, you can download the entire results from any query to a <a rel='noopener noreferrer' target='_blank' href='http://jsonlines.org/'>JSON Lines</a> file by clicking the button on the left hand side of the results page.</p>
              <p>You want the entire, unfiltered database (184 MB compressed)? Here you go: <DownloadResults queryString='' linkText='JSON' fileType='JSON' /> or <DownloadResults queryString='' linkText='reduced CSV' fileType='CSV' />.</p>
            </Answer>

            <Question id="other-countries" hash={hash}>
              What About Other Countries?
            </Question>
            <Answer>
              <p>We hope to add Scottish and Northern Irish charities to the register soon but don't have a set deadline.</p>
              <p>Get in touch if you'd like to see these or any other countries in our database: <strong>dan@charitybase.uk</strong></p>
            </Answer>

            <Question id="who-makes-it" hash={hash}>
              Who's behind it?
            </Question>
            <Answer>
              <Row align='justify' type='flex'>
                <Col xxl={21} xl={19} lg={18} md={16} sm={12} xs={24} >
                  <p>All the CharityBase code is open source at <a rel='noopener noreferrer' target='_blank' href='https://github.com/charity-base'>github.com/charity-base</a> and continuously improving thanks to a growing community of charity data enthusiasts.</p>
                  <p>It was initiated in 2016 by <a rel='noopener noreferrer' target='_blank' href='https://twitter.com/dan_kwiat'>Dan Kwiatkowski</a> - a freelance data scientist and fellow of <a rel='noopener noreferrer' target='_blank' href='https://nwspk.com'>Newspeak House</a>.</p>
                </Col>
                <Col xxl={3} xl={5} lg={6} md={8} sm={12} xs={24} style={{ padding: '20px' }}>
                  <a rel='noopener noreferrer' target='_blank' href='https://twitter.com/dan_kwiat'><img style={{ width: '80px', height: '80px', borderRadius: '80px', }} alt='' src='https://avatars.io/twitter/dan_kwiat' /></a>
                </Col>
              </Row>
            </Answer>

            <Question id="contact" hash={hash}>
              Contact
            </Question>
            <Answer>
              <p>If you encounter any problems or have a feature request, please <a rel='noopener noreferrer' target='_blank' href='https://github.com/charity-base/charity-base-web/issues/new'>add an issue</a>.</p>
              <p>For any other feedback or questions, email <strong>dan@charitybase.uk</strong></p>
            </Answer>

            <Question id='licence' hash={hash}>
              Licence
            </Question>
            <Answer>
              <p>The bulk of the database comes from <a rel='noopener noreferrer' target='_blank' href='http://data.charitycommission.gov.uk/'>Charity Commission data files</a> shared under an <a rel='noopener noreferrer' target='_blank' href='https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/'>Open Government Licence</a>.</p>
              <p>The grant funding data comes from <a rel='noopener noreferrer' target='_blank' href='http://grantnav.threesixtygiving.org/datasets/'>GrantNav</a>, a <a rel='noopener noreferrer' target='_blank' href='http://www.threesixtygiving.org/'>360Giving</a> application released under the terms of the <a rel='noopener noreferrer' target='_blank' href='https://creativecommons.org/licenses/by-sa/4.0/'>Creative Commons Attribution Sharealike licence (CC-BY-SA)</a>.  Here's <a rel='noopener noreferrer' target='_blank' href='http://grantnav.threesixtygiving.org/datasets/#copyright'>copyright and attribution</a> information for the original datasets.</p>
              <p>Contains OS data © Crown copyright and database right 2018.</p>
              <p>Contains Royal Mail data © Royal Mail copyright and database right 2018.</p>
              <p>Contains National Statistics data © Crown copyright and database right 2018.</p>
            </Answer>
          </ScrollableContent>
        </Layout.Content>
      </Page>
    )
  }
}
About.propTypes = {
  queryString: PropTypes.string,
  isMobile: PropTypes.bool,
}

export { About }
