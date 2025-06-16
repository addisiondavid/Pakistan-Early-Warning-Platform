<template>
    <div id="legendSlider" class="legend_slider" :style="{minWidth: containW + 'px'}" v-if="isShow">
        <!-- <span class="shrinBtn"><v-icon name="chevrons-right" /></span> -->
        <div class="legendSliderContent" v-show="legendOriginalData.length > 0">
            <h6>{{legendName}}</h6>
            <div class="color_bar_contain">
                <div id="colorBar" class="color_bar">
                    <span :class="{'text_label': isNaN(valueBars[index]) || labelBars.length > 0}" v-for="(colorBar,index) in colorBars" :key="colorBar.id" :style="{backgroundColor: colorBar, width: width + 'px'}">
                        <label>{{(labelBars[index] === "label" ? "" : labelBars[index]) || (labelBars[index] != "label" && Math.abs(Number(valueBars[index])) != Infinity ? valueBars[index] : "")}}</label>
                    </span>
                </div>
                <div id="slider" :style="{width: slideW + 'px'}"></div>
            </div>
        </div>
        <div class="otherLegendContent" v-if="otherLegendData.prevLegend != null">
            <div class="color_bar other_color_bar" v-for="(legendData, key) in otherLegendData" :key="key" >
                <h6>{{legendData.name}}</h6>
                <div class="color_bar_contain">
                    <span :class="{'text_label': legendData.isText}" v-for="(colorBar) in legendData.colors" :key="colorBar.id" :style="{backgroundColor: colorBar.color, width: legendData.width + 'px'}">
                        <label>{{ legendData.isText ? colorBar.label : Math.abs(Number(colorBar.end)) != Infinity ? colorBar.end : ""  }}</label>
                    </span>
                </div>
            </div>
        </div>
        <div class="typhoonLegend" v-if="JSON.stringify(typhoonLegendData) != '{}'">
            <div class="typ_level" v-if="typhoonLegendData.level">
                <h6>{{typhoonLegendData.level.name}}</h6>
                <ul>
                    <li v-for="levelItem in typhoonLegendData.level.value" :key="levelItem.no" :style="{backgroundColor: levelItem.color}"><label>{{levelItem.label}}</label></li>
                </ul>
            </div>
            <div class="typ_organ" v-if="typhoonLegendData.ogran">
                <h6>{{typhoonLegendData.ogran.name}}</h6>
                <ul>
                    <li v-for="ogranItem in typhoonLegendData.ogran.value" :key="ogranItem.no" :style="{borderTopColor: ogranItem.color}"><label>{{ogranItem.label}}</label></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery"

