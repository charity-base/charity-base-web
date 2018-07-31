import React, { Component } from 'react'
import PropTypes from 'prop-types'
import qs from 'query-string'
import { FilterBar } from './FilterBar'
import { CharitiesSearch } from './CharitiesSearch'
import { CharitiesList } from './CharitiesList'
import { Layout } from 'antd'
import { FixedHeader, ScrollableContent, Page, ResponsiveSider } from '../general/Layout'
import { DateSlider } from './filters/DateSlider'
import { AnalysisMenu } from './AnalysisMenu'

class Analysis extends Component {
  onQueryUpdate = (key, value) => {
    const newQuery = { ...this.props.query, [key]: value || undefined }
    this.context.router.history.push(`?${qs.stringify(newQuery)}`)
  }
  render() {
    const { query, queryString, isMobile } = this.props
    const view = this.props.query.view || 'grant-funders'
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
            <CharitiesList
              queryString={queryString}
              query={query}
              view={view}
              onQueryUpdate={this.onQueryUpdate}
            />
          </ScrollableContent>
        </Layout.Content>
        <ResponsiveSider isMobile={isMobile} isRight={true} >
          <AnalysisMenu
            view={view}
            onQueryUpdate={this.onQueryUpdate}
          />
        </ResponsiveSider>
      </Page>
    )
  }
}
Analysis.propTypes = {
  query: PropTypes.object,
  queryString: PropTypes.string,
  isMobile: PropTypes.bool,
}
Analysis.contextTypes = {
  router: PropTypes.object,
}

export { Analysis }
