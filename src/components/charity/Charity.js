import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Layout, Breadcrumb, Spin } from 'antd'

const { Content } = Layout

const handleFetchErrors = res => {
  if (!res.ok) {
    return res.json()
    .catch(() => {
      throw Error(res.statusText)
    })
    .then(({ message }) => {
      throw Error(message || res.statusText)
    });
  }
  return res;
}

export const fetchRequest = (url, options) => {
  return fetch(url, options)
  .then(handleFetchErrors)
  .then(res => res.json())
}

const CharityInfo = ({ charity }) => (
  <div>
    <div>{charity.name}</div>
    <div>£{charity.income.latest.total}</div>
  </div>
)


class Charity extends Component {
  state = {
    charity: null,
    isLoading: true,
  }
  componentDidMount() {
    fetchRequest(`http://localhost:4000/api/v0.3.0/charities?ids.GB-CHC=${this.props.charityId}&fields=all`)
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
    const { isLoading, charity } = this.state
    return (
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>charitybase.uk</Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/">charities</Link></Breadcrumb.Item>
          <Breadcrumb.Item>{this.props.charityId}</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            {isLoading && <Spin />}
            {!isLoading && charity && (
              <CharityInfo charity={charity} />
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
