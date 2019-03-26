import React from 'react'
import PropTypes from 'prop-types'
import { Tag } from 'antd'

const Filters = ({ filtersList, onClose }) => (
  <div style={{ width: '100%', textAlign: 'center' }}>
    {filtersList.map((x, i) => {
      const { icon, primary } = x
      return (
        <div key={x.id}>
          <Tag
            closable
            afterClose={() => onClose(x)}
            color='#EC407A'
            style={{
              cursor: 'default',
              borderColor: '#EC407A',
              marginBottom: '4px',
              // boxSizing: 'border-box',
              // overflow: 'hidden',
              // textOverflow: 'ellipsis',
            }}
            title={primary}
          >
            {icon}
            <span style={{ marginLeft: '5px' }}>
              {primary.length > 20 ? `${primary.slice(0, 20).trim()}...` : primary}
            </span>
          </Tag>
        </div>
      )
    })}
  </div>
)
Filters.propTypes = {
  filtersList: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Filters
