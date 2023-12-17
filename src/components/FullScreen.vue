<template>
    <div ref="elment" v-if="modelValue" class="fullscreen"
        @click="() => emit('update:modelValue', false)">
        <div class="content">
            <div class="title">
                <span>
                    NetworkPanel
                </span>
            </div>
            <div class="date">
                <span>
                    {{ date }}
                </span>
            </div>
            <div class="time">
                <span>
                    {{ time }}
                </span>
            </div>
            <div class="status">
                <span>
                    {{ isRunning?"RUNNING":"STOPPED" }}
                </span>
            </div>
            <div class="state">
                <span>
                    ALL: {{ state.show.allUsed }}
                    <br>
                    SPEED: {{ state.show.speed }}
                    <br>
                    INBAND: {{ state.show.speedBit }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref,watch,onMounted, defineModel, watchEffect, computed} from 'vue'
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
let noSleep = new NoSleep();
watchEffect(
  async() => {
    if(props.modelValue){
        elment.value?.requestFullscreen()
        noSleep.enable();
    }else{
        noSleep.disable();
    }
  }
)
const time=ref("")
const date=ref("")
setInterval(()=>{
    time.value=new Date().toLocaleTimeString()
    date.value=new Date().toLocaleDateString()
},1000)
const contentTop=ref(30);
const contentTopStyle=computed(()=>`${contentTop.value}%`);
let direction=0
setInterval(()=>{
    if(direction)contentTop.value-=0.05
    else contentTop.value+=0.05
    if(contentTop.value>=70||contentTop.value<=30)direction^=1
},16)
</script>
<style scoped>
.fullscreen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0);
    z-index: 9999999999;
    text-align: center;
    font-family: 'Courier New', Courier, monospace;
}
.title {
    margin-top: 3vh;
    font-size: 40px;
}
.date {
    font-size: 30px;
    margin-top: 3vh;
}
.time {
    font-size: 30px;
}
.status {
    font-size: 30px;
    margin-top: 4vh;
}
.state {
    font-size: 30px;
}
.content{
    position: absolute;
    left: 50%;
    top: v-bind('contentTopStyle');
    transform: translate(-50%, -50%);
}
</style>