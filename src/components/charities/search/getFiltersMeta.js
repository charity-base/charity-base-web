const getFiltersMeta = filterType => {
  switch (filterType) {
    case 'search':
      return {
        // icon: <MaterialIcon icon='search' />,
        prefix: null,
        prompt: 'Search all records',
      }
    case 'id':
      return {
        // icon: <MaterialIcon icon='business' />,
        prefix: null,
        prompt: 'View charity',
      }
    case 'funder':
      return {
        // icon: <MaterialIcon icon='card_giftcard' />,
        prefix: null,
        prompt: 'Filter by funder',
      }
    case 'area':
      return {
        // icon: <MaterialIcon icon='public' />,
        prefix: null,
        prompt: 'Filter by area of operation',
      }
    case 'cause':
      return {
        // icon: <MaterialIcon icon='local_hospital' />,
        prefix: null,
        prompt: 'Filter by cause',
      }
    case 'operation':
      return {
        // icon: <MaterialIcon icon='build' />,
        prefix: null,
        prompt: 'Filter by operation',
      }
    case 'beneficiary':
      return {
        // icon: <MaterialIcon icon='child_care' />,
        prefix: null,
        prompt: 'Filter by beneficiary',
      }
    default:
      return {}
  }
}

export default getFiltersMeta
