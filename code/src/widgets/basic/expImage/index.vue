<template>
  <mars-dialog :visible="true" :draggable="true" right="10" top="90" width="220" title="Product Making" >
    <mars-button @click="drawLabel1">Image Title</mars-button>
    <mars-button @click="drawLabel2">Image Time</mars-button>
    <mars-button @click="drawLogo">Unit Logo</mars-button>
    <mars-button @click="drawLegend">Image Legend</mars-button>
    <mars-button @click="clipData">clip Data</mars-button>
    <mars-button @click="showMapImg">Preview Image</mars-button>
  </mars-dialog>

  <mars-dialog left="50" right="50" top="100" bottom="60" zIndex=100 v-model:visible="showImg" class="customDialog">
    <div class="ui-container-image" >
      <img :src="imges" class="productImg"/>
    </div>
    <div class="ui-container-warning" >
      <a-form :model="formState" >
        <a-collapse v-model:activeKey="activeKey" expandIconPosition="right">
          <a-collapse-panel key="1" header="Warning Content">
            <div style="display:flex">
              <a-form-item label="Language" name="Language" :label-col="{ span: 13 }" :wrapper-col="{ span: 26 }">
                <mars-input v-model:value="formState.language" readonly/>
              </a-form-item>
              <a-form-item label="Category" name="Category" :label-col="{ span: 11 }" :wrapper-col="{ span: 20 }">
                <mars-input v-model:value="formState.category" readonly/>
              </a-form-item>
              <a-form-item label="Event" name="Event" :label-col="{ span: 11 }" :wrapper-col="{ span: 20 }">
                <mars-input v-model:value="formState.event" :allowClear="true"/>
              </a-form-item>
            </div>
            <div style="display:flex">
              <a-form-item label="EventCode" name="EventCode" :label-col="{ span: 11 }" :wrapper-col="{ span: 20 }">
                <mars-input v-model:value="formState.eventCode" :allowClear="true"/>
              </a-form-item>
              <a-form-item label="ResponseType" name="ResponseType" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                <mars-input v-model:value="formState.responseType" :allowClear="true"/>
              </a-form-item>
              <a-form-item label="Urgency" name="Urgency" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                <mars-input v-model:value="formState.urgency" :allowClear="true"/>
              </a-form-item>
            </div>
            <div style="display:flex">
              <a-form-item label="Severity" name="Severity" :label-col="{ span: 12 }" :wrapper-col="{ span: 20 }">
                <mars-input v-model:value="formState.severity" :allowClear="true"/>
              </a-form-item>
              <a-form-item label="Certainty" name="Certainty" :label-col="{ span: 10 }" :wrapper-col="{ span: 20 }">
                <mars-input v-model:value="formState.certainty" :allowClear="true"/>
              </a-form-item>
            </div>
            <div style="display:flex">
              <a-form-item label="Effective" name="Effective" :label-col="{ span: 10 }" :wrapper-col="{ span: 30 }">
                <mars-date-picker v-model:value="formState.effective" format="YYYY-MM-DDTHH:mm:ss+08:00"/>
              </a-form-item>
              <a-form-item label="Expires" name="Expires" :label-col="{ span: 10 }" :wrapper-col="{ span: 20 }">
                <mars-date-picker v-model:value="formState.expires" format="YYYY-MM-DDTHH:mm:ss+08:00"/>
              </a-form-item>
            </div>
            <div style="display:flex">
              <a-form-item label="SenderName" name="SenderName" :label-col="{ span: 10 }" :wrapper-col="{ span: 20 }">
                <mars-input v-model:value="formState.senderName" readonly />
              </a-form-item>
              <a-form-item label="Headline" name="Headline" :label-col="{ span: 10 }" :wrapper-col="{ span: 20 }">
                <mars-input v-model:value="formState.headline" />
              </a-form-item>
            </div>
            <div>
              <a-form-item label="Description" name="Description" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
                <a-textarea v-model:value="formState.Description"></a-textarea>
              </a-form-item>
              <a-form-item label="Instruction" name="Instruction" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
                <a-textarea v-model:value="formState.instruction"></a-textarea>
              </a-form-item>
              <a-form-item label="Contact" name="Contact" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
                <mars-input v-model:value="formState.contact" :allowClear="true"/>
              </a-form-item>
            </div>
          </a-collapse-panel>
          <a-collapse-panel key="2" header="Warning Info">
            <div style="display:flex">
              <a-form-item label="Identifier" name="Identifier"  :label-col="{ span: 12 }" :wrapper-col="{ span: 20 }">
                <mars-input v-model:value="formState.identifier" readonly/>
              </a-form-item>
              <a-form-item label="Sender" name="Sender" :label-col="{ span: 12 }" :wrapper-col="{ span: 20 }">
                <mars-input v-model:value="formState.sender" readonly/>
              </a-form-item>
              <a-form-item label="Sent" name="Sent" :label-col="{ span: 12 }" :wrapper-col="{ span: 20 }">
                <mars-date-picker v-model:value="formState.sent" format="YYYY-MM-DDTHH:mm:ss+08:00"/>
              </a-form-item>
            </div>
            <div style="display:flex">
              <a-form-item label="Status" name="Status">
                <a-radio-group v-model:value="formState.status">
                  <a-radio value="Autual">Autual</a-radio>
                  <a-radio value="Draft">Draft</a-radio>
                  <a-radio value="Exercise">Exercise</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label="MsgType" name="MsgType">
                <a-radio-group v-model:value="formState.msgType">
                  <a-radio value="Alert">Alert</a-radio>
                  <a-radio value="Update">Update</a-radio>
                  <a-radio value="Cancel">Cancel</a-radio>
                  <a-radio value="Ack">Ack</a-radio>
                  <a-radio value="Error">Error</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label="Scope" name="Scope">
                <a-checkbox-group v-model:value="formState.checkAreas" >
                  <a-checkbox value="Public">Public</a-checkbox>
                  <a-checkbox value="Restricted">Restricted</a-checkbox>
                  <a-checkbox value="Private">Private</a-checkbox>
                </a-checkbox-group>
              </a-form-item>
            </div>
