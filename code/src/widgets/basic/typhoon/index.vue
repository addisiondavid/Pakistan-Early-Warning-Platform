<template>
  <mars-dialog :visible="true" :draggable="true" title="Typhoon List"  right="10" top="90" width="380">
    <mars-table
      size="small"
      :row-selection="rowSelection"
      bordered
      :pagination="{ pageSize: 2 }"
      :columns="columns"
      :data-source="typhoonList"
      rowKey="id"
    >
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">
          <a>{{ text }}</a>
        </template>
      </template>
    </mars-table>

    <div class="playBtn" v-if="formState.show">
      <a-space>
        <mars-button @click="startPlay" v-if="!formState.play">播放</mars-button>
        <mars-button @click="stopPlay" v-if="formState.play">停止</mars-button>

        已选择：{{ formState.name_cn }}
      </a-space>
    </div>

    <mars-table
      size="small"
      v-if="formState.show"
      :scroll="{ y: tableScrollHeight }"
      :sticky="true"
      bordered
      :pagination="false"
      :columns="columnsPath"
      :data-source="formState.path"
      :customRow="rowClick"
      rowKey="id"
    >
      <template #bodyCell="{ text }">
        <a>{{ text }}</a>
      </template>
    </mars-table>
  </mars-dialog>

  <div class="legendContent">
    <ul>
      <li><span class="round" style="background-color: #eed139"></span>热带低压</li>
      <li><span class="round" style="background-color: #0000ff"></span>热带风暴</li>
      <li><span class="round" style="background-color: #0f8000"></span>强热带风暴</li>
      <li><span class="round" style="background-color: #fe9c45"></span>台风</li>
      <li><span class="round" style="background-color: #fe00fe"></span>强台风</li>
      <li><span class="round" style="background-color: #fe0000"></span>超强台风</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
import { TableColumnType, TableProps } from "ant-design-vue"
import { setAutoHeight } from "@mars/utils/mars-util"
import axios from "axios"
import * as mapWork from "./map.ts"
import { useWidget } from "@mars/widgets/common/store/widget"
import useLifecycle from "@mars/widgets/common/uses/use-lifecycle"
import type { GuiItem } from "@mars/components/mars-ui/mars-gui"
import { typhoonData } from "./typhoonData_2659279.js"
const { activate, disable, currentWidget, isActivate, updateWidget } = useWidget()
useLifecycle(mapWork)

interface typhoon {
  id: number
  name_en: string
  name_cn: string
  typnumber?: string
  state?: string
  path?: any
  show: boolean // 是否显示
  play: boolean // 是否在播放
}
const columns: TableColumnType[] = [
  {
    title: "typnumber",
    dataIndex: "typnumber",
    key: "typnumber"
  },
  {
    title: "name_en",
    dataIndex: "name_en"
  }
]

const columnsPath: TableColumnType[] = [
  {
    title: "time",
    dataIndex: "time_str",
    width: 110,
    ellipsis: true
  },

  {
    title: "speed",
    dataIndex: "centerSpeed",
    width: 46
  },
  {
    title: "moveTo",
    dataIndex: "moveTo_str"
  },
  {
    title: "level",
    dataIndex: "level_str"
  }
]

const typhoonList = ref<typhoon[]>([]) // 台风列表数据
const tableScrollHeight = ref(100)
// 当前选择的台风
const formState = reactive<typhoon>({
  id: 0,
  name_en: "",
  name_cn: "",
  path: [],
  show: false,
  play: false
})

// 高度自适应
onMounted(() => {
  // 访问后端接口，取台风列表数据
  // url: "http://typhoon.nmc.cn/weatherservice/typhoon/jsons/list_default", //在线实时接口
  const url = "data/typhoonlist.json"
  axios.get(url).then(function (res: any) {
    const data = res.data
    typhoonList.value = data.map((item: any) => ({
      id: item.xuhao,
      name_en: item.engname,
      name_cn: item.tfbhbabj,
      typnumber: item.xuhao,
      state: item.zone
    }))
  })

  setAutoHeight((height) => {
    tableScrollHeight.value = height - 64
  }, 420)
})

const rowSelection: TableProps["rowSelection"] = {
  hideSelectAll: true,
  onSelect: (selectedRowKeys: typhoon, selected: boolean) => {
    selectedRowKeys.show = selected

    if (selected) {
      if (!selectedRowKeys.path) {
     
        getPath(selectedRowKeys.id).then((res) => {
          console.log("res.......", res)
          selectedRowKeys.path = res.path
          selectOneTyphoon(selectedRowKeys)
        })
        
        
      } else {
        selectOneTyphoon(selectedRowKeys)
      }
    } else {
      formState.show = false
      formState.play = false
      formState.path = []
      formState.name_cn = ""
      mapWork.unSelectOneTyphoon(selectedRowKeys.id)
    }
  }
}
// 点击台风列表的行
const tyRowClick = (recode: typhoon) => {
  return {
    onClick: () => {
      if (recode.show && recode.path) {
        selectOneTyphoon(recode)
      }
    }
  }
}

