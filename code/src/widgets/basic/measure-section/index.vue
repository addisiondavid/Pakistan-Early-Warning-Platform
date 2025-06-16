<template>
  <!-- UI面板 -->
  <mars-dialog :visible="true" :draggable="true" title="Cross-section Analyse" right="40" top="90">
    <a-space>
      <mars-button @click="measureSection">Draw Section</mars-button>
      <mars-button @click="clear">Clear</mars-button>
    </a-space>
  </mars-dialog>

  <!-- ecahrt图表 -->
  <mars-dialog v-model:visible="isShow" :draggable="true" :left="70" :right="240" :bottom="40">
    <div class="echatsView">
      <div id="echartsView1" style="width: 100%; height: 100%"></div>
    </div>
  </mars-dialog>

</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue"
import * as echarts from "echarts"
import * as mapWork from "./map.ts"
import useLifecycle from "@mars/widgets/common/uses/use-lifecycle"
import { useWidget } from "@mars/widgets/common/store/widget"
import type { GuiItem } from "@mars/components/mars-ui/mars-gui"
const { activate, disable, currentWidget } = useWidget()
useLifecycle(mapWork)

const isShow = ref<boolean>(false)

let myChart1: echarts.ECharts

// 图表自适应
window.onresize = function () {
  myChart1.resize()
}

onMounted(() => {
  myChart1 = echarts.init(document.getElementById("echartsView1")!)
})

mapWork.eventTarget.on("measureEnd", function (event: any) {
  isShow.value = true
  nextTick(() => {
    setEchartsData(event)
  })
})

mapWork.eventTarget.on("measureClick", function (event: any) {
  if (event.value) {
    nextTick(() => {
      setEchartsData(event.value)
    })
  }
})

const measureSection = () => {
  mapWork.measureSection()
}

const clear = () => {
  mapWork.removeAll()
  isShow.value = false
  myChart1.clear()
}

function setEchartsData(data: any) {
  console.info(data)
  if (data == null || data.arrPoint == null) {
    return
  }
  const arrPoint = data.arrPoint
  let inhtml = ""

  const option = {
    grid: {
      left: 10,
      right: 40,
      bottom: 10,
      top: 40,
      containLabel: true
    },
    dataZoom: [
      {
        type: "inside",
        throttle: 50
      }
    ],
    tooltip: {
      trigger: "axis",
      // position: function (point, params, dom, rect, size) {
      //    return [10, 20];
      // },
      formatter: (params: any) => {
        if (params.length === 0) {
          mapWork.hideTipMarker()
          return inhtml
        }

        const hbgd = params[0].value // 海拔高度
        const point = arrPoint[params[0].dataIndex] // 所在经纬度
        const result = mapWork.calculation(params[0])

        inhtml = `Current<br />
                      Value：${result.len}<br />
                      Height：<span style='color:${params[0].color};'>${result.hbgdStr}</span><br />
                      Lat：${point.lng}<br />
                      Lon：${point.lat}`

        mapWork.showTipMarker(point, hbgd, inhtml)

        return inhtml
      }
    },
    xAxis: [
      {
        name: "",
        type: "category",
        nameTextStyle: { color: "rgb(255, 70, 131)" },
        boundaryGap: false,
        axisLine: {
          show: true
        },
        axisLabel: {
          show: true,
          formatter: function(point, index) {
            console.info(point)
            return point.Lat
          },
          color: "#fff"
        },
        data: data.arrPoint
      }
    ],
    yAxis: [
      {
        name: "value",
        nameTextStyle: { color: "rgb(255, 70, 131)" },
        type: "value",
        min: getMinZ(arrPoint),
        axisLabel: {
          formatter: "{value}",
          color: "#fff"
        }
      }
    ],
    series: [
      {
        name: "高程值",
        type: "line",
        smooth: true,
        symbol: "none",
        sampling: "average",
        itemStyle: {
          normal: {
            color: "rgb(255, 70, 131)"
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(255, 158, 68)"
              },
              {
                offset: 1,
                color: "rgb(255, 70, 131)"
              }
            ])
          }
        },
        data: data.arrHB
      }
    ]
  }

  myChart1.setOption(option)
  myChart1.resize()
}

function getMinZ(arr: any) {
  let minz = "dataMin"
  if (arr == null || arr.length === 0) {
    return minz
  }

  minz = arr[0].alt
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].alt < minz) {
      minz = arr[i].alt
    }
  }
  return minz
}
</script>
<style scoped lang="less">
.echatsView {
  width: 100%;
  height: 240px;
}
</style>
