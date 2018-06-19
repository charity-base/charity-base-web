import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import { ScrollableContent, Page } from '../general/Layout'

const Question = styled.div`
  font-size: 20px;
  font-weight: 500;
  padding-top: 10px;
  padding-bottom: 10px;
`

const SubHeading = styled.div`
  padding-left: 20px;
  font-size: 16px;
  font-weight: 500;
  padding-bottom: 5px;
  padding-top: 10px;
`

const Answer = styled.div`
  padding-left: 20px;
  font-size: 14px;
`

class FAQ extends Component {
  render() {
    const { isMobile } = this.props
    return (
      <Page isMobile={isMobile}>
        <Layout.Content style={{ position: 'relative', backgroundColor: '#FFF' }}>
          <ScrollableContent paddingTop={24}>
            <Question>
              How is this different from the Charity Commission's website?
            </Question>
            <SubHeading>
              More Data (and cleaner too)
            </SubHeading>
            <Answer>
              The Charity Commission has a few online sources of data: an <a rel='noopener noreferrer' target='_blank' href='http://apps.charitycommission.gov.uk/showcharity/registerofcharities/RegisterHomePage.aspx'>original website</a>, a <a rel='noopener noreferrer' target='_blank' href='http://beta.charitycommission.gov.uk'>beta website</a> and some <a rel='noopener noreferrer' target='_blank' href='http://data.charitycommission.gov.uk/'>raw file downloads</a>.
              Unfortunately none of these are comprehensive so we've merged them all together and supplemented the information with content from other sources.
            </Answer>
            <SubHeading>
              Better Search
            </SubHeading>
            <Answer>
              The CharityBase search engine is powerful and allows more filtering options e.g. by location.
            </Answer>
            <SubHeading>
              Full Downloads
            </SubHeading>
            <Answer>
              <div>CharityBase allows downloading the entire results from any query to a file of newline-delimited JSON (<a rel='noopener noreferrer' target='_blank' href='http://jsonlines.org/'>more info</a>). CSV coming soon.</div>
              <div>You want a download of the entire database?  Just click download without applying any filters!</div>
            </Answer>
            <SubHeading>
              Free API
            </SubHeading>
            <Answer>
              Our REST API makes it very easy to pull charity data into your own website, as well as other fancy things.
            </Answer>
            <SubHeading>
              Open Source
            </SubHeading>
            <Answer>
              All our code is open source at <a rel='noopener noreferrer' target='_blank' href='https://github.com/charity-base'>github.com/charity-base</a> and continuously improving thanks to a growing community of charity data nerds.
            </Answer>
          </ScrollableContent>
        </Layout.Content>
      </Page>
    )
  }
}
FAQ.propTypes = {
  queryString: PropTypes.string,
  isMobile: PropTypes.bool,
}

export { FAQ }
