/**
 * 直方图
 * @Author: huangfs
 * @Date: 2018-12-18
 * @Project: cms
 */

import React from 'react';
import ReactEcharts from 'echarts-for-react';
import service from './service';
import merge from 'lodash.merge';
import './index.less';
import NoData from '../common/NoData';

/**
 * 数据处理
 */
const getSeriesData = (option) => {
  let seriesData = [];
  option.value && option.value.forEach((item, index) => {
    seriesData.push({
      data: item,
      type: 'bar',
      stack: '总量',
      barMaxWidth: '40%',
      name: option.legend[index],
      label: {
        normal: {
          formatter: '{c}',
          show: true,
          position: 'insideRight'
        }
      }
    });
  });
  if (option.line) {
    seriesData.push({
      name: option.line.name,
      type: 'line',
      label: {
        normal: {
          formatter: '{c}',
          show: true,
        },
      },
      data: option.line.data
    });
  }
  return seriesData;
};

const getOption = (props) => {
  const { title, option = {}, horizontal = false } = props;

  const yAxis = {
    type: 'value'
  };
  const xAxis = {
    type: 'category',
    data: option.xAxis
  };
  const result = merge({}, service, {
    title: {
      text: title
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    toolbox: {
      feature: {
        magicType: { type: ['line', 'bar'] }, // 切换直方图/线性图
        saveAsImage: {
          title: '保存',
          pixelRatio: 2
        },
      }
    },
    legend: {
      data: option.legend,
    },
    yAxis: horizontal ? xAxis : yAxis,
    xAxis: horizontal ? yAxis : xAxis,
    series: getSeriesData(option)
  });
  return result;
};

const Bar = ({ title, option }) => {
  return (option && option.value && option.value.length) ? (
    <ReactEcharts
      option={getOption({ title, option })}
    />
  ) : NoData();
};

export default Bar;
