// 为Date类 添加时间格式化原型方法 便于书写
function formatDates(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    const o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
    }
    for (const k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            const str = o[k] + ""
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt
}
function padLeftZero(str) {
    return ("00" + str).substr(str.length)
}

class Time {
  
  // 世界时间转本地时间
  toTimeZone(time, offset = 8, format = "yyyy/MM/dd hh:mm:ss") {
    time = time.split("")
    const newTime = time[0] + time[1] + time[2] + time[3] + "/" + time[4] + time[5] + "/" + time[6] + time[7] +
      " " + time[8] + time[9] + ":" + time[10] + time[11] + ":" + time[12] + time[13]
    const localTime = new Date(newTime).getTime()
    const wishTime = localTime + (3600000 * offset)
    return formatDates(new Date(wishTime), format)
  }
  // 本地时间转世界时间
  
  toTimeWorld(date, offset = -8) {
    const localTime = new Date(date).getTime()
    const wishTime = localTime + (3600000 * offset)
    return formatDates(new Date(wishTime), "yyyyMMddhhmmss")
  }
  
  // 本地当前时间根据（天、时、分（分钟间隔））转据当前时间最近的世界时间点
  dateToTimeWorldBy(date, dateType = 1, dateStep = 0, offset = -8, format = "yyyy/MM/dd hh:mm") {
    const year = date.getFullYear()
    let month, day, hour, minute
    let temDate
    const localTime = date.getTime()
    // 1-> 天 2->小时 3->分钟
    switch (dateType) {
      case 0:
      case 1:
        return formatDates(new Date(localTime + (86400000 * dateStep) + (3600000 * offset)), format)
      case 2:
        return formatDates(new Date(localTime + (3600000 * dateStep) + (3600000 * offset)), format)
      case 3:
        console.info(date, localTime, 60000 * dateStep, 3600000 * offset)
        return formatDates(new Date(localTime + (60000 * dateStep) + (3600000 * offset)), format)
      default:
        return formatDates(new Date(localTime + (60000 * dateStep) + (3600000 * offset)), format)
    }
  }
  
  // 本地当前时间根据（天、时、分（分钟间隔））转据当前时间最近的世界时间点
  dateToLatelyMinTime (date, dateStep = 1) {
    const year = date.getFullYear()
    let month = 0
    let day = 0
    let hour = 0
    let minute = 0
    date.setMinutes(Math.floor(date.getMinutes() / dateStep) * dateStep)
    month = date.getMonth() + 1
    day = date.getDate()
    hour = date.getHours()
    minute = date.getMinutes()
    return new Date(`${year}/${month}/${day} ${hour}:${minute}:00`)
  }
  
  // 指定据当前的前N天或后N天
  getAppointDateStr(date, AddDayCount, format = "yyyy/MM/dd") {
    const localTime = date.getTime()
    const wishTime = localTime + (24 * 3600000 * AddDayCount)
    return formatDates(new Date(wishTime), format)
  }
  
  // 指定据当前的前N小时或后N小时
  getAppointHourStr(date, AddHourCount, format = "yyyy/MM/dd hh:mm") {
    const localTime = date.getTime()
    const wishTime = localTime + (3600000 * AddHourCount)
    return formatDates(new Date(wishTime), format)
  }
  
  // 指定据当前的前N分钟或后N分钟
  getAppointMinStr(date, AddMinCount, format = "yyyy/MM/dd hh:mm") {
    const localTime = date.getTime()
    const wishTime = localTime + (60000 * AddMinCount)
    return formatDates(new Date(wishTime), format)
  }
  
  // 指定据当前的前N月或后N月
  getAppointMonStr(date, AddMonCount, format = "yyyy/MM/dd hh:mm") {
    const localTime = new Date(date.valueOf())
    localTime.setMonth(localTime.getMonth() + AddMonCount)
    return formatDates(new Date(localTime), format)
  }
  
  // 指定据当前的前N年或后N年
  getAppointYearStr(date, AddYearCount, format = "yyyy/MM/dd hh:mm") {
    const localTime = new Date(date.valueOf())
    localTime.setFullYear(localTime.getFullYear() + AddYearCount)
    return localTime.Format(format)
  }
  
  /**
   * [dateClone 克隆时间对象]
   * @param  {[type]} time [时间对象]
   * @return {[type]}      [克隆的时间对象]
   */
  dateClone(time) {
    return new Date(time.valueOf())
  }
  
  /**
   * [calculatinTimeDifference 计算时间差]
   * @param  {[type]} start [开始时间]
   * @param  {[type]} end   [结束时间]
   * @param  {[type]} type  [计算时间差的类型【1：天， 2：小时 3：分钟 4：秒】]
   * @return {[type]}       [时间差]
   */
  calculatinTimeDifference(start, end, type) {
    const Millisecond = end.getTime() - start.getTime()
    let timeDifference = 0
    switch (type) {
      case 1:
        timeDifference = Math.floor(Millisecond / (24 * 3600 * 1000))
        break
      case 2:
        timeDifference = Math.floor(Millisecond / (24 * 3600 * 1000)) * 24 + Math.floor(Millisecond % (24 * 3600 * 1000) / (3600 *
          1000))
        break
      case 3:
        break
      default:
    }
    return timeDifference
  }

  /**
   * [getCountDays 获取一个月的天数]
   * @return {[type]} [一个月的天数]
   */
  getCountDays() {
    const curDate = new Date()
    const curMonth = curDate.getMonth()
    curDate.setMonth(curMonth + 1)
    curDate.setDate(0)
    return curDate.getDate()
  }

  /**
   * [secondConversion 秒转换为天，小时，分钟]
   * @param  {Number} [second=0] [秒]
   * @return {[type]}             [转换后的时间字符串]
   */
  secondConversion(second = 0) {
    let newtime = ""
    const d = Math.floor(second / (3600 * 24))
    const h = Math.floor((second % (3600 * 24)) / 3600)
    const m = Math.floor(((second % (3600 * 24)) % 3600) / 60)
    if (d > 0) {
      if (h === 0 && m === 0) {
        newtime = d + "天"
      } else {
        newtime = d + "天" + h + "小时" + m + "分"
      }
    } else {
      if (h !== 0) {
        if (m === 0) {
          newtime = h + "小时"
        } else {
          newtime = h + "小时" + m + "分"
        }
      } else {
        newtime = m + "分"
      }
    }
    return newtime
  }
}
const time = new Time()

export {
  time
}
