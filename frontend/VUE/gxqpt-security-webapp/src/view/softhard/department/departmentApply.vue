<template>
  <Layout>
    <Content>
      <Breadcrumb>
        <!-- <BreadcrumbItem>部门用户</BreadcrumbItem> -->
        <BreadcrumbItem>{{title}}</BreadcrumbItem>
      </Breadcrumb>
      <Card>
        <Form
          ref="formValidate"
          inline
          :label-width="100"
          :model="searchCondition">
          <FormItem label="申请单号">
              <Input type="text" v-model="searchCondition.applyNo" style="width:140px"></Input>
          </FormItem>
          <FormItem label="申请时间：">
            <DatePicker
              format="yyyy-MM-dd"
              type="daterange"
              style="width: 200px;"
              :editable="false"
              v-model="searchCondition.range"
              @on-change="searchCondition.range=$event">
            </DatePicker>
          </FormItem>
          <FormItem :label-width="20">
            <Button type="primary" @click="getMyApplyList(1)">查询</Button>
            <Button type="primary" @click="reload">刷新</Button>
            <Button type="primary" v-if="checkButton('hardware_bmyh_sqgl_sqfwq')" @click="gotoCtrl(0)">申请服务器</Button>
          </FormItem>
        </Form>
        <hy-table
          highlight-row
          :columns="tableList.columns"
          :data="tableList.data"
          :total="pageOption.total"
          :pageSize="pageOption.pageSize"
          pageType="small"
          show-elevator
          show-sizer
          class="department-apply"
          @on-change="pageChange"
          @on-page-size-change="changePageSize" />
      </Card>
      <Modal v-model="delectState" title="删除确认" width="300" :mask-closable="false">
        <div>您确定删除吗？</div>
        <div slot="footer">
          <Button type="primary" @click="deleteDraft">确定</Button>
          <Button type="text" @click="delectClose">关闭</Button>
        </div>
      </Modal>
    </Content>
  </Layout>
</template>

