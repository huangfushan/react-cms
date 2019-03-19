/**
 * 饼图
 * @Author: huangfs
 * @Date: 2018-12-18
 * @Project: cms
 */

import React from 'react';
import ReactEcharts from 'echarts-for-react';
import merge from 'lodash.merge';
import service from './service';
import './index.less';
import NoData from '../common/NoData';

/**
 * 数据处理
 */
const getSeriesData = (option) => {
  let seriesData = [];
  option.value && option.value.forEach((item, index) => {
    seriesData.push({
      name: index,
      type: 'pie',
      radius: ['20%', '40%'],
      center: [`${(2 * index + 1) / (2 * option.value.length) * 100}%`, `${(1 / 2) * 100}%`],
      label: {
        normal: {
          formatter: '{b|{b}：}{c}  {per|{d}%}',
          rich: {
            b: {
              fontSize: '775rem',
              lineHeight: 33
            },
            per: {
              color: '#eee',
              fontSize: '75rem',
              backgroundColor: '#334455',
              padding: [2, 2],
              borderRadius: 2
            }
          }
        }
      },
      data: item.map((n, i) => (
          {
            value: n,
            name: option.legend[i]
          }
        )
      )
    });
  });
  return seriesData;
};

const getOption = (props) => {
  const { title, option = {} } = props;
  const result = merge({}, service, {
    title: {
      text: title
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}  ({d}%)'
    },
    legend: {
      icon: 'circle',
      data: option.legend
    },
    toolbox: {
      feature: {
        saveAsImage: {
          title: '保存',
          pixelRatio: 2
        },
      }
    },
    series: getSeriesData(option)
  });
  return result;
};

const Pie = ({title, option}) => {
  return (option && option.value && option.value.length) ? (
    <ReactEcharts
      option={getOption({ title, option})}
    />
  ) : NoData();
};

export default Pie;
