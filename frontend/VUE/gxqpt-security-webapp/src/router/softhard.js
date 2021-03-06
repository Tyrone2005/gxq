/* 软硬件平台 */

// import Vue from 'vue'
// import Router from 'vue-router'
import store from '@/store'
// // 咨询管理
// import serverMgr from '@/view/softhard/youedata/serverMgr'// 国信优易-服务器管理
// import applyMgr from '@/view/softhard/youedata/applyMgr'// 国信优易-申请管理
// import hostInfoLook from '@/view/softhard/youedata/hostInfoLook'// 国信优易-主机信息查看
// import basisDataMaintain from '@/view/softhard/youedata/basisDataMaintain'// 国信优易-基础数据维护
// import server from '@/view/softhard/youedata/server' // 国信优易-服务器管理入口
// import youedataServerDetail from '@/view/softhard/youedata/children/youedataServerDetail' // 国信优易-服务器详情
// import editServer from '@/view/softhard/youedata/children/editServer' // 国信优易-服务器详情
// import applyServerAdd from '@/view/softhard/youedata/children/applyServerAdd' // 国信优易-服务器新增申请
// import applyDeal from '@/view/softhard/youedata/children/applyDeal' // 国信优易-申请处理
// import resource from '@/view/softhard/youedata/children/resource' // 国信优易-资源需求配置
// import allocation from '@/view/softhard/youedata/children/allocation' // 国信优易-分配资源
// import applyCreate from '@/view/softhard/youedata/applyCreate' // 国信优易-分配资源
// import applyDetail from '@/view/softhard/youedata/applyDetail' // 国信优易-分配资源
// // 部门用户
// import departmentServer from '@/view/softhard/department/departmentServer' // 部门用户-服务器管理
// import departmentApply from '@/view/softhard/department/departmentApply' // 部门用户-申请管理
// import department from '@/view/softhard/department/department' // 部门用户，服务器管理入口
// import departmentCreate from '@/view/softhard/department/departmentCreate' // 部门用户-新增申请服务器
// import departmentModify from '@/view/softhard/department/departmentModify' // 部门用户-配置更改
// import departmentDetail from '@/view/softhard/department/departmentDetail' // 部门用户-列表详情
// import departmentApplyDetail from '@/view/softhard/department/departmentApplyDetail' // 部门用户-申请详情
// // 管理员
// import admin from '@/view/softhard/admin/admin' // 管理员-入口
// import adminServer from '@/view/softhard/admin/adminServer' // 管理员-服务器管理
// import adminApply from '@/view/softhard/admin/adminApply' // 管理员-申请管理
// import adminEngine from '@/view/softhard/admin/adminEngine' // 管理员-主机信息查看
// import adminDetail from '@/view/softhard/admin/adminDetail' // 管理员-服务器详情
// import adminCreate from '@/view/softhard/admin/adminCreate' // 管理员-新增申请服务器

// // 高新翼云
// import gxyyApply from '@/view/softhard/gxyy/gxyyApply' // 高新翼云-申请管理
// import engineView from '@/view/softhard/gxyy/engineView' // 高新翼云-申请管理-查看详情
// import engineDeal from '@/view/softhard/gxyy/engineDeal' // 高新翼云-申请管理-处理
// import createEngine from '@/view/softhard/gxyy/createEngine' // 高新翼云-主机信息
// import gxyyAdminEngine from '@/view/softhard/gxyy/adminEngine' // 高新翼云-主机信息管理

// //common
// import changeList from '@/view/softhard/common/changeList' // 变更列表

Vue.use(VueRouter)

