
<template>
  <Layout>
    <Content>
      <Breadcrumb>
        <!-- <BreadcrumbItem>国信优易</BreadcrumbItem> -->
        <BreadcrumbItem>申请管理</BreadcrumbItem>
      </Breadcrumb>
      <serverCreate :disab="disab"></serverCreate>
    </Content>
  </Layout>
</template>

<script>
// 新增服务的表单
import serverCreate from './../common/serverCreate'
export default {
  components: {
    serverCreate
  },
  data(){
    return{
      disab:true,
    }
  }
}
</script>