<!--            <mars-tree checkable :tree-data="treeData" v-model:expandedKeys="expandedKeys" v-model:checkedKeys="checkedKeys">
              <template #title="{ title }">
                <span>{{ title }}</span>
              </template>
            </mars-tree> -->
          </a-collapse-panel>
        </a-collapse>
            <div class="f-tac">
              <a-space>
                <mars-button size="middle" >
                  <template #icon><mars-icon icon="alarm" class="icon-vertical-a" /></template>
                  Warning Publish
                </mars-button>
              </a-space>
            </div>

      </a-form>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { onMounted, markRaw, reactive, ref } from "vue"
import useLifecycle from "@mars/widgets/common/uses/use-lifecycle"
import * as mapWork from "./map.ts"
import { useWidget } from "@mars/widgets/common/store/widget"
import type { Dayjs } from "dayjs"
import axios from "axios"
const { activate, disable, isActivate, currentWidget, updateWidget } = useWidget()
useLifecycle(mapWork)

const activeKey = ref(["1", "2", "3"])
const showImg = ref<boolean>(false)
const showScreenShot = ref<boolean>(false)

interface FormState {
  identifier: string
  sender: string
  send: Dayjs | null
  status: string
  msgType: string
  scope: string
  
  language: string
  category: string
  event: string
  eventCode: string
  responseType: string
  urgency: string
  severity: string
  certainty: string
  effective: Dayjs | null
  expires: Dayjs | null
  senderName: string
  headline: string
  description: string
  instruction: string
  web: string
  contact: string
}
const formState = reactive<FormState>({
  identifier: "110000_20160121160000_MDWI_Actual_Alert",
  sender: "PMD",
  send: null,
  status: "string",
  msgType: "Alert",
  scope: "string",
  
  language: "en-US",
  category: "Met",
  event: "string",
  eventCode: "string",
  responseType: "string",
  urgency: "string",
  severity: "string",
  certainty: "Observed",
  effective: null,
  expires: null,
  senderName: "Pakistan Meteorological Department",
  headline: "string",
  description: "string",
  instruction: "string",
  web: "string",
  contact: "string"
})
const imges = ref()
onMounted(() => {
  const mars3d = window.mapWork.mars3d
  // 矢量数据创建完成
  mapWork.graphicLayer.on(mars3d.EventType.drawCreated, function (e) {
    showEditor(e)
  })
  // 修改了矢量数据
  mapWork.graphicLayer.on(
    [mars3d.EventType.editStart, mars3d.EventType.editMovePoint, mars3d.EventType.editStyle, mars3d.EventType.editRemovePoint],
    function (e) {
      showEditor(e)
    }
  )
  // 停止编辑
  mapWork.graphicLayer.on([mars3d.EventType.editStop, mars3d.EventType.removeGraphic], function (e) {
    setTimeout(() => {
      if (!mapWork.graphicLayer.isEditing) {
        disable("graphic-editor")
      }
    }, 100)
  })
})

