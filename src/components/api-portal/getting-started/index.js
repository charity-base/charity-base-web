import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { CenteredContent, ResponsiveScroll } from '../../general/Layout'
import { Icon, Typography } from 'antd'

const {
  Paragraph,
  Title,
} = Typography

const Section = styled.div`
  margin-bottom: 5em;
  h1, h2, h3, h4 {
    color: rgba(0,0,0,.65) !important;
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

const GettingStarted = () => {
  return (
    <ResponsiveScroll>
      <CenteredContent>
        <Section>
          <Title>
            <Icon type='api' style={{ marginRight: '0.5em' }} />
            Getting Started with the API
          </Title>
        </Section>
        <Section>
          <Title level={3}>
            What's an API?
          </Title>
          <SectionText>
            <Paragraph>
              An API is a generic term for the tool which one piece of software uses to communicate with another piece of software.
              Don't worry about what it stands for.
            </Paragraph>
            <Paragraph>
              Put simply, the CharityBase API allows anyone to plug into our database.
              A user of the API can send a request for specific information and the API will respond almost immediately with the relevant structured data.
            </Paragraph>
            <Paragraph>
              The CharityBase API enables organisations to build charitable digital tools without needing to do the heavy lifting of collecting, cleaning, storing, aggregating & serving data.
            </Paragraph>
          </SectionText>
        </Section>
        <Section>
          <Title level={3}>
            Applications
          </Title>
          <SectionText>
            <Paragraph>
              "Requesting data" might sound abstract but this encompases lots of utilities in day-to-day things we do online.
              The API can help almost any digital service that involves charities in the UK.
            </Paragraph>
            <Paragraph>
              Examples coming soon.
            </Paragraph>
          </SectionText>
        </Section>
        <Section>
          <Title level={3}>
            Usage
          </Title>
          <SectionText>
            <Paragraph>
              There are a couple of ways to use the API.
              Either way you need to create a key from the <Link to='/api-portal/keys'>API Keys</Link> management page.
            </Paragraph>
            <Title level={4}>
              Widgets
            </Title>
            <Paragraph>
              Coming soon.
            </Paragraph>
            <Title level={4}>
              GraphQL
            </Title>
            <Paragraph>
              Instruction coming soon.  In the meantime, <Link to='/api-portal/playground'>visit the playground</Link>.
            </Paragraph>
          </SectionText>
        </Section>
      </CenteredContent>
    </ResponsiveScroll>
  )
}


// <Section>
//   <Title level={3}>
//     Pricing
//   </Title>
//   <SectionText>
//     <Paragraph>
//       It's free and can handle x requests/second.  Also open source if you want to run a separate instance yourselves.
//     </Paragraph>
//   </SectionText>
// </Section>
// * registration form (real-time data validation, saving time & reducing bounce rate)
// * suggest relevant charities
// * map of charities
// * search bar

export default GettingStarted
