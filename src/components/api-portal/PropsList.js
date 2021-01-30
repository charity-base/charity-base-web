import React from 'react'
import PropTypes from 'prop-types'
import { List, Tag } from 'antd'

const PropsList = ({
  dataSource
}) => {
  return (
    <List
      className='api-ref-list'
      itemLayout='horizontal'
      dataSource={dataSource}
      rowKey='name'
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            title={<span><strong>{item.name}</strong> {item.required ? null : <Tag>optional</Tag>}</span>}
            description={item.type}
          />
          <div style={{ padding: '0 1rem' }}>{item.description}</div>
        </List.Item>
      )}
    />
  )
}
PropsList.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    description: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    required: PropTypes.boolean,
  })).isRequired
}

export default PropsList
