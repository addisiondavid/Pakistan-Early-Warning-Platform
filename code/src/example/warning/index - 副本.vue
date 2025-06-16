<template>
  <mars-dialog :visible="true" left="10" top="70" bottom="40" width="380">
    <div class="ui-container">
      <a-form :model="formState" >
        <a-collapse v-model:activeKey="activeKey" expandIconPosition="left">
          <a-collapse-panel key="1" header="Short-term and Imminent Forecast">
            <mars-table
              size="small"
              :customRow="abnormalTableRow"
              bordered
              :pagination="{ pageSize: 5 }"
              :columns="abnormalColumns"
              :dataSource="abnormalList"
              rowKey="id"
            >
            </mars-table>
          </a-collapse-panel>
          <a-collapse-panel key="2" header="Weather Process Forecast">
            <mars-table
              size="small"
              :customRow="sensitiveTableRow"
              bordered
              :pagination="{ pageSize: 10 }"
              :columns="sensitiveColumns"
              :dataSource="sensitiveList"
              rowKey="id"
            >
            </mars-table>
          </a-collapse-panel>
        </a-collapse>
      </a-form>
    </div>
  </mars-dialog>
  <mars-dialog :visible="showClockAnimate" left="60" bottom="50">
    <p class="closePannel f-mb">
      <mars-icon icon="close" width="14" @click="onClickHiddenTime" />
    </p>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">current Time：</span>
        <mars-date-picker
          style="width: 170px"
          v-model:value="currrentTime"
          format="YYYY-MM-DD HH:mm:ss"
          :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }"
          @change="onChangeCurrentTime"
        />
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">time Range：</span>
        <mars-range-picker
          v-model:value="nowTimeScope"
          :show-time="{ format: 'HH:mm' }"
          format="YYYY-MM-DD HH:mm"
          :placeholder="['begin time', 'end time']"
          @change="onRangeChange"
        />
      </a-space>
    </div>
  </mars-dialog>
<!--  <mars-dialog :visible="true" :draggable="true" right="10" top="90" width="220" title="Layer Manage">
    <tile-layer-state />
  </mars-dialog> -->
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick } from "vue"
import { TableColumnType, TableProps } from "ant-design-vue"
import TileLayerState from "../../components/mars-sample/tile-layer-state.vue"
import axios from "axios"
import dayjs, { Dayjs } from "dayjs"
import * as mapWork from "./map.js"
import { $message, $notify, $alert } from "@mars/components/mars-ui/index"

const activeKey = ref(["0", "1", "2"])

interface FormState {
  typhoonFlag: boolean
}

const formState = reactive<FormState>({
})
const showClockAnimate = ref<boolean>(false)
const nowTimeScope = ref<[Dayjs, Dayjs]>()
const currrentTime = ref<Dayjs>()

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


// ========================= 异常天气组件相关处理============================
// 表格列头
const abnormalColumns: TableColumnType[] = [
  {
    title: "type",
    dataIndex: "type"
  },
  {
    title: "level",
    dataIndex: "level"
  },
  {
    title: "beginTime",
    dataIndex: "beginTime"
  }
]
interface abnormalInfo {
  id: number
  type: string
  level: string
  beginTime: string
  duration: string
  url: string
}
const abnormalList = ref<abnormalInfo[]>([]) // 列表数据
onMounted(() => {
  // 访问后端接口，取台风列表数据
  const url = "data/abnormal.json"
  axios.get(url).then(function (res: any) {
    const data = res.data
    abnormalList.value = data.abnormalList.map((item: any) => ({
      id: item[0],
      type: item[1],
      level: item[2],
      beginTime: item[3],
      duration: item[4],
      url: item[5]
    }))
  })
})
// 点击表格列表的行
const abnormalTableRow = (selectedRow: any) => {
  return {
    onClick: (row: any) => {
      $message("点击表格的行：" + selectedRow.beginTime + selectedRow.type + "异常事件")
      const url = "data/abnormal/" + selectedRow.url
      mapWork.openGeoJSON(selectedRow.beginTime + selectedRow.type + "异常事件", url)
    }
  }
}
// ========================= 敏感天气组件相关处理============================
// 表格列头
const sensitiveColumns: TableColumnType[] = [
  {
    title: "type",
    dataIndex: "type"
  },
  {
    title: "beginTime",
    dataIndex: "beginTime"
  },
  {
    title: "duration",
    dataIndex: "duration"
  },
  {
    title: "level",
    dataIndex: "level"
  }
]
interface sensitiveInfo {
  id: number
  type: string
  level: string
  beginTime: string
  duration: string
  url: string
}
const sensitiveList = ref<sensitiveInfo[]>([]) // 列表数据
onMounted(() => {
  // 访问后端接口，取台风列表数据
  const url = "data/sensitive.json"
  axios.get(url).then(function (res: any) {
    const data = res.data
    sensitiveList.value = data.sensitiveList.map((item: any) => ({
      id: item[0],
      type: item[1],
      level: item[2],
      beginTime: item[3],
      duration: item[4],
      url: item[5]
    }))
  })
})
// 点击表格列表的行
const sensitiveTableRow = (selectedRow: any) => {
  return {
    onClick: (row: any) => {
      $message("点击表格的行：" + selectedRow.beginTime + selectedRow.type + "敏感性事件")
      const url = "data/sensitive/" + selectedRow.url
      mapWork.openGeoJSON(selectedRow.beginTime + selectedRow.type + "敏感性事件", url)
    }
  }
}

// 按钮点击事件，演示loading持续三秒
const onClickLoading = async () => {
  $message("loading ")

  window.$showLoading()
  setTimeout(() => {
    // 关闭loading
    window.$hideLoading()

    // 默认的信息提示
    $message("data loaded")
  }, 3000)
}

// 按钮点击事件，演示顶部不遮盖的loading
const onClickTopLoading = () => {
  $message("演示顶部不遮盖的loaing,看上面", "warning")

  window.$showLoading("top") // top 调用出现在顶部的加载进度
  setTimeout(() => {
    window.$hideLoading("top")

    $message("演示加载失败提示", "error")
  }, 3000)
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
  height: 100%;
  overflow-y: scroll;
}
.infoView {
  width: 240px;
  height: 100%;
}

</style>
