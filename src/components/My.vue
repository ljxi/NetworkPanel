<script setup lang="ts">
import {ref,watch,onMounted, onUnmounted} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const props = defineProps({
  loginInfo: { type: Object, required: true },
})
const loginStatus=ref(0)
const imgBase64=ref("")


watch(loginStatus,(ns,os)=>{
  if(ns<=0)props.loginInfo.AccessToken=''
})
const api =async(args:object)=>{
  const response = await fetch('https://api.netart.cn/user/', {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(args)
})
const resp=await response.json()
return resp
}
let checkTsk:number=0;
const login=async()=>{
  imgBase64.value=''
  let resp=await api({action:'login',AccessToken:props.loginInfo.AccessToken})
  loginStatus.value=-1
  if(resp.status==0){
    imgBase64.value=resp.img
    sessionStorage.setItem("pt_login_sig", resp["pt_login_sig"]);
    sessionStorage.setItem("qrsig", resp["qrsig"]);
    checkTsk=setInterval(qr_check,1000)
  }
}
const kick_old=async()=>{
  ElMessageBox.confirm(
    '确定要强制下线登录该账号的其他设备吗？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {
      let resp=await api({action:'kick_old',AccessToken:props.loginInfo.AccessToken})
      if(resp.status==0){
        ElMessage({
            type: 'info',
            message: `已经下线其他设备`,
        })
      }
    })
    .catch(() => {})
}
const logOut=async()=>{
  ElMessageBox.confirm(
    '确定从此设备退出登录吗？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      login()
    })
    .catch(() => {})
}
const qr_check=async()=>{
  let resp=await api({action:'qr_check',
                      pt_login_sig:sessionStorage.getItem("pt_login_sig"),
                      qrsig:sessionStorage.getItem("qrsig"),
                    })
  if(resp.status==0){
    loginStatus.value=resp.uin
    props.loginInfo.AccessToken=resp.AccessToken
    clearInterval(checkTsk)
  }else if(resp.status==-2){
    loginStatus.value=-2
  }else if(resp.status==-1){
    loginStatus.value=-1
  }else if(resp.status==-10){
    clearInterval(checkTsk)
    ElMessageBox.alert(`登录失败，${resp.msg}，请重新拉取二维码`, '提示', {
      confirmButtonText: '确定',
      callback: () => {
        login()
      },
    })
  }
}
const getStatus=async()=>{
  let resp=await api({action:'getStatus',AccessToken:props.loginInfo.AccessToken})
  if(resp.status==0){
    loginStatus.value=resp.uin
  }else if(resp.status == -1){
    loginStatus.value=-1
    login()
  }
}
onMounted(() => {
  console.log("M")
  getStatus()
})

onUnmounted(() =>{
  console.log("UM")
  checkTsk?clearInterval(checkTsk):""
  })
</script>

<template>
  <div class="block">
    <div v-loading="!loginStatus" class="card">
      <div v-if="loginStatus==-1 || loginStatus==-2">
        <div v-loading="!imgBase64" style="width: 150px;height: 150px;margin-left: auto;margin-right: auto;">
          <img style="width: 100%;" v-if="imgBase64" :src="imgBase64"/>
        </div>
        <br>
        <span v-if="loginStatus!=-2" style="font-size: 15px;">请使用QQ扫码登录</span>
        <br>
        <span v-if="loginStatus!=-2" style="font-size: 15px;">TIM可以从相册扫码</span>
        <span v-if="loginStatus==-2" style="font-size: 15px;">请确认登录</span>
      </div>
      <div v-if="loginStatus>0">
        <el-avatar :size="100" :src="'https://q.qlogo.cn/headimg_dl?dst_uin='+loginStatus+'&spec=640'" />
        <br>
        <span style="font-size: 20px;">{{loginStatus}}</span>
        <el-divider />
        <el-button class='action' type="warning" @click="kick_old">下线其他设备</el-button>
        <el-button class='action' type="danger" @click="logOut">退出登录</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.block{
  height: fit-content;
}
.card{
  width: fit-content;
  height: fit-content;
  padding: 2%;
  background-color:azure;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50px;
  text-align: center; 
  padding: 5%;
}
.action{
  margin-bottom: 20px;
  width: 100px;
  margin-left: 12px;
  margin-right: 12px;
}
</style>
