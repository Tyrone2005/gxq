<template>
  <Layout>
    <Content>
      <Breadcrumb>
        <BreadcrumbItem>安全保障平台</BreadcrumbItem>
        <BreadcrumbItem>接口阀值设置</BreadcrumbItem>
      </Breadcrumb>
      <Card>
        <Form :model="searchformData" ref="formValidate" inline :label-width="100">
          <FormItem label="接口名称">
            <Input type="text" v-model="searchformData.apiName"> </Input>
          </FormItem>
          <FormItem label="系统名称">
            <Select v-model="searchformData.appId" filterable style="width: 150px;">
              <Option value="-1">全部</Option>
              <Option v-for="item of moduleNames" :value="item.appId" :key="item.appId">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="设置状态">
            <Select v-model="searchformData.status">
              <Option value="-1">全部</Option>
              <Option value="0">未设置</Option>
              <Option value="1">已设置</Option>
            </Select>
          </FormItem>
          <FormItem :label-width="30">
            <Button type="primary" @click="search" v-if="checkButton('security_interfaces_threshold_config_search')">查询</Button>
            <Button type="primary" @click="batchSet" v-if="checkButton('security_interfaces_threshold_config_batch_settings')">批量设置</Button>
          </FormItem>
        </Form>
        <!--<hy-table @on-select="tableSelected" @on-select-cancel="tableSelectedCancle" border ref="selection" :data="data" :columns="columns" :total="pageOption.total" :page-size="pageOption.pageSize" @on-change="pageChange" @on-page-size-change="changePageSize" show-sizer show-elevator/>-->
        <hy-table @on-selection-change="selectedChange" border ref="selection" :data="data" :columns="columns" :current="pageOption.current" :total="pageOption.total" :page-size="pageOption.pageSize" @on-change="pageChange" @on-page-size-change="changePageSize" show-sizer show-elevator/>
      </Card>
    </Content>
    <Modal @on-visible-change="closeCallBack" v-model="modal" title="接口阀值设置" width="60%" :mask-closable="false">
      <Form class="form-data" ref="interfaceData" :model="interfaceData" :rules="ruleValidate" :label-width="80">
        <div v-show="modalType=='batch'">
          <Table height="250" :columns="batchDataListCol" :data="batchDataList"></Table>
        </div>
        <div v-show="modalType=='single'">
          <FormItem label="接口名称">
            <Input v-model="interfaceData.apiName" disabled></Input>
          </FormItem>
          <FormItem label="接口地址">
            <Input v-model="interfaceData.apiUrl" disabled></Input>
          </FormItem>
        </div>
        <FormItem label="每日上限" prop="upperLimitCountByDay">
          <Col span="8">
          <Input type="text" v-model="interfaceData.upperLimitCountByDay" :maxlength="9">
          <span slot="append">次</span>
          </Input>
          </Col>
          <Col span="16" style="padding-left: 20px;color: #999;"> 0代表无上限，根据实际情况设置最大值（最大为999999999）,如超出则返回对应代码
          </Col>
        </FormItem>
        <FormItem label="预警阀值" prop="errorCountMinute">
          <Col span="8">
          <Input type="text" v-model="interfaceData.errorCountMinute" :maxlength="9">
          <span slot="append">次/5分钟</span>
          </Input>
          </Col>
          <Col span="16" style="padding-left: 20px;color: #999;"> 5分钟内接口错误返回次数（最大为999999999）超过该值则接口黄色预警
          </Col>
        </FormItem>
        <FormItem label="短信通知">
          <i-switch v-model="interfaceData.isSmsNotify" :true-value="1" :false-value="0" @on-change="changeSwitch">
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
        </FormItem>
        <FormItem label="电话号码" prop="mobile" v-if="!!interfaceData.isSmsNotify">
          <Input v-model="interfaceData.mobile" :maxlength="11"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="closeModal">取消</Button>
        <Button type="primary" @click="handleSubmit">确认</Button>
      </div>
    </Modal>
  </Layout>
