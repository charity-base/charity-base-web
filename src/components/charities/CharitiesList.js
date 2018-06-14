import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import { Link } from 'react-router-dom'
import { List, Avatar, Button, Spin, Icon } from 'antd'
import { fetchJSON } from '../../lib/fetchHelpers'
import { NoneText } from '../general/NoneText'


const IncomeIcon = ({ income }) => (
  <svg style={{ width: '50px', height: '50px', }}>
    <circle
      cx='25px'
      cy='25px'
      fill='#EEE'
      r={2*Math.log10(income || 1)}
    />
    <line
      stroke='#EEE'
      strokeWidth="1"
      x1='0px'
      x2='25px'
      y1='25px'
      y2='25px'
    />
  </svg>
)
IncomeIcon.propTypes = {
  income: PropTypes.number,
}

const IncomeLabel = styled.span`
  height: 50px;
  line-height: 50px;
  vertical-align: top;
  font-size: 16px;
  margin-right: 5px;
  letter-spacing: 1px;
`

const Income = ({ income }) => (
  <div>
    <IncomeLabel>
      {numeral(income).format('($0a)').replace('$', '£')}
    </IncomeLabel>
    <IncomeIcon type='pay-circle' income={income} />
  </div>
)

class CharitiesList extends Component {
  state = {
    loading: true,
    loadingMore: false,
    showLoadingMore: true,
    data: [],
    limit: 10,
    skip: 0,
  }
  componentDidMount() {
    this.getData(this.props.queryString, 0, res => {
      this.setState({
        data: res.charities,
        loading: false,
        limit: res.query.meta.size,
        skip: res.query.meta.from + res.query.meta.size,
      })
    })
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.queryString !== nextProps.queryString) {
      this.setState({
        loading: true,
        loadingMore: false,
        showLoadingMore: true,
        data: [],
        limit: 10,
        skip: 0,
      })
      this.getData(nextProps.queryString, 0, res => {
        this.setState({
          data: res.charities,
          loading: false,
          limit: res.query.meta.size,
          skip: res.query.meta.from + res.query.meta.size,
        })
      })
    }
  }
  getData = (queryString, skip, callback) => {
    const qs = queryString ? queryString.split('?')[1] + '&' : ''
    const url = `http://localhost:4000/api/v2.0.0/charities?${qs}fields=ids,name,alternativeNames,activities,income.latest.total&limit=${this.state.limit}&skip=${skip}`
    fetchJSON(url)
    .then(res => callback(res))
    .catch(err => console.log(err))
  }
  onLoadMore = () => {
    this.setState({
      loadingMore: true,
    });
    this.getData(this.props.queryString, this.state.skip, res => {
      const data = this.state.data.concat(res.charities)
      this.setState({
        data,
        loadingMore: false,
        limit: res.query.meta.size,
        skip: res.query.meta.from + res.query.meta.size,
      }, () => {
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
    });
  }
  render() {
    const { loading, loadingMore, showLoadingMore, data, limit } = this.state;
    const isMore = data.length/limit === Math.round(data.length/limit)
    const loadMore = showLoadingMore ? (
      <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        {loadingMore && <Spin />}
        {!loadingMore && isMore && <Button onClick={this.onLoadMore}>Show More</Button>}
        {!loadingMore && !isMore && <NoneText>end of results</NoneText>}
      </div>
    ) : null;
    return (
      <List
        size="large"
        itemLayout="vertical"
        loading={loading}
        loadMore={loadMore}
        dataSource={data}
        renderItem={({ ids, name, activities, income, alternativeNames }) => (
          <List.Item
            actions={[
              <Link to={`/charities/${ids['GB-CHC']}?view=contact`}><Icon type="phone" /></Link>,
              <Link to={`/charities/${ids['GB-CHC']}?view=people`}><Icon type="team" /></Link>,
              <Link to={`/charities/${ids['GB-CHC']}?view=places`}><Icon type="global" /></Link>,
            ]}
            extra={
              <Income income={income && income.latest.total} />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={`https://ui-avatars.com/api/?name=${name}`} />}
              title={<Link to={`/charities/${ids['GB-CHC']}`}>{name}</Link>}
              description={alternativeNames.filter(x => x !== name).join(', ')}
            />
            {activities && `${activities.slice(0,120)}...`}
          </List.Item>
        )}
      />
    )
  }
}
CharitiesList.propTypes = {
  queryString: PropTypes.string,
}

export { CharitiesList }
