/**
 * 图层管理
 * @copyright 火星科技 mars3d.cn
 * @author 火星吴彦祖 2022-01-10
 */
import * as mars3d from "mars3d"
const Cesium = mars3d.Cesium

let map // 地图对象
export let graphicLayer // 矢量图层对象
export const eventTarget = new mars3d.BaseClass()
/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance 

  graphicLayer = new mars3d.layer.GraphicLayer({
    // isRestorePositions: true,
    name: "图像配置",
    hasEdit: true,
    isAutoEditing: true // 绘制完成后是否自动激活编辑
  })
  map.addLayer(graphicLayer)
    const geoJsonLayer = new mars3d.layer.GeoJsonLayer({
    url: "//data.mars3d.cn/file/geojson/areas/340100.json",
    mask: true, // 标识为遮罩层【重点参数】
    symbol: {
      styleOptions: {
        fill: true,
        color: "rgb(2,26,79)",
        opacity: 0.9,
        outline: false,
        arcType: Cesium.ArcType.GEODESIC,
        clampToGround: true
      }
    }
    // flyTo: true
  })
  map.addLayer(geoJsonLayer)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 查看场景出图
export function showMapImg(options = {}) {
  return map.expImage({ download: false, ...options }).then((result) => {
    const extent = map.getExtent()
    return result.image
  })
}


export function drawLogo() {
  graphicLayer.startDraw({
    name: "单位Logo",
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

export function drawLegend() {
  graphicLayer.startDraw({
    name: "单位Logo",
    type: "billboard",
    style: {
      image: "img/legend/color_bar_1670_air_mass.png",
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
export function drawLabel1() {
  graphicLayer.startDraw({
    name: "一级标题",
    type: "label",
    style: {
      text: "巴基斯坦全国风场产品",
      color: "#0081c2",
      font_size: 40,
      outline: true,
      outlineColor: "#ffffff",
      outlineWidth: 2
    }
  })
}
export function drawLabel2(text) {
  graphicLayer.startDraw({
    name: "二级标题",
    type: "label",
    style: {
      text: "2023/03/01 00:00:00",
      color: "#0081c2",
      font_size: 20,
      outline: true,
      outlineColor: "#ffffff",
      outlineWidth: 2
    }
  })
}
