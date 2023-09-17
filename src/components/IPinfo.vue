<template>
    <div  class="radius"
          :style="{borderRadius:`var(--el-border-radius-round)`}"
          style="max-width: 800px;height:fit-content;display: block;margin:0 auto;background-color:#ffffff;padding:2%">
        <div style="text-align: center;" v-loading="!(info.globalInfo || info.localInfo || info.globalLay || info.localLay)">
            <el-tooltip class="item" effect="dark" :content="info.localInfo?info.localInfo['ip']:'Loading...'" placement="top">
                <div>
                    <el-tag style="width: 50px;" class="ml-2" type="success">{{ info.localLay?info.localLay+"ms":"-ms" }}</el-tag>
                    <el-text style="white-space:nowrap;vertical-align: -1px;" class="font-background">{{ info.localInfo?info.localInfo['province'] + ' ' + info.localInfo['city'] + ' ' + info.localInfo['distinct'] + ' ' + info.localInfo['isp']:"Loading..." }}</el-text>
                </div>
            </el-tooltip>
            <transition name="el-fade-in">
                <div v-loading="!info.globalInfo" v-if="info.localInfo&&!(info.globalInfo && info.localInfo['ip']==info.globalInfo['ip'])" >
                    <el-tooltip class="item" effect="dark" :content="info.globalInfo?info.globalInfo['ip']:'Loading...'" placement="top">
                        <div>
                            <el-tag style="width: 50px;" class="ml-2" type="success">{{ info.globalLay?info.globalLay+"ms":"-ms" }}</el-tag>
                            <el-text style="white-space:nowrap;vertical-align: -3px;" class="font-background">{{ info.globalInfo?CountryCode[info.globalInfo['country_code']]:"" }}</el-text>
                            <el-text style="white-space:nowrap;vertical-align: -3px;" class="font-background">{{ info.globalInfo?info.globalInfo['isp']:"" }}</el-text>
                        </div>
                    </el-tooltip>
                </div>
            </transition>

        </div>
    </div>
</template>
  
<script lang="ts" setup>
const props = defineProps({
    isVisible: Boolean
})
import CountryCode from "../assets/CountryCode.json"
import { ref } from 'vue'
const info=ref({
    localInfo:null,
    globalInfo:null,
    localLay:0,
    globalLay:0,
})
  
async function get_ip(url:string,type:"localInfo"|'globalInfo') {
    if(props.isVisible){
        try {
            const response = await  fetch(url, { referrerPolicy: 'no-referrer' });
            const responseJson = await response.json();
            info.value[type]=responseJson
        } catch (error) {
            info.value[type]=null
        }
    }
    setTimeout(get_ip, info.value[type]?5000:1000,url,type)
}
get_ip('https://forge.speedtest.cn/api/location/info','localInfo')
get_ip('https://api-ipv4.ip.sb/geoip','globalInfo')

async function get_lay(url:string,type:'localLay'|'globalLay') {
    if(props.isVisible){
        try {
            var start_timestamp = new Date().getTime();
            await fetch(url,  { method: "HEAD", cache: "no-store", mode: 'no-cors', referrerPolicy: 'no-referrer' });
            info.value[type] = new Date().getTime() - start_timestamp;
        } catch (error) {
            info.value[type]=0
        }
    }
    setTimeout(get_lay, 1000,url,type)
}
get_lay('https://connectivitycheck.platform.hicloud.com/generate_204','localLay')
get_lay('https://cp.cloudflare.com/','globalLay')
</script>
  
<style>
.font-background{
  color: #344357;
  font-size: 14px;
}
</style>