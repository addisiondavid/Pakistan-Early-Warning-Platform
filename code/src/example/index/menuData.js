export default [{
    id: "T01",
    name: "地面监测",
    subtitle: "Surface Data",
    childs: [
      {
        id: "T01-M01",
        name: "海平面气压",
        subtitle: "Sea-Level Pressure",
        legend: "PRS",
        element: "PRS_Sea",
        supertype: "4",
        dataCode: "station"
      }, {
        id: "T01-M02",
        name: "气压",
        subtitle: "Pressure",
        legend: "PRS_H",
        element: "PRS",
        supertype: "4",
        dataCode: "station"
      }, {
        id: "T01-M03",
        name: "气温",
        subtitle: "Temperature",
        element: "TEM",
        legend: "TEM",
        supertype: "4",
        dataCode: "station"
      }, {
        id: "T01-M04",
        name: "相对湿度",
        subtitle: "Humidity",
        legend: "RHU",
        element: "RHU",
        supertype: "4",
        dataCode: "station"
      }, {
        id: "T04-M05",
        name: "风",
        subtitle: "10M Wind",
        legend: "WIN",
        element: "WIN_S,WIN_D",
        supertype: "6",
        dataCode: "station"
      }, {
        id: "T01-M06",
        name: "降水",
        subtitle: "Precipitation",
        legend: "PRE_1h",
        element: "PRE_1h",
        supertype: "4",
        dataCode: "station"
      }, {
        id: "T01-M07",
        name: "露点温度",
        subtitle: "Dew Point",
        legend: "TEM",
        element: "DPT",
        supertype: "4",
        dataCode: "station"
      }, {
        id: "T01-M08",
        name: "能见度",
        subtitle: "Visibility",
        legend: "VIS_M",
        element: "VIS",
        supertype: "4",
        dataCode: "station"
      }
    ]
  }, {
    id: "T07",
    name: "探空数据",
    subtitle: "Upper Data",
    childs: [
      {
        id: "T07-M05",
        name: "风",
        subtitle: "Wind",
        legend: "WIN",
        element: "WIN_S,WIN_D",
        supertype: "6",
        dataCode: "upper"
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
        subtitle: "Base Reflectivity",
        element: "CREF",
        supertype: "2",
        dataCode: "radar",
        imgIcon: "/img/menu/ground.png"
      }, {
        id: "T02-M02",
        name: "组合反射率",
        subtitle: "Composite Reflectivity",
        element: "CREF",
        supertype: "2",
        dataCode: "radar",
        imgIcon: "/img/menu/ground.png"
      }
    ]
  }, 
  {
    id: "T03",
    name: "卫星检测",
    subtitle: "Sat Monitoring",
    imgIcon: "/img/menu/sate.png",
    childs: [
      {
        id: "T03-M01",
        name: "Fy4-真彩图(5min)",
        subtitle: "NatureColor",
        element: "NatureColor",
        supertype: "15",
        dataCode: "fy-4a"
      }, {
        id: "T03-M02",
        name: "Fy4-真彩图(5min)",
        subtitle: "Natural",
        element: "Natural",
        supertype: "15",
        legend: "./img/legend/color_bar_1670_Natural_en.png",
        dataCode: "fy-4a"
      }, {
        id: "T03-M03",
        name: "Fy4-真彩图(5min)",
        subtitle: "AirMass",
        element: "AirMass",
        supertype: "15",
        legend: "./img/legend/color_bar_1670_air_mass_en.png",
        dataCode: "fy-4a"
      }, {
        id: "T03-M04",
        name: "Fy4-真彩图(5min)",
        subtitle: "CloudsConvection",
        element: "CloudsConvection",
        supertype: "15",
        legend: "./img/legend/color_bar_1670_clouds_convection_en.png",
        dataCode: "fy-4a"
      }, {
        id: "T03-M05",
        name: "Fy4-真彩图(5min)",
        subtitle: "DayMicrophysics",
        element: "DayMicrophysics",
        supertype: "15",
        legend: "./img/legend/color_bar_1670_day_microphysics_en.png",
        dataCode: "fy-4a"
      }, {
        id: "T03-M06",
        name: "Fy4-真彩图(5min)",
        subtitle: "Fog/Snow",
        element: "FogSnow",
        supertype: "15",
        legend: "./img/legend/color_bar_1670_volcanic_ash_en.png",
        dataCode: "fy-4a"
      }, {
        id: "T03-M07",
        name: "Fy4-真彩图(5min)",
        subtitle: "Volcanic Ash",
        element: "Ash",
        supertype: "15",
        legend: "./img/legend/color_bar_1670_ircimss2.png",
        dataCode: "fy-4a"
      }, {
        id: "T03-M11",
        name: "Fy2-彩色合成云图",
        subtitle: "FY2H NatureColor",
        element: "NatureColor",
        legend: "./img/legend/color_bar_1670_ircimss2.png",
        supertype: "15",
        dataCode: "fy-2h"
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
        id: "T04-M00",
        name: "海平面气压",
        title: "Sea-Level Pressure",
        subtitle: "Sea-Level Pressure",
        element: "SSP",
        legend: "PRS",
        supertype: "5",
        dataCode: "CMA_GFS",
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        defaultLevel: 0,
        childs: [
          {
            id: "T04-M01-S01",
            title: "Sea-Level Pressure",
            element: "sp",
            legend: "PRS",
            supertype: "5",
            dataCode: "NAFP_EC_C1D"
          }, {
            id: "T04-M01-S02",
            title: "Sea-Level Pressure",
            element: "sp",
            legend: "PRS",
            supertype: "13",
            dataCode: "NAFP_EC_C1D"
          }
        ]
      }, {
        id: "T04-M01",
        name: "气压",
        title: "Pressure",
        subtitle: "Pressure",
        element: "p",
        legend: "SSP",
        supertype: "5",
        dataCode: "CMA_GFS",
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        defaultLevel: 0,
        childs: [
          {
            id: "T04-M01-S01",
            title: "Sea-Level Pressure",
            element: "sp",
            legend: "PRS",
            supertype: "5",
            dataCode: "NAFP_EC_C1D"
          }, {
            id: "T04-M01-S02",
            title: "Sea-Level Pressure",
            element: "sp",
            legend: "PRS",
            supertype: "13",
            dataCode: "NAFP_EC_C1D"
          }
        ]
      }, {
        id: "T04-M02",
        name: "24h变压",
        subtitle: "24h 🔺Pressure",
        element: "PRS",
        supertype: "11",
        dataCode: "CMA_GFS",
        maplayer: "Blue Map",
        timeinterval: "24,48,60",
        levelinterlaber: "",
        levelinterval: "0",
        defaultLevel: 0,
        imgIcon: "/img/menu/ground.png",
        childs: [
          {
            id: "T04-M02-S01",
            name: "24h变压",
            title: "24h 🔺Pressure",
            element: "sp-24h_diff",
            legend: "PRSC",
            defaultLevel: 0,
            supertype: "5",
            dataCode: "NAFP_EC_C1D"
          }
        ]
      }, {
        id: "T04-M03",
        name: "地面气温",
        title: "2m Temperature",
        subtitle: "2m Temperature",
        maplayer: "Pakistan Map",
        defaultLevel: 0,
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        comparData: true,
        childs: [
          {
            id: "T04-M03-S01",
            name: "地面气温",
            title: "2m Temperature",
            element: "2t",
            legend: "TEM_K",
            supertype: "5",
            defaultLevel: 0,
            // comparCode: "NAFP_EC_C1D",
            dataCode: "NAFP_EC_C1D"
          }, {
            id: "T04-M03-S02",
            name: "地面气温",
            title: "2m Temperature",
            element: "2t",
            legend: "TEM_K",
            supertype: "13",
            defaultLevel: 0,
            dataCode: "NAFP_EC_C1D"
          }
        ]
      // }, 
      // {
      //   id: "T04-M04",
      //   name: "24h变温",
      //   subtitle: "24h 🔺Temperature",
      //   dataCode: "CMA_GFS",
      //   maplayer: "Pakistan Map",
      //   timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
      //   levelinterlaber: "",
      //   defaultLevel: 2,
      //   levelinterval: "0",
      //   childs: [
      //     {
      //       id: "T04-M02-S01",
      //       name: "24h变温",
      //       title: "24h 🔺T",
      //       element: "TEM",
      //       legend: "TEMC",
      //       defaultLevel: 0,
      //       supertype: "14",
      //       dataCode: "NAFP_EC_C1D"
      //     }
      //   ]
      // }, {
      //   id: "T04-M05",
      //   name: "最低气温",
      //   subtitle: "24h Tmin",
      //   element: "TEM_Tmin",
      //   legend: "TEM_K",
      //   supertype: "11",
      //   dataCode: "CMA_GFS",
      //   timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
      //   levelinterlaber: "",
      //   defaultLevel: 2,
      //   levelinterval: "0"
      // }, {
      //   id: "T04-M06",
      //   name: "最大变温",
      //   subtitle: "24h 🔺Tmax",
      //   element: "TEM_TCmax",
      //   legend: "TEM_C",
      //   supertype: "11",
      //   dataCode: "CMA_GFS",
      //   timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
      //   levelinterlaber: "",
      //   defaultLevel: 2,
      //   levelinterval: "0"
      // }, {
      //   id: "T04-M07",
      //   name: "最小变温",
      //   subtitle: "24h 🔺Tmin",
      //   element: "TEM_TCmin",
      //   legend: "TEM_C",
      //   supertype: "11",
      //   dataCode: "CMA_GFS",
      //   timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
      //   levelinterlaber: "",
      //   defaultLevel: 2,
      //   levelinterval: "0"
      }, {
        id: "T04-M08",
        name: "3h累计降水",
        title: "3h Precipitation",
        subtitle: "3h Precipitation",
        maplayer: "Pakistan Map",
        element: "PRE",
        legend: "PRE_3h",
        defaultLevel: 0,
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        childs: [
          {
            id: "T04-M08-S01",
            name: "降水",
            element: "tp",
            title: "3h Precipitation",
            legend: "PRE_3h",
            supertype: "11",
            defaultLevel: 0,
            dataCode: "NAFP_EC_C1D"
          }, {
            id: "T04-M08-S02",
            name: "降水",
            title: "3h Precipitation",
            element: "tp",
            legend: "PRE_3h",
            supertype: "13",
            defaultLevel: 0,
            dataCode: "NAFP_EC_C1D"
          }
        ]
      }, {
        id: "T04-M09",
        name: "6h累计降水",
        title: "6h Precipitation",
        subtitle: "6h Precipitation",
        maplayer: "Pakistan Map",
        element: "PRE",
        legend: "PRE_6h",
        defaultLevel: 0,
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        childs: [
          {
            id: "T04-M09-S01",
            name: "降水",
            element: "tp_6h_sum",
            title: "6h Precipitation",
            legend: "PRE_6h",
            supertype: "11",
            defaultLevel: 0,
            dataCode: "NAFP_EC_C1D"
          }, {
            id: "T04-M09-S02",
            name: "降水",
            title: "6h Precipitation",
            element: "tp_6h_sum",
            legend: "PRE_6h",
            supertype: "13",
            defaultLevel: 0,
            dataCode: "NAFP_EC_C1D"
          }
        ]
      }, {
        id: "T04-M10",
        name: "12h累计降水",
        title: "12h Precipitation",
        subtitle: "12h Precipitation",
        maplayer: "Pakistan Map",
        element: "PRE",
        legend: "PRE_12h",
        defaultLevel: 0,
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        childs: [
          {
            id: "T04-M10-S01",
            name: "降水",
            element: "tp_12h_sum",
            title: "12h Precipitation",
            legend: "PRE_12h",
            supertype: "11",
            defaultLevel: 0,
            dataCode: "NAFP_EC_C1D"
          }, {
            id: "T04-M10-S02",
            name: "降水",
            title: "12h Precipitation",
            element: "tp_12h_sum",
            legend: "PRE_12h",
            supertype: "13",
            defaultLevel: 0,
            dataCode: "NAFP_EC_C1D"
          }
        ]
      }, {
        id: "T04-M11",
        name: "24h累计降水",
        title: "24h Precipitation",
        subtitle: "24h Precipitation",
        maplayer: "Pakistan Map",
        element: "PRE",
        legend: "PRE_24h",
        defaultLevel: 0,
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        childs: [
          {
            id: "T04-M11-S01",
            name: "降水",
            element: "tp_24h_sum",
            title: "24h Precipitation",
            legend: "PRE_24h",
            supertype: "11",
            defaultLevel: 0,
            dataCode: "NAFP_EC_C1D"
          }, {
            id: "T04-M11-S02",
            name: "降水",
            title: "24h Precipitation",
            element: "tp_24h_sum",
            legend: "PRE_24h",
            supertype: "13",
            defaultLevel: 0,
            dataCode: "NAFP_EC_C1D"
          }
        ]
      }, {
        id: "T04-M13",
        name: "10m 风场",
        tite: "10m Wind Field",
        maplayer: "Pakistan Map",
        subtitle: "10m Win",
        defaultLevel: 0,
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        childs: [
          {
            id: "T04-M13-S01",
            name: "UV风",
            element: "10u,10v",
            supertype: "7",
            defaultLevel: 0,
            dataCode: "NAFP_EC_C1D"
          }, {
            id: "T04-M13-S02",
            name: "风速",
            element: "2t",
            legend: "TEM_K",
            supertype: "5",
            defaultLevel: 0,
            dataCode: "NAFP_EC_C1D"
          }
        ]
      }, {
        id: "T05-M06",
        name: "云量",
        title: "Cloud Amount",
        maplayer: "Pakistan Map",
        subtitle: "TCC",
        defaultLevel: 0,
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        childs: [
          {
            id: "T05-M06-S01",
            name: "云量",
            element: "tcc",
            legend: "CLOUD",
            supertype: "5",
            defaultLevel: 0,
            dataCode: "NAFP_EC_C1D"
          }, {
            id: "T05-M06-S02",
            name: "云量",
            element: "tcc",
            legend: "CLOUD",
            supertype: "13",
            defaultLevel: 0,
            dataCode: "NAFP_EC_C1D"
          }
        ]
      }
    ]
  },
  {
    id: "T05",
    name: "高空形势场",
    subtitle: "Upper Level",
    imgIcon: "/img/menu/radar1.png",
    childs: [
      {
        id: "T05-M02",
        name: "地面气温",
        title: "Temperature",
        subtitle: "Temperature",
        maplayer: "Pakistan Map",
        defaultLevel: 925,
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        levelinterlaber: "925hPa,850hPa,700hPa,500hPa,200hPa",
        levelinterval: "92500,85000,70000,50000,20000",
        comparData: true,
        childs: [
          {
            id: "T05-M02-S01",
            name: "气温",
            title: "Temperature",
            element: "t",
            legend: "TEM_K",
            supertype: "5",
            dataCode: "NAFP_EC_C1D",
            comparCode: "NAFP_EC_C1D"
          }
          // , {
          //   id: "T05-M02-S02",
          //   name: "气温",
          //   title: "Temperature",
          //   element: "t",
          //   legend: "TEM_K",
          //   supertype: "13",
          //   dataCode: "NAFP_EC_C1D"
          // }
        ]
      }, {
        id: "T05-M03",
        name: "相对湿度场",
        title: "Humidity",
        subtitle: "Humidity",
        maplayer: "Pakistan Map",
        defaultLevel: 700,
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        childs: [
          {
            id: "T05-M03-S01",
            name: "相对湿度场",
            element: "r",
            legend: "RHU",
            supertype: "5",
            defaultLevel: 700,
            dataCode: "NAFP_EC_C1D"
          }, {
            id: "T05-M03-S02",
            name: "相对湿度场",
            element: "r",
            legend: "RHU",
            supertype: "13",
            defaultLevel: 700,
            dataCode: "NAFP_EC_C1D"
          }
        ]
      }, {
        id: "T05-M04",
        name: "风场",
        tite: "Wind Field",
        maplayer: "Pakistan Map",
        subtitle: "Wind",
        defaultLevel: 850,
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        levelinterlaber: "925hPa,850hPa,700hPa,500hPa,200hPa",
        levelinterval: "92500,85000,70000,50000,20000",
        imgIcon: "/img/menu/ground.png",
        childs: [
          {
            id: "T04-M13-S01",
            name: "UV风",
            element: "wd,ws",
            supertype: "12",
            defaultLevel: 850,
            dataCode: "NAFP_EC_C1D"
          }, {
            id: "T04-M13-S02",
            name: "风速",
            element: "ws",
            legend: "WIN",
            supertype: "5",
            defaultLevel: 850,
            dataCode: "NAFP_EC_C1D"
          }
        ]
      // }, {
      //   id: "T05-M05",
      //   name: "涡度场",
      //   subtitle: "Vorticity",
      //   element: "RHU",
      //   legend: "RHU_K",
      //   supertype: "11",
      //   dataCode: "CMA_GFS",
      //   timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
      //   levelinterlaber: "925hPa,850hPa,700hPa,500hPa,200hPa",
      //   levelinterval: "92500,85000,70000,50000,20000",
      //   imgIcon: "/img/menu/ground.png"
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
        subtitle: "500hPa Height/Wind",
        imgIcon: "/img/menu/ground.png",
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        levelinterlaber: "925hPa,850hPa,700hPa,500hPa,200hPa",
        levelinterval: "92500,85000,70000,50000,20000",
        defaultLevel: 500,
        childs: [
          {
            id: "T05-M04-S01",
            name: "UV风",
            element: "u,v",
            supertype: "7",
            defaultLevel: 500,
            dataCode: "NAFP_EC_C1D"
          }, {
            id: "T05-M04-S02",
            name: "风速",
            element: "ws",
            legend: "WIN",
            supertype: "5",
            dataCode: "NAFP_EC_C1D"
          }, {
            id: "T06-M03-S01",
            name: "850hPa高度场",
            subtitle: "Geopotential height",
            element: "gh",
            supertype: "9",
            dataCode: "NAFP_EC_C1D",
            legend: "GPH_500",
            imgIcon: "/img/menu/ground.png"
          }
        ]
      }, {
        id: "T06-M03",
        name: "850hPa高度场+风场+海平面气压场",
        subtitle: "850hPa Height/Wind/SLP",
        imgIcon: "/img/menu/ground.png",
        timeinterval: "0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45",
        defaultLevel: 850,
        childs: [
          {
            id: "T06-M03-S01",
            name: "850hPa高度场",
            subtitle: "Geopotential height",
            element: "gh",
            supertype: "9",
            dataCode: "NAFP_EC_C1D",
            legend: "GPH_850",
            defaultLevel: 850,
            imgIcon: "/img/menu/ground.png"
          }, {
            id: "T06-M03-S02",
            name: "UV风",
            element: "u,v",
            supertype: "7",
            dataCode: "NAFP_EC_C1D"
          }, {
            id: "T06-M03-S03",
            title: "Sea-Level Pressure",
            element: "sp",
            legend: "PRS",
            supertype: "5",
            defaultLevel: 0,
            dataCode: "NAFP_EC_C1D"
          }
        ]
      }
    ]
  }
]
