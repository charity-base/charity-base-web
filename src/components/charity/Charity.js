import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Card, Icon, Row, Col, Divider } from 'antd'
import { fetchJSON } from '../../lib/fetchHelpers'
import { MenuBar, MenuBarHeader } from '../general/MenuBar'
import { CharityInfo } from './CharityInfo'
import { CopyUrl } from '../general/CopyUrl'
import { DownloadResults } from '../general/DownloadResults'

const { Content } = Layout

const menuItems = [
  { id: 'overview', text: 'Overview', icon: 'profile' },
  { id: 'contact', text: 'Contact', icon: 'phone' },
  { id: 'people', text: 'People', icon: 'team' },
  { id: 'subsidiaries', text: 'Subsidiaries', icon: 'switcher' },
  { id: 'places', text: 'Places', icon: 'global' },
  { id: 'categories', text: 'Type of Work', icon: 'tags-o' },
  { id: 'finances', text: 'Finances', icon: 'bank' },
  { id: 'reports', text: 'Reports', icon: 'file-pdf' },
]

class Charity extends Component {
  state = {
    charity: null,
    isLoading: true,
  }
  componentDidMount() {
    fetchJSON(`http://localhost:4000/api/v2.0.0/charities?ids.GB-CHC=${this.props.charityId}&fields=all`)
    .then(res => this.setState({
      isLoading: false,
      charity: res.charities.length === 1 ? res.charities[0] : null
    }))
    .catch(err => {
      this.setState({ isLoading: false })
      console.log(err)
    })
  }
  onViewSelect = view => {
    const viewQuery = view === 'overview' ? '' : `?view=${view}`
    const path = `/charities/${this.props.charityId}${viewQuery}`
    this.context.router.history.push(path)
  }
  goBack = () => {
    this.context.router.history.goBack()
  }
  render() {
    const { isLoading, charity } = this.state
    const { charityId, view } = this.props
    return (
      <Content style={{ position: 'fixed', top: '80px', bottom: '20px', left: '50px', right: '50px', margin: 0, padding: 0 }}>
        <Layout style={{ background: '#FFF', border: '1px solid #DDD', borderRadius: '5px', overflowY: 'scroll', position: 'relative', height: '100%' }}>
          <MenuBar
            menuItems={menuItems}
            selectedId={view}
            onSelect={this.onViewSelect}
            renderHeader={() => (
              <MenuBarHeader>
                <div style={{ fontSize: '12px' }}>
                  <a onClick={this.goBack}>
                    <Row justify='space-around' type='flex'>
                      <Col span={4}><Icon type="arrow-left"/></Col>
                      <Col span={20}>Back to Search</Col>
                    </Row>
                  </a>
                </div>
                <Divider />
                <div style={{ marginTop: '5px' }}><CopyUrl /></div>
                <div style={{ marginTop: '5px' }}><DownloadResults queryString={`?ids.GB-CHC=${charityId}&fields=all`}/></div>
                <Divider />
              </MenuBarHeader>
            )}
          />
          <Content style={{ padding: '24px 24px', height: '100%', overflowY: 'scroll' }}>
            {isLoading && <Card loading />}
            {!isLoading && charity && (
              <CharityInfo charity={charity} view={view} onViewSelect={this.onViewSelect} goBack={this.goBack} />
            )}
            {!isLoading && !charity && (
              'No charity found'
            )}
          </Content>
        </Layout>
      </Content>
    )
  }
}
Charity.contextTypes = {
  router: PropTypes.object,
}
Charity.propTypes = {
  charityId: PropTypes.string,
  view: PropTypes.string,
}
Charity.defaultProps = {
  view: "overview",
}

export { Charity }
