import * as mars3d from "mars3d"
import axios from "axios"
export let map // mars3d.Map三维地图对象
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 28, lng: 70, alt: 4964001, heading: 0, pitch: -90 }
  },
  // 方式1：在创建地球前的参数中配置
  basemaps: [{
        id: 1,
        name: "地图底图",
        type: "group"
      },
      {
        pid: 1,
        name: "Pakistan Map",
        icon: "img/basemaps/osm.png",
        type: "wms",
        layerType: "base",
        url: "http://47.94.18.73:8188/geoserver/GisServer/wms",
        layers: "GisServer:continents_Project",
        crs: "EPSG:4326",
        parameters: {
          transparent: true,
          format: "image/png"
        },
        zIndex: 0,
        enablePickFeatures: false,
        alpha: 0.9,
        show: true
      },
      {
        pid: 10,
        name: "Black Map",
        icon: "/img/basemaps/bd-c-dark.png",
        type: "tencent",
        layerType: "base",
        layer: "custom",
        isPrivate: true,
        style: "4",
        show: false
      },
      {
        pid: 1,
        name: "蓝色底图",
        icon: "img/basemaps/bd-c-midnight.png",
        type: "xyz",
        layerType: "base",
        url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
        chinaCRS: "GCJ02",
        enablePickFeatures: false
      },
      {
        pid: 1,
        name: "腾讯影像",
        icon: "img/basemaps/tencent_img.png",
        type: "group",
        layerType: "base",
        layers: [{
            name: "底图",
            type: "tencent",
            layer: "img_d"
          },
          {
            name: "注记",
            type: "tencent",
            layer: "img_z"
          }
        ]
      }
    ]
}
let warningLayer
export let graphicLayer // 矢量图层对象
export let infoLayer // 矢量图层对象
let mapSplit

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
  // 构造bloom效果 用于滑动条测试
  
  eventTarget.fire("init", {
    value: 10
  })
  warningLayer = new mars3d.layer.GraphicLayer({
    hasEdit: true,
    isAutoEditing: true // 绘制完成后是否自动激活编辑
  })
  map.addLayer(warningLayer)
  warningLayer.on(mars3d.EventType.click, function (event) {
      console.log("监听layer，单击了矢量对象", event)
    })
  bindLayerContextMenu() // 在图层绑定右键菜单,对所有加到这个图层的矢量数据都生效
  
  infoLayer = new mars3d.layer.GraphicLayer({
    // isRestorePositions: true,
    name: "TextInfo",
    layerType: "base"
  })
  map.addLayer(infoLayer)
  
  
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  console.log("onUnmounted执行了")
  map.graphicLayer.clear()
  
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


export function showWarnData(times, params, data, boundaries) {

  warningLayer.loadGeoJSON(data)
  warningLayer.setOpacity(0.5)
  console.info(data)
  drawLabel1(params[6] + " " + params[4] + " " + "Warning")
  drawLabel2(params[1].substring(5, 16) + "-" + params[2].substring(5, 16))
}


export function drawLabel1(title) {
  const graphic = infoLayer.getGraphicById("titleInfo")
  if (graphic == null) {
    infoLayer.addGraphic({
      id: "titleInfo",
      name: title,
      position: [66, 37],
      type: "label",
      style: {
        text: title,
        color: "#0081c2",
        font_size: 32,
        outline: true,
        outlineColor: "#ffffff",
        outlineWidth: 2
      }
    })
  } else {
    graphic.setOptions({
      id: "titleInfo",
      name: title,
      position: [67, 37],
      type: "label",
      style: {
        text: title,
        color: "#0081c2",
        font_size: 32,
        outline: true,
        outlineColor: "#ffffff",
        outlineWidth: 2
      }
    })
  }
}
export function drawLabel2(time) {
  const graphic = infoLayer.getGraphicById("timeInfo")
  if (graphic == null) {
    infoLayer.addGraphic({
      id: "timeInfo",
      name: time,
      position: [67, 36],
      type: "label",
      style: {
        text: time + "(PAK)",
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
        text: time + "(PAK)",
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

// 绑定右键菜单
export function bindLayerContextMenu() {
  warningLayer.bindContextMenu([
    {
      text: "开始编辑对象",
      icon: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic || !graphic.hasEdit) {
          return false
        }
        return !graphic.isEditing
      },
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          warningLayer.startEditing(graphic)
        }
      }
    },
    {
      text: "停止编辑对象",
      icon: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic || !graphic.hasEdit) {
          return false
        }
        return graphic.isEditing
      },
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          graphic.stopEditing()
        }
      }
    },
    {
      text: "删除对象",
      icon: "fa fa-trash-o",
      show: (event) => {
        const graphic = event.graphic
        if (!graphic || graphic.isDestroy) {
          return false
        } else {
          return true
        }
      },
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return
        }
        const parent = graphic.parent // 右击是编辑点时
        warningLayer.removeGraphic(graphic)
        if (parent) {
          warningLayer.removeGraphic(parent)
        }
      }
    },
    // {
    //   text: "计算周长",
    //   icon: "fa fa-medium",
    //   callback: (e) => {
    //     const graphic = e.graphic
    //     const strDis = mars3d.MeasureUtil.formatDistance(graphic.distance)
    //     globalAlert("该区域的周长为:" + strDis)
    //   }
    // },
    {
      text: "计算面积",
      icon: "fa fa-reorder",
      callback: (e) => {
        const graphic = e.graphic
        const strArea = mars3d.MeasureUtil.formatArea(graphic.area)
        globalAlert("该区域的面积为:" + strArea)
      }
    }
  ])
}
