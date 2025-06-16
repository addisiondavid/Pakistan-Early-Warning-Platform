
export let map // mars3d.Map三维地图对象
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
/**
 * 构造bloom效果对象
 * @type {mars3d.BloomEffect}
 */
let bloomEffect

// 站点数据图层
export let stationLayer 
// 地图绘制数值显示
export let valueBarbLayer
// 图片图层
export let imgLayer
// 灰度图图层
export let grayLayer
// 辅助描述信息图层
export let infoLayer 
// 风羽图图层
export let windBarbLayer
// 卫星影响
const satetileLayer = []
const imageLayer = []
let mapSplit
let mapEx
const baseUrl = "http://localhost:90"


// 事件对象，用于抛出事件给面板
export const eventTarget = new mars3d.BaseClass()
export const mapOptions = function (option) {
  option.terrain = {
    url: "http://data.mars3d.cn/terrain",
    show: true
  }
  option.control = {
    homeButton: true,
    baseLayerPicker: true,
    sceneModePicker: true,
    vrButton: false,
    fullscreenButton: true,
    navigationHelpButton: false,
    animation: false,
    timeline: false,
    infoBox: true,
    geocoder: false,
    clockAnimate: false,
    selectionIndicator: true,
    contextmenu: {
      hasDefault: true
    },
    mouseDownView: true,
    zoom: {
      insertIndex: 1
    },
    compass: { top: "80px", left: "300px" },
    distanceLegend: {
      left: "20px",
      bottom: "5px"
    },
    locationBar: {
      fps: false,
      style: {
        bottom: "20px",
        left: "20px"
      },
      crs: "CGCS2000_GK_Zone_3",
      crsDecimal: 0,
      template: "<div>Lng:{lng}</div> <div>Lat:{lat}</div> <div>Alt：{alt}米</div>"
    }
  }
  return option
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  console.log("onMounted执行了")
  map = mapInstance // 记录首次创建的map
  map.toolbar.style = "top: auto;bottom: 100px;right: auto;left: 290px"
  // 构造bloom效果 用于滑动条测试
  // bloomEffect = new mars3d.effect.BloomEffect()
  map.addEffect(bloomEffect)

  infoLayer = new mars3d.layer.GraphicLayer({
    // isRestorePositions: true,
    name: "TextInfo",
    layerType: "base"
  })
  map.addLayer(infoLayer)
  eventTarget.fire("init", {
    value: 10
  })

}

export function viewToActually() {
  const mapDom1 = document.getElementById("centerDiv3D")
  const mapDom2 = document.getElementById("centerDiv02")
  mapDom2.style.display = "none"
  mapDom1.style.display = "block"
  mapDom1.style.left = "0"
  mapDom1.style.width = "100%"
  map.flyToExtent({ xmin: 53, xmax: 85, ymin: 22, ymax: 39 })
}

export function viewToForecast() {
  const mapDom1 = document.getElementById("centerDiv3D")
  const mapDom2 = document.getElementById("centerDiv02")
  mapSplit.setOptions({ className: "mars3d-container mars3d-mapCompare1" })
  mapDom1.style.display = "none"
  mapDom2.style.width = "100%"
  mapDom2.style.height = "100%"
  mapDom2.style.left = "0"
  mapDom2.style.display = "block"
  map.flyToExtent({ xmin: 53, xmax: 85, ymin: 22, ymax: 39 })

}

export function setCurrentTime(currentTime) {
  map.clock.currentTime = Cesium.JulianDate.fromDate(new Date(currentTime))
}

export function setClockAnimateTime(startTimes, stopTimes) {
  const startTime = Cesium.JulianDate.fromDate(new Date(startTimes))
  const stopTime = Cesium.JulianDate.fromDate(new Date(stopTimes))

  if (map.controls.timeline) {
    map.controls.timeline.zoomTo(startTime, stopTime)
  }
}

export function viewToSynthesize() {
  
  map.toolbar.style = "top: auto;bottom: 100px;right: auto;left: 10px"
  const mapDom1 = document.getElementById("centerDiv3D")
  mapDom1.style.width = "57%"
  mapDom1.style.height = "100%"
  mapDom1.style.left = "0%"
  
  const mapDom2 = mars3d.DomUtil.create("div", "", document.body)
  mapDom2.setAttribute("id", "centerDiv02")
  mapDom2.style.width = "50%"
  mapDom2.style.height = "100%"
  mapDom2.style.left = "0%"
  mapDom2.style.display = "block"
  const mapOptions2 = map.getCurrentOptions() // map.getOptions()
  mapOptions2.control = false
  mapSplit = new mars3d.control.MapCompare({
    ...mapOptions2,
    parentContainer: mapDom2
  })
  map.addControl(mapSplit)
  mapEx = mapSplit.mapEx
  map.flyToExtent({ xmin: 58, xmax: 80, ymin: 22.00, ymax: 39 })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  console.log("onUnmounted执行了")
  map.graphicLayer.clear()
  map.removeEffect(bloomEffect, true)
  bloomEffect = null
  map = null
}

export function clearLayer(layerId) {
  const layer = map.getLayerById(layerId)
  map.removeLayer(layer)
  const layers = map.getLayers()
  const arr = []
  for (const key in layers) {
    arr.push(layers[key].id)
  }
  console.info(arr)
}
const layers = []


const formatDate = (oldDate, format = "yyyy-MM-dd HH:mm:ss") => {
  const date = new Date(oldDate)
  const config = {
    yyyy: date.getFullYear(),
    M: date.getMonth() + 1,
    MM: formatNum(date.getMonth() + 1),
    W: date.getDay(),
    WW: formatNum(date.getDay()),
    d: date.getDate(),
    dd: formatNum(date.getDate()),
    H: date.getHours(),
    HH: formatNum(date.getHours()),
    h: date.getHours() > 12 ? (date.getHours() - 12) : date.getHours(),
    hh: formatNum(date.getHours()) > 12 ? (formatNum(date.getHours()) - 12) : formatNum(date.getHours()),
    m: date.getMinutes(),
    mm: formatNum(date.getMinutes()),
    s: date.getSeconds(),
    ss: formatNum(date.getSeconds()),
    A: date.getHours() < 12 ? "AM" : "PM",
    a: date.getHours() < 12 ? "am" : "pm"
  }
  const formatConfigs = format.match(/[a-zA-Z]+/g)
  formatConfigs.forEach(item => {
    format = format.replace(item, config[item])
  })
  return format
}

function formatNum(num) {
  return num < 10 ? `0${num}` : num
}


export function removeLayer(layers) {
  for (let layer in layers) {
    map.removeLayer(layers[layer], true)
    layer = null
  }
}


export function showImage(ele, time) {
  const url = baseUrl + "/pmd_data/" + ele.dataCode + "/" + ele.element + "/" + time + ".png"

  const tileLayer = new mars3d.layer.ImageLayer({
    id: ele.id,
    pid: "dataLayer",
    name: time,
    url: url,
    rectangle: { xmin: 50, xmax: 80, ymin: 20, ymax: 40 },
    opacity: 0.8,
    show: true
  })
  map.addLayer(tileLayer)
  if (imageLayer.length > 3) {
    removeTileLayer(imageLayer[0])
    imageLayer[0].alpha = 0.3
    imageLayer[2].alpha = 0.6
    imageLayer.shift()
  }
  imageLayer.push(tileLayer)
}

export function addUVBarb(ele, time, valid, level, legend) {
  if (windBarbLayer) {
    windBarbLayer.remove()
  }
  windBarbLayer = new mars3d.layer.GraphicLayer({
      id: ele.id,
      pid: "dataLayer",
      name: ele.subtitle
      // name: formatDate(new Date("2023/03/02 00:00:00"), "MM/dd HH:mm")
  })
  map.addLayer(windBarbLayer)
  bindWindLayerPopup()
  let curLevel = map.level
  const extent = map.getExtent()
  const elements = ele.element.split(",")
  let gridD = []
  let gridS = []
  let gridOptions = {}
  let arrData = []
  mars3d.Util.fetchJson({ url: baseUrl + "/pmd_data/" + ele.dataCode + "/" + elements[0] + "/" + ele.dataCode + "_" + time + "_" + valid + "_" + elements[0] + "_" + level + ".json" })
    .then(function (resultD) {
    mars3d.Util.fetchJson({ url: baseUrl + "/pmd_data/" + ele.dataCode + "/" + elements[1] + "/" + ele.dataCode + "_" + time + "_" + valid + "_" + elements[1] + "_" + level + ".json" })
      .then(function (resultS) {
      gridOptions = resultD.gridOptions
      gridD = resultD.data
      gridS = resultS.data
      const data_interval = 9 - map.level
      for (let i = 0, len = gridS.length; i < len; i = i + data_interval) {
        for (let j = 0, len = gridS[i].length; j < len; j = j + data_interval) {
          const value_D = (gridD[i][j]).toFixed(1)
          const value_S = (gridS[i][j]).toFixed(1)
          const x = extent.xmin + j * 0.25
          const y = extent.ymin + i * 0.25
          if (x > extent.xmin & x < extent.xmax & y > extent.ymin & y < extent.ymax) {
            arrData.push({
              position: Cesium.Cartesian3.fromDegrees(x, y, 1000),
              style: {
                angle: value_D, // 方向
                image: getImageBySpeed(value_S, "white"), // 速度 ，使用不同图片
                width: 30, // 单位：像素
                height: 60,
                color: "#ffffff"
              }
            })
          }
        }
      }
      windBarbLayer.addGraphic(new mars3d.graphic.FlatBillboard({
          instances: arrData
      }))
      eventTarget.fire("addTableData", { windBarbLayer })
    })
    
  })
  map.on("cameraChanged", function (event) {
    console.info("qinayr====")
    windBarbLayer.clear()
    if (map.level !== curLevel || extent !== map.getExtent()) {
      curLevel = map.level
      // const level = 2
      const data_interval = 9 - map.level
      for (let i = 0, len = gridS.length; i < len; i = i + data_interval) {
        for (let j = 0, len = gridS[i].length; j < len; j = j + data_interval) {
          const value_D = (gridD[i][j]).toFixed(1)
          const value_S = (gridS[i][j]).toFixed(1)
          const x = extent.xmin + j * 0.25
          const y = extent.ymin + i * 0.25
          if (x > extent.xmin & x < extent.xmax & y > extent.ymin & y < extent.ymax) {
            arrData.push({
              position: Cesium.Cartesian3.fromDegrees(x, y, 1000),
              style: {
                angle: value_D, // 方向
                image: getImageBySpeed(value_S, "white"), // 速度 ，使用不同图片
                width: 30, // 单位：像素
                height: 60,
                color: "#ffffff"
              }
            })
          }
        }
      }
      windBarbLayer.addGraphic(new mars3d.graphic.FlatBillboard({
          instances: arrData
      }))
    }
  })
}


// 在图层绑定Popup弹窗
export function bindWindLayerPopup() {
  windBarbLayer.bindPopup(function (event) {
    const attr = event.graphic.attr || {}
    return mars3d.Util.getTemplateHtml({ title: "Wind Data", template: "all", attr: attr })
  })
}

function getImageBySpeed(speed, color) {
  let windVaneUrl = "img/windVane/" + color + "/01.svg"
  if (speed >= 0 && speed <= 2) {
    windVaneUrl = "img/windVane/" + color + "/01.svg"
  } else if (speed > 2 && speed <= 4) {
    windVaneUrl = "img/windVane/" + color + "/02.svg"
  } else if (speed > 4 && speed <= 6) {
    windVaneUrl = "img/windVane/" + color + "/03.svg"
  } else if (speed > 6 && speed <= 8) {
    windVaneUrl = "img/windVane/" + color + "/04.svg"
  } else if (speed > 8 && speed <= 10) {
    windVaneUrl = "img/windVane/" + color + "/05.svg"
  } else if (speed > 10 && speed <= 12) {
    windVaneUrl = "img/windVane/" + color + "/06.svg"
  } else if (speed > 12 && speed <= 14) {
    windVaneUrl = "img/windVane/" + color + "/07.svg"
  } else if (speed > 14 && speed <= 16) {
    windVaneUrl = "img/windVane/" + color + "/08.svg"
  } else if (speed > 16 && speed <= 18) {
    windVaneUrl = "img/windVane/" + color + "/09.svg"
  } else if (speed > 18 && speed <= 20) {
    windVaneUrl = "img/windVane/" + color + "/10.svg"
  } else if (speed > 20 && speed <= 22) {
    windVaneUrl = "img/windVane/" + color + "/11.svg"
  } else if (speed > 22 && speed <= 24) {
    windVaneUrl = "img/windVane/" + color + "/12.svg"
  } else if (speed > 24 && speed <= 26) {
    windVaneUrl = "img/windVane/" + color + "/13.svg"
  } else if (speed > 26 && speed <= 28) {
    windVaneUrl = "img/windVane/" + color + "/14.svg"
  } else if (speed > 28 && speed <= 30) {
    windVaneUrl = "img/windVane/" + color + "/15.svg"
  } else if (speed > 30 && speed <= 32) {
    windVaneUrl = "img/windVane/" + color + "/16.svg"
  } else if (speed > 32 && speed <= 34) {
    windVaneUrl = "img/windVane/" + color + "/17.svg"
  } else if (speed > 34 && speed <= 36) {
    windVaneUrl = "img/windVane/" + color + "/18.svg"
  } else if (speed > 36 && speed <= 38) {
    windVaneUrl = "img/windVane/" + color + "/19.svg"
  } else if (speed > 38 && speed <= 40) {
    windVaneUrl = "img/windVane/" + color + "/20.svg"
  } else if (speed > 40 && speed <= 42) {
    windVaneUrl = "img/windVane/" + color + "/21.svg"
  } else if (speed > 42 && speed <= 44) {
    windVaneUrl = "img/windVane/" + color + "/22.svg"
  } else if (speed > 44 && speed <= 46) {
    windVaneUrl = "img/windVane/" + color + "/23.svg"
  } else if (speed > 46 && speed <= 48) {
    windVaneUrl = "img/windVane/" + color + "/24.svg"
  } else if (speed > 48 && speed <= 50) {
    windVaneUrl = "img/windVane/" + color + "/25.svg"
  } else if (speed > 50 && speed <= 52) {
    windVaneUrl = "img/windVane/" + color + "/26.svg"
  } else if (speed > 52 && speed <= 54) {
    windVaneUrl = "img/windVane/" + color + "/27.svg"
  } else if (speed > 54 && speed <= 56) {
    windVaneUrl = "img/windVane/" + color + "/28.svg"
  } else if (speed > 56) {
    windVaneUrl = "img/windVane/" + color + "/29.svg"
  }
  return windVaneUrl
}


let windLineLayer
export function addUVLine(ele, time, valid, level, legend) {
  windLineLayer = map.getLayerById(ele.id)
  if (windLineLayer) {
    map.removeLayer(windLineLayer, true)
    windLineLayer.destroy()
  }
  windLineLayer = new mars3d.layer.CanvasWindLayer({
      id: ele.id,
      name: ele.title + " color",
      worker: window.currentPath + "windWorker.js", // 启用多线程模式，注释后是单线程模式(非必须)
      color: "#ffffff", // 颜色
      frameRate: 10, // 每秒刷新次数
      speedRate: 50, // 风前进速率
      particlesNumber: 3000,
      maxAge: 120,
      lineWidth: 2
    })
  map.addLayer(windLineLayer)
  const extent = map.getExtent()
  const elements = ele.element.split(",")
  let arr_U = []
  let arr_V = []
  mars3d.Util.fetchJson({ url: baseUrl + "/pmd_data/" + ele.dataCode + "/" + elements[0] + "/" + ele.dataCode + "_" + time + "_" + valid + "_" + elements[0] + "_" + level + ".json" })
    .then(function (resultU) {
    mars3d.Util.fetchJson({ url: baseUrl + "/pmd_data/" + ele.dataCode + "/" + elements[1] + "/" + ele.dataCode + "_" + time + "_" + valid + "_" + elements[1] + "_" + level + ".json" })
      .then(function (resultV) {
      const gridOptions = resultU.gridOptions
      const gridU = resultU.data
      const gridV = resultV.data
      const data = {}
      data.cols = gridOptions.xSize
      data.rows = gridOptions.ySize
      data.xmin = gridOptions.xStart
      data.ymin = gridOptions.yStart
      data.xmax = gridOptions.xEnd
      data.ymax = gridOptions.yEnd
      for (let i = 0, len = gridU.length; i < len; i = i + 1) {
        arr_U = arr_U.concat(gridU[i])
        arr_V = arr_V.concat(gridV[i])
      }
      data.udata = arr_U.concat()
      data.vdata = arr_V.concat()
      arr_U.sort()
      arr_V.sort()
      data.umin = arr_U[0]
      data.umax = arr_U[arr_U.length - 1]
      data.vmin = arr_V[1]
      data.vmax = arr_V[arr_V.length - 1]
      // windLineLayer.setData(data)
      windLineLayer.data = data
      eventTarget.fire("addTableData", { valueBarbLayer })
    })
    
  })
}