</template>
<script>
  import api from '@/api/axiosApi'
  import apiList from '@/api/securityApiList'
  import { validateNumber,validatePhone } from '@/api/formValidate'
  import { arrAct } from '@/api/com'
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        modal: false,
        modalType: '', //single:单项设置，batch:批量设置\
        moduleNames: [], //模块名称下拉列表
        pageOption: { //分页配置参数
          current: 1,
          total: 0,
          pageSize: 10
        },
        batchDataListCol: [{
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '接口名称',
            key: 'apiName'
          },
          {
            title: '接口地址',
            key: 'apiUrl'
          }
        ],
        batchDataList: [],//批量选择的数据项
        currentPageSelected:[],//当前页已选择的数据项
        searchformData: {
          appId: "-1",
          status: "-1"
        },
        loading: true,
        interfaceData: {
          upperLimitCountByDay: '0'
        },
        ruleValidate: {
          upperLimitCountByDay: [{
            required: true,
            message: '每日上限不可以为空',
            trigger: 'blur'
          }, {
            validator: validateNumber,
            message: '请输入正确的数值',
            trigger: 'blur'
          }],
          errorCountMinute: [{
            required: true,
            message: '预警阀值不可以为空',
            trigger: 'blur'
          }, {
            validator: validateNumber,
            message: '请输入正确的数值',
            trigger: 'blur'
          }],
          mobile:[{
            required: false,//判断
            message: '电话号码不可以为空',
            trigger: 'blur'
          }, {
            validator: validatePhone,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }]
        },
        columns: [{
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: '接口名称',
            key: 'apiName',
            render: (h, params) => {
              return h('div', [
                h('span', {
                  style: {
                    display: 'inline-block',
                    width: params.column._width * 0.9 + 'px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  },
                  domProps: {
                    title: params.row.apiName
                  }
                }, params.row.apiName)
                // h('Tooltip', {
                //   props: { placement: 'top' }
                // }, [
                //   h('span', {
                //     style: {
                //       display: 'inline-block',
                //       width: params.column._width * 0.9 + 'px',
                //       overflow: 'hidden',
                //       textOverflow: 'ellipsis',
                //       whiteSpace: 'nowrap'
                //     }
                //   }, params.row.apiName),
                //   h('span', {
                //     slot: 'content',
                //     style: { whiteSpace: 'normal', wordBreak: 'break-all', maxHeight: '40vh', overflow: 'auto', display: 'inline-block' }
                //   }, params.row.apiName)
                // ])
              ])
            }
          },
          {
            title: '模块名称',
            key: 'modularName',
            render: (h, params) => {
              return h('div', [
                h('span', {
                  style: {
                    display: 'inline-block',
                    width: params.column._width * 0.9 + 'px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  },
                  domProps: {
                    title: params.row.modularName
                  }
                }, params.row.modularName)
                // h('Tooltip', {
                //   props: { placement: 'top' }
                // }, [
                //   h('span', {
                //     style: {
                //       display: 'inline-block',
                //       width: params.column._width * 0.9 + 'px',
                //       overflow: 'hidden',
                //       textOverflow: 'ellipsis',
                //       whiteSpace: 'nowrap'
                //     }
                //   }, params.row.modularName),
                //   h('span', {
                //     slot: 'content',
                //     style: { whiteSpace: 'normal', wordBreak: 'break-all', maxHeight: '40vh', overflow: 'auto', display: 'inline-block' }
                //   }, params.row.modularName)
                // ])
              ])
            }
          },
          {
            title: '请求方式',
            width: 100,
            key: 'method'
          },
          {
            title: '接口地址',
            key: 'apiUrl',
            render: (h, params) => {
              return h('div', [h('span', {
                  style: {
                    display: 'inline-block',
                    width: params.column._width * 0.9 + 'px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  },
                  domProps: {
                    title: params.row.apiUrl
                  }
                }, params.row.apiUrl)
                // h('Tooltip', {
                //   props: { placement: 'top' }
                // }, [
                //   h('span', {
                //     style: {
                //       display: 'inline-block',
                //       width: params.column._width * 0.9 + 'px',
                //       overflow: 'hidden',
                //       textOverflow: 'ellipsis',
                //       whiteSpace: 'nowrap'
                //     }
                //   }, params.row.apiUrl),
                //   h('span', {
                //     slot: 'content',
                //     style: { whiteSpace: 'normal', wordBreak: 'break-all', maxHeight: '40vh', overflow: 'auto', display: 'inline-block' }
                //   }, params.row.apiUrl)
                // ])
              ])
            }
          },
          {
            title: '每日上限',
            width: 100,
            key: 'upperLimitCountByDay'
          },
          {
            title: '预警阀值（错误）',
            width: 150,
            key: 'errorCountMinute'
          },
          {
            title: '设置状态',
            key: 'status',
            width: 100,
            render(h, params) {
              let text;
              if(params.row.status == 1) {
                text = '已设置';
              } else {
                text = '未设置';
              }
              return h('span', text);
            }
          },
          {
            title: '操作',
            key: 'act',
            width: 100,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    display:this.checkButton('security_interfaces_threshold_config_setting')?'inline-block':'none'
                  },
                  on: {
                    click: () => {
                      this.modalType = 'single';
                      this.modal = true;
                      this.viewInterface(params.row.id);
                    }
                  }
                }, '设置'),
              ]);
            }
          },
        ],
        data: []
      }
    },
    computed:{
      ...mapState([
        'authButton'
      ])
    },
    methods: {
      init() {
        this.getApplication();
      },
      getApplication() {
        api(apiList.getApplication).then((res) => {
          if(res.status == 200) {
            this.moduleNames = res.data.data;
            this.getInterface();
          }
        }, (err) => {
          //do something...
        })
      },
      search() {
        this.pageOption.current=1;
        this.getInterface();
      },
      getInterface() {
        let params = {
          data: this.searchformData,
          pageNo: this.pageOption.current,
          pageSize: this.pageOption.pageSize
        }
        api(apiList.getInterface, params).then((res) => {
          var _this = this;
          this.currentPageSelected = [];
          if(res.status == 200) {
            this.pageOption.total = res.data.data.total;
            if(this.batchDataList.length) {
              this.batchDataList.forEach(function(item) {
                res.data.data.list.forEach(function(node) {
                  if(item.id == node.id) {
                    _this.currentPageSelected.push(item);
                    node._checked = true;
                    return false;
                  }
                })
              })
            }
            this.data = res.data.data.list;
          }
        }, (err) => {
          //do something...
        })
      },
      viewInterface(id) {
        api(apiList.viewInterface, {
          id: id
        }).then((res) => {
          if(res.status == 200) {
            res.data.data.upperLimitCountByDay = res.data.data.upperLimitCountByDay ? res.data.data.upperLimitCountByDay.toString() : '';
            res.data.data.errorCountMinute = res.data.data.errorCountMinute ? res.data.data.errorCountMinute.toString() : '';
            this.interfaceData = res.data.data;
            if(this.interfaceData.isSmsNotify == 1){
              this.ruleValidate.mobile[0].required = true;
            }
          }
        }, (err) => {
          //do something...
        })
      },
      changeSwitch(status){
        this.ruleValidate.mobile[0].required = (this.interfaceData.isSmsNotify == 1) ?　true : false;
      },
      validate(status) {
        alert(status)
      },
      save() {
        //doing...
        let idList = [];
        let selectedIds = [];
        this.batchDataList.forEach(function(item,index){
          selectedIds.push(item.id);
        })
        
        if(this.modalType == 'single') {
          idList.push(this.interfaceData.id);
        } else {
          idList = selectedIds;
        }
        this.interfaceData.idList = idList;
        api(apiList.editInterface, this.interfaceData).then((res) => {
          if(res.status == 200) {
            this.modal = false;
            this.getInterface();
            this.resetSelect();
          }
        }, (err) => {
          //do something...
        })
      },
      handleSubmit() {
        this.$refs.interfaceData.validate((valid) => {
          if(valid) {
            this.save();
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      selectedChange(selection){
        var _this = this;
        function getDiffSelection(arrMin,arrMax){
          var arr = [];
          arr = arr.concat(arrMax);
          arrMin.forEach(function(item1,index1){
            arr.forEach(function(item2,index2){
              if(item1.id == item2.id){
                arrAct.remove(arr,item1,'id');
                return;
              }
            })
          })
          return arr;
        }
        if(selection.length > this.currentPageSelected.length){//增加数据项
          this.batchDataList = this.batchDataList.concat(getDiffSelection(this.currentPageSelected,selection));
        }else{//减少数据项
          getDiffSelection(selection,this.currentPageSelected).forEach(function(item,index){
            arrAct.remove(_this.batchDataList,item,'id');
          })
        }
        this.currentPageSelected = selection;
      },
      closeModal() {
        this.modal = false;
      },
      closeCallBack(status) {
        if(!status) {
          this.$refs['interfaceData'].resetFields();
        }
      },
      batchSet() {
        if(this.batchDataList.length == 0){
          this.$Message.error('请先选择需要统一设置的列!');
        }else{
          this.modalType = 'batch';
          this.modal = true;
        }
      },
      resetSelect() { //重置已选择的ids和接口对象数组
        this.batchDataList = [];
      },
      pageChange(num) { //页码改变的回调
        this.pageOption.current = num;
        this.getInterface();
      },
      changePageSize(num) { //切换每页条数时的回调
        this.pageOption.pageSize = num;
        this.getInterface();
      },
      checkButton(code){
        // return true;
        if(this.authButton.indexOf(code) >= 0){
          return true;
        }else{
          return false;
        }
      }
    },
    created() {
      this.$nextTick(() => {
        this.init();
      })
    }
  }
</script>
<style lang="less" scoped="scoped">
  .ivu-modal {
    .ivu-table-wrapper {
      margin-bottom: 20px;
    }
  }
  
  .form-data /deep/ .ivu-form-item-content {
    display: table;
  }
</style>