<template>
  <mars-dialog :visible="true" :animation="false" left="0" top="60" bottom="0" width="290">
    <div class="ui-container">
      <a-form >
        <a-collapse v-model:activeKey="activeKey" expandIconPosition="left">
          <a-collapse-panel v-for="(ele1,key1) in menuData" :key="key1" :header="ele1.subtitle" class="btnView">
            <a-form-item class="f-tac" style="display:inline-block;text-align:left;color: #c6eafe;">
              <div style="width:100;height:1px;background-color:#c6eafe;;margin-bottom:1em;position:relative;top:-1.4em"></div>
              <a-space style="width: 240px;display:flex;flex-direction: column;align-items: start ;">
                <div v-for="(ele3,key3) in ele1.childs" :key="key3"> 
                  <img :src="ele3.imgIcon" style="display:inline;padding-right:.4em;width:22px;" />
                  <span style="padding-right:1em; color: #c6eafe;font-size: 16px;line-height: 16px;font-family: 微软雅黑;">{{ele3.subtitle}}</span>
                  <mars-switch size="small" style="position:absolute;right:-10px;" class="meteo-switch" v-model:checked="formState[ele3.id]" @change="onClickShowData(ele3)"/>
                </div>
              </a-space>
            </a-form-item>
          </a-collapse-panel>
        </a-collapse>
      </a-form>
    </div>
  </mars-dialog>

  <div style="position:absolute;z-index:999999999999999;right:30px;bottom:30px" v-if="imgsrc">
    <img :src="imgsrc" style="position:absolute;z-index:999999999999999;right:30px;bottom:30px">
  </div>
  <mars-dialog :visible="true" right="10" bottom="60" width="400" height="20">
    <a-form-item label="Data High"  v-if="showLayHeight">
       <mars-slider v-model:value="formState.layer" :marks="layers" :min="2" :max="1000" :step="1" @change="onMarkSliderChange" />
    </a-form-item>
  </mars-dialog>

  <div class="ac-legend" v-if="curr_legend_data" >
     
     <div class="legend-list-box" :class="{'open': isOPenLegend}" @click="isOPenLegend = false" style="display:flex;align-items:center">
         <h6 class="list-box__title" v-if="curr_legend_data.name">单位：{{curr_legend_data.name}}</h6>
         <!--
          <div id="swiper1"   @mousedown="dragSwiper"></div>
         -->
         <ul class="list-box__list" style="display:flex">
             <li class="list-item" v-for="(item, index) in curr_legend_data.value" :key="index" style="display:flex;align-items: center;">
                 <span class="list-item__color" :style="{'background-color': item.color}" style="width:15px;height:20px"></span>
                 <!--
                     <label class="list-item__text">{{item.label || (item.start != "infinite" && item.end != "infinite" ? item.start + '~' + item.end : (item.start == "infinite" ? '<' + item.end : (item.end == "infinite" ? '>' + item.start : '')))}}</label>
                 -->
             </li>
         </ul>
     </div>
     <div class="legend-stretch-btn" @click="isOPenLegend = true">
         <i class="el-icon-info" style="font-size: 40px;"></i>
     </div>
 </div>
  
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick } from "vue"
import axios from "axios"
import dayjs, { Dayjs } from "dayjs"
import * as mapWork from "./map.js"
import menuData from "./menuData.js"
import legendData from "../layers/legendData.js"

const activeKey = ref(["4", "5"])
const imgsrc = ref()
const baseUrl = "http://localhost:90"
const timeDemo = "202303190000"
const validDemo = "048"
const legendItemStr = ref()
const curr_legend_data: any = ref({}) 
const isOPenLegend = ref(false)
const thisEleid = ref()
const layers: Record<number, any> = {
  200: "200",
  500: "500",
  700: "700",
  850: "850",
  925: "925"
}  
let showLayHeight: any = ref({}) 
let currlayer = 0
let curdataEle = {}
let intTask
interface FormState {
  isScale: boolean // 是否在播放
  isfold: boolean // 是否在播放
  layer: number
  checkRadioVal: string
}

