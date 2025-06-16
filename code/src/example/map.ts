/**
 * 图层管理
 * @copyright 火星科技 mars3d.cn
 * @author 火星吴彦祖 2022-01-10
 */
import * as mars3d from "mars3d"
const Cesium = mars3d.Cesium

let map: mars3d.Map // 地图对象
let graphicLayer // 矢量图层对象
/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance: mars3d.Map) {
  map = mapInstance // 记录首次创建的map

  // 时钟控制（可替代cesium本身的animation）
  const clockAnimate = new mars3d.control.ClockAnimate({
    format: "MM/dd HH:mm"
  })
  map.addControl(clockAnimate)

  clockAnimate.on(mars3d.EventType.click, function (event) {
    if (event.targetType === "label") {
      console.log("单击了时间文本区域", event)
      const startTime = Cesium.JulianDate.toDate(map.clock.startTime)
      const stopTime = Cesium.JulianDate.toDate(map.clock.stopTime)
      const currentTime = Cesium.JulianDate.toDate(map.clock.currentTime)
      showClockAnimate.value = !showClockAnimate.value
      nowTimeScope.value = [dayjs(startTime), dayjs(stopTime)]
      currrentTime.value = dayjs(currentTime)
    }
  })

}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = mapInstance // 记录map

}


