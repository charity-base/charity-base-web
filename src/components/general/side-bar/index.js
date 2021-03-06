import React, { Fragment, useState } from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import { Layout, Divider } from 'antd'
import { HomeLink } from '../../general/Layout'
import LogInOrOut from '../../general/LogInOrOut'
import NavMenu from './NavMenu'
import ListenToProp from './ListenToProp'
import { ReactComponent as TwitterIcon } from './twitter.svg'

const SIDER_WIDTH = 240

const Sider = styled(Layout.Sider)`
  overflow: auto !important;
  height: 100vh !important;
  max-height: 100vh !important;
  position: fixed !important;
  left: 0 !important;
  color: rgba(255,255,255,0.8) !important;
  z-index: 2 !important;
`

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
      <Sider
        breakpoint='lg'
        collapsedWidth={0}
        width={SIDER_WIDTH}
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
        <Divider />
        <div
          style={{
            padding: '0 1em',
            marginBottom: '2em',
            textAlign: 'center',
          }}
        >
          <a href='https://twitter.com/charitybase_uk' >
            <TwitterIcon
              width='2em'
              height='2em'
              fill='rgba(255,255,255,.8)'
            />
          </a>
        </div>
      </Sider>
    </Fragment>
  )
}

export default SideBar
