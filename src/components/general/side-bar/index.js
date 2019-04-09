import React, { Fragment, useState } from 'react'
import { Route } from 'react-router-dom'
import { Layout } from 'antd'
import { HomeLink } from '../../general/Layout'
import LogInOrOut from '../../general/LogInOrOut'
import NavMenu from './NavMenu'
import ListenToProp from './ListenToProp'

const SIDER_WIDTH = 240

const SideBar = () => {
  const [chcIds, setChcIds] = useState([])
  return (
    <Fragment>
      <Route path='/chc/:id' render={({ match }) => (
        <ListenToProp
          stringProp={match.params.id}
          onChange={id => {
            if (!id) return
            if (chcIds.indexOf(id) > -1) return
            setChcIds([...chcIds, id])
          }}
        />
      )} />
      <Layout.Sider
        width={SIDER_WIDTH}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          color: 'rgba(255,255,255,0.8)',
        }}
      >
        <div
          style={{
            padding: '1em',
            textAlign: 'center',
          }}
        >
          <HomeLink to='/'>CharityBase</HomeLink>
          <LogInOrOut
            renderLoggedInText={name => <p>Logged in as {name}</p>}
            renderLoggedOutText={name => null}
          />
        </div>
        <NavMenu
          chcIds={chcIds}
        />
      </Layout.Sider>
    </Fragment>
  )
}

export default SideBar
