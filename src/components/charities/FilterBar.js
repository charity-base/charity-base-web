import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import numeral from 'numeral'
import { Tag, Tooltip, Icon, Cascader } from 'antd'
import { DownloadResults } from './DownloadResults'

const SideBarContainer = styled.div`
  padding: 15px;
  border-right: solid rgba(0,0,0,0.1) 1px;
  height: 100%;
`

const SideBarTitle = styled.div`
  color: rgba(0,0,0,0.6);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
  text-align: center;
  margin-bottom: 20px;
`

const areasOfOperation = ["THROUGHOUT ENGLAND AND WALES", "BRACKNELL FOREST", "AFGHANISTAN", "AFRICA", "THROUGHOUT ENGLAND", "WEST BERKSHIRE", "ALBANIA", "ASIA", "THROUGHOUT WALES", "READING", "ALGERIA", "EUROPE", "THROUGHOUT LONDON", "SLOUGH", "NORTH AMERICA", "WINDSOR AND MAIDENHEAD", "ANDORRA", "SOUTH AMERICA", "WOKINGHAM", "ANGOLA", "OCEANIA", "BARKING AND DAGENHAM", "ANTARCTICA", "BARNET", "BEXLEY", "ANTIGUA AND BARBUDA", "BRENT", "ARGENTINA", "BROMLEY", "ARMENIA", "CAMDEN", "CITY OF LONDON", "AUSTRALIA", "CITY OF WESTMINSTER", "AUSTRIA", "CROYDON", "AZERBAIJAN", "EALING", "ENFIELD", "BAHAMAS", "GREENWICH", "BAHRAIN", "HACKNEY", "BANGLADESH", "HAMMERSMITH AND FULHAM", "GREATER LONDON", "BARBADOS", "HARINGEY", "GREATER MANCHESTER", "BELARUS", "HARROW", "BELGIUM", "HAVERING", "BELIZE", "HILLINGDON", "BENIN", "HOUNSLOW", "ISLINGTON", "BHUTAN", "KENSINGTON AND CHELSEA", "BOLIVIA", "KINGSTON UPON THAMES", "BOSNIA-HERZEGOVINA", "LAMBETH", "BOTSWANA", "LEWISHAM", "BRAZIL", "MERTON", "BRUNEI", "NEWHAM", "BULGARIA", "REDBRIDGE", "MERSEYSIDE", "BURKINA FASO", "RICHMOND UPON THAMES", "BURUNDI", "SOUTHWARK", "CAMBODIA", "SUTTON", "CAMEROON", "TOWER HAMLETS", "CANADA", "WALTHAM FOREST", "CAPE VERDE", "WANDSWORTH", "BOLTON", "CENTRAL AFRICAN REPUBLIC", "BURY", "CHAD", "MANCHESTER CITY", "CHILE", "OLDHAM", "CHINA", "ROCHDALE", "COLOMBIA", "SALFORD CITY", "COMOROS", "STOCKPORT", "REPUBLIC OF CONGO", "TAMESIDE", "TRAFFORD", "SOUTH YORKSHIRE", "COSTA RICA", "WIGAN", "CROATIA", "KNOWSLEY", "CUBA", "LIVERPOOL CITY", "CYPRUS", "SEFTON", "TYNE AND WEAR", "CZECH REPUBLIC", "ST HELENS", "DENMARK", "WIRRAL", "DJIBOUTI", "BARNSLEY", "DOMINICA", "DONCASTER", "DOMINICAN REPUBLIC", "ROTHERHAM", "WEST MIDLANDS", "ECUADOR", "SHEFFIELD CITY", "EGYPT", "GATESHEAD", "WEST YORKSHIRE", "EL SALVADOR", "NEWCASTLE UPON TYNE CITY", "EQUATORIAL GUINEA", "NORTH TYNESIDE", "ERITREA", "SOUTH TYNESIDE", "ESTONIA", "SUNDERLAND", "ETHIOPIA", "BIRMINGHAM CITY", "COVENTRY CITY", "DUDLEY", "FIJI", "SANDWELL", "FINLAND", "SOLIHULL", "FRANCE", "WALSALL", "WOLVERHAMPTON", "BRADFORD CITY", "GABON", "CALDERDALE", "GAMBIA", "KIRKLEES", "LEEDS CITY", "GEORGIA", "CITY OF WAKEFIELD", "GERMANY", "NOTTINGHAM CITY", "GHANA", "GREECE", "GRENADA", "GUATEMALA", "GUINEA", "GUINEA-BISSAU", "GUYANA", "HAITI", "HONDURAS", "HUNGARY", "ICELAND", "INDIA", "INDONESIA", "IRAN", "IRAQ", "ISRAEL", "ITALY", "IVORY COAST", "JAMAICA", "CENTRAL BEDFORDSHIRE", "JAPAN", "BUCKINGHAMSHIRE", "CAMBRIDGESHIRE", "JORDAN", "CHESHIRE EAST", "KAZAKHSTAN", "CORNWALL", "KENYA", "CUMBRIA", "KIRIBATI", "DERBYSHIRE", "KUWAIT", "DEVON", "KYRGYZSTAN", "DORSET", "LAOS", "DURHAM", "LATVIA", "EAST SUSSEX", "LEBANON", "ESSEX", "LESOTHO", "GLOUCESTERSHIRE", "LIBERIA", "HAMPSHIRE", "LIBYA", "HERTFORDSHIRE", "LIECHTENSTEIN", "ISLE OF WIGHT", "LITHUANIA", "KENT", "LUXEMBOURG", "LANCASHIRE", "LEICESTERSHIRE", "MACEDONIA", "LINCOLNSHIRE", "MADAGASCAR", "NORFOLK", "NORTH YORKSHIRE", "MALAWI", "NORTHAMPTONSHIRE", "MALAYSIA", "NORTHUMBERLAND", "MALDIVES", "NOTTINGHAMSHIRE", "MALI", "OXFORDSHIRE", "MALTA", "POWYS", "MARSHALL ISLANDS", "SHROPSHIRE", "SOMERSET", "MAURITANIA", "STAFFORDSHIRE", "MAURITIUS", "SUFFOLK", "SURREY", "MEXICO", "WARWICKSHIRE", "MICRONESIA", "WEST SUSSEX", "MOLDOVA", "WILTSHIRE", "MONACO", "NORTH SOMERSET", "MONGOLIA", "BATH AND NORTH EAST SOMERSET", "SOUTH GLOUCESTERSHIRE", "MOROCCO", "BRISTOL CITY", "MOZAMBIQUE", "HARTLEPOOL", "BURMA", "MIDDLESBROUGH", "NAMIBIA", "REDCAR AND CLEVELAND", "NAURU", "STOCKTON-ON-TEES", "NEPAL", "KINGSTON UPON HULL CITY", "NETHERLANDS", "NORTH LINCOLNSHIRE", "NORTH EAST LINCOLNSHIRE", "EAST RIDING OF YORKSHIRE", "NEW ZEALAND", "CONWY", "NICARAGUA", "ISLE OF ANGLESEY", "NIGER", "BLAENAU GWENT", "NIGERIA", "BRIDGEND", "CAERPHILLY", "NORTH KOREA", "CARDIFF", "CEREDIGION", "NORWAY", "CARMARTHENSHIRE", "OMAN", "DENBIGHSHIRE", "PAKISTAN", "FLINTSHIRE", "PALAU", "MERTHYR TYDFIL", "MONMOUTHSHIRE", "PANAMA", "NEATH PORT TALBOT", "PAPUA NEW GUINEA", "NEWPORT CITY", "PARAGUAY", "PEMBROKESHIRE", "PERU", "PLYMOUTH CITY", "PHILIPPINES", "CITY OF SWANSEA", "POLAND", "VALE OF GLAMORGAN", "PORTUGAL", "THURROCK", "WREXHAM", "QATAR", "HALTON", "REPUBLIC OF IRELAND", "GWYNEDD", "CITY OF YORK", "ROMANIA", "TORFAEN", "RUSSIA", "WARRINGTON", "RWANDA", "RHONDDA CYNON TAFF", "LUTON", "ST KITTS-NEVIS", "MILTON KEYNES", "ST LUCIA", "DERBY CITY", "ST VINCENT AND GRENADINES", "BOURNEMOUTH", "SAMOA", "POOLE", "SAN MARINO", "DARLINGTON", "SAO TOME AND PRINCIPE", "BRIGHTON AND HOVE", "SAUDI ARABIA", "SOUTHAMPTON CITY", "SENEGAL", "PORTSMOUTH CITY", "SEYCHELLES", "LEICESTER CITY", "SIERRA LEONE", "RUTLAND", "SINGAPORE", "STOKE-ON-TRENT CITY", "SLOVAKIA", "SWINDON", "SLOVENIA", "BLACKBURN WITH DARWEN", "SOLOMON ISLANDS", "BLACKPOOL", "SOMALIA", "SOUTHEND-ON-SEA", "SOUTH AFRICA", "TELFORD & WREKIN", "SOUTH KOREA", "PETERBOROUGH CITY", "SPAIN", "HEREFORDSHIRE", "SRI LANKA", "WORCESTERSHIRE", "SUDAN", "MEDWAY", "SURINAM", "ISLES OF SCILLY", "SWAZILAND", "TORBAY", "SWEDEN", "CHESHIRE WEST & CHESTER", "SWITZERLAND", "BEDFORD", "SYRIA", "TAJIKISTAN", "TANZANIA", "THAILAND", "TOGO", "TONGA", "TRINIDAD AND TOBAGO", "TUNISIA", "TURKEY", "TURKMENISTAN", "TUVALU", "UGANDA", "UKRAINE", "UNITED ARAB EMIRATES", "UNITED STATES OF AMERICA", "URUGUAY", "UZBEKISTAN", "VANUATU", "VENEZUELA", "VIETNAM", "YEMEN", "SERBIA", "DEMOCRATIC REPUBLIC OF THE CONGO", "ZAMBIA", "ZIMBABWE", "MONTENEGRO", "SCOTLAND", "NORTHERN IRELAND", "ANTARCTICA", "TIMOR-LESTE", "OCCUPIED PALESTINIAN TERRITORIES", "KOSOVO", "AKROTIRI AND DHEKELIA", "AMERICAN SAMOA", "ANGUILLA", "ARUBA", "BERMUDA", "BRITISH INDIAN OCEAN TERRITORY", "BRITISH VIRGIN ISLANDS", "CAYMAN ISALNDS", "CHRISTMAS ISLAND", "CLIPPERTON ISLAND", "COCOS (KEELING) ISLANDS", "COOK ISLANDS", "EASTERISLAND", "FALKLAND ISLANDS", "FAROE ISLANDS", "FRENCH GUYANA", "FRENCH POLYNESIA", "GIBRALTAR", "GREENLAND", "GUADELOUPE", "GUAM", "GUERNSEY", "HONG KONG", "ISLE OF MAN", "JAN MAYEN", "JERSEY", "JUAN FERNANDEZ ISLANDS", "MACAU", "MARTINIQUE", "MAYOTTE", "MONTSERRAT", "NETHERLANDS ANTILLES", "NEW CALEDONIA", "NIUE", "NORFOLK ISLAND", "NORTHERN MARIANA ISLAND", "PITCAIRN ISLANDS", "PUERTO RICO", "REUNION", "ROSS DEPENDENCY", "ST BARTHELEMY", "ST HELENA", "ST MARTIN", "ST PIERRE AND MIQUELON", "SOUTH GEORGIA", "SVALBARD", "TAIWAN", "TOKELAU", "TURKS AND CAICOS ISLANDS", "U.S. VIRGIN ISLANDS", "WALLIS AND FUTUNA", "REPUBLIC OF SOUTH SUDAN",]

