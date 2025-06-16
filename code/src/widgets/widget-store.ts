/**
 * 功能示例 的 widget配置（更多请参考基础项目Vue版）
 * @copyright 火星科技 mars3d.cn
 * @author 火星吴彦祖 2022-02-19
 */
import { defineAsyncComponent, markRaw } from "vue"
import { WidgetState } from "@mars/widgets/common/store/widget"
import { StoreOptions } from "vuex"

const store: StoreOptions<WidgetState> = {
  state: {
    map: null,
    widgets: [
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/manage-layers/index.vue"))),
        name: "manage-layers",
        group: "manage",
        disableOther: ["roamfly"]
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/manage-layers/layer-tree.vue"))),
        name: "layer-tree"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/floodByMaterial/index.vue"))),
        name: "floodByMaterial",
        disableOther: false,
        autoDisable: false
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/contourLine/index.vue"))),
        name: "contourLine",
        disableOther: false,
        autoDisable: false
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/bookmark/index.vue"))),
        name: "bookmark",
        disableOther: false,
        autoDisable: false
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/draw/index.vue"))),
        name: "draw",
        disableOther: false,
        autoDisable: false
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/expImage/index.vue"))),
        name: "expImage",
        disableOther: false,
        autoDisable: false
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/typhoon/index.vue"))),
        name: "typhoon",
        disableOther: false,
        autoDisable: false
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/measure/index.vue"))),
        name: "measure",
        disableOther: false,
        autoDisable: false
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/measure-section/index.vue"))),
        name: "measure-section",
        disableOther: false,
        autoDisable: false
      }
    ],
    openAtStart: [""]
  }
}

export default store
