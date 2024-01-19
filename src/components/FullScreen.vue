<template>
    <div ref="elment" v-if="modelValue" class="fullscreen"
        @click="() => emit('update:modelValue', false)"
        @wheel="(e) => e.preventDefault()"
        @touchmove="(e) => e.preventDefault()"
        >
        <div class="content">
            <div class="left">
                <div class="title">
                    <span>NetworkPanel</span>
                </div>
                <div class="time">
                    <span>{{ time }}</span>
                </div>
                <div class="date">
                    <span>{{ date }}</span>
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
import NoSleep from 'nosleep.js';
const props=defineProps({
  state: { type: Object, required: true },
  isRunning: { type: Boolean, required: true },
  modelValue: { type: Boolean, required: true },
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: Boolean): void
}>()

const elment=ref()
document.addEventListener("fullscreenchange", function (e) {
  if (document.fullscreenElement) {
    emit('update:modelValue', true)
  } else {
    emit('update:modelValue', false)
  }
})
const isMiuiBrowser = /MiuiBrowser/i.test(navigator.userAgent)
let noSleep = isMiuiBrowser?null:new NoSleep();
watchEffect(
  async() => {
    if(props.modelValue){
        noSleep?.enable();
        if(!elment.value)return
        if(elment.value.requestFullscreen)
            elment.value.requestFullscreen()
        else if(elment.value.webkitRequestFullscreen)
            elment.value.webkitRequestFullscreen()
        else if(elment.value.mozRequestFullscreen)
            elment.value.mozRequestFullscreen()
        else if(elment.value.msRequestFullscreen)
            elment.value.msRequestFullscreen()
    }else{
        noSleep?.disable();
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
    font-size: 30px;
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
        margin-top: -1vh;
        height: 200px;
    }
}

.date {
    margin-top: -5px;
    font-size: 20px;
}
.time {
    font-size: 60px;
}
.state > .des {
    font-size: 15px;
    font-weight: 900;
}
.state > .value {
    font-size: 20px;
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