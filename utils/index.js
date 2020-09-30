/**
 * 判断两个对象是否相等,目前只支持对象值为简单数据类型的判断
 * @param {Object} oneObj  对象
 * @param {Object} twoObj 对象
 */
const objIsEqual = (oneObj, twoObj) => {
  const aProps = Object.getOwnPropertyNames(oneObj);
  const bProps = Object.getOwnPropertyNames(twoObj);

        if (aProps.length != bProps.length) {
            return false;
        }

        for (let i = 0; i < aProps.length; i++) {
            let propName = aProps[i];
            let propA = oneObj[propName];
            let propB = twoObj[propName];
            if ( propA !== propB) {
                    return false;
            }
        }
        return true;
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

const obj1 = {
  id: 1,
  name: 'lxy',
  age: 18
}

const obj2 = {
  id: 1,
  name: 'lxy',
  age: 18
}
console.log(objIsEqual(obj1, obj2))