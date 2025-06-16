<template>
  <headMenu />
  <config-provider :locale="locale">
    <main-operation @childMounted="onChildMounted" />
    <template v-if="mapLoaded">
      <template v-for="comp in widgets" :key="comp.key">
        <mars-widget v-if="openAtStart.includes(comp.name) && comp.visible" v-model:visible="comp.visible" :widget="comp" />

      </template>
    </template>
  </config-provider>
  
  <mars-dialog left="420" right="300" top="80" bottom="30" title="产品绘图" v-model:visible="showImg">
    <img :src="imges" style="width: 100%; height: 100%" />
  </mars-dialog>
  <footerCom />
</template>

<script setup lang="ts">
import headMenu from "./header.vue"
import footerCom from "./footer.vue"
import { ref, provide, computed } from "vue"
import MainOperation from "@mars/components/mars-work/main-operation.vue"
import { useWidgetStore, useWidget } from "@mars/widgets/common/store/widget"
import MarsWidget from "@mars/widgets/widget.vue"
import { ConfigProvider } from "ant-design-vue"
import locale from "ant-design-vue/lib/locale-provider/zh_CN"


const { activate, isActivate, disable } = useWidget()
const widgetStore = useWidgetStore()

const mapLoaded = ref(false) // map加载完成
const widgets = computed(() => widgetStore.state.widgets)
const openAtStart = computed(() => widgetStore.state.openAtStart)
let mapObj = computed(() => widgetStore.state.map)
let mapInstance: any = null
const imges = ref()
const showImg = ref<boolean>(false)
provide("getMapInstance", () => {
  mapObj = mapInstance
  return mapInstance
})

const marsOnload = (map: any) => {
  mapInstance = map
  mapObj = mapInstance
  mapLoaded.value = true

  map.addControl(new mars3d.control.ToolButton({
    title: "视角收藏",
    icon: "img/icon/Eye.svg",
    click: () => {
      if (!isActivate("bookmark")) {
        activate("bookmark")
      } else {
        disable("bookmark")
      }
    }
  }))
  map.addControl(new mars3d.control.ToolButton({
    title: "台风",
    icon: "img/icon/Gem.svg",
    click: () => {
      if (!isActivate("typhoon")) {
        activate("typhoon")
      } else {
        disable("typhoon")
      }
    }
  }))
  // map.addControl(new mars3d.control.ToolButton({
  //   title: "书签",
  //   icon: "img/icon/Star.svg",
  //   click: () => {
  //     if (!isActivate("bookmark")) {
  //       activate("bookmark")
  //     } else {
  //       disable("bookmark")
  //     }
  //   }
  // }))
  map.addControl(new mars3d.control.ToolButton({
    title: "地图标注",
    icon: "img/icon/Edit.svg",
    click: () => {
      if (!isActivate("draw")) {
        activate("draw")
      } else {
        disable("draw")
      }
    }
  }))
  map.addControl(new mars3d.control.ToolButton({
    title: "等高线",
    icon: "img/icon/Filter.svg",
    click: () => {
      if (!isActivate("contourLine")) {
        activate("contourLine")
      } else {
        disable("contourLine")
      }
    }
  }))
  map.addControl(new mars3d.control.ToolButton({
    title: "剖面分析",
    icon: "img/icon/Figma.svg",
    click: () => {
      if (!isActivate("measure-section")) {
        activate("measure-section")
      } else {
        disable("measure-section")
      }
    }
  }))
  map.addControl(new mars3d.control.ToolButton({
    title: "淹没分析",
    icon: "img/icon/Water.svg",
    click: () => {
      if (!isActivate("floodByMaterial")) {
        activate("floodByMaterial")
      } else {
        disable("floodByMaterial")
      }
    }
  }))
  map.addControl(new mars3d.control.ToolButton({
    title: "地理测量",
    icon: "img/icon/Filter.svg",
    click: () => {
      if (!isActivate("measure")) {
        activate("measure")
      } else {
        disable("measure")
      }
    }
  }))
  map.addControl(new mars3d.control.ToolButton({
    title: "图层管理",
    icon: "img/icon/Menu.svg",
    click: () => {
      if (!isActivate("manage-layers")) {
        activate("manage-layers")
      } else {
        disable("manage-layers")
      }
    }
  }))
  map.addControl(new mars3d.control.ToolButton({
    title: "导出产品",
    icon: "img/icon/Image.svg",
    click: () => {
      if (!isActivate("expImage")) {
        activate("expImage")
      } else {
        disable("expImage")
      }
    }
  }))
}

function onChildMounted() {
  window.marsEditor.useLifecycle() // 通知执行mapWork.onMounted
  marsOnload(window._mapInstance)
}
</script>
<style lang="less">
.marsgis-editor__container .layout-right {
  position: absolute !important;
}
</style>