const formState = reactive<FormState>({
  isScale: false,
  layer: 70000,
  checkRadioVal: "Warning",
  isfold: true
})

interface Props {
  activeSel?: string // 自定义class
}

const showClockAnimate = ref<boolean>(false)
const nowTimeScope = ref<[Dayjs, Dayjs]>()
const currrentTime = ref<Dayjs>()
mapWork.eventTarget.on("clickShowClockAnimate", (e: any) => {
  showClockAnimate.value = !showClockAnimate.value

  nowTimeScope.value = [dayjs(e.startTime), dayjs(e.stopTime)]
  currrentTime.value = dayjs(e.currentTime)
})


function dragSwiper(e) {
  const swiper = document.querySelector(".legend-list-box")
  dragElement(swiper)
  getcolorInfo(e)
}

function getcolorInfo(e) {
  console.log("event", e.target.style)
    
}

function dragElement(elmnt) {
  let pos1 = 0
  let pos2 = 0
  let pos3 = 0
  let pos4 = 0
  
  dragMouseDown()

  function dragMouseDown(e) {
    e = e || window.event
    e.preventDefault()
    // get the mouse cursor position at startup:
    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = closeDragElement
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag
  }

  function elementDrag(e) {
    const swipe = document.getElementById("swiper1")
    e = e || window.event
    e.preventDefault()
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY
    // set the element's new position:
    // swipe.style.top = (swipe.offsetTop - pos2) + "px"
    swipe.style.left = (swipe.offsetLeft - pos1) + "px"
  
  }

  function closeDragElement() {

    document.onmouseup = null
    document.onmousemove = null
  }
}

const onCheckRadioChange = () => {
  if (formState.checkRadioVal === "Synthesize") {
    mapWork.viewToSynthesize()
  } else if (formState.checkRadioVal === "Warning") {
    mapWork.viewToActually()
  } else if (formState.checkRadioVal === "Forecast") {
    mapWork.viewToForecast()
  }
}


// 带刻度滑动条修改事件
let clickTime = new Date().getTime()
const onMarkSliderChange = () => {
  const curTime = new Date().getTime()
  if (curTime - clickTime > 1000) {
    let layer = 0
    for (const k in layers) {
      if (formState.layer >= k) {
        layer = k
      } else {
        break 
      }
    }
    formState.layer = layer 
    currlayer = layer
    console.info(formState.layer) // 调用地图方法
    if (curdataEle.childs) {
      for (const child in curdataEle.childs) {
         showData(curdataEle.childs[child])
      }
    } else {
      showData(curdataEle)
    }
    clickTime = curTime
  } else {
    formState.layer = currlayer 
  }
}

