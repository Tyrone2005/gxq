<template>
	<Layout>
		<Content>
			<Breadcrumb>
				<!-- <BreadcrumbItem>国信优易</BreadcrumbItem> -->
				<BreadcrumbItem>{{title}}</BreadcrumbItem>
			</Breadcrumb>
			<Card>
				<Row>
					<Col span="6">
					    <Tree v-if="ztreeData.length!=0" :data="ztreeData" :render="renderContent"></Tree>
					</Col>
					<Col span="16" v-if="tableShow">
						<Card>
							<Form inline v-if="btnShow">
								<FormItem>
									<Button v-if="netWideDataAdd && zdwhPd" type="primary" shape="circle" icon="plus" @click="netWideModal({},2)">新增</Button>
									<Button v-if="!netWideDataAdd && zdwhPd" type="primary" shape="circle" icon="plus" @click="openModal({},2)">新增</Button>
									<!-- <Button type="primary" shape="circle" icon="edit">修改</Button>
									<Button type="error" shape="circle" icon="close">删除</Button> -->
								</FormItem>
							</Form>
							<hy-table
								highlight-row
								:columns="safetyEvalCol"
								:data="safetyEvalData"
								:total="total"
								:pageSize="pageSize"
								:border='border'
								pageType="small"
								show-elevator
								show-sizer
								class="access-list"
								@on-page-change="getList" />
						</Card>
					</Col>
				</Row>
			</Card>
		</Content>
		<Modal v-model="basisModal" title="添加" width="60%" :mask-closable="false">
			<div style="text-align:center">
				<Form ref="evalData" :model="evalData" :rules="ruleValidate" :label-width="70">
					<Row :gutter="40">
						<Col span="12">
							<FormItem label="名称" label-position="left" prop="name">
								<Input v-model="evalData.name" :maxlength="30"></Input>
							</FormItem>
						</Col>
						<Col span="22">
							<FormItem label="描述" label-position="left" prop="desc">
								<Input v-model="evalData.desc" :maxlength="200" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述..."></Input>
							</FormItem>
						</Col>
					</Row>
				</Form>
			</div>
			<div slot="footer">
				<Button type="primary" @click="handleSubmit('evalData')" size="large">确定</Button>
				<Button type="default" @click="closeModal" size="large">取消</Button>
			</div>
		</Modal>
		<Modal v-model="netWideDataModal" title="添加" width="60%" :mask-closable="false">
			<div style="text-align:center">
				<Form ref="evalData" :model="evalData" :rules="ruleValidate" :label-width="70">
					<Row :gutter="40">
						<Col span="12">
							<FormItem label="带宽" label-position="left" prop="name">
								<Input v-model="evalData.name" type="number"></Input>
								<div style="position: absolute;right: -1.5rem;top: 0;">M</div>
							</FormItem>
						</Col>
						<Col span="22">
							<FormItem label="描述" label-position="left" prop="desc">
								<Input v-model="evalData.desc" type="textarea" :maxlength="200" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述..."></Input>
							</FormItem>
						</Col>
					</Row>
				</Form>
			</div>
			<div slot="footer">
				<Button type="primary" @click="handleSubmit('evalData')" size="large">确定</Button>
				<Button type="default" @click="closeModal" size="large">取消</Button>
			</div>
		</Modal>
	</Layout>
</template>

