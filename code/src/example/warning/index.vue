<template>


  <mars-dialog :visible="true" left="0" bottom="0" height="270" customClass="customDialog">
    <div class="ui-container">
      <a-form :model="formState" :label-col="{ span: 1 }" :wrapper-col="{ span: 28 }">
        <a-collapse v-model:activeKey="activeKey" expandIconPosition="right" style="display:inline;">
<!--         <a-form-item label="Level" class="f-push-20-t label">
            <a-radio-group v-model:value="formState.checkAlarmLevel">
              <a-radio value="Warning">Warning</a-radio>
              <a-radio value="Watch">Watch</a-radio>
            </a-radio-group>
          </a-form-item> -->
          <a-form-item label="Type" class="f-push-20-t label">
            <a-checkbox-group v-model:value="formState.checkAlarmTypes" @change="onCheckboxChange">
              <a-checkbox  v-for="(ele,key) in warntype" :key="key" :value="key">{{ele}}</a-checkbox>
            </a-checkbox-group>
          </a-form-item>
        </a-collapse>
      </a-form>
    </div>
    <div class="chartProcess" id="chartProcess">
      <div id="chartProcess_ul" class="chartProcess_ul"></div>
    </div>    
  </mars-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick } from "vue"
import { TableColumnType, TableProps } from "ant-design-vue"
import TileLayerState from "../../components/mars-sample/tile-layer-state.vue"
import axios from "axios"
import dayjs, { Dayjs } from "dayjs"
import * as echarts from "echarts"
import * as mapWork from "./map.js"
import legendData from "../layers/legendData.js"
import { $message, $notify, $alert } from "@mars/components/mars-ui/index"

const activeKey = ref(["0", "1", "2"])
let myChart
const warntype = ref({ RS: "RainStorm", HW: "HeatWave", CA: "ColdAir", SS: "SandStorm", DR: "Drought", HA: "Hail", BL: "Blizzard", IR: "IcyRoad", GA: "Gale", DF: "DenseFog", FR: "Frost", TL: "Thunder-Lightning", SG: "SeaGale" })
let warntypes = []
interface FormState {
  checkAlarmTypes: string[]
  checkAlarmLevel: string
}

const formState = reactive<FormState>({
  checkAlarmTypes: ["RS", "HW", "CA"],
  checkAlarmLevel: "Warning"
})

const viewToSynthesize = () => {
  mapWork.viewToSynthesize()
}

const viewToActually = () => {
  mapWork.viewToActually()
}
const viewToForecast = () => {
  mapWork.viewToForecast()
}

const onCheckboxChange = () => {
  warntypes = []
  for (const k in formState.checkAlarmTypes) {
    warntypes.push([warntype.value[formState.checkAlarmTypes[k]], formState.checkAlarmTypes[k]])
  }
  console.info(warntypes)
  myChart.setOption(makeOption())
}

const HEIGHT_RATIO = 0.6
const DIM_CATEGORY_INDEX = 0
const DIM_TIME_ARRIVAL = 1
const DIM_TIME_DEPARTURE = 2
const ACTUAL_TIME_ARRIVAL = 3
const _cartesianXBounds = []
const _cartesianYBounds = []
let rowData = {}
  