export default {
    name: "legend_slider",
    props: {
        legendItemStr: String
    },
    data () {
        return {
            isShow: false,
            legendOriginalData: [],
            legendNewData: [],
            legendName: "",
            colorBars: [],
            valueBars: [],
            labelBars: [],
            width: 0,
            slideW: 0,
            step: 0,
            containW: 450,
            currentFromIndex: 0,
            currentToIndex: 0,
            invalidColor: "rgba(47, 53, 60, 0.8)",
            legendConfig: this.$store.state.legendConfig,
            updatedLegendSupertype: 4,
            otherLegendData: {},
            typhoonLegendData: {}
        }
    },
    watch: {
        legendItemStr: {
          handler(legendItem) {
            console.info(legendItem)
            console.info(legendItem)
            this.otherLegendData = {
                prevLegend: null
            }
            this.legendOriginalData = []
            this.typhoonLegendData = {}
            for (const id in legendItem) {
                const leg = legendItem[id]
                if (leg.superposition === 0 && [4, 5, 11].includes(leg.supertype)) {
                    this.updatedLegendSupertype = leg.supertype

                    if (this.legendConfig[leg.legend]) {
                        this.legendOriginalData = this.legendConfig[leg.legend].value || []
                        this.legendName = this.legendConfig[leg.legend].name || ""
                    }
                    this.$store.dispatch("changLegendCurrentColors", this.legendOriginalData)
                    $("#slider").empty()

                    this.colorBars.length = 0
                    this.valueBars.length = 0
                    this.legendNewData.length = 0
                    this.labelBars.length = 0

                    if (this.legendOriginalData.length) {
                        this.currentToIndex = this.legendOriginalData.length
                        this.initLegendSlider(id)
                    }
                } else if (leg.legend === "TYPHOON") {
                    if (this.legendConfig[leg.legend]) {
                        this.typhoonLegendData = this.legendConfig[leg.legend]
                        this.isShow = true
                    }
                } else {
                    if (this.legendConfig[leg.legend] && this.otherLegendData.prevLegend !== leg.legend) {
                        this.otherLegendData.prevLegend = leg.legend
                        leg.colors = this.legendConfig[leg.legend].value || []
                        leg.name = this.legendConfig[leg.legend].name || ""
                        this.$store.dispatch("changLegendCurrentColors", leg.colors)
                        this.initOtherLegend(leg.id, leg)
                    }
                }
            }
          },
          deep: true
        }
    },
    methods: {
        initOtherLegend(id, legendItem) {
            $("#slider").empty()
            const orgLen = legendItem.colors.length
            // 计算slider每格宽度
            legendItem.width = (orgLen <= 10 ? 70 : 640 / orgLen)
            this.containW = legendItem.width * orgLen + 60
            legendItem.isText = false
            if (legendItem.colors[0].start === "" && legendItem.colors[0].end === "") {
              legendItem.isText = true
            }
            this.otherLegendData[id] = legendItem
            this.isShow = true
        },
        initLegendSlider(id) {
            const orgLen = this.legendOriginalData.length
            this.legendNewData = Object.assign(this.legendNewData, this.legendOriginalData)

            this.setColorSiderData(orgLen)

            // 计算slider每格宽度
            this.width = (orgLen <= 10 ? 70 : 640 / orgLen)
            this.containW = this.width * orgLen + 60
            this.slideW = this.width * orgLen
            this.step = this.width / this.slideW * 100

            if (!(this.colorBars.length === this.legendOriginalData.length)) {
                this.legendNewData.unshift(this.legendOriginalData[0])
            }
            this.isShow = true
            this.startUpSlider(id)
        },
        /**
         * [setColorSiderData 构建slider所需的数据]
         */
        setColorSiderData(orgLen) {
            // 判断是否是两端为极值
            if (Math.abs(Number(this.legendOriginalData[0].start)) !== Infinity) {
                this.colorBars.push(this.legendOriginalData[0].color.toLowerCase())
                this.valueBars.push(this.legendOriginalData[0].start)
                this.$nextTick(() => {
                    $("#colorBar > span:first").addClass("firstChild")
                })
            } else {
                $("#colorBar > span:first").removeClass("firstChild")
            }
            // 如果末端有中文，需在末端填充中文
            if (this.legendOriginalData[0].label) {
                this.labelBars.push(this.legendOriginalData[0].label)
            }
            // 根据原始图例配置数据，填充颜色，数值数组
            for (let i = 0; i < orgLen; i++) {
                const data = this.legendOriginalData[i]
                this.colorBars.push(data.color.toLowerCase())
                this.valueBars.push(data.end)
                // 判断下一条是否还有中文
                if (Number(i) + 1 < orgLen) {
                    if (this.legendOriginalData[Number(i) + 1].label) {
                        this.labelBars.push(this.legendOriginalData[Number(i) + 1].label)
                    }
                }
            }
        },
        startUpSlider(id) {
            this.$nextTick(() => {
                $("#slider").slider({
                    range: !0,
                    step: this.step,
                    values: [0, 100],
                    change: function(event, ui) {
                        if (event.currentTarget) {
                            this.updatedColorValue(ui, id)
                        }
                    }
                })
            })
        },
        updatedColorValue(ui, id) {
            const fromIndex = Math.round(ui.values[0] / this.step)
            const toIndex = Math.round(ui.values[1] / this.step)
            const isExistFirstChildDom = !(this.colorBars.length === this.legendOriginalData.length)

            if (ui.handleIndex === 0) {
                this.updatedLeftButton(fromIndex, toIndex, isExistFirstChildDom)
            } else {
                this.updatedRightButton(fromIndex, toIndex, isExistFirstChildDom)
            }
            // 更新实际图例有效颜色
            const legendCurrentColors = this.legendOriginalData.filter((item, index) => {
                if (!isExistFirstChildDom) {
                    return this.colorBars[index] === item.color.toLowerCase()
                } else {
                    return this.colorBars[index + 1] === item.color.toLowerCase()
                }
            })
            this.currentFromIndex = fromIndex
            this.currentToIndex = toIndex
            // 触发地图叠加点的更新
            this.$store.dispatch("changLegendCurrentColors", legendCurrentColors)
            this.$store.state.layers[this.updatedLegendSupertype].updatedLayer(null, true, id)
        },
        /**
         * [updatedLeftButton sider左侧按钮更新]
         * @param  {[type]}  fromIndex            [按钮起点]
         * @param  {[type]}  toIndex              [按钮终点]
         * @param  {Boolean} isExistFirstChildDom [是否存在firstChild节点]
         * @return {[type]}                       [null]
         */
        updatedLeftButton(fromIndex, toIndex, isExistFirstChildDom) {
            // 向右
            if (this.currentFromIndex <= fromIndex) {
                this.colorBars = this.colorBars.map((item, index) => {
                    if (!isExistFirstChildDom) {
                        return index < fromIndex ? this.invalidColor : item
                    } else {
                        return index <= fromIndex ? this.invalidColor : item
                    }
                })
            } else {
            // 向左
                this.colorBars = this.legendNewData.map((item, index) => {
                    if (!isExistFirstChildDom) {
                        return index >= fromIndex && index < toIndex ? item.color.toLowerCase() : this.invalidColor
                    } else {
                        return index > fromIndex && index <= toIndex ? item.color.toLowerCase() : this.invalidColor
                    }
                })
            }
        },
        /**
         * [updatedLeftButton sider右侧按钮更新]
         * @param  {[type]}  fromIndex            [按钮起点]
         * @param  {[type]}  toIndex              [按钮终点]
         * @param  {Boolean} isExistFirstChildDom [是否存在firstChild节点]
         * @return {[type]}                       [null]
         */
        updatedRightButton(fromIndex, toIndex, isExistFirstChildDom) {
            // 向右
            if (this.currentToIndex <= toIndex) {
                this.colorBars = this.legendNewData.map((item, index) => {
                    if (!isExistFirstChildDom) {
                        return index < fromIndex || index >= toIndex ? this.invalidColor : item.color.toLowerCase()
                    } else {
                        return index <= fromIndex || index > toIndex ? this.invalidColor : item.color.toLowerCase()
                    }
                })
            } else {
            // 向左
                this.colorBars = this.colorBars.map((item, index) => {
                    if (!isExistFirstChildDom) {
                        return index < toIndex ? item : this.invalidColor
                    } else {
                        return index <= toIndex ? item : this.invalidColor
                    }
                })
            }
        }
    }
}
</script>
<style scoped lang="less">
.legend_slider {
    position: fixed;
    right: 2px;
    bottom: 60px;
    padding: 7px 20px 5px;
    min-height: 30px;
    background: rgba(255,255,255,0.9);
    border: 1px solid rgba(26,198,180,1);
    z-index: 2;
    border-radius: 10px;
    h6 {
        float: left;
        height: 15px;
        min-width: 30px;
        line-height: 15px;
        margin: 0 15px 0 -10px;
        font-size: 12px;
        font-weight: 500;
        text-align: center;
        color: #fff;
        overflow: hidden;
    }
    .color_bar_contain {
        float: left;
    }
}
.color_bar {
    position: absolute;
    z-index: 0;
    font-size: 0;
    font-weight: 700;
    color: #fff;
    z-index: 2;
    label {
        display: block;
        float: right;
        margin-top: 15px;
        margin-right: -6px;
        font-size: 12px;
        //transform: scale(0.7);
    }
    span {
        display: block;
        float: left;
        height: 15px;
        border: none;
        text-align: right;
        white-space: nowrap;
        &.firstChild {
            width: 0 !important;
            min-width: 0;
            label {
                margin-left: -20px;
            }
        }
    }
    .text_label {
        label {
            margin-right: -60px;
        }
    }
}
#slider {
    border: none;
    cursor: pointer;
}
.legendSliderContent {
    margin-bottom: 20px;
}
.other_color_bar {
    position: relative;
}
.otherLegendContent {
    margin-top: 5px;
    margin-left: -5px;
    min-height: 15px;
    h6 {
        margin-left: 10px;
    }
    .other_color_bar {
        height: 15px;
        margin-bottom: 20px;
        .text_label {
            width: 15px !important;
            height: 15px;
            min-width: 15px;
            margin-right: 55px;
            border-radius: 10px;
            label {
                width: 200%;
                margin-top: -1px;
                margin-right: -35px;
                text-align: left;
            }
        }
    }
}
.typhoonLegend {
    .typ_level {
        height: 25px;
        font-size: 12px;
        color: #fff;
        > label,
        > ul {
            float: left;
        }
        li {
            float: left;
            width: 70px;
            height: 16px;
            label {
                display: block;
                text-align: center;
                transform: scale(0.8);
            }
        }
    }
    .typ_organ {
        height: 18px;
        font-size: 12px;
        color: #fff;
        > label,
        > ul {
            float: left;
        }
        li {
            float: left;
            width: 60px;
            margin-right: 10px;
            border-top-style: dashed;
            border-top-width: 2px;
            label {
                display: block;
                text-align: center;
                transform: scale(0.8);
            }
        }
    }
}
</style>
