<template>
	<div class="radius card" :style="{ borderRadius: 'var(--el-border-radius-round)' }">
		<div style="margin-top: 10px;margin-left: 10px;margin-right: 10px;">
			<div class="slider-demo-block">
				<span class="font-background">测速地址：</span>
				<el-button type="primary" :icon="CopyDocument" link @click="copyUrl" />
				<el-button type="primary" :icon="Edit" link @click="EditTableVisible = true" />
				<br>
				<el-select style="width: 100%;" v-model="runUrl">
					<el-option-group v-for="group in nodes" :key="group.label" :label="group.label">
						<el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
					</el-option-group>
					<template #prefix>
						<el-icon>
							<Link />
						</el-icon>
					</template>
				</el-select>
			</div>
			<div style="margin-top:20px;">
				<span class="font-background">线程数：{{ threadNum }}</span>
				<el-slider :show-tooltip="false" :min="1" :max='64' v-model="threadNum" />
			</div>
			<div style="width: 100%;height:32px;">
				<div style="float: left;">
					<el-switch v-model="runBackground" active-text="保持后台运行" />
				</div>
				<div style="float: right;">
					<el-switch v-model="autoStart" active-text="自动运行" />
				</div>
			</div>
			<div class="ItemContainer">
				<div class="showItem">
					<span class="font-background" style="font-size: larger;">总流量</span>
					<el-text size="small" class="mx-1">{{ state.maxUse ? '/' + formatter(state.maxUse, 0, [0, 0, 0, 0, 0, 0]) : ""
					}}</el-text>
					<el-button type="primary" style="height: 15px;" :icon="Edit" link @click="EditMaxVisible = true" />
					<div class="state-icon">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
							class="h-15 w-15 float-right pt-3">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
						</svg>
					</div>
					<el-text class="font-data">{{ state.show.allUsed }}</el-text>
				</div>
				<div class="showItem">
					<span class="font-background" style="font-size: larger;">{{ isRunning ? '实时速度' : '平均速度' }}</span>
					<el-popover placement="top-start" title="用量预测" :width="150" trigger="click">
						<template #reference>
							<el-button type="primary" style="height: 15px;vertical-align: -2px;" :icon="Calendar" link />
						</template>
						每分钟&nbsp;&nbsp;{{ state.predict.min }}
						<br>
						每小时&nbsp;&nbsp;{{ state.predict.hour }}
						<br>
						每天&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ state.predict.day }}
						<br>
						每月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ state.predict.mon }}
					</el-popover>
					<div class="state-icon state-icon-main">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
							class="h-15 w-15 float-right pt-3">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
								d="M16.469,8.924l-2.414,2.413c-0.156,0.156-0.408,0.156-0.564,0c-0.156-0.155-0.156-0.408,0-0.563l2.414-2.414c1.175-1.175,1.175-3.087,0-4.262c-0.57-0.569-1.326-0.883-2.132-0.883s-1.562,0.313-2.132,0.883L9.227,6.511c-1.175,1.175-1.175,3.087,0,4.263c0.288,0.288,0.624,0.511,0.997,0.662c0.204,0.083,0.303,0.315,0.22,0.52c-0.171,0.422-0.643,0.17-0.52,0.22c-0.473-0.191-0.898-0.474-1.262-0.838c-1.487-1.485-1.487-3.904,0-5.391l2.414-2.413c0.72-0.72,1.678-1.117,2.696-1.117s1.976,0.396,2.696,1.117C17.955,5.02,17.955,7.438,16.469,8.924 M10.076,7.825c-0.205-0.083-0.437,0.016-0.52,0.22c-0.083,0.205,0.016,0.437,0.22,0.52c0.374,0.151,0.709,0.374,0.997,0.662c1.176,1.176,1.176,3.088,0,4.263l-2.414,2.413c-0.569,0.569-1.326,0.883-2.131,0.883s-1.562-0.313-2.132-0.883c-1.175-1.175-1.175-3.087,0-4.262L6.51,9.227c0.156-0.155,0.156-0.408,0-0.564c-0.156-0.156-0.408-0.156-0.564,0l-2.414,2.414c-1.487,1.485-1.487,3.904,0,5.391c0.72,0.72,1.678,1.116,2.696,1.116s1.976-0.396,2.696-1.116l2.414-2.413c1.487-1.486,1.487-3.905,0-5.392C10.974,8.298,10.55,8.017,10.076,7.825">
							</path>
						</svg>
					</div>
					<el-text class="font-data state-icon-main">{{ state.show.speed }}</el-text>
				</div>
				<div class="showItem">
					<span class="font-background" style="font-size: larger;">带宽</span>
					<el-text size="small" class="mx-1">{{ state.maxSpeed ? '/' + formatter(state.maxSpeed, 2, [0, 0, 0, 0, 0, 0]) : ""
					}}</el-text>
					<el-button type="primary" style="height: 15px;" :icon="Edit" link @click="EditSpeedVisible = true" />
					<div class="state-icon">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
							class="h-15 w-15 float-right pt-3">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
						</svg>
					</div>
					<el-text class="font-data">{{ state.show.speedBit }}</el-text>
				</div>
			</div>

			<div style="width: fit-content;display: block;margin-top:2ch;margin-left: auto;margin-right: auto;">
				<a class="button" v-if="!isRunning && !state.isChecking" @click="tryStart">
					<svg t="1694957757562" class="svg-icon"
						viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4036" width="200" height="200">
						<path
							d="M823.8 603.5l-501.2 336c-50.7 34-119.3 20.4-153.2-30.2-12.2-18.2-18.7-39.6-18.7-61.5v-672c0-61 49.5-110.4 110.4-110.4 21.9 0 43.3 6.5 61.5 18.7l501.1 336c50.7 34 64.2 102.6 30.2 153.2-7.8 11.9-18.1 22.2-30.1 30.2z m0 0"
							p-id="4037"></path>
					</svg>
				</a>
				<a class="button" v-if="state.isChecking">
					<el-icon :size="60" class="is-loading el-icon-loading">
						<Loading />
					</el-icon>
				</a>
				<a class="button" v-if="isRunning" @click="isRunning = false">
					<svg t="1694958268344" fill="white" style="width: 80px;margin-top: -30px;" viewBox="0 0 1024 1024" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="7667" width="200" height="200">
						<path
							d="M352 768c-17.664 0-32-14.304-32-32V288c0-17.664 14.336-32 32-32s32 14.336 32 32v448c0 17.696-14.336 32-32 32zM672 768c-17.696 0-32-14.304-32-32V288c0-17.664 14.304-32 32-32s32 14.336 32 32v448c0 17.696-14.304 32-32 32z"
							p-id="7668"></path>
					</svg>
				</a>
			</div>
			<el-button style="float: left;margin-top: -20px;margin-right: 3px" type="primary" :icon="Histogram" link
				@click="showMark.show = true" />
			<el-button style="float: right;margin-top: -20px;margin-right: 3px" type="primary" :icon="FullScreen" link
				@click="isFullScreen = true" />
		</div>
	</div>

	<el-dialog style="width: 90%;max-width: 700px;" v-model="EditTableVisible" title="自定义地址">
		<el-table v-if="customNodes.length" :data="customNodes" style="width: 100%" max-height="300">
			<el-table-column prop="label" label="名称" width="100" />
			<el-table-column prop="value" label="URL" />
			<el-table-column fixed="right" label="" width="50">
				<template #default="scope">
					<el-button type="danger" link :icon="Delete" @click.prevent="customNodes.splice(scope.$index, 1)" />
				</template>
			</el-table-column>
		</el-table>
		<el-empty v-else description="没有自定义地址" />
		<el-button class="mt-4" style="width: 100%" @click="addTableVisible = true;">添加地址</el-button>
	</el-dialog>

	<el-dialog style="width: 90%;max-width: 700px;" v-model="addTableVisible" title="添加链接">
		<el-form :model="addForm">
			<el-form-item label="名称:" label-width='50px'>
				<el-input v-model="addForm.label" autocomplete="off" />
			</el-form-item>
			<el-form-item label="url:" label-width='50px'>
				<el-input @input="() =>{addForm.enhanced = addForm.value.endsWith('#enhanced')}" v-model="addForm.value" autocomplete="off">
					<template #suffix>
						<el-icon v-if="urlParser(addForm.value)">
							<CircleCheck />
						</el-icon>
					</template>>
				</el-input>
			</el-form-item>
			<el-form-item label="增强并发:" label-width='80px'>
				<el-switch
					v-model="addForm.enhanced" @change="() =>{
						if(addForm.enhanced)addForm.value = addForm.value + '#enhanced'
						else addForm.value = addForm.value.replace('#enhanced','')
					}"
				/>
				<el-popover
					placement="bottom"
					:width="200"
					trigger="hover"
					content="开启后，对于有多个IP节点的链接，会忽略默认的就近访问原则，软件会将探测到的所有节点IP（不高于线程数）加入测速列表。对于有些链接，这个功能能够使测试结果更加准确。但是可能会干扰运营商的定向流量判定"
				>
					<template #reference>
						<div style="margin-left: 20px;">
							<svg style="fill: var(--el-color-primary);width: 20px;height: 20px;vertical-align: -5px;" t="1711880594298" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4260"><path d="M512 97.52381c228.912762 0 414.47619 185.563429 414.47619 414.47619s-185.563429 414.47619-414.47619 414.47619S97.52381 740.912762 97.52381 512 283.087238 97.52381 512 97.52381z m0 73.142857C323.486476 170.666667 170.666667 323.486476 170.666667 512s152.81981 341.333333 341.333333 341.333333 341.333333-152.81981 341.333333-341.333333S700.513524 170.666667 512 170.666667z m45.32419 487.619047v73.142857h-68.510476l-0.024381-73.142857h68.534857z m-4.047238-362.008381c44.251429 8.923429 96.889905 51.126857 96.889905 112.518096 0 61.415619-50.151619 84.650667-68.120381 96.134095-17.993143 11.50781-24.722286 24.771048-24.722286 38.863238V609.52381h-68.534857v-90.672762c0-21.504 6.89981-36.571429 26.087619-49.883429l4.315429-2.852571 38.497524-25.6c24.551619-16.530286 24.210286-49.712762 9.020952-64.365715a68.998095 68.998095 0 0 0-60.391619-15.481904c-42.715429 8.387048-47.640381 38.521905-47.932952 67.779047v16.554667H390.095238c0-56.953905 6.534095-82.773333 36.912762-115.395048 34.03581-36.449524 81.993143-42.300952 126.268952-33.328762z" p-id="4261"></path></svg>
						</div>
					</template>
				</el-popover>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="addTableVisible = false">取消</el-button>
				<el-button type="primary" :disabled="!urlParser(addForm.value) || !addForm.label || addForm.checking"
					@click="addNode()">确认
					<el-icon v-if="addForm.checking" class="is-loading">
						<Loading />
					</el-icon>
				</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog style="width: 90%;max-width: 300px;" v-model="EditMaxVisible" title="设置上限自动停止">
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
	<el-dialog style="width: 90%;max-width: 350px;" v-model="EditSpeedVisible" title="设置带宽上限">
		<el-form>
			<div class="mt-4">
				<el-input type="number" min='1' v-model="maxSpeedInput.num" autocomplete="off" placeholder="留空则无上限"
					class="input-with-select">
					<template #append>
						<el-select v-model="maxSpeedInput.type" placeholder="Select" style="width: 80px">
							<el-option label="Mbps" value="Mbps" />
							<el-option label="Gbps" value="Gbps" />
						</el-select>
					</template>
				</el-input>
			</div>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="EditSpeedVisible = false">取消</el-button>
				<el-button type="primary" @click="editSpeedUse()">
					确定
				</el-button>
			</span>
		</template>
	</el-dialog>
	<MarkUI :show="showMark" :loginInfo="loginInfo" />
	<FullScreenUI v-model="isFullScreen" :isRunning="isRunning" :state="state" />
