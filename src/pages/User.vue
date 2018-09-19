<template>
  <div>
    <!-- <x-header>用户注册详情</x-header> -->
    <div style="text-align:center;font-size:14px;padding:5px">
      {{info}}
    </div>
    <div v-for="(items, index) in eveMonth"
         :key="index">
      <card>
        <div slot="header">
          <flexbox orient="vertical"
                   :gutter="0"
                   style="background-color: #DCDCDC;">
            <flexbox-item>
              <div class="flex-header">{{items.header}}</div>
            </flexbox-item>
            <flexbox-item>
              <div class="flex-header-item">
                <span style="float:left">共计{{items.usernum}}</span>
                <!-- <span v-if="items.iscommission" style="float:right">我要提现</span> -->
              </div>
            </flexbox-item>
          </flexbox>
        </div>
        <div slot="content"
             class="card-padding">
          <flexbox v-for="(item, index) in items.list"
                   :key="index"
                   class="flexboxdemo">
            <flexbox-item :span="2">
              <div class="flex-demo">
                <img style="width:50px;height50px;position: absolute;left:50%;top:50%;margin-top:-25px;margin-left:-25px;"
                     src="../assets/logo.png" />
              </div>
            </flexbox-item>
            <flexbox-item :span="6">
              <div class="flex-middle">
                <div>{{item.name}}</div>
                <div>{{item.school}}</div>
                <div>{{item.address}}</div>
              </div>
            </flexbox-item>
            <flexbox-item>
              <div class="accountStyle">
                <div>{{item.accounttime}}</div>
              </div>
            </flexbox-item>
            <divider></divider>
          </flexbox>
        </div>
      </card>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      info: `我的用户注册人数达到100000人，本月注册用户2000人`,
      eveMonth: [{
        header: '本月',
        usernum: 2000,
        iscommission: false,
        list: [{
          src: '',
          name: '张三',
          school: '云南大学',
          address: '吉林长春',
          accounttime: '08-10 15:30'
        }, {
          src: '',
          name: '李四',
          school: '北京大学',
          address: '吉林长春',
          accounttime: '08-10 15:30'
        }]
      }, {
        header: '八月',
        usernum: 1872,
        iscommission: true,
        list: [{
          src: '',
          name: '王麻子',
          school: '北京大学',
          address: '吉林长春',
          accounttime: '08-10 15:30'
        }, {
          src: '',
          name: '李四',
          school: '清华大学',
          address: '吉林长春',
          accounttime: '08-10 15:30'
        }]
      }]
    }
  },
  methods: {
  }
}
</script>

<style>
.card-padding {
  padding: 5px;
  height: auto;
}
.flexboxdemo {
  border-bottom: 1px solid #dcdcdc;
}
.flex-demo {
  text-align: left;
  height: 100px;
  color: #000;
  border-radius: 4px;
  background-clip: padding-box;
  position: relative;
  font-size: 14px;
}
.flex-middle {
  text-align: left;
  height: 100px;
  color: #000;
  border-radius: 4px;
  background-clip: padding-box;
  position: relative;
  font-size: 14px;
  display: table-cell;
  vertical-align: middle;
}
.flex-right {
  text-align: left;
  height: 100px;
  color: #000;
  border-radius: 4px;
  background-clip: padding-box;
  position: relative;
  font-size: 14px;
  display: table-cell;
  vertical-align: middle;
}
.flex-header {
  height: 25px;
  font-size: 14px;
  font-weight: bold;
  padding: 0px 10px;
}
.flex-header-item {
  height: 25px;
  font-size: 14px;
  padding: 0px 10px;
}
.accountStyle {
  height: 100px;
  line-height: 100px;
}
</style>
