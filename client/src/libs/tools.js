export const forEach = (arr, fn) => {
  if (!arr.length || !fn) return
  let i = -1
  let len = arr.length
  while (++i < len) {
    let item = arr[i]
    fn(item, i, arr)
  }
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description Get the intersection of two arrays, two elements of an array of numeric or string
 */
export const getIntersection = (arr1, arr2) => {
  let len = Math.min(arr1.length, arr2.length)
  let i = -1
  let res = []
  while (++i < len) {
    const item = arr2[i]
    if (arr1.indexOf(item) > -1) res.push(item)
  }
  return res
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description Get two arrays and set, two elements of an array of numeric or string
 */
export const getUnion = (arr1, arr2) => {
  return Array.from(new Set([...arr1, ...arr2]))
}

/**
 * @param {Array} target The target array
 * @param {Array} arr Need to query the array
 * @description Determine whether to query array has at least one element included in the target array
 */
export const hasOneOf = (targetarr, arr) => {
  return targetarr.some(_ => arr.indexOf(_) > -1)
}

/**
 * @param {String|Number} value To verify that a string or value
 * @param {*} validList Used to verify the list
 */
export function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

/**
 * @param {Number} timeStamp To determine whether the timestamp format milliseconds
 * @returns {Boolean}
 */
const isMillisecond = timeStamp => {
  const timeStr = String(timeStamp)
  return timeStr.length > 10
}

/**
 * @param {Number} timeStamp The incoming timestamps
 * @param {Number} currentTime The current time timestamp
 * @returns {Boolean} The incoming timestamps is earlier than the current timestamp
 */
const isEarly = (timeStamp, currentTime) => {
  return timeStamp < currentTime
}

/**
 * @param {Number} num numerical
 * @returns {String} After processing the string
 * @description If the incoming number is less than 10, the digits in only one, is in front of adding 0
 */
const getHandledValue = num => {
  return num < 10 ? '0' + num : num
}

/**
 * @param {Number} timeStamp The incoming timestamps
 * @param {Number} startType To return to the time of the format of the string type, the incoming 'year' is returned in the beginning of the full time
 */
const getDate = (timeStamp, startType) => {
  const d = new Date(timeStamp * 1000)
  const year = d.getFullYear()
  const month = getHandledValue(d.getMonth() + 1)
  const date = getHandledValue(d.getDate())
  const hours = getHandledValue(d.getHours())
  const minutes = getHandledValue(d.getMinutes())
  const second = getHandledValue(d.getSeconds())
  let resStr = ''
  if (startType === 'year') resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
  else resStr = month + '-' + date + ' ' + hours + ':' + minutes
  return resStr
}

/**
 * @param {String|Number} timeStamp time stamp
 * @returns {String} Relative time string
 */
export const getRelativeTime = timeStamp => {
  // Determine the current incoming timestamp format is seconds or milliseconds
  const IS_MILLISECOND = isMillisecond(timeStamp)
  // If it is format milliseconds to seconds
  if (IS_MILLISECOND) Math.floor(timeStamp /= 1000)
  // The incoming timestamps can be numeric or string types, unified into numeric types here
  timeStamp = Number(timeStamp)
  // Gets the current time timestamp
  const currentTime = Math.floor(Date.parse(new Date()) / 1000)
  // Whether the incoming timestamp is earlier than the current timestamp
  const IS_EARLY = isEarly(timeStamp, currentTime)
  // Get two timestamps
  let diff = currentTime - timeStamp
  // If IS_EARLY difference invert to false
  if (!IS_EARLY) diff = -diff
  let resStr = ''
  const dirStr = IS_EARLY ? 'before' : 'after'
  // Less than equal to 59 seconds
  if (diff <= 59) resStr = diff + 'seconds' + dirStr
  // More than 59 seconds, less than equal to 59 minutes and 59 seconds
  else if (diff > 59 && diff <= 3599) resStr = Math.floor(diff / 60) + 'minutes' + dirStr
  // More than 59 minutes and 59 seconds, less than equal to 23 hours, 59 minutes and 59 seconds
  else if (diff > 3599 && diff <= 86399) resStr = Math.floor(diff / 3600) + 'hours' + dirStr
  // More than 23 hours, 59 minutes and 59 seconds, less than equal to 29 days 59 minutes and 59 seconds
  else if (diff > 86399 && diff <= 2623859) resStr = Math.floor(diff / 86400) + 'day' + dirStr
  // More than 29 days 59 minutes and 59 seconds, less than 364 days, 23 hours, 59 minutes and 59 seconds, and the incoming timestamps earlier than the current
  else if (diff > 2623859 && diff <= 31567859 && IS_EARLY) resStr = getDate(timeStamp)
  else resStr = getDate(timeStamp, 'year')
  return resStr
}

/**
 * @returns {String} name of the current browser
 */
export const getExplorer = () => {
  const ua = window.navigator.userAgent
  const isExplorer = (exp) => {
    return ua.indexOf(exp) > -1
  }
  if (isExplorer('MSIE')) return 'IE'
  else if (isExplorer('Firefox')) return 'Firefox'
  else if (isExplorer('Chrome')) return 'Chrome'
  else if (isExplorer('Opera')) return 'Opera'
  else if (isExplorer('Safari')) return 'Safari'
}

/**
 * @description binding event on(element, event, handler)
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('onObject' + event, handler)
      }
    }
  }
})()

/**
 * @description unbundling event off(element, event, handler)
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * determine whether an object is the key, if pass into the second parameter key, is to judge whether the object obj is key this attribute
 * if this option is not introduced to the key, then determine if there is a key/value pair object obj
 */
export const hasKey = (obj, key) => {
  if (key) return key in obj
  else {
    let keysArr = Object.keys(obj)
    return keysArr.length
  }
}

/**
 * @param {*} obj1 object
 * @param {*} obj2 object
 * @description Determine whether two objects are equal, both the value of the object only Numbers or strings
 */
export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1)
  const keysArr2 = Object.keys(obj2)
  if (keysArr1.length !== keysArr2.length) return false
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true
  /* eslint-disable-next-line */
  else return !keysArr1.some(key => obj1[key] != obj2[key])
}