</template>

<script lang="ts" setup>
const props = defineProps({
	isVisible: Boolean
})
const native=window.mjs
import { ElMessage } from 'element-plus'
import nodesJson from "../assets/nodes.json"
import { Link, Edit, Delete, CircleCheck, Loading, CopyDocument, Histogram, Calendar,FullScreen } from '@element-plus/icons-vue'
import { ref, watch,watchEffect, type Ref, reactive,onMounted } from 'vue'
import { toClipboard } from '@soerenmartius/vue3-clipboard'
import MarkUI from './Mark.vue'
import FullScreenUI from './FullScreen.vue'

const showMark = ref({ show: false })
const customNodes = reactive(localStorage.customNodes ? JSON.parse(localStorage.customNodes) : [])
const OnlineNodes: {
	label: string;
	options: {
		value: string;
		label: string;
	}[];
}[] = []
for(let groupName in nodesJson) {
	const group=nodesJson[groupName as keyof typeof nodesJson]
	const temp: {
		label: string;
		options: {
			value: string;
			label: string;
		}[];
	}={"label":groupName,options:[]}
	for(let node in group) {
		temp.options.push({"value":group[node as keyof typeof group],"label":node})
	}
	OnlineNodes.push(temp)
}
const nodes: Ref<{
	label: string;
	options: {
		value: string;
		label: string;
	}[];
}[]> = ref(OnlineNodes)
if (customNodes.length) {
	nodes.value = [{ "label": "自定义", "options": customNodes}].concat(OnlineNodes)
}
watch(customNodes, async (newState, oldState) => {
	if (customNodes.length) {
		nodes.value = [{ "label": "自定义", "options": customNodes }].concat(OnlineNodes)
	} else nodes.value = OnlineNodes
	localStorage.customNodes = JSON.stringify(newState)
}, { deep: true })

