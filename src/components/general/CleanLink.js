import React from 'react'
import PropTypes from 'prop-types'

const cleanUrl = url => {
  const strippedUrl = url ? url.replace(/https:\/\//g, '').replace(/http:\/\//g, '') : ''
  return `http://${strippedUrl}`
}

const CleanLink = ({ url, stopPropagation }) => (
  <a
    onClick={e => stopPropagation && e.stopPropagation()}
    href={cleanUrl(url)}
    target='_blank'
    rel='noopener noreferrer'
  >
    {cleanUrl(url).replace(/http:\/\//g, '')}
  </a>
)
CleanLink.propTypes = {
  url: PropTypes.string,
  stopPropagation: PropTypes.bool,
}

export { CleanLink }
