<template>
  <div>
    <!-- <x-header>分销人员审核信息</x-header> -->
    <scroller use-pullup
              :pullup-config="pullupDefaultConfig"
              @on-pullup-loading="loadMore"
              use-pulldown
              :pulldown-config="pulldownDefaultConfig"
              @on-pulldown-loading="refresh"
              lock-x
              ref="scrollerBottom"
              height="-48">
      <div class="box2">
        <flexbox v-for="(i, index) in checkList"
                 v-if="checkList.length > 0"
                 :key="index"
                 class="flexboxdemo">
          <flexbox-item :span="2">
            <div class="flex-demo">
              <img style="width:50px;height50px;position: absolute;left:50%;top:50%;margin-top:-25px;margin-left:-25px;"
                   src="../assets/logo.png" />
            </div>
          </flexbox-item>
          <flexbox-item :span="6">
            <div class="flex-demo">
              <div style="height:50%; position:relative">
                <p style="position:absolute;bottom:0px;padding:0px;margin:0px">{{i.name}}</p>
              </div>
              <div>{{i.ctime}}</div>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="accountStyle">
              <div @click="toCheckInfo(i.id)">查看详情</div>
            </div>
          </flexbox-item>
          <divider></divider>
        </flexbox>
      </div>
    </scroller>
    <!-- <scroller lock-x
              scrollbar-y
              use-pullup
              :pullup-config="pullupConfig2"
              height="1000px"
              ref="demo2"
              @on-pullup-loading="load2">
      <div class="box2">
        <flexbox v-for="(i, index) in checkList"
                 v-if="checkList.length > 0"
                 :key="index"
                 class="flexboxdemo">
          <flexbox-item :span="2">
            <div class="flex-demo">
              <img style="width:50px;height50px;position: absolute;left:50%;top:50%;margin-top:-25px;margin-left:-25px;"
                   src="../assets/logo.png" />
              {{index}}
            </div>
          </flexbox-item>
          <flexbox-item :span="6">
            <div class="flex-demo">
              <div style="height:50%; position:relative">
                <p style="position:absolute;bottom:0px;padding:0px;margin:0px">{{i.name}}</p>
              </div>
              <div>{{i.ctime}}</div>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="accountStyle">
              <div @click="toCheckInfo">查看详情</div>
            </div>
          </flexbox-item>
          <divider></divider>
        </flexbox>
      </div>
    </scroller> -->
  </div>
</template>

<script>
import { excuteApis } from '@/apis'
const pulldownDefaultConfig = {
  content: '下拉刷新',
  height: 40,
  autoRefresh: false,
  downContent: '下拉刷新',
  upContent: '释放后刷新',
  loadingContent: '正在刷新...',
  clsPrefix: 'xs-plugin-pulldown-'
}
const pullupDefaultConfig = {
  content: '上拉加载更多',
  pullUpHeight: 60,
  height: 40,
  autoRefresh: false,
  downContent: '释放后加载',
  upContent: '上拉加载更多',
  loadingContent: '加载中...',
  clsPrefix: 'xs-plugin-pullup-'
}
export default {
  data () {
    return {
      n2: 10,
      checkList: [],
      pullupDefaultConfig: pullupDefaultConfig,
      pulldownDefaultConfig: pulldownDefaultConfig
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.scrollerBottom.reset({ top: 0 })
    })
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData (cb) {
      let requestParams = {
        sauserid: this.$store.state.userid,
        index: 1,
        size: 10
      }
      excuteApis(requestParams, global.constant.commonApis, 'service', 'auditList').then(data => {
        let res = data.data
        this.checkList = res.rows
      })
    },
    refresh () {
      this.fetchData(data => {
        this.checkList = data.list
        this.$refs.scrollerBottom.enablePullup()
        this.$refs.scrollerBottom.donePulldown()
      })
    },
    loadMore () {
      this.fetchData(data => {
        if (this.checkList.length >= 10) {
          this.$refs.scrollerBottom.disablePullup()
        }
        this.checkList = this.list.concat(data.list)
        this.$refs.scrollerBottom.donePullup()
      })
    },
    toCheckInfo (id) {
      console.log(id)
      // this.$router.push('CheckInfo')
      this.$router.push({
        name: 'CheckInfo',
        params: {
          id: id
        }
      })
    }
  }
}
</script>

<style>
.box2 {
  height: auto;
  overflow: hidden;
}
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
  color: blue;
}
</style>
