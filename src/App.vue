<template>
  <el-container>
    <el-header class="header">
      <div style="margin-top: 15px;">
        <div style="width: fit-content;float: left;">
          <div class="icon">
            <svg t="1702892592527" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="4460" data-spm-anchor-id="a313x.search_index.0.i9.1e343a81LSbmza">
              <path
                d="M568.96 459.242667l144-189.205334A382.208 382.208 0 0 0 512 213.333333c-212.074667 0-384 171.925333-384 384a382.293333 382.293333 0 0 0 93.397333 251.008l-64.554666 55.808A467.584 467.584 0 0 1 42.666667 597.333333C42.666667 338.133333 252.8 128 512 128c93.098667 0 179.861333 27.093333 252.842667 73.856l75.882666-99.690667 67.541334 51.413334-273.28 359.04a149.333333 149.333333 0 1 1-66.048-53.376z m266.453333-69.056l54.357334-71.424A467.242667 467.242667 0 0 1 981.333333 597.333333c0 113.706667-40.64 221.226667-113.237333 305.728l-64.725333-55.616A382.272 382.272 0 0 0 896 597.333333c0-76.288-22.250667-147.370667-60.586667-207.146666zM512 661.333333a64 64 0 1 0 0-128 64 64 0 0 0 0 128z"
                fill="#ffffff" p-id="4461"></path>
            </svg>
          </div>
          <span class="title"> 网络面板 </span>
        </div>
        <div style="float: right;margin-top: 5px;">
          <el-button class="home" @click="aboutVisible=true" round>关于</el-button>
        </div>
        <div v-if="isAndroid" style="float: right;margin-top: 5px;margin-right: 5px;">
          <el-button class="home" @click="downLoadAPPTableVisible=true" round>APP</el-button>
        </div>
      </div>
    </el-header>
    <el-main>
      <MainUI :isVisible="isVisible" />
      <br>
      <IPinfoUI :isVisible="isVisible" />
    </el-main>
    <div style="height: fit-content;padding-bottom: 10px;">
      <div style="width: fit-content;margin-left: auto;margin-right: auto;">
        <el-link type="info" href="https://netart.cn/" target="_blank">Whoami</el-link>&nbsp;
        <el-link type="info" href="https://github.com/ljxi/NetworkPanel" target="_blank">源码</el-link>
      </div>
    </div>
  </el-container>
  <el-dialog style="width: 90%;max-width: 700px;" v-model="downLoadAPPTableVisible" title="APP下载">
    <div>
      <h2>网络面板v2.2</h2>
      <span>Java原生实现</span><br> 
      <span>1.支持锁屏运行</span><br>
      <span>2.支持添加任何链接</span><br>
      <span>3.相对于浏览器更加省电</span><br>
      <span>4.通知栏实时查看网络信息</span><br>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="downLoadAPPTableVisible = false">关闭</el-button>
        <el-button type="primary" @click="downloadApp">
          下载
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog style="width: 90%;max-width: 400px;" v-model="aboutVisible" title="关于">
    <div>
      <h2>网络面板</h2>
      <span>作者：<el-link href="https://netart.cn/" type="primary">Whoami</el-link></span><br>
      <span>QQ：<el-link type="primary" @click="copyText('582424565')">582424565 </el-link></span><br>
      <span>QQ群：<el-link type="primary" @click="copyText('463481772')">463481772 </el-link></span><br>
      <span>开源地址：<el-link href="https://github.com/ljxi/NetworkPanel" type="primary">Github</el-link></span><br> 
      <span>赞助支持：
        <el-link href="https://afdian.net/a/ljxnet" type="primary">爱发电</el-link>&nbsp
        <el-link href="https://qr.alipay.com/fkx13781i79xywfarbvrsfc" type="primary">支付宝</el-link>
      </span><br>
      <span>特别感谢：</span><br>
      <el-link href="https://www.kuocaicdn.com/register?code=8z8urvbg2ffd9" type="primary">括彩科技</el-link><span>提供免费稳定的CDN服务</span><br>
      <el-link href="https://staticfile.org/" type="primary">七牛云</el-link><span>提供免费稳定前端静态资源分发服务</span><br>
      <br>
      <span>本项目用到的开源库:</span><br>
      <el-link href="https://github.com/vuejs/core" type="primary">Vue</el-link>&nbsp
      <el-link href="https://github.com/element-plus/element-plus" type="primary">ElementPlus</el-link>&nbsp
      <el-link href="https://github.com/apache/echarts" type="primary">echarts</el-link>&nbsp
      <el-link href="https://github.com/richtr/NoSleep.js" type="primary">NoSleep.js</el-link>&nbsp
      <el-link href="https://github.com/soerenmartius/vue3-clipboard" type="primary">vue3-clipboard</el-link>&nbsp
    </div>
    <div>
      <h2>疑问解答</h2>
      <div class="question">
        <span class="ask">问：APP/后端代码开源吗？</span><br>
        <span class="answer">答：不开源</span><br>
      </div>
      <div class="question">
        <span class="ask">问：我搭建了一个前端页面，能否添加到跨域白名单？</span><br>
        <span class="answer">答：你需要有一定的用户量，并添加链接指向本项目开源仓库，然后联系我加白名单</span><br>
      </div>
      <div class="question">
        <span class="ask">问：能否添加xxx功能？</span><br>
        <span class="answer">答：有合理的建议请联系我</span><br>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="aboutVisible = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>

import MainUI from "./components/Main.vue"
import IPinfoUI from "./components/IPinfo.vue"
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { toClipboard } from '@soerenmartius/vue3-clipboard'
var isAndroid = /Android/i.test(navigator.userAgent)
const isVisible = ref(true)
const downLoadAPPTableVisible = ref(false)
const aboutVisible = ref(false)
const downloadApp = () => {
  window.open("https://api.netart.cn/lanzou?id=iOqLF1ivbvtc")
  downLoadAPPTableVisible.value = false
}

let copyText = (txt:string) => {
  toClipboard(txt)
  ElMessage.info({
    dangerouslyUseHTMLString: true,
    message: '<center>已经复制到剪切板</center>',
  })
}
document.addEventListener("visibilitychange", function () {
  var string = document.visibilityState
  if (string === 'hidden') isVisible.value = false
  else isVisible.value = true
})
</script>

<style scoped>  
.question {
  margin-top: 10px;
}
.ask {
  color: #6071ee;
}
.header {
  height: fit-content;
  padding-bottom: 12px;
  background-color: #ffffff;
}

.title {
  color: #526484;
  font-size: 20px;
  font-weight: bolder;
}

.home {
  color: #526484;
  font-size: 12px;
}
.icon {
  display:inline-block;
  vertical-align: -6px;
  width: 40px;
  height: 40px;
  background-color: #5668EE;
  border-radius: 20%;
}
.icon svg {
  width: 30px;
  margin-left: 5px;
}
@media (prefers-color-scheme: dark) {
  .header {
    background-color: rgb(18, 18, 18);
  }

  .title {
    color: rgb(152, 167, 202);
  }

  .home {
    color: rgb(152, 167, 202);
  }
}</style>