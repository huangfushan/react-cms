/**
 * 日期
 * @Author: huangfs
 * @Date: 2018-10-27
 * @Project: cms
 */


//格式化日期
export const timeFmt = (time, fmt ) => {
  const date = new Date(time || new Date()) ;
  const value = {
    "M+": date.getMonth()+1,                 //月份
    "D+": date.getDate(),                    //日
    "H+": date.getHours(),                   //小时
    "m+": date.getMinutes(),                 //分
    "s+": date.getSeconds(),                 //秒
    "q+": Math.floor((date.getMonth()+3)/3), //季度
    "S" : date.getMilliseconds()             //毫秒
  };

  if (/(Y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
  }

  for (let k in value) {
    if(new RegExp("("+ k +")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (value[k]) : (("00"+ value[k]).substr((""+ value[k]).length)));
    }
  }
  return fmt;
};

//拿到某个时间之后或之前n天到格式化后的时间
export const timeFmtNext = (time, n, fmt) => {
  const timestamp = new Date(time || new Date()).getTime();
  const date = new Date(timestamp + n *24 * 3600 * 1000);
  return timeFmt(date, fmt);
};


