/**
 * 三级联动
 * @Author: huangfushan
 * @Date: 2019-03-22 17:21
 * @Project: web-manager-admin
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { connect } from 'react-redux';
import { AsyncActions } from '../../../redux/actions';
import Selector from '../../antd/Selector';

@Form.create()
@connect(
  state => ({
    province: state.address.province,
    city: state.address.city,
    county: state.address.county,
  }),
  {
    fetchProvinceList: AsyncActions.fetchProvinceList,
    fetchCityList: AsyncActions.fetchCityList,
    fetchCountyList: AsyncActions.fetchCountyList,
  }
)
export default class AddressSelector extends React.Component {

  static propTypes = {
    value: PropTypes.object,
    province: PropTypes.array.isRequired,
    city: PropTypes.array.isRequired,
    county: PropTypes.array.isRequired,
    fetchProvinceList: PropTypes.func.isRequired,
    fetchCityList: PropTypes.func.isRequired,
    fetchCountyList: PropTypes.func.isRequired,
    hasCity: PropTypes.bool,
    hasCounty: PropTypes.bool
  };

  static defaultProps = {
    hasCity: true,
    hasCounty: true,
    province: [],
    city: [],
    county: [],
  };

  componentDidMount() {
    if (!this.props.province || !this.props.province.length) {
      this.props.fetchProvinceList();
    }
  }

  /**
   * 获取省市县
   * @param type，province省份，city市区，county县区
   * @param code, 如果是city和county的话，此参数必传
   */
  handleChange = (type, code) => {
    const { onChange, value } = this.props;
    switch (type) {
      case 'province':
        if (onChange) {
          onChange({ province: code || undefined, city: undefined, county: undefined });
        }
        if (!code) return;
        this.props.fetchCityList(code || undefined);
        break;
      case 'city':
        if (onChange) {
          onChange({ ...value, city: code || undefined, county: undefined });
        }
        if (!code) return;
        this.props.fetchCountyList(code || undefined);
        break;
      case 'county':
        this.setState({ county: code || undefined });
        if (onChange) {
          onChange({ ...value, county: code || undefined });
        }
        break;
      default:
        break;
    }
  };

  render() {
    const { value, province, city, county, hasCity, hasCounty } = this.props;
    return (
      <div>
        <Selector
          style={{ width: '33%' }}
          placeholder="省份"
          data={[{ key: 0, value: '请选择' }, ...province || []]}
          value={(value && value.province) || undefined}
          onChange={(value) => this.handleChange('province', value)} />
        {
          hasCity && (
            <Selector
              style={{ width: '33%', margin: '0 0.5%', fontSize: '.75rem' }}
              placeholder="市区"
              data={[{ key: 0, value: '请选择' }, ...(value && value.province && city) || []]}
              value={(value && value.city) || undefined}
              onChange={(value) => this.handleChange('city', value)} />
          )
        }
        {
          hasCity && hasCounty && (
            <Selector
              style={{ width: '33%' }}
              placeholder="县区"
              data={[{ key: 0, value: '请选择' }, ...(value && value.province && value.city && county) || []]}
              value={(value && value.county) || undefined}
              onChange={(value) => this.handleChange('county', value)}
            />
          )
        }
      </div>
    );
  }
}
