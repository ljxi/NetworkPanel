<script setup lang="ts">
import {ref,type Ref,watch,computed,onMounted, onUnmounted} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const props = defineProps({
  loginInfo: { type: Object, required: true },
})
const loginStatus=ref(0)
const imgBase64=ref("")
const nick=ref('')
const showPrev=ref(false)
const showRank=ref(false)
const rankData:Ref<any>=ref({})
  
const desMap=[["本小时","今天","本月","今年"],["上小时","昨天","上月","去年"]]
const tableData=computed(()=>{
  let ret:any=[]
  let index=0;
  let j=showPrev.value?"prev":"now";
  ([3,2,1,0]).forEach((i:number)=>{
    if(showRank.value){
      ret.push({
        des:desMap[showPrev.value?1:0][index],
        allUsed: rankData.value[j][i]["allUsed"][0] || 0,
        averageSpeed: rankData.value[j][i]["averageSpeed"][0] || 0,
        onlineTime: rankData.value[j][i]["onlineTime"][0] || 0,
      })
    }else{
      ret.push({
        des:desMap[showPrev.value?1:0][index],
        allUsed: formatter(rankData.value[j][i]["allUsed"][1] || 0,0),
        averageSpeed: formatter(rankData.value[j][i]["averageSpeed"][1]*8 || 0,1),
        onlineTime: timeformatter(rankData.value[j][i]["onlineTime"][1] || 0),
      })
    }
    index++; 
  })
  return ret;
})

watch(loginStatus,(ns,os)=>{
  if(ns<=0)props.loginInfo.AccessToken=''
})
const api =async(args:object)=>{
  const response = await fetch('//app.ljxnet.cn/network-panel/', {
    method: "POST",
    mode: "cors",
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
    getStatus()
  }else if(resp.status==-2){
    loginStatus.value=-2
  }else if(resp.status==-1){
    loginStatus.value=-1
  }else if(resp.status==-10){
    clearInterval(checkTsk)
    ElMessageBox.alert(`登录失败，${resp.msg}请重新拉取二维码`, '提示', {
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
    nick.value=resp.nick
    rankData.value=resp.data
  }else if(resp.status == -1){
    loginStatus.value=-1
    login()
  }
}
onMounted(() => {
  getStatus()
})

onUnmounted(() =>{
  checkTsk?clearInterval(checkTsk):""
})

function formatter(num: number, desIndex: number) {
  const flo = [0, 0, 0, 1, 1, 1]
  const describeString = [['B', 'KB', 'MB', 'GB', 'TB', 'PB'],
  ['Bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps', 'Pbps']
  ]
  const describe = describeString[desIndex]
  var cnum = num;
  var total_index = 0;
  while (cnum >= 1024) {
    if (total_index == describe.length - 1) break;
    cnum = cnum / 1024;
    total_index++;
  }
  return cnum.toFixed(flo[total_index]) + describe[total_index];
}
const timeformatter=(n:number)=>{
  if(n<60)return n.toFixed(0)+'秒'
  n/=60
  if(n<60)return n.toFixed(0)+'分钟'
  n/=60
  if(n<24)return n.toFixed(0)+'小时'
  n/=24
  return n.toFixed(0)+'天'
}
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
        <span style="font-size: 20px;">{{nick}}</span>
        <br>
        <el-checkbox v-model="showPrev" label="上个统计周期" size="small"/>
        <el-checkbox v-model="showRank" label="显示排名" size="small"/>
        <el-table :table-layout="'auto'" :data="tableData" :border="true" style="width: 100%">
          <el-table-column prop="des" label=""/>
          <el-table-column prop="allUsed" label="总流量"/>
          <el-table-column prop="averageSpeed" label="平均速度"/>
          <el-table-column prop="onlineTime" label="在线时长" />
        </el-table>
        <br>
        <el-button class='action warn' type="warning" @click="kick_old">下线其他设备</el-button>
        <el-button class='action danger' type="danger" @click="logOut">退出登录</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.block{
  height: fit-content;
}
.card{
  width: 95%;
  height: fit-content;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50px;
  text-align: center;
}

.action{
  margin-bottom: 20px;
  width: 100px;
  margin-left: 12px;
  margin-right: 12px;
  border-radius: 10px;
  background-color: unset;
  font-weight: 900;
}

.action.warn{
  color: #1ee0ac;
  border-color: #1ee0ac;
}
.action.warn:hover{
  color: white;
  background-color: #1ee0ac;
}
.action.danger{
  color: #e85347;
  border-color: #e85347;
}
.action.danger:hover{
  color: white;
  background-color: #e85347;
}
@media (prefers-color-scheme: dark) {
    .card {
        background-color:#141414;
    }
    .action{
      color: rgb(255, 255, 255);
    }
}

</style>
