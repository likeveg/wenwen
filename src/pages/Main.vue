<template>
  <div>
    <!-- <group title="闻问分销"
           title-color="#fff"
           class="gridback"
           label-width="5em"
           label-align="center">
      <grid :show-lr-borders="false"
            :show-vertical-dividers="false"
            class="gridback"
            style="border:none">
        <grid-item :label="i.name"
                   :link="i.link"
                   v-for="(i, index) in meaus"
                   :key="index">
          <img slot="icon"
               :src="i.icon">
        </grid-item>
      </grid>
    </group> -->
    <grid :show-lr-borders="false"
          :show-vertical-dividers="false"
          class="gridback">
      <grid-item :link="i.link"
                 v-for="(i, index) in meaus"
                 :key="index">
        <img slot="icon"
             :src="i.icon">
        <span class="grid-color">{{i.name}}</span>
      </grid-item>
    </grid>
    <group>
      <cell :title="title"
            :value="invitation">
        <img slot="icon"
             width="20"
             style="display:block;margin-right:5px;"
             src="../assets/group.png" /></cell>
    </group>
    <card :header="{title:title2}">
      <div slot="content"
           class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r back">
          <div class="midtitle">收入</div>
          <div class="midItem">{{income.total}}</div>
          <div class="midItem2">本月{{income.thisMonth}}</div>
          <div class="midItem3"
               @click="toIncome">查看详情</div>
        </div>
        <div class="vux-1px-r back">
          <div class="midtitle">用户</div>
          <div class="midItem">{{users.total}}</div>
          <div class="midItem2">本月{{users.thisMonth}}</div>
          <div class="midItem3"
               @click="toUserdetaile">查看详情</div>
        </div>
        <div class="vux-1px-r back">
          <div class="midtitle">有效兑换码</div>
          <div class="midItem">{{qcode.total}}</div>
          <div class="midItem2">本月{{users.thisMonth}}</div>
          <div class="midItem3"
               @click="toQcode">查看详情</div>
        </div>
      </div>
    </card>
    <v-chart ref="incomeData"
             :data="incomeData"
             v-if="incomeData.length > 0">
      <v-bar />
      <v-tooltip :show-item-marker="true" />
    </v-chart>
    <v-chart ref="userdata"
             :data="usersData"
             v-if="usersData.length > 0">
      <v-bar />
      <v-tooltip :show-item-marker="true" />
    </v-chart>
  </div>
</template>

<script>
import { excuteApis } from '@/apis'
export default {
  name: 'Main',
  data () {
    return {
      title: '我的邀请码',
      invitation: '',
      title2: '我的战绩',
      income: {},
      users: {},
      qcode: {},
      incomeData: [],
      usersData: [],
      meaus: [{
        name: '分销员申请',
        link: '/distribution',
        icon: '../static/codepen.png'
      }, {
        name: '审核',
        link: '/check',
        icon: '../static/clipboard.png'
      }, {
        name: '绩效',
        link: '/performance',
        icon: '../static/award.png'
      }, {
        name: '统计',
        link: '',
        icon: '../static/bar-chart.png'
      }]
    }
  },
  created () {
    let requestParams = {
      sauserid: this.$store.state.userid
    }
    excuteApis(requestParams, global.constant.commonApis, 'service', 'query').then(data => {
      console.log(data)
      let res = data.data
      this.$store.state.level = res.level
      this.$store.state.sex = res.sex
      this.$store.state.chief = res.chief
      this.invitation = res.invitation
      let marketerid = res.id
      let requestParams = {
        marketerid: marketerid
      }
      excuteApis(requestParams, global.constant.commonApis, 'service', 'income').then(data => {
        let res = data.data
        this.income = res
      })
      excuteApis(requestParams, global.constant.commonApis, 'service', 'users').then(data => {
        let res = data.data
        this.users = res
      })
      excuteApis(requestParams, global.constant.commonApis, 'service', 'qcode').then(data => {
        let res = data.data
        this.qcode = res
      })
      let intRequestParams = {
        marketerid: marketerid,
        month: 6
      }
      excuteApis(intRequestParams, global.constant.commonApis, 'service', 'lastSeveralGross').then(data => {
        let res = data.data
        console.log(res)
        this.incomeData = res
      })
      excuteApis(intRequestParams, global.constant.commonApis, 'service', 'lastSeveralConsumer').then(data => {
        let res = data.data
        console.log(res)
        this.usersData = res
      })
    })
    // this.$http.post('/api/soa-system-authority/service/sales/sauserdetail').then(({ data }) => {
    //   console.log(data)
    // })
  },
  methods: {
    toIncome () {
      this.$router.push('Income')
    },
    toUserdetaile () {
      this.$router.push('User')
    },
    toQcode () {
      this.$router.push('Qcode')
    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '~vux/src/styles/1px.less';
.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}
.gridback {
  text-align: center;
  color: #fff;
  background-color: #1e90ff;
  background-clip: padding-box;
}
.back {
  position: relative;
  height: 100px;
  background-image: url('../assets/back.png');
  background-repeat: no-repeat;
  background-size: 100% 100px;
}
.midtitle {
  height: 24px;
  line-height: 24px;
  color: #fff;
}
.midItem {
  padding-top: 5px;
  font-weight: bold;
}
.midItem2 {
  padding-top: 5px;
}
.midItem3 {
  padding-top: 5px;
  color: #4285b0;
}
.grid-color {
  color: #fff;
}
</style>

