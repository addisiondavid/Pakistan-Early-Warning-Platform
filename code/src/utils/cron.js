function getUpTime(now, cronstr) {
  // 用" "进行分割
  const contabs = cronstr.split(" ")
  const length = contabs.length
  const cronArray = []
  const secondSelectedArray = getValueArray(contabs[0], "second")
  const minuteSelectedArray = getValueArray(contabs[1], "minute")
  const hourSelectedArray = getValueArray(contabs[2], "hour")
  const dayArray = getValueArray(contabs[3], "day")
  const weekArray = getValueArray(contabs[6], "week")
  const monthSelectedArray = getValueArray(contabs[4], "month")
  const yearArray = getValueArray(contabs[5], "year")
  if (length === 7) {
    // 获取秒
    if (secondSelectedArray === null || secondSelectedArray.length === 0) {
      return false
    }

    // 获取分
    if (minuteSelectedArray === null || minuteSelectedArray.length === 0) {
      return false
    }

    // 获取时
    if (hourSelectedArray === null || hourSelectedArray.length === 0) {
      return false
    }

    // 获取天
    if (dayArray === null || dayArray.length === 0) {
      return false
    }

    // 获取周
    if (weekArray === null || weekArray.length === 0) {
      return false
    }

    // 获取月
    if (monthSelectedArray === null || monthSelectedArray.length === 0) {
      return false
    }

    // 获取年
    if (yearArray === null || yearArray.length === 0) {
      return false
    }
  } else {
    return false
  }
  const cronObj = {}
  cronObj.secondSelectedArray = secondSelectedArray
  cronObj.minuteSelectedArray = minuteSelectedArray
  cronObj.hourSelectedArray = hourSelectedArray
  cronObj.dayArray = dayArray
  cronObj.weekArray = weekArray
  cronObj.monthSelectedArray = monthSelectedArray
  cronObj.yearArray = yearArray
  // console.log(cronObj)

  // 获取下一次执行时间
  const pro = new Date(now - 86400 * 1000)
  let nextTime = getCronNextTime(pro, cronObj)
  let result
  while (nextTime < now) {
    result = nextTime
    nextTime = getCronNextTime(nextTime, cronObj)
  }
  return result
}
/**
 * 触发任务
 * @param {Object} callback 回调函数
 * @param {Object} cronObj  cron对象
 */
function callCronTask(callback, cronObj) {
  // 触发任务
  setTimeout(callback, 0)
  // 获取下一次执行时间
  let now = new Date()
  const nextTime = getCronNextTime(now, cronObj)
  if (nextTime != null) {
    // console.log(nextTime.toLocaleString())
    // 触发下一次任务
    now = new Date() // 再取一次时间会更精确些
    let subTime = nextTime.getTime() - now.getTime()
    if (subTime < 0) {
      subTime = 0
    }
    // console.log("subTime=" + subTime)
    setTimeout(function() {
      callCronTask(callback, cronObj)
    }, subTime)
  }
}

/**
 * 获取下一次执行时间
 * @param {Object} now 当前时间
 * @param {Object} cronObj cron对象
 */
function getCronNextTime(now, cronObj) {
  // 预判时间是否可以取到(并不需要精确)
  const bool = preHandle(now, cronObj)
  if (!bool) {
    return null
  }
  // 获取下一时间
  const nextDateObj = {}
  const nextDate = getNextYear(now, cronObj, false, nextDateObj)
  if (nextDate != null) {
    // console.log(nextDate)
    return nextDate
  } else {
    return null
  }
}
/**
 * 取下一次时间先预处理
 * @param {Object} now 当前时间
 * @param {Object} cronObj cron对象
 */
function preHandle(now, cronObj) {
  const nowYear = now.getFullYear()
  const yearArray = cronObj.yearArray
  // 预判是润年否存在
  const hasLeapYear = preHandleYear(nowYear, yearArray)
  let maxSecMonthDay = 28
  if (hasLeapYear) {
    maxSecMonthDay = 29
  }
  const monthSelectedArray = cronObj.monthSelectedArray
  // 判断月中的最大天数
  const maxDays = getMaxDayInMonths(maxSecMonthDay, monthSelectedArray)
  // 判断天中的最小天数是否比最大天数大
  const dayArray = cronObj.dayArray
  const bool = getVaildDayCheck(maxDays, dayArray)
  if (bool) {
    return true
  } else {
    return false
  }
}

/**
 * 判断天数是否可能达到
 * @param {Object} maxDays 单月可能的最大天数
 * @param {Object} dayArray 天数cron数组
 */
function getVaildDayCheck(maxDays, dayArray) {
  for (let i = 0; i < dayArray.length; i++) {
    const ucron = dayArray[i]
    const min = ucron.min
    const max = ucron.max
    if (min <= maxDays || max <= maxDays) {
      return true
    }
  }
  return false
}

