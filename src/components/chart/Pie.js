/**
 * 饼图
 * @Author: huangfs
 * @Date: 2018-12-18
 * @Project: cms
 */

import React from 'react';
import ReactEcharts from 'echarts-for-react';
import lodash from 'lodash';
import service from './service';
import './index.less';

/**
 * 数据处理
 */
const getSeriesData = (option) => {
  let seriesData = [];
  option.value && option.value.forEach((item, index) => {
    seriesData.push({
      name: index,
      type: 'pie',
      radius: ['30%', '60%'],
      center: [`${(2 * index + 1) / (2 * option.value.length) * 100}%`, `${(1 / 2) * 100}%`],
      label: {
        normal: {
          formatter: '{b|{b}：}{c}\n  {per|{d}%}',
          rich: {
            b: {
              fontSize: 16,
              lineHeight: 33
            },
            per: {
              color: '#eee',
              backgroundColor: '#334455',
              padding: [2, 4],
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
  const result = lodash.merge({}, service, {
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

const Pie = (props) => {
  return (
    <ReactEcharts
      option={getOption(props)}
    />
  );
};

export default Pie;
