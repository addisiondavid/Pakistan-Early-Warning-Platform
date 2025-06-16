import * as mars3d from "mars3d"
import axios from "axios"

export let map // mars3d.Map三维地图对象
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）

// 叠加的图层
const uptileLayer = []

export let stationLayer // 矢量图层对象
// 事件对象，用于抛出事件给面板
export const eventTarget = new mars3d.BaseClass()

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
console.log("onMounted执行了")
  map = mapInstance // 记录首次创建的map
  
  eventTarget.fire("init", {
    value: 10
  })
 // 创建矢量数据图层
  stationLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(stationLayer)
  // 时钟控制（可替代cesium本身的animation）
  const clockAnimate = new mars3d.control.ClockAnimate({
    format: "MM/dd HH:mm"
  })
  map.addControl(clockAnimate)

  clockAnimate.on(mars3d.EventType.change, function (event) {
    if (event.targetType === "label") {
      console.log("单击了时间文本区域", event)
      const startTime = Cesium.JulianDate.toDate(map.clock.startTime)
      const stopTime = Cesium.JulianDate.toDate(map.clock.stopTime)
      const currentTime = Cesium.JulianDate.toDate(map.clock.currentTime)
      eventTarget.fire("clickShowClockAnimate", { startTime, stopTime, currentTime })
    }
  })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  console.log("onUnmounted执行了")
  map = null
}
export function showSateXyzLayer(ele, time) {
  let tilingScheme
  if (ele.dataCode === "fy-4a") {
    tilingScheme = Cesium.Rectangle.fromDegrees(-111.3, -72, 176.7, 72)
  } else if (ele.dataCode === "fy-2h") {
    tilingScheme = Cesium.Rectangle.fromDegrees(-142, -72, 154, 72)
  }
  const tileLayer = new mars3d.layer.XyzLayer({
    id: time,
    name: time,
    url: "http://10.0.65.135/swapQuery/public/tileServer/getTile/{dataCode}/prj_gll/{element}/{time}/jpg/{z}/{y}/{Timex}.png",
    tilingScheme: new Cesium.GeographicTilingScheme({
      rectangle: tilingScheme
    }),
    customTags: {
      Timex: function (imageryProvider, x, y, level) {
        const pow = Math.pow(2, level)
        if (x > pow) {
          x = x - pow
        } else {
          x = pow - x
        }
        return x
      },
      element: function() {
        return ele.element
      },
      time: function() {
        return time
      },
      dataCode: function() {
        return ele.dataCode
      }
    },
    rectangle: {
        xmin: 53,
        xmax: 85,
        ymin: 22,
        ymax: 39
    },
    zIndex: 3,
    minimumLevel: 3,
    maximumLevel: 3,
    opacity: 0.8
  })
  map.addLayer(tileLayer)
  if (uptileLayer.length > 3) {
    removeTileLayer(uptileLayer[0])
    uptileLayer.shift()
  }
  uptileLayer.push(tileLayer)
}

export function clearLayer() {
  removeTileLayer(uptileLayer[0])
  uptileLayer.shift()
  removeTileLayer(uptileLayer[0])
  uptileLayer.shift()
  removeTileLayer(uptileLayer[0])
  uptileLayer.shift()
}

export function removeTileLayer(tileLayer) {
  if (tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
}
export function setClockAnimateTime(startTimes, stopTimes) {
  console.info(startTimes, stopTimes)
  const startTime = Cesium.JulianDate.fromDate(new Date(startTimes))
  const stopTime = Cesium.JulianDate.fromDate(new Date(stopTimes))
  console.info(startTime, stopTime)
  if (map.controls.timeline) {
    map.controls.timeline.zoomTo(startTime, stopTime)
    map.clock.multiplier = 3000
    map.clock.currentTime = startTime
  }
}

export function setCurrentTime(currentTime) {
  map.clock.currentTime = Cesium.JulianDate.fromDate(new Date(currentTime))
}



export function showStation(ele, time, legend) {
  const url = "data/" + ele.dataCode + "/" + ele.element + "-" + time + ".json"
  mars3d.Util.fetchJson({ url: url })
    .then(function (result) {
    stationLayer.clear()
    console.info(result)
    const currentData = result.data
    const element = ele.element
    console.log("加载数据", currentData)

    for (let i = currentData.length - 1; i >= 0; i--) {
      const item = currentData[i]
      const graphic = new mars3d.graphic.BillboardPrimitive({
        id: item.Station_Id_C,
        name: item.Station_Name,
        position: [item.Lon, item.Lat],
        style: {
          image: mars3d.Util.getCircleImage(item[element], {
            color: getColor(legend.value, item[element]),
            radius: 25
          }),
          scale: 1,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.CENTER,
          scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 900000, 0.3)
        },
        attr: item
      })
      stationLayer.addGraphic(graphic)
    }
  })
}

function getColor(legend, value) {
  const val = Math.round(value, 1)
  for (const i in legend) {
    if (value >= legend[i].start & value < legend[i].end) {
      return legend[i].color
    }
  }
}
