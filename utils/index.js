/*
 * @Author: lixiaoyu
 * @Date: 2020-09-29 11:55:05
 * @LastEditors: lixiaoyu
 * @LastEditTime: 2020-09-30 10:26:16
 */

const arrRemoveRepeat2 = arr => {
  let obj = {}
  return arr = arr.reduce((prev, cur) => {
    obj[cur.id] ? '' : obj[cur.id] = true && prev.push(cur)
    return prev
  }, [])
}

const arr1 = [
  {id: 1, name: 'aaa'},
  {id: 2, name: 'bbb'},
  {id: 3, name: 'ccc'},
]

const arr2 = [
  {id: 3, name: 'ccc'},
  {id: 4, name: 'ddd'},
  {id: 5, name: 'eee'},
  {id: 6, name: 'fff'},
]

console.log(arrRemoveRepeat2([...arr1, ...arr2]))

const checkUrl = url => {
  return /http[s]{0,1}:\/\/([\w.]+\/?)\S*/.test(url)
}
console.log(checkUrl('http://sss'))