const state = reactive({
	show: {
		allUsed: '-',
		speed: '-',
		speedBit: '-'
	},
	predict: {
		min: '-',
		hour: '-',
		day: '-',
		mon: '-',
	},
	isChecking: false,
	bytesUsed: 0,
	maxUse: localStorage.maxUse ? Number(localStorage.maxUse) : 0,
	maxSpeed: localStorage.maxSpeed ? Number(localStorage.maxSpeed) : 0,
})
const isRunning = ref(false)
const isFullScreen = ref(false)
const loginInfo = reactive({ AccessToken: localStorage.AccessToken ? localStorage.AccessToken : "" })
const threadNum = ref(localStorage.threadNum ? Number(localStorage.threadNum) : 8)
const runBackground = ref(localStorage.runBackground ? localStorage.runBackground === 'true' : false)
const autoStart = ref(localStorage.autoStart ? localStorage.autoStart === 'true' : false)
const runUrl = ref(localStorage.url ? localStorage.url : nodes.value[0].options[0].value)

var tasks: Array<number> = []
onMounted(() => {
	isRunning.value = native.getIsRunning();
	native.setRunBackground(runBackground.value)
	if(!isRunning.value){
		native.setUrl(runUrl.value)
		if(autoStart.value){
			tryStart();
		}
	}
})

