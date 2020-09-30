/*
 * @Author: lixiaoyu
 * @Date: 2020-09-30 13:59:56
 * @LastEditors: lixiaoyu
 * @LastEditTime: 2020-09-30 14:27:12
 */

/**
 * 格式化文件单位
 * @param {String || Number} size  文件大小(kb)
 */
export const fileFormatSize = size => {
  var i
  var unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
  for (i = 0; i < unit.length && size >= 1024; i++) {
    size /= 1024
  }
  return (Math.round(size * 100) / 100 || 0) + unit[i]
}


/**
 * 获取星期几
 */
export const getWhatDay = () => {
  return new Date().getDay() ? new Date().getDay() : 7
}


/**
 * 获取当前时间 yyyy-mm-dd,hh:mm:ss
 */
export const getYyMmDdHhMmSs = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minu = date.getMinutes()
  const second = date.getSeconds()
  const arr = [month, day, hours, minu, second]
  arr.forEach((item,index) => {
    arr[index]=item < 10 ? '0' + item : item
  })
  return ( year + '-' + arr[0] + '-' + arr[1] + ' ' + arr[2] + ':' + arr[3] + ':' + arr[4] )
}


/**
 * [时间过滤为 年-月-日]
 * @param now 时间戳
 * @return  {年-月-日}
 */
export function formatDate1(now) {
  if (!now) {
    return ''
  }
  now = new Date(parseInt(now))
  var year = now.getFullYear()
  var month = now.getMonth() + 1
  var dates = now.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (dates < 10) {
    dates = '0' + dates
  }
  return `${year}-${month}-${dates}`
}


/**
 * 时间戳转化为年月日 时分秒
 * @param now 时间戳
 * @returns {年-月-日 时-分-秒}
 */
export function formatDate2(now) {
  if (!now) {
    return ''
  }
  now = new Date(parseInt(now))
  var year = now.getFullYear()
  var month = now.getMonth() + 1
  var dates = now.getDate()
  var hour = now.getHours()
  var minute = now.getMinutes()
  var second = now.getSeconds()
  if (month < 10) {
    month = '0' + month
  }
  if (dates < 10) {
    dates = '0' + dates
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (minute < 10) {
    minute = '0' + minute
  }
  if (second < 10) {
    second = '0' + second
  }
  return `${year}-${month}-${dates} ${hour}:${minute}:${second}`
}


/**
 * 秒数转化为时分秒
 * @param time 秒数
 * @return {时分秒} 
 */
export const formatDuraton = time => {
  if (time > -1) {
    var hour = Math.floor(time / 3600);
    var min = Math.floor(time / 60) % 60;
    var sec = time % 60;
    if (hour < 1) {
      hour = ''
    } else {
      hour = `${hour}小时`
    }

    if (min < 1 && hour < 1) {
      min = ''
    } else {
      min = `${min}分钟`
    }
    sec = `${sec}秒`
  }
  return `${hour}${min}${sec}`
}


/**
 * [过滤时间为 例：1天前]
 * @param dateTimeStamp 时间戳
 * @return  {...前} 
 */
export function getDateDiff(dateTimeStamp) {
  if (!dateTimeStamp) {
    return ''
  }
  let minute = 1000 * 60
  let hour = minute * 60
  let day = hour * 24
  let month = day * 30
  let now = new Date().getTime()
  let diffValue = now - dateTimeStamp
  if (diffValue < 0) {
    return
  }
  let monthC = diffValue / month
  let weekC = diffValue / (7 * day)
  let dayC = diffValue / day
  let hourC = diffValue / hour
  let minC = diffValue / minute
  let result = ''
  if (monthC >= 1) {
    result = '' + parseInt(monthC) + '月前'
  } else if (weekC >= 1) {
    result = '' + parseInt(weekC) + '周前'
  } else if (dayC >= 1) {
    result = '' + parseInt(dayC) + '天前'
  } else if (hourC >= 1) {
    result = '' + parseInt(hourC) + '小时前'
  } else if (minC >= 1) {
    result = '' + parseInt(minC) + '分钟前'
  } else {
    result = '刚刚'
  }
  return result
}