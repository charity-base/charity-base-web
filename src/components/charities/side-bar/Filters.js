import React from 'react'
import PropTypes from 'prop-types'
import { Tag } from 'antd'
import { NoneText } from '../../general/NoneText'

const Filters = ({ filtersList, onClose }) => (
  <div style={{ width: '100%', textAlign: 'center', minHeight: '30px' }}>
    {filtersList.length > 0 ? (
      filtersList.map((x, i) => {
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
      })
    ) : (
      <NoneText>No filters applied</NoneText>
    )
  }
  </div>
)
Filters.propTypes = {
  filtersList: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Filters
