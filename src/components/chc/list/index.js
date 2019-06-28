import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import { Link } from 'react-router-dom'
import { Button, List, Icon } from 'antd'
import { Query } from 'react-apollo'
import { LIST_CHARITIES } from '../../../lib/gql'
import { CenteredContent, ResponsiveScroll } from '../../general/Layout'
import ListHeader from './ListHeader'

const MAX_LIST_LENGTH = 500

const Income = ({ income }) => (
  <div>
    {numeral(income).format('($0a)').replace('$', '£')}
  </div>
)

const LoadMore = ({ loading, error, data, fetchMore }) => {
  if (loading || error) return null
  const dataLength = data.CHC ? data.CHC.getCharities.list.length : 0
  if (dataLength === 0) return null
  const count = data.CHC ? data.CHC.getCharities.count : 0
  if (dataLength >= count) {
    return (
      <div className='load-more-container'>
        End of Results
      </div>
    )
  }
  if (dataLength > MAX_LIST_LENGTH) {
    return (
      <div className='load-more-container'>
        Gosh you're persistent.  Please download the results or apply more filters to find what you're looking for.
      </div>
    )
  }
  return (
    <div className='load-more-container'>
      <Button
        onClick={() =>
          fetchMore({
            variables: {
              skip: dataLength,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev
              return {
                ...prev,
                CHC: {
                  ...prev.CHC,
                  getCharities: {
                    ...prev.CHC.getCharities,
                    list: [
                      ...prev.CHC.getCharities.list,
                      ...fetchMoreResult.CHC.getCharities.list,
                    ]
                  }
                }
              }
            }
          })
        }
      >
        Show More
      </Button>
    </div>
  )
}
LoadMore.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  data: PropTypes.object.isRequired,
  fetchMore: PropTypes.func.isRequired,
}

const CharitiesList = ({ onHover, filtersObj, onQueryChange }) => {
  const [sort, setSort] = useState('default')
  return (
    <Query
      query={LIST_CHARITIES}
      variables={{ filters: filtersObj, skip: 0, sort }}
      notifyOnNetworkStatusChange={true}
    >
      {({ loading, error, data, fetchMore }) => {
        if (error) return 'error oops'
        return (
          <Fragment>
            <ResponsiveScroll>
              <ListHeader
                loading={loading}
                count={data.CHC ? data.CHC.getCharities.count : null}
                filtersObj={filtersObj}
                sort={sort}
                setSort={setSort}
                onQueryChange={onQueryChange}
              />
              <CenteredContent>
                <List
                  size="large"
                  itemLayout="vertical"
                  loading={loading}
                  loadMore={
                    <LoadMore
                      loading={loading}
                      error={error}
                      data={data}
                      fetchMore={fetchMore}
                    />
                  }
                  locale={{ emptyText: 'No Charities Found' }}
                  dataSource={data.CHC ? data.CHC.getCharities.list : []}
                  renderItem={({ id, names, activities, geo, finances, contact }) => (
                    <List.Item
                      actions={
                        contact.social.map((x, i) => {
                          return (
                            <a
                              href={`https://${x.platform}.com/${x.handle}`}
                              target='_blank'
                              rel='noopener noreferrer'
                              style={{ padding: '0.3em' }}
                            >
                              <Icon type={x.platform} />
                            </a>
                          )
                        })
                      }
                      extra={<Income income={finances && finances.length > 0 ? finances[0].income : null} />}
                      onMouseEnter={() => onHover(geo)}
                      onMouseLeave={() => onHover({})}
                    >
                      <List.Item.Meta
                        title={
                          <Link to={`/chc/${id}`}>
                            {names && names.reduce((agg, x) => (x.primary ? x.value : agg), null)}
                          </Link>
                        }
                        description={names && names.reduce((agg, x) => (x.primary ? agg : [...agg, x.value]), []).join(', ')}
                      />
                      {activities && `${activities.slice(0,120)}...`}
                    </List.Item>
                  )}
                />
              </CenteredContent>
            </ResponsiveScroll>
          </Fragment>
        )
      }}
    </Query>
  )
}
CharitiesList.propTypes = {
  filtersObj: PropTypes.object.isRequired,
  onHover: PropTypes.func.isRequired,
  onQueryChange: PropTypes.func.isRequired,
}

export default CharitiesList
