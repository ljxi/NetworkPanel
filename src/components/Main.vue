<template>
  <div class="radius" :style="{ borderRadius: 'var(--el-border-radius-round)' }"
    style="max-width: 800px;height:fit-content;display: block;margin:0 auto;background-color:#ffffff;padding:2%">
    <div style="margin-top: 10px;margin-left: 10px;margin-right: 10px;">
      <div class="slider-demo-block">
        <span class="font-background">测试地址：</span>
        <el-button type="primary" :icon="Edit" link @click="EditTableVisible = true" />
        <br>
        <el-select style="width: 100%;" v-model="url">
          <el-option-group v-for="group in nodes" :key="group.label" :label="group.label">
            <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
          </el-option-group>
        </el-select>
      </div>
      <div class="slider-demo-block" style="margin-top:20px;">
        <span class="font-background">线程数：{{ threadNum }}</span>
        <el-slider :show-tooltip="false" :min="1" :max='64' v-model="threadNum" />
      </div>
      <el-switch v-model="runBackground" active-text="保持后台运行" />
      <br>
      <div class="ItemContainer">
        <div class="showItem">
          <span class="font-background" style="font-size: larger;">总流量</span>
          <el-text size="small" class="mx-1">{{ state.maxUse ? '/' + formatter(state.maxUse, ['B', 'KB',
            'MB', 'GB', 'TB', 'PB'], [0, 0, 0, 0, 0, 0]) : "" }}</el-text>
          <el-button type="primary" style="height: 15px;" :icon="Edit" link @click="EditMaxVisible = true" />
          <div class="state-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-15 w-15 float-right pt-3">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
            </svg>
          </div>
          <el-text class="font-data">{{ state.show.allUsed }}</el-text>
        </div>
        <div class="showItem">
          <span class="font-background" style="font-size: larger;">{{ isRuning ? '实时速度' : '平均速度' }}</span>
          <div class="state-icon" style="color: rgb(9,194,222);">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-15 w-15 float-right pt-3">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16.469,8.924l-2.414,2.413c-0.156,0.156-0.408,0.156-0.564,0c-0.156-0.155-0.156-0.408,0-0.563l2.414-2.414c1.175-1.175,1.175-3.087,0-4.262c-0.57-0.569-1.326-0.883-2.132-0.883s-1.562,0.313-2.132,0.883L9.227,6.511c-1.175,1.175-1.175,3.087,0,4.263c0.288,0.288,0.624,0.511,0.997,0.662c0.204,0.083,0.303,0.315,0.22,0.52c-0.171,0.422-0.643,0.17-0.52,0.22c-0.473-0.191-0.898-0.474-1.262-0.838c-1.487-1.485-1.487-3.904,0-5.391l2.414-2.413c0.72-0.72,1.678-1.117,2.696-1.117s1.976,0.396,2.696,1.117C17.955,5.02,17.955,7.438,16.469,8.924 M10.076,7.825c-0.205-0.083-0.437,0.016-0.52,0.22c-0.083,0.205,0.016,0.437,0.22,0.52c0.374,0.151,0.709,0.374,0.997,0.662c1.176,1.176,1.176,3.088,0,4.263l-2.414,2.413c-0.569,0.569-1.326,0.883-2.131,0.883s-1.562-0.313-2.132-0.883c-1.175-1.175-1.175-3.087,0-4.262L6.51,9.227c0.156-0.155,0.156-0.408,0-0.564c-0.156-0.156-0.408-0.156-0.564,0l-2.414,2.414c-1.487,1.485-1.487,3.904,0,5.391c0.72,0.72,1.678,1.116,2.696,1.116s1.976-0.396,2.696-1.116l2.414-2.413c1.487-1.486,1.487-3.905,0-5.392C10.974,8.298,10.55,8.017,10.076,7.825"></path>
            </svg>
          </div>
          <el-text   class="font-data" style="color: rgb(9,194,222);" >{{ state.show.speed }}</el-text>
        </div>
        <div class="showItem">
          <span class="font-background" style="font-size: larger;">带宽</span>
          <div class="state-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-15 w-15 float-right pt-3">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <el-text class="font-data">{{ state.show.speedBit }}</el-text>
        </div>
      </div>

      <div style="width: fit-content;display: block;margin-top:2ch;margin-left: auto;margin-right: auto;">
        <a class="button" v-if="!isRuning" @click="isRuning = true">
            <svg t="1694957757562" fill="white" style="width: 50px;margin-left: 10px;margin-top: -30px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4036" width="200" height="200"><path d="M823.8 603.5l-501.2 336c-50.7 34-119.3 20.4-153.2-30.2-12.2-18.2-18.7-39.6-18.7-61.5v-672c0-61 49.5-110.4 110.4-110.4 21.9 0 43.3 6.5 61.5 18.7l501.1 336c50.7 34 64.2 102.6 30.2 153.2-7.8 11.9-18.1 22.2-30.1 30.2z m0 0" p-id="4037"></path></svg>
        </a>
        <a class="button" v-if="isRuning" @click="isRuning = false" circle>
          <svg t="1694958268344" fill="white" style="width: 80px;margin-top: -30px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7667" width="200" height="200"><path d="M352 768c-17.664 0-32-14.304-32-32V288c0-17.664 14.336-32 32-32s32 14.336 32 32v448c0 17.696-14.336 32-32 32zM672 768c-17.696 0-32-14.304-32-32V288c0-17.664 14.304-32 32-32s32 14.336 32 32v448c0 17.696-14.304 32-32 32z" p-id="7668"></path></svg>
        </a>
      </div>
    </div>
  </div>

  <el-dialog style="min-width: 350px;max-width: 800px;" v-model="EditTableVisible" title="自定义地址">
    <el-table v-if="customNodes.length" :data="customNodes" style="width: 100%" max-height="300">
      <el-table-column prop="label" label="名称" width="100" />
      <el-table-column prop="value" label="URL" />
      <el-table-column fixed="right" label="" width="50">
        <template #default="scope">
          <el-button type="danger" link :icon="Delete" @click.prevent="customNodes.splice(scope.$index, 1)" />
        </template>
      </el-table-column>
    </el-table>
    <el-button class="mt-4" style="width: 100%" @click="addTableVisible = true;">添加地址</el-button>
  </el-dialog>

  <el-dialog style="min-width: 350px;max-width: 800px;" v-model="addTableVisible" title="添加链接">
    <el-form :model="addForm">
      <el-form-item label="名称:" label-width='50px'>
        <el-input v-model="addForm.label" autocomplete="off" />
      </el-form-item>
      <el-form-item label="url:" label-width='50px'>
        <el-input v-model="addForm.value" autocomplete="off">
          <template #suffix>
            <el-icon v-if="urlParser(addForm.value)">
              <CircleCheck />
            </el-icon>
          </template>>
        </el-input>
      </el-form-item>
    </el-form>
    <el-alert
    title="注意："
    type="warning">
    在浏览器工作的程序受到浏览器安全策略的限制
    <br>
    以下情况你将无法正常使用链接
    <br>
    1.你使用https协议打开的本站，但是url是http协议
    <br>
    2.目标服务器返回的Access-Control-Allow-Origin响应头没有允许本站
    <br>
    具体细节请在报错后查看控制台
  </el-alert>
  <el-alert
    title="免责声明"
    type="error">
    本站仅供网络质量测试，请勿测试载有重要业务的链接，滥用造成的损失由用户承担
    <br>
    如果本站对您的服务器有负面影响，请将本站域名纳入跨域黑名单
  </el-alert>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addTableVisible = false">取消</el-button>
        <el-button type="primary"
          :disabled="!urlParser(addForm.value) || !addForm.label || addForm.checking"
          @click="addNode()">确认
          <el-icon v-if="addForm.checking" class="is-loading">
            <Loading />
          </el-icon>
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog style="min-width: 350px;max-width: 800px;" v-model="EditMaxVisible" title="设置上限自动停止">
    <el-form>
      <div class="mt-4">
        <el-input type="number" min='1' v-model="maxUseInput.num" autocomplete="off" placeholder="留空则无上限"
          class="input-with-select">
          <template #append>
            <el-select v-model="maxUseInput.type" placeholder="Select" style="width: 65px">
              <el-option label="MB" value="MB" />
              <el-option label="GB" value="GB" />
              <el-option label="TB" value="TB" />
            </el-select>
          </template>
        </el-input>
      </div>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="EditMaxVisible = false">取消</el-button>
        <el-button type="primary" @click="editMaxUse()">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <audio v-if="isMobile && runBackground" @canplay="()=>{if(isRuning)audioDom.play()}" @pause="()=>{if(runBackground)isRuning=false}"  @play="isRuning=true" controls loop ref="audioDom" style="display:none">
    <source src="/audio.mp3" type="audio/mpeg">
  </audio>