const tryStart = async () => {
	state.isChecking = true
	const urlStatus = await checkUrl(runUrl.value)
	state.isChecking = false
	if (!urlStatus.status) {
		ElMessage.error({
			dangerouslyUseHTMLString: true,
			message: urlStatus.info
		})
	} else {
		isRunning.value = true
	}
}
const block_list=["ljxnet.cn","netart.cn",".gov.cn"]
const checkUrl = async (url: string) => {
	var status = true
	let info = ''
	try {
		if(url.startsWith("networkpanel:")){
			const ret:boolean=native.checkUrl(url)
			if(!ret){
				throw "签名校验不通过"
			}
		}else{
			let structUrl = new URL(url)
			if (block_list.some((i)=>structUrl.host.endsWith(i))) {
				throw '你不对劲，我要拿小本本把你记下来然后交给警察蜀黍！'
			}
			const controller = new AbortController();
			const id = setTimeout(() => controller.abort(), 5000);
			const response = await fetch(url, { cache: "no-store", mode: 'cors', referrerPolicy: 'no-referrer' ,signal: controller.signal})
			if (response.status == 404) throw "资源响应异常" + response.status
			if (!response.body) throw "资源响应异常 Nobody"
			const reader = response.body.getReader();
			const { value, done } = await reader.read();
			if (!value || value.length <= 0) throw "资源响应异常 Nobody";
			reader.cancel()
		}
	} catch (err) {
		status = false
		if (err instanceof Error) info = err.message
		else info = String(err)
	}
	return {
		status: status,
		info: info,
	}
}

