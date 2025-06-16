export default {
  TEM: {
    name: "温度(℃)",
    min: -100,
    max: 100,
    labelFunc: function(d) { return d },
    round: 1,
    value: [
      { no: 1, start: -100, end: -30, color: "#0000ff" },
      { no: 2, start: -30, end: -28, color: "#0014ff" },
      { no: 3, start: -28, end: -26, color: "#0045ff" },
      { no: 4, start: -26, end: -24, color: "#0065ff" },
      { no: 5, start: -24, end: -22, color: "#0085ff" },
      { no: 6, start: -22, end: -20, color: "#00a6ff" },
      { no: 7, start: -20, end: -18, color: "#00cbff" },
      { no: 8, start: -18, end: -16, color: "#00ebff" },
      { no: 9, start: -16, end: -14, color: "#00fff7" },
      { no: 10, start: -14, end: -12, color: "#00ffd6" },
      { no: 11, start: -12, end: -10, color: "#00ffb5" },
      { no: 12, start: -10, end: -8, color: "#00ff94" },
      { no: 13, start: -8, end: -6, color: "#00ff73" },
      { no: 14, start: -6, end: -4, color: "#00ff52" },
      { no: 15, start: -4, end: -2, color: "#00ff29" },
      { no: 16, start: -2, end: 0, color: "#00ff08" },
      { no: 17, start: 0, end: 2, color: "#10ff00" },
      { no: 18, start: 2, end: 4, color: "#31ff00" },
      { no: 19, start: 4, end: 6, color: "#52ff00" },
      { no: 20, start: 6, end: 8, color: "#73ff00" },
      { no: 21, start: 8, end: 10, color: "#94ff00" },
      { no: 22, start: 10, end: 12, color: "#b5ff00" },
      { no: 23, start: 12, end: 14, color: "#deff00" },
      { no: 24, start: 14, end: 16, color: "#ffff00" },
      { no: 25, start: 16, end: 18, color: "#ffe700" },
      { no: 26, start: 18, end: 20, color: "#ffc300" },
      { no: 27, start: 20, end: 22, color: "#ffa200" },
      { no: 28, start: 22, end: 24, color: "#ff8200" },
      { no: 29, start: 24, end: 26, color: "#ff6100" },
      { no: 30, start: 26, end: 28, color: "#ff4100" },
      { no: 31, start: 28, end: 30, color: "#ff2c00" },
      { no: 32, start: 30, end: 32, color: "#ff2000" },
      { no: 33, start: 32, end: 34, color: "#ff1400" },
      { no: 34, start: 34, end: 100, color: "#ff0000" }
    ]
  },
  TEM_K: {
    name: "温度(℃)",
    min: 373.15,
    max: -173.15,
    labelFunc: function(d) { return d - 273.15 },
    round: 1,
    value: [
      { no: 1, start: 173.15, end: 243.15, color: "#0000ff" },
      { no: 2, start: 243.15, end: 245.15, color: "#0014ff" },
      { no: 3, start: 245.15, end: 247.15, color: "#0045ff" },
      { no: 4, start: 247.15, end: 249.15, color: "#0065ff" },
      { no: 5, start: 249.15, end: 251.15, color: "#0085ff" },
      { no: 6, start: 251.15, end: 253.15, color: "#00a6ff" },
      { no: 7, start: 253.15, end: 255.15, color: "#00cbff" },
      { no: 8, start: 255.15, end: 257.15, color: "#00ebff" },
      { no: 9, start: 257.15, end: 259.15, color: "#00fff7" },
      { no: 10, start: 259.15, end: 261.15, color: "#00ffd6" },
      { no: 11, start: 261.15, end: 263.15, color: "#00ffb5" },
      { no: 12, start: 263.15, end: 265.15, color: "#00ff94" },
      { no: 13, start: 265.15, end: 267.15, color: "#00ff73" },
      { no: 14, start: 267.15, end: 269.15, color: "#00ff52" },
      { no: 15, start: 269.15, end: 271.15, color: "#00ff29" },
      { no: 16, start: 271.15, end: 273.15, color: "#00ff08" },
      { no: 17, start: 273.15, end: 275.15, color: "#10ff00" },
      { no: 18, start: 275.15, end: 277.15, color: "#31ff00" },
      { no: 19, start: 277.15, end: 279.15, color: "#52ff00" },
      { no: 20, start: 279.15, end: 281.15, color: "#73ff00" },
      { no: 21, start: 281.15, end: 283.15, color: "#94ff00" },
      { no: 22, start: 283.15, end: 285.15, color: "#b5ff00" },
      { no: 23, start: 285.15, end: 287.15, color: "#deff00" },
      { no: 24, start: 287.15, end: 289.15, color: "#ffff00" },
      { no: 25, start: 289.15, end: 291.15, color: "#ffe700" },
      { no: 26, start: 291.15, end: 293.15, color: "#ffc300" },
      { no: 27, start: 293.15, end: 295.15, color: "#ffa200" },
      { no: 28, start: 295.15, end: 297.15, color: "#ff8200" },
      { no: 29, start: 297.15, end: 299.15, color: "#ff6100" },
      { no: 30, start: 299.15, end: 301.15, color: "#ff4100" },
      { no: 31, start: 301.15, end: 303.15, color: "#ff2c00" },
      { no: 32, start: 303.15, end: 305.15, color: "#ff2000" },
      { no: 33, start: 305.15, end: 307.15, color: "#ff1400" },
      { no: 34, start: 307.15, end: 373.15, color: "#ff0000" }
    ]
  },
  TEMC: {
    name: "变温(℃)",
    min: -30,
    max: 30,
    labelFunc: function(d) { return d },
    round: 1,
    value: [
      { no: 1, start: "-Infinity", end: -20, color: "#00a6ff" },
      { no: 2, start: -20, end: -18, color: "#00cbff" },
      { no: 3, start: -18, end: -16, color: "#00ebff" },
      { no: 4, start: -16, end: -14, color: "#00fff7" },
      { no: 5, start: -14, end: -12, color: "#00ffd6" },
      { no: 6, start: -12, end: -10, color: "#00ffb5" },
      { no: 7, start: -10, end: -8, color: "#00ff94" },
      { no: 8, start: -8, end: -6, color: "#00ff73" },
      { no: 9, start: -6, end: -4, color: "#00ff52" },
      { no: 10, start: -4, end: 4, color: "#ffffff" },
      { no: 14, start: 4, end: 6, color: "#52ff00" },
      { no: 15, start: 6, end: 8, color: "#73ff00" },
      { no: 16, start: 8, end: 10, color: "#94ff00" },
      { no: 17, start: 10, end: 12, color: "#b5ff00" },
      { no: 18, start: 12, end: 14, color: "#deff00" },
      { no: 19, start: 14, end: 16, color: "#ffff00" },
      { no: 20, start: 16, end: 18, color: "#ffe700" },
      { no: 21, start: 18, end: 20, color: "#ffc300" },
      { no: 22, start: 20, end: "Infinity", color: "#ffa200" }
    ]
  },
  PRS: {
    name: "气压(hPa)",
    min: 0,
    max: 1050,
    labelFunc: function(d) { return d / 100 },
    round: 0,
    value: [
      { no: 1, start: 0, end: 45000, color: "#5440b6" },
      { no: 2, start: 45000, end: 97200, color: "#4349c9" },
      { no: 3, start: 97200, end: 97500, color: "#4d66d2" },
      { no: 4, start: 97500, end: 97800, color: "#5775d5" },
      { no: 5, start: 97800, end: 98100, color: "#4f97e1" },
      { no: 6, start: 98100, end: 98400, color: "#84b9fb" },
      { no: 7, start: 98400, end: 98700, color: "#73e1e7" },
      { no: 8, start: 98700, end: 99000, color: "#abf7eb" },
      { no: 9, start: 99000, end: 99300, color: "#cbfbda" },
      { no: 10, start: 99300, end: 99600, color: "#eefdca" },
      { no: 11, start: 99600, end: 99900, color: "#f9fad5" },
      { no: 12, start: 99900, end: 100200, color: "#fcf2ac" },
      { no: 13, start: 100200, end: 100500, color: "#fde37d" },
      { no: 14, start: 100500, end: 100800, color: "#fcc865" },
      { no: 15, start: 100800, end: 101100, color: "#faa644" },
      { no: 16, start: 101100, end: 105000, color: "#fa9200" }
    ]
  },
  PRS_L: {
    name: "气压(hPa)",
    min: 0,
    max: 1050,
    labelFunc: function(d) { return d / 100 },
    round: 0,
    value: [
      { no: 4, start: 50000, end: 70000, color: "#0000CD" },
      { no: 5, start: 70000, end: 80000, color: "#0000CD" },
      { no: 6, start: 80000, end: 90000, color: "#0000CD" },
      { no: 7, start: 90000, end: 99000, color: "#0000CD" },
      { no: 8, start: 99000, end: 99500, color: "#0000CD" },
      { no: 9, start: 99500, end: 100000, color: "#FF0000" },
      { no: 10, start: 100000, end: 100300, color: "#0000CD" },
      { no: 11, start: 100300, end: 100600, color: "#0000CD" },
      { no: 12, start: 100600, end: 101000, color: "#0000CD" },
      { no: 13, start: 101000, end: 101500, color: "#0000CD" },
      { no: 15, start: 101500, end: 102500, color: "#0000CD" },
      { no: 16, start: 102500, end: 105000, color: "#0000CD" }
    ]
  },
  PRS_H: {
    name: "气压(hPa)",
    min: 0,
    max: 1050,
    labelFunc: function(d) { return d },
    round: 0,
    value: [
      { no: 1, start: 0, end: 450, color: "#5440b6" },
      { no: 2, start: 450, end: 972, color: "#4349c9" },
      { no: 3, start: 972, end: 975, color: "#4d66d2" },
      { no: 4, start: 975, end: 978, color: "#5775d5" },
      { no: 5, start: 978, end: 981, color: "#4f97e1" },
      { no: 6, start: 981, end: 984, color: "#84b9fb" },
      { no: 7, start: 984, end: 987, color: "#73e1e7" },
      { no: 8, start: 987, end: 990, color: "#abf7eb" },
      { no: 9, start: 990, end: 993, color: "#cbfbda" },
      { no: 10, start: 993, end: 996, color: "#eefdca" },
      { no: 11, start: 996, end: 999, color: "#f9fad5" },
      { no: 12, start: 999, end: 1002, color: "#fcf2ac" },
      { no: 13, start: 1002, end: 1005, color: "#fde37d" },
      { no: 14, start: 1005, end: 1008, color: "#fcc865" },
      { no: 15, start: 1008, end: 1011, color: "#faa644" },
      { no: 16, start: 1011, end: 1050, color: "#fa9200" }
    ]
  },
  PRSC: {
    name: "变压(hPa)",
    min: 0,
    max: 20,
    labelFunc: function(d) { return d },
    round: 0,
    value: [
      { no: 1, start: -4000, end: -3500, color: "#5440b6" },
      { no: 2, start: -3500, end: -3000, color: "#4349c9" },
      { no: 3, start: -3000, end: -2500, color: "#4d66d2" },
      { no: 4, start: -2500, end: -2000, color: "#5775d5" },
      { no: 5, start: -2000, end: -1500, color: "#4f97e1" },
      { no: 6, start: -1500, end: -1000, color: "#84b9fb" },
      { no: 7, start: -1000, end: -500, color: "#73e1e7" },
      { no: 9, start: 500, end: 1000, color: "#cbfbda" },
      { no: 10, start: 1000, end: 1500, color: "#eefdca" },
      { no: 11, start: 1500, end: 2000, color: "#f9fad5" },
      { no: 12, start: 2000, end: 2500, color: "#fcf2ac" },
      { no: 13, start: 2500, end: 3000, color: "#fde37d" },
      { no: 14, start: 3000, end: 3500, color: "#fcc865" },
      { no: 15, start: 3500, end: 4000, color: "#faa644" },
      { no: 16, start: 4000, end: 5000, color: "#fa9200" }
    ]
  },
  RHU: {
    name: "相对湿度",
    min: 0,
    max: 100,
    labelFunc: function(d) { return d },
    round: 0,
    value: [
      { no: 1, start: 0, end: 10, color: "#E70000" },
      { no: 2, start: 10, end: 20, color: "#FC2603" },
      { no: 3, start: 20, end: 30, color: "#F74F14" },
      { no: 4, start: 30, end: 40, color: "#F9FAD5" },
      { no: 5, start: 40, end: 50, color: "#EEFDCA" },
      { no: 6, start: 50, end: 60, color: "#4349C9" },
      { no: 7, start: 60, end: 70, color: "#5440B6" },
      { no: 8, start: 70, end: 80, color: "#4621A4" },
      { no: 9, start: 80, end: 90, color: "#330D80" },
      { no: 10, start: 90, end: 100, color: "#080000" }
    ]
  },
  WIN: {
    name: "风速(m/s)",
    min: 0,
    max: 100,
    labelFunc: function(d) { return d },
    round: 0,
    value: [
      { no: 0, start: "0", end: "1.6", color: "#0099FF" },
      { no: 1, start: "1.6", end: "3.4", color: "#0067FF" },
      { no: 2, start: "3.4", end: "5.5", color: "#2F9A00" },
      { no: 3, start: "5.5", end: "8.0", color: "#26FF00" },
      { no: 4, start: "8.0", end: "10.8", color: "#D2FE09" },
      { no: 5, start: "10.8", end: "13.9", color: "#FCFE00" },
      { no: 6, start: "13.9", end: "17.2", color: "#F3D42F" },
      { no: 7, start: "17.2", end: "20.8", color: "#FB9B03" },
      { no: 8, start: "20.8", end: "24.5", color: "#DEC4C3" },
      { no: 9, start: "24.5", end: "28.5", color: "#CC9591" },
      { no: 10, start: "28.5", end: "32.7", color: "#904B45" },
      { no: 11, start: "32.7", end: "37.0", color: "#FF3333" },
      { no: 12, start: "37.0", end: "41.5", color: "#D2393A" },
      { no: 13, start: "41.5", end: "46.2", color: "#B23737" },
      { no: 14, start: "46.2", end: "51.0", color: "#B233B2" },
      { no: 15, start: "51.0", end: "56.1", color: "#DE37E1" },
      { no: 16, start: "56.1", end: "100", color: "#F237E1" }
    ]
  },
  PRE_1h: {
    name: "降水量",
    min: 0,
    max: 200,
    round: 1,
    value: [
      { no: 1, start: 0.1, end: 2, color: "#9cf790" },
      { no: 2, start: 2, end: 4, color: "#37a600" },
      { no: 3, start: 4, end: 6, color: "#03714e" },
      { no: 4, start: 6, end: 8, color: "#67b4f8" },
      { no: 5, start: 8, end: 10, color: "#0002fe" },
      { no: 6, start: 10, end: 20, color: "#fa03f0" },
      { no: 6, start: 20, end: 50, color: "#B233B2" },
      { no: 8, start: 50, end: 200, color: "#710100" }
    ]
  },
  PRE_3h: {
    name: "3h降水量",
    labelFunc: function(d) { return d },
    min: 0,
    max: 1000,
    round: 1,
    value: [
      { no: 1, start: 0.1, end: 3, color: "#9cf790" },
      { no: 2, start: 3, end: 10, color: "#37a600" },
      { no: 3, start: 10, end: 20, color: "#67b4f8" },
      { no: 4, start: 20, end: 50, color: "#0002fe" },
      { no: 5, start: 50, end: 70, color: "#fa03f0" },
      { no: 6, start: 70, end: 1000, color: "#710100" }
    ]
  },
  PRE_6h: {
    name: "6h降水量",
    labelFunc: function(d) { return d },
    min: 0,
    max: 1000,
    round: 1,
    value: [
      { no: 1, start: 0.1, end: 4, color: "#9cf790" },
      { no: 2, start: 4, end: 13, color: "#37a600" },
      { no: 3, start: 13, end: 25, color: "#67b4f8" },
      { no: 4, start: 25, end: 60, color: "#0002fe" },
      { no: 5, start: 60, end: 120, color: "#fa03f0" },
      { no: 6, start: 120, end: 1000, color: "#710100" }
    ]
  },
  PRE_12h: {
    name: "12h降水量",
    labelFunc: function(d) { return d },
    min: 0,
    max: 1000,
    round: 1,
    value: [
      { no: 1, start: 0.1, end: 10, color: "#9cf790" },
      { no: 2, start: 10, end: 25, color: "#37a600" },
      { no: 3, start: 25, end: 50, color: "#67b4f8" },
      { no: 4, start: 50, end: 100, color: "#0002fe" },
      { no: 5, start: 100, end: 250, color: "#fa03f0" },
      { no: 6, start: 250, end: 1000, color: "#710100" }
    ]
  },
  PRE_24h: {
    name: "降水量",
    labelFunc: function(d) { return d },
    min: 0,
    max: 1000,
    round: 1,
    value: [
      { no: 1, start: 0.2, end: 5, color: "#A8FFA5" },
      { no: 2, start: 5, end: 10, color: "#59FF52" },
      { no: 3, start: 10, end: 25, color: "#1FFFFF" },
      { no: 4, start: 25, end: 50, color: "#0F7FFF" },
      { no: 5, start: 50, end: 100, color: "#0548FF" },
      { no: 6, start: 100, end: 250, color: "#0D00FF" },
      { no: 7, start: 250, end: 1000, color: "#FB00FF" }
    ]
  },
  PRE_mon: {
    name: "降水量",
    min: 0,
    max: 1000,
    round: 1,
    value: [
      { no: 1, start: 1, end: 10, color: "#7BBF7A" },
      { no: 2, start: 10, end: 50, color: "#35FF27" },
      { no: 3, start: 50, end: 100, color: "#21FFFD" },
      { no: 4, start: 100, end: 200, color: "#107EFF" },
      { no: 5, start: 200, end: 300, color: "#0D00FD" },
      { no: 6, start: 300, end: 500, color: "#FB00FE" },
      { no: 7, start: 500, end: 1000, color: "#680031" }
    ]
  },
  PPH: {
    name: "降水相态",
    min: 0,
    max: 5,
    round: 0,
    value: [
      { no: 1, start: 1, end: 2, color: "#2C98B5", label: "1-降水" },
      { no: 2, start: 2, end: 3, color: "#95A109", label: "2-雨夹雪" },
      { no: 3, start: 3, end: 4, color: "#B1B1B1", label: "3-雪" }
    ]
  },
  CLOUD: {
    name: "云量",
    min: 0,
    max: 500,
    labelFunc: function(d) { return d },
    round: 0,
    value: [
      { no: 1, start: 0, end: 10, color: "#928246" },
      { no: 2, start: 10, end: 30, color: "#847746" },
      { no: 3, start: 30, end: 80, color: "#747474" },
      { no: 4, start: 80, end: 100, color: "#ADB7B6" },
      { no: 5, start: 100, end: 500, color: "#BEC1C1" }
    ]
  },
  WAVE: {
    name: "波高",
    min: 0,
    max: 30,
    round: 0,
    value: [
      { no: 1, start: 0, end: 1, color: "#C6F4FF" },
      { no: 2, start: 1, end: 2, color: "#0059A6" },
      { no: 3, start: 2, end: 3, color: "#0F15A7" },
      { no: 4, start: 3, end: 4, color: "#F74AFF" },
      { no: 5, start: 4, end: 5, color: "#970000" },
      { no: 6, start: 5, end: 7, color: "#FF0453" },
      { no: 7, start: 7, end: 10, color: "#FF6245" },
      { no: 8, start: 10, end: 12, color: "#FFFFFF" },
      { no: 9, start: 12, end: 30, color: "#BC8DBE" }
    ]
  },
  FOG: {
    name: "雾",
    min: 0,
    max: 5,
    round: 0,
    value: [
      { no: 1, start: 0, end: 1, color: "#C0FFE6", label: "1-轻雾" },
      { no: 2, start: 1, end: 2, color: "#64FFFF", label: "2-大雾" },
      { no: 3, start: 2, end: 3, color: "#00CDCB", label: "3-浓雾" },
      { no: 4, start: 3, end: 4, color: "#99997D", label: "4-强浓雾" },
      { no: 5, start: 4, end: 5, color: "#524CFF", label: "5-特强浓雾" }
    ]
  },
  HAIL: {
    name: "冰雹(概率)",
    min: 0,
    max: 100,
    round: 0,
    value: [
      { no: 1, start: 1, end: 20, color: "#FFFFFF" },
      { no: 2, start: 20, end: 40, color: "#6495ED" },
      { no: 3, start: 40, end: 60, color: "#00FA9A" },
      { no: 4, start: 60, end: 80, color: "#ADFF2F" },
      { no: 5, start: 80, end: 100, color: "#EEB422" },
      { no: 6, start: 100, end: "Infinity", color: "#FF3C3C" }
    ]
  },
  RAT: {
    name: "短时强降水(概率)",
    min: 0,
    max: 100,
    round: 0,
    value: [
      { no: 1, start: 1, end: 20, color: "#FFFFFF" },
      { no: 2, start: 20, end: 40, color: "#6495ED" },
      { no: 3, start: 40, end: 60, color: "#00FA9A" },
      { no: 4, start: 60, end: 80, color: "#ADFF2F" },
      { no: 5, start: 80, end: 100, color: "#EEB422" },
      { no: 6, start: 100, end: "Infinity", color: "#FF3C3C" }
    ]
  },
  SSM: {
    name: "雷暴(概率)",
    min: 0,
    max: 100,
    round: 0,
    value: [
      { no: 1, start: 1, end: 20, color: "#FFFFFF" },
      { no: 2, start: 20, end: 40, color: "#6495ED" },
      { no: 3, start: 40, end: 60, color: "#00FA9A" },
      { no: 4, start: 60, end: 80, color: "#ADFF2F" },
      { no: 5, start: 80, end: 100, color: "#EEB422" },
      { no: 6, start: 100, end: "Infinity", color: "#FF3C3C" }
    ]
  },
  SMG: {
    name: "雷暴大风(概率)",
    min: 0,
    max: 100,
    round: 0,
    value: [
      { no: 1, start: 1, end: 20, color: "#FFFFFF" },
      { no: 2, start: 20, end: 40, color: "#6495ED" },
      { no: 3, start: 40, end: 60, color: "#00FA9A" },
      { no: 4, start: 60, end: 80, color: "#ADFF2F" },
      { no: 5, start: 80, end: 100, color: "#EEB422" },
      { no: 6, start: 100, end: "Infinity", color: "#FF3C3C" }
    ]
  },
  HZ: {
    name: "霾",
    min: 0,
    max: 4,
    round: 0,
    value: [
      { no: 1, start: 0, end: 1, color: "#DBC902", label: "1-轻度霾" },
      { no: 2, start: 1, end: 2, color: "#A97000", label: "2-中度霾" },
      { no: 3, start: 2, end: 3, color: "#7E0022", label: "3-重度霾" },
      { no: 4, start: 3, end: 4, color: "#FF3C3C", label: "4-严重霾" }
    ]
  },
  DUST: {
    name: "沙尘",
    min: 0,
    max: 3,
    round: 0,
    value: [
      { no: 1, start: 0, end: 1, color: "#EFB235", label: "1-扬尘或浮尘" },
      { no: 2, start: 1, end: 2, color: "#F37504", label: "2-沙尘暴" },
      { no: 3, start: 2, end: 3, color: "#FF3C3C", label: "3-强沙尘暴" }
    ]
  },
  GUST: {
    name: "阵风",
    min: 0,
    max: 100,
    round: 0,
    value: [
      { no: 1, start: 0, end: 5, color: "#4D77B0" },
      { no: 2, start: 5, end: 10, color: "#4E99A4" },
      { no: 3, start: 10, end: 20, color: "#4DA457" },
      { no: 4, start: 20, end: 30, color: "#AFAA4B" },
      { no: 5, start: 30, end: 40, color: "#9A4F65" },
      { no: 6, start: 40, end: 60, color: "#76649F" },
      { no: 7, start: 60, end: 100, color: "#6498A3" }
    ]
  },
  VIS: {
    name: "能见度",
    min: 0.01,
    round: 1,
    max: 50,
    value: [
      { no: 1, start: 0.01, end: 0.2, color: "#824937" },
      { no: 2, start: 0.2, end: 0.5, color: "#a22dff" },
      { no: 3, start: 0.5, end: 1, color: "#ea3237" },
      { no: 4, start: 1, end: 2, color: "#f06d37" },
      { no: 5, start: 2, end: 3, color: "#f0b774" },
      { no: 6, start: 3, end: 5, color: "#f1f039" },
      { no: 7, start: 5, end: 10, color: "#87f459" },
      { no: 8, start: 10, end: 20, color: "#98dcfd" },
      { no: 9, start: 20, end: 30, color: "#c5e8ff" },
      { no: 10, start: 30, end: 50, color: "#f1f5fe" }
    ]
  },
  VIS_M: {
    name: "能见度",
    min: 1,
    round: 0,
    max: 50000,
    value: [
      { no: 1, start: 1, end: 200, color: "#824937" },
      { no: 2, start: 200, end: 500, color: "#a22dff" },
      { no: 3, start: 500, end: 1000, color: "#ea3237" },
      { no: 4, start: 1000, end: 2000, color: "#f06d37" },
      { no: 5, start: 2000, end: 3000, color: "#f0b774" },
      { no: 6, start: 3000, end: 5000, color: "#f1f039" },
      { no: 7, start: 5000, end: 10000, color: "#87f459" },
      { no: 8, start: 10000, end: 20000, color: "#98dcfd" },
      { no: 9, start: 20000, end: 30000, color: "#c5e8ff" },
      { no: 10, start: 30000, end: 50000, color: "#f1f5fe" }
    ]
  },
  glqx: {
    name: "公路气象",
    min: 0,
    max: 10,
    round: 0,
    value: [
      { no: 1, start: "", end: "", color: "#DBDFE0", label: "未受影响" },
      { no: 2, start: "", end: "", color: "#62914A", label: "大-暴雨" },
      { no: 3, start: "", end: "", color: "#E2B655", label: "雾" },
      { no: 4, start: "", end: "", color: "#BE2930", label: "雷暴" },
      { no: 5, start: "", end: "", color: "#91B5DB", label: "小-中雪" },
      { no: 6, start: "", end: "", color: "#A2E5D0", label: "冻雨" },
      { no: 7, start: "", end: "", color: "#BFEB9D", label: "小-中雨" },
      { no: 8, start: "", end: "", color: "#2D5282", label: "大-暴雪" },
      { no: 9, start: "", end: "", color: "#655426", label: "沙尘暴" }
    ]
  },
  WED: {
    name: "风功能密度(W/㎡)",
    min: 0,
    max: 20000,
    round: 0,
    value: [
      { no: 1, start: 0, end: 5, color: "#0099FF" },
      { no: 2, start: 5, end: 250, color: "#2F9A00" },
      { no: 3, start: 250, end: 450, color: "#D2FE09" },
      { no: 4, start: 450, end: 650, color: "#FCFE00" },
      { no: 5, start: 650, end: 950, color: "#F3D42F" },
      { no: 6, start: 950, end: 1200, color: "#FB9B03" },
      { no: 7, start: 1200, end: 1600, color: "#B233B2" },
      { no: 8, start: 1600, end: 2000, color: "#DE37E1" },
      { no: 9, start: 2000, end: 6000, color: "#F237E1" },
      { no: 10, start: 6000, end: 10000, color: "#5440B6" },
      { no: 11, start: 10000, end: 14000, color: "#4621A4" },
      { no: 12, start: 14000, end: 18000, color: "#330D80" },
      { no: 13, start: 18000, end: 20000, color: "#080000" }
    ]
  },
  WED_SUM: {
    name: "风功能密度(KW/㎡)",
    min: 0,
    max: 50000,
    round: 0,
    value: [
      { no: 1, start: 0, end: 5, color: "#0099FF" },
      { no: 2, start: 5, end: 250, color: "#2F9A00" },
      { no: 3, start: 250, end: 450, color: "#D2FE09" },
      { no: 4, start: 450, end: 650, color: "#FCFE00" },
      { no: 5, start: 650, end: 950, color: "#F3D42F" },
      { no: 6, start: 950, end: 1200, color: "#FB9B03" },
      { no: 7, start: 1200, end: 1600, color: "#B233B2" },
      { no: 8, start: 1600, end: 2000, color: "#DE37E1" },
      { no: 9, start: 2000, end: 6000, color: "#F237E1" },
      { no: 10, start: 6000, end: 10000, color: "#5440B6" },
      { no: 11, start: 10000, end: 14000, color: "#4621A4" },
      { no: 12, start: 14000, end: 18000, color: "#330D80" },
      { no: 13, start: 18000, end: 50000, color: "#080000" }
    ]
  },
  PBLH: {
    name: "边界层高度（m）",
    min: 0,
    max: 10000,
    round: 0,
    value: [
      { no: 1, start: 0, end: 5, color: "#0099FF" },
      { no: 2, start: 5, end: 250, color: "#2F9A00" },
      { no: 3, start: 250, end: 450, color: "#D2FE09" },
      { no: 4, start: 450, end: 650, color: "#FCFE00" },
      { no: 5, start: 650, end: 950, color: "#F3D42F" },
      { no: 6, start: 950, end: 1200, color: "#FB9B03" },
      { no: 7, start: 1200, end: 1600, color: "#B233B2" },
      { no: 8, start: 1600, end: 2000, color: "#DE37E1" },
      { no: 9, start: 2000, end: 6000, color: "#F237E1" },
      { no: 10, start: 6000, end: 10000, color: "#5440B6" }
    ]
  },
  HT0: {
    name: "0度层高度（m）",
    min: 0,
    max: 10000,
    round: 0,
    value: [
      { no: 1, start: -10, end: 50, color: "#0099FF" },
      { no: 2, start: 50, end: 200, color: "#2F9A00" },
      { no: 3, start: 200, end: 500, color: "#D2FE09" },
      { no: 4, start: 500, end: 900, color: "#FCFE00" },
      { no: 5, start: 900, end: 1500, color: "#F3D42F" },
      { no: 6, start: 1500, end: 2500, color: "#FB9B03" },
      { no: 7, start: 2500, end: 4000, color: "#B233B2" },
      { no: 8, start: 4000, end: 6000, color: "#DE37E1" },
      { no: 9, start: 6000, end: 8000, color: "#F237E1" },
      { no: 10, start: 8000, end: 10000, color: "#5440B6" }
    ]
  },
  SSP: {
    name: "海平面气压(hPa)",
    min: 0,
    max: 1050,
    labelFunc: function(d) { return d / 100 },
    round: 0,
    value: [
      { no: 4, start: 990, end: 995, color: "#8EB3B8" },
      { no: 5, start: 995, end: 1000, color: "#68B4B3" },
      { no: 6, start: 1000, end: 1003, color: "#45A7A6" },
      { no: 7, start: 1003, end: 1006, color: "#398393" },
      { no: 8, start: 1006, end: 1010, color: "#397693" },
      { no: 9, start: 1010, end: 1015, color: "#395B93" },
      { no: 10, start: 1015, end: 1020, color: "#3A7535" },
      { no: 11, start: 1020, end: 1022, color: "#9FA141" },
      { no: 11, start: 1022, end: 1025, color: "#AD8839" },
      { no: 11, start: 1025, end: 1030, color: "#AA5443" },
      { no: 11, start: 1030, end: 1050, color: "#5E3C51" }
      ]
  },
  KIDX: {
    name: "K指数",
    min: 0,
    max: 35,
    round: 0,
    value: [
      { no: 1, start: 0, end: 20, color: "#DBC902", label: "无雷雨" },
      { no: 2, start: 20, end: 25, color: "#A97000", label: "孤立雷雨" },
      { no: 3, start: 25, end: 30, color: "#7E0022", label: "零星雷雨" },
      { no: 4, start: 30, end: 35, color: "#FF3C3C", label: "成片雷雨" }
      ]
  },
  PERIODSTANDAR: {
    name: "四季标准区",
    min: 0,
    max: 5,
    round: 0,
    value: [
      { no: 1, equal: "fourSeason", label: "四季区", color: "#D2FE09" },
      { no: 2, equal: "spring", label: "常春区", color: "#00ff00" },
      { no: 3, equal: "summer", label: "常夏区", color: "#ff0000" },
      { no: 4, equal: "winter", label: "常冬区", color: "#DCDCDC" },
      { no: 5, equal: "noSummer", label: "无夏区", color: "#655426" },
      { no: 5, equal: "noWinter", label: "无冬区", color: "#000000" }
      ]
  },
  PERIOD: {
    name: "四季分布",
    min: 0,
    max: 5,
    round: 0,
    value: [
      { no: 1, equal: "spring", label: "春季", color: "#00EBA9" },
      { no: 2, equal: "summer", label: "夏季", color: "#FF4D4D" },
      { no: 3, equal: "autumn", label: "秋季", color: "#FFC700" },
      { no: 4, equal: "winter", label: "冬季", color: "#DCDCDC" },
      { no: 5, equal: "error", label: "异常", color: "#333333" }
      ]
  },
  TYPHOON: {
    level: {
      name: "台风等级",
    min: 0,
    max: 6,
    round: 0,
      value: [
        { no: 1, label: "热带低压", color: "#03c3ff" },
        { no: 2, label: "热带风暴", color: "#b1af00" },
        { no: 3, label: "强热带风暴", color: "#3cba3c" },
        { no: 4, label: "台风", color: "#cc0000" },
        { no: 5, label: "强台风", color: "#fa00fa" },
        { no: 6, label: "超强台风", color: "#9e004a" }
      ]
    },
    ogran: {
      name: "预报机构",
    min: 0,
    max: 6,
    round: 0,
      value: [
        { no: 1, label: "中国", color: "#ff0000" },
        { no: 2, label: "日本", color: "#548B54" },
        { no: 3, label: "美国", color: "#87CEEB" },
        { no: 4, label: "中国台湾", color: "#AE00D9" },
        { no: 5, label: "中国香港", color: "#B8860B" },
        { no: 6, label: "韩国", color: "#3A5FCD" }
      ]
    }
  },
  SUM_PRE_1h: {
    name: "累积降水量",
    min: 0,
    max: 1000,
    round: 0,
    value: [
      { no: 1, start: 50, end: 70, color: "#9cf790" },
      { no: 2, start: 70, end: 90, color: "#37a600" },
      { no: 3, start: 90, end: 110, color: "#03714e" },
      { no: 4, start: 110, end: 130, color: "#67b4f8" },
      { no: 5, start: 130, end: 150, color: "#0002fe" },
      { no: 6, start: 150, end: 170, color: "#fa03f0" },
      { no: 6, start: 170, end: 200, color: "#B233B2" },
      { no: 8, start: 200, end: 500, color: "#710100" }
    ]
  },
  MWD_HYD: {
    name: "超警戒水位",
    min: 0,
    max: 200,
    round: 0,
    value: [
      { no: 1, start: -100, end: -20, color: "#73e1e7" },
      { no: 2, start: -20, end: -10, color: "#abf7eb" },
      { no: 3, start: -10, end: 0, color: "#cbfbda" },
      { no: 4, start: 0, end: 20, color: "#ffa200" },
      { no: 5, start: 20, end: 40, color: "#ff8200" },
      { no: 6, start: 40, end: 60, color: "#ff6100" },
      { no: 7, start: 60, end: 80, color: "#ff4100" },
      { no: 8, start: 80, end: 200, color: "#ff2c00" }
    ]
  },
  DBZ: {
    name: "基本反射率",
    min: 0,
    max: 100,
    round: 0,
    value: [
      { no: 1, start: 10, end: 15, color: "#01a0f6" },
      { no: 2, start: 15, end: 20, color: "#00ecec" },
      { no: 3, start: 20, end: 25, color: "#00d800" },
      { no: 4, start: 25, end: 30, color: "#019000" },
      { no: 5, start: 30, end: 35, color: "#ffff00" },
      { no: 6, start: 35, end: 40, color: "#e7c000" },
      { no: 7, start: 40, end: 45, color: "#ff9000" },
      { no: 8, start: 45, end: 50, color: "#ff0000" },
      { no: 8, start: 50, end: 55, color: "#d60000" },
      { no: 8, start: 55, end: 60, color: "#c00000" },
      { no: 8, start: 60, end: 65, color: "#ff00f0" },
      { no: 8, start: 65, end: 70, color: "#9600b4" },
      { no: 8, start: 70, end: "", color: "#ad90f0" }
    ]
  },
  AQI: {
    name: "空气质量指数",
    min: 0,
    max: 300,
    round: 0,
    value: [
      { no: 1, start: 0, end: 50, color: "#7fc76d" },
      { no: 2, start: 50, end: 100, color: "#f7e16b" },
      { no: 3, start: 100, end: 150, color: "#f09d5a" },
      { no: 4, start: 150, end: 200, color: "#ec5a4c" },
      { no: 5, start: 200, end: 300, color: "#a64266" },
      { no: 6, start: 300, end: "Infinity", color: "#88424e" }
    ]
  },
  PM25: {
    name: "PM2.5(微克/立方米)",
    min: 0,
    max: 250,
    round: 0,
    value: [
      { no: 1, start: 0, end: 35, color: "#7fc76d" },
      { no: 2, start: 35, end: 75, color: "#f7e16b" },
      { no: 3, start: 75, end: 115, color: "#f09d5a" },
      { no: 4, start: 115, end: 150, color: "#ec5a4c" },
      { no: 5, start: 150, end: 250, color: "#a64266" },
      { no: 6, start: 250, end: "Infinity", color: "#88424e" }
    ]
  },
  PM10: {
    name: "PM10(微克/立方米)",
    min: 0,
    max: 500,
    round: 0,
    value: [
      { no: 1, start: 0, end: 50, color: "#7fc76d" },
      { no: 2, start: 50, end: 150, color: "#f7e16b" },
      { no: 3, start: 150, end: 250, color: "#f09d5a" },
      { no: 4, start: 250, end: 350, color: "#ec5a4c" },
      { no: 5, start: 350, end: 420, color: "#a64266" },
      { no: 6, start: 420, end: "Infinity", color: "#88424e" }
    ]
  },
  O3: {
    name: "O3(微克/立方米)",
    min: 0,
    max: 300,
    round: 0,
    value: [
      { no: 1, start: 0, end: 35, color: "#7fc76d" },
      { no: 2, start: 35, end: 75, color: "#f7e16b" },
      { no: 3, start: 75, end: 115, color: "#f09d5a" },
      { no: 4, start: 115, end: 150, color: "#ec5a4c" },
      { no: 5, start: 150, end: 250, color: "#a64266" },
      { no: 6, start: 250, end: "Infinity", color: "#88424e" }
    ]
  },
  CO: {
    name: "CO(毫克/立方米)",
    min: 0,
    max: 40,
    round: 0,
    value: [
      { no: 1, start: 0, end: 2, color: "#7fc76d" },
      { no: 2, start: 2, end: 4, color: "#f7e16b" },
      { no: 3, start: 4, end: 14, color: "#f09d5a" },
      { no: 4, start: 14, end: 24, color: "#ec5a4c" },
      { no: 5, start: 24, end: 36, color: "#a64266" },
      { no: 6, start: 36, end: "Infinity", color: "#88424e" }
    ]
  },
  SO2: {
    name: "SO2(毫克/立方米)",
    min: 0,
    max: 1600,
    round: 0,
    value: [
      { no: 1, start: 0, end: 50, color: "#7fc76d" },
      { no: 2, start: 50, end: 150, color: "#f7e16b" },
      { no: 3, start: 150, end: 475, color: "#f09d5a" },
      { no: 4, start: 475, end: 800, color: "#ec5a4c" },
      { no: 5, start: 800, end: 1600, color: "#a64266" },
      { no: 6, start: 1600, end: "Infinity", color: "#88424e" }
    ]
  },
  NO2: {
    name: "NO2(毫克/立方米)",
    min: 0,
    max: 600,
    round: 0,
    value: [
      { no: 1, start: 0, end: 40, color: "#7fc76d" },
      { no: 2, start: 40, end: 80, color: "#f7e16b" },
      { no: 3, start: 80, end: 180, color: "#f09d5a" },
      { no: 4, start: 180, end: 280, color: "#ec5a4c" },
      { no: 5, start: 280, end: 565, color: "#a64266" },
      { no: 6, start: 565, end: "Infinity", color: "#88424e" }
    ]
  },
  GPH_200: {
    name: "位势高度",
    min: 1100,
    interval: 16,
    max: 1244,
    labelFunc: function(d) { return d / 9.80665 },
    round: 0
  },
  GPH_500: {
    name: "位势高度",
    min: 500,
    max: 600,
    interval: 4,
    labelFunc: function(d) { return d / 9.80665 },
    round: 0,
    value: [
      { no: 1, start: 500, end: 504, color: "#0000CD" },
      { no: 2, start: 504, end: 512, color: "#0000CD" },
      { no: 3, start: 512, end: 520, color: "#0000CD" },
      { no: 4, start: 520, end: 528, color: "#0000CD" },
      { no: 5, start: 528, end: 536, color: "#0000CD" },
      { no: 6, start: 536, end: 544, color: "#0000CD" },
      { no: 7, start: 544, end: 552, color: "#0000CD" },
      { no: 8, start: 552, end: 560, color: "#0000CD" },
      { no: 9, start: 560, end: 564, color: "#0000CD" },
      { no: 10, start: 564, end: 568, color: "#0000CD" },
      { no: 11, start: 568, end: 572, color: "#0000CD" },
      { no: 12, start: 572, end: 576, color: "#0000CD" },
      { no: 13, start: 576, end: 580, color: "#0000CD" },
      { no: 14, start: 580, end: 584, color: "#0000CD" },
      { no: 15, start: 584, end: 586, color: "#0000CD" },
      { no: 16, start: 586, end: 588, color: "#FF0000" }
    ]
  },
  GPH_850: {
    name: "位势高度",
    min: 136,
    max: 156,
    labelFunc: function(d) { return d / 9.80665 },
    round: 0,
    value: [
      { no: 4, start: 0, end: 136, color: "#0000CD" },
      { no: 5, start: 136, end: 140, color: "#0000CD" },
      { no: 6, start: 140, end: 144, color: "#FF0000" },
      { no: 7, start: 144, end: 148, color: "#0000CD" },
      { no: 8, start: 148, end: 152, color: "#0000CD" },
      { no: 9, start: 152, end: 156, color: "#0000CD" }
    ]
  }
}
