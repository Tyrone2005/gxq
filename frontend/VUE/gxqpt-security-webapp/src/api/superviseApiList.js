/**
 * 统一监管平台接口文档地址
 * author：liuguangrui
 */

const superviseList = {//统一
    findOrgByUser: {//根据userId获取所有单位列表
        url: '/api/admin/gxqpt/org/findOrgByUser',
        method: 'get'
    },
    findSurvey: {//获取所有关联未处理预警的数量
        url: '/api/supervise/organalysis/findSurvey',
        method: 'post'
    },
    findPublicSuperviseStatus: {//各单位预警状态
        url: '/api/supervise/organalysis/findPublicSuperviseStatus',
        method: 'post'
    },
    findTypeList: {//各单位预警类别情况
        url: '/api/supervise/organalysis/findTypeList',
        method: 'post'
    },
    findPublicHandle: {//各单位预警处理时长对比分析
        url: '/api/supervise/organalysis/findPublicHandle',
        method: 'post'
    },
    fildLevelList: {//各单位预警级别情况
        url: '/api/supervise/organalysis/fildLevelList',
        method: 'post'
    },
    findDpmByUserAndOrg: {//获取所在某单位中的所在部门:
        url: '/api/admin/gxqpt/dpm/findDpmByUserAndOrg',
        method: 'get'
    },
    findDpmByOrg: {//获取所在某单位中的所在部门:
        url: '/api/admin/gxqpt/dpm/findDpmByOrg',
        method: 'get'
    },
    organalysisWarntype: {//单个单位预警类型统计分析:
        url: '/api/supervise/organalysis/warntype',
        method: 'post'
    },
    organalysisWarnlevel: {//单个单位预警级别统计分析:
        url: '/api/supervise/organalysis/warnlevel',
        method: 'post'
    },
    organalysisWarnHandleStatistical: {//单位预警产生、处理情况:
        url: '/api/supervise/organalysis/warnHandleStatistical',
        method: 'get'
    },
    depanalysisWarntype: {//单个部门预警类型统计分析:
        url: '/api/supervise/depanalysis/warntype',
        method: 'post'
    },
    depanalysisWarnlevel: {//单个部门预警级别统计分析:
        url: '/api/supervise/depanalysis/warnlevel',
        method: 'post'
    },
    depanalysisWarnHandleStatistical: {//部门预警产生、处理情况:
        url: '/api/supervise/depanalysis/warnHandleStatistical',
        method: 'get'
    },
    getWarnLedgerList: {//获取预警台账分页列表
        url: '/api/supervise/warnledger/getWarnLedgerList',
        method: 'post'
    },
    getByWarnId: {//获取预警台账分页列表
        url: '/api/supervise/warnledger/getByWarnId',
        method: 'get'
    },
    getProcessMsg: {//根据ID查询预警台账流程信息
        url: '/api/supervise/warnledger/getProcessMsg',
        method: 'get'
    },
    getWarnType: {//查询预警类型
        url: '/api/supervise/warnledger/getWarnType',
        method: 'get'
    },
    findWarnTypeTree: {//获取预警类型树
        url: '/api/supervise/warnledger/findWarnTypeTree',
        method: 'get'
    },
    findAppTypeList: {// 各应用预警类别情况
        url: '/api/supervise/appanalysis/findTypeList',
        method: 'post'
    },
    findDpmByUser: {//根据userId获取所有部门列表
        url: '/api/admin/gxqpt/dpm/findDpmByUser',
        method: 'get'
    },
    departmentLevelList: {//获取各部门预警级别列表
        url: '/api/supervise/depanalysis/departmentLevelList',
        method: 'post'
    },
    departmentTypeList: {//获取部门预警类别列表
        url: '/api/supervise/depanalysis/departmentTypeList',
        method: 'post'
    },
    getWarnHandleLedgerList: {//获取预警处理台账分页列表
        url: '/api/supervise/warnledger/getWarnHandleLedgerList',
        method: 'post'
    },
    getWarnHandleResultLedgerList: {//获取预警处理结果台账分页列表
        url: '/api/supervise/warnledger/getWarnHandleResultLedgerList',
        method: 'post'
    },
    getProcessResultMsg: {//根据ID查询预警台账结果流程信息
        url: '/api/supervise/warnledger/getProcessResultMsg',
        method: 'get'
    },
    findAppList: { // 获取应用列表
        url: '/api/developer/application/findList',
        method: 'get'
    },
    findAppLevelList: {
        url: '/api/supervise/appanalysis/findLevelList',
        method: 'POST'
    },
    findAssociationRules: { // 应用预警关联分析
        url: '/api/supervise/organalysis/findAssociationRules',
        method: 'POST'
    },
    findAssociationChildRules: { // 单个应用关联规则
        url: '/api/supervise/organalysis/findAssociationChildRules',
        method: 'post'
    },
    appanalysisWarnHandleStatistical: { // 单个应用预警状态
        url: '/api/supervise/appanalysis/warnHandleStatistical',
        method: 'get'
    },
    appWarnType: { // 单个应用预警状态
        url: '/api/supervise/appanalysis/warntype',
        method: 'post'
    },
    findPublicContrast: { // 单个应用预警级别
        url: '/api/supervise/organalysis/findPublicContrast',
        method: 'post'
    },
    findContentTop: { // 应用或者单位等的关键词分析
        url: '/api/supervise/organalysis/findContentTop',
        method: 'post'
    },
    findDpmByOrgEnable: { // 根据单位获取部门
        url: '/api/admin/gxqpt/dpm/findDpmByOrgEnable',
        method: 'get'
    },
    findOrgDpmIdenti: { // 获取单位和部门的关联数据
        url: '/api/admin/gxqpt/org/findOrgDpmIdenti',
        method: 'get'
    },
    fairwarnAtatus: { // 领导驾驶舱统计各状态预警数量
        url: '/api/warn/fairwarn/status',
        method: 'get'
    },
    fairwarnRelationship: { // 数博会部门、预警、应用关系
        url: '/api/warn/fairwarn/relationship',
        method: 'get'
    },
    fairwarnApps: { // 各应用预警数量
        url: '/api/warn/fairwarn/apps',
        method: 'get'
    },
    findEmpByDpm: { // 根据部门获取所有人员id--->获取所有用户id
        url: '/api/admin/emp/findUserByDpm',
        method: 'get'
    },
    empTypeList: { // 人员预警类别
        url: '/api/supervise/empanalysis/empTypeList',
        method: 'post'
    },
    empLevelList: { // 人员级别分析
        url: '/api/supervise/empanalysis/empLevelList',
        method: 'post'
    },
    empanalysisWarntype: { // 单个人员预警分析
        url: '/api/supervise/empanalysis/warntype',
        method: 'post'
    },
    empanalysisWarnlevel: { // 单个人员级别
        url: '/api/supervise/empanalysis/warnlevel',
        method: 'post'
    },
    warnHandleStatistical: { // 单个人员处理情况
        url: '/api/supervise/empanalysis/warnHandleStatistical',
        method: 'get'
    },
    fairwarnLevel: { // 统计各级别预警数量
        url: '/api/warn/fairwarn/level',
        method: 'get'
    },
    fairwarnType: { // 统计各类型预警数量
        url: '/api/warn/fairwarn/type',
        method: 'get'
    },
    fairwarnMonths: { // 统计各月份预警数量
        url: '/api/warn/fairwarn/months',
        method: 'get'
    },
    findPublicContrastLevel: { // 级别对比分析
      url: '/api/supervise/organalysis/findPublicContrastLevel',
      method: 'post'
    },
    //权责运行监管配置中心
    getAccrualPage: { // 权责监管分页
        url: '/api/supervise/powersupervise/page',
        method: 'post'
    },
    pageHistory: { // 历史数据
        url: '/api/supervise/storagesupervise/pageHistory',
        method: 'post'
    },
    saveAccrualPage: { // 新建权责监管
        url: '/api/supervise/powersupervise/save',
        method: 'post'
    },
    updateAccrualPage: { // 编辑权责监管
        url: '/api/supervise/powersupervise/update',
        method: 'post'
    },
    deleteAccrualPage: { // 删除权责监管
        url: '/api/supervise/powersupervise/delete',
        method: 'delete'
    },
    //权责监管环节分页
    getAccrualLinkPage: { // 权责监管环节分页
        url: '/api/supervise/powersuperviselink/page',
        method: 'post'
    },
    saveAccrualLinkPage: { // 保存权责监管环节
        url: '/api/supervise/powersuperviselink/save',
        method: 'post'
    },
    updateAccrualLinkPage: { // 编辑权责监管环节
        url: '/api/supervise/powersuperviselink/update',
        method: 'post'
    },
    deleteAccrualLinkPage: { // 删除权责监管环节
        url: '/api/supervise/powersuperviselink/delete',
        method: 'delete'
    },
    updateSortAccrualLinkPage: { // 权责监管环节更新排序
        url: '/api/supervise/powersuperviselink/updateSort',
        method: 'post'
    },
    //接口服务监管
    getServerPage: { // 接口服务监管分页
        url: '/api/supervise/serversupervise/page',
        method: 'post'
    },
    saveServerPage: { // 保存接口服务监管
        url: '/api/supervise/serversupervise/save',
        method: 'post'
    },
    updateServerPage: { // 编辑接口服务监管
        url: '/api/supervise/serversupervise/update',
        method: 'post'
    },
    deleteServerPage: { // 删除接口服务监管
        url: '/api/supervise/serversupervise/delete',
        method: 'delete'
    },
    // 权责类型管理
    findPowerSuperviseTypeTree: { // 获取权责类型树
        url: '/api/supervise/power/findPowerSuperviseTypeTree',
        method: 'get'
    },
    getTypeTreeById: { // 根据id查询权责类型信息
        url: '/api/supervise/power/getById',
        method: 'get'
    },
    overdueById: { //删除权责类型
        url: '/api/supervise/power/overdueById',
        method: 'get'
    },
    saveTypeTree: { //新建保存权责类型
        url: '/api/supervise/power/save',
        method: 'post'
    },
    updateTypeTree: { //修改权责类型
        url: '/api/supervise/power/update',
        method: 'post'
    },
    updateLocation: { //移动权责类型节点位置
        url: '/api/supervise/power/updateLocation',
        method: 'post',
        contentType: 'postparams'
    },
    // 业务应用运行监管配置中心
    pageAppSupervise: { //分页查询应用运行监管配置
        url: '/api/supervise/apprunningsupervise/pageAppSupervise',
        method: 'post'
    },
    // 业务应用数据采集保存
    appOptConfigSaveData: {
        url: '/api/supervise/appOptConfig/saveData',
        method: 'post'
    },
    // 业务、应用数据采集-历史记录列表
    pageInterCallMainList: {
        url: '/api/security/interfaceCall/pageInterCallMainList',
        method: 'post'
    },
    // 业务应用数据采集更新
    appOptConfigUpdateData: {
        url: '/api/supervise/appOptConfig/updateData',
        method: 'post'
    },
    // 业务应用数据采集删除
    appOptConfigDeleteById: {
        url: '/api/supervise/appOptConfig/deleteById',
        method: 'get'
    },
    // 业务应用数据采集详情
    appOptConfigFindById: {
        url: '/api/supervise/appOptConfig/findById',
        method: 'get'
    },
    // 业务应用数据采集历史记录详情
    interfaceCallFindById: {
        url: '/api/security/interfaceCall/findById',
        method: 'get'
    },
    // 业务应用数据采集列表
    appOptConfigPageList: {
        url: '/api/supervise/appOptConfig/pageList',
        method: 'post'
    },
    saveAppSupervise: { //新增应用运行监管配置
        url: '/api/supervise/apprunningsupervise/save',
        method: 'post'
    },
    updateAppSupervise: { //配置修改
        url: '/api/supervise/apprunningsupervise/update',
        method: 'post'
    },
    deleteAppSupervise: { //配置删除
        url: '/api/supervise/apprunningsupervise/delete',
        method: 'get'
    },
    //数据存储监管配置中心
    pageStoragesupervise: { //数据存储配置分页查询
        url: '/api/supervise/storagesupervise/page',
        method: 'post'
    },
    saveStoragesupervise: { //数据存储配置新增
        url: '/api/supervise/storagesupervise/save',
        method: 'post'
    },
    updateStoragesupervise: { //数据存储配置修改
        url: '/api/supervise/storagesupervise/update',
        method: 'post'
    },
    deleteStoragesupervise: { //数据存储配置删除
        url: '/api/supervise/storagesupervise/delete',
        method: 'get'
    },
    //获取单位Id及人员列表
    findOrgByPower: { //获取单位Id
        url: '/api/admin/gxqpt/org/findOrgByPower',
        method: 'get'
    },
    findEmpByOrgId: { //根据单位id获取人员
        url: '/api/admin/emp/findEmpByOrgId',
        method: 'post'
    },
    getWarnMixStatusNum: { // 首页统计数量
        url: '/api/warn/count/getWarnMixStatusNum',
        method: 'get'
    },
}
const superviseApiList = { ...superviseList }

export default superviseApiList
