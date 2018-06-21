import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Layout } from 'antd'

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
    border-width: 0 0 1px 0;
    border-style: solid;
    border-color: #FAFAFA;
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
    background-color #FFF;
  ` : `
    position: fixed;
    top: 80px;
    bottom: 20px;
    left: 50px;
    right: 50px;
    margin: 0;
    padding: 0;
  `}
`

const PageLayout = styled(Layout)`
  ${({ isMobile }) => !isMobile && `
    background: #FFF;
    border: 1px solid #DDD;
    border-radius: 5px;
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
  ${({ isMobile }) => isMobile ? `
    background-color #FFF;
    position: fixed;
    top: 0;
    margin-top: 50px;
    bottom: 0;
    left: 0;
    z-index: 9;
  ` : `
    background-color #FFF;
  `}
`

const ResponsiveSider = ({ isMobile, children }) => (
  <Sider
    isMobile={isMobile}
    width={200}
    theme='light'
    breakpoint='md'
    collapsedWidth={0}
  >
    {children}
  </Sider>
)
Page.propTypes = {
  isMobile: PropTypes.bool,
}

export { FixedHeader, ScrollableContent, Page, ResponsiveSider }
