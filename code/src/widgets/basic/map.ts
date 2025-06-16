/**
 * 图层管理
 * @copyright 火星科技 mars3d.cn
 * @author 火星吴彦祖 2022-01-10
 */
import * as mars3d from "mars3d"
const Cesium = mars3d.Cesium

let map: mars3d.Map // 地图对象
let contourLine
export const eventTarget = new mars3d.BaseClass()
/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance: mars3d.Map) {
  map = mapInstance // 记录首次创建的map
  const graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}


// 添加书签
export function butAddTxtName(name) {
  // 动态的获取index
  const item = {
    name: name,
    center: map.getCameraView()
  }

  map
    .expImage({
      download: false,
      width: 300
    })
    .then((result) => {
      item.img = result.image
      eventTarget.fire("addImgObject", { item })
    })
}

// 飞向视角
export function flytoView(center) {
  map.setCameraView(center)
}
