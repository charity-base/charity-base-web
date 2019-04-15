import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Card, Tag, Typography } from 'antd'

const { Paragraph } = Typography

const Areas = ({ areas }) => {
  return (
    <Card title='Areas' bordered={false} style={{ marginBottom: '2em' }}>
      {areas ? (
        <Fragment>
          <Paragraph>
            {areas.filter(x => x.id[0] === 'A').map(x => (
              <Tag key={x.id}>{x.name}</Tag>
            ))}
          </Paragraph>
          <Paragraph>{areas.filter(x => ['B', 'C'].indexOf(x.id[0]) > -1).length} local areas</Paragraph>
          <Paragraph>{areas.filter(x => x.id[0] === 'D').length} countries</Paragraph>
          <Paragraph>{areas.filter(x => x.id[0] === 'E').length} continents</Paragraph>
        </Fragment>
      ) : 'No area information provided'}
    </Card>
  )
}
Areas.propTypes = {
  areas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
}

export default Areas
