<template>
  <div>
    <!-- <x-header>分配兑换码</x-header> -->
    <scroller lock-x
              scrollbar-y
              use-pullup
              :pullup-config="pullupConfig2"
              height="1000px"
              ref="demo2"
              @on-pullup-loading="load2">
      <div class="box2">
        <!-- <p v-for="i in n2"> {{i}}</p> -->
        <!-- <flexbox v-for="i in n2">
          <flexbox-item :span="2">{{i}}</flexbox-item>
          <flexbox-item>占位</flexbox-item>
        </flexbox> -->
        <flexbox v-for="(i, index) in n2"
                 :key="index"
                 class="flexboxdemo">
          <flexbox-item :span="2">
            <div class="flex-qcode-img">
              <img style="width:50px;height50px;position: absolute;left:50%;top:50%;margin-top:-25px;margin-left:-25px;"
                   src="../assets/logo.png" />
            </div>
          </flexbox-item>
          <flexbox-item :span="6">
            <div class="flex-qcode-middle">
              <div>周杰伦</div>
              <div>用户数</div>
              <div>收费用户</div>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-right">
              <div>100</div>
              <div @click="toCheckInfo">分配</div>
            </div>
          </flexbox-item>
          <divider></divider>
        </flexbox>
      </div>
    </scroller>
  </div>
</template>

<script>

export default {
  data () {
    return {
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
    toCheckInfo () {
      console.log(123)
      this.$router.push('CheckInfo')
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
.flex-qcode-img {
  text-align: left;
  height: 100px;
  color: #000;
  border-radius: 4px;
  background-clip: padding-box;
  position: relative;
  font-size: 14px;
}
.flex-qcode-middle {
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
.accountStyle {
  height: 100px;
  line-height: 100px;
  color: blue;
}
</style>