const onClickShowData = (ele) => {

  if (ele.hasOwnProperty("childs")) {
    // 图例
    const currEle = ele.childs.length - 1 
    const currlegendCode = ele.childs[currEle].legend
    const eleid = formState[ele.id]

   curr_legend_data.value = legendData[currlegendCode]
    thisEleid.value = eleid
    if (!eleid) {
      // delete legend
      curr_legend_data.value = {}
    } 
    
  }
  if (ele.maplayer) {
    mapWork.map.basemap = ele.maplayer
  }
  if (ele.levelinterval) {
    showLayHeight.value = ele.levelinterval
  } else {
    showLayHeight.value = {}
  }
  legendItemStr.value = legendData[ele.legend]
  formState.layer = ele.defaultLevel
  currlayer = ele.defaultLevel
  curdataEle = ele
  if (formState[ele.id]) {
    if (ele.comparData) {
        mapWork.viewToSynthesize()
    } else {
        // mapWork.viewToForecast()
    }
    if (ele.childs) {
      for (const child in ele.childs) {
        showData(ele.childs[child])
      }
    } else {
      showData(ele)
    }
  } else {
    if (ele.childs) {
      for (const child in ele.childs) {
        mapWork.removeMeteoLayer(ele.childs[child])
      }
    } else {
      mapWork.removeMeteoLayer(ele)
      window.clearInterval(intTask)
      mapWork.clearSateTitleLayer()
    }
  }
}
const showData = (ele) => {
  mapWork.drawLabel1(ele.title)
  console.info(formState)
  // 图片
  if (ele.supertype === "2") {
    if (intTask) {
      window.clearInterval(intTask)
      mapWork.clearLayer()
    }
    let i = 0
    const url = baseUrl + "/pmd_data/" + ele.dataCode + "/" + ele.element + "/timerange.json"
    axios.get(url).then(function (res: any) {
      const data = res.data
      i = 0
      const startTimes = data[0]
      const stopTimes = data[data.length - 1]
      console.info(startTimes, stopTimes)
      mapWork.setClockAnimateTime(formatDate(startTimes), formatDate(stopTimes))
      intTask = setInterval(() => {
        mapWork.showImage(ele, data[i], 0, 0, legendData[ele.legend])
        mapWork.drawLabel2(data[i])
        i = i + 1
        if (i === data.length - 1) {
          i = 0
          mapWork.setCurrentTime(formatDate(startTimes))
        }
      }, 500)
    })
  // Geojson
  } else if (ele.supertype === "3") {
    mapWork.showGeojson(ele, timeDemo, validDemo, formState.layer, legendData[ele.legend])
  // Station
  } else if (ele.supertype === "4") {
    if (intTask) {
      window.clearInterval(intTask)
      mapWork.clearLayer()
    }
    let i = 0
    const url = baseUrl + "/pmd_data/" + ele.dataCode + "/timerange.json"
    axios.get(url).then(function (res: any) {
      const data = res.data
      i = 0
      const startTimes = data[0]
      const stopTimes = data[data.length - 1]
      console.info(startTimes, stopTimes)
      mapWork.setClockAnimateTime(formatDate(startTimes), formatDate(stopTimes))
      intTask = setInterval(() => {
        mapWork.showStation(ele, data[i], 0, 0, legendData[ele.legend])
        mapWork.drawLabel2(data[i])
        i = i + 1
        if (i === data.length - 1) {
          i = 0
          mapWork.setCurrentTime(formatDate(startTimes))
        }
      }, 500)
    })
  
  // 灰度图
  } else if (ele.supertype === "5") {
    mapWork.showGray(ele, timeDemo, validDemo, formState.layer, legendData[ele.legend])
  // 风流场
  } else if (ele.supertype === "6") {
    if (intTask) {
      window.clearInterval(intTask)
      mapWork.clearLayer()
    }
    let i = 0
    const url = baseUrl + "/pmd_data/" + ele.dataCode + "/timerange.json"
    axios.get(url).then(function (res: any) {
      const data = res.data
      i = 0
      const startTimes = data[0]
      const stopTimes = data[data.length - 1]
      console.info(startTimes, stopTimes)
      mapWork.setClockAnimateTime(formatDate(startTimes), formatDate(stopTimes))
      if (ele.dataCode === "station") {
        intTask = setInterval(() => {
          mapWork.showStationWin(ele, data[i], 0, 0, legendData[ele.legend])
          mapWork.drawLabel2(data[i])
          i = i + 1
          if (i === data.length - 1) {
            i = 0
            mapWork.setCurrentTime(formatDate(startTimes))
          }
        }, 500)
      } else {
          mapWork.showStationWin(ele, data[i], 0, 0, legendData[ele.legend])
          mapWork.drawLabel2(data[i])
      }
    })
  // 灰度图
  } else if (ele.supertype === "7") {
    mapWork.addUVLine(ele, timeDemo, validDemo, formState.layer, legendData[ele.legend])
  // 等值线
  } else if (ele.supertype === "9") {
    mapWork.addIsoLine(ele, timeDemo, validDemo, formState.layer, legendData[ele.legend])
  // 站点（支持站点、格点、等值线、色斑图）
  } else if (ele.supertype === "10") {
    mapWork.addStation(ele, legendData[ele.legend])
  // 格点（色斑图）
  } else if (ele.supertype === "11") {
    mapWork.addIsosurface(ele, timeDemo, validDemo, formState.layer, legendData[ele.legend])
  // UV风
  } else if (ele.supertype === "12") {
    mapWork.addUVBarb(ele, timeDemo, validDemo, formState.layer, legendData[ele.legend])
  // 数值
  } else if (ele.supertype === "13") {
    mapWork.addDataValue(ele, timeDemo, validDemo, formState.layer, legendData[ele.legend])
  } else if (ele.supertype === "14") {
    mapWork.showChangeGray(ele, timeDemo, validDemo, formState.layer, legendData[ele.legend])
  // 风流场
  } else if (ele.supertype === "15") {
    const urlArr = []
    if (intTask) {
      window.clearInterval(intTask)
      mapWork.clearLayer()
    }
    let i = 0
    const url = baseUrl + "/pmd_data/" + ele.dataCode + "/prj_gll/" + ele.element + "/timerange.json"
    axios.get(url).then(function (res: any) {
      const data = res.data
      i = data.length - 1
      const startTimes = data[i]
      const stopTimes = data[0]
      console.info(startTimes, stopTimes)
      mapWork.setClockAnimateTime(formatDate(startTimes), formatDate(stopTimes))
      intTask = setInterval(() => {
        mapWork.showSateXyzLayer(ele, data[i])
        mapWork.drawLabel2(data[i])
        i = i - 1
        if (i === 0) {
          i = data.length - 1
          mapWork.setCurrentTime(formatDate(startTimes))
        }
      }, 500)
    })
    showLegendImg(ele)
  } else if (ele.supertype === "16") {
    const urlArr = []
    if (intTask) {
      window.clearInterval(intTask)
      mapWork.clearLayer()
    }
    let i = 0
    const url = "http://10.1.64.154/art/proxy/10.1.64.154/mgrsite/ztdatainfo/findByDatacodeAndRowcount?datacode=" + ele.dataCode + "&rowcount=24"
    axios.get(url).then(function (res: any) {
      const data = res.data
      i = data.length - 1
      const startTimes = data[i]
      const stopTimes = data[0]
      console.info(startTimes, stopTimes)
      mapWork.setClockAnimateTime(formatDate(startTimes), formatDate(stopTimes))
      intTask = setInterval(() => {
        mapWork.showRadarXyzLayer(ele, data[i])
        mapWork.drawLabel2(data[i])
        i = i - 1
        if (i === 0) {
          i = data.length - 1
          mapWork.setCurrentTime(formatDate(startTimes))
        }
      }, 500)
    })
  }

}
onMounted(() => {
  // 访问后端接口

})

