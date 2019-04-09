import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Tag } from 'antd'
import { NoneText } from '../../general/NoneText'

const TagsContainer = styled.div`
  width: 100%;
  padding: 1em;
  overflow-x: scroll;
  white-space: nowrap;
`

const Filters = ({ filtersList, onClose }) => (
  <TagsContainer>
    {filtersList.length > 0 ? (
      filtersList.map((x, i) => {
        const { id, icon, primary } = x
        return (
          <Tag
            key={id}
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
        )
      })
    ) : (
      <NoneText>No filters applied</NoneText>
    )
  }
  </TagsContainer>
)
Filters.propTypes = {
  filtersList: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Filters
