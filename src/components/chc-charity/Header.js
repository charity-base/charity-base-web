import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Skeleton, Typography } from 'antd'

const {
  Title,
} = Typography

const HeaderTitle = styled(Title)`
  margin-bottom: 0px !important;
`

const Header = ({ loading, names }) => {
  const name = names ? names.reduce((agg, x) => (x.primary ? x.value : agg), null) : null
  if (!loading && !name) return null
  return (
    <div style={{
      boxShadow: '0 0 1em',
      zIndex: 2,
      padding: '1em',
    }}>
      {loading ? (
        <Skeleton active paragraph={false} />
      ) : (
        <HeaderTitle level={2} >
          {name}
        </HeaderTitle>
      )}
    </div>
  )
}
Header.propTypes = {
  loading: PropTypes.bool.isRequired,
  names: PropTypes.arrayOf(PropTypes.shape({
    primary: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
}

export default Header