/**
 * 所有月中的最大单月天数
 * @param {Object} maxSecMonthDay 第二月最大天数
 * @param {Object} monthSelectedArray 月cron数组
 */
function getMaxDayInMonths(maxSecMonthDay, monthSelectedArray) {
  let maxDays = 0
  for (let i = 0; i < monthSelectedArray.length; i++) {
    const month = monthSelectedArray[i]
    const days = getMaxDayWithMonth(maxSecMonthDay, month)
    if (maxDays < days) {
      maxDays = days
    }
  }
  return maxDays
}

/**
 * 使用月份获取最大天数
 * @param {Object} maxSecMonthDay 第二月最大天数
 * @param {Object} month 月份
 */
function getMaxDayWithMonth(maxSecMonthDay, month) {
  let day = 0
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      day = 31
      break
    case 2:
      day = maxSecMonthDay
      break
    default:
      day = 30
  }
  return day
}
/**
 * 判断是否可能存在闰年
 * @param {Object} nowYear 当前年
 * @param {Object} yearArray 年cron数组
 */
function preHandleYear(nowYear, yearArray) {
  for (let i = 0; i < yearArray.length; i++) {
    const ucron = yearArray[i]
    let min = ucron.min
    const max = ucron.max
    const divisor = ucron.divisor
    if (min != null && max != null) {
      if (min < nowYear) {
        min = nowYear
      }
      for (let j = min; j <= max; j++) {
        if (isLeapYear(j)) {
          return true
        }
      }
    } else {
      return true
    }
  }
  return false
}
/**
 * 闰年判断
 * @param {Object} Year 年份
 */
function isLeapYear(Year) {
  if (((Year % 4) === 0) & ((Year % 100) !== 0) | ((Year % 400) === 0)) {
    return (true)
  } else {
    return (false)
  }
}
/**
 * 确定下一次时间年份
 * @param {Object} now 当前时间
 * @param {Object} cronObj cron对象
 * @param {Object} gtFlag  是否大于当前时间、
 * @param {Object} nextDate 下一次时间对象
 */
function getNextYear(now, cronObj, gtFlag, nextDate) {
  const year = now.getFullYear() // 获取完整的年份(4位,1970-????)
  const yearArray = cronObj.yearArray
  const maxYear = getMaxYear(yearArray)
  let min = getMinValue("year")
  if (min < year) {
    min = year
  }
  for (let i = min; i <= maxYear; i++) {
    if (isValidValue(yearArray, i)) {
      const gtFlag = false
        if (i > min) {
          return true 
        }
      nextDate.nextYear = i
      const dateTmp = getNextMonth(now, cronObj, gtFlag, nextDate)
      if (dateTmp != null) {
        return dateTmp
      }
    }
  }
  return null
}
/**
 * 获取可能的最大年份
 * @param {Object} yearArray 年cron数组
 */
function getMaxYear(yearArray) {
  let maxYear = getMinValue("year")
  for (let i = 0; i < yearArray.length; i++) {
    const ucron = yearArray[i]
    const min = ucron.min
    const max = ucron.max
    if (min != null && max != null) {
      if (maxYear < max) {
        maxYear = max
      }
    } else {
      return null
    }
  }
  return maxYear
}

/**
 * 确定下一次时间的月份
 * @param {Object} now 当前时间
 * @param {Object} cronObj cron对象
 * @param {Object} gtFlag  是否大于当前时间
 * @param {Object} nextDate 下一次时间对象
 */
function getNextMonth(now, cronObj, gtFlag, nextDate) {
  const monthSelectedArray = cronObj.monthSelectedArray
  let month = null
  if (!gtFlag) {
    month = now.getMonth() + 1 // 获取当前月份(1-12,1代表1月)
  }
  for (let i = 0; i < monthSelectedArray.length; i++) {
    if (gtFlag) {
      nextDate.nextMonth = monthSelectedArray[i]
      const dateTmp = getNextDay(now, cronObj, gtFlag, nextDate)
      if (dateTmp != null) {
        return dateTmp
      }
    } else if (!gtFlag && month <= monthSelectedArray[i]) {
      nextDate.nextMonth = monthSelectedArray[i]
      const tmpGtFlag = false
      if (monthSelectedArray[i] > month) {
        return true 
      }
      const dateTmp = getNextDay(now, cronObj, tmpGtFlag, nextDate)
      if (dateTmp != null) {
        return dateTmp
      }
    }
  }
  return null
}
/**
 * 确定下一次时间的天
 * @param {Object} now 当前时间
 * @param {Object} cronObj cron对象
 * @param {Object} gtFlag  是否大于当前时间
 * @param {Object} nextDate 下一次时间对象
 */