</template>

<script lang="ts" setup>
const props = defineProps({
  isVisible: Boolean
})
import { ElMessage } from 'element-plus'
import nodesJson from "../assets/nodes.json"
import { Edit, Delete, CircleCheck, Loading } from '@element-plus/icons-vue'
import { ref, watch, type Ref ,reactive} from 'vue'
const customNodes: Ref<{
  value: string;
  label: string;
}[]> = ref(localStorage.customNodes ? JSON.parse(localStorage.customNodes) : [])
const OnlineNodes: {
  label: string;
  options: {
    value: string;
    label: string;
  }[];
}[] = nodesJson
const nodes: Ref<{
  label: string;
  options: {
    value: string;
    label: string;
  }[];
}[]> = ref(OnlineNodes)
if (customNodes.value.length) {
  nodes.value = [{ "label": "自定义", "options": customNodes.value }].concat(OnlineNodes)
}
watch(customNodes, async (newState, oldState) => {
  if (customNodes.value.length) {
    nodes.value = [{ "label": "自定义", "options": customNodes.value }].concat(OnlineNodes)
  } else nodes.value = OnlineNodes
  localStorage.customNodes = JSON.stringify(newState)
}, { deep: true })

const state = reactive({
  show: {
    allUsed: '-',
    speed: '-',
    speedBit: '-'
  },
  bytesUsed: 0,
  recordUse: 0,
  recordTime: 0,
  startUse: 0,
  startTime: 0,
  maxUse: localStorage.maxUse ? Number(localStorage.maxUse) : 0,
})
const isRuning = ref(false)