// 字符串转字符串
const formatDate = (dateStr) => {
  return dateStr.substr(0, 4) + "/" + dateStr.substr(4, 2) + "/" + dateStr.substr(6, 2) + " " + dateStr.substr(8, 2) + ":" + dateStr.substr(10, 2) + ":" + dateStr.substr(12, 2)
}

const showLegendImg = (ele) => {
  console.log("ele...", ele.subtitle)
  if (ele.legend) {
    imgsrc.value = ele.legend  
  } else {
    imgsrc.value = null  
  }

}
</script>
<style lang="less">
.ac-legend {
    position: absolute;
    bottom: 50px;
    right: 500px;
    text-align: center;
    z-index: 999999;
}
.infoView {
  overflow-y: auto;
}

.color-state {
  padding-bottom: 1.3px;
}
.ui-container {
  margin-top: 10px;
  height: 100%;
  overflow-y: scroll;
}
.infoView {
  width: 240px;
  height: 100%;
}
.btnView {
  width: 250px;
  color: yellow !important;
  .ant-space {
    flex-wrap: wrap;
  }
}
.btnView>.ant-collapse-header{
  background:transparent;
}
.mars-button {
  background-color: #2F4F4F63 !important;
}
.ant-switch-checked {
    background-color: #1890ff !important;
}
.viewer-toolbar {
    left: 265px !important;
}
#legend-list-box {
  position: absolute;
  z-index: 90000000;
}

#swiper1 {
  cursor: move;
  z-index: 10000000000;
}

#swiper1 {
  width:3px;
  height:20px;
  background-color:white;
  position: absolute;
  left: 6.5em;
  display: inline;
  cursor:pointer;
  z-index:999999999999999999;
}
</style>
