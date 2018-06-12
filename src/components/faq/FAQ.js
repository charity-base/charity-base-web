import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MenuBar } from '../general/MenuBar'
import { Layout, Breadcrumb } from 'antd'

const { Content } = Layout


const menuItems = [
  { id: 'diff_from_cc', text: 'How is different to Charity Commission services?', icon: 'profile' },
]

class FAQ extends Component {
  state = {
    selectedId: menuItems[0].id,
  }
  render() {
    const { selectedId } = this.state
    return (
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>charitybase.uk</Breadcrumb.Item>
          <Breadcrumb.Item>faq</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <MenuBar
            menuItems={menuItems}
            selectedId={selectedId}
            onSelect={selectedId => this.setState({ selectedId })}
          />
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <div>
              <b>Data</b>
              All data from CC sources and additional scraped (favicon, long/lat, companies house)
            </div>
            <div>
              <b>Download</b>
              Download all fields. No cap on download size. CSV or JSON
            </div>
            <div>
              <b>API</b>
              Free REST API for pulling data into your own web services
            </div>
            <div>
              <b>Filtering</b>
              Exploit full functionality of API through web user interface.
            </div>
            <div>
              <b>Open Source</b>
              Maintened by an open source community, and constantly improving.
            </div>
          </Content>
        </Layout>
      </Content>
    )
  }
}
FAQ.propTypes = {
  queryString: PropTypes.string,
}

export { FAQ }




// # How is it different to CC?

// ## Data
// All fields present (beta doesn't have subsidiaries? download doesn't have aims & activities.)
// Suplementary fields (office location, favicons)
// Formating (removed CAPS, address -> array, )
// ## Filtering
// More options for filtering e.g. by office location.
// Better text search?
// ## API
// Easy to pull charity info into your website (with a few lines of code)
// ## Downloads
// No limit on downloads & all fields available