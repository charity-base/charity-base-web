import React from 'react'
import { Icon } from 'antd'

const mapItem = ({ id, filterType, value, label }) => {
  switch (filterType) {
    case 'search':
      return {
        id: id,
        icon: <Icon type='search' />,
        primary: value,
        secondary: `Search for ${value}`,
        value: value,
        filterType: filterType,
      }
    case 'id':
      return {
        id: id,
        icon: <Icon type='link' />,
        primary: label || value,
        secondary: `View charity`,
        value: value,
        filterType: filterType,
      }
    case 'funder':
      return {
        id: id,
        icon: <Icon type='gift' />,
        primary: label || value,
        secondary: `Filter by funder`,
        value: value,
        filterType: filterType,
      }
    case 'area':
      return {
        id: id,
        icon: <Icon type='global' />,
        primary: label || value,
        secondary: `Filter by area of operation`,
        value: value,
        filterType: filterType,
      }
    case 'cause':
      return {
        id: id,
        icon: <Icon type='medicine-box' />,
        primary: label || value,
        secondary: `Filter by cause`,
        value: value,
        filterType: filterType,
      }
    case 'operation':
      return {
        id: id,
        icon: <Icon type='tool' />,
        primary: label || value,
        secondary: `Filter by operation`,
        value: value,
        filterType: filterType,
      }
    case 'beneficiary':
      return {
        id: id,
        icon: <Icon type='team' />,
        primary: label || value,
        secondary: `Filter by beneficiary`,
        value: value,
        filterType: filterType,
      }
    default:
      return {}
  }
}

export default mapItem
