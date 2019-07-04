/**
 * 关于浏览器的相关操作
 * @Author: huangfushan
 * @Date: 2019-07-04 11:40
 * @Project: cms-common
 */

//是否是ie浏览器。如果是，返回对应版本
export const isIE = () => {
  let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  let isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; //判断是否IE<11浏览器
  let isEdge = userAgent.indexOf('Edge') > -1 && !isIE; //判断是否IE的Edge浏览器
  let isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
  if (isIE) {
    let reIE = new RegExp('MSIE (\\d+\\.\\d+);');
    reIE.test(userAgent);
    let fIEVersion = parseFloat(RegExp['$1']);
    switch (fIEVersion) {
      case 7:
        return fIEVersion; //7
      case 8:
        return fIEVersion; //8
      case 9:
        return fIEVersion; //9
      case 10:
        return fIEVersion; //10
      default:
        return fIEVersion; //6
    }
  } else if (isEdge) {
    return 'edge'; //edge
  } else if (isIE11) {
    return 11; //IE11
  } else {
    return false;//不是ie浏览器
  }
};
