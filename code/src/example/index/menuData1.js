export default [{
    id: "T01",
    name: "地面监测",
    subtitle: "Surface Data",
    childs: [
      {
        id: "T04-M01",
        name: "海平面气压",
        subtitle: "MSL Pressure",
        legend: "PRS",
        element: "PRS_Sea",
        supertype: "4",
        dataCode: "station"
      }, {
        id: "T04-M02",
        name: "气压",
        subtitle: "Pressure",
        legend: "PRS",
        element: "PRS",
        supertype: "4",
        dataCode: "station"
      }, {
        id: "T04-M03",
        name: "气温",
        subtitle: "Temperature",
        element: "TEM",
        legend: "TEM",
        supertype: "4",
        dataCode: "station"
      }, {
        id: "T04-M04",
        name: "相对湿度",
        subtitle: "Humidity",
        legend: "RHU",
        element: "RHU",
        supertype: "4",
        dataCode: "station"
      }, {
        id: "T04-M05",
        name: "风",
        subtitle: "10M Win",
        legend: "WIN",
        element: "WIN_S,WIN_D",
        supertype: "6",
        dataCode: "station"
      }, {
        id: "T04-M06",
        name: "降水",
        subtitle: "Precipitation",
        legend: "PRE_1h",
        element: "PRE_1h",
        supertype: "4",
        dataCode: "station"
      }, {
        id: "T04-M07",
        name: "露点温度",
        subtitle: "DPT",
        legend: "TEM",
        element: "DPT",
        supertype: "4",
        dataCode: "station"
      }, {
        id: "T04-M08",
        name: "能见度",
        subtitle: "VIS",
        legend: "VIS_M",
        element: "VIS",
        supertype: "4",
        dataCode: "station"
      }
    ]
  },
  {
    id: "T02",
    name: "雷达监测",
    subtitle: "Radar Monitoring",
    imgIcon: "/img/menu/radar1.png",
    childs: [
      {
        id: "T02-M01",
        name: "基本反射率",
        subtitle: "BR",
        element: "AIP",
        supertype: "11",
        dataCode: "CMA_GFS",
        timeinterval: "9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24",
        levelinterlaber: "",
        levelinterval: "0",
        imgIcon: "/img/menu/ground.png"
      }, {
        id: "T02-M02",
        name: "组合反射率",
        subtitle: "CR",
        element: "TEM",
        supertype: "11",
        dataCode: "CMA_GFS",
        timeinterval: "9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24",
        levelinterlaber: "",
        levelinterval: "0",
        imgIcon: "/img/menu/ground.png"
      }
    ]
  }, 
  {
    id: "T03",
    name: "卫星检测",
    subtitle: "Sate Monitoring",
    imgIcon: "/img/menu/sate.png",
    childs: [
      {
        id: "T03-M03",
        name: "Fy2-彩色合成云图",
        subtitle: "FY2H NatureColor",
        element: "NatureColor",
        legend: "./img/legend/color_bar_1670_ircimss2.png",
        supertype: "15",
        dataCode: "fy-2h"
      }, {
        id: "T03-M04",
        name: "Fy2-红外云图(30min)",
        subtitle: "IR CIMMS",
        element: "ircimss2",
        legend: "./img/legend/color_bar_1670_ircimss2.png",
        supertype: "15",
        dataCode: "fy-2h"
      // }, {
      //   id: "T03-M01-S03",
      //   name: "Fy2-水汽云图（30min）",
      //   subtitle: "IR CIMMS",
      //   element: "ircimss2",
      //   legend: "./img/legend/color_bar_1670_ircimss2.png",
      //   supertype: "15",
      //   dataCode: "fy-2h"
      }, {
        id: "T03-M05",
        name: "Fy4-真彩图(5min)",
        subtitle: "NatureColor_NoLit",
        element: "NatureColor",
        supertype: "15",
        dataCode: "fy-4a"
      }, {
        id: "T03-M06",
        name: "降水估计",
        subtitle: "Precipitation Estimate",
        element: "Precipitation",
        legend: "./img/legend/color_bar_1670_qpe_en.png",
        supertype: "15",
        dataCode: "fy-4a"
      }, {
        id: "T03-M07",
        name: "云监测",
        subtitle: "Cloud Mask",
        element: "CLM",
        legend: "./img/legend/color_bar_1670_CLM_en.png",
        supertype: "15",
        dataCode: "fy-4a"
      }, {
        id: "T03-M08",
        name: "云相态",
        subtitle: "Cloud Phase",
        element: "CLP",
        legend: "./img/legend/color_bar_1670_clp_en.png",
        supertype: "15",
        dataCode: "fy-4a"
      }, {
        id: "T03-M09",
        name: "云类型",
        subtitle: "Cloud Type",
        element: "CLT",
        legend: "./img/legend/color_bar_1670_CLT_en.png",
        supertype: "15",
        dataCode: "fy-4a"
      }, {
        id: "T03-M10",
        name: "云顶高度",
        subtitle: "Cloud Top Height",
        element: "CTH",
        legend: "./img/legend/color_bar_1670_cth_en.png",
        supertype: "15",
        dataCode: "fy-4a"
      }, {
        id: "T03-M11",
        name: "云顶气压",
        subtitle: "Cloud Top Pressure",
        element: "CTP",
        legend: "./img/legend/color_bar_1670_CTP_en.png",
        supertype: "15",
        dataCode: "fy-4a"
      }, {
        id: "T03-M12",
        name: "云顶温度",
        subtitle: "Cloud Top Temperature",
        element: "CTT",
        legend: "./img/legend/color_bar_1670_CTT_en.png",
        supertype: "15",
        dataCode: "fy-4a"
      }, {
        id: "T03-M13",
        name: "对流层顶折叠",
        subtitle: "Tropopause Folding",
        element: "TFTP_Z_depth",
        legend: "./img/legend/color_bar_1670_TFP_en.png",
        supertype: "15",
        dataCode: "fy-4a"
      }, {
        id: "T03-M14",
        name: "海表温度",
        subtitle: "Sea Surface Temperature",
        element: "FHS",
        legend: "./img/legend/color_bar_1670_sst_en.png",
        supertype: "15",
        dataCode: "fy-4a"
      }, {
        id: "T03-M15",
        name: "沙尘检测",
        subtitle: "Dust Storm Detection",
        element: "DST",
        legend: "./img/legend/color_bar_1670_DST_en.png",
        supertype: "15",
        dataCode: "fy-4a"
      }, {
        id: "T03-M16",
        name: "火点监测",
        subtitle: "Fire Hot Spot",
        element: "FHS",
        legend: "./img/legend/color_bar_1670_fhs_en.png",
        supertype: "15",
        dataCode: "fy-4a"
      }, {
        id: "T03-M17",
        name: "气溶胶光学厚度",
        subtitle: "Aerosol",
        element: "AOD_0",
        legend: "./img/legend/color_bar_1670_aod_0_en.png",
        supertype: "15",
        dataCode: "fy-4a"
      }
    ]
  },
  {
    id: "T04",
    name: "地面预报",
    subtitle: "Surface Forecast",
    imgIcon: "/img/menu/radar1.png",
    childs: [
      {
        id: "T04-M01",
        name: "海平面气压",
        subtitle: "MSLP",
        element: "SSP",
        supertype: "11",
        dataCode: "CMA_GFS",
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        defaultLevel: 0,
        imgIcon: "/img/menu/ground.png"
      }, {
        id: "T04-M02",
        name: "24h变压",
        subtitle: "24h 🔺P",
        element: "MSLP_C24",
        supertype: "11",
        dataCode: "CMA_GFS",
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        levelinterlaber: "",
        levelinterval: "0",
        imgIcon: "/img/menu/ground.png"
      }, {
        id: "T04-M03",
        name: "地面气温",
        title: "2m Temperature",
        subtitle: "2m T",
        defaultLevel: 2,
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        childs: [
          {
            id: "T04-M03-S01",
            name: "地面气温",
            element: "TEM",
            legend: "TEM_K",
            supertype: "5",
            defaultLevel: 2,
            dataCode: "CMA_GFS"
          }, {
            id: "T04-M03-S02",
            name: "地面气温",
            element: "TEM",
            legend: "TEM_K",
            supertype: "13",
            defaultLevel: 2,
            dataCode: "CMA_GFS"
          }
        ]
      }, 
      {
        id: "T04-M04",
        name: "最高气温",
        subtitle: "24h Tmax",
        element: "TEM_Tmax",
        legend: "TEM_K",
        supertype: "11",
        dataCode: "CMA_GFS",
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        levelinterlaber: "",
        defaultLevel: 2,
        levelinterval: "0"
      }, {
        id: "T04-M05",
        name: "最低气温",
        subtitle: "24h Tmin",
        element: "TEM_Tmin",
        legend: "TEM_K",
        supertype: "11",
        dataCode: "CMA_GFS",
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        levelinterlaber: "",
        defaultLevel: 2,
        levelinterval: "0"
      }, {
        id: "T04-M06",
        name: "最大变温",
        subtitle: "24h 🔺Tmax",
        element: "TEM_TCmax",
        legend: "TEM_C",
        supertype: "11",
        dataCode: "CMA_GFS",
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        levelinterlaber: "",
        defaultLevel: 2,
        levelinterval: "0"
      }, {
        id: "T04-M07",
        name: "最小变温",
        subtitle: "24h 🔺Tmin",
        element: "TEM_TCmin",
        legend: "TEM_C",
        supertype: "11",
        dataCode: "CMA_GFS",
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        levelinterlaber: "",
        defaultLevel: 2,
        levelinterval: "0"
      }, {
        id: "T04-M08",
        name: "3h累计降水",
        subtitle: "3h TOTAL",
        element: "PRE",
        legend: "PRE_3h",
        supertype: "5",
        dataCode: "CMA_GFS",
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        levelinterlaber: "",
        defaultLevel: 0,
        levelinterval: "0"
      }, {
        id: "T04-M09",
        name: "6h累计降水",
        subtitle: "6h TOTAL",
        element: "PRE_6h",
        legend: "PRE_6h",
        supertype: "11",
        dataCode: "CMA_GFS",
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        levelinterlaber: "",
        defaultLevel: 0,
        levelinterval: "0"
      }, {
        id: "T04-M10",
        name: "12h累计降水",
        subtitle: "12h TOTAL",
        element: "PRE_12h",
        legend: "PRE_12h",
        supertype: "11",
        dataCode: "CMA_GFS",
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        levelinterlaber: "",
        defaultLevel: 0,
        levelinterval: "0"
      }, {
        id: "T04-M11",
        name: "24h累计降水",
        subtitle: "24h TOTAL",
        element: "PRE_24h",
        legend: "PRE_24h",
        supertype: "11",
        dataCode: "CMA_GFS",
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        levelinterlaber: "",
        defaultLevel: 0,
        levelinterval: "0"
      }, {
        id: "T04-M12",
        name: "2m 风场",
        tite: "2m Wind Field",
        subtitle: "2m Win",
        defaultLevel: 10,
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        childs: [
          {
            id: "T04-M13-S01",
            name: "UV风",
            element: "WIN_U,WIN_V",
            supertype: "7",
            defaultLevel: 10,
            dataCode: "CMA_GFS"
          }, {
            id: "T04-M13-S02",
            name: "风速",
            element: "WIN_S",
            legend: "WIN",
            supertype: "5",
            defaultLevel: 10,
            dataCode: "CMA_GFS"
          }
        ]
      }, {
        id: "T04-M13",
        name: "10m 风场",
        tite: "10m Wind Field",
        subtitle: "10m Win",
        defaultLevel: 10,
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        childs: [
          {
            id: "T04-M13-S01",
            name: "UV风",
            element: "WIN_D,WIN_S",
            supertype: "12",
            defaultLevel: 10,
            dataCode: "CMA_GFS"
          }, {
            id: "T04-M13-S02",
            name: "风速",
            element: "WIN_S",
            legend: "WIN",
            supertype: "5",
            defaultLevel: 10,
            dataCode: "CMA_GFS"
          }
        ]
      }
    ]
  },
  {
    id: "T05",
    name: "高空形势场",
    subtitle: "Upper Situation",
    imgIcon: "/img/menu/radar1.png",
    childs: [
      {
        id: "T05-M01",
        name: "高度场",
        subtitle: "GPH",
        element: "GPH",
        supertype: "9",
        legend: "GPH_500",
        dataCode: "CMA_GFS",
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        levelinterlaber: "925hPa,850hPa,700hPa,500hPa,200hPa",
        levelinterval: "92500,85000,70000,50000,20000",
        defaultLevel: 50000,
        imgIcon: "/img/menu/ground.png",
        childs: [
          {
            id: "T05-M01-S01",
            name: "位势高度",
            element: "GPH",
            legend: "GPH_750",
            supertype: "5",
            defaultLevel: 75000,
            dataCode: "CMA_GFS"
          }, {
            id: "T05-M01-S02",
            name: "位势高度",
            element: "GPH",
            legend: "GPH_750",
            supertype: "13",
            defaultLevel: 75000,
            dataCode: "CMA_GFS"
          }
        ]
      }, {
        id: "T05-M02",
        name: "地面气温",
        title: "Temperature",
        subtitle: "Temperature",
        defaultLevel: 75000,
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        levelinterlaber: "925hPa,850hPa,700hPa,500hPa,200hPa",
        levelinterval: "92500,85000,70000,50000,20000",
        childs: [
          {
            id: "T05-M02-S01",
            name: "气温",
            element: "TEM",
            legend: "TEM_K",
            supertype: "5",
            defaultLevel: 75000,
            dataCode: "CMA_GFS"
          }, {
            id: "T05-M02-S02",
            name: "气温",
            element: "TEM",
            legend: "TEM_K",
            supertype: "13",
            defaultLevel: 75000,
            dataCode: "CMA_GFS"
          }
        ]
      }, {
        id: "T05-M03",
        name: "相对湿度场",
        title: "Humidity",
        subtitle: "Humidity",
        defaultLevel: 75000,
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        childs: [
          {
            id: "T05-M03-S01",
            name: "相对湿度场",
            element: "RHU",
            legend: "RHU",
            supertype: "5",
            defaultLevel: 75000,
            dataCode: "CMA_GFS"
          }, {
            id: "T05-M03-S02",
            name: "相对湿度场",
            element: "RHU",
            legend: "RHU",
            supertype: "13",
            defaultLevel: 75000,
            dataCode: "CMA_GFS"
          }
        ]
      }, {
        id: "T05-M04",
        name: "风场",
        tite: "Wind Field",
        subtitle: "Wind",
        defaultLevel: 2,
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        levelinterlaber: "925hPa,850hPa,700hPa,500hPa,200hPa",
        levelinterval: "92500,85000,70000,50000,20000",
        imgIcon: "/img/menu/ground.png",
        childs: [
          {
            id: "T05-M04-S01",
            name: "UV风",
            element: "WIN_D,WIN_S",
            supertype: "12",
            defaultLevel: 70000,
            dataCode: "CMA_GFS"
          }, {
            id: "T05-M04-S02",
            name: "风速",
            element: "WIN_S",
            legend: "WIN",
            supertype: "5",
            defaultLevel: 70000,
            dataCode: "CMA_GFS"
          }
        ]
      }, {
        id: "T05-M05",
        name: "涡度场",
        subtitle: "Vorticity",
        element: "RHU",
        legend: "RHU_K",
        supertype: "11",
        dataCode: "CMA_GFS",
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        levelinterlaber: "925hPa,850hPa,700hPa,500hPa,200hPa",
        levelinterval: "92500,85000,70000,50000,20000",
        imgIcon: "/img/menu/ground.png"
      }, {
        id: "T05-M06",
        name: "云量",
        title: "Cloud Amount",
        subtitle: "TCC",
        defaultLevel: 75000,
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        childs: [
          {
            id: "T05-M06-S01",
            name: "云量",
            element: "TCC",
            legend: "TCC",
            supertype: "5",
            defaultLevel: 75000,
            dataCode: "CMA_GFS"
          }, {
            id: "T05-M06-S02",
            name: "云量",
            element: "TCC",
            legend: "TCC",
            supertype: "13",
            defaultLevel: 75000,
            dataCode: "CMA_GFS"
          }
        ]
      }
    ]
  },
  {
    id: "T06",
    name: "综合分析场",
    subtitle: "Comprehensive Analysis",
    imgIcon: "/img/menu/radar1.png",
    childs: [
      {
        id: "T06-M02",
        name: "500hPa高度场+风场",
        subtitle: "500GHP+Wind",
        imgIcon: "/img/menu/ground.png",
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        levelinterlaber: "925hPa,850hPa,700hPa,500hPa,200hPa",
        levelinterval: "92500,85000,70000,50000,20000",
        childs: [
          {
            id: "T06-M02-S01",
            name: "500hPa高度场",
            subtitle: "Geopotential height",
            element: "GPH",
            supertype: "11",
            dataCode: "CMA_GFS",
            levelinterlaber: "500hPa",
            levelinterval: "500000",
            imgIcon: "/img/menu/ground.png"
          }, {
            id: "T06-M02-S02",
            name: "风场",
            subtitle: "Wind Field",
            element: "Win",
            legend: "WIN",
            supertype: "11",
            dataCode: "CMA_GFS",
            levelinterlaber: "925hPa,850hPa,700hPa,500hPa,200hPa",
            levelinterval: "92500,85000,70000,50000,20000",
            imgIcon: "/img/menu/ground.png"
          }
        ]
      }, {
        id: "T06-M03",
        name: "850hPa高度场+风场",
        subtitle: "850GHP+Wind",
        imgIcon: "/img/menu/ground.png",
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        childs: [
          {
            id: "T06-M03-S01",
            name: "500hPa高度场",
            subtitle: "Geopotential height",
            element: "GPH",
            supertype: "11",
            dataCode: "CMA_GFS",
            levelinterlaber: "500hPa",
            levelinterval: "500000",
            imgIcon: "/img/menu/ground.png"
          }, {
            id: "T06-M03-S02",
            name: "风场",
            subtitle: "Wind Field",
            element: "Win",
            legend: "WIN",
            supertype: "11",
            dataCode: "CMA_GFS",
            levelinterlaber: "925hPa,850hPa,700hPa,500hPa,200hPa",
            levelinterval: "92500,85000,70000,50000,20000",
            imgIcon: "/img/menu/ground.png"
          }, {
            id: "T06-M03-S03",
            name: "海平面气压场",
            subtitle: "MSLP Field",
            element: "MSLP",
            legend: "MSLP",
            supertype: "11",
            dataCode: "CMA_GFS",
            levelinterval: "92500,85000,70000,50000,20000",
            imgIcon: "/img/menu/ground.png"
          }
        ]
      }
    ]
  }
]
