<template>
  <el-container >
    <el-header style="height: fit-content;padding-bottom: 12px;background-color: #ffffff;">
      <div style="margin-top: 15px;">
        <div style="width: fit-content;float: left;">
          <img :width="40" :height="40" class="mr-2" :src="header_icon" style="display:inline-block;vertical-align: -12px;"/>
          <span style="color: #526484;font-size: 20px;font-weight: bolder;"> 网络面板 </span>
        </div>
        <div style="float: right;">
          <el-button style="color: #526484;font-size: 12px;" @click="GoToHomePage" round>Q群</el-button>
        </div>
      </div>
    </el-header>
    <el-main>
      <MainUI :isVisible="isVisible" :IPinfo="IPinfo"/>
      <br>
      <IPinfoUI :isVisible="isVisible" :IPinfo="IPinfo"/>
    </el-main>
    <div style="height: fit-content;padding-bottom: 10px;">
      <div style="width: fit-content;margin-left: auto;margin-right: auto;">
        <el-link type="info" href="https://netart.cn/" target="_blank">Whoami</el-link>&nbsp;
        <el-link type="info" href="https://github.com/ljxi/NetworkPanel" target="_blank">源码</el-link>  
      </div>
    </div>
  </el-container>
</template>

<script lang="ts" setup>
// import { useDark, useToggle } from '@vueuse/core'

// const isDark = useDark()
// const toggleDark = useToggle(isDark)
// toggleDark()
import MainUI from "./components/Main.vue"
import IPinfoUI from "./components/IPinfo.vue"
import header_icon from "./assets/logo.svg"
import { ref , reactive} from 'vue'
import { ElMessage } from 'element-plus'
import { toClipboard } from '@soerenmartius/vue3-clipboard'

const isVisible=ref(true)
const IPinfo=reactive({globalInfo:null,localInfo:null})
let GoToHomePage =  ()=> { 
  //window.open("https://netart.cn/")
  toClipboard('463481772')
  ElMessage.info({
    dangerouslyUseHTMLString: true,
    message: '<center>已经复制QQ群号：<br><strong>463481772</strong></center>',
  })
}
document.addEventListener("visibilitychange", function() {
  var string = document.visibilityState
  if (string === 'hidden')isVisible.value = false
  else isVisible.value = true
})
</script>

<style>

</style>