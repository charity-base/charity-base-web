import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { CenteredContent, ResponsiveScroll } from '../../general/Layout'
import { Icon, Typography } from 'antd'
import Example1 from './example-1'

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
              Put simply, the CharityBase API <strong><i>allows anyone to plug into our database</i></strong>.
              A user of the API can send a request for specific information and the API will respond almost immediately with the relevant structured data.
            </Paragraph>
            <Paragraph>
              The CharityBase API enables organisations to build charitable digital tools without needing to do the heavy lifting of collecting, cleaning, storing, aggregating & serving data.
            </Paragraph>
          </SectionText>
        </Section>
        <Section>
          <Title level={3}>
            CharityBase Elements Overview
          </Title>
          <SectionText>
            <Paragraph>
              CharityBase Elements is a set of prebuilt UI components, like inputs and maps, which utilise the API for common use cases.
              Elements are completely customisable and you can style Elements to match the look and feel of your site.
              They're coming soon...
            </Paragraph>
          </SectionText>
        </Section>
        <Section>
          <Title level={3}>
            Using the API directly
          </Title>
          <SectionText>
            <Paragraph>
              If Elements do not serve your needs...
            </Paragraph>
            <Paragraph>
              CharityBase is a <a href='https://graphql.org' target='_blank' rel='noopener noreferrer'>GraphQL</a> API which gives you the power to ask for exactly the data you need.
              There's a single endpoint <code>https://charitybase.uk/api/graphql</code> where you can send either a <code>GET</code> or a <code>POST</code> request.
              The request must contain a <code>query</code> parameter in the query string or optionally in the JSON body (if using <code>POST</code>).
              You must also supply an <code>Authorization</code> header of the form <code>Apikey YOUR_API_KEY</code>.
            </Paragraph>
            <Paragraph>
              Here's a basic example which counts all charities registered with the Charity Commission.
              Remember to replace <code>YOUR_API_KEY</code> with <Link to='/api-portal/keys'>your actual key</Link>.
            </Paragraph>
            <Paragraph>
              <Example1 />
            </Paragraph>
            <Paragraph>
              To experiment with the query language and see what fields are available, <Link to='/api-portal/playground'>visit the playground</Link>.
              The contents of the left panel makes up the query string to send in your request, as shown in the examples above.
              Click on the "Docs" button in the top right corner of the playground for an interactive schema.
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
