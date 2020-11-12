/*
 * @Author: lixiaoyu
 * @Date: 2020-11-10 15:20:07
 * @LastEditors: lixiaoyu
 * @LastEditTime: 2020-11-10 15:20:31
 */
const formatTime = (a, b) => {
  b = b || "yyyy-MM-dd hh:mm:ss";
  var a = new Date(a), c = {
    "M+": a.getMonth() + 1,
    "d+": a.getDate(),
    "h+": a.getHours(),
    "m+": a.getMinutes(),
    "s+": a.getSeconds(),
    "q+": Math.floor((a.getMonth() + 3) / 3),
    S: a.getMilliseconds()
  };
  for (var d in /(y+)/.test(b) && (b = b.replace(RegExp.$1, (a.getFullYear() + "").substr(4 - RegExp.$1.length))),
    c) new RegExp("(" + d + ")").test(b) && (b = b.replace(RegExp.$1, 1 == RegExp.$1.length ? c[d] : ("00" + c[d]).substr(("" + c[d]).length)));
  return b;
}
const timeTransform = (data) => {
  data = data + ''
  return data.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
}
const timeTransformParse = (data) => {
  return data.replace(/(\d{4})-(\d{2})-(\d{2})/g, '$1$2$3')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const buttonClickedFn = (self, name) => {
  let datas = {};
  datas[name] = true;
  self.setData(datas)
  // console.log(self.data[name])
  setTimeout(function () {
    datas[name] = false;
    self.setData(datas)
  }, 800)
}

module.exports = {
  formatTime: formatTime,
  formatNumber,
  buttonClickedFn,
  timeTransform,
  timeTransformParse
}