watch(isRunning,async (n) => {
	if (n) {
		tasks.push(setInterval(frameEvent, 32))
		native.setThreadNum(threadNum.value)
		native.setMaxSpeed(state.maxSpeed)
		native.setRunBackground(runBackground.value)
		native.setMaxUse(state.maxUse)
		native.setReportToken(loginInfo.AccessToken)
		native.start()
	} else {
		native.stop()
		setSpeed(native.getAvgSpeed())
		tasks.map((i) => clearInterval(i))
		tasks.length = 0
	}
})
watch(runUrl,(n) => {native.setUrl(n)})
watch(threadNum,(n) => {native.setThreadNum(n)})
watch(runBackground,(n) => {native.setRunBackground(n)})
watch(loginInfo,(n) => {native.setReportToken(n.AccessToken)})
watchEffect(() => {
	localStorage.autoStart = autoStart.value;
	localStorage.runBackground = runBackground.value;
	localStorage.url = runUrl.value;
	localStorage.AccessToken = loginInfo.AccessToken
	localStorage.threadNum = threadNum.value
})
const copyUrl = () => {
	toClipboard(runUrl.value).then(() => {
		ElMessage.success({
			dangerouslyUseHTMLString: true,
			message: '已复制当前链接',
		})
	})
}

var setUsed = () => {
	if (!state.bytesUsed) state.show.allUsed = '-'
	state.show.allUsed = formatter(state.bytesUsed, 0, [0, 0, 1, 2, 2, 2])
}
var setSpeed = (speed: number) => {
	state.show.speed = formatter(speed, 1, [0, 0, 1, 2, 2, 2])
	state.show.speedBit = formatter(speed * 8, 2, [0, 0, 0, 2, 2, 2])
	state.predict.min = formatter(speed * 60, 0, [0, 0, 0, 1, 1, 1])
	state.predict.hour = formatter(speed * 60 * 60, 0, [0, 0, 0, 1, 1, 1])
	state.predict.day = formatter(speed * 60 * 60 * 24, 0, [0, 0, 0, 1, 1, 1])
	state.predict.mon = formatter(speed * 60 * 60 * 24 * 30, 0, [0, 0, 0, 1, 1, 1])
}

let lastSpeed=0
var frameEvent = () => {
	state.bytesUsed = native.getBytesUsed()
	isRunning.value = native.getIsRunning()
	let speed=native.getSpeed()
	if(speed!=lastSpeed)setSpeed(speed)
	lastSpeed=speed
	setUsed()
}