<script>
import api from '@/api/axiosApi'
import softhardApiList from '@/api/softhardApiList'
export default {
	data() {
	  const vm = this
	  const ruleValidateName = (rule, value, callback) => {
	    if (vm.netWideDataModal) {
	      if(value > 10000){
	        callback(new Error('宽带大小不能大于10000!'));
	      }
	      if (value <= 0) {
	          callback(new Error('宽带大小不能为0或负值!'));
	      } else {
	          callback();
	      }                             
	    } else {
	      callback();
	    }
    }
		return {
			title:this.$store.state.title,
			formValidate: {},
			btnShow:true,
			ruleValidate: {
				name: [
					{ required: true, message: '名称不能为空', trigger: 'blur' },
					{
            validator: ruleValidateName,
            trigger: 'blur'
          }
				]
			},
			tableShow:false,
			pageNo:1,
			pageSize:10,
			tableData:'',
			parentId:'',
			total:0,
			displayType: "inline-block",
			ztreeData:[],
			trssArr:[],
			itemData:{},
			parent:{
				id:'100'
			},
			dictionaryData:{},
			basisModal:false,
      zdwhPd: true,
			netWideDataModal:false,
			netWideDataAdd:false,
			evalData:{},
			border:true,
			safetyEvalCol:[
				{
					type: 'selection',
					width: 60,
					align: 'center'
				},{
					type: 'index',
					title:'序号',
					width: 100,
					align: 'center'
				},{
					title: '所属大类',
					key: 'dictionaryTypeName'
				},{
					title: '名称',
					key: 'name'
				},{
					title: '描述',
					key: 'description'
				},{
					title: '操作',
					type: 'act',
					width: 200,
					align: 'center',
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									type: 'primary',
									size: 'small'
								},
								on: {
									click: () => {
										if(params.row.dictionaryTypeName == '网络宽带'){
											this.netWideModal(params.row,3);
										}else{
											this.openModal(params.row,3);
										}
									}
								}
							}, '修改'),
							h('Poptip', {
							props: {
								confirm: true,
								transfer:true,
								title: "确定删除吗？"
							},
							on: {
								"on-ok": () => {
									this.deleteDictionary(params.row);
								}
							}
							}, [ h('Button', {
									props: {
                    type: 'primary',
                    size: 'small'
                  },
								}, '删除')])
						]);
					}
				}
			],
			safetyEvalData:[],
			buttonProps: {
				type: 'ghost',
				size: 'small',
			}
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.init();
			// this.getTrees();
		});
	},
	methods: {
		init() {
			this.findDictionaryTypeList();
		},
		renderContent(h, {
			root,
			node,
			data
		}) {
			return h('span', {
				on: {
					mouseenter: (e) => {
						this.mouseenterNode(root, node, data);
					},
					mouseleave: (e) => {
						this.mouseleaveNode(root, node, data);
					},
				},
				style: {
					display: 'inline-block',
					width: '100%'
				}
			}, [
				h('span', [
					h('Icon', {
						props: {},
						style: {
							marginRight: '8px'
						}
					}),
					h('span',{
						style: {
							display: 'inline-block',
							height: '24px',
							lineHeight: '24px',
							cursor:'pointer',
							float:'left'
						},
						on: {
							click: () => {
                (data.code == 'ZDWH') ? this.zdwhPd = false : this.zdwhPd = true;
                (data.code == 'ZDWH_wlkd') ? this.netWideDataAdd = true : this.netWideDataAdd = false;
								//点击获取数据
								this.pageDictionaryList(this.pageNo,this.pageSize,data);
							}
						}
					}, data.title)
				]),
				h('span', {
					style: {
						display: data.displayType,
						marginLeft: '10px',
						float:'left'
					}
				}, [
					h('Button', {
						props: Object.assign({}, this.buttonProps, {
							icon: 'plus'
						}),
						style: {
							marginRight: '8px',
							color: 'green',
							float:'left',
							display: data.addNode||"inline-block"
						},
						on: {
							click: () => {//新增
								this.openModal(data,0);
								// this.append(data)
							}
						}
					}),
					h('Button', {
						props: Object.assign({}, this.buttonProps, {
							icon: 'edit'
						}),
						style: {
							marginRight: '8px',
							color: 'blue',
							float:'left',
							display: data.editNode||"inline-block"
						},
						on: {
							click: () => {//修改
								this.openModal(data,1);
							}
						}
					}),
					h('Button', {
						props: Object.assign({}, this.buttonProps, {
							icon: 'close'
						}),
						style: {
							marginRight: '8px',
							color: 'red',
							float:'left',
							display: data.rootNode||"inline-block"
						},
						on: {
							click: () => {//删除
								this.remove(root, node, data);
								this.deleteDictionaryType(data);
							}
						}
					})
				])
			]);
		},
		append(data) {
			const children = data.children || [];
			children.push({
				title: 'appended node',
				expand: true
			});
			this.$set(data, 'children', children);
		},
		remove(root, node, data) {
			const parentKey = root.find(el => el === node).parent;
			const parent = root.find(el => el.nodeKey === parentKey).node;
			const index = parent.children.indexOf(data);
			parent.children.splice(index, 1);
		},
		mouseenterNode(root, node, data) {
			data.displayType = 'block';
		},
		mouseleaveNode(root, node, data) {
			data.displayType = 'none';
			// this.$set(data, 'displayType' ,'none');
		},
		// 从服务端获取列表数据
        getList (pageNo, pageSize) {
			this.pageDictionaryList(pageNo, pageSize,this.tableData);
        },
		openModal(data,type){
			switch (type) {
				case 0:
					this.evalData.name = '';
					this.evalData.desc = '';
					this.parent = data;
					break;
				case 1:
					this.evalData.name = data.title;
					this.evalData.desc = data.description;
					this.parent = data;
					break;
				case 2:
					this.evalData.name = '';
					this.evalData.desc = '';
					break;
				case 3:
					this.evalData.name = data.name;
					this.evalData.desc = data.description;
					this.parent.dictionaryId = data.id;
					break;
				default:
					break;
			}
			this.parent.type = type;
			this.basisModal = true;
		},
		netWideModal(data,type){
			switch (type) {
				case 0:
					this.evalData.name = '';
					this.evalData.desc = '';
					this.parent = data;
					break;
				case 1:
					this.evalData.name = data.title;
					this.evalData.desc = data.description;
					this.parent = data;
					break;
				case 2:
					this.evalData.name = '';
					this.evalData.desc = '';
					break;
				case 3:
					this.evalData.name = data.name;
					this.evalData.desc = data.description;
					this.parent.dictionaryId = data.id;
					break;
				default:
					break;
			}
			this.parent.type = type;
			this.netWideDataModal  = true;
		},
		closeModal(){
			this.parent = {};
			console.log("关闭");
			this.basisModal = false;
			this.netWideDataModal = false;
		},
		findDictionaryTypeList(){//查询字典类型数据列表
			api(softhardApiList.findDictionaryTypeList).then((res) => {
				if(res.data.errcode == 0) {
					let data = res.data.data;
					this.ztreeData = this.getTrees(data);//层级递归
					this.ztreeData = this.getTree(this.ztreeData);//数据整理
					this.basisModal = false;//关闭模态框
					this.netWideDataModal = false;
				} else {
					this.$Message.error(res.data.errmsg);
				}
			}, (error) => {})
		},
		handleSubmit(name){
			this.$refs[name].validate((valid) => {
				if (valid) {
					let data = {
						"code": this.parent.code,
						"description": this.evalData.desc,
						"name": this.evalData.name,
						"parentId": this.parent.id,
						"id": this.parent.id,
					}
					switch (this.parent.type) {
						case 0:
							this.saveDictionaryType(data);
							break;
						case 1:
							this.updateDictionaryType(data);
							break;
						case 2:
							this.saveDictionary();
							break;
						case 3:
							this.updateDictionary(data);
							break;
						default:
							break;
					}
				}
			})
		},
		saveDictionaryType(data){//保存字典类型数据
			api(softhardApiList.saveDictionaryType,data).then((res) => {
				if(res.data.errcode == 0) {
					this.findDictionaryTypeList();
				} else {
				this.$Message.error(res.data.errmsg);
				}
			}, (error) => {})
		},
    updateDictionaryType(data){//修改字典类数据
			api(softhardApiList.updateDictionaryType,data).then((res) => {
				if(res.data.errcode == 0) {
					this.findDictionaryTypeList();
				} else {
				this.$Message.error(res.data.errmsg);
				}
			}, (error) => {})
		},
		deleteDictionaryType(data){//删除字典类数据
			api(softhardApiList.deleteDictionaryType,{id:data.id}).then((res) => {
				if(res.data.errcode == 0) {
					console.log("删除成功");
				} else {
				this.$Message.error(res.data.errmsg);
				}
			}, (error) => {})
		},
		saveDictionary(){//保存字典数据
			this.dictionaryData.description =  this.evalData.desc;
			this.dictionaryData.name =  this.evalData.name;
			api(softhardApiList.saveDictionary,this.dictionaryData).then((res) => {
				if(res.data.errcode == 0) {
					this.pageDictionaryList(this.pageNo,this.pageSize,this.tableData);
				} else {
				this.$Message.error(res.data.errmsg);
				}
			}, (error) => {})
		},
    updateDictionary(data){//修改字典数据
			data.id = this.parent.dictionaryId,
			api(softhardApiList.updateDictionary,data).then((res) => {
				if(res.data.errcode == 0) {
					this.pageDictionaryList(this.pageNo,this.pageSize,this.tableData);
				} else {
				this.$Message.error(res.data.errmsg);
				}
			}, (error) => {})
		},
		deleteDictionary(data){//修改字典数据
			if(parseInt(data.id) == 101 || parseInt(data.id) == 102 || parseInt(data.id) == 103){
				return
			}
			api(softhardApiList.deleteDictionary,{id:data.id}).then((res) => {
				if(res.data.errcode == 0) {
					this.pageDictionaryList(this.pageNo,this.pageSize,this.tableData);
				} else {
				this.$Message.error(res.data.errmsg);
				}
			}, (error) => {})
		},
		pageDictionaryList(pageNo,pageSize,data){//查询数据字典分页信息
			//操作系统和所属网络不能添加第三级，点击操作系统和所属列表，不能出现右边的新增列表，点击所属列表下的第二级目录，不能出现右边的新增列表。点击操作系统列表下的第二级目录，可以出现右边的新增列表
			(data.parentId == 103 || data.id == 102 || data.id == 103) ? this.btnShow = false : this.btnShow = true;
			//清空初始化
			this.tableShow = true;
			this.dictionaryData = {};
			this.safetyEvalData = [];
			this.pageNo = pageNo;
			this.pageSize = pageSize;
			//整理请求的数据
			this.tableData = data;
			this.dictionaryData.dictionaryTypeCode = data.code || '';
			this.dictionaryData.dictionaryTypeName = data.title || '';
			this.dictionaryData.dictionaryTypeId = data.id;
			let openApiReq = {
				"data": {
					"dictionaryTypeId": data.id || data.dictionaryTypeId
				},
				"pageNo": pageNo,
				"pageSize": pageSize
			}
			api(softhardApiList.pageDictionaryList,openApiReq).then((res) => {
				if(res.data.errcode == 0) {
					this.total = res.data.data.size;
					res.data.data.list.forEach(item => {
						let obj = {};
						obj.dictionaryTypeName = item.dictionaryTypeName;
						obj.name = item.name;
						obj.description = item.description;
						obj.id = item.id;
						this.safetyEvalData.push(obj);
						this.basisModal = false;//关闭模态框
						this.netWideDataModal = false;
					});
					// this.findDictionaryTypeList();
				} else {
				this.$Message.error(res.data.errmsg);
				}
			}, (error) => {})
		},
		getTree (tree) {
			let arr = [];
			if (!!tree && tree.length !== 0) {
				tree.forEach(item => {
					let obj = {};
					obj.title = item.title;
					obj.displayType = 'none';
					obj.rootNode = item.rootNode;
					obj.addNode = item.addNode;
					obj.editNode = item.editNode;
					obj.id = item.id;
					obj.parentId = item.parentId;
					obj.description = item.description;
					obj.code = item.code;
					obj.expand = true;
					obj.selected = false;
					obj.children = this.getTree(item.children); // 递归调用
					arr.push(obj);
				});
			}
			return arr;
		},
		getTrees(data){
			let treedata = []
			//查找最顶层
			let len = data.length
			for(let j=0;j<len;j++){
				data[j].expand = false
				data[j].title = data[j].name
				if(data[j].parentId == "100"){
					treedata.push({
						expand:true,
						"rootNode":'none',
						"addNode":'none',
						"editNode":'none',
						"title":data[j].name,
						"id":data[j].id,
						"code":data[j].code,
						"description":data[j].description,
						"parentId":data[j].parentId
					})
				}
			}
			//找到跟最高层id相关的子子孙孙，并给子孙添加lev
			var treedataLevs =[]
			for(let h=0,ls=treedata.length;h<ls;h++){
				treedataLevs.push({
					treedataLev:this.sonsTree(data,treedata[h].id)
				})
			}
			for(let p=0,lq=treedataLevs.length;p<lq;p++){
				var treedataLev = treedataLevs[p].treedataLev
				//找到最高层的lev
				var maxLev = 0
				maxLev = maxLev > 0 ? maxLev : 1;
				for(let i=0,lt=treedataLev.length;i<lt;i++){
					if(parseInt(treedataLev[i].lev) > maxLev){
						maxLev = parseInt(treedataLev[i].lev)
					}else{
						maxLev = maxLev
					}
				}
				//比较当前层和上一层的数据，然后做处理
				var needLev = maxLev;
				var maxLevTree = [];
				var maxLevTreePrev = [];
				for(let m=0;m<maxLev;m++){
					maxLevTree = this.getLevArr(treedataLev,needLev,1);
					maxLevTreePrev = this.getLevArr(treedataLev,needLev-1,2);
					for(var j=0,lp=maxLevTreePrev.length;j<lp;j++){
						maxLevTreePrev[j].children = new Array();
						if(maxLevTree.length!==0){
							for(var i=0,lm=maxLevTree;i<lm.length;i++){
								if(maxLevTree[i].parentId == maxLevTreePrev[j].id){
									maxLevTreePrev[j].children.push(maxLevTree[i]);
									maxLevTreePrev[j].rootNode = 'none';
								}
							}
						}else{
							maxLevTreePrev[j].rootNode = 'block';//没有下级菜单的显示删除按钮
						}
						if(maxLevTreePrev[j].id == '101' || maxLevTreePrev[j].id == '102' || maxLevTreePrev[j].id == '103'){//当菜单为操作系统、所属网络时不能删除，子级菜单不能添加
							for(var i=0,lm=maxLevTreePrev[j].children;i<lm.length;i++){
								maxLevTreePrev[j].children[i].addNode = 'none';
							}
							maxLevTreePrev[j].rootNode = 'none';
							maxLevTreePrev[j].editNode = 'none';
						}
						if(maxLevTreePrev[j].id == '104'){//当菜单为网络宽带时，不允许新增、修改、添加
							for(var i=0,lm=maxLevTreePrev[j].children;i<lm.length;i++){
								maxLevTreePrev[j].children[i].addNode = 'none';
							}
							maxLevTreePrev[j].addNode = 'none';
							maxLevTreePrev[j].editNode = 'none';
							maxLevTreePrev[j].rootNode = 'none';
						}
					}
					needLev--
				}
				treedata[p].children = maxLevTreePrev
			}
			return treedata
		 },
		getLevArr(arr,lev,num){//找出同一级的数据
			var newarr = []
			for(let i=0,la=arr.length;i<la;i++){
				//这里对arr 的children 做处理
				arr.children = new Array()
				if(parseInt(arr[i].lev) == lev){
					newarr.push(arr[i])
				}
			}
			return newarr
		},
		sonsTree (arr,id) {//给每个数据添加一个lev
			var temp = [],lev=0;
			var forFn = function(arr, id,lev){
				for (var i = 0; i < arr.length; i++) {
					var item = arr[i];
					if (item.parentId==id) {
						item.lev=lev;
						temp.push(item);
						forFn(arr,item.id,lev+1);
					}
				}
			};
			forFn(arr, id,lev);
			return temp;
		},
	}
}
</script>

<style lang='less' scoped>
	.w168 {
		width: 168px;
	}
	.ivu-tree-children /deep/ span{
		cursor: pointer;
	}
</style>
