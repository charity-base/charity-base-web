import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Layout, Breadcrumb, Card } from 'antd'
import { fetchJSON } from '../../lib/fetchHelpers'
import { CharityMenuBar } from './CharityMenuBar'
import { CharityInfo } from './CharityInfo'

const { Content } = Layout

const menuItems = [
  { text: 'Overview', icon: 'profile' },
  { text: 'Contact', icon: 'phone' },
  { text: 'People', icon: 'team' },
  { text: 'Places', icon: 'environment-o' },
  { text: 'Categories', icon: 'tags-o' },
  { text: 'Finances', icon: 'bank' },
  { text: 'Reports', icon: 'file-pdf' },
]

class Charity extends Component {
  state = {
    charity: null,
    isLoading: true,
    selectedKey: menuItems[0].text,
  }
  componentDidMount() {
    fetchJSON(`http://localhost:4000/api/v0.3.0/charities?ids.GB-CHC=${this.props.charityId}&fields=all`)
    .then(res => this.setState({
      isLoading: false,
      charity: res.charities.length === 1 ? res.charities[0] : null
    }))
    .catch(err => {
      this.setState({ isLoading: false })
      console.log(err)
    })
  }
  render() {
    const { isLoading, charity, selectedKey } = this.state
    return (
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>charitybase.uk</Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/">charities</Link></Breadcrumb.Item>
          <Breadcrumb.Item>{this.props.charityId}</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ position: 'relative', padding: '24px 0', background: '#fff' }}>
          <CharityMenuBar
            menuItems={menuItems}
            selectedKey={selectedKey}
            onSelect={selectedKey => this.setState({ selectedKey })}
          />
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            {isLoading && <Card loading />}
            {!isLoading && charity && (
              <CharityInfo charity={charity} selectedKey={selectedKey} />
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
Charity.propTypes = {
  charityId: PropTypes.string,
}

export { Charity }
