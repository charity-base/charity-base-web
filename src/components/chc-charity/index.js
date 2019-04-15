import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { Layout } from 'antd'
import { GET_CHARITY } from '../../lib/gql'
import { ContentLayout } from '../general/Layout'
import SideBar from '../general/side-bar'
import CharityContentRouter from './CharityContentRouter'
import Header from './Header'

const {
  Content, Footer,
} = Layout

const Charity = ({ id }) => {
  return (
    <Layout>
      <SideBar />
      <Query
        query={GET_CHARITY}
        variables={{ id }}
      >
        {({ loading, error, data }) => {
          if (error) return 'oops err'
          const charity = (data && data.CHC && data.CHC.getCharities.list[0]) || null
          return (
            <ContentLayout>
              <Header
                loading={loading}
                names={charity ? charity.names : []}
              />
              <Content style={{
                background: '#fff',
                margin: '0 0 0 0',
                overflow: 'initial',
                zIndex: 1,
                position: 'relative',
                height: '100%',
              }}>
                <CharityContentRouter
                  charity={charity}
                  id={id}
                  loading={loading}
                />
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
            </ContentLayout>
          )
        }}
      </Query>
    </Layout>
  )
}
Charity.propTypes = {
  id: PropTypes.string.isRequired,
}

export default Charity
