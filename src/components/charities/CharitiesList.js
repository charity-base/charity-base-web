import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { List, Avatar, Button, Spin } from 'antd'
import { fetchJSON } from '../../lib/fetchHelpers'


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
        limit: res.query.limit,
        skip: res.query.skip + res.query.limit,
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
          limit: res.query.limit,
          skip: res.query.skip + res.query.limit,
        })
      })
    }
  }
  getData = (queryString, skip, callback) => {
    const qs = queryString ? queryString.split('?')[1] + '&' : ''
    fetchJSON(`http://localhost:4000/api/v0.3.0/charities?${qs}fields=activities&limit=${this.state.limit}&skip=${skip}&sort=-income.latest.total`)
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
        limit: res.query.limit,
        skip: res.query.skip + res.query.limit,
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
        {!loadingMore && !isMore && <div>No more results</div>}
      </div>
    ) : null;
    return (
      <List
        loading={loading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={data}
        renderItem={({ ids, name, activities }) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`https://ui-avatars.com/api/?name=${name}`} />}
              title={<Link to={`/charities/${ids['GB-CHC']}`}>{name}</Link>}
              description={activities}
            />
          </List.Item>
        )}
      />
    );
  }
}
CharitiesList.propTypes = {
  queryString: PropTypes.string,
}

export { CharitiesList }
