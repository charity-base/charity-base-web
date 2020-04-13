import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import PropTypes from 'prop-types'
import qs from 'query-string'
import numeral from 'numeral'
import { Modal, Button, Alert, Progress, Typography } from 'antd'
import auth from '../../../lib/auth'
import { DOWNLOAD_CHARITIES } from '../../../lib/gql'
import useInterval from './use-interval'

const {
  Paragraph,
} = Typography

const formatCount = x => numeral(x).format('0,0')
const formatBytes = x => numeral(x).format('0.0 b')

const Loader = ({ count }) => {
  const [tick, setTick] = useState(0)
  useInterval(() => {
    setTick(tick + 0.5 + Math.random())
  }, 1000)
  const maxResults = 170000
  const ratio = 3/60 // ratio of fastest download to longest download
  const longestDownload = 40 // seconds taken to download maxResults
  const percent = 100*tick/(longestDownload*(ratio + (1-ratio)*count/maxResults))
  return (
    <div>
      <span>Writing {formatCount(count)} charities to file...</span>
      <Progress percent={Math.round(Math.min(95, percent))} status='active' />
    </div>
  )
}

const DownloadResults = ({ count, filtersObj, onQueryChange }) => {
  const isOpen = qs.parse(window.location.search).download === 't'
  const [trigger, setTrigger] = useState(false)
  const onCancel = () => {
    onQueryChange({ download: 'f' })
    setTrigger(false)
  }
  const onOk = auth.wrapAuthentication(window)(() => {
    setTrigger(true)
  })
  return (
    <React.Fragment>
      <Modal
        title={`Download ${formatCount(count)} Charities`}
        visible={isOpen}
        onCancel={onCancel}
        onOk={onOk}
        maskClosable={true}
        okText='Create File'
      >
        <div>
          <Paragraph>This will create a CSV file containing basic information for each of the {formatCount(count)} charities you've selected.  You'll then be able to download, unzip and open this file on your computer as a spreadsheet.</Paragraph>
          <Paragraph>For more advanced data fields please use the <Link to='/api-portal'>API</Link> or email your request to <strong>support@charitybase.uk</strong></Paragraph>
          {count < 10000 ? null : (
            <Alert
              type='warning'
              message='File Size Warning'
              description='Your computer might struggle to open a spreadsheet with more than 10,000 rows.  Please consider adding more filters to your search before downloading.'
              style={{ marginTop: '1em', marginBottom: '1em' }}
            />
          )}
          {trigger ? (
            <Query
              query={DOWNLOAD_CHARITIES}
              variables={{ filters: filtersObj }}
            >
              {({ loading, error, data }) => {
                if (loading) return <Loader count={count} />
                if (error) return (
                  <Alert
                    type='error'
                    message={
                      <span>Oops, something went wrong.  Please try again.</span>
                    }
                  />
                )
                if (!data || !data.CHC) return
                return (
                  <div>
                    <Alert
                      type='success'
                      message={`Successfully Created File (${formatBytes(data.CHC.getCharities.download.size)})`}
                      description={
                        <a onClick={onCancel} href={data.CHC.getCharities.download.url} >
                          {data.CHC.getCharities.download.name}
                        </a>
                      }
                    />
                  </div>
                )
              }}
            </Query>
          ) : null}
        </div>
      </Modal>
      <Button
        icon='download'
        size='small'
        onClick={() => onQueryChange({ download: 't' })}
        style={{ margin: '0 0.3em 0 0.3em' }}
      />
    </React.Fragment>
  )
}
DownloadResults.propTypes = {
  filtersObj: PropTypes.object,
  count: PropTypes.number,
  onQueryChange: PropTypes.func.isRequired,
}

export { DownloadResults }
