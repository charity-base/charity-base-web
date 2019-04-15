import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Skeleton, Typography } from 'antd'
import { CenteredContent } from '../general/Layout'
import Search from '../home/Search'
import CharityFinances from './finances'
import CharityOverview from './overview'

const { Title, Text } = Typography

const CharityContentRouter = ({ charity, id, loading }) => {
  if (loading) return (
    <div style={{ padding: '1em' }}>
      <Skeleton active paragraph={true} />
    </div>
  )
  return charity ? (
    <Switch>
      <Route exact path='/chc/:id' render={() => (
        <CharityOverview {...charity} />
      )} />
      <Route path='/chc/:id/finances' render={() => (
        <CharityFinances {...charity} />
      )} />
      <Redirect to='/chc/:id' />
    </Switch>
  ) : (
    <div style={{ marginTop: '2em', textAlign: 'center' }}>
      <CenteredContent>
        <Title level={3}>
          Oops, we couldn't find a charity with id <Text code>{id}</Text>
        </Title>
        <Title level={4}>
          Try searching instead <span role='img' aria-label='see below'>👇</span>
        </Title>
      </CenteredContent>
      <Search />
    </div>
  )
}
CharityContentRouter.propTypes = {
  charity: PropTypes.object,
  id: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default CharityContentRouter
