<template>
	<Layout>
		<Content>
			<Breadcrumb>
				<BreadcrumbItem>预警分析</BreadcrumbItem>
				<BreadcrumbItem>应用预警分析</BreadcrumbItem>
			</Breadcrumb>
			<Card style="margin-bottom: 20px;">
				<Form ref="formValidate" inline :label-width="100">
					<FormItem label="时间">
						<DatePicker type="year" placeholder="选择时间" style="width: 200px" :options="pickerOptions" v-model="formData.year"></DatePicker>
						<!-- <Button v-if="checkButton('supervise_Analysis_application_view')" type="primary" @click="getAppList">查看分析</Button> -->
						<Button type="primary" @click="getAppList">查看分析</Button>
					</FormItem>
				</Form>
			</Card>
			<Layout>
				<carouseList :data='appList' :arrowType='arrowType'></carouseList>
				<Layout>
					<Col span="14"></Col>
					<Col span="9"></Col>
					<Row type="flex" justify="space-between" style="margin-top: 20px;">
						<Col style="width: 49%">
						<chart-card title="各应用预警状态">
							<app-warn-state ref="appWarnState" />
						</chart-card>
						</Col>
						<Col style="width: 49%">
						<chart-card title="各应用预警类别情况">
							<app-category ref="appCategory" />
						</chart-card>
						</Col>
					</Row>
					<Row type="flex" justify="space-between">
						<Col style="width: 30%">
						<chart-card title="应用预警值分析">
							<app-top ref="appTop" />
						</chart-card>
						</Col>
						<Col style="width: 33%">
						<chart-card title="各应用预警级别情况">
							<app-level ref="appLevel" />
						</chart-card>
						</Col>
						<Col style="width: 33%">
						<chart-card title="应用预警关联分析">
							<app-relation ref="appRelation" />
						</chart-card>
						</Col>
					</Row>
				</Layout>
			</Layout>
		</Content>
	</Layout>
</template>

