<template>

  <div class="f-mb">
    <a-space>
      <span>数据测试:</span>
      <mars-input-number :min="1" :max="1000000" v-model:value="formState.count" step="1"></mars-input-number>条
      <mars-button @click="addRandomGraphicByCount">生成</mars-button>
      <mars-button @click="onClickClear">
        <mars-icon icon="delete" class="icon-vertical-a" />
        清除
      </mars-button>
    </a-space>
  </div>

</template>

<script lang="ts" setup>
/**
 * 公共组件：封装矢量图层操作
 * @copyright 火星科技 mars3d.cn
 * @author 木遥 2022-01-01
 */
import { ref, reactive, onMounted, markRaw } from "vue"
import type { UnwrapRef } from "vue"
import { $alert, $message, $showLoading, $hideLoading } from "@mars/components/mars-ui/index"
import { useWidget } from "@mars/widgets/common/store/widget"

const props = withDefaults(
  defineProps<{
    interaction?: boolean // 是否可以鼠标拾取和交互
    enabledDraw?: boolean // 是否可以绘制
    drawLabel1?: string // 绘制按钮 文本
    drawLabel2?: string // 绘制按钮2 文本
    defaultCount?: number // 默认的数据量
    customEditor?: string
  }>(),
  {
    interaction: true,
    enabledDraw: true,
    drawLabel1: "图上标绘",
    drawLabel2: undefined,
    defaultCount: 100,
    customEditor: ""
  }
)

interface FormState {
  enabledShowHide: boolean
  enabledPopup: boolean
  enabledTooltip: boolean
  enabledRightMenu: boolean
  enabledOpacity: boolean
  opacity: number
  enabledEdit: boolean
  hasEdit: boolean
  hasTable: boolean
  count: number
  isDrawing: boolean
}

const formState: UnwrapRef<FormState> = reactive({
  enabledShowHide: true,
  enabledPopup: true,
  enabledTooltip: false,
  enabledRightMenu: false,
  enabledOpacity: true,
  opacity: 1,
  enabledEdit: true,
  hasEdit: false,
  hasTable: false,
  count: props.defaultCount,
  isDrawing: false
})

const currentPage = ref(5) // 分页查询每页条数

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork
const mars3d = mapWork.mars3d

defineExpose({
})

onMounted(() => {
  // 恢复默认状态
  if (mapWork.eventTarget) {
    mapWork.eventTarget.on("defuatData", (item: any) => {
      formState.opacity = 1.0
      formState.enabledShowHide = item.enabledShowHide
      formState.enabledPopup = item.enabledPopup
      formState.enabledTooltip = item.enabledTooltip
      formState.enabledRightMenu = item.enabledRightMenu
    })
  }

  setTimeout(() => {
    const layer = getManagerLayer()
    if (layer) {
      formState.enabledShowHide = layer.show
      formState.enabledPopup = layer.hasPopup()
      formState.enabledTooltip = layer.hasTooltip()
      formState.enabledRightMenu = layer.hasContextMenu()

      const graphics = layer.getGraphics()

      if (graphics.length > 0) {
        const lastgraphic = graphics[graphics.length - 1]
        formState.enabledOpacity = lastgraphic.hasOpacity
        formState.enabledEdit = lastgraphic.hasEdit
      }

      formState.hasTable = graphics.length > 0

      layer.on([mars3d.EventType.drawCreated, mars3d.EventType.removeGraphic], function (e) {
        formState.isDrawing = false
      })
    }
  }, 500)
})

// 获取map.js中定义的需要管理的图层
function getManagerLayer() {
  if (mapWork.getManagerLayer) {
    return mapWork.getManagerLayer()
  }
  return mapWork.graphicLayer
}

// 生成大数据
const addRandomGraphicByCount = () => {
  $showLoading()
  const startTime = new Date().getTime()

  const result = mapWork.addRandomGraphicByCount(formState.count)

  $hideLoading()
  const layer = getManagerLayer()
  layer.flyTo({ duration: 0, heading: 0, pitch: -40, scale: 1.2 })
}

//  清除数据
const onClickClear = () => {
  const layer = getManagerLayer()

  layer.enabledEvent = false // 关闭事件，大数据removeGraphic时效率低
  layer.clear()
  layer.enabledEvent = true

  formState.isDrawing = false

}


// 数据编辑属性面板 相关处理
const { activate, disable, isActivate, updateWidget } = useWidget()
onMounted(() => {
  const graphicLayer = getManagerLayer()

})

</script>

<style scoped lang="less">
.mars-pannel-item-label {
  width: auto;
}
.ant-input-number {
  width: 152px;
}
:deep(.ant-slider) {
  width: 80px;
}
:deep(.ant-table-pagination) {
  margin: 10px 0 1px 0 !important;
}
.data-list {
  width: 450px;
}
</style>
