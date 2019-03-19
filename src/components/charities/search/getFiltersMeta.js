import React from 'react'
import { Icon } from 'antd'

const getFiltersMeta = filterType => {
  switch (filterType) {
    case 'search':
      return {
        icon: <Icon type='search' />,
        prefix: null,
        prompt: 'Search all records',
      }
    case 'id':
      return {
        icon: <Icon type='link' />,
        prefix: null,
        prompt: 'View charity',
      }
    case 'funder':
      return {
        icon: <Icon type='gift' />,
        prefix: null,
        prompt: 'Filter by funder',
      }
    case 'area':
      return {
        icon: <Icon type='global' />,
        prefix: null,
        prompt: 'Filter by area of operation',
      }
    case 'cause':
      return {
        icon: <Icon type='medicine-box' />,
        prefix: null,
        prompt: 'Filter by cause',
      }
    case 'operation':
      return {
        icon: <Icon type='tool' />,
        prefix: null,
        prompt: 'Filter by operation',
      }
    case 'beneficiary':
      return {
        icon: <Icon type='team' />,
        prefix: null,
        prompt: 'Filter by beneficiary',
      }
    default:
      return {}
  }
}

export default getFiltersMeta
