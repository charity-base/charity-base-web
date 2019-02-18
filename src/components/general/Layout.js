import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Layout, Icon } from 'antd'

const FixedHeader = styled.div`
  padding: 24px;
  ${({ isMobile, height }) => !isMobile && `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: ${height || 150}px;
    background-color: #FFF;
    z-index: 999;
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
    padding-top: ${paddingTop === undefined ? 150 : paddingTop}px;
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

export { FixedHeader, ScrollableContent, Page, ResponsiveSider }