const options = [{
  value: 'income.latest.total',
  label: 'Income',
  children: [{
    value: '>',
    label: 'greater than',
    children: [...Array(10).keys()].map(x => 10**x).map(value => ({ value, label: numeral(value).format('($0a)').replace('$', '£') })),
  }, {
    value: '<',
    label: 'less than',
    children: [...Array(10).keys()].map(x => 10**x).map(value => ({ value, label: numeral(value).format('($0a)').replace('$', '£') })),
  }],
}, {
  value: 'isSchool=true',
  label: 'Is a school'
}, {
  value: 'areasOfOperation.name=',
  label: 'Operates in',
  children: [...new Set(areasOfOperation)].map(value => ({ value, label: value })),
}, {
  value: 'trustees.',
  label: '# Trustees',
  children: [{
    value: 'names.',
    label: 'at least',
    children: [...Array(300).keys()].map(value => ({ value, label: value + 1 })),
  }, {
    value: '(!negate)names.',
    label: 'fewer than',
    children: [...Array(300).keys()].map(value => ({ value, label: value + 1 })),
  }],
}, {
  value: 'trustees.incorporated=true',
  label: 'Trustees incorporated',
}]



class AddFilter extends Component {
  state = {
    inputVisible: false,
  }
  handleInputConfirm = values => {
    const rawString = values.join('')
    const filterString = this.isSubstring(rawString, '(!negate)') ? `!${rawString.replace(/\(!negate\)/g, '')}` : rawString
    this.props.onNewFilter(filterString)
    this.setState({ inputVisible: false })
  }
  isSubstring = (long, short) => (long.indexOf(short) > -1)
  searchOptions = (search, path) => {
    const searchTerms = search.trim().split(' ')
    const totalValuePath = path.map(x => x.value).join('')
    const totalLabelPath = path.map(x => x.label).join('')
    const totalPath = `${totalValuePath} ${totalLabelPath}`
    return searchTerms && searchTerms.reduce((agg, term) => agg && this.isSubstring(totalPath.toLowerCase(), term.toLowerCase()), true)
  }
  renderSearchResults = (search, path) => {
    const totalPath = path.map(x => x.label).join(' ')
    return (<div key={totalPath}>{totalPath}</div>)
  }
  render() {
    const { inputVisible } = this.state;
    return (
      <div>
        <Cascader
          size='small'
          style={{ width: '100%' }}
          expandTrigger='hover'
          options={options}
          onChange={this.handleInputConfirm}
          showSearch={{ filter: this.searchOptions, matchInputWidth: false, render: this.renderSearchResults }}
          value={[]}
          placeholder=''
          displayRender={inputVisible ? undefined : () => <div style={{textAlign: 'center'}}><Icon type='plus'/> Add Filter</div>}
          onPopupVisibleChange={isOpen => this.setState({ inputVisible: isOpen })}
          allowClear={false}
        />
      </div>
    )
  }
}
AddFilter.propTypes = {
  onNewFilter: PropTypes.func.isRequired,
}


