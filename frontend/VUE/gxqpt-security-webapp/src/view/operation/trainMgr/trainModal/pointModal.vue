<template>
    <Modal v-model="showModal" title="培训评价" width="30%" :closable='false' :mask-closable='false'>
        <div style="text-align:center">
            <Form ref="formData" :model="formData" :label-width="70" class="clearfix">
                <Row :gutter="40">
                    <Col span="24">
                        <FormItem label="培训评分" :label-width="72">
                            <hy-rate show-text v-model="formData.score" style="float: left;" :sglValue="20">
                                <span style="color: #f5a623">{{formData.score}}</span>
                            </hy-rate>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="培训意见" :label-width="72" prop="advice">
                            <Input v-model="formData.advice" type="textarea" maxlength="200" :autosize="{minRows: 5,maxRows: 5}" placeholder="限制输入两百个字符以内"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
        <div slot="footer">
            <Button class="modalBtn" type="primary" @click="handleSubmit" size="large">提交</Button>
            <Button class="modalBtn" type="default" @click="showModal = false" size="large">取消</Button>
        </div>
    </Modal>
</template>

<script>
export default {
    data(){
        return{
            showModal: false,
            formData: {
                score: 80,
                advice:''
            }
        }
    },
    methods:{
        handleSubmit() {
            const vm = this
            vm.$refs['formData'].validate((valid) => {
                if(valid) {
                    vm.$emit('on-ok', vm.formData)
                    vm.showModal = false
                } else {
                    vm.$Message.error('表单验证失败!');
                }
            })
        },
        open() {
            this.$refs['formData'].resetFields();
            this.showModal = true
        }
    }
}
</script>

<style scoped>
.ivu-input-wrapper >>> textarea{
    resize: none;
}
</style>
