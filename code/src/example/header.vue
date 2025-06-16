<template>
  <div class="header-nav-contaienr">
    <div class="headClass" :style="{background:'url('+imgUrl+')'}">
      <img src="/img/logo/pmd.png" class="logo"/>
      <h3 class="title" style="">Pakistan Weather EarlyWarning System </h3>
      <div style="display:flex;justify-content:right;align-items: center;padding-top: 20px;">
        <li class="nav-btn" style="display:flex;justify-content:right;padding-bottom:1em;" >
          <ul class="ulimgHead" style="display:flex;align-items: center;padding-right:.4em;height:45px;"><img src="/img/menu/ground.png" style="width:22px;display:inline;position:relative;left:1em;"/><a :href="handlebtn('index')" target="_self"  rel="noopener noreferrer" style="color:white;line-height:30px;font-size:18px;margin-left:20px;font-weight:'bold';cursor:pointer;position:relative;right:.3em">Interactive Analysis</a></ul>
          <ul style="display:flex;align-items: center;padding-right:.4em;height:45px;"><img src="/img/menu/ground.png" style="width:22px;display:inline;position:relative;left:1em"/><a :href="handlebtn('correction')" target="_self" class="clomName"  rel="noopener noreferrer">Forecast Correction </a></ul>
          <ul style="display:flex;align-items: center;padding-right:.4em;height:45px;"><img src="/img/menu/ground.png" style="width:22px;display:inline;position:relative;left:1em"/><a :href="handlebtn('warning')" target="_self" class="clomName"  rel="noopener noreferrer">Early Warning</a></ul>
          <ul style="display:flex;align-items: center;padding-right:.4em;height:45px;"><img src="/img/menu/ground.png" style="width:22px;display:inline;position:relative;left:1em"/><a :href="handlebtn('systemConf')" target="_self" class="clomName"  rel="noopener noreferrer">System Config</a></ul>
        </li>
      </div>
      <a class="el-icon-user-solid" style="position:absolute;left:1800px;z-index: 999999999;">اوردو</a>
    </div>
  </div>
</template>
<script>
  export default {
    name: "headDiv",
    data() {
      return {
        imgUrl: "img/background_img2.png"

      }
    },
    props: {

    },
    watch: {
    },
    methods: {
      handlebtn(e) {
        if (e === "correction") {
            return "http://47.94.18.73/fineGrid"
        }   
        return "/?id=" + e
      }
    }
  }
</script>
<style>
  .logo {
    position: relative;
  
    font-weight: 900;
    letter-spacing: 0.25vw;
    background-clip: text;
    -webkit-background-clip: text;
    position: absolute;
    left: 1em;
    z-index: 999999;
    width: 50px;
  }
  .title {
    position: relative;
  
    font-weight: 900;
    letter-spacing: 0.25vw;
    background-clip: text;
    -webkit-background-clip: text;
    position: absolute;
    left: 2.5em;
    z-index: 999999;
    font-size: 28px;
    font-family: Source Han Sans CN VF;
    font-weight: bold;
    color:#84E1FC
  }

  .headClass {
    display: flex;
    justify-content: center;
    font-size: 18px;
    padding: .7em;
    padding-top: .2em;
    padding-bottom: 0.2em;
    padding-left: 1em;
    color: white;
    align-items: center;
    position: absolute;
    min-width: 2600px;
    z-index: 9999;
    height: 60px;
    background: linear-gradient(to bottom,RGBA(28,78,147,1),RGBA(28,78,147,.8),RGBA(28,78,147,.6),RGBA(28,78,147,.4))!important;
   

  }
  .clomName {
    color:'#ffffff';
    border:none;
    line-height:30px;
    font-size:18px;
    margin-left:20px;
    font-family:'Microsoft YaHei';
    font-weight:'bold';
    cursor:pointer;
    background-image: -webkit-linear-gradient(bottom,#83cfff,#fff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  a:link {   
    color: #ffffff;   
    text-decoration: none;   
  }   
  a:visited {   
    color: #ffffff;   
    text-decoration: none;   
  }   
  a:hover {   
    color: #ffffff;   
    text-decoration: underline;   
  }   
  .ulimgHead{
    /* background: url('/img/yellow_active.png') no-repeat 50%; */
    background-size: 100% 100%;
    color: #F0E68C
  }
</style>