const threadNum = ref(localStorage.threadNum ? Number(localStorage.threadNum) : 8)
const runBackground = ref(localStorage.runBackground ? localStorage.runBackground === 'true' : false)
const url = ref(localStorage.url ? localStorage.url : nodes.value[0].options[0].value)

var tasks: Array<number> = []
watch(isRuning, async (newState, oldState) => {
  if (newState == true) {
    state.startUse = state.bytesUsed
    state.startTime = new Date().getTime() / 1000;
    state.recordUse = state.bytesUsed
    state.recordTime = new Date().getTime() / 1000;
    for (let i = 0; i < threadNum.value; i++)start_thread(i)
    tasks.push(setInterval(frameEvent, 16))
    secEvent()
    tasks.push(setInterval(secEvent, 1000))
    runBackground.value?audioDom.value?.play():''
  } else {
    tasks.map((i) => clearInterval(i))
    audioDom.value?.pause()
    var speed = (state.bytesUsed - state.startUse) / (new Date().getTime() / 1000 - state.startTime)
    setSpeed(speed)
    if (state.maxUse && state.bytesUsed >= state.maxUse) {
      state.bytesUsed=0
      if(!props.isVisible){
        setTitle('任务完成')
      }
    }else{
      if(!props.isVisible){
        setTitle('已暂停')
      }
    }
  }
})

watch(props, async (newState, oldState) => {
  if(!newState.isVisible && runBackground.value && isRuning.value)secEvent()
  if(!newState.isVisible && !runBackground.value && isRuning.value)isRuning.value = false
  if(newState.isVisible == true)setTitle("网络面板")
})

watch(threadNum, async (newState, oldState) => {
  localStorage.threadNum = newState
  if (isRuning.value && newState > oldState) {
    for (let i = oldState; i < newState; i++)start_thread(i)
  }
})
watch(runBackground, async (newState, oldState) => {
  localStorage.runBackground = newState
})
watch(url, async (newState, oldState) => {
  localStorage.url = newState
})