function formatter(num: number, desIndex: number, flo: Array<number>) {
	if(num==0)return "-"
	const describeString = [['B', 'KB', 'MB', 'GB', 'TB', 'PB'],
	['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s'],
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

const EditTableVisible = ref(false)
const addTableVisible = ref(false)
const EditMaxVisible = ref(false)
const EditSpeedVisible = ref(false)
const addForm = ref({
	label: '',
	value: '',
	enhanced: false,
	checking: false
})
const urlParser = (ipt: string) => {
	var a = ipt.match(/https?:\/\/([\w-]+\.)+[\w-]+(:[0-9]+)?(\/\S*)?/);
	if(a)return a[0];
	var b = ipt.match(/networkpanel:\S+/);
	if(b)return b[0];
	return "";
}
const addNode = async () => {
	addForm.value.value = urlParser(addForm.value.value)
	addForm.value.checking = true
	const urlStatus = await checkUrl(addForm.value.value)
	if (!urlStatus.status) {
		addForm.value.checking = false
		ElMessage.error({
			dangerouslyUseHTMLString: true,
			message: urlStatus.info,
		})
		return
	}
	addForm.value.checking = false
	customNodes.push({
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
	}
	state.maxUse = tmp
	native.setMaxUse(tmp)
	localStorage.maxUse = tmp
	maxUseInput.value.num = null
	EditMaxVisible.value = false
}

const maxSpeedInput: Ref<{
	num: number | null;
	type: "Gbps" | "Mbps" | "Kbps";
}> = ref({
	num: null,
	type: 'Mbps',
})

const editSpeedUse = () => {
	var map = {
		"Kbps": 1024 ,
		"Mbps": 1024 * 1024,
		"Gbps": 1024 * 1024 * 1024
	}
	var tmp = 0
	if (maxSpeedInput.value.num) {
		tmp = Math.floor(maxSpeedInput.value.num * map[maxSpeedInput.value.type])
	}
	state.maxSpeed = tmp
	localStorage.maxSpeed = tmp
	native.setMaxSpeed(tmp)
	maxSpeedInput.value.num = null
	EditSpeedVisible.value = false
}
</script>
<style scoped>
.ItemContainer {
	column-count: 3;
	margin-top: 10px;
}

.card{
	max-width: 800px;
	height:fit-content;
	display: block;
	margin:0 auto;
	background-color:#ffffff;
	padding:2%
}

@media (prefers-color-scheme: dark) {
		.card {
				background-color:rgb(18,18,18);
		}
}
@media screen and (max-width: 800px) {
	.ItemContainer {
		column-count: 1;
	}
}

.showItem {
	border: 1px solid #dbdfea !important;
	padding: 20px 15px 15px 30px
}

.font-data {
	white-space: nowrap;
	grid-column-start: 1;
	font-weight: 700;
	line-height: 2.5rem;
	font-size: 30px;
}

.font-background{
	color: #344357;
	font-size: 14px;
}

.state-icon {
	display: block;
	margin-right: 10px;
	margin-left: auto;
	margin-top: -10px;
	width: 40px;
	height: 20px;
	color: rgb(96,98,102);
}

.state-icon-main{
	color: rgb(9,194,222);
}

.svg-icon{
	fill:rgb(255,255,255);
	width: 50px;
	margin-left: 10px;
	margin-top: -30px;
}

.el-select-dropdown__wrap{
	max-height: 60vh;
}
.el-icon-loading{
	margin-top: 40px;
	color:rgb(255,255,255);
}
@media (prefers-color-scheme: dark) {
		.showItem {
			border: 1px solid rgb(61,63,66) !important;
		}
		.state-icon{
			color: rgb(165,167,172);
		}
		.state-icon-main{
			color: rgb(30,105,131);
		}
		.font-background{
				color: rgb(193,206,230);
		}
		.svg-icon{
			fill:rgb(220,220,220);
		}
}



.button {
	display: block;
	text-decoration: none;
	background-color: #485bed;
	/* background-image: -webkit-gradient(linear, left top, left bottom, from(#f7f7f7), to(#e7e7e7)); */
	background-image: -webkit-linear-gradient(145deg, #485bed, #6576ff);
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
}</style>