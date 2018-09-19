<template>
  <div>
    <!-- <x-header>兑换码</x-header> -->
    <flexbox style="padding-left:10px;height:40px">
      <flexbox-item :span="7">
        <div class="flex-Qcode">{{info}}</div>
      </flexbox-item>
      <flexbox-item>
        <x-icon type="person-add"
                style="float:left"
                size="25"></x-icon>
        <p style="color:#4285b0;height:30px;line-height:30px;float:right;padding-right:10px"
           @click="toCode">我要分配兑换券</p>
      </flexbox-item>
    </flexbox>
    <div class="space-btn"></div>
    <scroller lock-x
              scrollbar-y
              use-pullup
              :pullup-config="pullupConfig2"
              height="auto"
              ref="demo2"
              @on-pullup-loading="load2">
      <div class="box2-Qcode">
        <!-- <p v-for="i in n2"> {{i}}</p> -->
        <flexbox v-for="i in n2"
                 :key="i"
                 class="flexbox-qcode">
          <flexbox-item :span="2">{{i}}</flexbox-item>
          <flexbox-item style="text-align:right">12121212</flexbox-item>
        </flexbox>
      </div>
    </scroller>
  </div>
</template>

<script>

export default {
  data () {
    return {
      info: `我的有效兑换码为500个`,
      n2: 10,
      pullupConfig2: {
        content: '上拉加载更多',
        downContent: '松开进行加载',
        upContent: '上拉加载更多',
        loadingContent: '加载中...'
      }
    }
  },
  methods: {
    load2 () {
      setTimeout(() => {
        this.n2 += 10
        setTimeout(() => {
          this.$refs.demo2.donePullup()
        }, 100)
        if (this.n2 === 30) { // unload plugin
          setTimeout(() => {
            this.$refs.demo2.disablePullup()
          }, 100)
        }
      }, 2000)
    },
    toCode () {
      this.$router.push('DistributionCode')
    }
  }
}
</script>

<style>
.vux-x-icon {
  fill: #4285b0;
}
.flex-Qcode {
  padding: 5px;
}
.box2-Qcode {
  height: auto;
  padding: 10px;
}
.flexbox-qcode {
  border-bottom: 1px solid #dcdcdc;
  height: 50px;
}
.space-btn {
  background-color: #f0f0f0;
  height: 20px;
}
</style>
