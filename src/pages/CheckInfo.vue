<template>
  <div>
    <!-- <x-header>分销员申请</x-header> -->
    <group gutter="0px">
      <x-input title="姓名"
               placeholder-align="left"
               label-width="5"
               novalidate
               disabled
               :show-clear="false"
               :value="auditList.name"></x-input>
      <x-input title="手机号码"
               name="mobile"
               placeholder-align="left"
               disabled
               label-width="5"
               is-type="china-mobile"
               :value="auditList.mobile"></x-input>
      <x-input title="微信号"
               label-width="5"
               disabled
               :value="auditList.wechat"></x-input>
      <x-input title="从事职业"
               label-width="5"
               disabled
               :value="auditList.job"></x-input>
      <x-input title="分销渠道"
               label-width="5"
               disabled
               :value="auditList.channel"></x-input>
      <x-input title="身份证号码"
               type="text"
               label-width="5"
               disabled
               :value="auditList.cnum"></x-input>
      <card :header="{title: title}">
        <img slot="header"
             v-for="(item, index) in list"
             :key="index"
             :src="item.src"
             style="width:100px;display:block;float:left"
             @click="show(index)">
      </card>
      <x-textarea title="描述"
                  :show-counter="false"
                  disabled
                  autosize
                  :value="auditList.description"></x-textarea>
      <group>
        <popup-radio title="是否通过"
                     :options="options"
                     v-model="isTrue"
                     placeholder="请选择"></popup-radio>
      </group>
      <group>
        <x-textarea title="审核意见"
                    placeholder="请填写审核意见"
                    :show-counter="false"
                    v-model="reason"
                    :rows="3"></x-textarea>
      </group>
      <flexbox style="margin:20px 0px">
        <flexbox-item>
        </flexbox-item>
        <flexbox-item>
          <x-button type="primary"
                    action-type="button"
                    @click.native="audit(auditList.id)">确定</x-button>
        </flexbox-item>
        <flexbox-item>
        </flexbox-item>
      </flexbox>
      <div v-transfer-dom>
        <previewer :list="list"
                   ref="previewer"
                   @on-index-change="logIndexChange"></previewer>
      </div>
    </group>
    <toast v-model="showPositionValue"
           type="text"
           :text="text"></toast>
  </div>
</template>

<script>
import { excuteApis } from '@/apis'
export default {
  data () {
    return {
      isTrue: '',
      options: ['通过', '不通过'],
      title: '身份证正反面',
      auditList: [],
      list: [], // 身份证正反面
      reason: '',
      position: 'default',
      showPositionValue: false,
      text: ''
    }
  },
  created () {
    let id = this.$route.params.id //获取路由参数，申请记录id
    this.fetchData(id)
  },
  methods: {
    fetchData (id) {
      let requestParams = {
        id: id
      }
      excuteApis(requestParams, global.constant.commonApis, 'service', 'detail').then(data => {
        let res = data.data
        console.log(2222222222222)
        console.log(res)
        this.auditList = res
        let front = {
          src: `C:/wenwen/fujian/${this.auditList.front.path}`
        }
        let back = {
          src: `C:/wenwen/fujian/${this.auditList.back.path}`
        }
        this.list.push(front)
        this.list.push(back)
      })
    },
    show (index) {
      this.$refs.previewer.show(index)
    },
    logIndexChange (arg) {
      console.log(arg)
    },
    audit (id) { // 审核
      let isAudit
      let action
      if (this.isTrue === '') {
        this.position = 'middle'
        this.showPositionValue = true
        this.text = '请选择是否通过'
        return
      } else {
        if (this.isTrue === '通过') {
          isAudit = 'success'
          action = 'finish'
        } else {
          isAudit = 'fail'
          action = 'return'
        }
      }
      if (this.reason === '') {
        this.position = 'middle'
        this.showPositionValue = true
        this.text = '请填写审核意见'
        return
      }
      let requestParams = {
        id: id,
        reason: this.reason,
        status: isAudit,
        action: action
      }
      let formData = new FormData()
      formData.append('front', this.auditList.front)
      formData.append('back', this.auditList.front)
      formData.append('name', this.auditList.name)
      formData.append('mobile', this.auditList.mobile)
      formData.append('wechat', this.auditList.wechat)
      formData.append('job', this.auditList.job)
      formData.append('channel', this.auditList.channel)
      formData.append('cnum', this.auditList.cnum)
      formData.append('description', this.auditList.description)
      formData.append('level', this.$store.state.level)
      formData.append('sex', this.$store.state.sex)
      formData.append('status', isAudit)
      formData.append('action', action)
      formData.append('reason', this.reason)
      formData.append('id', id)
      excuteApis(formData, global.constant.commonApis, 'service', 'update').then(data => {
        this.position = 'middle'
        this.showPositionValue = true
        this.text = '审核成功'
        this.$router.go(-1)
      }).catch(error => {
        console.log(1111111)
        this.position = 'middle'
        this.showPositionValue = true
        this.text = '服务异常'
      })
    },
  }

}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/close.less';
.ximg-demo {
  width: 50px;
  height: auto;
}
</style>