const times = "20230311120000"
let boundaries = {}
onMounted(() => {
  for (const k in formState.checkAlarmTypes) {
    warntypes.push([warntype.value[formState.checkAlarmTypes[k]], formState.checkAlarmTypes[k]])
  }
  myChart = echarts.init(document.getElementById("chartProcess_ul"))
  console.info(warntypes)
  axios.get("data/boundaries.json").then(function (res: any) {
    boundaries = res.data
  })
  const url = "data/process.json"
  axios.get(url).then(function (res: any) {
    rowData = res.data
    myChart.setOption(makeOption())
    myChart.on("click", (params) => {
      axios.get("data/process/" + params.value[5]).then(function (resp: any) {
        for (const valid in resp.data) {
          console.info(valid, resp.data[valid])
          mapWork.showWarnData(times, params.value, resp.data[valid], boundaries)
        }
      })
    })
    const warnData = res.data.warnData
    if (warnData.red.length > 0) {
      const param = warnData.red[0]
      axios.get("data/process/" + param[5]).then(function (resp: any) {
        for (const valid in resp.data) {
          console.info(valid, resp.data[valid])
          mapWork.showWarnData(times, param, resp.data[valid], boundaries)
        }
      })
    } else if (warnData.orange.length > 0) {
      const param = warnData.orange[0]
      axios.get("data/process/" + param[5]).then(function (resp: any) {
        for (const valid in resp.data) {
          console.info(valid, resp.data[valid])
          mapWork.showWarnData(times, param, resp.data[valid], boundaries)
        }
      })
    } else if (warnData.yellow.length > 0) {
      const param = warnData.yellow[0]
      axios.get("data/process/" + param[5]).then(function (resp: any) {
        for (const valid in resp.data) {
          console.info(valid, resp.data[valid])
          mapWork.showWarnData(times, param, resp.data[valid], boundaries)
        }
      })
    } else if (warnData.blue.length > 0) {
      const param = warnData.blue[0]
      axios.get("data/process/" + param[5]).then(function (resp: any) {
        for (const valid in resp.data) {
          console.info(valid, resp.data[valid])
          mapWork.showWarnData(times, param, resp.data[valid], boundaries)
        }
      })
    } 
  })
})
function makeOption() {
      return {
        tooltip: {
          trigger: "item",
          show: true,
          axisPointer: {
            type: "line"
          },
          formatter(params) {
            if (params && params.length > 0) {
              return ""
            }
            const { data, value } = params
            const end = value[2] ? new Date(value[2]).getTime() : 0
            const actual = value[3] ? new Date(value[3]).getTime() : 0
            let color = "#ddb30b"
            if (actual - end > 0) {
              color = "#ee6666"
            } else if (actual - end < 0) {
              color = "#3ba272"
            }
            const marker = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${color};"></span>`
            return `${data[4]} <br/>${marker}开始时间：${value[1]}<br/>${marker}结束时间：${value[2]}<br/>${marker}类型：${value[3]}`
          }
        },
        animation: false,
        grid: {
          show: true,
          top: 60,
          bottom: 30,
          left: 100,
          right: 0,
          borderWidth: 0
        },
        dataZoom: [
          {
            type: "slider",
            xAxisIndex: 0,
            filterMode: "weakFilter",
            height: 20,
            bottom: 10,
            start: 0,
            end: 60,
            handleIcon:
              "path://M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "80%",
            showDetail: false
          },
          {
            type: "slider",
            yAxisIndex: 0,
            zoomLock: true,
            width: 10,
            right: 10,
            top: 70,
            bottom: 10,
            start: 100,
            end: 0,
            handleSize: 0,
            showDetail: false
          }
        ],
        xAxis: {
          type: "time",
          position: "top",
          splitLine: {
            alignWithLabel: true,
            show: true,
            lineStyle: {
              color: ["#E9EDFF"]
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: "#929ABA"
            }
          },
          axisLabel: {
            color: "#FFFFFF",
            inside: false,
            align: "center",
            formatter: (param) => {
              const formatDate = new Date(param)
              return `${formatDate.getMonth() + 1}-${formatDate.getDate()} ${formatDate.getHours()}:${formatDate.getMinutes()}`
            }
          },
          axisPointer: {
            show: true,
            label: {
              backgroundColor: "#004f53",
              margin: -20
            },
            lineStyle: {
              color: "#9fbfcd",
              type: "solid",
              width: 1.5
            }
          }
        },
        yAxis: {
          axisTick: { show: false },
          splitLine: { show: false },
          axisLine: { show: false },
          axisLabel: { show: false },
          min: 0,
          axisPointer: {
            show: false
          },
          max: warntypes.length
        },
        series: [
          {
            id: "blue",
            type: "custom",
            name: "blue",
            renderItem: renderGanttItem,
            dimensions: rowData.warnData.dimensions,
            encode: {
              x: [DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE],
              y: DIM_CATEGORY_INDEX,
              tooltip: [DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE]
            },
            data: rowData.warnData.blue
          }, {
            id: "yellow",
            type: "custom",
            name: "yellow",
            renderItem: renderGanttItem,
            dimensions: rowData.warnData.dimensions,
            encode: {
              x: [DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE],
              y: DIM_CATEGORY_INDEX,
              tooltip: [DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE]
            },
            data: rowData.warnData.yellow
          }, {
            id: "orange",
            type: "custom",
            name: "orange",
            renderItem: renderGanttItem,
            dimensions: rowData.warnData.dimensions,
            encode: {
              x: [DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE],
              y: DIM_CATEGORY_INDEX,
              tooltip: [DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE]
            },
            data: rowData.warnData.orange
          }, {
            id: "red",
            type: "custom",
            name: "red",
            renderItem: renderGanttItem,
            dimensions: rowData.warnData.dimensions,
            encode: {
              x: [DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE],
              y: DIM_CATEGORY_INDEX,
              tooltip: [DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE]
            },
            data: rowData.warnData.red
          },
          {
            type: "custom",
            renderItem: renderAxisLabelItem,
            encode: {
              x: -1,
              y: 0
            },
            data: warntypes.map((item, index) => {
              return [warntypes.length - 1 - index].concat(item)
            })
          }
        ]
      }
    }

 function clipRectByRect (params, rect) {
    return echarts.graphic.clipRectByRect(rect, {
      x: params.coordSys.x,
      y: params.coordSys.y,
      width: params.coordSys.width,
      height: params.coordSys.height
    })
  }

  function renderGanttItem(params, api) {
    const categoryIndex = api.value(DIM_CATEGORY_INDEX)
    const timeStart = api.coord([api.value(DIM_TIME_ARRIVAL), categoryIndex])
    const timeEnd = api.coord([api.value(DIM_TIME_DEPARTURE), categoryIndex])
    const { coordSys } = params
    const barLength1 = timeEnd[0] - timeStart[0]
    // Get the heigth corresponds to length 1 on y axis.
    const barHeight = api.size([0, 1])[1] * HEIGHT_RATIO
    const rectNormal = clipRectByRect(params, {
      x: timeStart[0],
      y: timeStart[1] - barHeight,
      width: barLength1,
      height: barHeight
    })
    console.info(params.seriesName)
    return {
      type: "group",
      children: [
        {
          type: "rect",
          ignore: !rectNormal,
          shape: rectNormal,
          style: api.style({ fill: params.seriesName }) // 黄色区域-开始时间到结束时间
        }
      ]
    }
  }
  
  function renderAxisLabelItem(params, api) {
    const y = api.coord([0, api.value(0)])[1]
    if (y < params.coordSys.y + 5) {
      return
    }
    // eslint-disable-next-line consistent-return
    return {
      type: "group",
      position: [10, y],
      children: [
        {
          type: "path", // task区域
          shape: {
            d: "M0,0 L0,-20 L30,-20 C42,-20 38,-1 50,-1 L70,-1 L70,0 Z",
            x: 0,
            y: -20,
            width: 120,
            height: 20,
            layout: "cover"
          },
          style: {
            fill: "#368c6c"
          }
        },
        {
          type: "text", // task字体
          style: {
            x: 4,
            y: -3,
            text: api.value(1),
            textVerticalAlign: "bottom",
            textAlign: "left",
            textFill: "#fff"
          }
        }
      ]
    }
  }
  
