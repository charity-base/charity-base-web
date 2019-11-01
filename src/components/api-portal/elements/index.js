import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { CenteredContent, ResponsiveScroll } from '../../general/Layout'
import { Icon, Typography } from 'antd'
import Autofill from './autofill'

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

const Elements = () => {
  return (
    <ResponsiveScroll>
      <CenteredContent>
        <Section>
          <Title>
            <Icon type='build' style={{ marginRight: '0.5em' }} />
            CharityBase Elements
          </Title>
          <SectionText>
            <Paragraph>
              CharityBase Elements is a set of prebuilt UI components, like inputs and maps, which utilise the API for common use cases.
              Elements are completely customisable and you can style Elements to match the look and feel of your site.
            </Paragraph>
          </SectionText>
        </Section>
        <Section>
          <Title level={3}>
            Autofilling Forms
          </Title>
          <SectionText>
            <Paragraph>
              You accept applications / sign-ups from charities (registered in england & wales)?
            </Paragraph>
            <Autofill />
          </SectionText>
        </Section>
      </CenteredContent>
    </ResponsiveScroll>
  )
}

export default Elements
