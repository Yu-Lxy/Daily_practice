/*
 * @Author: lixiaoyu
 * @Date: 2020-09-30 09:54:50
 * @LastEditors: lixiaoyu
 * @LastEditTime: 2020-09-30 11:29:49
 */
/**
 * 验证数字
 * @param {String} data
 */
export const checkNumber = data => /^\d{1,}$/g.test(data)

/**
 *  验证字母
 * @param {String} data
 */
export const checkLetter = data => /^[a-zA-Z]+$/g.test(data)

/**
 * 验证中文
 * @param {String} data
 */
export const checkChinese = data => /^[\u4E00-\u9FA5]+$/g.test(data)

/**
 * 验证中文，数字或字母
 * @param {String} data
 */
export const checkChineseNumberLettter = data => /^[a-zA-Z0-9\u4e00-\u9fa5]+$/g.test(data)

/**
 * 验证邮箱地址
 * 以数字字母开头，中间可以数字、字母或"-"
 * 然后是"@"符号，后面是数字字母
 * 然后是"."符号，后面2-4个字母结尾
 * @param {String} data
 */
export const checkEmail = data => {
  const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  if (reg.test(data)) return true
}

/**
 * 验证手机号，只要是13,14,15,16,17,18,19开头即可
 * @param {String} data
 */
export const checkTelphone = data => {
  const reg = /^((\+|00)86)?1[3-9]\d{9}$/g
  if (reg.test(data)) return true
}

/**
 * 验证网址
 * @param {String} url 网址
 */
export const checkUrl = url => {
  return /http[s]{0,1}:\/\/([\w.]+\/?)\S*/.test(url)
}

/**
 * 判断是浏览器内核
 */
export const checkBrowser = () => {
  const u = navigator.userAgent;
  const obj = {
    trident: u.indexOf("Trident") > -1, //IE内核
    presto: u.indexOf("Presto") > -1, //opera内核
    webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
    gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
  }
  return Object.keys(obj)[Object.values(obj).indexOf(true)]
}

/**
 * 判断是终端类型,值有ios,android,iPad
 */
export const checkIosAndroidIpad = () => {
  const u = navigator.userAgent;
  const obj = {
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或者uc浏览器
    iPad: u.indexOf("iPad") > -1, //是否iPad
  }
  return Object.keys(obj)[Object.values(obj).indexOf(true)]
}

/**
 * 判断是否是微信,qq 或 uc
 */
export const checkWeixinQqUc = () => {
  const u = navigator.userAgent;
  const obj = {
    weixin: u.indexOf("MicroMessenger") > -1, //是否微信
    qq: u.match(/QQ/i) == "qq"&&!u.indexOf('MQQBrowser') > -1, //是否QQ
    uc: u.indexOf('UCBrowser') > -1
  }
  return Object.keys(obj)[Object.values(obj).indexOf(true)]
}

/**
 * 检查是否是 IphoneX
 */
export const checkIsIphoneX = () => {
  const u = navigator.userAgent;
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isIOS && screen.height >= 812) {
    return true;
  }
}