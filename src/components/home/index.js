import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Col, Layout, Icon, Row, Typography } from "antd"
import SideBar from "../general/side-bar"
import { graphiql, income } from "./images"
import Search from "./Search"

const { Content, Footer } = Layout

const { Title, Paragraph } = Typography

const Section = styled.div`
  margin-bottom: 10em;
  h1 {
    color: rgba(0, 0, 0, 0.65) !important;
    font-weight: 350 !important;
    font-size: 3.5em !important;
    letter-spacing: 0.05em !important;
  }
  h2,
  h3,
  h4 {
    color: rgba(0, 0, 0, 0.65) !important;
  }
`

const SectionText = styled.div`
  font-size: 1.3em;
  margin: 1.5em auto;
  padding: 0 2em;
  max-width: 730px;
`

const TitleIcon = styled(Icon)`
  font-size: 3em;
  margin-bottom: 0.5em;
  color: #ec407a !important;
`

const Image = styled.img`
  width: 100%;
  ${({ maxWidth }) => (maxWidth ? `max-width: ${maxWidth};` : null)}
  box-shadow: rgba(50, 50, 93, 0.25) 0 0 1em;
  transition: box-shadow 0.2s ease-out;
  :hover {
    box-shadow: rgba(50, 50, 93, 0.35) 0 0 2em;
  }
`

const OffsetLayout = styled(Layout)`
  text-align: center !important;
  min-height: 100vh !important;
  @media (min-width: 992px) {
    margin-left: 240px !important;
  }
`

const Home = () => {
  return (
    <Layout>
      <SideBar />
      <OffsetLayout>
        <Content
          style={{ padding: "4em 0", backgroundColor: "rgb(246, 249, 252)" }}
        >
          <Section>
            <Title>The Database of Charities</Title>
            <TitleIcon type="file-search" />
            <Title level={3}>SEARCH ENGINE</Title>
            <SectionText>
              <Paragraph>
                The database is searchable{" "}
                <span role="img" aria-label="see below">
                  👇
                </span>
              </Paragraph>
            </SectionText>
            <Search />
          </Section>
          <Section>
            <TitleIcon type="api" />
            <Title level={3}>API</Title>
            <SectionText>
              <Paragraph>
                The API is a developer-friendly tool for plugging in to our
                database. We opened it up to allow other organisations to create
                new or improve existing digital services for charities.
                <Link to="/api-portal"> Read more...</Link>
              </Paragraph>
            </SectionText>
            <SectionText>
              <Link to="/api-portal/playground">
                <Image src={graphiql} alt="API Playground" maxWidth="600px" />
              </Link>
            </SectionText>
          </Section>
          <Section>
            <TitleIcon type="bar-chart" />
            <Title level={3}>VISUALISATIONS</Title>
            <SectionText>
              <Row align="middle" type="flex">
                <Col xs={24} lg={12}>
                  <Paragraph>
                    As well as listing all charities, the web app responds to
                    your searches by aggregating the data in real-time for an
                    interactive overview of the sector.
                  </Paragraph>
                </Col>
                <Col xs={24} lg={12}>
                  <Link to="/chc">
                    <Image src={income} alt="Income Bands" maxWidth="300px" />
                  </Link>
                </Col>
              </Row>
            </SectionText>
          </Section>
          <Section>
            <TitleIcon type="database" />
            <Title level={3}>DATABASE</Title>
            <SectionText>
              <Paragraph>
                At the heart of CharityBase is the most comprehensive source of
                public data on charities in the UK. Each month our scripts
                collect, clean and supplement the latest data from multiple
                sources before indexing the whole lot to make it easily
                searchable.
                <Link to="/about"> Read more...</Link>
              </Paragraph>
            </SectionText>
          </Section>
        </Content>
        <Footer
          style={{
            background: "#fafafa",
            textAlign: "center",
            padding: "0.5em 1em",
            fontSize: "0.8em",
            lineHight: "0.8em",
          }}
        >
          CharityBase 2021
        </Footer>
      </OffsetLayout>
    </Layout>
  )
}
Home.propTypes = {}

export default Home
