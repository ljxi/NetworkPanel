<script setup lang="ts">
import {ref,type Ref,watch,computed,onMounted, onUnmounted} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const props = defineProps({
  loginInfo: { type: Object, required: true },
})
const loginStatus=ref(0)
const imgBase64=ref("")
const bindQQ=ref("")
const thirdQQLoginUrl=ref("")
const nick=ref('')
const showPrev=ref(false)
const showRank=ref(false)
const rankData:Ref<any>=ref({})
let isMounted=false
const openQQ=()=>{
  window.open(thirdQQLoginUrl.value,'_blank')
}
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
const api =async(action:string,args:object)=>{
  const response = await fetch(import.meta.env.VITE_API_URL+action, {
    method: "POST",
    mode: "cors",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(args)
})
const resp=await response.json()
return resp
}
const login=async()=>{
  imgBase64.value=''
  let resp=await api('third_qq_login',{AccessToken:props.loginInfo.AccessToken})
  loginStatus.value=-1
  if(resp.status==0){
    imgBase64.value=resp.img
    thirdQQLoginUrl.value=resp.url
    localStorage.setItem("third_qq_login_session", resp["session"]);
    qr_check()
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
      let resp=await api('kick_old',{AccessToken:props.loginInfo.AccessToken})
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
const bindQQFunc=async()=>{
  let resp=await api('third_qq_bind',{uin:bindQQ.value,session:localStorage.getItem("third_qq_login_session")})
  if(resp.status==0){
    ElMessage.success("绑定成功")
    qr_check()
  }else if(resp.status==-3 || resp.status==-1){
    ElMessageBox.alert(`${resp.msg}`, '提示', {
      confirmButtonText: '确定'
    })
  }else{
    ElMessageBox.alert(`${resp.msg}`, '提示', {
      confirmButtonText: '确定',
      callback: () => {
        login() 
      },
    })
  }
}
const qr_check=async(once:boolean=false):Promise<boolean>=>{
  let resp=await api('third_qq_check',{session:localStorage.getItem("third_qq_login_session")})
  if(resp.status==0){
    loginStatus.value=resp.uin
    props.loginInfo.AccessToken=resp.AccessToken
    localStorage.removeItem("third_qq_login_session");
    getStatus()
    return true
  }else if(resp.status==-1){
    loginStatus.value=-1
    if(isMounted && !once){
      setTimeout(()=>{
        qr_check()
      },1000)
    }else{
        localStorage.removeItem("third_qq_login_session");
    }
  }else if(resp.status==-2){
    loginStatus.value=-2
    return true
  }else{
    localStorage.removeItem("third_qq_login_session");
    ElMessageBox.alert(`登录失败，${resp.msg}，请重新拉取二维码`, '提示', {
      confirmButtonText: '确定',
      callback: () => {
        login() 
      },
    })
  }
  return false;
}
const getStatus=async()=>{
  let resp=await api('get_status',{AccessToken:props.loginInfo.AccessToken})
  if(resp.status==0){
    loginStatus.value=resp.uin
    nick.value=resp.nick
    rankData.value=resp.data
  }else if(resp.status == -1){
    if(localStorage.getItem("third_qq_login_session")){
      let ret=await qr_check(true)
      if(ret)return
    }
    loginStatus.value=-1
    login()
  }
}
onMounted(() => {
  isMounted=true
  getStatus()
})

onUnmounted(()=>{
  isMounted=false
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
      <div v-if="loginStatus==-1"> 
        <span style="font-size: 15px;">请使用QQ扫码登录</span>
        <div v-loading="!imgBase64" style="width: 150px;height: 150px;margin-top: 5px;margin-left: auto;margin-right: auto;">
          <img style="width: 100%;" v-if="imgBase64" :src="imgBase64"/>
        </div>
        <br>
        <el-button class='action warn' type="warning" @click="openQQ">一键跳转登录</el-button>
      </div>
      <div v-if="loginStatus==-2"> 
        <span style="font-size: 15px;">请输入刚刚用于授权的QQ号码</span>
        <el-input v-model="bindQQ" placeholder="请输入QQ号" style="margin-top: 5px;margin-left: auto;margin-right: auto;" />
        <br>
        <br>
        <el-button class='action warn' type="warning" @click="bindQQFunc">点击验证</el-button><br>
        <span style="font-size: 10px;">QQ号码将用于排行榜展示</span>
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
