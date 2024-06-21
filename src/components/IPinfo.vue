<template>
    <div class="radius card" :style="{ borderRadius: `var(--el-border-radius-round)` }">
        <div style="text-align: center;">
            <transition name="el-fade-in">
                <div v-if="ipInfo.local && ipInfo.local.country && ipInfo.local.country.code == 'CN'">
                    <el-tooltip class="item" effect="dark" :content="ipInfo.local.ip" placement="top">
                        <div @click="copy(ipInfo.local.ip)">
                            <el-tag style="width: 50px;" class="ml-2" type="success">{{
                                ipInfo.layLocal?ipInfo.layLocal+"ms":"-ms" }}</el-tag>
                            <el-text style="cursor: pointer;margin-left: 5px;white-space:nowrap;vertical-align: -1px;"
                                class="font-background">{{ ipInfo.local.show.join(" ") }}</el-text>
                        </div>
                    </el-tooltip>
                </div>
            </transition>
            <transition name="el-fade-in">
                <div v-if="ipInfo.cloudflare && ipInfo.cloudflare.country && ipInfo.cloudflare.country.code != 'CN'">
                    <el-tooltip class="item" effect="dark" :content="ipInfo.cloudflare.ip" placement="top">
                        <div @click="copy(ipInfo.cloudflare.ip)">
                            <el-tag style="width: 50px;" class="ml-2" type="success">{{
                                ipInfo.layCloudflare?ipInfo.layCloudflare+"ms":"-ms" }}</el-tag>
                            <el-text style="cursor: pointer;margin-left: 5px;white-space:nowrap;vertical-align: -1px;"
                                class="font-background">{{ ipInfo.cloudflare.show.join(" ") }}</el-text>
                        </div>
                    </el-tooltip>
                </div>
            </transition>
            <transition name="el-fade-in">
                <div v-if="!ipInfo.local && !ipInfo.cloudflare" v-loading="true">
                    <el-tooltip class="item" effect="dark" content="" placement="top">
                        <div>
                            <el-text style="cursor: pointer;margin-left: 5px;white-space:nowrap;vertical-align: -1px;"
                                class="font-background">正在加载...</el-text>
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
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { toClipboard } from '@soerenmartius/vue3-clipboard'
const ipInfo: {local:any, cloudflare:any,layLocal:any,layCloudflare:any} = reactive({local:null, cloudflare:null,layLocal:null,layCloudflare:null})
const copy = (ip: string) => {
    toClipboard(ip)
    ElMessage.success({
        dangerouslyUseHTMLString: true,
        message: `已经复制IP地址：<br><strong>${ip}</strong>`,
    })
}

async function queryIp(ip: string) {
    const rsp = await fetch(import.meta.env.VITE_API_URL + "ip.ajax?ip=" + ip, {
        method: "GET",
        mode: "cors",
        redirect: "follow",
        referrerPolicy: "no-referrer"
    });
    let resp = await rsp.json();
    return resp['data']
}

let failure = false
async function cachedQuery(ip: string) {
    let ret = JSON.parse(localStorage.getItem("cache_ip_"+ip) || "{}")
    if (!ret.ip || new Date().getTime() / 1000 - ret.time > 60 * 60 * 24){
    try {
        if(failure) throw ""
        ret = await queryIp(ip)
    } catch (error) {
        failure = true
        throw "查询IP信息失败"
    }
        ret['time'] = new Date().getTime() / 1000
        localStorage.setItem("cache_ip_"+ip, JSON.stringify(ret))
    }
    return ret
}

async function handleIP(ip: string) {
    const info = await cachedQuery(ip)
    info.show = info.regions_short || info.regions || []
    if (info.country && info.country.code != "CN") {
        info.show = [info.country.name, ...info.show]
    }
    if (info.as) {
        info.show.push(info.as.info || info.as.name)
    }
    if (info.type) {
        info.show.push(info.type)
    }
    return info
}

(async function watchLocalIp() {
    if (props.isVisible) {
        try {
            const response = await fetch('https://pubstatic.b0.upaiyun.com/?_upnode', { referrerPolicy: 'no-referrer' });
            let resp = await response.json();
            ipInfo.local = await handleIP(resp['remote_addr'])
        } catch (error) {
            console.log(error)
        }
    }
    setTimeout(watchLocalIp, 5000)
})();

const watchCloudflare = async(host: string) => {
    if (props.isVisible) {
        try {
            var start_timestamp = new Date().getTime();
            const response = await fetch(`https://${host}/cdn-cgi/trace`, { referrerPolicy: 'no-referrer' });
            const lay = new Date().getTime() - start_timestamp;
            let resp = await response.text();
            let ip = resp.match(/ip=([0-9a-f.:]+)/);
            if (ip) {
                ipInfo.cloudflare = await handleIP(ip[1])
                ipInfo.layCloudflare = lay
            }
        } catch (error) {
            console.log(error)
        }
    }
    setTimeout(watchCloudflare, 1000, host)
}

watchCloudflare("ipv4.ip.sb")
// watchCloudflare("chat.openai.com")

;(async function getCNLay() {
    if (props.isVisible) {
        try {
            var start_timestamp = new Date().getTime();
            await fetch("https://connectivitycheck.platform.hicloud.com/generate_204",
            { method: "HEAD", cache: "no-store", mode: 'no-cors', referrerPolicy: 'no-referrer' });
            ipInfo.layLocal = new Date().getTime() - start_timestamp
        } catch (error) {
            ipInfo.layLocal = 0
        }
    }
    setTimeout(getCNLay, 1000)
})();
</script>

<style scoped>
.font-background {
    color: #344357;
    font-size: 14px;
}

.card {
    max-width: 800px;
    height: fit-content;
    display: block;
    margin: 0 auto;
    background-color: #ffffff;
    padding: 2%
}

@media (prefers-color-scheme: dark) {
    .card {
        background-color: rgb(18, 18, 18);
    }

    .font-background {
        color: rgb(193, 206, 230);
    }
}
</style>