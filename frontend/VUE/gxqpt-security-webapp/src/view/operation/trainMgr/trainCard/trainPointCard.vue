<template>
    <Card :bordered="false" style="margin-bottom: 30px;">
        <p slot="title">培训反馈</p>
        <div style="text-align:center">
            <Form :model="detail" :label-width="100" class="clearfix">
                <Row :gutter="40">
                    <Col span="24">
                        <FormItem label="培训评分">
                            <hy-rate show-text :value="Number(detail.trainSorce)" style="float: left;" :sglValue="20" disabled>
                                <span style="color: #f5a623">{{detail.trainSorce}}</span>
                            </hy-rate>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="培训意见">
                            <Input :value="detail.trainAdvice" type="textarea" disabled></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
    </Card>
</template>

<script>
export default {
    props:{
        detail: {
            type: Object
        }
    }
}
</script>

<style scoped>
.ivu-form-item >>> .ivu-form-item-content{
    height:auto;
}
.ivu-input-wrapper >>> textarea{
    resize: none;
}
</style>