const parseQueryString = queryString => (
  queryString.length > 1 ? [...new Set(queryString.split('?')[1].split('&'))].map((name, id) => ({ id, name })) : []
)

class FilterBar extends Component {
  state = {
    filters: parseQueryString(this.props.queryString),
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.queryString !== this.props.queryString) {
      this.setState({ filters: parseQueryString(this.props.queryString) })
    }
  }
  updateRoute = filters => {
    this.context.router.history.push(`?${filters.map(x => x.name).join('&')}`)
  }
  handleClose = removedFilter => {
    const filters = this.state.filters.filter(x => x.id !== removedFilter.id)
    this.updateRoute(filters)
  }
  onNewFilter = inputValue => {
    const { filters } = this.state
    if (!inputValue) return
    if (filters.filter(x => x.name === inputValue).length > 0) return
    const maxId = filters.reduce((agg, x) => x.id > agg ? x.id : agg, 0)
    const newFilter = {id: maxId + 1, name: inputValue}
    const newFilters = [...filters, newFilter];
    this.updateRoute(newFilters)
    this.setState({
      filters: newFilters,
    });
  }
  render() {
    const { filters } = this.state;
    return (
      <SideBarContainer>
        <SideBarTitle>
          <Icon type="filter"/>
          FILTERS
        </SideBarTitle>
        {filters.length === 0 && (
          <div style={{textAlign: 'center', color: 'rgba(0,0,0,0.4)', fontSize: '12px'}}>no filters applied</div>
        )}
        {filters.map((filter, index) => {
          const isLongName = filter.name.length > 20;
          const filterElem = (
            <Tag closable afterClose={() => this.handleClose(filter)}>
              {isLongName ? `${filter.name.slice(0, 20)}...` : filter.name}
            </Tag>
          )
          return (
            <div
              style={{marginBottom: '10px'}}
              key={filter.name}
            >
              {isLongName ? <Tooltip title={filter.name}>{filterElem}</Tooltip> : filterElem}
            </div>
          )
        })}
        <div style={{ margin: '20px 0 20px 0' }}>
          <AddFilter onNewFilter={this.onNewFilter} />
          <div
            style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}
          >
            <DownloadResults queryString={this.props.queryString}/>
          </div>
        </div>
      </SideBarContainer>
    );
  }
}
FilterBar.contextTypes = {
  router: PropTypes.object,
}
FilterBar.propTypes = {
  queryString: PropTypes.string,
}

export { FilterBar }