const showData = (ele) => {
  const time = "20230311120000"
  // 图片
  if (ele.supertype === "2") {
    mapWork.showImage(ele)
  // Geojson
  } else if (ele.supertype === "3") {
    mapWork.showGeojson(ele, time, 9, formState.layer, legendData[ele.legend])
  // Station
  } else if (ele.supertype === "4") {
    mapWork.showStation(ele, time, 9, formState.layer, legendData[ele.legend])
  // 灰度图
  } else if (ele.supertype === "5") {
    mapWork.addDataValue(ele, time, 9, formState.layer, legendData[ele.legend])
    mapWork.showGray(ele, time, 9, formState.layer, legendData[ele.legend], boundaries)
  // 风流场
  } else if (ele.supertype === "7") {
    mapWork.addUVLine(ele, time, 9, formState.layer, legendData[ele.legend])
  // 等值线
  } else if (ele.supertype === "9") {
    mapWork.addIsoLine(ele, time, 9, formState.layer, legendData[ele.legend], boundaries)
  // 站点（支持站点、格点、等值线、色斑图）
  } else if (ele.supertype === "10") {
    mapWork.addStation(ele, time, 9, formState.layer, legendData[ele.legend])
  // 格点（色斑图）
  } else if (ele.supertype === "11") {
    mapWork.addIsosurface(ele, time, 9, formState.layer, legendData[ele.legend])
  // UV风
  } else if (ele.supertype === "12") {
    mapWork.addUVBarb(ele, time, 9, formState.layer, legendData[ele.legend])
  // 数值
  } else if (ele.supertype === "13") {
    mapWork.addDataValue(ele, time, 9, formState.layer, legendData[ele.legend])
  }
}
</script>

<style lang="less">
.infoView {
  overflow-y: auto;
}

.color-state {
  padding-bottom: 1.3px;
}
.ui-container {
  margin-top: -20px;
  margin-bottom: 7px;
  // height: 100%;
  // overflow-y: scroll;
}
.infoView {
  width: 240px;
  height: 100%;
}
.label {
  color: #ffffff;
}
.chartProcess{
  width: 100%;
  height: 90%;
  clear:both;
  position: relative;
  border: 1px solid #17366c;
  float: ;
  background: linear-gradient(to left, #3897cf, #3897cf) left top no-repeat, linear-gradient(to bottom, #3897cf, #3897cf) left top no-repeat,
    linear-gradient(to left, #3897cf, #3897cf) right top no-repeat, linear-gradient(to bottom, #3897cf, #3897cf) right top no-repeat,
    linear-gradient(to left, #3897cf, #3897cf) left bottom no-repeat, linear-gradient(to bottom, #3897cf, #3897cf) left bottom no-repeat,
    linear-gradient(to left, #3897cf, #3897cf) right bottom no-repeat, linear-gradient(to left, #3897cf, #3897cf) right bottom no-repeat;
  background-size: 1px 20px, 20px 1px, 1px 20px, 20px 1px;
  background-color: rgba(0, 0, 0, 0.1);
  h6 {
    color: #ffffff;
  }
}
.chartProcess_ul{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0%;
  bottom: 0px;
}
.customDialog{
  background-color: '#abcdef' !important;
  width:100%
}
</style>
