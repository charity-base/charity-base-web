import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FilterBar } from './FilterBar'
import { CharitiesSearch } from './CharitiesSearch'
import { CharitiesList } from './CharitiesList'
import { Layout } from 'antd'
import { FixedHeader, ScrollableContent, Page, ResponsiveSider } from '../general/Layout'
import { DateSlider } from './filters/DateSlider'

class Analysis extends Component {
  render() {
    const { query, queryString, isMobile } = this.props
    return (
      <Page isMobile={isMobile}>
        <ResponsiveSider isMobile={isMobile}>
          <FilterBar queryString={queryString} />
        </ResponsiveSider>
        <Layout.Content style={{ position: 'relative', backgroundColor: '#FFF' }}>
          <FixedHeader isMobile={isMobile} height={200}>
            <CharitiesSearch query={query} />
            <DateSlider query={query} />
          </FixedHeader>
          <ScrollableContent isMobile={isMobile} paddingTop={200}>
            <CharitiesList queryString={queryString} query={query} />
          </ScrollableContent>
        </Layout.Content>
      </Page>
    )
  }
}
Analysis.propTypes = {
  query: PropTypes.object,
  queryString: PropTypes.string,
  isMobile: PropTypes.bool,
}

export { Analysis }
