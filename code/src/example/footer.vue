<template>
  <div>
<!--    <div class="foot">
      Copyright@2011 China Meteorological Administration All Rights Reserved
    </div> -->
  </div>
</template>
<script>
  export default {
    name: "footerC",
    data() {
      return {
      }
    },
    props: {
    },
    watch: {
    },
    methods: {
    }
  }
</script>

<style>
  .foot {
    padding-left: 1em;
    height: 34px;
    background-color: lightgray;
    position: absolute;
    z-index: 800;
    bottom: 0;
    color: black;
    width: 100%;
    padding: 1px auto;
    font-size: 16px;
    text-align: center;
  }
</style>
