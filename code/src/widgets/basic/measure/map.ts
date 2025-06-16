/**
 * 图层管理
 * @copyright 火星科技 mars3d.cn
 * @author 火星吴彦祖 2022-01-10
 */
import * as mars3d from "mars3d"
const Cesium = mars3d.Cesium

let map: mars3d.Map // 地图对象
let measure
export const eventTabel = new mars3d.BaseClass()
/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance: mars3d.Map) {
  map = mapInstance // 记录首次创建的map

  
  measure = new mars3d.thing.Measure({
    label: {
      color: "#ffffff",
      font_family: "楷体",
      font_size: 20,
      background: false
    }
  })
  map.addThing(measure)
  
  measure.on(mars3d.EventType.start, function (e) {
    console.log("开始异步分析", e)
  })
  measure.on(mars3d.EventType.end, function (e) {
    console.log("完成异步分析", e)
  })
  
}

export function onlyPickModelPosition(val) {
  // 控制鼠标只取模型上的点，忽略地形上的点的拾取
  map.onlyPickModelPosition = val
}

export function removeAll() {
  measure.clear()
}

// 空间距离
export function measureLength() {
  measure.distance({
    showAddText: true,
    label: {
      // 自定义显示label的graphic类型
      type: "div",
      updateText: function (text, graphic) {
        // updateText是必须，用于动态更新 text
        graphic.html = `<div class="marsGreenGradientPnl" >${text}</div>`
      },
      // 下面是graphic对应类型本身的参数
      html: `<div class="marsGreenGradientPnl" ></div>`,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM
    },
    style: {
      color: "#ffff00",
      width: 3,
      clampToGround: false // 是否贴地
    }
  })
}
// 贴地距离
export function measureSurfaceLength() {
  measure.distanceSurface({
    showAddText: true,
    exact: false, // 是否进行精确计算， 传false时是否快速概略计算方式，该方式计算精度较低，但计算速度快，仅能计算在当前视域内坐标的高度
    unit: "m", // 支持传入指定计量单位
    style: {
      color: "#ffff00",
      width: 3,
      clampToGround: true // 是否贴地
    }
  })
}
// 水平面积
export function measureArea() {
  measure.area({
    style: {
      color: "#00fff2",
      opacity: 0.4,
      outline: true,
      outlineColor: "#fafa5a",
      outlineWidth: 1,
      clampToGround: false // 贴地
    }
  })
}
// 贴地面积
export function measureSurfaceeArea() {
  measure.areaSurface({
    style: {
      color: "#ffff00"
    },
    splitNum: 10, // step插值分割的个数
    exact: false // 是否进行精确计算， 传false时是否快速概略计算方式，该方式计算精度较低，但计算速度快，仅能计算在当前视域内坐标的高度
  })
}
// 高度差
export function measureHeight() {
  measure.height()
}

// 三角测量
export function measureTriangleHeight() {
  measure.heightTriangle()
}

// 方位角
export function measureAngle() {
  measure.angle()
}

// 坐标测量
export function measurePoint() {
  measure.point()
}


// 清除
export function clearAll() {
  contourLine.clear()
  table = []
}

// 滑动条控制
export function changeWidth(val) {
  if (val) {
    contourLine.width = val
  }
}

export function changeSpacing(val) {
  if (val) {
    contourLine.spacing = val
  }
}

// 改变颜色
export function changeColor(val) {
  contourLine.color = Cesium.Color.fromCssColorString(val)
}

// 等高线控制
export function showDengGX(val) {
  contourLine.contourShow = val
}

// 状态控制
export function chkClippingPlanes(val) {
  contourLine.showElseArea = val
}

// 阴影控制
export function changeShadingType(val) {
  contourLine.shadingType = val
}

let table = []
// 区域表格添加一行记录
function addTableItem(item) {
  table.push({ key: item.id, name: "区域" + item.id })
  const tableItem = { key: item.id, table: table }
  eventTabel.fire("tableObject", { tableItem })
}
export function changeTable(data) {
  table = data
}

// 表格操作
export function flyToGraphic(item) {
  const graphic = contourLine.getAreaById(item)
  map.flyToPositions(graphic.positions)
}

export function deletedGraphic(item) {
  const graphic = contourLine.getAreaById(item)
  contourLine.removeArea(graphic)
}

export function showHideArea(id, selected) {
  if (selected) {
    contourLine.showArea(id)
  } else {
    contourLine.hideArea(id)
  }
}
