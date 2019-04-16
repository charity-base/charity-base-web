import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Layout, Icon } from 'antd'
import { Link } from 'react-router-dom'

const HEADER_HEIGHT = 100
const SIDER_WIDTH = 240

const FixedHeader = styled.div`
  padding: 24px;
  ${({ isMobile, height }) => !isMobile && `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: ${height || HEADER_HEIGHT}px;
    background-color: #FFF;
    z-index: 9999;
    box-shadow: 0 0 1em;
  `}
`

const Scroll = styled.div`
  overflow-y: scroll;
  height: 100%;
  padding: 24px;
`

const ScrollContainer = styled.div`
  ${({ isMobile, paddingTop }) => isMobile ? `
    padding: 0 24px 24px 24px;
  ` : `
    position: relative;
    box-sizing: border-box;
    padding-top: ${paddingTop === undefined ? 0 : paddingTop}px;
    height: 100%;
  `}
`

const ScrollableContent = props => (
  props.isMobile ? (
    <ScrollContainer {...props} />
  ) : (
    <ScrollContainer {...props}>
      <Scroll>{props.children}</Scroll>
    </ScrollContainer>
  )
)
ScrollableContent.propTypes = {
  isMobile: PropTypes.bool,
  paddingTop: PropTypes.number,
}

const ResponsiveScroll = styled.div`
  padding: 2em;
  border-right: 1px solid #eee;
  @media (min-width: 992px) {
    box-sizing: border-box;
    height: 100%;
    overflow-y: scroll;
    position: relative;
  }
`

const CenteredContent = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 720px;
`

const PageContent = styled(Layout.Content)`
  ${({ isMobile }) => isMobile ? `
    margin-top: 50px;
    background-color: #FFF;
    min-height: 80vh;
  ` : `
    position: fixed;
    top: 70px;
    bottom: 20px;
    left: 50px;
    right: 50px;
    margin: 0;
    padding: 0;
  `}
`

const PageLayout = styled(Layout)`
  ${({ isMobile }) => isMobile ? `
    height: 100%;
  ` : `
    background: #FFF;
    border-radius: 5px;
    padding: 5px;
    position: relative;
    height: 100%;
  `}
`

const ContentLayout = styled(Layout)`
  background-color: rgb(246, 249, 252) !important;
  margin-left: 0px;
  min-height: 100vh !important;
  @media (min-width: 992px) {
    margin-left: ${SIDER_WIDTH}px;
    height: 100vh;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`

const ContentLayoutHeader = styled.div`
  box-shadow: 0 0 1em;
  z-index: 2;
  transition: height 0.1s;
  height: ${({ large }) => large ? 2*56 : 56}px;
`

const Page = ({ isMobile, children }) => (
  <PageContent isMobile={isMobile}>
    <PageLayout isMobile={isMobile}>
      {children}
    </PageLayout>
  </PageContent>
)
Page.propTypes = {
  isMobile: PropTypes.bool,
}

const Sider = styled(Layout.Sider)`
  ${({ isMobile, isRight }) => isMobile ? `
    background-color #FFF;
    position: fixed;
    top: 0;
    margin-top: 50px;
    bottom: 0;
    ${isRight ? 'right': 'left'}: 0;
    z-index: 9;
    border-${isRight ? 'left' : 'right'}: solid rgba(0,0,0,0.1) 1px;
    overflow-y: scroll;
  ` : `
    background-color #FFF;
    border-${isRight ? 'left' : 'right'}: solid rgba(0,0,0,0.1) 1px;
  `}
`

const SiderToggle = styled(Icon)`
  ${({ isRight }) => `
    position: fixed;
    top: 16px;
    ${isRight ? 'right' : 'left'}: 12px;
    z-index: 10;
    color: rgba(255, 255, 255, 0.8);
  `}
`

class ResponsiveSider extends React.Component {
  state = {
    collapsed: true
  }
  render() {
    const { isMobile, width, isRight, children } = this.props
    const { collapsed } = this.state
    return ([
      <Sider key={'1'}
        isMobile={isMobile}
        isRight={isRight}
        width={width || 230}
        theme='light'
        breakpoint='md'
        collapsed={isMobile && this.state.collapsed}
        collapsedWidth={0}
        trigger={null}
      >
        {children}
      </Sider>,
      isMobile && (
        <SiderToggle
          key={'2'}
          type={(isRight && collapsed) || (!isRight && !collapsed) ? 'menu-fold' : 'menu-unfold'}
          onClick={() => this.setState(s => ({ collapsed: !s.collapsed }))}
          isRight={isRight}
        />
      ),
    ])
  }
}
Page.propTypes = {
  isMobile: PropTypes.bool,
  isRight: PropTypes.bool,
  width: PropTypes.number,
}

const HomeLink = styled(Link)`
  color: #EC407A;
  font-size: 2em;
  letter-spacing: 0.13em;
  font-weight: 300;
  display: block;
  margin-bottom: 1em;
  :hover {
    color: #D81B60;
  }
`

export {
  CenteredContent,
  FixedHeader,
  ScrollableContent,
  Page,
  ResponsiveSider,
  ContentLayout,
  ContentLayoutHeader,
  ResponsiveScroll,
  HomeLink,
}
