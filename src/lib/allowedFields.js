const defaultFieldsList = [
  'ids',
  'ids.GB-CHC',
  'name',
]

const allowedFields = [{
  title: 'IDs',
  key: 'ids',
  children: [{
    title: 'CC Number',
    key: 'ids.GB-CHC',
    disabled: true,
  }],
  disabled: true,
}, {
  title: 'Name',
  key: 'name',
  disabled: true,
}, {
  title: 'Contact',
  key: 'contact',
  children: [{
    title: 'Email',
    key: 'contact.email',
  }, {
    title: 'Person',
    key: 'contact.person',
  }, {
    title: 'Postcode',
    key: 'contact.postcode',
  }, {
    title: 'Address',
    key: 'contact.address',
  }, {
    title: 'Longitude',
    key: 'contact.geo.longitude',
  }, {
    title: 'Latitude',
    key: 'contact.geo.latitude',
  }],
}]

export { defaultFieldsList, allowedFields }
