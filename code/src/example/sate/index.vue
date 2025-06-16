<template>
  <mars-dialog :visible="true" :draggable="true" :close="true" title="Menu" left="10" top="90" width="380" height="840" customClass="pannel">
    <a-space>
      <mars-button v-for="(ele1,key1) in menuData" :key="key1" @click="showSubMenu(key1)">{{ele1.subtitle}}</mars-button>
    </a-space>
    <div class="ui-container" v-if="subMenu.length>0">
      <a-collapse v-model:activeKey="activeKey" expandIconPosition="left" >
        <a-collapse-panel v-for="(ele2,key2) in subMenu" :key="key2" :header="ele2.subtitle" class="btnView">
          <a-form-item class="f-tac" >
            <a-space>
              <mars-button size="middle" v-for="(ele3,key3) in ele2.childs" :key="key3" @click="onClickShowData(ele3)" class="meteo-btn">
                {{ele3.subtitle}}
              </mars-button>
            </a-space>
          </a-form-item>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </mars-dialog>
  
<!--  <mars-dialog :visible="true" :draggable="true" right="10" top="90" width="220">
    <tile-layer-state />
  </mars-dialog> -->

  <div style="position:absolute;z-index:999999999999999;right:30px;bottom:30px" v-if="imgsrc">
    <img :src="imgsrc" style="position:absolute;z-index:999999999999999;right:30px;bottom:30px">
  </div>
</template>

<script setup lang="ts">
import TileLayerState from "./tile-layer.vue"
import { onMounted, reactive, ref, nextTick } from "vue"
import { TableColumnType, TableProps } from "ant-design-vue"
import axios from "axios"
import dayjs, { Dayjs } from "dayjs"
import * as mapWork from "./map.js"
import { $message, $notify, $alert } from "@mars/components/mars-ui/index"
import menuData from "./menuData.js"
import legendData from "../layers/legendData.js"
import { getUpTime } from "../../utils/cron.js"
import { time } from "../../utils/timeTransform.js"

const activeKey = ref(["0"])
const subMenu = ref([])
const imgsrc = ref()
subMenu.value = menuData[0].childs
interface FormState {
  typhoonFlag: boolean
}

const showClockAnimate = ref<boolean>(false)
const nowTimeScope = ref<[Dayjs, Dayjs]>()
const currrentTime = ref<Dayjs>()
let intTask

mapWork.eventTarget.on("clickShowClockAnimate", (e: any) => {
  showClockAnimate.value = !showClockAnimate.value
  nowTimeScope.value = [dayjs(e.startTime), dayjs(e.stopTime)]
  currrentTime.value = dayjs(e.currentTime)
})


const onClickHiddenTime = () => {
  showClockAnimate.value = false
}
const onRangeChange = (value: [Dayjs, Dayjs], dateString: [string, string]) => {
  mapWork.setClockAnimateTime(dateString[0], dateString[1])
}
const onChangeCurrentTime = (value: Dayjs) => {
  mapWork.setCurrentTime(value)
}

const onClickShowData = (ele) => {
  console.info(ele)
  // 图片
  if (ele.supertype === "2") {
    mapWork.showImage(ele)
  // Geojson
  } else if (ele.supertype === "3") {
    mapWork.showGeojson(ele)
  // Station
  } else if (ele.supertype === "4") {
    
    mapWork.showStation(ele, "20230303000000", legendData[ele.legend])
  // 灰度图
  } else if (ele.supertype === "5") {
    mapWork.showGray(ele)
  // 风流场
  } else if (ele.supertype === "7") {
    mapWork.addUVLine(ele)
  // 等值线
  } else if (ele.supertype === "9") {
    mapWork.addIsoLine(ele, 9, 2)
  // 站点（支持站点、格点、等值线、色斑图）
  } else if (ele.supertype === "10") {
    mapWork.addStation(ele, legendData[ele.legend])
  // 格点（色斑图）
  } else if (ele.supertype === "11") {
    mapWork.addIsosurface(ele, 9, 2)
  // UV风
  } else if (ele.supertype === "12") {
    mapWork.addUVBarb(ele, 9, 2)
  // 数值
  } else if (ele.supertype === "13") {
    mapWork.addDataValue(ele, 9, 2)
  } else if (ele.supertype === "15") {
    const urlArr = []
    if (intTask) {
      window.clearInterval(intTask)
      mapWork.clearLayer()
    }
    let i = 0
    const url = "http://10.0.65.135/swapQuery/public/DataQuery/playList?sat=" + ele.dataCode + "&obsType=prj_gll&interval=1&duration=24&intervalCell=15&queryProduct=" + ele.element
    axios.get(url).then(function (res: any) {
      const data = res.data
      i = data.length - 1
      const startTimes = data[i]
      const stopTimes = data[0]
      console.info(startTimes, stopTimes)
      mapWork.setClockAnimateTime(formatDate(startTimes), formatDate(stopTimes))
       intTask = setInterval(() => {
        mapWork.showSateXyzLayer(ele, data[i])
        i = i - 1
        if (i === 0) {
          i = data.length - 1
          mapWork.setCurrentTime(formatDate(startTimes))
        }
      }, 1000)
    })
    showLegendImg(ele)
  }

}
const showLegendImg = (ele) => {
  console.log("ele...", ele.subtitle)
  if (ele.legend) {
    imgsrc.value = ele.legend  
  } else {
    imgsrc.value = null  
  }

}
const showSubMenu = (ele) => {
  subMenu.value = menuData[ele].childs
  console.info(subMenu)
  // mapWork.eventTarget.fire("subMenu", { subMenu }) 
}

onMounted(() => {
  // 访问后端接口

})
// 字符串转字符串
const formatDate = (dateStr) => {
  return dateStr.substr(0, 4) + "/" + dateStr.substr(4, 2) + "/" + dateStr.substr(6, 2) + " " + dateStr.substr(8, 2) + ":" + dateStr.substr(10, 2) + ":" + dateStr.substr(12, 2)
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
  margin-top: 20px;
  height: 100%;
  overflow-y: scroll;
}
.infoView {
  width: 240px;
  height: 100%;
}
.meteo-btn{
  width: 340px;
  text-align: left;
}
.btnView {
  width: 360px;
  .ant-space {
    flex-wrap: wrap;
  }
}

.mars-button {
  background-color: #2F4F4F63 !important;
}
</style>
