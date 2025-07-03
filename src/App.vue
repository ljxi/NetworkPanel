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
        <el-link type="info" @click='open("https://netart.cn/")' target="_blank">Whoami</el-link>&nbsp;
        <el-link type="info" @click='open("https://github.com/ljxi/NetworkPanel")' target="_blank">源码</el-link>&nbsp;
        <el-link type="info" @click='open("https://github.com/ljxi/GeoCN")' target="_blank">IP离线库</el-link>
      </div>
      <div style="width: fit-content;margin-left: auto;margin-right: auto;">
        <span style="color:var(--el-color-info);font-size: 12px;">
          本工具由
            <el-link style="vertical-align: -2px;" type="info" @click='open("https://edgeone.ai/zh?from=net.netart.cn")' target="_blank">
              <img src="https://edgeone.ai/favicon.ico" alt="括彩CDN" width="15" height="15">
              Tencent Edgeone
            </el-link>
          提供CDN服务
        </span>
      </div>
    </div>
  </el-container>
  <el-dialog align-center style="width: 90%;max-width: 700px;" v-model="downLoadAPPTableVisible" title="APP下载">
    <div>
      <el-button style="float:right;margin-top: -5px;" type="primary" @click="open('https://cdn.netart.cn/network-panel-app/v3.2.2.apk')">
          下载最新版
      </el-button> 
      <h2>网络面板APP</h2>
      <span>Java原生实现</span><br> 
      <span>1.支持锁屏运行</span><br>
      <span>2.支持添加任何链接</span><br>
      <span>3.相对于浏览器更加省电</span><br>
      <span>4.通知栏实时查看网络信息</span><br>
    </div>
    <div>
      <h2>更新日志</h2>
	  <div>
        <h3>v3.2.2</h3>
        <p>
		  修复数据上报问题<br>
        </p>
      </div>
	  <div>
        <h3>v3.2.1</h3>
        <p>
          1.添加链接时可选“增强并发”开关(v2.7~v3.1此功能全局开启)<br>
		  2.修复从通知栏退出后再打开总流量不清零问题<br>
		  3.修复部分链接暂停之后再启动没有速度的问题<br>
        </p>
      </div>
      <div>
        <h3>v3.1.0</h3>
        <p>
          修复了部分情况下卡第一屏的问题<br>
        </p>
      </div>
      <div>
        <h3>v3.0.1</h3>
        <p>
          1.通知栏新增开始暂停退出按钮<br>
          2.屏保模式新增电量显示<br>
          再次提示：App可以锁屏运行，不建议使用屏保模式（更耗电）
        </p>
      </div>
      <div>
        <h3>v2.7.1</h3>
        <p>
          1.多线程速度优化<br>
          2.全新的启动动画<br>
          3.缓存首页资源文件，启动更快<br>
        </p>
      </div>
      <div>
        <h3>v2.6</h3>
        <p>
          1.修复了线程数设置错误的问题<br>
          2.修复了运行一段时间后可能闪退的问题<br>
          3.修复了部分模拟器闪退的问题<br>
        </p>
      </div>
      <div>
        <h3>v2.5</h3>
        <p>
          1.省电优化<br>
          2.安装包体积优化<br>
        </p>
      </div>
      <div>
        <h3>v2.4</h3>
        <p>
          1.修复了大量的问题<br>
        </p>
      </div>
      <div>
        <h3>v2.3</h3>
        <p>
          1.新增上传测速功能<br>
            (建议不超过2个线程)<br>
        </p>
      </div>
      <div>
        <h3>v2.2</h3>
        <p>
          1.修复了启动闪白屏的问题<br>
          2.修复了打开后切换深色模式出现logo遮挡问题<br>
          3.修复了暂停可能不及时的问题<br>
          5.切换到okhttp请求库，提高性能与错误处理能力<br>
          6.通知样式调整<br>
          7.更省电<br>
        </p>
      </div>
      <div>
        <h3>v2.1</h3>
        <p>
        1.修复了2.0版本部分链接跑一会儿没速度的问题，修复了一个增加耗电的问题<br> 
        2.核心功能完全由原生Java层接管，省电不发热的同时可以保后台，实测小米6黑屏后台运行12小时不掉<br> 
        3.同步近期网页版更新内容<br> <br> 
        保后台条件:<br> 
        1.通知栏能够正常显示进度信息（如果没有看到通知，去设置检查通知权限）<br> 
        2.加入电池优化白名单（如果没有加入，打开app会弹窗要求加入）<br> 
        如果部分老旧机型打开白屏，请
        <el-link @click="open('https://api.netart.cn/d?b013x2a3i')" type="primary">点此下载</el-link>
        webview内核，并在开发者选项内启用该内核后重试
        </p>
      </div>
    </div>
  </el-dialog>
  <el-dialog style="width: 90%;max-width: 400px;" v-model="aboutVisible" title="关于">
    <div>
      <h2>网络面板</h2>
      <span>作者：<el-link @click='open("https://netart.cn/")' type="primary">Whoami</el-link></span><br>
      <span>QQ：<el-link type="primary" @click="copyText('582424565')">582424565 </el-link></span><br>
      <span>QQ群：<el-link type="primary" @click="copyText('463481772')">463481772 </el-link></span><br>
      <span>开源地址：<el-link @click='open("https://github.com/ljxi/NetworkPanel")' type="primary">NetworkPanel</el-link>&nbsp;
        <el-link @click='open("https://github.com/ljxi/GeoCN")' type="primary">GeoCN</el-link>
      </span><br> 
      <span>特别感谢：</span><br>
      <el-link @click='open("https://edgeone.ai/zh?from=net.netart.cn")' type="primary">Tencent Edgeone</el-link><span>提供免费稳定无限量的CDN服务</span><br>
      <el-link @click='open("https://www.kuocaicdn.com/register?code=8z8urvbg2ffd9")' type="primary">括彩科技</el-link><span>提供免费稳定的CDN服务</span><br>
      <br>
      <span>本项目用到的开源库:</span><br>
      <el-link @click='open("https://github.com/vuejs/core")' type="primary">Vue</el-link>&nbsp
      <el-link @click='open("https://github.com/element-plus/element-plus")' type="primary">ElementPlus</el-link>&nbsp
      <el-link @click='open("https://github.com/apache/echarts")' type="primary">echarts</el-link>&nbsp
      <el-link @click='open("https://github.com/richtr/NoSleep.js")' type="primary">NoSleep.js</el-link>&nbsp
      <el-link @click='open("https://github.com/soerenmartius/vue3-clipboard")' type="primary">vue3-clipboard</el-link>&nbsp
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
import { ref, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { toClipboard } from '@soerenmartius/vue3-clipboard'
var isAndroid = /Android/i.test(navigator.userAgent)
const isVisible = ref(true)
const downLoadAPPTableVisible = ref(false)
if(window.location.hash=='#app')downLoadAPPTableVisible.value=true

const clearHash=()=>{
  history.replaceState(null, document.title,
  window.location.pathname + window.location.search);
}
watch(downLoadAPPTableVisible,(n)=>{
  if(!n){
    clearHash()
  }else{
    window.location.hash='#app'
  }
})

const aboutVisible = ref(false)
const open = (url:string) => {
  window.open(url)
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
.card{
    max-width: 800px;
    height:fit-content;
    display: block;
    margin:0 auto;
    background-color:#ffffff;
    padding:2%;
    border-radius: 20px;
}
.banner{
  margin-top: 15px;
}
.banner > img {
  height: 70px;
  width: calc(100% - 20px);
  margin: 10px;
  border-radius: 20px;
}
.banner > span{
  position: relative;
  display: block;
  left: 15px;
  top: 10px;
  color: transparent;
  font-weight: bolder;
  background-clip: text;
  background-image: linear-gradient(to right,#37CAC6, #3D95F4 80px);

}
@media (prefers-color-scheme: dark) {
  .card {
        background-color:rgb(18,18,18);
    }
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