const softhardRouter = new VueRouter({
  routes: [
    { // 首页
      path: '/home',
      name: 'home',
      component: resolve => require(['@/view/softhard/home'], resolve)
    },
    {// 存储管理
      path: '/storageMgr',
      name: 'storageMgr',
      component: resolve => require(['@/view/softhard/storageMgr'], resolve),
    },
    {// 存储资源面板
      path: '/storageResView',
      name: 'storageResView',
      component: resolve => require(['@/view/softhard/storageResView'], resolve),
    },
    {// 数据库管理
      path: '/databaseMgr',
      name: 'databaseMgr',
      component: resolve => require(['@/view/softhard/databaseMgr'], resolve),
    },
    {// 数据库资源面板
      path: '/databaseResView',
      name: 'databaseResView',
      component: resolve => require(['@/view/softhard/databaseResView'], resolve),
    },
    {// 计算资源管理
      path: '/resourcesMgr',
      name: 'resourcesMgr',
      component: resolve => require(['@/view/softhard/resourcesMgr'], resolve),
    },
    {// 计算资源面板
      path: '/resourcesResView',
      name: 'resourcesResView',
      component: resolve => require(['@/view/softhard/resourcesResView'], resolve),
    },
    {// 网络带宽管理
      path: '/networkMgr',
      name: 'networkMgr',
      component: resolve => require(['@/view/softhard/networkMgr'], resolve),
    },
    {// 网络带宽面板
      path: '/networkResView',
      name: 'networkResView',
      component: resolve => require(['@/view/softhard/networkResView'], resolve),
    },
    {// 设备监控
      path: '/equipmentMon',
      name: 'equipmentMon',
      component: resolve => require(['@/view/softhard/equipmentMon'], resolve),
    },
    {// 报告查看
      path: '/reportView',
      name: 'reportView',
      component: resolve => require(['@/view/softhard/reportView'], resolve),
    },
    {// 监控详情
      path: '/monitoringDetails',
      name: 'monitoringDetails',
      component: resolve => require(['@/view/softhard/monitoringDetails'], resolve),
    },
    {// 国信优易-服务器管理
      path: '/serverMgr',
      name: 'serverMgr',
      component: resolve => require(['@/view/softhard/youedata/serverMgr'], resolve),
    },
    {// 服务器管理
      path: '/server',
      name: 'server',
      component: resolve => require(['@/view/softhard/youedata/server'], resolve),
      children: [{// 服务器详情
        path: 'detail/:serverId',
        name: 'detail',
        component: resolve => require(['@/view/softhard/youedata/children/youedataServerDetail'], resolve),
      }, {// 修改服务器
        path: 'edit',
        name: 'edit',
        component: resolve => require(['@/view/softhard/youedata/children/editServer'], resolve),
      }, {// 服务器新增申请
        path: 'addApply',
        name: 'addApply',
        component: resolve => require(['@/view/softhard/youedata/children/applyServerAdd'], resolve),
      }, {// 申请处理
        path: 'applyDeal',
        name: 'applyDeal',
        component: resolve => require(['@/view/softhard/youedata/children/applyDeal'], resolve),
      }, {// 资源需求配置
        path: 'resource',
        name: 'resource',
        component: resolve => require(['@/view/softhard/youedata/children/resource'], resolve),
      }, {// 分配资源
        path: 'allocation',
        name: 'allocation',
        component: resolve => require(['@/view/softhard/youedata/children/allocation'], resolve),
      }]
    },
    {// 国信优易-申请管理
      path: '/applyMgr',
      name: 'applyMgr',
      component: resolve => require(['@/view/softhard/youedata/applyMgr'], resolve),
    },
    {// 国信优易-主机信息查看
      path: '/applyCreate',
      name: 'applyCreate',
      component: resolve => require(['@/view/softhard/youedata/applyCreate'], resolve),
    },
    {// 国信优易-主机信息查看
      path: '/hostInfoLook',
      name: 'hostInfoLook',
      component: resolve => require(['@/view/softhard/youedata/hostInfoLook'], resolve),
    },
    {// 国信优易-基础数据维护
      path: '/basisDataMaintain',
      name: 'basisDataMaintain',
      component: resolve => require(['@/view/softhard/youedata/basisDataMaintain'], resolve),
    },
    {// 国信优易-服务器详情
      path: '/applyDetail',
      name: 'applyDetail',
      component: resolve => require(['@/view/softhard/youedata/applyDetail'], resolve),
    },
    {// 部门用户-服务器管理
      path: '/departmentServer',
      name: 'departmentServer',
      component: resolve => require(['@/view/softhard/department/departmentServer'], resolve),
    },
    {// 部门用户-申请管理
      path: '/departmentApply',
      name: 'departmentApply',
      component: resolve => require(['@/view/softhard/department/departmentApply'], resolve),
    },
    {// 部门用户
      path: '/department',
      name: 'department',
      component: resolve => require(['@/view/softhard/department/department'], resolve),
      children: [{// 新增
        path: 'create/:id',
        name: 'create',
        component: resolve => require(['@/view/softhard/department/departmentCreate'], resolve),
      }, {// 配置更改
        path: 'modify/:id',
        name: 'modify',
        component: resolve => require(['@/view/softhard/department/departmentModify'], resolve),
      }, {// 服务器详情
        path: 'detail',
        name: 'detail',
        component: resolve => require(['@/view/softhard/department/departmentDetail'], resolve),
      }, {// 申请详情
        path: 'departmentApplyDetail',
        name: 'departmentApplyDetail',
        component: resolve => require(['@/view/softhard/department/departmentApplyDetail'], resolve),
      }]
    },
    {// 管理员-服务器管理
      path: '/admin',
      name: 'admin',
      component: resolve => require(['@/view/softhard/admin/admin'], resolve),
      children: [{
        path: 'server',
        name: 'server',
        component: resolve => require(['@/view/softhard/admin/adminServer'], resolve),
      }, {
        path: 'adminDetail',
        name: 'adminDetail',
        component: resolve => require(['@/view/softhard/admin/adminDetail'], resolve),
      }, {
        path: 'adminCreate/:id',
        name: 'adminCreate',
        component: resolve => require(['@/view/softhard/admin/adminCreate'], resolve),
      }]
    },
    {// 管理员-申请管理
      path: '/adminApply',
      name: 'adminApply',
      component: resolve => require(['@/view/softhard/admin/adminApply'], resolve),
    },
    {// 管理员-主机信息查看
      path: '/adminEngine',
      name: 'adminEngine',
      component: resolve => require(['@/view/softhard/admin/adminEngine'], resolve),
    },
    {// 高新翼云-申请管理
      path: '/gxyyApply',
      name: 'gxyyApply',
      component: resolve => require(['@/view/softhard/gxyy/gxyyApply'], resolve),
    },
    {// 高新翼云-主机信息管理
      path: '/gxyyAdminEngine',
      name: 'gxyyAdminEngine',
      component: resolve => require(['@/view/softhard/gxyy/adminEngine'], resolve),
    },
    {// 高新翼云-主机信息管理-查看详情
      path: '/engineView/:keyid',
      name: 'engineView',
      component: resolve => require(['@/view/softhard/gxyy/engineView'], resolve),
    },
    {// 高新翼云-主机信息
      path: '/createEngine/:keyid',
      name: 'createEngine',
      component: resolve => require(['@/view/softhard/gxyy/createEngine'], resolve),
    },
    {// 高新翼云-主机信息管理-处理
      path: '/engineDeal/:keyid',
      name: 'engineDeal',
      component: resolve => require(['@/view/softhard/gxyy/engineDeal'], resolve),
    },
    {// 变更列表
	    path: '/changeList/:originId',
	    name: 'changeList',
      component: resolve => require(['@/view/softhard/common/changeList'], resolve),
    },
    {
      path: '',
      redirect: '/home'
    }
  ]
})

softhardRouter.beforeEach((to, from, next) => {
  hy_auth_login("softhard");
  store.commit('GETUSERINFO');//设置用户信息
  // store.dispatch('getAuthButton', to.query.resourceId);//获取权限按钮
	next()
})

export default softhardRouter
