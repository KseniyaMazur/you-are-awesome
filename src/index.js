// DO WHATEVER YOU WANT HERE
let count = 0;
let countAsync = 0;
const createEnumerableProperty = (enumerableProperty) => {
  return enumerableProperty;
};

const createNotEnumerableProperty = (notEnumerableProperty) => {
  Object.defineProperty(Object.prototype, notEnumerableProperty, {
    get: () => { return this.value},
    set: (newValue) => { this.value = newValue}
  })
  
  return notEnumerableProperty
};

const createProtoMagicObject = () => {
  let magicObject = () => {};
  magicObject.prototype = magicObject.__proto__;
  return magicObject;
};

const incrementor = () => {
  incrementor.valueOf = () => {
    return count;
  }  
  count++;
  return incrementor;
};

const asyncIncrementor = () => {
  return new Promise((resolve) => {
    countAsync++;
    resolve(countAsync);
  })
};

const createIncrementer = () => {
  let incrementer = {};
  incrementer.current = 0;
  incrementer.next = function () {
    this.current++;
    var n = { value: this.current };
    return n;
  };
  incrementer[Symbol.iterator] = function*() {
    return this.next();
  };
  return incrementer;
};

// return same argument not earlier than in one second, and not later, than in two
const returnBackInSecond = (param) => {
  return new Promise((resolve) => {
        setTimeout(() => {
            resolve(param);
        }, 1000);
    });
};
const getDeepPropertiesCount = (obj) => {
  let properties = Object.getOwnPropertyNames(obj);
  let propertiesLength = properties.length;
  properties.forEach(property => {
    if (Object.getOwnPropertyNames(obj[property]).length > 0) {
      propertiesLength += getDeepPropertiesCount(obj[property]);
    };
  });
  return propertiesLength;
};

const createSerializedObject = () => {
  let str = new String();
  str.valueOf = function() {
    return this.toString();
  }
  return str;
};

const toBuffer = () => {};

const sortByProto = (object) => {
  return object.map((obj, i) => {
    let count = 0;
    while (obj = obj.__proto__) {
      count++
    }
    return [count, object[i]];
  })
  .sort((a, b) => a - b)
  .map(([obj, i]) => i);
};

exports.createEnumerableProperty = createEnumerableProperty;
exports.createNotEnumerableProperty = createNotEnumerableProperty;
exports.createProtoMagicObject = createProtoMagicObject;
exports.incrementor = incrementor;
exports.asyncIncrementor = asyncIncrementor;
exports.createIncrementer = createIncrementer;
exports.returnBackInSecond = returnBackInSecond;
exports.getDeepPropertiesCount = getDeepPropertiesCount;
exports.createSerializedObject = createSerializedObject;
exports.sortByProto = sortByProto;