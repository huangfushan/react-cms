/**
 * 线性图
 * @Author: huangfs
 * @Date: 2018-12-18
 * @Project: cms
 */

import React from 'react';
import ReactEcharts from 'echarts-for-react';
import merge from 'lodash.merge';
import service from './service';
import './index.less';

/**
 * 数据处理
 */
const getSeriesData = (option) => {
  let seriesData = [];
  option.value && option.value.forEach((item, index) => {
    seriesData.push({
      data: item,
      type: 'line',
      name: option.legend[index],
    });
  });
  return seriesData
};

const getOption = (props) => {
  const { title, option = {} } = props;
  const result = merge({}, service, {
    title: {
      text: title
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: option.legend
    },
    toolbox: {
      feature: {
        magicType: {type: ['line', 'bar']}, // 切换直方图/线性图
        saveAsImage: {
          title: '保存',
          pixelRatio: 2
        },
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: option.xAxis
    },
    yAxis: {
      type: 'value'
    },
    series: getSeriesData(option)
  });
  return result;
};


const Line = (props) => {
  return (
    <ReactEcharts
      option={getOption(props)}
    />
  );
};

export default Line;
