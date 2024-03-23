<template>
	<el-container>
		<el-header class="header">
			<div style="margin-top: 15px;">
				<div style="width: fit-content;float: left;">
					<div class="icon">
						<svg t="1702892592527" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
							p-id="4460" data-spm-anchor-id="a313x.search_index.0.i9.1e343a81LSbmza">
							<path
								d="M568.96 459.242667l144-189.205334A382.208 382.208 0 0 0 512 213.333333c-212.074667 0-384 171.925333-384 384a382.293333 382.293333 0 0 0 93.397333 251.008l-64.554666 55.808A467.584 467.584 0 0 1 42.666667 597.333333C42.666667 338.133333 252.8 128 512 128c93.098667 0 179.861333 27.093333 252.842667 73.856l75.882666-99.690667 67.541334 51.413334-273.28 359.04a149.333333 149.333333 0 1 1-66.048-53.376z m266.453333-69.056l54.357334-71.424A467.242667 467.242667 0 0 1 981.333333 597.333333c0 113.706667-40.64 221.226667-113.237333 305.728l-64.725333-55.616A382.272 382.272 0 0 0 896 597.333333c0-76.288-22.250667-147.370667-60.586667-207.146666zM512 661.333333a64 64 0 1 0 0-128 64 64 0 0 0 0 128z"
								fill="#ffffff" p-id="4461"></path>
						</svg>
					</div>
					<span class="title"> 网络面板 </span>
					<div @click="() => {if(newVersionCode>versionCode)updateDialog=true}" class="version">
						<span>v{{ versionName }}</span>
						<span class="new" v-if="newVersionCode>versionCode"> > {{ newVersionName }}</span>
					</div>

				</div>
				<div style="float: right;">
					<el-button class="home" @click="GoToHomePage" round>反馈</el-button>
				</div>
			</div>
		</el-header>
		<el-main>
			<MainUI :isVisible="isVisible" />
			<br>
			<IPinfoUI :isVisible="isVisible" />
		</el-main>
		<el-dialog
			v-model="updateDialog"
			title="提示"
			width="90%"
		>
			<span>新版本已经发布，建议尽快更新</span>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="updateDialog = false">暂不升级</el-button>
					<el-button type="primary" @click="handleUpdate">
						立即升级
					</el-button>
				</span>
			</template>
		</el-dialog>
	</el-container>
</template>

<script lang="ts" setup>

import MainUI from "./components/Main.vue"
import IPinfoUI from "./components/IPinfo.vue"
import { ref, computed,onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { toClipboard } from '@soerenmartius/vue3-clipboard'
const native=window.mjs
const isVisible = ref(true)
const newVersionCode = 310
const newVersionName = "3.1.0"
const versionCode = ref(0)
const versionName = ref("")
const updateDialog = ref(false)
const handleUpdate = () => {
	window.open('https://net.ljxnet.cn/#app')
	updateDialog.value = false
}
onMounted(() => {
	native.onload();
	versionCode.value = native.getAppVersionCode()
	versionName.value = native.getAppVersionName()
	if(versionCode.value<newVersionCode){
		updateDialog.value = true
	}
})

let GoToHomePage = () => {
	toClipboard('463481772')
	ElMessage.info({
		dangerouslyUseHTMLString: true,
		message: '<center>已经复制QQ群号：<br><strong>463481772</strong></center>',
	})
}
document.addEventListener("visibilitychange", function () {
	var string = document.visibilityState
	if (string === 'hidden') isVisible.value = false
	else isVisible.value = true
})
</script>

<style scoped>
.header {
	height: fit-content;
	padding-bottom: 12px;
	background-color: #ffffff;
}

.title {
	color: #526484;
	font-size: 20px;
	font-weight: bolder;
}

.home {
	color: #526484;
	font-size: 12px;
}

.icon {
	display:inline-block;
	vertical-align: -6px;
	width: 40px;
	height: 40px;
	background-color: #5668EE;
	border-radius: 20%;
}
.icon svg {
	width: 30px;
	margin-left: 5px;
}
.version {
	display: inline;
	color: rgb(152, 167, 202);
	font-weight: 800;
	font-size: 12px;
}
.version .new {
	color:crimson;
}
@media (prefers-color-scheme: dark) {
	.header {
		background-color: rgb(18, 18, 18);
	}

	.title {
		color: rgb(152, 167, 202);
	}
	.home {
		color: rgb(152, 167, 202);
	}
	.version {
	color: rgb(97, 109, 137);
	}
}</style>