// 加载并解析NC数据
function loadNetCDF(filePath) {
  return new Promise(function (resolve) {
    const request = new XMLHttpRequest()
    request.open("GET", filePath)
    request.responseType = "arraybuffer"

    request.onload = function () {
      const arrayToMap = function (array) {
        return array.reduce(function (map, object) {
          map[object.name] = object
          return map
        }, {})
      }

      // eslint-disable-next-line new-cap
      const NetCDF = new netcdfjs(request.response)
      const variables = arrayToMap(NetCDF.variables)
      const uAttributes = arrayToMap(variables.U.attributes)
      const vAttributes = arrayToMap(variables.V.attributes)

      const arrLon = NetCDF.getDataVariable("lon").flat()
      const arrLat = NetCDF.getDataVariable("lat").flat()
      const arrU = NetCDF.getDataVariable("U").flat()
      const maxU = uAttributes.max.value
      const minU = uAttributes.min.value
      const arrV = NetCDF.getDataVariable("V").flat()
      const maxV = vAttributes.max.value
      const minV = vAttributes.min.value

      // 构造WindLayer类需要的格式数据
      const result = {
        xmin: Math.min(...arrLon),
        xmax: Math.max(...arrLon),
        ymin: Math.min(...arrLat),
        ymax: Math.max(...arrLat),
        rows: arrLat.length,
        cols: arrLon.length,
        udata: arrU, // 横向风速
        vdata: arrV, // 纵向风速
        umin: minU,
        umax: maxU,
        vmin: minV,
        vmax: maxV
      }
      resolve(result)
    }
    request.send()
  })
}


export function addDataValue(ele, time, valid, level, legend) {
  if (valueBarbLayer) {
    map.removeLayer(valueBarbLayer)
  }
  if ("defaultLevel" in ele) {
    level = ele.defaultLevel
  }
  valueBarbLayer = new mars3d.layer.GraphicLayer({
      id: ele.id,
      pid: "dataLayer",
      name: ele.title + " Data Value",
      zIndex: 500
      // name: formatDate(new Date("2023/03/02 00:00:00"), "MM/dd HH:mm")
  })
  map.addLayer(valueBarbLayer)
  valueLayerPopup()
  let resultData = []
  let curLevel = map.level
  const extent = map.getExtent()
  mars3d.Util.fetchJson({ url: baseUrl + "/pmd_data/" + ele.dataCode + "/" + ele.element + "/" + ele.dataCode + "_" + time + "_" + valid + "_" + ele.element + "_" + level + ".json" })
    .then(function (result) {
      resultData = result
      if (!resultData) {
        return
      }
      const gridOptions = result.gridOptions
      const data = result.data
      const data_interval = 10 - map.level
      // const level = 2
      const arrData = []
      for (let i = 0, len = data.length; i < len; i = i + data_interval) {
        for (let j = 0, len = data[i].length; j < len; j = j + data_interval) {
          const value = (legend.labelFunc(data[i][j])).toFixed(1)
          // const value = (arr[i][j]).toFixed(1)
          const x = gridOptions.xStart + j * gridOptions.xDelta
          const y = gridOptions.yStart + i * gridOptions.yDelta
          if (x > gridOptions.xStart & x < gridOptions.xEnd & y > gridOptions.yStart & y < gridOptions.yEnd) {
            arrData.push(new mars3d.graphic.LabelPrimitive({
              position: [x, y],
              style: {
                text: value,
                font_size: 8,
                scale: 1,
                font_family: "楷体",
                color: "#000000",
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
              }
            }))
          }
        }
      }
      valueBarbLayer.addGraphic(arrData)
      eventTarget.fire("addTableData", { valueBarbLayer })
    })
    .catch(function (error) {
      console.log("加载JSON出错", error)
    })

  map.on("cameraChanged", function (event) {
    valueBarbLayer.clear()
    if (map.level !== curLevel || extent !== map.getExtent()) {
      curLevel = map.level
      const gridOptions = resultData.gridOptions
      const data = resultData.data
      const data_interval = 10 - map.level
      // const level = 2
      const arrData = []
      for (let i = 0, len = data.length; i < len; i = i + data_interval) {
        for (let j = 0, len = data[i].length; j < len; j = j + data_interval) {
          const value = (legend.labelFunc(data[i][j])).toFixed(1)
          // const value = (arr[i][j]).toFixed(1)
          const x = gridOptions.xStart + j * gridOptions.xDelta
          const y = gridOptions.yStart + i * gridOptions.yDelta
          if (x > gridOptions.xStart & x < gridOptions.xEnd & y > gridOptions.yStart & y < gridOptions.yEnd) {
            arrData.push(new mars3d.graphic.LabelPrimitive({
              position: [x, y],
              style: {
                text: value,
                font_size: 8,
                scale: 1,
                font_family: "楷体",
                color: "#000000",
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
              }
            }))
          }
        }
      }
      valueBarbLayer.addGraphic(arrData)
    }
  })
}

// 在图层绑定Popup弹窗
export function valueLayerPopup() {
  valueBarbLayer.bindPopup(function (event) {
    const attr = event.graphic.attr || {}
    return mars3d.Util.getTemplateHtml({ title: "矢量图层", template: "all", attr: attr })
  })
}


// 地图绘制数值显示
let isoPolyLayer
export function addIsosurface(ele, time, valid, level, legend, boundaries) {
  mars3d.Util.fetchJson({ url: baseUrl + "/pmd_data/" + ele.dataCode + "/" + ele.element + "/" + ele.dataCode + "_" + time + "_" + valid + "_" + ele.element + "_" + level + ".json" }).then(function (result) {
      const gridOptions = result.gridOptions
      const data = result.data
            const xs = []
            const ys = []
            for (let i = 0; i < gridOptions.xSize; i++) {
              xs.push(gridOptions.xStart + i * gridOptions.xDelta)
            }
            for (let i = 0; i < gridOptions.ySize; i++) {
              ys.push(gridOptions.yStart + i * gridOptions.yDelta)
            }
            const contour = new Contour(data, xs, ys, 999999)
            const breaks = getBreaks(legend, 1)
            const contours = contour.tracingContourLines(breaks)
            // smooth
            smoothLines(contours)
            const polygons = contour.tracingPolygons(contours, breaks)
            const polyFC = isobands(polygons, breaks, legend.value)
            console.info(polyFC)
            isoPolyLayer = map.getLayerById(ele.id)
            if (isoPolyLayer) {
              isoPolyLayer.remove()
            } else {
              console.info(polyFC)
              isoPolyLayer = new mars3d.layer.GeoJsonLayer({
                id: ele.id,
                pid: "dataLayer",
                name: ele.subtitle,
                zIndex: 40,
                data: polyFC
              })
              map.addLayer(isoPolyLayer) 
              isoPolyLayer.setOpacity(0.6)
              isoPolyLayer.zIndexc = 4
            }
    }).catch(function (error) {
      console.log("加载JSON出错", error)
  })
}

function sortArea(a, b) {
  return turf.area(b) - turf.area(a)
}

// 地图绘制数值显示
let isoLineLayer
export function addIsoLine(ele, time, valid, level, legend) {
  mars3d.Util.fetchJson({ url: baseUrl + "/pmd_data/" + ele.dataCode + "/" + ele.element + "/" + ele.dataCode + "_" + time + "_" + valid + "_" + ele.element + "_" + level + ".json" }).then(function (result) {
    const gridOptions = result.gridOptions
    const data = result.data
    const xs = []
    const ys = []
    for (let i = 0; i < gridOptions.xSize; i++) {
      xs.push(gridOptions.xStart + i * gridOptions.xDelta)
    }
    for (let i = 0; i < gridOptions.ySize; i++) {
      ys.push(gridOptions.yStart + i * gridOptions.yDelta)
    }
    for (let j in data) {
      for (let i in data[j]) {
        data[j][i] = legend.labelFunc(Number(data[j][i]))
      }
    }
    
    const contour = new Contour(data, xs, ys, 999999)
    const breaks = getBreaks(legend, 1)
    const contours = contour.tracingContourLines(breaks)
    // smooth
    smoothLines(contours)
    const polygons = contour.tracingPolygons(contours, breaks)
    const lineFC = isolines(contours, legend.value)
    isoLineLayer = map.getLayerById(ele.id)
    if (isoLineLayer) {
      isoLineLayer.remove()
    } else {
      isoLineLayer = new mars3d.layer.GeoJsonLayer({
        id: ele.id,
        pid: "dataLayer",
        name: ele.subtitle,
        zIndex: 40,
        symbol: {
          type: "polyline",
          styleOptions: {
            width: 2,
            outline: true,
            color: "#000000",
            label: {
              text: "{value}",
              font_size: 26,
              color: "#000000",
              font_family: "楷体",
              background: false,
              backgroundColor: "#6743fe",
              backgroundOpacity: 0.8,
              font_weight: "normal",
              font_style: "normal",
              scaleByDistance: true,
              scaleByDistance_far: 20000000,
              scaleByDistance_farValue: 0.1,
              scaleByDistance_near: 1000,
              scaleByDistance_nearValue: 1,
              distanceDisplayCondition: false,
              distanceDisplayCondition_far: 10000,
              distanceDisplayCondition_near: 0,
              visibleDepth: false
            }
          },
          callback: function (attr, styleOpt) {
            const value = attr.value
            return {
              color: getColor(legend.value, value)
            }
          }
        },
        data: lineFC
      })
      console.info(lineFC)
      map.addLayer(isoLineLayer) 
      isoLineLayer.setOpacity(0.6)
      isoLineLayer.zIndexc = 0
    }
    }).catch(function (error) {
      console.log("加载JSON出错", error)
  })
}


function getColor(legend, value) {
  const val = Math.round(value, 1)
  for (const i in legend) {
    if (val > legend[i].start & val <= legend[i].end) {
      return legend[i].color
    }
  }
}

function getIsoBreaks(legend) {
  const breaks = []
  for (let i = legend.min; i < legend.max; i = i + legend.interval) {
    breaks.push(i)
  }
  return breaks
}

function getBreaks(legend, interval) {
  const breaks = [legend.value[0].start]
  for (let i = 0; i < legend.value.length; i = i + interval) {
    breaks.push(legend.value[i].end)
  }
  return breaks
}

