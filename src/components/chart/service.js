/**
 * service
 * @Author: huangfs
 * @Date: 2018-12-18
 * @Project: web-brand
 */


export default {
  title: {
    x : 'center',
    y : 'bottom',
    textStyle: {
      fontWeight: 400,
      fontSize: 16,
      color: '#687284'
    },
    text: ''
  },
  toolbox: {
    show: true,
    feature: {
      // dataZoom: {
      //   yAxisIndex: 'none'
      // },
      dataView: {
        readOnly: true,
        borderColor: '#eee' ,
        textareaColor: "#eee",
        textareaBorderColor: '#ddd',
        textColor: '#777',
      }, //查看数据
      // magicType: {type: ['line', 'bar', 'stack', 'tiled']}, // 切换直方图/线性图/折叠/平铺
      // magicType: {type: ['line', 'bar']}, // 切换直方图/线性图
    }
  },
  grid: {
    left: '3%',
    right: '2%',
    bottom: '8%',
    containLabel: true
  },
  legend: {
    orient: 'horizontal'
  },
}
