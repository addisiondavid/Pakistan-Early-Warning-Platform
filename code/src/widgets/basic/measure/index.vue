<template>
  <mars-dialog :visible="true" :draggable="true" title="地理测量" right="40" top="90">
    <div class="f-mb">
      <a-space>
        <mars-button @click="clear">清除</mars-button>
        <a-checkbox @change="isChecked" v-model:checked="checked">仅测量模型(不拾取地形)</a-checkbox>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <mars-button @click="measureLength">空间距离</mars-button>
        <mars-button @click="measureArea">水平面积</mars-button>
        <mars-button @click="measureHeight">高度差</mars-button>
        <mars-button @click="measurePoint">坐标测量</mars-button>
      </a-space>
    </div>

    <div>
      <a-space>
        <mars-button @click="measureSurfaceLength">贴地距离</mars-button>
        <mars-button @click="measureSurfaceeArea">贴地面积</mars-button>
        <mars-button @click="measureTriangleHeight">三角测量</mars-button>
        <mars-button @click="measureAngle">方位角</mars-button>
      </a-space>
    </div>
  </mars-dialog>

</template>

<script setup lang="ts">
import { ref } from "vue"
import LocationTo from "@mars/components/mars-sample/location-to.vue"
import * as mapWork from "./map.ts"
import useLifecycle from "@mars/widgets/common/uses/use-lifecycle"
import { useWidget } from "@mars/widgets/common/store/widget"
import type { GuiItem } from "@mars/components/mars-ui/mars-gui"
const { activate, disable, currentWidget } = useWidget()
useLifecycle(mapWork)

const checked = ref(false)

// 空间距离
const measureLength = () => {
  mapWork.measureLength()
}
// 水平面积
const measureArea = () => {
  mapWork.measureArea()
}

// 高度差
const measureHeight = () => {
  mapWork.measureHeight()
}

// 坐标测量
const measurePoint = () => {
  mapWork.measurePoint()
}

// 贴地距离
const measureSurfaceLength = () => {
  mapWork.measureSurfaceLength()
}

// 贴地面积
const measureSurfaceeArea = () => {
  mapWork.measureSurfaceeArea()
}

// 三角测量
const measureTriangleHeight = () => {
  mapWork.measureTriangleHeight()
}
// 方位角
const measureAngle = () => {
  mapWork.measureAngle()
}

const isChecked = () => {
  mapWork.onlyPickModelPosition(checked.value)
}
const clear = () => {
  mapWork.removeAll()
}
</script>