<script>
	// api util
	import api from '@/api/axiosApi'
	import superviseApiList from '@/api/superviseApiList'

	// echart图外层容器，包括卡片样式
	import chartCard from './echarts/chartCard.vue'
	// 各应用预警类别情况
	import appWarnState from './echarts/appWarnState.vue'
	// 各应用预警类别情况
	import appCategory from './echarts/appCategory.vue'
	// 人员预警处理分析图
	import appTopAndView from './echarts/appTopAndView.vue'
	// 各应用预警级别情况
	import appLevel from './echarts/appLevel.vue'
	// 应用预警关联分析
	import appRelation from './echarts/appRelationAndView.vue'
	// 顶部滑动列表模块
	import carouseList from "./modal/carouseList.vue";
	import { mapState } from 'vuex'
	const allAppList = new Map()
	export default {
		components: {
			'chart-card': chartCard,
			carouseList,
			'app-warn-state': appWarnState,
			'app-category': appCategory,
			'app-top': appTopAndView,
			'app-level': appLevel,
			'app-relation': appRelation
		},
		data() {
			return {
				arrowType: 'never',
				formData: {
					year: new Date()
				},
				appIds: [],
				appList: [],
				pickerOptions: {
					// disabledDate是一个函数,参数是当前选中的日期值,这个函数需要返回一个Boolean值,
					disabledDate: (year) => {
						var myYear = year.getFullYear()
						var myDate = new Date();
						// 如果函数处理比较简单,可以直接在这里写逻辑方法
						return !(myYear <= myDate.getFullYear() && myYear >= 1900)
					//return this.dealDisabledDate(time)
					}
				} // 日期设置对象
			}
		},
		mounted() {
			if(this.appList.length > 1) {
				this.arrowType = 'always';
			}
			this.getAppList();
		},
		methods: {
			// 获取所有应用列表
			getAppList() {
				const vm = this
				api(superviseApiList.findAppList, {
					type: 1
				}).then((res) => {
					const appIdsTemp = []
					allAppList.clear()
					res.data.data.map((data, idx) => {
						appIdsTemp.push(data.appId)
						// 往map插入应用信息数据，后面获取数字之后有用
						allAppList.set(data.appId, data)
					})
					vm.appIds = appIdsTemp
					vm.findAppTypeList()
					vm.getFildLevelList()
					vm.getAppCount()
					vm.findPublicSuperviseStatus()
					vm.findAssociationRules()
					vm.findContentTop()
				}, (error) => {})
			},
			// 获取各个应用类别
			findAppTypeList() {
				const vm = this
				api(superviseApiList.findAppTypeList, {
					ids: vm.appIds,
					year: vm.formData.year ? vm.formData.year.getFullYear().toString() : ''
				}).then((res) => {
					if(res.data.errcode == 0) {
						vm.$refs.appCategory.refresh(res.data.data)
					} else {
						this.$Message.error(res.data.errmsg);
					}
				}, (error) => {})
			},
			// 各应用预警状态
			findPublicSuperviseStatus() {
				const vm = this
				api(superviseApiList.findPublicSuperviseStatus, {
					appIds: vm.appIds,
					date: vm.formData.year ? vm.formData.year.getFullYear().toString() : ''
				}).then((res) => {
					if(res.data.errcode == 0) {
						vm.$refs.appWarnState.refresh(res.data.data)
					} else {
						this.$Message.error(res.data.errmsg);
					}
				}, (error) => {})
			},
			// 预警内容关键词分析
			findContentTop() {
				const vm = this
				api(superviseApiList.findContentTop, {
					appIds: vm.appIds,
					date: vm.formData.year ? vm.formData.year.getFullYear().toString() : ''
				}).then((res) => {
					if(res.data.errcode == 0) {
						vm.$refs.appTop.refresh(res.data.data)
					} else {
						this.$Message.error(res.data.errmsg);
					}
				}, (error) => {})
			},
			// 各应用预警级别情况
			getFildLevelList() {
				const vm = this
				api(superviseApiList.findAppLevelList, {
					ids: vm.appIds,
					year: vm.formData.year ? vm.formData.year.getFullYear().toString() : ''
				}).then((res) => {
					if(res.data.errcode == 0) {
						vm.$refs.appLevel.refresh(res.data.data)
					} else {
						this.$Message.error(res.data.errmsg);
					}
				}, (error) => {})
			},
			// 获取应用预警关联分析
			findAssociationRules() {
				const vm = this
				api(superviseApiList.findAssociationRules, {
					appIds: vm.appIds,
					date: vm.formData.year ? vm.formData.year.getFullYear().toString() : ''
				}).then((res) => {
					if(res.data.errcode == 0) {
						vm.$refs.appRelation.refresh(res.data.data)
					} else {
						this.$Message.error(res.data.errmsg);
					}
				}, (error) => {})
			},
			// 获取每个应用对应的数字
			getAppCount() {
				const vm = this
				api(superviseApiList.findSurvey, {
					appIds: vm.appIds,
					date: vm.formData.year ? vm.formData.year.getFullYear().toString() : ''
				}).then((res) => {
					if(res.data.errcode == 0) {
						// 两层数组的里面一层，美满8个就push一次
						let subArr = []
						const appListTemp = []
						// 遍历所有的应用信息
						res.data.data.map((data, idx) => {
							subArr.push({
								color: "#F7645D",
								idName: data.name,
								count: data.num,
								countSize: "#50",
								introText: data.name,
								link: `/applicationWarnAnalyzeView/${data.id}`
							})
							allAppList.delete(data.id)
							if(subArr.length === 8) {
								appListTemp.push(subArr)
								subArr = []
							}
						})
						// 遍历剩余没有数字的人员
						let size = allAppList.size
						allAppList.forEach((value, key, map) => {
							subArr.push({
								color: "#F7645D",
								idName: value.name,
								count: 0,
								countSize: "#50",
								introText: value.name
							})
							size--
							if(subArr.length === 8 || size === 0) {
								appListTemp.push(subArr)
								subArr = []
							}
						})
						// 如果没有为0的就需要判断这个条件
						if(subArr.length > 0) {
							appListTemp.push(subArr)
							subArr = []
						}
						vm.appList = appListTemp
					} else {
						this.$Message.error(res.data.errmsg);
					}
				}, (error) => {})
			},
			checkButton(code) {
				if(this.authButton.indexOf(code) >= 0) {
					return true;
				} else {
					return false;
				}
			}
		},
		computed: {
			...mapState([
				'authButton'
			])
		},
	}
</script>

<style lang="less" scoped>
	.radioMod {
		width: 80%;
		height: 100%;
		padding: 10px 0;
		border: 1px solid #ccc;
		border-radius: 50%;
		margin: 30px auto;
	}

	.mf {
		margin-left: 2%;
	}

	.radioTxt {
		width: 100px;
		height: 100px;
		margin: 35px auto;
		font-size: 20px;
		text-align: center
	}
</style>