export function showGeojson(ele, time, valid, level, legend) {
  console.info(ele, time, valid, level, legend)
  if (ele.defaultLevel) {
    level = ele.defaultLevel
  }
  time = (time + "").substr(2, 9)
  time = "23031602"
  valid = ((valid + 3) + "").padStart(3, "0")
  mars3d.Util.fetchJson({ url: "http://10.1.64.146/mdfs/v1.1/contour/" + ele.dataCode + "/" + level + "/" + time + "." + valid + ".json" }).then(function (geojsonLine) {
    // 进行平滑处理

    const jsonLayer = new mars3d.layer.GeoJsonLayer({
      id: ele.id,
      name: ele.title,
      data: geojsonLine,
      symbol: {
        type: "polylineP",
        styleOptions: {
          width: 2,
          color: "#000000"
        }
      }
    })
    map.addLayer(jsonLayer)
  })
}
export function showStation(ele, time, valid, level, legend) {
  const url = baseUrl + "/pmd_data/" + ele.dataCode + "/" + time + ".json"
 // 创建矢量数据图层
  mars3d.Util.fetchJson({ url: url })
    .then(function (result) {
    stationLayer = map.getLayerById("stationLayer")
    if (stationLayer) {
      stationLayer.clear()
    } else {
      stationLayer = new mars3d.layer.GraphicLayer({
               id: "stationLayer",
               name: ele.title + " color",
               alpha: 0.6
               })
      map.addLayer(stationLayer)
    }
    const currentData = result.data
    const element = ele.element

    for (let i = currentData.length - 1; i >= 0; i--) {
      const item = currentData[i]
      if (item[element] > 999990) {
        continue
      }
      const graphic = new mars3d.graphic.BillboardPrimitive({
        id: item.Station_Id_C,
        name: item.Station_Name,
        position: [item.Lon, item.Lat],
        style: {
          image: mars3d.Util.getCircleImage(legend.labelFunc(Number(item[element]).toFixed(0)), {
            color: getColor(legend.value, item[element]),
            fontColor: "#000",
            radius: 40
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

export function showStationWin(ele, time, legend) {
  const url = baseUrl + "/pmd_data/" + ele.dataCode + "/" + time + ".json"
  mars3d.Util.fetchJson({ url: url })
    .then(function (result) {
    stationLayer = map.getLayerById("stationLayer")
    if (stationLayer) {
      stationLayer.clear()
    } else {
      stationLayer = new mars3d.layer.GraphicLayer({
               id: "stationLayer",
               name: ele.title + " color",
               alpha: 0.6
               })
      map.addLayer(stationLayer)
      bindWinLayerPopup()
    }
    const currentData = result.data
    const elementds = ele.element.split(",")
    const arrData = []
    for (let i = currentData.length - 1; i >= 0; i--) {
      const item = currentData[i]
      if (item[elementds[0]] > legend.max || item[elementds[0]] < legend.min) {
        continue
      }
      if (item[elementds[0]] > 999990) {
        continue
      }
      arrData.push({
        position: Cesium.Cartesian3.fromDegrees(item.Lon, item.Lat, 1000),
        style: {
          angle: 360 - item[elementds[1]], // 方向
          image: getImageBySpeed(item[elementds[0]], "black"), // 速度 ，使用不同图片
          width: 30, // 单位：像素
          height: 60
        },
        attr: item
      })
    }
    stationLayer.addGraphic(new mars3d.graphic.FlatBillboard({
        instances: arrData
    }))
    const element = ele.element
    for (let i = currentData.length - 1; i >= 0; i--) {
      const item = currentData[i]
      if (item[elementds[0]] > 999990) {
        continue
      }
      const graphic = new mars3d.graphic.BillboardPrimitive({
        id: item.Station_Id_C,
        name: item.Station_Name,
        position: [item.Lon, item.Lat],
        style: {
          image: mars3d.Util.getCircleImage(item[elementds[0]], {
            color: getColor(legend.value, item[elementds[0]]),
            fontColor: "#000",
            radius: 40
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

function bindWinLayerPopup() {
  stationLayer.bindPopup(function (event) {
    const item = event.graphic?.attr
    const inthtml = `<table style="width: auto;">
                  <tr>
                    <th scope="col" colspan="2" style="text-align:center;font-size:15px;">${item.Country} - ${item.Station_Name}</th>
                  </tr>
                  <tr>
                    <td><img src='` + baseUrl + `/pmd_data/upper/Tlogp.png' controls autoplay style="width: 650px;" /></td>
                  </tr>
                </table>`
    return inthtml
  })
  // 单击事件
  stationLayer.on(mars3d.EventType.click, function (event) {
    if (map.camera.positionCartographic.height > 90000) {
      const item = event.graphic?.attr
      // map.flyToPoint([item.Lon, item.Lat], {
      //   duration: 3,
      //   complete: function (e) {
      //     // 飞行完成回调方法
      //     // graphic.openPopup()
      //   }
      // })
    }
  })
}

export function showGray(ele, time, valid, level, legend, boundaries) {
  const curLevel = map.level
  if ("defaultLevel" in ele) {
    level = ele.defaultLevel
  }
  const extent = map.getExtent()
  mars3d.Util.fetchJson({ url: baseUrl + "/pmd_data/" + ele.dataCode + "/" + ele.element + "/" + ele.dataCode + "_" + time + "_" + valid + "_" + ele.element + "_" + level + ".json" }).then(function (result) {
    const gridOptions = result.gridOptions
    const grid = result.data
    // const colors = getColorArray(legend)
    const canvas = mars3d.DomUtil.create("canvas")
    canvas.width = gridOptions.xSize
    canvas.height = gridOptions.ySize
    const zlim = [legend.min, legend.max]
    // 3.将得到的格网预测值渲染到canvas画布上
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const n = grid.length
    const m = grid[0].length
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        ctx.fillStyle = getColor(legend.value, grid[i][j])
        ctx.fillRect(j, n - i, 1, 1)
      }
    }
    const image = canvas.toDataURL("image/png")
    grayLayer = map.getLayerById(ele.id)
    if (grayLayer) {
      console.info("grayLayer", "已存在")
      grayLayer.remove()
    }
    grayLayer = new mars3d.layer.ImageLayer({
        id: ele.id,
        name: ele.title + " color",
        url: image,
        rectangle: {
          xmin: gridOptions.xStart,
          xmax: gridOptions.xEnd,
          ymin: gridOptions.yStart,
          ymax: gridOptions.yEnd
        },
        zIndex: 40,
        alpha: 0.6
      })
      map.addLayer(grayLayer)
      grayLayer.addTo(mapEx)
  }).catch(function (error) {
      console.log("加载JSON出错", error)
  })
}
export function addStation(ele, time, valid, level, legend) {
  console.info(ele, time, valid, level, legend)
}


export function drawLabel1(title) {
  const graphic = infoLayer.getGraphicById("titleInfo")
  if (graphic === undefined) {
    infoLayer.addGraphic({
      id: "titleInfo",
      name: title,
      position: [66, 37],
      type: "label",
      style: {
        text: title,
        color: "#0081c2",
        font_size: 40,
        outline: true,
        outlineColor: "#ffffff",
        outlineWidth: 2
      }
    })
  } else {
    graphic.setOptions({
      id: "titleInfo",
      name: title,
      position: [66, 37],
      type: "label",
      style: {
        text: title,
        color: "#0081c2",
        font_size: 40,
        outline: true,
        outlineColor: "#ffffff",
        outlineWidth: 2
      }
    })
  }
}
export function drawLabel2(time) {
  const graphic = infoLayer.getGraphicById("timeInfo")
  if (graphic === undefined) {
    infoLayer.addGraphic({
      id: "timeInfo",
      name: time,
      position: [67, 36],
      type: "label",
      style: {
        text: time + "(UTC)",
        color: "#0081c2",
        font_size: 20,
        outline: true,
        outlineColor: "#ffffff",
        outlineWidth: 2
      }
    })  
  } else {
    graphic.setOptions({
      id: "timeInfo",
      name: time,
      position: [67, 36],
      type: "label",
      style: {
        text: time + "(UTC)",
        color: "#0081c2",
        font_size: 20,
        outline: true,
        outlineColor: "#ffffff",
        outlineWidth: 2
      }
    })
  }
  
}

export function drawLogo() {
  infoLayer.startDraw({
    position: [63, 35],
    type: "billboard",
    style: {
      image: "img/logo/pmd.png",
      scale: 0.5,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      label: {
        font_size: 26,
        color: "#ffffff",
        outline: true,
        outlineColor: "#000000",
        pixelOffsetY: -60
      }
    }
  })
}
export function showSateXyzLayer(ele, time) {
  let tilingScheme
  if (ele.dataCode === "fy-4a") {
    tilingScheme = Cesium.Rectangle.fromDegrees(-111.3, -72, 176.7, 72)
  } else if (ele.dataCode === "fy-2h") {
    tilingScheme = Cesium.Rectangle.fromDegrees(-142, -72, 154, 72)
  }

  const tileLayer = new mars3d.layer.XyzLayer({
    id: "SateXyzLayer",
    name: ele.subtitle + "(" + time + ")",
    // url: "http://rsapp.nsmc.org.cn/swapQuery/public/tileServer/getTile/{dataCode}/prj_gll/{element}/{time}/jpg/{z}/{y}/{Timex}.png",
    url: baseUrl + "/pmd_data/{dataCode}/prj_gll/{element}/{time}/{z}/{y}/{Timex}.png",
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
        xmin: 0,
        xmax: 165,
        ymin: 0,
        ymax: 69
    },
    zIndex: 100,
    minimumLevel: 3,
    maximumLevel: 5,
    opacity: 0.8
  })
  map.addLayer(tileLayer)
  if (satetileLayer.length > 3) {
    removeTileLayer(satetileLayer[0])
    satetileLayer.shift()
  }
  satetileLayer.push(tileLayer)
}

export function clearSateTitleLayer() {
  removeTileLayer(satetileLayer[0])
  satetileLayer.shift()
  removeTileLayer(satetileLayer[0])
  satetileLayer.shift()
  removeTileLayer(satetileLayer[0])
  satetileLayer.shift()
}

export function clearImageTitleLayer() {
  removeTileLayer(imageLayer[0])
  imageLayer.shift()
  removeTileLayer(imageLayer[0])
  imageLayer.shift()
  removeTileLayer(imageLayer[0])
  imageLayer.shift()
}
export function removeTileLayer(tileLayer) {
  if (tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
}


export function removeMeteoLayer(ele) {
  let tileLayer = map.getLayerById(ele.id)
  console.info(ele.id, tileLayer)
  if (tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer.destroy()
  }
  map.removeLayer(stationLayer)
}
export function showChangeGray(ele, time, valid, level, legend, boundaries) {
  const curLevel = map.level
  const extent = map.getExtent()
  
  mars3d.Util.fetchJson({ url: "http://47.93.3.128:7889/gridUdi/getGridDataInRect?userId=hitec&pwd=admin&dataCode=" + ele.dataCode + "&interfaceId=getGridDataInRect&times=" + time + "&prodCode=" + ele.element + "&valid=" + valid + "&level=" + level + "&wlng=" + extent.xmin + "&slat=" + extent.ymin + "&elng=" + extent.xmax + "&nlat=" + extent.ymax })
    .then(function (result0) {
    mars3d.Util.fetchJson({ url: "http://47.93.3.128:7889/gridUdi/getGridDataInRect?userId=hitec&pwd=admin&dataCode=" + ele.dataCode + "&interfaceId=getGridDataInRect&times=" + time + "&prodCode=" + ele.element + "&valid=" + (valid + 24) + "&level=" + level + "&wlng=" + extent.xmin + "&slat=" + extent.ymin + "&elng=" + extent.xmax + "&nlat=" + extent.ymax })
      .then(function (result24) {
         const grid0 = result0.DS
         const grid24 = result24.DS
         if (grid24 === "") {
           return 
         }
         // const colors = getColorArray(legend)
         const canvas = mars3d.DomUtil.create("canvas")
         canvas.width = grid0[0].length
         canvas.height = grid0.length
         const zlim = [legend.min, legend.max]
         // 3.将得到的格网预测值渲染到canvas画布上
         const ctx = canvas.getContext("2d")
         ctx.clearRect(0, 0, canvas.width, canvas.height)
         const n = grid0.length
         const m = grid0[0].length
         for (let i = 0; i < n; i++) {
           for (let j = 0; j < m; j++) {
             const value = (legend.labelFunc(grid24[i][j]) - legend.labelFunc(grid0[i][j])).toFixed(1)
             ctx.fillStyle = getColor(legend.value, value)
             ctx.fillRect(j, n - i, 1, 1)
           }
         }
         const image = canvas.toDataURL("image/png")
         grayLayer = map.getLayerById(ele.id)
         if (grayLayer) {
           console.info("grayLayer", "已存在")
           grayLayer.remove()
         }
         grayLayer = new mars3d.layer.ImageLayer({
             id: ele.id,
             name: ele.title + " color",
             alpha: 0.6,
             rectangle: {
               xmin: extent.xmin,
               xmax: extent.xmax,
               ymin: extent.ymin,
               ymax: extent.ymax
             },
             url: image
           })
           map.addLayer(grayLayer)
      })
  }).catch(function (error) {
      console.log("加载JSON出错", error)
  })
}

// ======================================================================================================
// wcontour 等值线代码

class Border {
  constructor() {
    this.lineList = [];
  }
  
  getLineNum() {
    return this.lineList.length;
  }
}
class Extent {
  constructor(xMin, xMax, yMin, yMax) {
    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin;
    this.yMax = yMax;
  }
  
  include(e) {
    return this.xMin <= e.xMin && this.xMax >= e.xMax && this.yMin <= e.yMin && this.yMax >= e.yMax;
  }
}
class BorderLine {
  constructor() {
    this.extent = new Extent();
    this.pointList = [];
    this.ijPointList = [];
  }
}
class PointD {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  
  clone() {
    return new PointD(this.x, this.y);
  }
}
class BorderPoint {
  constructor() {
    this.point = new PointD();
  }
  
  clone() {
    let borderPoint = new BorderPoint();
    borderPoint.id = this.id;
    borderPoint.borderIdx = this.borderIdx;
    borderPoint.bInnerIdx = this.bInnerIdx;
    borderPoint.point = this.point;
    borderPoint.value = this.value;
    return borderPoint;
  }
}
class EndPoint {
  constructor() {
    this.sPoint = new PointD();
    this.point = new PointD();
  }
}
class IJPoint {
  constructor(i, j) {
    this.i = i;
    this.j = j;
  }
}
class PolyLine {
  constructor() {
    this.pointList = [];
  }
}
function doubleEquals(a, b) {
  let difference = Math.abs(a * 1e-5);
  return Math.abs(a - b) <= difference;
}
function distance_point2line(pt1, pt2, point) {
  let k = (pt2.y - pt1.y) / (pt2.x - pt1.x);
  let x = (k * k * pt1.x + k * (point.y - pt1.y) + point.x) / (k * k + 1);
  let y = k * (x - pt1.x) + pt1.y;
  let dis = Math.sqrt((point.y - y) * (point.y - y) + (point.x - x) * (point.x - x));
  return dis;
}
function getExtent(pList) {
  let minX, minY, maxX, maxY;
  let i;
  let aPoint = pList[0];
  minX = aPoint.x;
  maxX = aPoint.x;
  minY = aPoint.y;
  maxY = aPoint.y;
  for (i = 1; i < pList.length; i++) {
    aPoint = pList[i];
    if (aPoint.x < minX) {
      minX = aPoint.x;
    }
    if (aPoint.x > maxX) {
      maxX = aPoint.x;
    }
    if (aPoint.y < minY) {
      minY = aPoint.y;
    }
    if (aPoint.y > maxY) {
      maxY = aPoint.y;
    }
  }
  let aExtent = new Extent();
  aExtent.xMin = minX;
  aExtent.yMin = minY;
  aExtent.xMax = maxX;
  aExtent.yMax = maxY;
  return aExtent;
}
function getExtentAndArea(pList, aExtent) {
  let bArea, minX, minY, maxX, maxY;
  let i;
  let aPoint = pList[0];
  minX = aPoint.x;
  maxX = aPoint.x;
  minY = aPoint.y;
  maxY = aPoint.y;
  for (i = 1; i < pList.length; i++) {
    aPoint = pList[i];
    if (aPoint.x < minX) {
      minX = aPoint.x;
    }
    if (aPoint.x > maxX) {
      maxX = aPoint.x;
    }
    if (aPoint.y < minY) {
      minY = aPoint.y;
    }
    if (aPoint.y > maxY) {
      maxY = aPoint.y;
    }
  }
  aExtent.xMin = minX;
  aExtent.yMin = minY;
  aExtent.xMax = maxX;
  aExtent.yMax = maxY;
  bArea = (maxX - minX) * (maxY - minY);
  return bArea;
}
function isClockwise(pointList) {
  let i;
  let aPoint;
  let yMax = 0;
  let yMaxIdx = 0;
  for (i = 0; i < pointList.length - 1; i++) {
    aPoint = pointList[i];
    if (i === 0) {
      yMax = aPoint.y;
      yMaxIdx = 0;
    } else if (yMax < aPoint.y) {
      yMax = aPoint.y;
      yMaxIdx = i;
    }
  }
  let p1, p2, p3;
  let p1Idx, p2Idx, p3Idx;
  p1Idx = yMaxIdx - 1;
  p2Idx = yMaxIdx;
  p3Idx = yMaxIdx + 1;
  if (yMaxIdx === 0) {
    p1Idx = pointList.length - 2;
  }
  p1 = pointList[p1Idx];
  p2 = pointList[p2Idx];
  p3 = pointList[p3Idx];
  if ((p3.x - p1.x) * (p2.y - p1.y) - (p2.x - p1.x) * (p3.y - p1.y) > 0) {
    return true;
  } else {
    return false;
  }
}
function pointInPolygonByPList(poly, aPoint) {
  let inside = false;
  let nPoints = poly.length;
  if (nPoints < 3) {
    return false;
  }
  let xOld = poly[nPoints - 1].x;
  let yOld = poly[nPoints - 1].y;
  let x1, y1, x2, y2;
  for (let i = 0; i < nPoints; i++) {
    const xNew = poly[i].x;
    const yNew = poly[i].y;
    if (xNew > xOld) {
      x1 = xOld;
      x2 = xNew;
      y1 = yOld;
      y2 = yNew;
    } else {
      x1 = xNew;
      x2 = xOld;
      y1 = yNew;
      y2 = yOld;
    }
    if (xNew < aPoint.x === aPoint.x <= xOld && (aPoint.y - y1) * (x2 - x1) < (y2 - y1) * (aPoint.x - x1)) {
      inside = !inside;
    }
    xOld = xNew;
    yOld = yNew;
  }
  return inside;
}
function judgePolygonHighCenter(borderPolygons, closedPolygons, aLineList, borderList) {
  let aPolygon;
  let aLine;
  let newPList = [];
  let aBound;
  let aValue;
  let aPoint;
  if (borderPolygons.length === 0) {
    let max = aLineList[0].value, min = aLineList[0].value;
    for (let aPLine of aLineList) {
      if (aPLine.value > max) {
        max = aPLine.value;
      }
      if (aPLine.value < min) {
        min = aPLine.value;
      }
    }
    aPolygon = new Polygon();
    aValue = borderList[0].value;
    if (aValue < min) {
      max = min;
      min = aValue;
      aPolygon.isHighCenter = true;
    } else if (aValue > max) {
      min = max;
      max = aValue;
      aPolygon.isHighCenter = false;
    }
    aLine = new PolyLine();
    aLine.type = "Border";
    aLine.value = aValue;
    newPList = [];
    for (let aP of borderList) {
      newPList.push(aP.point);
    }
    aLine.pointList = [];
    aLine.pointList.push(...newPList);
    if (aLine.pointList.length > 0) {
      aPolygon.isBorder = true;
      aPolygon.lowValue = min;
      aPolygon.highValue = max;
      aBound = new Extent();
      aPolygon.area = getExtentAndArea(aLine.pointList, aBound);
      aPolygon.isClockWise = isClockwise(aLine.pointList);
      aPolygon.extent = aBound;
      aPolygon.outLine = aLine;
      aPolygon.holeLines = [];
      borderPolygons.push(aPolygon);
    }
  }
  borderPolygons.push(...closedPolygons);
  let cBound1, cBound2;
  let polygonNum = borderPolygons.length;
  let bPolygon;
  for (let i = 1; i < polygonNum; i++) {
    aPolygon = borderPolygons[i];
    if (aPolygon.outLine.type === "Close") {
      cBound1 = aPolygon.extent;
      aPoint = aPolygon.outLine.pointList[0];
      for (let j = i - 1; j >= 0; j--) {
        bPolygon = borderPolygons[j];
        cBound2 = bPolygon.extent;
        newPList = [];
        newPList.push(...bPolygon.outLine.pointList);
        if (pointInPolygonByPList(newPList, aPoint)) {
          if (cBound1.xMin > cBound2.xMin && cBound1.yMin > cBound2.yMin && cBound1.xMax < cBound2.xMax && cBound1.yMax < cBound2.yMax) {
            if (bPolygon.isHighCenter) {
              aPolygon.isHighCenter = aPolygon.highValue !== bPolygon.lowValue;
            } else {
              aPolygon.isHighCenter = aPolygon.lowValue === bPolygon.highValue;
            }
            break;
          }
        }
      }
    }
  }
  return borderPolygons;
}
function addHoles_Ring(polygonList, holeList) {
  for (let i = 0; i < holeList.length; i++) {
    let holePs = holeList[i];
    let aExtent = getExtent(holePs);
    for (let j = polygonList.length - 1; j >= 0; j--) {
      let aPolygon = polygonList[j];
      if (aPolygon.extent.include(aExtent)) {
        let isHole = true;
        for (let aP of holePs) {
          if (!pointInPolygonByPList(aPolygon.outLine.pointList, aP)) {
            isHole = false;
            break;
          }
        }
        if (isHole) {
          aPolygon.addHole(holePs);
          break;
        }
      }
    }
  }
}
function addPolygonHoles_Ring(polygonList) {
  let holePolygons = [];
  let i, j;
  for (i = 0; i < polygonList.length; i++) {
    let aPolygon = polygonList[i];
    if (!aPolygon.isBorder || aPolygon.isInnerBorder) {
      aPolygon.holeIndex = 1;
      holePolygons.push(aPolygon);
    }
  }
  if (holePolygons.length === 0) {
    return polygonList;
  } else {
    let newPolygons = [];
    for (i = 1; i < holePolygons.length; i++) {
      let aPolygon = holePolygons[i];
      for (j = i - 1; j >= 0; j--) {
        let bPolygon = holePolygons[j];
        if (bPolygon.extent.include(aPolygon.extent)) {
          if (pointInPolygonByPList(bPolygon.outLine.pointList, aPolygon.outLine.pointList[0])) {
            aPolygon.holeIndex = bPolygon.holeIndex + 1;
            bPolygon.addHole(aPolygon);
            break;
          }
        }
      }
    }
    let hole1Polygons = [];
    for (i = 0; i < holePolygons.length; i++) {
      if (holePolygons[i].holeIndex === 1) {
        hole1Polygons.push(holePolygons[i]);
      }
    }
    for (i = 0; i < polygonList.length; i++) {
      let aPolygon = polygonList[i];
      if (aPolygon.isBorder && !aPolygon.isInnerBorder) {
        for (j = 0; j < hole1Polygons.length; j++) {
          let bPolygon = hole1Polygons[j];
          if (aPolygon.extent.include(bPolygon.extent)) {
            if (pointInPolygonByPList(aPolygon.outLine.pointList, bPolygon.outLine.pointList[0])) {
              aPolygon.addHole(bPolygon);
            }
          }
        }
        newPolygons.push(aPolygon);
      }
    }
    newPolygons.push(...holePolygons);
    return newPolygons;
  }
}
class Polygon {
  constructor() {
    this.isInnerBorder = false;
    this.extent = new Extent();
    this.outLine = new PolyLine();
    this.holeLines = [];
  }
  clone() {
    let polygon = new Polygon();
    polygon.isBorder = this.isBorder;
    polygon.lowValue = this.lowValue;
    polygon.highValue = this.highValue;
    polygon.isClockWise = this.isClockWise;
    polygon.startPointIdx = this.startPointIdx;
    polygon.isHighCenter = this.isHighCenter;
    polygon.extent = this.extent;
    polygon.area = this.area;
    polygon.outLine = this.outLine;
    polygon.holeLines = this.holeLines;
    polygon.holeIndex = this.holeIndex;
    return polygon;
  }
  hasHoles() {
    return this.holeLines.length > 0;
  }
  addHole(polygon) {
    if (polygon instanceof Polygon) {
      this.holeLines.push(polygon.outLine);
    } else {
      let pList = polygon;
      if (isClockwise(pList)) {
        pList = pList.reverse();
      }
      const aLine = new PolyLine();
      aLine.pointList = pList;
      this.holeLines.push(aLine);
    }
  }
}
function canTraceBorder(s1, i1, i2, j1, j2, ij3) {
  let canTrace = true;
  let a, b, c, d;
  if (i1 < i2) {
    if (s1[i2][j2 - 1] === 1 && s1[i2][j2 + 1] === 1) {
      a = s1[i2 - 1][j2 - 1];
      b = s1[i2 + 1][j2];
      c = s1[i2 + 1][j2 - 1];
      if (a !== 0 && b === 0 || a === 0 && b !== 0 && c !== 0) {
        ij3[0] = i2;
        ij3[1] = j2 - 1;
      } else {
        ij3[0] = i2;
        ij3[1] = j2 + 1;
      }
    } else if (s1[i2][j2 - 1] === 1 && s1[i2 + 1][j2] === 1) {
      a = s1[i2 + 1][j2 - 1];
      b = s1[i2 + 1][j2 + 1];
      c = s1[i2][j2 - 1];
      d = s1[i2][j2 + 1];
      if (a === 0 || b === 0 || c === 0 || d === 0) {
        if (a === 0 && d === 0 || b === 0 && c === 0) {
          ij3[0] = i2;
          ij3[1] = j2 - 1;
        } else {
          ij3[0] = i2 + 1;
          ij3[1] = j2;
        }
      } else {
        ij3[0] = i2;
        ij3[1] = j2 - 1;
      }
    } else if (s1[i2][j2 + 1] === 1 && s1[i2 + 1][j2] === 1) {
      a = s1[i2 + 1][j2 - 1];
      b = s1[i2 + 1][j2 + 1];
      c = s1[i2][j2 - 1];
      d = s1[i2][j2 + 1];
      if (a === 0 || b === 0 || c === 0 || d === 0) {
        if (a === 0 && d === 0 || b === 0 && c === 0) {
          ij3[0] = i2;
          ij3[1] = j2 + 1;
        } else {
          ij3[0] = i2 + 1;
          ij3[1] = j2;
        }
      } else {
        ij3[0] = i2;
        ij3[1] = j2 + 1;
      }
    } else if (s1[i2][j2 - 1] === 1) {
      ij3[0] = i2;
      ij3[1] = j2 - 1;
    } else if (s1[i2][j2 + 1] === 1) {
      ij3[0] = i2;
      ij3[1] = j2 + 1;
    } else if (s1[i2 + 1][j2] === 1) {
      ij3[0] = i2 + 1;
      ij3[1] = j2;
    } else {
      canTrace = false;
    }
  } else if (j1 < j2) {
    if (s1[i2 + 1][j2] === 1 && s1[i2 - 1][j2] === 1) {
      a = s1[i2 + 1][j2 - 1];
      b = s1[i2][j2 + 1];
      c = s1[i2 + 1][j2 + 1];
      if (a !== 0 && b === 0 || a === 0 && b !== 0 && c !== 0) {
        ij3[0] = i2 + 1;
        ij3[1] = j2;
      } else {
        ij3[0] = i2 - 1;
        ij3[1] = j2;
      }
    } else if (s1[i2 + 1][j2] === 1 && s1[i2][j2 + 1] === 1) {
      c = s1[i2 - 1][j2];
      d = s1[i2 + 1][j2];
      a = s1[i2 - 1][j2 + 1];
      b = s1[i2 + 1][j2 + 1];
      if (a === 0 || b === 0 || c === 0 || d === 0) {
        if (a === 0 && d === 0 || b === 0 && c === 0) {
          ij3[0] = i2 + 1;
          ij3[1] = j2;
        } else {
          ij3[0] = i2;
          ij3[1] = j2 + 1;
        }
      } else {
        ij3[0] = i2 + 1;
        ij3[1] = j2;
      }
    } else if (s1[i2 - 1][j2] === 1 && s1[i2][j2 + 1] === 1) {
      c = s1[i2 - 1][j2];
      d = s1[i2 + 1][j2];
      a = s1[i2 - 1][j2 + 1];
      b = s1[i2 + 1][j2 + 1];
      if (a === 0 || b === 0 || c === 0 || d === 0) {
        if (a === 0 && d === 0 || b === 0 && c === 0) {
          ij3[0] = i2 - 1;
          ij3[1] = j2;
        } else {
          ij3[0] = i2;
          ij3[1] = j2 + 1;
        }
      } else {
        ij3[0] = i2 - 1;
        ij3[1] = j2;
      }
    } else if (s1[i2 + 1][j2] === 1) {
      ij3[0] = i2 + 1;
      ij3[1] = j2;
    } else if (s1[i2 - 1][j2] === 1) {
      ij3[0] = i2 - 1;
      ij3[1] = j2;
    } else if (s1[i2][j2 + 1] === 1) {
      ij3[0] = i2;
      ij3[1] = j2 + 1;
    } else {
      canTrace = false;
    }
  } else if (i1 > i2) {
    if (s1[i2][j2 - 1] === 1 && s1[i2][j2 + 1] === 1) {
      a = s1[i2 + 1][j2 - 1];
      b = s1[i2 - 1][j2];
      c = s1[i2 - 1][j2 + 1];
      if (a !== 0 && b === 0 || a === 0 && b !== 0 && c !== 0) {
        ij3[0] = i2;
        ij3[1] = j2 - 1;
      } else {
        ij3[0] = i2;
        ij3[1] = j2 + 1;
      }
    } else if (s1[i2][j2 - 1] === 1 && s1[i2 - 1][j2] === 1) {
      a = s1[i2 - 1][j2 - 1];
      b = s1[i2 - 1][j2 + 1];
      c = s1[i2][j2 - 1];
      d = s1[i2][j2 + 1];
      if (a === 0 || b === 0 || c === 0 || d === 0) {
        if (a === 0 && d === 0 || b === 0 && c === 0) {
          ij3[0] = i2;
          ij3[1] = j2 - 1;
        } else {
          ij3[0] = i2 - 1;
          ij3[1] = j2;
        }
      } else {
        ij3[0] = i2;
        ij3[1] = j2 - 1;
      }
    } else if (s1[i2][j2 + 1] === 1 && s1[i2 - 1][j2] === 1) {
      a = s1[i2 - 1][j2 - 1];
      b = s1[i2 - 1][j2 + 1];
      c = s1[i2][j2 - 1];
      d = s1[i2][j2 + 1];
      if (a === 0 || b === 0 || c === 0 || d === 0) {
        if (a === 0 && d === 0 || b === 0 && c === 0) {
          ij3[0] = i2;
          ij3[1] = j2 + 1;
        } else {
          ij3[0] = i2 - 1;
          ij3[1] = j2;
        }
      } else {
        ij3[0] = i2;
        ij3[1] = j2 + 1;
      }
    } else if (s1[i2][j2 - 1] === 1) {
      ij3[0] = i2;
      ij3[1] = j2 - 1;
    } else if (s1[i2][j2 + 1] === 1) {
      ij3[0] = i2;
      ij3[1] = j2 + 1;
    } else if (s1[i2 - 1][j2] === 1) {
      ij3[0] = i2 - 1;
      ij3[1] = j2;
    } else {
      canTrace = false;
    }
  } else if (j1 > j2) {
    if (s1[i2 + 1][j2] === 1 && s1[i2 - 1][j2] === 1) {
      a = s1[i2 + 1][j2 + 1];
      b = s1[i2][j2 - 1];
      c = s1[i2 - 1][j2 - 1];
      if (a !== 0 && b === 0 || a === 0 && b !== 0 && c !== 0) {
        ij3[0] = i2 + 1;
        ij3[1] = j2;
      } else {
        ij3[0] = i2 - 1;
        ij3[1] = j2;
      }
    } else if (s1[i2 + 1][j2] === 1 && s1[i2][j2 - 1] === 1) {
      c = s1[i2 - 1][j2];
      d = s1[i2 + 1][j2];
      a = s1[i2 - 1][j2 - 1];
      b = s1[i2 + 1][j2 - 1];
      if (a === 0 || b === 0 || c === 0 || d === 0) {
        if (a === 0 && d === 0 || b === 0 && c === 0) {
          ij3[0] = i2 + 1;
          ij3[1] = j2;
        } else {
          ij3[0] = i2;
          ij3[1] = j2 - 1;
        }
      } else {
        ij3[0] = i2 + 1;
        ij3[1] = j2;
      }
    } else if (s1[i2 - 1][j2] === 1 && s1[i2][j2 - 1] === 1) {
      c = s1[i2 - 1][j2];
      d = s1[i2 + 1][j2];
      a = s1[i2 - 1][j2 - 1];
      b = s1[i2 + 1][j2 - 1];
      if (a === 0 || b === 0 || c === 0 || d === 0) {
        if (a === 0 && d === 0 || b === 0 && c === 0) {
          ij3[0] = i2 - 1;
          ij3[1] = j2;
        } else {
          ij3[0] = i2;
          ij3[1] = j2 - 1;
        }
      } else {
        ij3[0] = i2 - 1;
        ij3[1] = j2;
      }
    } else if (s1[i2 + 1][j2] === 1) {
      ij3[0] = i2 + 1;
      ij3[1] = j2;
    } else if (s1[i2 - 1][j2] === 1) {
      ij3[0] = i2 - 1;
      ij3[1] = j2;
    } else if (s1[i2][j2 - 1] === 1) {
      ij3[0] = i2;
      ij3[1] = j2 - 1;
    } else {
      canTrace = false;
    }
  }
  return canTrace;
}
function canTraceIsoline_UndefData(i1, i2, H, S, j1, j2, X, Y, a2x, ij3, a3xy, IsS) {
  let canTrace = true;
  let a3x = 0, a3y = 0;
  let i3 = 0, j3 = 0;
  let isS = true;
  if (i1 < i2) {
    if (H[i2][j2] !== -2 && H[i2][j2 + 1] !== -2) {
      if (H[i2][j2] < H[i2][j2 + 1]) {
        a3x = X[j2];
        a3y = Y[i2] + H[i2][j2] * (Y[i2 + 1] - Y[i2]);
        i3 = i2;
        j3 = j2;
        H[i3][j3] = -2;
        isS = false;
      } else {
        a3x = X[j2 + 1];
        a3y = Y[i2] + H[i2][j2 + 1] * (Y[i2 + 1] - Y[i2]);
        i3 = i2;
        j3 = j2 + 1;
        H[i3][j3] = -2;
        isS = false;
      }
    } else if (H[i2][j2] !== -2 && H[i2][j2 + 1] === -2) {
      a3x = X[j2];
      a3y = Y[i2] + H[i2][j2] * (Y[i2 + 1] - Y[i2]);
      i3 = i2;
      j3 = j2;
      H[i3][j3] = -2;
      isS = false;
    } else if (H[i2][j2] === -2 && H[i2][j2 + 1] !== -2) {
      a3x = X[j2 + 1];
      a3y = Y[i2] + H[i2][j2 + 1] * (Y[i2 + 1] - Y[i2]);
      i3 = i2;
      j3 = j2 + 1;
      H[i3][j3] = -2;
      isS = false;
    } else if (S[i2 + 1][j2] !== -2) {
      a3x = X[j2] + S[i2 + 1][j2] * (X[j2 + 1] - X[j2]);
      a3y = Y[i2 + 1];
      i3 = i2 + 1;
      j3 = j2;
      S[i3][j3] = -2;
      isS = true;
    } else {
      canTrace = false;
    }
  } else if (j1 < j2) {
    if (S[i2][j2] !== -2 && S[i2 + 1][j2] !== -2) {
      if (S[i2][j2] < S[i2 + 1][j2]) {
        a3x = X[j2] + S[i2][j2] * (X[j2 + 1] - X[j2]);
        a3y = Y[i2];
        i3 = i2;
        j3 = j2;
        S[i3][j3] = -2;
        isS = true;
      } else {
        a3x = X[j2] + S[i2 + 1][j2] * (X[j2 + 1] - X[j2]);
        a3y = Y[i2 + 1];
        i3 = i2 + 1;
        j3 = j2;
        S[i3][j3] = -2;
        isS = true;
      }
    } else if (S[i2][j2] !== -2 && S[i2 + 1][j2] === -2) {
      a3x = X[j2] + S[i2][j2] * (X[j2 + 1] - X[j2]);
      a3y = Y[i2];
      i3 = i2;
      j3 = j2;
      S[i3][j3] = -2;
      isS = true;
    } else if (S[i2][j2] === -2 && S[i2 + 1][j2] !== -2) {
      a3x = X[j2] + S[i2 + 1][j2] * (X[j2 + 1] - X[j2]);
      a3y = Y[i2 + 1];
      i3 = i2 + 1;
      j3 = j2;
      S[i3][j3] = -2;
      isS = true;
    } else if (H[i2][j2 + 1] !== -2) {
      a3x = X[j2 + 1];
      a3y = Y[i2] + H[i2][j2 + 1] * (Y[i2 + 1] - Y[i2]);
      i3 = i2;
      j3 = j2 + 1;
      H[i3][j3] = -2;
      isS = false;
    } else {
      canTrace = false;
    }
  } else if (X[j2] < a2x) {
    if (H[i2 - 1][j2] !== -2 && H[i2 - 1][j2 + 1] !== -2) {
      if (H[i2 - 1][j2] > H[i2 - 1][j2 + 1]) {
        a3x = X[j2];
        a3y = Y[i2 - 1] + H[i2 - 1][j2] * (Y[i2] - Y[i2 - 1]);
        i3 = i2 - 1;
        j3 = j2;
        H[i3][j3] = -2;
        isS = false;
      } else {
        a3x = X[j2 + 1];
        a3y = Y[i2 - 1] + H[i2 - 1][j2 + 1] * (Y[i2] - Y[i2 - 1]);
        i3 = i2 - 1;
        j3 = j2 + 1;
        H[i3][j3] = -2;
        isS = false;
      }
    } else if (H[i2 - 1][j2] !== -2 && H[i2 - 1][j2 + 1] === -2) {
      a3x = X[j2];
      a3y = Y[i2 - 1] + H[i2 - 1][j2] * (Y[i2] - Y[i2 - 1]);
      i3 = i2 - 1;
      j3 = j2;
      H[i3][j3] = -2;
      isS = false;
    } else if (H[i2 - 1][j2] === -2 && H[i2 - 1][j2 + 1] !== -2) {
      a3x = X[j2 + 1];
      a3y = Y[i2 - 1] + H[i2 - 1][j2 + 1] * (Y[i2] - Y[i2 - 1]);
      i3 = i2 - 1;
      j3 = j2 + 1;
      H[i3][j3] = -2;
      isS = false;
    } else if (S[i2 - 1][j2] !== -2) {
      a3x = X[j2] + S[i2 - 1][j2] * (X[j2 + 1] - X[j2]);
      a3y = Y[i2 - 1];
      i3 = i2 - 1;
      j3 = j2;
      S[i3][j3] = -2;
      isS = true;
    } else {
      canTrace = false;
    }
  } else {
    if (S[i2 + 1][j2 - 1] !== -2 && S[i2][j2 - 1] !== -2) {
      if (S[i2 + 1][j2 - 1] > S[i2][j2 - 1]) {
        a3x = X[j2 - 1] + S[i2 + 1][j2 - 1] * (X[j2] - X[j2 - 1]);
        a3y = Y[i2 + 1];
        i3 = i2 + 1;
        j3 = j2 - 1;
        S[i3][j3] = -2;
        isS = true;
      } else {
        a3x = X[j2 - 1] + S[i2][j2 - 1] * (X[j2] - X[j2 - 1]);
        a3y = Y[i2];
        i3 = i2;
        j3 = j2 - 1;
        S[i3][j3] = -2;
        isS = true;
      }
    } else if (S[i2 + 1][j2 - 1] !== -2 && S[i2][j2 - 1] === -2) {
      a3x = X[j2 - 1] + S[i2 + 1][j2 - 1] * (X[j2] - X[j2 - 1]);
      a3y = Y[i2 + 1];
      i3 = i2 + 1;
      j3 = j2 - 1;
      S[i3][j3] = -2;
      isS = true;
    } else if (S[i2 + 1][j2 - 1] === -2 && S[i2][j2 - 1] !== -2) {
      a3x = X[j2 - 1] + S[i2][j2 - 1] * (X[j2] - X[j2 - 1]);
      a3y = Y[i2];
      i3 = i2;
      j3 = j2 - 1;
      S[i3][j3] = -2;
      isS = true;
    } else if (H[i2][j2 - 1] !== -2) {
      a3x = X[j2 - 1];
      a3y = Y[i2] + H[i2][j2 - 1] * (Y[i2 + 1] - Y[i2]);
      i3 = i2;
      j3 = j2 - 1;
      H[i3][j3] = -2;
      isS = false;
    } else {
      canTrace = false;
    }
  }
  ij3[0] = i3;
  ij3[1] = j3;
  a3xy[0] = a3x;
  a3xy[1] = a3y;
  IsS[0] = isS;
  return canTrace;
}
function tracingPolygons_Ring(LineList, borderList, aBorder, contour, pNums) {
  let aPolygonList = [];
  let aLineList;
  let aLine;
  let aPoint;
  let aPolygon;
  let aBound;
  let i;
  let j;
  aLineList = [];
  aLineList.push(...LineList);
  let aPList;
  let newPList;
  let bP;
  let bP1;
  let timesArray = [];
  timesArray.length = borderList.length - 1;
  for (i = 0; i < timesArray.length; i++) {
    timesArray[i] = 0;
  }
  let pIdx;
  let pNum;
  let vNum;
  let aValue = 0;
  let bValue = 0;
  let cValue = 0;
  let lineBorderList = [];
  let borderIdx1;
  let borderIdx2;
  let innerIdx;
  pNum = borderList.length;
  for (i = 0; i < pNum; i++) {
    if (borderList[i].id === -1) {
      continue;
    }
    pIdx = i;
    lineBorderList.push(borderList[i]);
    let sameBorderIdx = false;
    if (timesArray[pIdx] < 2) {
      bP = borderList[pIdx];
      innerIdx = bP.bInnerIdx;
      aPList = [];
      let bIdxList = [];
      aPList.push(bP.point);
      bIdxList.push(pIdx);
      borderIdx1 = bP.borderIdx;
      borderIdx2 = borderIdx1;
      pIdx += 1;
      innerIdx += 1;
      if (innerIdx === pNums[borderIdx1] - 1) {
        pIdx = pIdx - (pNums[borderIdx1] - 1);
      }
      vNum = 0;
      do {
        bP = borderList[pIdx];
        if (bP.id === -1) {
          if (timesArray[pIdx] === 1) {
            break;
          }
          cValue = bP.value;
          aPList.push(bP.point);
          timesArray[pIdx] += 1;
          bIdxList.push(pIdx);
        } else {
          if (timesArray[pIdx] === 2) {
            break;
          }
          timesArray[pIdx] += 1;
          bIdxList.push(pIdx);
          aLine = aLineList[bP.id];
          if (vNum === 0) {
            aValue = aLine.value;
            bValue = aLine.value;
            vNum += 1;
          } else if (aValue === bValue) {
            if (aLine.value > aValue) {
              bValue = aLine.value;
            } else if (aLine.value < aValue) {
              aValue = aLine.value;
            }
            vNum += 1;
          }
          newPList = [];
          newPList.push(...aLine.pointList);
          aPoint = newPList[0];
          if (!(bP.point.x === aPoint.x && bP.point.y === aPoint.y)) {
            newPList.reverse();
          }
          aPList.push(...newPList);
          for (j = 0; j < borderList.length; j++) {
            if (j !== pIdx) {
              bP1 = borderList[j];
              if (bP1.id === bP.id) {
                pIdx = j;
                innerIdx = bP1.bInnerIdx;
                timesArray[pIdx] += 1;
                bIdxList.push(pIdx);
                borderIdx2 = bP1.borderIdx;
                if (bP.borderIdx > 0 && bP.borderIdx === bP1.borderIdx) {
                  sameBorderIdx = true;
                }
                break;
              }
            }
          }
        }
        if (pIdx === i) {
          if (aPList.length > 0) {
            if (sameBorderIdx) {
              let isTooBig = false;
              let baseNum = 0;
              for (let idx = 0; idx < bP.borderIdx; idx++) {
                baseNum += pNums[idx];
              }
              let sIdx = baseNum;
              let eIdx = baseNum + pNums[bP.borderIdx];
              let theIdx = sIdx;
              for (let idx = sIdx; idx < eIdx; idx++) {
                if (bIdxList.indexOf(idx) < 0) {
                  theIdx = idx;
                  break;
                }
              }
              if (pointInPolygonByPList(aPList, borderList[theIdx].point)) {
                isTooBig = true;
              }
              if (isTooBig) {
                break;
              }
            }
            aPolygon = new Polygon();
            aPolygon.isBorder = true;
            aPolygon.isInnerBorder = sameBorderIdx;
            aPolygon.lowValue = aValue;
            aPolygon.highValue = bValue;
            aBound = new Extent();
            aPolygon.area = getExtentAndArea(aPList, aBound);
            aPolygon.isClockWise = true;
            aPolygon.startPointIdx = lineBorderList.length - 1;
            aPolygon.extent = aBound;
            aPolygon.outLine.pointList = aPList;
            aPolygon.outLine.value = aValue;
            aPolygon.isHighCenter = true;
            if (aValue === bValue) {
              if (cValue < aValue) {
                aPolygon.isHighCenter = false;
              }
            }
            aPolygon.outLine.type = "Border";
            aPolygon.holeLines = [];
            aPolygonList.push(aPolygon);
          }
          break;
        }
        pIdx += 1;
        innerIdx += 1;
        if (borderIdx1 !== borderIdx2) {
          borderIdx1 = borderIdx2;
        }
        if (innerIdx === pNums[borderIdx1] - 1) {
          pIdx = pIdx - (pNums[borderIdx1] - 1);
          innerIdx = 0;
        }
      } while (true);
    }
    sameBorderIdx = false;
    pIdx = i;
    if (timesArray[pIdx] < 2) {
      aPList = [];
      let bIdxList = [];
      bP = borderList[pIdx];
      innerIdx = bP.bInnerIdx;
      aPList.push(bP.point);
      bIdxList.push(pIdx);
      borderIdx1 = bP.borderIdx;
      borderIdx2 = borderIdx1;
      pIdx += -1;
      innerIdx += -1;
      if (innerIdx === -1) {
        pIdx = pIdx + (pNums[borderIdx1] - 1);
      }
      vNum = 0;
      do {
        bP = borderList[pIdx];
        if (bP.id === -1) {
          if (timesArray[pIdx] === 1) {
            break;
          }
          cValue = bP.value;
          aPList.push(bP.point);
          bIdxList.push(pIdx);
          timesArray[pIdx] += 1;
        } else {
          if (timesArray[pIdx] === 2) {
            break;
          }
          timesArray[pIdx] += 1;
          bIdxList.push(pIdx);
          aLine = aLineList[bP.id];
          if (vNum === 0) {
            aValue = aLine.value;
            bValue = aLine.value;
            vNum += 1;
          } else if (aValue === bValue) {
            if (aLine.value > aValue) {
              bValue = aLine.value;
            } else if (aLine.value < aValue) {
              aValue = aLine.value;
            }
            vNum += 1;
          }
          newPList = [];
          newPList.push(...aLine.pointList);
          aPoint = newPList[0];
          if (!(bP.point.x === aPoint.x && bP.point.y === aPoint.y)) {
            newPList.reverse();
          }
          aPList.push(...newPList);
          for (j = 0; j < borderList.length; j++) {
            if (j !== pIdx) {
              bP1 = borderList[j];
              if (bP1.id === bP.id) {
                pIdx = j;
                innerIdx = bP1.bInnerIdx;
                timesArray[pIdx] += 1;
                bIdxList.push(pIdx);
                borderIdx2 = bP1.borderIdx;
                if (bP.borderIdx > 0 && bP.borderIdx === bP1.borderIdx) {
                  sameBorderIdx = true;
                }
                break;
              }
            }
          }
        }
        if (pIdx === i) {
          if (aPList.length > 0) {
            if (sameBorderIdx) {
              let isTooBig = false;
              let baseNum = 0;
              for (let idx = 0; idx < bP.borderIdx; idx++) {
                baseNum += pNums[idx];
              }
              let sIdx = baseNum;
              let eIdx = baseNum + pNums[bP.borderIdx];
              let theIdx = sIdx;
              for (let idx = sIdx; idx < eIdx; idx++) {
                if (bIdxList.indexOf(idx) < 0) {
                  theIdx = idx;
                  break;
                }
              }
              if (pointInPolygonByPList(aPList, borderList[theIdx].point)) {
                isTooBig = true;
              }
              if (isTooBig) {
                break;
              }
            }
            aPolygon = new Polygon();
            aPolygon.isBorder = true;
            aPolygon.isInnerBorder = sameBorderIdx;
            aPolygon.lowValue = aValue;
            aPolygon.highValue = bValue;
            aBound = new Extent();
            aPolygon.area = getExtentAndArea(aPList, aBound);
            aPolygon.isClockWise = false;
            aPolygon.startPointIdx = lineBorderList.length - 1;
            aPolygon.extent = aBound;
            aPolygon.outLine.pointList = aPList;
            aPolygon.outLine.value = aValue;
            aPolygon.isHighCenter = true;
            if (aValue === bValue) {
              if (cValue < aValue) {
                aPolygon.isHighCenter = false;
              }
            }
            aPolygon.outLine.type = "Border";
            aPolygon.holeLines = [];
            aPolygonList.push(aPolygon);
          }
          break;
        }
        pIdx += -1;
        innerIdx += -1;
        if (borderIdx1 !== borderIdx2) {
          borderIdx1 = borderIdx2;
        }
        if (innerIdx === -1) {
          pIdx = pIdx + pNums[borderIdx1];
          innerIdx = pNums[borderIdx1] - 1;
        }
      } while (true);
    }
  }
  let cPolygonlist = [];
  let isInserted;
  for (i = 0; i < aLineList.length; i++) {
    aLine = aLineList[i];
    if (aLine.type === "Close") {
      aPolygon = new Polygon();
      aPolygon.isBorder = false;
      aPolygon.lowValue = aLine.value;
      aPolygon.highValue = aLine.value;
      aBound = new Extent();
      aPolygon.area = getExtentAndArea(aLine.pointList, aBound);
      aPolygon.isClockWise = isClockwise(aLine.pointList);
      aPolygon.extent = aBound;
      aPolygon.outLine = aLine;
      aPolygon.isHighCenter = true;
      aPolygon.holeLines = [];
      isInserted = false;
      for (j = 0; j < cPolygonlist.length; j++) {
        if (aPolygon.area > cPolygonlist[j].area) {
          cPolygonlist.splice(j, 0, aPolygon);
          isInserted = true;
          break;
        }
      }
      if (!isInserted) {
        cPolygonlist.push(aPolygon);
      }
    }
  }
  if (aPolygonList.length === 0) {
    aLine = new PolyLine();
    aLine.type = "Border";
    aLine.value = contour[0];
    aLine.pointList = [];
    aLine.pointList.push(...aBorder.lineList[0].pointList);
    if (aLine.pointList.length > 0) {
      aPolygon = new Polygon();
      aPolygon.lowValue = aLine.value;
      aPolygon.highValue = aLine.value;
      aBound = new Extent();
      aPolygon.area = getExtentAndArea(aLine.pointList, aBound);
      aPolygon.isClockWise = isClockwise(aLine.pointList);
      aPolygon.extent = aBound;
      aPolygon.outLine = aLine;
      aPolygon.isHighCenter = false;
      aPolygonList.push(aPolygon);
    }
  }
  aPolygonList.push(...cPolygonlist);
  let cBound1;
  let cBound2;
  let polygonNum = aPolygonList.length;
  let bPolygon;
  for (i = polygonNum - 1; i >= 0; i += -1) {
    aPolygon = aPolygonList[i];
    if (aPolygon.outLine.type === "Close") {
      cBound1 = aPolygon.extent;
      aValue = aPolygon.lowValue;
      aPoint = aPolygon.outLine.pointList[0];
      for (j = i - 1; j >= 0; j += -1) {
        bPolygon = aPolygonList[j];
        cBound2 = bPolygon.extent;
        bValue = bPolygon.lowValue;
        newPList = [];
        newPList.push(...bPolygon.outLine.pointList);
        if (pointInPolygonByPList(newPList, aPoint)) {
          if (cBound1.xMin > cBound2.xMin && cBound1.yMin > cBound2.yMin && cBound1.xMax < cBound2.xMax && cBound1.yMax < cBound2.yMax) {
            if (aValue < bValue) {
              aPolygon.isHighCenter = false;
            } else if (aValue === bValue) {
              if (bPolygon.isHighCenter) {
                aPolygon.isHighCenter = false;
              }
            }
            break;
          }
        }
      }
    }
  }
  return aPolygonList;
}
function tracingStreamlinePoint(aPoint, Dx, Dy, X, Y, iijj, isForward) {
  let a, b, c, d, val1, val2;
  let dx, dy;
  let xNum = X.length;
  let yNum = Y.length;
  let deltX = X[1] - X[0];
  let deltY = Y[1] - Y[0];
  let ii = iijj[0];
  let jj = iijj[1];
  a = Dx[ii][jj];
  b = Dx[ii][jj + 1];
  c = Dx[ii + 1][jj];
  d = Dx[ii + 1][jj + 1];
  val1 = a + (c - a) * ((aPoint.y - Y[ii]) / deltY);
  val2 = b + (d - b) * ((aPoint.y - Y[ii]) / deltY);
  dx = val1 + (val2 - val1) * ((aPoint.x - X[jj]) / deltX);
  a = Dy[ii][jj];
  b = Dy[ii][jj + 1];
  c = Dy[ii + 1][jj];
  d = Dy[ii + 1][jj + 1];
  val1 = a + (c - a) * ((aPoint.y - Y[ii]) / deltY);
  val2 = b + (d - b) * ((aPoint.y - Y[ii]) / deltY);
  dy = val1 + (val2 - val1) * ((aPoint.x - X[jj]) / deltX);
  if (isForward) {
    aPoint.x += dx;
    aPoint.y += dy;
  } else {
    aPoint.x -= dx;
    aPoint.y -= dy;
  }
  if (!(aPoint.x >= X[jj] && aPoint.x <= X[jj + 1] && aPoint.y >= Y[ii] && aPoint.y <= Y[ii + 1])) {
    if (aPoint.x < X[0] || aPoint.x > X[X.length - 1] || aPoint.y < Y[0] || aPoint.y > Y[Y.length - 1]) {
      return false;
    }
    for (let ti = ii - 2; ti < ii + 3; ti++) {
      if (ti >= 0 && ti < yNum) {
        if (aPoint.y >= Y[ti] && aPoint.y <= Y[ti + 1]) {
          ii = ti;
          for (let tj = jj - 2; tj < jj + 3; tj++) {
            if (tj >= 0 && tj < xNum) {
              if (aPoint.x >= X[tj] && aPoint.x <= X[tj + 1]) {
                jj = tj;
                break;
              }
            }
          }
          break;
        }
      }
    }
  }
  iijj[0] = ii;
  iijj[1] = jj;
  return true;
}
const _Contour = class {
  constructor(s0, xs, ys, undefData) {
    this._borders = [];
    this._s0 = s0;
    this._m = s0.length;
    this._n = s0[0].length;
    this._xs = xs;
    this._ys = ys;
    this._undefData = undefData;
    this._s1 = this._tracingDataFlag();
    this._borders = this._tracingBorders();
  }
  _tracingDataFlag() {
    let s1 = [];
    const { _s0, _m, _n, _undefData } = this;
    for (let i = 0; i < _m; i++) {
      s1[i] = [];
      for (let j = 0; j < _n; j++) {
        s1[i][j] = doubleEquals(_s0[i][j], _undefData) ? 0 : 1;
      }
    }
    for (let i = 1; i < _m - 1; i++) {
      for (let j = 1; j < _n - 1; j++) {
        if (s1[i][j] === 1) {
          let l = s1[i][j - 1];
          let r = s1[i][j + 1];
          let b = s1[i - 1][j];
          let t = s1[i + 1][j];
          let lb = s1[i - 1][j - 1];
          let rb = s1[i - 1][j + 1];
          let lt = s1[i + 1][j - 1];
          let rt = s1[i + 1][j + 1];
          if (l > 0 && r > 0 && b > 0 && t > 0 && lb > 0 && rb > 0 && lt > 0 && rt > 0) {
            s1[i][j] = 2;
          }
          if (l + r + b + t + lb + rb + lt + rt <= 2) {
            s1[i][j] = 0;
          }
        }
      }
    }
    let isContinue;
    while (true) {
      isContinue = false;
      for (let i = 1; i < _m - 1; i++) {
        for (let j = 1; j < _n - 1; j++) {
          if (s1[i][j] === 1) {
            let l = s1[i][j - 1];
            let r = s1[i][j + 1];
            let b = s1[i - 1][j];
            let t = s1[i + 1][j];
            let lb = s1[i - 1][j - 1];
            let rb = s1[i - 1][j + 1];
            let lt = s1[i + 1][j - 1];
            let rt = s1[i + 1][j + 1];
            if (l === 0 && r === 0 || b === 0 && t === 0) {
              s1[i][j] = 0;
              isContinue = true;
            }
            if (lt === 0 && r === 0 && b === 0 || rt === 0 && l === 0 && b === 0 || lb === 0 && r === 0 && t === 0 || rb === 0 && l === 0 && t === 0) {
              s1[i][j] = 0;
              isContinue = true;
            }
          }
        }
      }
      if (!isContinue) {
        break;
      }
    }
    for (let j = 0; j < _n; j++) {
      if (s1[0][j] === 1) {
        if (s1[1][j] === 0) {
          s1[0][j] = 0;
        } else if (j === 0) {
          if (s1[0][j + 1] === 0) {
            s1[0][j] = 0;
          }
        } else if (j === _n - 1) {
          if (s1[0][_n - 2] === 0) {
            s1[0][j] = 0;
          }
        } else if (s1[0][j - 1] === 0 && s1[0][j + 1] === 0) {
          s1[0][j] = 0;
        }
      }
      if (s1[_m - 1][j] === 1) {
        if (s1[_m - 2][j] === 0) {
          s1[_m - 1][j] = 0;
        } else if (j === 0) {
          if (s1[_m - 1][j + 1] === 0) {
            s1[_m - 1][j] = 0;
          }
        } else if (j === _n - 1) {
          if (s1[_m - 1][_n - 2] === 0) {
            s1[_m - 1][j] = 0;
          }
        } else if (s1[_m - 1][j - 1] === 0 && s1[_m - 1][j + 1] === 0) {
          s1[_m - 1][j] = 0;
        }
      }
    }
    for (let i = 0; i < _m; i++) {
      if (s1[i][0] === 1) {
        if (s1[i][1] === 0) {
          s1[i][0] = 0;
        } else if (i === 0) {
          if (s1[i + 1][0] === 0) {
            s1[i][0] = 0;
          }
        } else if (i === _m - 1) {
          if (s1[_m - 2][0] === 0) {
            s1[i][0] = 0;
          }
        } else if (s1[i - 1][0] === 0 && s1[i + 1][0] === 0) {
          s1[i][0] = 0;
        }
      }
      if (s1[i][_n - 1] === 1) {
        if (s1[i][_n - 2] === 0) {
          s1[i][_n - 1] = 0;
        } else if (i === 0) {
          if (s1[i + 1][_n - 1] === 0) {
            s1[i][_n - 1] = 0;
          }
        } else if (i === _m - 1) {
          if (s1[_m - 2][_n - 1] === 0) {
            s1[i][_n - 1] = 0;
          }
        } else if (s1[i - 1][_n - 1] === 0 && s1[i + 1][_n - 1] === 0) {
          s1[i][_n - 1] = 0;
        }
      }
    }
    return s1;
  }
  _tracingBorders() {
    const { _s1, _m, _n, _xs, _ys } = this;
    let borderLines = [];
    let s2 = [];
    for (let i = 0; i < _m + 2; i++) {
      s2[i] = [];
      for (let j = 0; j < _n + 2; j++) {
        if (i === 0 || i === _m + 1) {
          s2[i][j] = 0;
        } else if (j === 0 || j === _n + 1) {
          s2[i][j] = 0;
        } else {
          s2[i][j] = _s1[i - 1][j - 1];
        }
      }
    }
    let uNum = [];
    for (let i = 0; i < _m + 2; i++) {
      uNum[i] = [];
      for (let j = 0; j < _n + 2; j++) {
        if (s2[i][j] === 1) {
          let l = s2[i][j - 1];
          let r = s2[i][j + 1];
          let b = s2[i - 1][j];
          let t = s2[i + 1][j];
          let lb = s2[i - 1][j - 1];
          let rb = s2[i - 1][j + 1];
          let lt = s2[i + 1][j - 1];
          let rt = s2[i + 1][j + 1];
          if (l === 1 && r === 1 && b === 1 && t === 1 && (lb === 0 && rt === 0 || rb === 0 && lt === 0)) {
            uNum[i][j] = 2;
          } else {
            uNum[i][j] = 1;
          }
        } else {
          uNum[i][j] = 0;
        }
      }
    }
    for (let i = 1; i < _m + 1; i++) {
      for (let j = 1; j < _n + 1; j++) {
        if (s2[i][j] === 1) {
          let pointList = [];
          let ijPList = [];
          pointList.push(new PointD(_xs[j - 1], _ys[i - 1]));
          ijPList.push(new IJPoint(i - 1, j - 1));
          let i3 = 0;
          let j3 = 0;
          let i2 = i;
          let j2 = j;
          let i1 = i2;
          let j1 = -1;
          while (true) {
            let ij3 = [];
            ij3[0] = i3;
            ij3[1] = j3;
            if (canTraceBorder(s2, i1, i2, j1, j2, ij3)) {
              i3 = ij3[0];
              j3 = ij3[1];
              i1 = i2;
              j1 = j2;
              i2 = i3;
              j2 = j3;
              uNum[i3][j3] = uNum[i3][j3] - 1;
              if (uNum[i3][j3] === 0) {
                s2[i3][j3] = 3;
              }
            } else {
              break;
            }
            pointList.push(new PointD(_xs[j3 - 1], _ys[i3 - 1]));
            ijPList.push(new IJPoint(i3 - 1, j3 - 1));
            if (i3 === i && j3 === j) {
              break;
            }
          }
          uNum[i][j] = uNum[i][j] - 1;
          if (uNum[i][j] === 0) {
            s2[i][j] = 3;
          }
          if (pointList.length > 1) {
            let aBLine = new BorderLine();
            aBLine.area = getExtentAndArea(pointList, aBLine.extent);
            aBLine.isOutLine = true;
            aBLine.isClockwise = true;
            aBLine.pointList = pointList;
            aBLine.ijPointList = ijPList;
            borderLines.push(aBLine);
          }
        }
      }
    }
    let borders = [];
    for (let i = 1; i < borderLines.length; i++) {
      const aLine = borderLines[i];
      for (let j = 0; j < i; j++) {
        const bLine = borderLines[i];
        if (aLine.area > bLine.area) {
          borderLines.splice(i, 1);
          borderLines.splice(j, 0, aLine);
          break;
        }
      }
    }
    let lineList;
    if (borderLines.length === 1) {
      const aLine = borderLines[0];
      if (!isClockwise(aLine.pointList)) {
        aLine.pointList = aLine.pointList.reverse();
        aLine.ijPointList.reverse();
      }
      aLine.isClockwise = true;
      lineList = [];
      lineList.push(aLine);
      let aBorder = new Border();
      aBorder.lineList = lineList;
      borders.push(aBorder);
    } else {
      for (let i = 0; i < borderLines.length; i++) {
        if (i === borderLines.length) {
          break;
        }
        const aLine = borderLines[i];
        if (!isClockwise(aLine.pointList)) {
          aLine.pointList.reverse();
          aLine.ijPointList.reverse();
        }
        aLine.isClockwise = true;
        lineList = [];
        lineList.push(aLine);
        for (let j = i + 1; j < borderLines.length; j++) {
          if (j === borderLines.length) {
            break;
          }
          const bLine = borderLines[i];
          if (bLine.extent.xMin > aLine.extent.xMin && bLine.extent.xMax < aLine.extent.xMax && bLine.extent.yMin > aLine.extent.yMin && bLine.extent.yMax < aLine.extent.yMax) {
            const aPoint = bLine.pointList[0];
            if (pointInPolygonByPList(aLine.pointList, aPoint)) {
              bLine.isOutLine = false;
              if (isClockwise(bLine.pointList)) {
                bLine.pointList.reverse();
                bLine.ijPointList.reverse();
              }
              bLine.isClockwise = false;
              lineList.push(bLine);
              borderLines.splice(j, 1);
              j = j - 1;
            }
          }
        }
        let aBorder = new Border();
        aBorder.lineList = lineList;
        borders.push(aBorder);
      }
    }
    return borders;
  }
  tracingContourLines(breaks) {
    const { _s0, _s1, _xs, _ys, _m, _n, _borders, _undefData } = this;
    let contourLineList = [];
    let cLineList;
    let dShift = breaks[0] * 1e-5;
    if (dShift === 0) {
      dShift = 1e-5;
    }
    for (let i = 0; i < _m; i++) {
      for (let j = 0; j < _n; j++) {
        if (!doubleEquals(_s0[i][j], _undefData)) {
          _s0[i][j] = _s0[i][j] + dShift;
        }
      }
    }
    let SB = [];
    let HB = [];
    SB[0] = [];
    SB[1] = [];
    HB[0] = [];
    HB[1] = [];
    for (let i = 0; i < _m; i++) {
      SB[0][i] = [];
      SB[1][i] = [];
      HB[0][i] = [];
      HB[1][i] = [];
      for (let j = 0; j < _n; j++) {
        if (j < _n - 1) {
          SB[0][i][j] = -1;
          SB[1][i][j] = -1;
        }
        if (i < _m - 1) {
          HB[0][i][j] = -1;
          HB[1][i][j] = -1;
        }
      }
    }
    let k, si, sj;
    let aijP, bijP;
    for (let i = 0; i < _borders.length; i++) {
      const aBorder = _borders[i];
      for (let j = 0; j < aBorder.getLineNum(); j++) {
        const aBLine = aBorder.lineList[j];
        const ijPList = aBLine.ijPointList;
        for (k = 0; k < ijPList.length - 1; k++) {
          aijP = ijPList[k];
          bijP = ijPList[k + 1];
          if (aijP.i === bijP.i) {
            si = aijP.i;
            sj = Math.min(aijP.j, bijP.j);
            SB[0][si][sj] = i;
            if (bijP.j > aijP.j) {
              SB[1][si][sj] = 1;
            } else {
              SB[1][si][sj] = 0;
            }
          } else {
            sj = aijP.j;
            si = Math.min(aijP.i, bijP.i);
            HB[0][si][sj] = i;
            if (bijP.i > aijP.i) {
              HB[1][si][sj] = 0;
            } else {
              HB[1][si][sj] = 1;
            }
          }
        }
      }
    }
    let S = [];
    let H = [];
    let w;
    let c;
    for (c = 0; c < breaks.length; c++) {
      w = breaks[c];
      for (let i = 0; i < _m; i++) {
        S[i] = [];
        H[i] = [];
        for (let j = 0; j < _n; j++) {
          if (j < _n - 1) {
            if (_s1[i][j] !== 0 && _s1[i][j + 1] !== 0) {
              if ((_s0[i][j] - w) * (_s0[i][j + 1] - w) < 0) {
                S[i][j] = (w - _s0[i][j]) / (_s0[i][j + 1] - _s0[i][j]);
              } else {
                S[i][j] = -2;
              }
            } else {
              S[i][j] = -2;
            }
          }
          if (i < _m - 1) {
            if (_s1[i][j] !== 0 && _s1[i + 1][j] !== 0) {
              if ((_s0[i][j] - w) * (_s0[i + 1][j] - w) < 0) {
                H[i][j] = (w - _s0[i][j]) / (_s0[i + 1][j] - _s0[i][j]);
              } else {
                H[i][j] = -2;
              }
            } else {
              H[i][j] = -2;
            }
          }
        }
      }
      cLineList = _Contour.isoline_UndefData(_s0, _xs, _ys, w, S, H, SB, HB, contourLineList.length);
      for (let ln of cLineList) {
        contourLineList.push(ln);
      }
    }
    for (let i = 0; i < _borders.length; i++) {
      const aBorder = _borders[i];
      const aBLine = aBorder.lineList[0];
      for (let j = 0; j < contourLineList.length; j++) {
        const aLine = contourLineList[j];
        if (aLine.type === "Close") {
          const aPoint = aLine.pointList[0];
          if (pointInPolygonByPList(aBLine.pointList, aPoint)) {
            aLine.borderIdx = i;
          }
        }
        contourLineList.splice(j, 1);
        contourLineList.splice(j, 0, aLine);
      }
    }
    return contourLineList;
  }
  tracingPolygons(cLineList, breaks) {
    const S0 = this._s0;
    const borderList = this._borders;
    let aPolygonList = [];
    let newPolygonList = [];
    let newBPList;
    let bPList = [];
    let PList;
    let aBorder;
    let aBLine;
    let aPoint;
    let aBPoint;
    let i, j;
    let lineList = [];
    let aBorderList = [];
    let aLine;
    let aPolygon;
    let aijP;
    let aValue = 0;
    let pNums;
    for (i = 0; i < borderList.length; i++) {
      aBorderList = [];
      bPList = [];
      lineList = [];
      aPolygonList = [];
      aBorder = borderList[i];
      aBLine = aBorder.lineList[0];
      PList = aBLine.pointList;
      if (!isClockwise(PList)) {
        PList.reverse();
      }
      if (aBorder.getLineNum() === 1) {
        for (j = 0; j < PList.length; j++) {
          aPoint = PList[j];
          aBPoint = new BorderPoint();
          aBPoint.id = -1;
          aBPoint.point = aPoint;
          aBPoint.value = S0[aBLine.ijPointList[j].i][aBLine.ijPointList[j].j];
          aBorderList.push(aBPoint);
        }
        for (j = 0; j < cLineList.length; j++) {
          aLine = cLineList[j];
          if (aLine.borderIdx === i) {
            lineList.push(aLine);
            if (aLine.type === "Border") {
              aPoint = aLine.pointList[0];
              aBPoint = new BorderPoint();
              aBPoint.id = lineList.length - 1;
              aBPoint.point = aPoint;
              aBPoint.value = aLine.value;
              bPList.push(aBPoint);
              aPoint = aLine.pointList[aLine.pointList.length - 1];
              aBPoint = new BorderPoint();
              aBPoint.id = lineList.length - 1;
              aBPoint.point = aPoint;
              aBPoint.value = aLine.value;
              bPList.push(aBPoint);
            }
          }
        }
        if (lineList.length === 0) {
          aijP = aBLine.ijPointList[0];
          aPolygon = new Polygon();
          if (S0[aijP.i][aijP.j] < breaks[0]) {
            aValue = breaks[0];
            aPolygon.isHighCenter = false;
          } else {
            for (j = breaks.length - 1; j >= 0; j--) {
              if (S0[aijP.i][aijP.j] > breaks[j]) {
                aValue = breaks[j];
                break;
              }
            }
            aPolygon.isHighCenter = true;
          }
          if (PList.length > 0) {
            aPolygon.isBorder = true;
            aPolygon.highValue = aValue;
            aPolygon.lowValue = aValue;
            aPolygon.extent = new Extent();
            aPolygon.area = getExtentAndArea(PList, aPolygon.extent);
            aPolygon.startPointIdx = 0;
            aPolygon.isClockWise = true;
            aPolygon.outLine.type = "Border";
            aPolygon.outLine.value = aValue;
            aPolygon.outLine.borderIdx = i;
            aPolygon.outLine.pointList = PList;
            aPolygon.holeLines = [];
            aPolygonList.push(aPolygon);
          }
        } else {
          if (bPList.length > 0) {
            newBPList = _Contour.insertPoint2Border(bPList, aBorderList);
          } else {
            newBPList = aBorderList;
          }
          aPolygonList = _Contour.tracingPolygons_Line_Border(lineList, newBPList);
        }
        aPolygonList = _Contour.addPolygonHoles(aPolygonList);
      } else {
        aBLine = aBorder.lineList[0];
        for (j = 0; j < cLineList.length; j++) {
          aLine = cLineList[j];
          if (aLine.borderIdx === i) {
            lineList.push(aLine);
            if (aLine.type === "Border") {
              aPoint = aLine.pointList[0];
              aBPoint = new BorderPoint();
              aBPoint.id = lineList.length - 1;
              aBPoint.point = aPoint;
              aBPoint.value = aLine.value;
              bPList.push(aBPoint);
              aPoint = aLine.pointList[aLine.pointList.length - 1];
              aBPoint = new BorderPoint();
              aBPoint.id = lineList.length - 1;
              aBPoint.point = aPoint;
              aBPoint.value = aLine.value;
              bPList.push(aBPoint);
            }
          }
        }
        if (lineList.length === 0) {
          aijP = aBLine.ijPointList[0];
          aPolygon = new Polygon();
          if (S0[aijP.i][aijP.j] < breaks[0]) {
            aValue = breaks[0];
            aPolygon.isHighCenter = false;
          } else {
            for (j = breaks.length - 1; j >= 0; j--) {
              if (S0[aijP.i][aijP.j] > breaks[j]) {
                aValue = breaks[j];
                break;
              }
            }
            aPolygon.isHighCenter = true;
          }
          if (PList.length > 0) {
            aPolygon.isBorder = true;
            aPolygon.highValue = aValue;
            aPolygon.lowValue = aValue;
            aPolygon.area = getExtentAndArea(PList, aPolygon.extent);
            aPolygon.startPointIdx = 0;
            aPolygon.isClockWise = true;
            aPolygon.outLine.type = "Border";
            aPolygon.outLine.value = aValue;
            aPolygon.outLine.borderIdx = i;
            aPolygon.outLine.pointList = PList;
            aPolygon.holeLines = [];
            aPolygonList.push(aPolygon);
          }
        } else {
          pNums = [];
          pNums.length = aBorder.getLineNum();
          newBPList = _Contour.insertPoint2Border_Ring(S0, bPList, aBorder, pNums);
          aPolygonList = tracingPolygons_Ring(lineList, newBPList, aBorder, breaks, pNums);
          let sortList = [];
          while (aPolygonList.length > 0) {
            let isInsert = false;
            for (j = 0; j < sortList.length; j++) {
              if (aPolygonList[0].area > sortList[j].area) {
                sortList.push(aPolygonList[0]);
                isInsert = true;
                break;
              }
            }
            if (!isInsert) {
              sortList.push(aPolygonList[0]);
            }
            aPolygonList.splice(0, 1);
          }
          aPolygonList = sortList;
        }
        let holeList = [];
        for (j = 0; j < aBorder.getLineNum(); j++) {
          holeList.push(aBorder.lineList[j].pointList);
        }
        if (holeList.length > 0) {
          addHoles_Ring(aPolygonList, holeList);
        }
        aPolygonList = addPolygonHoles_Ring(aPolygonList);
      }
      newPolygonList.push(...aPolygonList);
    }
    for (let nPolygon of newPolygonList) {
      if (!isClockwise(nPolygon.outLine.pointList)) {
        nPolygon.outLine.pointList.reverse();
      }
    }
    return newPolygonList;
  }
  static isoline_UndefData(S0, X, Y, W, S, H, SB, HB, lineNum) {
    let cLineList = [];
    let m, n, i, j;
    m = S0.length;
    n = S0[0].length;
    let i1, i2, j1, j2, i3 = 0, j3 = 0;
    let a2x, a2y, a3x = 0, a3y = 0, sx, sy;
    let aPoint;
    let aLine;
    let pList;
    let isS = true;
    let aEndPoint = new EndPoint();
    for (i = 0; i < m; i++) {
      for (j = 0; j < n; j++) {
        if (j < n - 1) {
          if (SB[0][i][j] > -1) {
            if (S[i][j] !== -2) {
              pList = [];
              i2 = i;
              j2 = j;
              a2x = X[j2] + S[i2][j2] * (X[j2 + 1] - X[j2]);
              a2y = Y[i2];
              if (SB[1][i][j] === 0) {
                i1 = -1;
                aEndPoint.sPoint.x = X[j + 1];
                aEndPoint.sPoint.y = Y[i];
              } else {
                i1 = i2;
                aEndPoint.sPoint.x = X[j];
                aEndPoint.sPoint.y = Y[i];
              }
              j1 = j2;
              aPoint = new PointD();
              aPoint.x = a2x;
              aPoint.y = a2y;
              pList.push(aPoint);
              aEndPoint.index = lineNum + cLineList.length;
              aEndPoint.point = aPoint;
              aEndPoint.borderIdx = SB[0][i][j];
              _Contour._endPointList.push(aEndPoint);
              aLine = new PolyLine();
              aLine.type = "Border";
              aLine.borderIdx = SB[0][i][j];
              while (true) {
                let ij3 = [i3, j3];
                let a3xy = [a3x, a3y];
                let IsS = [isS];
                if (canTraceIsoline_UndefData(i1, i2, H, S, j1, j2, X, Y, a2x, ij3, a3xy, IsS)) {
                  i3 = ij3[0];
                  j3 = ij3[1];
                  a3x = a3xy[0];
                  a3y = a3xy[1];
                  isS = IsS[0];
                  aPoint = new PointD();
                  aPoint.x = a3x;
                  aPoint.y = a3y;
                  pList.push(aPoint);
                  if (isS) {
                    if (SB[0][i3][j3] > -1) {
                      if (SB[1][i3][j3] === 0) {
                        aEndPoint.sPoint.x = X[j3 + 1];
                        aEndPoint.sPoint.y = Y[i3];
                      } else {
                        aEndPoint.sPoint.x = X[j3];
                        aEndPoint.sPoint.y = Y[i3];
                      }
                      break;
                    }
                  } else if (HB[0][i3][j3] > -1) {
                    if (HB[1][i3][j3] === 0) {
                      aEndPoint.sPoint.x = X[j3];
                      aEndPoint.sPoint.y = Y[i3];
                    } else {
                      aEndPoint.sPoint.x = X[j3];
                      aEndPoint.sPoint.y = Y[i3 + 1];
                    }
                    break;
                  }
                  a2x = a3x;
                  i1 = i2;
                  j1 = j2;
                  i2 = i3;
                  j2 = j3;
                } else {
                  aLine.type = "Error";
                  break;
                }
              }
              S[i][j] = -2;
              if (pList.length > 1 && !(aLine.type === "Error")) {
                aEndPoint.point = aPoint;
                _Contour._endPointList.push(aEndPoint);
                aLine.value = W;
                aLine.pointList = pList;
                cLineList.push(aLine);
              } else {
                _Contour._endPointList.pop();
              }
            }
          }
        }
        if (i < m - 1) {
          if (HB[0][i][j] > -1) {
            if (H[i][j] !== -2) {
              pList = [];
              i2 = i;
              j2 = j;
              a2x = X[j2];
              a2y = Y[i2] + H[i2][j2] * (Y[i2 + 1] - Y[i2]);
              i1 = i2;
              if (HB[1][i][j] === 0) {
                j1 = -1;
                aEndPoint.sPoint.x = X[j];
                aEndPoint.sPoint.y = Y[i];
              } else {
                j1 = j2;
                aEndPoint.sPoint.x = X[j];
                aEndPoint.sPoint.y = Y[i + 1];
              }
              aPoint = new PointD();
              aPoint.x = a2x;
              aPoint.y = a2y;
              pList.push(aPoint);
              aEndPoint.index = lineNum + cLineList.length;
              aEndPoint.point = aPoint;
              aEndPoint.borderIdx = HB[0][i][j];
              _Contour._endPointList.push(aEndPoint);
              aLine = new PolyLine();
              aLine.type = "Border";
              aLine.borderIdx = HB[0][i][j];
              while (true) {
                let ij3 = [i3, j3];
                let a3xy = [a3x, a3y];
                let IsS = [isS];
                if (canTraceIsoline_UndefData(i1, i2, H, S, j1, j2, X, Y, a2x, ij3, a3xy, IsS)) {
                  i3 = ij3[0];
                  j3 = ij3[1];
                  a3x = a3xy[0];
                  a3y = a3xy[1];
                  isS = IsS[0];
                  aPoint = new PointD();
                  aPoint.x = a3x;
                  aPoint.y = a3y;
                  pList.push(aPoint);
                  if (isS) {
                    if (SB[0][i3][j3] > -1) {
                      if (SB[1][i3][j3] === 0) {
                        aEndPoint.sPoint.x = X[j3 + 1];
                        aEndPoint.sPoint.y = Y[i3];
                      } else {
                        aEndPoint.sPoint.x = X[j3];
                        aEndPoint.sPoint.y = Y[i3];
                      }
                      break;
                    }
                  } else if (HB[0][i3][j3] > -1) {
                    if (HB[1][i3][j3] === 0) {
                      aEndPoint.sPoint.x = X[j3];
                      aEndPoint.sPoint.y = Y[i3];
                    } else {
                      aEndPoint.sPoint.x = X[j3];
                      aEndPoint.sPoint.y = Y[i3 + 1];
                    }
                    break;
                  }
                  a2x = a3x;
                  i1 = i2;
                  j1 = j2;
                  i2 = i3;
                  j2 = j3;
                } else {
                  aLine.type = "Error";
                  break;
                }
              }
              H[i][j] = -2;
              if (pList.length > 1 && !(aLine.type === "Error")) {
                aEndPoint.point = aPoint;
                _Contour._endPointList.push(aEndPoint);
                aLine.value = W;
                aLine.pointList = pList;
                cLineList.push(aLine);
              } else {
                _Contour._endPointList.pop();
              }
            }
          }
        }
      }
    }
    for (j = 0; j < n - 1; j++) {
      if (S[0][j] !== -2) {
        S[0][j] = -2;
      }
      if (S[m - 1][j] !== -2) {
        S[m - 1][j] = -2;
      }
    }
    for (i = 0; i < m - 1; i++) {
      if (H[i][0] !== -2) {
        H[i][0] = -2;
      }
      if (H[i][n - 1] !== -2) {
        H[i][n - 1] = -2;
      }
    }
    for (i = 1; i < m - 2; i++) {
      for (j = 1; j < n - 1; j++) {
        if (H[i][j] !== -2) {
          let pointList = [];
          i2 = i;
          j2 = j;
          a2x = X[j2];
          a2y = Y[i] + H[i][j2] * (Y[i + 1] - Y[i]);
          j1 = -1;
          i1 = i2;
          sx = a2x;
          sy = a2y;
          aPoint = new PointD();
          aPoint.x = a2x;
          aPoint.y = a2y;
          pointList.push(aPoint);
          aLine = new PolyLine();
          aLine.type = "Close";
          while (true) {
            let ij3 = [];
            let a3xy = [];
            let IsS = [];
            if (canTraceIsoline_UndefData(i1, i2, H, S, j1, j2, X, Y, a2x, ij3, a3xy, IsS)) {
              i3 = ij3[0];
              j3 = ij3[1];
              a3x = a3xy[0];
              a3y = a3xy[1];
              aPoint = new PointD();
              aPoint.x = a3x;
              aPoint.y = a3y;
              pointList.push(aPoint);
              if (Math.abs(a3y - sy) < 1e-6 && Math.abs(a3x - sx) < 1e-6) {
                break;
              }
              a2x = a3x;
              i1 = i2;
              j1 = j2;
              i2 = i3;
              j2 = j3;
            } else {
              aLine.type = "Error";
              break;
            }
          }
          H[i][j] = -2;
          if (pointList.length > 1 && !(aLine.type === "Error")) {
            aLine.value = W;
            aLine.pointList = pointList;
            cLineList.push(aLine);
          }
        }
      }
    }
    for (i = 1; i < m - 1; i++) {
      for (j = 1; j < n - 2; j++) {
        if (S[i][j] !== -2) {
          let pointList = [];
          i2 = i;
          j2 = j;
          a2x = X[j2] + S[i][j] * (X[j2 + 1] - X[j2]);
          a2y = Y[i];
          j1 = j2;
          i1 = -1;
          sx = a2x;
          sy = a2y;
          aPoint = new PointD();
          aPoint.x = a2x;
          aPoint.y = a2y;
          pointList.push(aPoint);
          aLine = new PolyLine();
          aLine.type = "Close";
          while (true) {
            let ij3 = [];
            let a3xy = [];
            let IsS = [];
            if (canTraceIsoline_UndefData(i1, i2, H, S, j1, j2, X, Y, a2x, ij3, a3xy, IsS)) {
              i3 = ij3[0];
              j3 = ij3[1];
              a3x = a3xy[0];
              a3y = a3xy[1];
              aPoint = new PointD();
              aPoint.x = a3x;
              aPoint.y = a3y;
              pointList.push(aPoint);
              if (Math.abs(a3y - sy) < 1e-6 && Math.abs(a3x - sx) < 1e-6) {
                break;
              }
              a2x = a3x;
              i1 = i2;
              j1 = j2;
              i2 = i3;
              j2 = j3;
            } else {
              aLine.type = "Error";
              break;
            }
          }
          S[i][j] = -2;
          if (pointList.length > 1 && !(aLine.type === "Error")) {
            aLine.value = W;
            aLine.pointList = pointList;
            cLineList.push(aLine);
          }
        }
      }
    }
    return cLineList;
  }
  static tracingPolygons_Line_Border(LineList, borderList) {
    if (LineList.length === 0) {
      return [];
    }
    let aPolygonList = [];
    let aLineList = [];
    let aLine;
    let aPoint;
    let aPolygon;
    let aBound;
    let i, j;
    aLineList.push(...LineList);
    let aPList;
    let newPList;
    let bP;
    let timesArray = [];
    timesArray.length = borderList.length - 1;
    for (i = 0; i < timesArray.length; i++) {
      timesArray[i] = 0;
    }
    let pIdx, pNum, vNum, vvNum;
    let aValue = 0, bValue = 0, cValue = 0;
    let lineBorderList = [];
    pNum = borderList.length - 1;
    for (i = 0; i < pNum; i++) {
      if (borderList[i].id === -1) {
        continue;
      }
      pIdx = i;
      aPList = [];
      lineBorderList.push(borderList[i]);
      if (timesArray[pIdx] < 2) {
        aPList.push(borderList[pIdx].point);
        pIdx += 1;
        if (pIdx === pNum) {
          pIdx = 0;
        }
        vNum = 0;
        vvNum = 0;
        while (true) {
          bP = borderList[pIdx];
          if (bP.id === -1) {
            if (timesArray[pIdx] === 1) {
              break;
            }
            cValue = bP.value;
            vvNum += 1;
            aPList.push(bP.point);
            timesArray[pIdx] += 1;
          } else {
            if (timesArray[pIdx] === 2) {
              break;
            }
            timesArray[pIdx] += 1;
            aLine = aLineList[bP.id];
            if (vNum === 0) {
              aValue = aLine.value;
              bValue = aLine.value;
              vNum += 1;
            } else {
              if (aLine.value > aValue) {
                bValue = aLine.value;
              } else if (aLine.value < aValue) {
                aValue = aLine.value;
              }
              vNum += 1;
            }
            newPList = [];
            newPList.push(...aLine.pointList);
            aPoint = newPList[0];
            if (!(bP.point.x === aPoint.x && bP.point.y === aPoint.y)) {
              newPList.reverse();
            }
            aPList.push(...newPList);
            for (j = 0; j < borderList.length - 1; j++) {
              if (j !== pIdx) {
                if (borderList[j].id === bP.id) {
                  pIdx = j;
                  timesArray[pIdx] += 1;
                  break;
                }
              }
            }
          }
          if (pIdx === i) {
            if (aPList.length > 0) {
              aPolygon = new Polygon();
              aPolygon.isBorder = true;
              aPolygon.lowValue = aValue;
              aPolygon.highValue = bValue;
              aBound = new Extent();
              aPolygon.area = getExtentAndArea(aPList, aBound);
              aPolygon.isClockWise = true;
              aPolygon.startPointIdx = lineBorderList.length - 1;
              aPolygon.extent = aBound;
              aPolygon.outLine.pointList = aPList;
              aPolygon.outLine.value = aValue;
              aPolygon.isHighCenter = true;
              aPolygon.holeLines = [];
              if (vvNum > 0) {
                if (cValue < aValue) {
                  aPolygon.isHighCenter = false;
                  aPolygon.highValue = aValue;
                }
              }
              aPolygon.outLine.type = "Border";
              aPolygonList.push(aPolygon);
            }
            break;
          }
          pIdx += 1;
          if (pIdx === pNum) {
            pIdx = 0;
          }
        }
      }
      pIdx = i;
      if (timesArray[pIdx] < 2) {
        aPList = [];
        aPList.push(borderList[pIdx].point);
        pIdx += -1;
        if (pIdx === -1) {
          pIdx = pNum - 1;
        }
        vNum = 0;
        vvNum = 0;
        while (true) {
          bP = borderList[pIdx];
          if (bP.id === -1) {
            if (timesArray[pIdx] === 1) {
              break;
            }
            cValue = bP.value;
            vvNum += 1;
            aPList.push(bP.point);
            timesArray[pIdx] += 1;
          } else {
            if (timesArray[pIdx] === 2) {
              break;
            }
            timesArray[pIdx] += 1;
            aLine = aLineList[bP.id];
            if (vNum === 0) {
              aValue = aLine.value;
              bValue = aLine.value;
              vNum += 1;
            } else {
              if (aLine.value > aValue) {
                bValue = aLine.value;
              } else if (aLine.value < aValue) {
                aValue = aLine.value;
              }
              vNum += 1;
            }
            newPList = [];
            newPList.push(...aLine.pointList);
            aPoint = newPList[0];
            if (!(bP.point.x === aPoint.x && bP.point.y === aPoint.y)) {
              newPList.reverse();
            }
            aPList.push(...newPList);
            for (j = 0; j < borderList.length - 1; j++) {
              if (j !== pIdx) {
                if (borderList[j].id === bP.id) {
                  pIdx = j;
                  timesArray[pIdx] += 1;
                  break;
                }
              }
            }
          }
          if (pIdx === i) {
            if (aPList.length > 0) {
              aPolygon = new Polygon();
              aPolygon.isBorder = true;
              aPolygon.lowValue = aValue;
              aPolygon.highValue = bValue;
              aBound = new Extent();
              aPolygon.area = getExtentAndArea(aPList, aBound);
              aPolygon.isClockWise = false;
              aPolygon.startPointIdx = lineBorderList.length - 1;
              aPolygon.extent = aBound;
              aPolygon.outLine.pointList = aPList;
              aPolygon.outLine.value = aValue;
              aPolygon.isHighCenter = true;
              aPolygon.holeLines = [];
              if (vvNum > 0) {
                if (cValue < aValue) {
                  aPolygon.isHighCenter = false;
                  aPolygon.highValue = aValue;
                }
              }
              aPolygon.outLine.type = "Border";
              aPolygonList.push(aPolygon);
            }
            break;
          }
          pIdx += -1;
          if (pIdx === -1) {
            pIdx = pNum - 1;
          }
        }
      }
    }
    let cPolygonlist = [];
    let isInserted;
    for (i = 0; i < aLineList.length; i++) {
      aLine = aLineList[i];
      if (aLine.type === "Close" && aLine.pointList.length > 0) {
        aPolygon = new Polygon();
        aPolygon.isBorder = false;
        aPolygon.lowValue = aLine.value;
        aPolygon.highValue = aLine.value;
        aBound = new Extent();
        aPolygon.area = getExtentAndArea(aLine.pointList, aBound);
        aPolygon.isClockWise = isClockwise(aLine.pointList);
        aPolygon.extent = aBound;
        aPolygon.outLine = aLine;
        aPolygon.isHighCenter = true;
        aPolygon.holeLines = [];
        isInserted = false;
        for (j = 0; j < cPolygonlist.length; j++) {
          if (aPolygon.area > cPolygonlist[j].area) {
            cPolygonlist.splice(j, 0, aPolygon);
            isInserted = true;
            break;
          }
        }
        if (!isInserted) {
          cPolygonlist.push(aPolygon);
        }
      }
    }
    aPolygonList = judgePolygonHighCenter(aPolygonList, cPolygonlist, aLineList, borderList);
    return aPolygonList;
  }
  static addPolygonHoles(polygonList) {
    let holePolygons = [];
    let i, j;
    for (i = 0; i < polygonList.length; i++) {
      let aPolygon = polygonList[i];
      if (!aPolygon.isBorder) {
        aPolygon.holeIndex = 1;
        holePolygons.push(aPolygon);
      }
    }
    if (holePolygons.length === 0) {
      return polygonList;
    } else {
      let newPolygons = [];
      for (i = 1; i < holePolygons.length; i++) {
        let aPolygon = holePolygons[i];
        for (j = i - 1; j >= 0; j--) {
          let bPolygon = holePolygons[j];
          if (bPolygon.extent.include(aPolygon.extent)) {
            if (pointInPolygonByPList(bPolygon.outLine.pointList, aPolygon.outLine.pointList[0])) {
              aPolygon.holeIndex = bPolygon.holeIndex + 1;
              bPolygon.addHole(aPolygon);
              break;
            }
          }
        }
      }
      let hole1Polygons = [];
      for (i = 0; i < holePolygons.length; i++) {
        if (holePolygons[i].holeIndex === 1) {
          hole1Polygons.push(holePolygons[i]);
        }
      }
      for (i = 0; i < polygonList.length; i++) {
        let aPolygon = polygonList[i];
        if (aPolygon.isBorder === true) {
          for (j = 0; j < hole1Polygons.length; j++) {
            let bPolygon = hole1Polygons[j];
            if (aPolygon.extent.include(bPolygon.extent)) {
              if (pointInPolygonByPList(aPolygon.outLine.pointList, bPolygon.outLine.pointList[0])) {
                aPolygon.addHole(bPolygon);
              }
            }
          }
          newPolygons.push(aPolygon);
        }
      }
      newPolygons.push(...holePolygons);
      return newPolygons;
    }
  }
  tracingStreamline(U, V, X, Y, UNDEF, density) {
    let streamLines = [];
    let xNum = U[1].length;
    let yNum = U.length;
    let Dx = [];
    let Dy = [];
    let deltX = X[1] - X[0];
    let deltY = Y[1] - Y[0];
    if (density === 0) {
      density = 1;
    }
    let radius = deltX / Math.pow(density, 2);
    let smallRadius = radius * 1.5;
    let i, j;
    for (i = 0; i < yNum; i++) {
      Dx[i] = [];
      Dy[i] = [];
      for (j = 0; j < xNum; j++) {
        if (Math.abs(U[i][j] / UNDEF - 1) < 0.01) {
          Dx[i][j] = 0.1;
          Dy[i][j] = 0.1;
        } else {
          let WS = Math.sqrt(U[i][j] * U[i][j] + V[i][j] * V[i][j]);
          if (WS === 0) {
            WS = 1;
          }
          Dx[i][j] = U[i][j] / WS * deltX / density;
          Dy[i][j] = V[i][j] / WS * deltY / density;
        }
      }
    }
    let SPoints = [];
    let flags = [];
    for (i = 0; i < yNum - 1; i++) {
      SPoints[i] = [];
      flags[i] = [];
      for (j = 0; j < xNum - 1; j++) {
        if (i % 2 === 0 && j % 2 === 0) {
          flags[i][j] = 0;
        } else {
          flags[i][j] = 1;
        }
        SPoints[i][j] = [];
      }
    }
    let dis;
    let borderP;
    let lineN = 0;
    for (i = 0; i < yNum - 1; i++) {
      for (j = 0; j < xNum - 1; j++) {
        if (flags[i][j] === 0) {
          let pList = [];
          let aPoint = new PointD();
          let ii, jj;
          let loopN;
          let aPL = new PolyLine();
          aPoint.x = X[j] + deltX / 2;
          aPoint.y = Y[i] + deltY / 2;
          pList.push(aPoint.clone());
          borderP = new BorderPoint();
          borderP.point = aPoint.clone();
          borderP.id = lineN;
          SPoints[i][j].push(borderP);
          flags[i][j] = 1;
          ii = i;
          jj = j;
          let loopLimit = 500;
          loopN = 0;
          while (loopN < loopLimit) {
            let iijj = [];
            iijj[0] = ii;
            iijj[1] = jj;
            let isInDomain = tracingStreamlinePoint(aPoint, Dx, Dy, X, Y, iijj, true);
            ii = iijj[0];
            jj = iijj[1];
            if (isInDomain) {
              if (Math.abs(U[ii][jj] / UNDEF - 1) < 0.01 || Math.abs(U[ii][jj + 1] / UNDEF - 1) < 0.01 || Math.abs(U[ii + 1][jj] / UNDEF - 1) < 0.01 || Math.abs(U[ii + 1][jj + 1] / UNDEF - 1) < 0.01) {
                break;
              } else {
                let isTerminating = false;
                for (let sPoint of SPoints[ii][jj]) {
                  if (Math.sqrt((aPoint.x - sPoint.point.x) * (aPoint.x - sPoint.point.x) + (aPoint.y - sPoint.point.y) * (aPoint.y - sPoint.point.y)) < radius) {
                    isTerminating = true;
                    break;
                  }
                }
                if (!isTerminating) {
                  if (SPoints[ii][jj].length > 1) {
                    let pointStart = SPoints[ii][jj][0];
                    let pointEnd = SPoints[ii][jj][1];
                    if (!(lineN === pointStart.id && lineN === pointEnd.id)) {
                      dis = distance_point2line(pointStart.point, pointEnd.point, aPoint);
                      if (dis < smallRadius) {
                        isTerminating = true;
                      }
                    }
                  }
                }
                if (!isTerminating) {
                  pList.push(aPoint.clone());
                  borderP = new BorderPoint();
                  borderP.point = aPoint.clone();
                  borderP.id = lineN;
                  SPoints[ii][jj].push(borderP);
                  flags[ii][jj] = 1;
                } else {
                  break;
                }
              }
            } else {
              break;
            }
            loopN += 1;
          }
          aPoint.x = X[j] + deltX / 2;
          aPoint.y = Y[i] + deltY / 2;
          ii = i;
          jj = j;
          loopN = 0;
          while (loopN < loopLimit) {
            let iijj = [];
            iijj[0] = ii;
            iijj[1] = jj;
            let isInDomain = tracingStreamlinePoint(aPoint, Dx, Dy, X, Y, iijj, false);
            ii = iijj[0];
            jj = iijj[1];
            if (isInDomain) {
              if (Math.abs(U[ii][jj] / UNDEF - 1) < 0.01 || Math.abs(U[ii][jj + 1] / UNDEF - 1) < 0.01 || Math.abs(U[ii + 1][jj] / UNDEF - 1) < 0.01 || Math.abs(U[ii + 1][jj + 1] / UNDEF - 1) < 0.01) {
                break;
              } else {
                let isTerminating = false;
                for (let sPoint of SPoints[ii][jj]) {
                  if (Math.sqrt((aPoint.x - sPoint.point.x) * (aPoint.x - sPoint.point.x) + (aPoint.y - sPoint.point.y) * (aPoint.y - sPoint.point.y)) < radius) {
                    isTerminating = true;
                    break;
                  }
                }
                if (!isTerminating) {
                  if (SPoints[ii][jj].length > 1) {
                    let pointStart = SPoints[ii][jj][0];
                    let pointEnd = SPoints[ii][jj][1];
                    if (!(lineN === pointStart.id && lineN === pointEnd.id)) {
                      dis = distance_point2line(pointStart.point, pointEnd.point, aPoint);
                      if (dis < smallRadius) {
                        isTerminating = true;
                      }
                    }
                  }
                }
                if (!isTerminating) {
                  pList.splice(0, 0, aPoint.clone());
                  borderP = new BorderPoint();
                  borderP.point = aPoint.clone();
                  borderP.id = lineN;
                  SPoints[ii][jj].push(borderP);
                  flags[ii][jj] = 1;
                } else {
                  break;
                }
              }
            } else {
              break;
            }
            loopN += 1;
          }
          if (pList.length > 1) {
            aPL.pointList = pList;
            streamLines.push(aPL);
            lineN += 1;
          }
        }
      }
    }
    return streamLines;
  }
  static insertPoint2Border(bPList, aBorderList) {
    let aBPoint, bP;
    let i, j;
    let p1, p2, p3;
    let BorderList = [];
    BorderList.push(...aBorderList);
    for (i = 0; i < bPList.length; i++) {
      bP = bPList[i];
      p3 = bP.point;
      aBPoint = BorderList[0];
      p1 = aBPoint.point;
      for (j = 1; j < BorderList.length; j++) {
        aBPoint = BorderList[j];
        p2 = aBPoint.point;
        if ((p3.x - p1.x) * (p3.x - p2.x) <= 0) {
          if ((p3.y - p1.y) * (p3.y - p2.y) <= 0) {
            if ((p3.x - p1.x) * (p2.y - p1.y) - (p2.x - p1.x) * (p3.y - p1.y) === 0) {
              BorderList.splice(j, 0, bP);
              break;
            }
          }
        }
        p1 = p2;
      }
    }
    return BorderList;
  }
  static insertPoint2Border_Ring(S0, bPList, aBorder, pNums) {
    let aBPoint, bP;
    let i, j, k;
    let p1, p2, p3;
    let aBLine;
    let newBPList = [], tempBPList = [], tempBPList1 = [];
    for (k = 0; k < aBorder.getLineNum(); k++) {
      aBLine = aBorder.lineList[k];
      tempBPList = [];
      for (i = 0; i < aBLine.pointList.length; i++) {
        aBPoint = new BorderPoint();
        aBPoint.id = -1;
        aBPoint.borderIdx = k;
        aBPoint.point = aBLine.pointList[i];
        aBPoint.value = S0[aBLine.ijPointList[i].i][aBLine.ijPointList[i].j];
        tempBPList.push(aBPoint);
      }
      for (i = 0; i < bPList.length; i++) {
        bP = bPList[i].clone();
        bP.borderIdx = k;
        p3 = bP.point;
        p1 = tempBPList[0].point.clone();
        for (j = 1; j < tempBPList.length; j++) {
          p2 = tempBPList[j].point.clone();
          if ((p3.x - p1.x) * (p3.x - p2.x) <= 0) {
            if ((p3.y - p1.y) * (p3.y - p2.y) <= 0) {
              if ((p3.x - p1.x) * (p2.y - p1.y) - (p2.x - p1.x) * (p3.y - p1.y) === 0) {
                tempBPList.splice(j, 0, bP);
                break;
              }
            }
          }
          p1 = p2;
        }
      }
      tempBPList1 = [];
      for (i = 0; i < tempBPList.length; i++) {
        bP = tempBPList[i];
        bP.bInnerIdx = i;
        tempBPList1.push(bP);
      }
      pNums[k] = tempBPList1.length;
      newBPList.push(...tempBPList1);
    }
    return newBPList;
  }
};
let Contour = _Contour;
Contour._endPointList = [];
function BSpline(pointList, t, i) {
  const f = fb(t);
  let x = 0;
  let y = 0;
  for (let j = 0; j < 4; j++) {
    const aPoint = pointList[i + j];
    x = x + f[j] * aPoint.x;
    y = y + f[j] * aPoint.y;
  }
  return [x, y];
}
function f0(t) {
  return 1 / 6 * (-t + 1) * (-t + 1) * (-t + 1);
}
function f1(t) {
  return 1 / 6 * (3 * t * t * t - 6 * t * t + 4);
}
function f2(t) {
  return 1 / 6 * (-3 * t * t * t + 3 * t * t + 3 * t + 1);
}
function f3(t) {
  return 1 / 6 * t * t * t;
}
function fb(t) {
  return [f0(t), f1(t), f2(t), f3(t)];
}
function BSplineScanning(pointList, sum) {
  let t;
  let i;
  let X, Y;
  let aPoint;
  let newPList = [];
  if (sum < 4) {
    return null;
  }
  let isClose = false;
  aPoint = pointList[0];
  let bPoint = pointList[sum - 1];
  if (aPoint.x === bPoint.x && aPoint.y === bPoint.y) {
    pointList.splice(0, 1);
    pointList.push(pointList[0]);
    pointList.push(pointList[1]);
    pointList.push(pointList[2]);
    pointList.push(pointList[3]);
    pointList.push(pointList[4]);
    pointList.push(pointList[5]);
    pointList.push(pointList[6]);
    isClose = true;
  }
  sum = pointList.length;
  for (i = 0; i < sum - 3; i++) {
    for (t = 0; t <= 1; t += 0.05) {
      let xy = BSpline(pointList, t, i);
      X = xy[0];
      Y = xy[1];
      if (isClose) {
        if (i > 3) {
          aPoint = new PointD();
          aPoint.x = X;
          aPoint.y = Y;
          newPList.push(aPoint);
        }
      } else {
        aPoint = new PointD();
        aPoint.x = X;
        aPoint.y = Y;
        newPList.push(aPoint);
      }
    }
  }
  if (isClose) {
    newPList.push(newPList[0]);
  } else {
    newPList.splice(0, 0, pointList[0]);
    newPList.push(pointList[pointList.length - 1]);
  }
  return newPList;
}
function smoothLines(aLineList) {
  let newLineList = [];
  for (let i = 0; i < aLineList.length; i++) {
    const aline = aLineList[i];
    const newPList = aline.pointList;
    if (newPList.length <= 1) {
      continue;
    }
    if (newPList.length === 2) {
      let bP = new PointD();
      let aP = newPList[0];
      let cP = newPList[1];
      bP.x = (cP.x - aP.x) / 4 + aP.x;
      bP.y = (cP.y - aP.y) / 4 + aP.y;
      newPList.splice(1, 0, bP);
      bP = new PointD();
      bP.x = (cP.x - aP.x) / 4 * 3 + aP.x;
      bP.y = (cP.y - aP.y) / 4 * 3 + aP.y;
      newPList.splice(2, 0, bP);
    }
    if (newPList.length === 3) {
      let bP = new PointD();
      let aP = newPList[0];
      let cP = newPList[1];
      bP.x = (cP.x - aP.x) / 2 + aP.x;
      bP.y = (cP.y - aP.y) / 2 + aP.y;
      newPList.splice(1, 0, bP);
    }
    const smoothedPList = BSplineScanning(newPList, newPList.length);
    aline.pointList = smoothedPList;
    newLineList.push(aline);
  }
  return newLineList;
}
function getLineStringFeature(line, legend) {
  const coordinates = line.pointList.map((point) => [point.x, point.y]);
  return {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates
    },
    properties: { value: line.value, style: { color: getColor(legend, line.value) } }
  };
}
function isolines(lines, legend) {
  const features = [];
  for (const line of lines) {
    const feature = getLineStringFeature(line, legend);
    features.push(feature);
  }
  return {
    type: "FeatureCollection",
    features
  };
}

function getPolygonFeature(polygon, breaks, legend) {
  const { outLine, holeLines } = polygon;
  const coordinates = outLine.pointList.map((point) => [point.x, point.y]);
  const polygonCoordinates = [coordinates];
  let value = outLine.value;
  if (polygon.isHighCenter) {
    const idx = breaks.indexOf(polygon.lowValue);
    if (idx >= 0 && idx < breaks.length - 1) {
      value = breaks[idx + 1];
    } else {
      value = polygon.lowValue;
    }
  }
  if (polygon.hasHoles()) {
    for (let i = 0; i < holeLines.length; i++) {
      const hole = holeLines[i];
      const holeCoors = [];
      for (let _b = 0, _c = hole.pointList; _b < _c.length; _b++) {
        const pt = _c[_b];
        holeCoors.push([pt.x, pt.y]);
      }
      polygonCoordinates.push(holeCoors);
    }
  }
  return {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: polygonCoordinates
    },
    properties: { value, style: { color: getColor(legend, value) } }
  };
}
function isobands(polygons, breaks, legend) {
  const features = [];
  for (const polygon of polygons) {
    const feature = getPolygonFeature(polygon, breaks, legend);
    features.push(feature);
  }
  return {
    type: "FeatureCollection",
    features
  };
}
// export { Contour, isobands, isolines, smoothLines };