const showEditor = (e: any) => {
  const graphic = e.graphic
  if (!graphic._conventStyleJson) {
    graphic.options.style = graphic.toJSON().style // 因为示例中的样式可能有复杂对象，需要转为单个json简单对象
    graphic._conventStyleJson = true // 只处理一次
  }

  if (!isActivate("graphic-editor")) {
    activate({
      name: "graphic-editor",
      data: {
        graphic: markRaw(graphic)
      }
    })
  } else {
    updateWidget("graphic-editor", {
      data: {
        graphic: markRaw(graphic)
      }
    })
  }
}
const showMapImg = () => {
  mapWork.showMapImg().then((image) => {
    imges.value = image
    showImg.value = true
  })
}

function drawLogo() {
  mapWork.drawLogo()
}
function drawLegend() {
  mapWork.drawLegend()
}
function drawLabel1() {
  mapWork.drawLabel1()
}
function drawLabel2() {
  mapWork.drawLabel2()
}
function clipData() {
  mapWork.clipData()
}
const downLoad = () => {
  mapWork.downLoad()
}
const treeData = ref<any[]>([])
const layersObj: any = {}
const expandedKeys = ref<string[]>([])
const checkedKeys = ref<string[]>([])
onMounted(() => {
  // 取图层列表数据
  const url = "/data/userObj.json"
  axios.get(url).then(function (res: any) {
    const data = res.data
    const layers = data.layers
    for (let i = layers.length - 1; i >= 0; i--) {
      const layer = layers[i]
      const node: any = {
        title: layer.name,
        key: layer.id,
        id: layer.id,
        pId: layer.pid
      }
      node.children = findChild(node, layers)
      treeData.value.push(node)
      expandedKeys.value.push(node.key)
    }
  })
})

function findChild(parent: any, list: any[]) {
  return list
    .filter((item: any) => item.pid === parent.id)
    .map((item: any) => {
      const node: any = {
        title: item.name,
        key: item.id,
        id: item.id,
        pId: item.pid
      }
      const nodeLayer = mapWork.createLayer(item) // 创建图层
      layersObj[item.id] = nodeLayer
      node.children = findChild(node, list)
      expandedKeys.value.push(node.key)
      if (item.isAdded && item.show) {
        checkedKeys.value.push(node.key)
      }
      return node
    })
}

// 勾选了树节点
const onCheckTreeItem = (keys: string[]) => {
  Object.keys(layersObj).forEach((k) => {
    const newKeys = keys.map((item) => {
      return String(item)
    })
    const show = newKeys.indexOf(k) !== -1
    const layer = layersObj[k]
    layer.show = show
    if (show) {
      if (!layer.isAdded) {
        mapWork.map.addLayer(layer)
      }
      layer.flyTo()
    } else {
      if (layer.isAdded) {
        mapWork.map.removeLayer(layer)
      }
    }
  })
}
</script>
<style scoped lang="less">
.mars-button {
  margin-right: 8px;
  margin-bottom: 8px;
}
.infoView {
  overflow-y: auto;
}

.color-state {
  padding-bottom: 1.3px;
}
.ui-container-image {
  height: 100%;
  width: 42%;
  float: right;
  overflow-y: scroll;
}
.ui-container-warning {
  height: 100%;
  width: 58%;
  float: right;
  overflow-y: scroll;
  background: linear-gradient(to right,RGBA(12,81,152,.9),RGBA(12,81,152,.9),RGBA(12,81,152,.7))!important;
}
.productImg{
    width: 100%;
    margin-left: -500px;
    margin-top: 0px;
    position: absolute;
    clip: rect(0px 1250px 790px 500px);
}
</style>