// 选择了单个台风
function selectOneTyphoon(item: typhoon) {
  formState.path = item.path
  formState.name_cn = item.name_cn
  formState.show = true
  formState.play = false

  mapWork.selectOneTyphoon(item)
}

// 访问后端接口，取单个台风轨迹数据
function getPath(id) {

  const url = "data/typhoon/" + id + ".json"

  return axios.get(url).then(function (res: any) {
   
    const newData = conversionPathData(res.data) // 在Typhoon.js中
    return newData
  })
  
}

// 点击行
const rowClick = (recode: any) => {
  return {
    onClick: () => {
      mapWork.clickPathRow(recode)
    }
  }
}

const startPlay = () => {
  mapWork.startPlay()
  formState.play = true
}

const stopPlay = () => {
  mapWork.stopPlay()
  formState.play = false
}

// 转换数据,将后端接口数据转换为需要的格式
function conversionPathData(oldData) {
  const path = []
// FCSTType: "BABJWTPQ"
  let points = []
  oldData.data.forEach(elem => {
    if (points.length === 0 && elem.FCSTType === "BABJWTPQ") {
      points = elem.BABJWTPQ
    } else if (points.length === 0 && elem.FCSTType === "PGTWSUBJ") {
      points = elem.PGTWSUBJ
    }
  })
  points.forEach((ele) => {
    const time = mapWork.formatDate(new Date(ele.validtime), "yy-MM-dd HH:mm") // 时间
    const arrForecast = []
    const newArr = {
      time: new Date(ele.validtime), // 几小时预报
      time_str: time,
      lon: ele.lon, // 预报经度
      lat: ele.lat, // 预报纬度
      strength: ele.strength, // 中心气压
      centerSpeed: ele.movedir, // 最大风速  m/s
      level: ele.strength, // 预报台风等级, 代码
      color: getColor(ele.strength) // 对应等级的颜色
    }
    arrForecast.push(newArr)
    path.push({
      id: "01235555", // 唯一标识
      time: new Date(ele.validtime), // 时间
      time_str: time, // 时间格式化字符串
      level: ele.strength, // 台风等级, 代码
      level_str: ele.level,
      color: getColor(ele.strength), // 对应等级的颜色
      lon: ele.lon, // 经度
      lat: ele.lat, // 纬度
      strength: ele.strength, // 中心气压,百帕
      centerSpeed: ele.windv, // 最大风速,米/秒
      moveTo: ele.movedir, // 移动方向, 代码
      moveTo_str: getMoveToStr(ele.movedir),
      windSpeed: ele.movespeed, // 移动速度,公里/小时
      forecast: arrForecast // 预测路径, 数组
    })   
  })

  console.log("path.....", path)

  return {
    path: path
  }

}

// 不同等级的台风对应不同的颜色
function getColor(level) {
  switch (level) {
    case "TD": // 热带低压
      return "rgb(238,209,57)"
    case "TS": // 热带风暴
      return "rgb(0,0,255)"
    case "STS": // 强热带风暴
      return "rgb(15,128,0)"
    case "TY": // 台风
      return "rgb(254,156,69)"
    case "STY": // 强台风
      return "rgb(254,0,254)"
    case "SuperTY": // 超强台风
      return "rgb(254,0,0)"
    default:
  }
}

function getLevelStr(value) {
  switch (value) {
    case "TD":
      return "热带低压"
    case "TS":
      return "热带风暴"
    case "STS":
      return "强热带风暴"
    case "TY":
      return "台风"
    case "STY":
      return "强台风"
    case "SuperTY":
      return "超强台风"
    default:
  }
}

function getMoveToStr(value) {
  switch (value) {
    case "N":
      return "北"
    case "NNE":
      return "北东北"
    case "NE":
      return "东北"
    case "ENE":
      return "东东北"
    case "E":
      return "东"
    case "ESE":
      return "东东南"
    case "ES":
      return "东南"
    case "SSE":
      return "南东南"
    case "S":
      return "南"
    case "SSW":
      return "南西南"
    case "SW":
      return "西南"
    case "WSW":
      return "西西南"
    case "W":
      return "西"
    case "WNW":
      return "西北西"
    case "NW":
      return "北西"
    case "NNW":
      return "北西北"
    default:
  }
}
</script>
<style scoped lang="less">
.playBtn {
  margin-bottom: 5px;
}

.legendContent {
  position: fixed;
  bottom: 35px;
  left: 48px;
  color: #e9e9e9;
  text-shadow: 2px 2px 2px #000;
  background-color: rgba(0, 0, 0, 0.4);
}
.legendContent ul {
  margin: 0;
  padding: 0;
}
.legendContent li {
  margin: 3px 9px;
  line-height: 22px;
  float: left;
}
.legendContent span.round {
  width: 8px;
  height: 8px;
  border-radius: 5px;
  display: inline-block;
  margin-right: 6px;
}
</style>
