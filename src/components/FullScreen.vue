<template>
    <div ref="elment" v-if="modelValue" class="fullscreen"
        @click="() => emit('update:modelValue', false)"
        @wheel="(e) => e.preventDefault()"
        @touchmove="(e) => e.preventDefault()"
        >
        <div class="content">
            <div class="left">
                <div class="title">
                    <span>NetworkPanel</span><br>
                </div>
                <div class="time">
                    <span>{{ time }}</span>
                </div>
                <div class="date">
                    <span>{{ date }}</span>
                </div>
                <div class="device">
                    <span class="version">v{{ versionName }}</span>
                    <div class="wifi" v-if="isWIFI">
                        <svg t="1705582617143" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4300" width="200" height="200"><path d="M0 352.832l93.12 98.752c231.296-245.44 606.464-245.44 837.76 0L1024 352.832C741.44 53.056 283.008 53.056 0 352.832z m372.352 395.008L512 896l139.648-148.16c-76.8-81.92-202.048-81.92-279.296 0zM186.24 550.4l93.12 98.752c128.448-136.32 336.96-136.32 465.408 0L837.824 550.4c-179.648-190.592-471.488-190.592-651.648 0z" fill="#ffffff" p-id="4301"></path></svg>
                    </div>
                    <div class="bettery">
                        <svg v-if="isCharging" t="1705657148009" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4377" width="200" height="200"><path d="M512 469.333333V213.333333l-213.333333 341.333334h128v256l213.333333-341.333334h-128zM128 213.333333h682.666667a42.666667 42.666667 0 0 1 42.666666 42.666667v512a42.666667 42.666667 0 0 1-42.666666 42.666667H128a42.666667 42.666667 0 0 1-42.666667-42.666667V256a42.666667 42.666667 0 0 1 42.666667-42.666667z m768 170.666667h85.333333v256h-85.333333V384z" fill="#ffffff" p-id="4378"></path></svg>
                        <svg v-if="!isCharging" t="1705656989588" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4221" width="200" height="200"><path d="M128 213.333333h682.666667a42.666667 42.666667 0 0 1 42.666666 42.666667v512a42.666667 42.666667 0 0 1-42.666666 42.666667H128a42.666667 42.666667 0 0 1-42.666667-42.666667V256a42.666667 42.666667 0 0 1 42.666667-42.666667z m768 170.666667h85.333333v256h-85.333333V384z" fill="#ffffff" p-id="4222"></path></svg>
                        <span>{{systemBattery}}%</span>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="state">
                    <span class="des">总流量</span><br>
                    <span class="value">{{ state.show.allUsed }}</span><br><br>
                    <span class="des">{{ isRunning?"实时速度":"平均速度" }}</span><br>
                    <span class="value">{{ state.show.speed }}</span><br><br>
                    <span class="des">{{ isRunning?"实时带宽":"平均带宽" }}</span><br>
                    <span class="value">{{ state.show.speedBit }}</span><br><br>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref,watch,onMounted, defineModel, watchEffect, onUnmounted} from 'vue'
const versionName = ref('')
const systemBattery = ref(100)
const isWIFI = ref(false)
const isCharging = ref(false)
const props=defineProps({
  state: { type: Object, required: true },
  isRunning: { type: Boolean, required: true },
  modelValue: { type: Boolean, required: true },
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: Boolean): void
}>()
onMounted(()=>{
    versionName.value=window.mjs.getAppVersionName()
})
const elment=ref()
document.addEventListener("fullscreenchange", function (e) {
  if (document.fullscreenElement) {
    emit('update:modelValue', true)
  } else {
    emit('update:modelValue', false)
  }
})
watchEffect(
  async() => {
    if(props.modelValue){
        if(!elment.value)return
        if(elment.value.requestFullscreen)
            elment.value.requestFullscreen()
        else if(elment.value.webkitRequestFullscreen)
            elment.value.webkitRequestFullscreen()
        else if(elment.value.mozRequestFullscreen)
            elment.value.mozRequestFullscreen()
        else if(elment.value.msRequestFullscreen)
            elment.value.msRequestFullscreen()
    }
  }
)
const time=ref("")
const date=ref("")
const dayToWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
let task:number=0
onMounted(()=>{
    task=setInterval(()=>{
        const datetime=new Date()
        time.value=`${datetime.getHours().toString().padStart(2, '0')}:${datetime.getMinutes().toString().padStart(2, '0')}`
        date.value=`${datetime.getFullYear()}-${datetime.getMonth()+1}-${datetime.getDate()} ${dayToWeek[datetime.getDay()]}`
        const bettery=window.mjs.getSystemBattery()
        if(bettery>=0){
            isCharging.value=true
            systemBattery.value=bettery
        }else{
            isCharging.value=false
            systemBattery.value=0-bettery
        }
        
        isWIFI.value=window.mjs.checkIsWIFI()
    },1000)
})
onUnmounted(()=>{
    clearInterval(task)
})
</script>
<style scoped>
@font-face {
	font-family: 'DingTalk';
	src: url('../assets/DingTalk-simple.ttf') format('truetype');
}
.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    z-index: 9999999999;
    text-align: center;
}
.title {
    margin-top: 3vh;
    font-size: 25px;
}
.right {
    margin-top: 20px;
}
@media screen and (min-width: 500px) {
    .content{
        column-count: 2;
    }
    .left {
        height: 200px;

    }
    .right {
        margin-top: -6vh;
        height: 200px;
    }
}
.version {
    font-size: 15px;
    margin-right: 10px;
}
.date {
    margin-top: -5px;
    font-size: 20px;
}
.time {
    margin-top: -2px;
    font-size: 60px;
}
.state > .des {
    font-size: 15px;
    font-weight: 900;
}
.state > .value {
    font-size: 20px;
}
.device{
    margin-top: 1px;
}
.wifi{
    display: inline;
    width: fit-content;
    height: fit-content;
    margin-right: 1px;
    vertical-align: -2px;
}
.wifi > svg{
    width: 15px;
    height: 15px;
    vertical-align: -1px;
}
.bettery{
    display: inline;
    width: fit-content;
    height: fit-content;
    vertical-align: -3px;
    margin-left: 3px;
}
.bettery > svg{
    width: 18px;
    height: 18px;
    vertical-align: -2px;
}
.bettery >span {
    font-size: 15px;
    vertical-align: 2px;
    margin-left: 2px;
}
.content{
    position: absolute; 
    width: 99%;
    max-width: 600px;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);
    animation:standby 60s infinite alternate ease-in-out;
    font-family: DingTalk;
}
@keyframes standby {
    0% {
        top: 50%;
        left: 50%;
    }
    49% {
        top: 50%;
        left: 50%;
    }
    51% {
        top: 55%;
        left: 51%;
    }
    100% {
        top: 55%;
        left: 51%;
    }
}
</style>