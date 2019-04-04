import React from 'react'
import { Icon } from 'antd'

const mapItem = ({ id, filterType, value, label }) => {
  switch (filterType) {
    case 'search':
      return {
        id,
        filterType,
        value,
        label,
        icon: <Icon type='search' />,
        primary: value,
        secondary: `Search for ${value}`,
      }
    case 'geo':
      return {
        id,
        filterType,
        value,
        label,
        icon: <Icon type='environment-o' />,
        primary: 'Map filter',
        secondary: null,
      }
    case 'id':
      return {
        id,
        filterType,
        value,
        label,
        icon: <Icon type='link' />,
        primary: label || value,
        secondary: `View charity`,
      }
    case 'funder':
      return {
        id,
        filterType,
        value,
        label,
        icon: <Icon type='gift' />,
        primary: label || value,
        secondary: `Filter by funder`,
      }
    case 'area':
      return {
        id,
        filterType,
        value,
        label,
        icon: <Icon type='global' />,
        primary: label || value,
        secondary: `Filter by area of operation`,
      }
    case 'cause':
      return {
        id,
        filterType,
        value,
        label,
        icon: <Icon type='medicine-box' />,
        primary: label || value,
        secondary: `Filter by cause`,
      }
    case 'operation':
      return {
        id,
        filterType,
        value,
        label,
        icon: <Icon type='tool' />,
        primary: label || value,
        secondary: `Filter by operation`,
      }
    case 'beneficiary':
      return {
        id,
        filterType,
        value,
        label,
        icon: <Icon type='team' />,
        primary: label || value,
        secondary: `Filter by beneficiary`,
      }
    default:
      return {}
  }
}

export default mapItem
