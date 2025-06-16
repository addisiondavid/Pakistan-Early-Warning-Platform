export default [{
    id: "T01",
    name: "风云卫星",
    subtitle: "FengYun Sate",
    childs: [
      {
        id: "T01-M01",
        name: "FY4A合成方案",
        subtitle: "FY4A Synthetic scheme",
        childs: [
          {
            id: "T01-M01-S01",
            name: "真彩色",
            subtitle: "NatureColor_NoLit",
            element: "NatureColor_NoLit",
            supertype: "15",
            dataCode: "fy-4a"
          }, {
            id: "T01-M01-S02",
            name: "自然色",
            subtitle: "Natural Color RGB Composite (From WMO)",
            element: "Natural",
            legend: "./img/legend/color_bar_1670_Natural_en.png",
            supertype: "15",
            dataCode: "fy-4a"
          }, {
            id: "T01-M01-S03",
            name: "沙尘",
            subtitle: "Dust RGB Composite (From WMO)",
            element: "Ash",
            legend: "./img/legend/color_bar_1670_dust_en.png",
            supertype: "15",
            dataCode: "fy-4a"
          }, {
            id: "T01-M01-S04",
            name: "气团",
            subtitle: "AirMass RGB Composite (From WMO)",
            element: "AirMass",
            legend: "./img/legend/color_bar_1670_air_mass_en.png",
            supertype: "15",
            dataCode: "fy-4a"
          }, {
            id: "T01-M01-S05",
            name: "雾/雪",
            subtitle: "Fog/Snow RGB Composite (From WMO)",
            element: "FogSnow",
            legend: "./img/legend/color_bar_1670_fog_snow_en.png",
            supertype: "15",
            dataCode: "fy-4a"
          }, {
            id: "T01-M01-S06",
            name: "强风暴",
            subtitle: "Severe Storms RGB Composite (From WMO)",
            element: "SevereStorms",
            legend: "./img/legend/color_bar_1670_severe_stroms_en.png",
            supertype: "15",
            dataCode: "fy-4a"
          }, {
            id: "T01-M01-S07",
            name: "对流云",
            subtitle: "CloudsConvection RGB Composite (From WMO)",
            element: "CloudsConvection",
            legend: "./img/legend/color_bar_1670_clouds_convection_en.png",
            supertype: "15",
            dataCode: "fy-4a"
          }, {
            id: "T01-M01-S08",
            name: "白天对流风暴",
            subtitle: "Day Convective Storms RGB Composite (From WMO)",
            element: "Convection",
            legend: "./img/legend/color_bar_1670_day_convective_storms_en.png",
            supertype: "15",
            dataCode: "fy-4a"
          }, {
            id: "T01-M01-S09",
            name: "白天微物理特征",
            subtitle: "Day Microphysics RGB Composite (From WMO)",
            element: "DayMicrophysics",
            legend: "./img/legend/color_bar_1670_day_microphysics_en.png",
            supertype: "15",
            dataCode: "fy-4a"
          }, {
            id: "T01-M01-S10",
            name: "夜间微物理特征",
            subtitle: "Night Microphysics RGB Composite (From WMO)",
            element: "NightMicrophysics",
            legend: "./img/legend/color_bar_1670_night_microphysics_en.png",
            supertype: "15",
            dataCode: "fy-4a"
          }
        ]
      }, {
        id: "T01-M02",
        name: "FY4A 卫星产品",
        subtitle: "FY4A Satellite products",
        childs: [
          {
            id: "T01-M02-S00",
            name: "降水估计",
            subtitle: "Quantitative Precipitation Estimate",
            element: "Precipitation",
            legend: "./img/legend/color_bar_1670_qpe_en.png",
            supertype: "15",
            dataCode: "fy-4a"
          }, {
            id: "T01-M02-S01",
            name: "云监测",
            subtitle: "Cloud Mask",
            element: "CLM",
            legend: "./img/legend/color_bar_1670_CLM_en.png",
            supertype: "15",
            dataCode: "fy-4a"
          }, {
            id: "T01-M02-S02",
            name: "云相态",
            subtitle: "Cloud Phase",
            element: "CLP",
            legend: "./img/legend/color_bar_1670_clp_en.png",
            supertype: "15",
            dataCode: "fy-4a"
          }, {
            id: "T01-M02-S03",
            name: "云类型",
            subtitle: "Cloud Type",
            element: "CLT",
            legend: "./img/legend/color_bar_1670_CLT_en.png",
            supertype: "15",
            dataCode: "fy-4a"
          }, {
            id: "T01-M02-S04",
            name: "云顶高度",
            subtitle: "Cloud Top Height",
            element: "CTH",
            legend: "./img/legend/color_bar_1670_cth_en.png",
            supertype: "15",
            dataCode: "fy-4a"
          }, {
            id: "T01-M02-S05",
            name: "云顶气压",
            subtitle: "Cloud Top Pressure",
            element: "CTP",
            legend: "./img/legend/color_bar_1670_CTP_en.png",
            supertype: "15",
            dataCode: "fy-4a"
          }, {
            id: "T01-M02-S06",
            name: "云顶温度",
            subtitle: "Cloud Top Temperature",
            element: "CTT",
            legend: "./img/legend/color_bar_1670_CTT_en.png",
            supertype: "15",
            dataCode: "fy-4a"
          }, {
            id: "T01-M02-S07",
            name: "对流层顶折叠",
            subtitle: "Tropopause Folding",
            element: "TFTP_Z_depth",
            legend: "./img/legend/color_bar_1670_TFP_en.png",
            supertype: "15",
            dataCode: "fy-4a"
          }, {
            id: "T01-M02-S08",
            name: "海表温度",
            subtitle: "Sea Surface Temperature",
            element: "FHS",
            legend: "./img/legend/color_bar_1670_sst_en.png",
            supertype: "15",
            dataCode: "fy-4a"
          }, {
            id: "T01-M02-S09",
            name: "沙尘检测",
            subtitle: "Dust Storm Detection",
            element: "DST",
            legend: "./img/legend/color_bar_1670_DST_en.png",
            supertype: "15",
            dataCode: "fy-4a"
          }, {
            id: "T01-M02-S10",
            name: "火点监测",
            subtitle: "Fire Hot Spot",
            element: "FHS",
            legend: "./img/legend/color_bar_1670_fhs_en.png",
            supertype: "15",
            dataCode: "fy-4a"
          }, {
            id: "T01-M02-S11",
            name: "气溶胶光学厚度",
            subtitle: "Aerosol",
            element: "AOD_0",
            legend: "./img/legend/color_bar_1670_aod_0_en.png",
            supertype: "15",
            dataCode: "fy-4a"
          // }, {
          //   id: "T01-M02-S16",
          //   name: "大气垂直探测(500hPa)",
          //   subtitle: "Temperature (500hPa)",
          //   element: "AVP_75",
          //   legend: "./img/legend/color_bar_1670_AVP_500_en.png",
          //   dataCode: "fy-4a"
          // }, {
          //   id: "T01-M02-S17",
          //   name: "大气垂直探测(700hPa)",
          //   subtitle: "Temperature (700hPa)",
          //   element: "AVP_85",
          //   legend: "./img/legend/color_bar_1670_AVP_700_en.png",
          //   dataCode: "fy-4a"
          // }, {
          //   id: "T01-M02-S18",
          //   name: "大气垂直探测(850hPa)",
          //   subtitle: "Temperature (850hPa)",
          //   element: "AVP_91",
          //   legend: "./img/legend/color_bar_1670_AVP_850_en.png",
          //   dataCode: "fy-4a"
          // }, {
          //   id: "T01-M02-S19",
          //   name: "大气垂直探测(1000hPa)",
          //   subtitle: "Temperature (1000hPa)",
          //   legend: "./img/legend/color_bar_1670_AVP_1000_en.png",
          //   element: "AVP_96",
          //   dataCode: "fy-4a"
          }, {
            id: "T01-M02-S16",
            name: "反射短波辐射",
            subtitle: "Reflected Shortwave Radiation",
            element: "RSR",
            legend: "./img/legend/color_bar_1670_RSR_en.png",
            supertype: "15",
            dataCode: "fy-4a"
          }, {
            id: "T01-M02-S17",
            name: "射出长波辐射",
            subtitle: "Outgoing Longwave Radiation",
            element: "OLR",
            legend: "./img/legend/color_bar_1670_OLR_en.png",
            supertype: "15",
            dataCode: "fy-4a"
          }, {
            id: "T01-M02-S18",
            name: "地表上行长波辐射",
            subtitle: "Upward Longwave Radiation",
            element: "ULR",
            legend: "./img/legend/color_bar_1670_ULR_en.png",
            supertype: "15",
            dataCode: "fy-4a"
          }, {
            id: "T01-M02-S19",
            name: "地表下行长波辐射",
            subtitle: "Downward Longwave Radiation",
            legend: "./img/legend/color_bar_1670_DLR_en.png",
            supertype: "15",
            element: "DLR",
            dataCode: "fy-4a"
          }
        ]
      }, {
        id: "T01-M03",
        name: "FY4A 卫星通道",
        subtitle: "FY4A Satellite Band",
        childs: [
          {
            id: "T01-M03-S01",
            name: "通道 1: 0.47 μm 可见光",
            subtitle: "Band 1: 0.47 µm (blue Band)",
            element: "NOMChannel01",
            supertype: "15",
            dataCode: "fy-4a"
          }, {
            id: "T01-M03-S02",
            name: "通道 2: 0.65 μm 可见光",
            subtitle: "Band 2: 0.65 µm (Red Band)",
            supertype: "15",
            element: "NOMChannel02",
            dataCode: "fy-4a"
          }, {
            id: "T01-M03-S03",
            name: "通道 3: 0.83 μm 近红外",
            subtitle: "Band 3: 0.83 µm (Veggie Band)",
            supertype: "15",
            element: "NOMChannel03",
            dataCode: "fy-4a"
          }, {
            id: "T01-M03-S04",
            name: "通道 4: 1.37 μm 短波红外",
            subtitle: "Band 4: 1.37 µm (Cirrus Band)",
            supertype: "15",
            element: "NOMChannel04",
            dataCode: "fy-4a"
          }, {
            id: "T01-M03-S05",
            name: "通道 5: 1.61 μm 短波红外",
            subtitle: "Band 5: 1.61 µm (Snow/Ice Band)",
            supertype: "15",
            element: "NOMChannel05",
            dataCode: "fy-4a"
          }, {
            id: "T01-M03-S06",
            name: "通道 6: 2.22 μm 短波红外",
            subtitle: "Band 6: 2.22 µm (Cloud Particle Size Band)",
            supertype: "15",
            element: "NOMChannel06",
            dataCode: "fy-4a"
          }, {
            id: "T01-M03-S07",
            name: "通道 7: 3.72 μm 中波红外（高）",
            subtitle: "Band 7: 3.72 µm (Shortwave Window Band High)",
            supertype: "15",
            element: "NOMChannel07",
            dataCode: "fy-4a"
          }, {
            id: "T01-M03-S08",
            name: "通道 8: 3.72 μm 中波红外（低）",
            subtitle: "Band 8: 3.72 µm (Shortwave Window Band Low)",
            supertype: "15",
            element: "NOMChannel08",
            dataCode: "fy-4a"
          }, {
            id: "T01-M03-S09",
            name: "通道 9: 6.25 μm 高层水汽",
            subtitle: "Band 9: 6.25 µm (Upper-Level Tropospheric Water Vapor Band)",
            supertype: "15",
            element: "NOMChannel09",
            dataCode: "fy-4a"
          }, {
            id: "T01-M03-S10",
            name: "通道 10: 7.1 μm 中层水汽",
            subtitle: "Band 10: 7.1 µm (Lower-Level Tropospheric Water Vapor Band)",
            supertype: "15",
            element: "NOMChannel10",
            dataCode: "fy-4a"
          }, {
            id: "T01-M03-S11",
            name: "通道 11: 8.5 μm 长波红外",
            subtitle: "Band 11: 8.5 µm (Cloud-Top Phase Band)",
            supertype: "15",
            element: "NOMChannel11",
            dataCode: "fy-4a"
          }, {
            id: "T01-M03-S12",
            name: "通道 12: 10.8 μm 长波红外",
            subtitle: "Band 12: 10.8 µm (Clean IR Longwave Window Band)",
            supertype: "15",
            element: "NOMChannel12",
            dataCode: "fy-4a"
          }, {
            id: "T01-M03-S13",
            name: "通道 13: 12 μm 长波红外",
            subtitle: "Band 13: 12 µm (Dirty Longwave Window Band)",
            supertype: "15",
            element: "NOMChannel13",
            dataCode: "fy-4a"
          }, {
            id: "T01-M03-S14",
            name: "通道 14: 14.5 μm 长波红外",
            subtitle: "Band 14: 14.5 µm (CO2 Longwave Infrared Band)",
            supertype: "15",
            element: "NOMChannel14",
            dataCode: "fy-4a"
          }
        ]
      },
      {
        id: "T02-M01",
        name: "FY2H 合成方案",
        subtitle: "FY2H Synthetic scheme",
        childs: [
          {
            id: "T02-M01-S02",
            name: "长波红外增强图",
            subtitle: "IR CIMMS",
            element: "NOMChannelIR1",
            legend: "./img/legend/color_bar_1670_ircimss2.png",
            supertype: "15",
            dataCode: "fy-2h"
          }
        ]
      },
      {
        id: "T02-M02",
        name: "FY2H 卫星产品",
        subtitle: "FY2H Satellite products",
        childs: [
          {
            id: "T02-M01-S02",
            name: "云分类(小时)产品",
            subtitle: "Hourly Cloud Classification",
            element: "FY2HHourlyCloudClassification",
            legend: "./img/legend/color_bar_1670_clc_en.png",
            supertype: "15",
            dataCode: "fy-2h"
          }, {
            id: "T02-M01-S01",
            name: "云顶温度(小时)产品",
            subtitle: "1-Hour Cloud Top Temperature Product",
            supertype: "15",
            element: "CTTHourlyProduct",
            dataCode: "fy-2h"
          }, {
            id: "T02-M01-S03",
            name: "等效黑体温度(小时)产品",
            subtitle: "Temperature of Brightness Blackbody Hourly Product",
            element: "FY2HTBBHourlyProduct",
            supertype: "15",
            legend: "./img/legend/color_bar_1670_tbb.png",
            dataCode: "fy-2h"
          }, {
            id: "T02-M01-S04",
            name: "降水预报(小时)产品",
            subtitle: "FY2HPRE1-HourProduct",
            element: "CTTHourlyProduct",
            supertype: "15",
            legend: "./img/legend/color_bar_1670_pre_en.png",
            dataCode: "fy-2h"
          }, {
            id: "T02-M01-S05",
            name: "海表温度(3小时)产品",
            subtitle: "FY2HSST3-HourProduct",
            element: "CTTHourlyProduct",
            supertype: "15",
            legend: "./img/legend/color_bar_1670_sst.png",
            dataCode: "fy-2h"
          }
        ]
      },
      {
        id: "T02-M03",
        name: "FY2H 卫星通道",
        subtitle: "FY2H Satellite Band",
        childs: [
          {
            id: "T02-M03-S01",
            name: "通道 1: 长波红外 10.3~11.3 μm",
            subtitle: "Channel 1: Long-wave Infrared  10.3~11.3 μm",
            supertype: "15",
            element: "NOMChannelIR1",
            dataCode: "fy-2h"
          }, 
          {
            id: "T02-M03-S02",
            name: "通道 2: 红外分裂窗 11.5~12.5 μm",
            supertype: "15",
            subtitle: "Channel 2: Infrared Split Window 11.5~12.5 μm",
            element: "NOMChannelIR1",
            dataCode: "fy-2h"
          },
          {
            id: "T02-M03-S03",
            name: "通道 3: 水汽  6.3~7.6 μm",
            subtitle: "Channel 3: Water Vapor 6.3~7.6 μm",
            supertype: "15",
            element: "NOMChannelIR1",
            dataCode: "fy-2h"
          },
          {
            id: "T02-M03-S04",
            name: "通道 4: 中波红外 3.5~4.0 μm",
            subtitle: "Channel 4: Middle Infrared 3.5~4.0 μm",
            supertype: "15",
            element: "NOMChannelIR1",
            dataCode: "fy-2h"
          },
          {
            id: "T02-M03-S05",
            name: "通道 5: 可见光 0.55~0.9 μm",
            subtitle: "Channel 5: Visable 0.55~0.9 μm",
            supertype: "15",
            element: "NOMChannelIR5",
            dataCode: "fy-2h"
          }
        ]
      } 
    ]
  }, {
    id: "T03",
    name: "雷达",
    subtitle: "Radar Observe",
    childs: [
      {
        id: "T04-M01",
        name: "组网拼图",
        subtitle: "Radar Networking",
        childs: [
          {
            id: "T04-M01-S01",
            name: "组合反射率",
            subtitle: "Composite reflectivity",
            element: "CR",
            supertype: 14,
            dataCode: "radar"
          }, {
            id: "T04-M01-S01",
            name: "垂直液态水含量",
            subtitle: "Vertically Liquid Water Content",
            element: "VAWC",
            supertype: 14,
            dataCode: "radar"
          }
        ]
      }, {
        id: "T04-M01",
        name: "单站雷达",
        subtitle: "Monostatic Radar",
        childs: [
          {
            id: "T04-M01-S01",
            name: "伊斯坦布尔",
            subtitle: "Islamabad Radar",
            element: "Islamabad",
            dataCode: "radar"
          }, {
            id: "T04-M01-S02",
            name: "拉合尔",
            subtitle: "Lahore Radar",
            element: "Lahore",
            dataCode: "radar"
          }, {
            id: "T04-M01-S03",
            name: "曼格拉",
            subtitle: "Mangla Radar",
            element: "Mangla",
            dataCode: "radar"
          }, {
            id: "T04-M01-S04",
            name: "拉希姆亚尔汗",
            subtitle: "Rahim Yar Khan Radar",
            element: "RYK",
            dataCode: "radar"
          }, {
            id: "T04-M01-S05",
            name: "德拉伊斯梅尔汗",
            subtitle: "Dera Ismail Khan Radar",
            element: "DIK",
            dataCode: "radar"
          }, {
            id: "T04-M01-S06",
            name: "锡亚尔科特",
            subtitle: "Sialkot Radar",
            element: "Sialkot",
            dataCode: "radar"
          }, {
            id: "T04-M01-S07",
            name: "马尔丹",
            subtitle: "Mardan Radar",
            element: "Mardan",
            dataCode: "radar"
          }, {
            id: "T04-M01-S08",
            name: "卡拉奇",
            subtitle: "Karachi Radar",
            element: "Karachi",
            dataCode: "radar"
          }
        ]
      }
    ]
  }, {
    id: "T04",
    name: "地面实况",
    subtitle: "Surface",
    childs: [
      {
        id: "T04-M01",
        name: "气象观测站",
        subtitle: "Surface Meteorological Stations",
        childs: [
          {
            id: "T04-M01-S01",
            name: "气温",
            subtitle: "2m-Temperature",
            element: "TEM",
            legend: "TEM",
            supertype: "4",
            dataCode: "station"
          }, {
            id: "T04-M01-S03",
            name: "降水",
            subtitle: "Precipitation",
            legend: "PRE_1h",
            element: "TEM",
            supertype: "4",
            dataCode: "station"
          }, {
            id: "T04-M01-S02",
            name: "风",
            subtitle: "10m wind",
            element: "TEM",
            supertype: "4",
            dataCode: "station"
          }
        ]
      }, {
        id: "T04-M02",
        name: "CMA实况",
        subtitle: "CMA-RA",
        childs: [
          {
            id: "T04-M02-S01",
            name: "2米气温",
            subtitle: "2m-Temperature",
            element: "TEM",
            dataCode: "fy-2h"
          }, {
            id: "T04-M02-S02",
            name: "2米气温异常",
            subtitle: "Precipitation",
            element: "TEM",
            dataCode: "fy-2h"
          }, {
            id: "T04-M02-S03",
            name: "降水",
            subtitle: "Precipitation anomaly",
            element: "TEM",
            dataCode: "fy-2h"
          }, {
            id: "T04-M02-S04",
            name: "降水异常",
            subtitle: "Channel 5: Visable 0.55~0.9 μm",
            element: "TEM",
            dataCode: "fy-2h"
          }, {
            id: "T04-M02-S05",
            name: "10米风",
            subtitle: "10m wind",
            element: "TEM",
            dataCode: "fy-2h"
          }, {
            id: "T04-M01-S06",
            name: "海平面气压",
            subtitle: "MSLP",
            element: "TEM",
            dataCode: "fy-2h"
          }, {
            id: "T04-M01-S07",
            name: "位势高度异常",
            subtitle: "Geopotential height anomaly",
            element: "TEM",
            dataCode: "fy-2h"
          }, {
            id: "T04-M01-S08",
            name: "气温异常",
            subtitle: "Temperature anomaly",
            element: "TEM",
            dataCode: "fy-2h"
          }
        ]
      }
    ]
  }
]
