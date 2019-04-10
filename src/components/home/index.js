import React, { useState } from 'react'
import styled from 'styled-components'
import { Affix, Layout, Icon, Typography } from 'antd'
import { CenteredContent } from '../general/Layout'
import SideBar from '../general/side-bar'
import CharitiesSearch from '../chc/search'

const {
  Content,
  Footer,
} = Layout

const {
  Title,
  Paragraph,
} = Typography


const SearchContainer = styled.div`
  text-align: left;
  background-color: inherit !important;
  box-sizing: border-box;
  padding: 0 0.5em;
  width: 100%;
  transition: padding 0.2s ease-out;
  ${({ fixed }) => fixed ? `
    padding: 0;
  ` : `
    @media (min-width: 992px) {
      padding: 0 20%;
    }
  `}
`

const Search = () => {
  const [fixed, setFixed] = useState(false)
  return (
    <Affix
      onChange={fixed => setFixed(fixed)}
    >
      <SearchContainer
        fixed={fixed}
      >
        <CharitiesSearch
          onAddFilter={item => console.log(item)}
        />
      </SearchContainer>
    </Affix>
  )
}

const Section = styled.div`
  margin-bottom: 10em;
`

const Home = () => {
  return (
    <Layout>
      <SideBar />
      <Layout style={{ marginLeft: 240, textAlign: 'center', minHeight: '100vh' }}>
        <Content style={{ padding: '2em 0', backgroundColor: 'papayawhip', }}>
          <Section>
            <Title style={{ fontSize: '4em' }}>
              The Database of Charities
            </Title>
          </Section>
          <Section>
            <Title level={2}>
              <Icon type='file-search' style={{ marginRight: '0.8em' }} />
              Search Engine
            </Title>
            <Search />
          </Section>
          <Section>
            <Title level={2}>
              <Icon type='bar-chart' style={{ marginRight: '0.8em' }} />
              Visual Analytics
            </Title>
          </Section>
          <Section>
            <Title level={2}>
              <Icon type='api' style={{ marginRight: '0.8em' }} />
              API
            </Title>
            <Paragraph>
              A tool for creating services for & about charities
            </Paragraph>
            <Paragraph>
              Image & link to GraphQL API playground
            </Paragraph>
          </Section>
          <Section>
            <Title level={2}>
              <Icon type='database' style={{ marginRight: '0.8em' }} />
              Database
            </Title>
            <Paragraph>
              The most comprehensive source of data on charities in the UK
            </Paragraph>
            <Paragraph>
              Download specific search results in CSV or JSON format.
            </Paragraph>
          </Section>
        </Content>
        <Footer style={{
          background: '#fafafa',
          textAlign: 'center',
          padding: '0.5em 1em',
          fontSize: '0.8em',
          lineHight: '0.8em',
        }}>
          CharityBase 2019 - created open source by <a href='https://worthwhile.app'>worthwhile.app</a>
        </Footer>
      </Layout>
    </Layout>
  )
}
Home.propTypes = {
}

export default Home
