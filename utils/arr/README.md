<!--
 * @Author: lixiaoyu
 * @Date: 2020-09-29 10:28:05
 * @LastEditors: lixiaoyu
 * @LastEditTime: 2020-09-29 17:54:48
-->
## 常用数组工具类

### arrAndSet：并集
```js
/**
 * 取数组并集
 * @param {Array} 
 * @return {Array} 
 */
export const arrAndSet = (arrOne, arrTwo) => {
  return arrOne.concat(arrTwo.filter(v => !arrOne.includes(v)))
}
```

### arrIntersection：交集
```js
/**
 * 数组取交集
 * @param {Array} 
 * @return {Array} 
 */
export const arrIntersection = (arrOne, arrTwo) => {
  return arrOne.filter(v => arrTwo.includes(v))
}
```

### arrDifferent：差集
```js
/**
 * 数组取差集
 * @param {Array} 
 * @return {Array} 
 * eg: [1, 2, 3, 4]和[2, 3, 5, 6]的差集为[1, 4, 5, 6]
 */
export const arrDifferent = (arrOne, arrTwo) => {
  return arrOne.concat(arrTwo).filter(v => !arrOne.includes(v) || !arrTwo.includes(v))
}
```

### arrObjSum：数组对象求和
```js
/**
 * 数组对象求和
 * @param {Object} arrObj 数组对象
 * @param {String} key 数组对应的 key 值
 */
export const arrObjSum = (obj, key) => {
  return obj.reduce((prev, cur) => prev + cur[key], 0)
}
```

### arrMax：数组最大值
```js
/**
 * 数组最大值
 * @param {Array} 
 */
export const arrMax = arr => {
  return Math.max(...arr)
}
```

### arrRemoveRepeat1：数组去重1
```js
/**
 * 数组去重1
 * @param {Array}
 */
export const arrRemoveRepeat1 = arr => {
  return Array.from(new Set(arr))
}
```

### arrRemoveRepeat2：数组去重2
```js
/**
 * 数组去重2
 * @param {Array}
 */
export const arrRemoveRepeat2 = arr => {
  return arr.reduce((prev, cur) => {
    prev.indexOf(cur) === -1 && prev.push(cur)
    return prev
  }, [])
}
```

### arrObjRemoveRepeat：数组对象去重
```js
/**
 * 数组对象去重 
 * @param {Array} 
 * @return {Array} 
 */
export const arrObjRemoveRepeat = arr => {
  let obj = {}
  return arr = arr.reduce((prev, cur) => {
    obj[cur.id] ? '' : obj[cur.id] = true && prev.push(cur)
    return prev
  }, [])
}
```

### arrOrderAscend：数组排序
```js
/**
 * 数组排序
 * @param {Array} arr  数组
 * @param {Boolean} ascendFlag   升序,默认为 true
 */
export const arrOrderAscend = (arr, ascendFlag = true) => {
  return arr.sort((a, b) => {
    return ascendFlag ? a - b : b - a
  })
}
```