<script>
import api from '@/api/axiosApi'
import softhardApiList from '@/api/softhardApiList'
import { mapState } from 'vuex'
export default {
  inject:['reload'],
  data () {
    return {
      title:this.$store.state.title,
      searchCondition: {
        name: '',
        range: []
      },
      tableTotal:0,
      pageOption: { //分页参数
        current: 1,
        total: 0,
        pageSize: 10
      },
      delectState:false,
      actId: '',
      tableList: {
        columns: [
          {
            type: 'index',
            title: '序号',
            width: 60,
            align: 'center'
          },
          {
            title: '申请单号',
            key: 'applyNo'
          },
          {
            title: '申请单位',
            key: 'applyOrgname'
          },
          {
            title: '申请人',
            key: 'applyUname'
          },
          {
            title: '申请类别',
            key: 'applyType',
            render(h, params) {
							let text;
							(params.row.applyType=='1') ? (text = '新增') : (text = '变更');
							return h('div', [
								h('span', {}, text)
							])
						}
          },
          {
            title: '申请时间',
            key: 'applyTime'
          },
          {
            title: '申请状态',
            key: 'sname'
          },
          {
            title: '处理环节',
            key: 'stepName'
          },
          {
            title: '操作',
            key: 'address',
            minWidth:120,
            render: (h, params) => {
              const vm = this
              const stepCode = params.row.stepCode
              const id = params.row.age
              const edit = h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                domProps: {
                  innerHTML: '修改'
                },
                style: {
									display:this.checkButton('hardware_bmyh_sqgl_xg')?'inline-block':'none'
								},
                on: {
                  click () {
                    vm.gotoCtrl(1,params);
                  }
                }
              })
              // const submit = h('span', {
              //   class: 'handle',
              //   domProps: {
              //     innerHTML: '提交'
              //   },
              //   on: {
              //     click () {
              //       vm.gotoCtrl(2,params)
              //     }
              //   }
              // })
              const deleteCtrl = h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                domProps: {
                  innerHTML: '删除'
                },
                style: {
									display:this.checkButton('hardware_bmyh_sqgl_sc')?'inline-block':'none'
								},
                on: {
                  click () {
                    vm.gotoCtrl(2,params)
                  }
                }
              })
              const detail = h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                domProps: {
                  innerHTML: '详情'
                },
                style: {
									display:this.checkButton('hardware_bmyh_sqgl_xq')?'inline-block':'none'
								},
                on: {
                  click () {
                    vm.gotoCtrl(3,params)
                  }
                }
              })
              const rewrite = h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                domProps: {
                  innerHTML: '重新填写'
                },
                style: {
                  display:this.checkButton('hardware_bmyh_sqgl_cxtx')?'inline-block':'none',
                  marginTop:'5px'
								},
                on: {
                  click () {
                    vm.gotoCtrl(4,params)
                  }
                }
              })
              switch (stepCode) {
                case "DRAFT":
                  return h('div', [edit, deleteCtrl, detail])
                case "ROBACK":
                  return h('div', [rewrite, detail])
                default:
                  return h('div', [detail])
              }
            }
          }
        ],
        data: []
      },
      categoryList: [{
        value: 1,
        label: '新增'
      }, {
        value: 2,
        label: '变更'
      }],
      typeList: [{
        value: 2,
        label: '类型1'
      }],
      providerList: [{
        value: 3,
        label: '提供方1'
      }]
    }
  },
  mounted(){
    this.getMyApplyList(0);
  },
  methods: {
    // 点击查询按钮
    handleSubmit () {
      alert()
    },
    search(){

    },
    delectClose() { //关闭删除
      this.delectState = false;
    },
    pageChange(num) { //页码改变的回调
      this.pageOption.current = num;
      this.getMyApplyList(0);
    },
    changePageSize(num) { //切换每页条数时的回调
      this.pageOption.pageSize = num;
      this.getMyApplyList(0);
    },
    getMyApplyList(type) { // 查询服务分配管理分页
      if(type==1){
        this.pageOption.current=1;
      }
      this.data = [];
      this.searchCondition.applyStartTime = this.searchCondition.range[0];
      this.searchCondition.applyEneTime = this.searchCondition.range[1];
      var formData = {
        "data": { ...this.searchCondition }, //Object.assign({}, this.serverData),
        "pageNo": this.pageOption.current,
        "pageSize": this.pageOption.pageSize
      };
      api(softhardApiList.getMyApplyList, formData).then((res) => {
        if(res.data.errcode == 0){
          this.tableList.data = res.data.data.list;
          if(this.tableList.data.length>0){
            this.pageOption.pageSize = res.data.data.pageSize;
            this.pageOption.total = res.data.data.total;
            this.pageOption.current = res.data.data.pageNum;
            this.tableList.data.forEach(item=>{
								item.applyTime = item.applyTime.replace("-","年");
                item.applyTime = item.applyTime.replace("-","月");
                item.applyTime = item.applyTime.replace(" ","日 ");
            });
          };
        }else{
          this.$Message.error(res.data.errmsg);
        }
      }, (err) => {
        //dong something...
      })
    },
    deleteDraft() { // 删除
      this.delectState = false;
      api(softhardApiList.deleteDraft,{id:this.actId}).then((res) => {
        if(res.data.errcode == 0){
          this.getMyApplyList();
          console.log(res);
        }else{
          this.$Message.error(res.data.errmsg);
        }
      }, (err) => {
        //dong something...
      })
    },
    // 操作栏点击
    gotoCtrl (idx,data) {
      switch (idx) {
        case 0:
          this.$router.push({//申请服务器
            path: '/department/create/1'
          })
          break
        case 1:
          this.$router.push({//修改服务器
            name: 'create',
            params: {id: 3,departData:data.row}
          })
          break
        case 2://删除服务器
          this.delectState = true;
          this.actId = String(data.row.id);
          break
        case 3://查看详情
          console.log(data);
          this.$router.push({
            name: 'departmentApplyDetail',
            params: {id: 6,departData:data.row}
          })
          break
        case 4://重新提交
          this.$router.push({
            name: 'create',
            params: {id: 2,departData:data.row}
          })
          break
      }
    },
    checkButton(code){
      if(this.authButton.indexOf(code) >= 0){
        return true;
      }else{
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

<style lang='less'>
.department-apply{
  span.handle{
    margin: 0 5px;
    display: inline-block;
    cursor: pointer;
    &:hover{
      color: #57a3f3;
    }
  }
}
</style>
