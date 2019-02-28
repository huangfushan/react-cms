/**
 * statistics
 * @Author: huangfs
 * @Date: 2018-12-18
 * @Project: cms
 */

import React from 'react';
import Pie from '../components/chart/Pie';
import Bar from '../components/chart/Bar';
import Tabs from '../components/antd/Tabs';

const option = {
  legend: ['邮件营销', '联盟广告', '视频广告', '天使'],
  xAxis: ['2010', '2011', '2012', '2013', '2014', '2015', '2016'],
  value: [[150, 232, 201, 154, 190, 330, 410]],
};
const pieOption = {
  legend: ['邮件营销', '联盟广告', '视频广告', '音频广告'],
  value: [[220, 190, 340, 580]],
};

export default class Statistics extends React.Component {

  render() {
    return (
      <div>
        <div className="flex-between" style={{ background: '#eee', padding: '0 .625rem', margin: ' .625rem' }}>
          <h3>消费情况</h3>
          <Tabs
            onChange={(value) => console.log(value)}
            data={[
              { key: 'YESTERDAY', value: '昨日' }, { key: 'MONTH', value: '近一个月' }, { key: 'YEAR', value: '今年来' }
            ]}
          />
        </div>
        <div className="flex">
          <Pie title="消费金额" option={pieOption} />
          <Pie title="消费人次" option={pieOption} />
        </div>
        <div className="flex-between" style={{ background: '#eee', padding: '0 .625rem', margin: ' .625rem' }}>
          <div className="flex-center">
            <h3>售卡情况</h3>
            <span>{`剩余会员卡：${312}张`}</span>
          </div>
          <Tabs
            onChange={(value) => console.log(value)}
            data={[
              { key: 'YESTERDAY', value: '昨日' }, { key: 'MONTH', value: '近一个月' }, { key: 'YEAR', value: '今年来' }
            ]}
          />
        </div>
        <div className="flex">
          <Pie title="总收入" option={pieOption} />
          <Pie title="已售会员卡" option={pieOption} />
          <Bar title="办卡比例" option={option} horizontal />
        </div>
      </div>
    );
  }
}
