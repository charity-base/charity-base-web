import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { List, Modal, Skeleton } from 'antd'
import { LIST_CHARITIES } from '../../../../lib/gql'

const boundingBoxIntersection = (listOfBounds) => {
  return listOfBounds.reduce((agg, x) => ({
    top: x && x.top < agg.top ? x.top : agg.top,
    left: x && x.left > agg.left ? x.left : agg.left,
    bottom: x && x.bottom > agg.bottom ? x.bottom : agg.bottom,
    right: x && x.right < agg.right ? x.right : agg.right,
  }), {
    top: 90,
    left: -180,
    bottom: -90,
    right: 180,
  })
}

const dummyData = count => {
  return [...new Array(count)].map((_, id) => ({ id }))
}

const ClusterListModal = ({ bounds, count, geohashes, filters, onClose, open }) => (
  <Modal
    visible={open}
    onCancel={onClose}
    footer={null}
    maskClosable={true}
  >
    <Query
      query={LIST_CHARITIES}
      variables={{
        filters: {
          ...filters,
          geo: {
            ...filters.geo,
            geohashes,
            boundingBox: boundingBoxIntersection([
              filters.geo ? filters.geo.boundingBox : null,
              bounds,
            ]),
          }
        }
      }}
    >
      {({ loading, error, data }) => {
        if (error) return 'oops something went wrong'
        return (
          <div
            style={{
              maxHeight: '60vh',
              overflowY: 'scroll',
              padding: '1em',
              marginTop: '2em',
              backgroundColor: '#FAFAFA',
              borderRadius: '0.5em',
            }}
          >
            <List
              itemLayout="vertical"
              size="large"
              dataSource={loading ? dummyData(count) : data.CHC.getCharities.list}
              renderItem={item => (
                <List.Item
                  key={item.id}
                >
                  <Skeleton loading={loading} active>
                    <List.Item.Meta
                      title={<a href='/'>{item.names ? item.names[0].value : null}</a>}
                    />
                    {item.activities ? item.activities.slice(0, 240)+'...' : null}
                  </Skeleton>
                </List.Item>
              )}
            />
          </div>
        )
      }}
    </Query>
  </Modal>
)
ClusterListModal.propTypes = {
  bounds: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  geohashes: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default ClusterListModal
