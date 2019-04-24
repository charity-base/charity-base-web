import React from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import { Select, Row, Col } from 'antd'
import { DownloadResults } from '../../general/download'

const formatCount = x => numeral(x).format('0,0')

const { Option } = Select

const ListHeader = ({
  loading,
  count,
  sort,
  setSort,
}) => {
  return isNaN(parseInt(count)) ? null : (
    <Row
      style={{
        borderBottom: '1px solid #eee',
        paddingBottom: '1em',
        opacity: loading ? 0.5 : 1,
      }}
      justify='space-between'
      type='flex'
    >
      <Col xs={24} sm={16} >
        {formatCount(count)} results <DownloadResults />
      </Col>
      <Col xs={24} sm={8} style={{ textAlign: 'right' }} >
        <Select
          onChange={x => setSort(x)}
          value={sort}
          size='small'
          style={{ width: '100px' }}
        >
          <Option value='default'>Relevant</Option>
          <Option value='income_desc'>Largest</Option>
          <Option value='income_asc'>Smallest</Option>
          <Option value='age_desc'>Oldest</Option>
          <Option value='age_asc'>Youngest</Option>
          <Option value='random'>Random</Option>
        </Select>
      </Col>
    </Row>
  )
}
ListHeader.propTypes = {
  loading: PropTypes.bool.isRequired,
  count: PropTypes.number,
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
}

export default ListHeader