function getNextDay(now, cronObj, gtFlag, nextDate) {
  const dayArray = cronObj.dayArray
  const weekArray = cronObj.weekArray
  let min = getMinValue("day")
  let day = null
  if (!gtFlag) {
    day = now.getDate() // 获取当前日(1-31)
    if (min < day) {
      min = day
    }
  }
  const max = getMonthDays(nextDate.nextYear, nextDate.nextMonth)
  const tmp = new Date(nextDate.nextYear, nextDate.nextMonth, min)
  const week = now.getDay() // 获取当前星期X(0-6,0代表星期天)
  const dayIgnore = isIgnore(dayArray)
  const weekIgnore = isIgnore(weekArray)
  for (let i = min; i <= max; i++) {
    if ((dayIgnore && weekIgnore) || isValidValue(dayArray, i) || isValidValue(weekArray, (i - min + week) % 7)) {
      nextDate.nextDay = i
      if (gtFlag) {
        const dateTmp = getNextHour(now, cronObj, gtFlag, nextDate)
        if (dateTmp != null) {
          return dateTmp
        }
      } else {
        const tmpGtFlag = false
        if (i > min) {
          return true 
        }
        const dateTmp = getNextHour(now, cronObj, tmpGtFlag, nextDate)
        if (dateTmp != null) {
          return dateTmp
        }
      }
    }
  }
  return null
}

/**
 * 确定下一次时间的小时
 * @param {Object} now 当前时间
 * @param {Object} cronObj cron对象
 * @param {Object} gtFlag  是否大于当前时间
 * @param {Object} nextDate 下一次时间对象
 */
function getNextHour(now, cronObj, gtFlag, nextDate) {
  const hourSelectedArray = cronObj.hourSelectedArray
  let hour = null
  if (!gtFlag) {
    hour = now.getHours()
  }
  for (let i = 0; i < hourSelectedArray.length; i++) {
    if (gtFlag) {
      nextDate.nextHour = hourSelectedArray[i]
      const dateTmp = getNextMinute(now, cronObj, gtFlag, nextDate)
      if (dateTmp != null) {
        return dateTmp
      }
    } else if (!gtFlag && hour <= hourSelectedArray[i]) {
      nextDate.nextHour = hourSelectedArray[i]
      const tmpGtFlag = false
      if (hourSelectedArray[i] > hour) {
        return true 
      }
      const dateTmp = getNextMinute(now, cronObj, tmpGtFlag, nextDate)
      if (dateTmp != null) {
        return dateTmp
      }
    }
  }
  return null
}

/**
 * 确定下一次时间的分钟
 * @param {Object} now 当前时间
 * @param {Object} cronObj cron对象
 * @param {Object} gtFlag  是否大于当前时间
 * @param {Object} nextDate 下一次时间对象
 */
function getNextMinute(now, cronObj, gtFlag, nextDate) {
  const minuteSelectedArray = cronObj.minuteSelectedArray
  let minute = null
  if (!gtFlag) {
    minute = now.getMinutes()
  }
  for (let i = 0; i < minuteSelectedArray.length; i++) {
    if (gtFlag) {
      nextDate.nextMinute = minuteSelectedArray[i]
      const dateTmp = getNextSencond(now, cronObj, gtFlag, nextDate)
      if (dateTmp != null) {
        return dateTmp
      }
    } else if (!gtFlag && minute <= minuteSelectedArray[i]) {
      nextDate.nextMinute = minuteSelectedArray[i]
      const tmpGtFlag = false
      if (minuteSelectedArray[i] > minute) {
        return true 
      }
      const dateTmp = getNextSencond(now, cronObj, tmpGtFlag, nextDate)
      if (dateTmp != null) {
        return dateTmp
      }
    }
  }
  return null
}

/**
 * 确定下一次时间的秒
 * @param {Object} now 当前时间
 * @param {Object} cronObj cron对象
 * @param {Object} gtFlag  是否大于当前时间
 * @param {Object} nextDate 下一次时间对象
 */
function getNextSencond(now, cronObj, gtFlag, nextDate) {
  const secondSelectedArray = cronObj.secondSelectedArray
  let second = null
  if (!gtFlag) {
    second = now.getSeconds()
  }
  for (let i = 0; i < secondSelectedArray.length; i++) {
    if (gtFlag) {
      nextDate.nextSecond = secondSelectedArray[i]
      const dateTmp = new Date(nextDate.nextYear, nextDate.nextMonth - 1, nextDate.nextDay, nextDate.nextHour,
        nextDate.nextMinute, nextDate.nextSecond)
      return dateTmp
    } else if (!gtFlag && second < secondSelectedArray[i]) {
      nextDate.nextSecond = secondSelectedArray[i]
      const dateTmp = new Date(nextDate.nextYear, nextDate.nextMonth - 1, nextDate.nextDay, nextDate.nextHour,
        nextDate.nextMinute, nextDate.nextSecond)
      return dateTmp
    }
  }
  return null
}