var setTitle=(title:string)=>{
  document.title = title
}
var setUsed=()=>{
  if (!state.bytesUsed) state.show.allUsed='-'
  state.show.allUsed = formatter(state.bytesUsed, ['B', 'KB', 'MB', 'GB', 'TB', 'PB'], [0, 0, 1, 2, 2, 2])
}
var setSpeed=(speed:number)=>{
  state.show.speed = formatter(speed, ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s'], [0, 0, 1, 2, 2, 2])
  state.show.speedBit = formatter(speed * 8, ['Bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps', 'Pbps'], [0, 0, 0, 2, 2, 2])
}
var frameEvent = () => {
  if(props.isVisible)setUsed()
  if (state.maxUse && state.bytesUsed >= state.maxUse) {
    isRuning.value = false
  }
}
var secEvent = () => {
  var speed = (state.bytesUsed - state.recordUse)/(new Date().getTime() / 1000 - state.recordTime)
  if (speed <= 0 || isNaN(speed)) {
    state.show.speed = '-'
    state.show.speedBit = '-'
  }else if (props.isVisible) {
    setSpeed(speed)
  } else if (runBackground.value){
    setTitle(formatter(state.bytesUsed, ['B', 'KB', 'MB', 'GB', 'TB', 'PB'], [0, 0, 0, 0, 0, 0]) + ' ' + formatter(speed, ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s'], [0, 0, 0, 0, 0, 0]))
  }
  state.recordUse = state.bytesUsed
  state.recordTime = new Date().getTime() / 1000;
}


function formatter(num: number, des: Array<string>, flo: Array<number>) {
  var cnum = num;
  var total_index = 0;
  while (cnum >= 1024) {
    if (total_index == des.length - 1) break;
    cnum = cnum / 1024;
    total_index++;
  }
  return cnum.toFixed(flo[total_index]) + des[total_index];
}

async function start_thread(index: number) {
  try {
    var _url = url.value
    const response = await fetch(url.value, { cache: "no-store", mode: 'cors', referrerPolicy: 'no-referrer' })
    if (!response.body) return
    const reader = response.body.getReader();
    while (true) {
      const { value, done } = await reader.read();
      if (index >= threadNum.value || !isRuning.value) {
        reader.cancel()
        break
      }
      if (done || _url != url.value) {
        reader.cancel()
        start_thread(index);
        break;
      }
      state.bytesUsed += value.length
    }
  } catch (err) {
    if (isRuning.value) start_thread(index);
  }
}

const EditTableVisible = ref(false)
const addTableVisible = ref(false)
const EditMaxVisible = ref(false)
const addForm = ref({
  label: '',
  value: '',
  checking: false
})
const urlParser = (ipt: string) => {
  var a = ipt.match(/https?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=@]*)?/);
  return a ? a[0] : '';
}
const addNode = async () => {
  addForm.value.value=urlParser(addForm.value.value)
  addForm.value.checking = true
  try {
    const response = await fetch(addForm.value.value, { cache: "no-store", mode: 'cors', referrerPolicy: 'no-referrer' })
    if (response.status == 404) throw "资源响应异常" + response.status
    if (!response.body) throw "资源响应异常 Nobody"
    const reader = response.body.getReader();
    const { value, done } = await reader.read();
    if (!value || value.length <= 0) throw "资源响应异常 Nobody";
    reader.cancel()
  } catch (err) {
    addForm.value.checking = false
    let info = ''
    if (err instanceof Error) info = err.message
    else info = String(err)
    console.warn(err)
    ElMessage.error({
      dangerouslyUseHTMLString: true,
      message: '<center>' + info + '<br>详细信息请查看控制台</center>',
    })
    return
  }
  customNodes.value.push({
    label: addForm.value.label,
    value: addForm.value.value,
  })
  addForm.value.label = ''
  addForm.value.value = ''
  addTableVisible.value = false
}

const maxUseInput: Ref<{
  num: number | null;
  type: "GB" | "MB" | "TB";
}> = ref({
  num: null,
  type: 'GB',
})
const editMaxUse = () => {
  var map = {
    "MB": 1024 * 1024,
    "GB": 1024 * 1024 * 1024,
    "TB": 1024 * 1024 * 1024 * 1024
  }
  var tmp = 0
  if (maxUseInput.value.num) {
    tmp = Math.floor(maxUseInput.value.num * map[maxUseInput.value.type])
    if (state.bytesUsed >= tmp) state.bytesUsed = 0
  }
  state.maxUse = tmp
  localStorage.maxUse = tmp
  maxUseInput.value.num = null
  EditMaxVisible.value = false
}
var isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent)
const audioDom:Ref<any> = ref(null);

</script>
<style>
.ItemContainer {
  column-count: 3;
  margin-top: 10px;
}

@media screen and (max-width: 800px) {
  .ItemContainer {
    column-count: 1;
  }
}

.showItem {
  border:1px solid #dbdfea !important;
  padding:20px 15px 15px 30px
}

.font-data{
  white-space: nowrap;
  grid-column-start: 1;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 2.5rem;
  font-size:30px;
}
.font-background{
  color: #344357;
  font-size: 14px;
}
.state-icon{
  display: block;
  margin-right:10px;
  margin-left: auto;
  margin-top: -10px;
  width: 40px;
  height: 20px;
}
.button{
  display: block;
    text-decoration: none;
    background-color: #485bed;
    /* background-image: -webkit-gradient(linear, left top, left bottom, from(#f7f7f7), to(#e7e7e7)); */
    background-image: -webkit-linear-gradient(145deg,#485bed,#6576ff);
    /* background-image: linear-gradient(145deg,
                    #00e4ca 10%, #0026a4 10%,
                    #00dbe0 10%, #ff0000 10%); */
    
    font-size: 30px;
    font-weight: 700 !important;
    margin: 36px;
    width: 144px;
    height: 144px;
    position: relative;
    text-align: center;
    line-height: 144px;
    border-radius: 50%;
    box-shadow: 0px 3px 8px #485bed, inset 0px 2px 3px #6576ff;
    /* border: solid 1px transparent; */
}

</style>