/**
 * 获取cron分割数组
 * @param {Object} indexCron cron子字符串
 * @param {Object} type 类型
 */
function getValueArray(indexCron, type) {
  // console.log(type)
  // 按逗号分割表达式
  const subcrons = indexCron.split(",")
  const subcronArray = []
  for (let i = 0; i < subcrons.length; i++) {
    const ucron = {}
    // 按/进行分割
    const parts = subcrons[i].split("/")
    if (parts.length === 0 || parts.length >= 3) {
      return null
    }
    if (parts.length === 1) {
      ucron.divisor = 1
    } else {
      if (isValidNumber(parts[1]) && parts[1] > 0) {
        ucron.divisor = parts[1]
      } else {
        return null
      }
    }
    // 按-进行分割
    const timeRange = parts[0].split("-")
    if (timeRange.length === 1 && timeRange[0] === "*") {
      ucron.min = getMinValue(type)
      ucron.max = getMaxValue(type)
    } else if (timeRange.length === 1 && timeRange[0] === "?" && (type === "day" || type === "week")) { // 只能天和周配置问号
      ucron.min = null // 只有问号时min值才会为空
      ucron.max = null
    } else if (timeRange.length === 1 && isValidNumber(timeRange[0]) && parts.length === 1) {
      ucron.min = timeRange[0]
      ucron.max = timeRange[0]
    } else if (timeRange.length === 1 && isValidNumber(timeRange[0]) && parts.length === 2) {
      ucron.min = timeRange[0]
      ucron.max = getMaxValue(type)
    } else if (timeRange.length === 2 && isValidNumber(timeRange[0]) && isValidNumber(timeRange[1])) {
      ucron.min = timeRange[0]
      ucron.max = timeRange[1]
    } else {
      return null
    }
    subcronArray[i] = ucron
  }
  if (type === "day" || type === "week" || type === "year") {
    return subcronArray
  } else {
    return getSelectedValue(subcronArray, type)
  }
}
/**
 * 获取符合要求数据
 * @param {Object} subcronArray cron子表达式数组
 * @param {Object} type 类型
 */
function getSelectedValue(subcronArray, type) {
  const min = getMinValue(type)
  const max = getMaxValue(type)
  const selectedArray = []
  let j = 0
  for (let i = min; i <= max; i++) {
    if (isValidValue(subcronArray, i)) {
      selectedArray[j] = i
      j++
    }
  }
  return selectedArray
}

/**
 * 是否是有效的数据
 * @param {Object} subcronArray cron子表达式数组
 * @param {Object} value 类型
 */
function isValidValue(subcronArray, value) {
  for (let i = 0; i < subcronArray.length; i++) {
    const ucron = subcronArray[i]
    const min = ucron.min
    const max = ucron.max
    const divisor = ucron.divisor
    if (min != null && value >= min && (max === null || value <= max) && (value - min) % divisor === 0) {
      return true
    }
  }
  return false
}

/**
 * 是否忽略该项
 * @param {Object} subcronArray cron子表达式数组
 */
function isIgnore(subcronArray) {
  for (let i = 0; i < subcronArray.length; i++) {
    const ucron = subcronArray[i]
    const min = ucron.min
    if (min === null) {
      return true
    }
  }
  return false
}

/**
 * 获取当月天数
 * @param {Object} year 年份
 * @param {Object} month 月份
 */
function getMonthDays(year, month) {
  const d = new Date(year, month, 0)
  return d.getDate()
}
/**
 * 根据类型获取最小值
 * @param {Object} type 类型
 */
function getMinValue(type) {
  if (type === "second" || type === "minute" || type === "hour" || type === "week") { // 秒分时周
    return 0
  }
  if (type === "day" || type === "month") { // 天月
    return 1
  }
  return 1970 // 年
}
/**
 * 根据类型获取最大值
 * @param {Object} type 类型
 */
function getMaxValue(type) {
  if (type === "second" || type === "minute") { // 秒分
    return 59
  }
  if (type === "hour") { // 时
    return 23
  }
  if (type === "day") { // 天
    return 31
  }
  if (type === "month") { // 月
    return 12
  }
  if (type === "week") { // 周
    return 6
  }
  return null // 年
}
/**
 * 判断是否为有效数字
 * @param {Object} str 字符串
 */
function isValidNumber(str) {
  if (/^\d+$/.test(str)) {
    return true
  } else {
    return false
  }
}

export {
  getUpTime
}
