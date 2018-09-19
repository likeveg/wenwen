<template>
  <div>
    <div class="vux-demo">
      <h1></h1>
      <img class="logo"
           src="../assets/logo.png">
      <h1></h1>
    </div>
    <group>
      <x-input title="账号"
               v-model="username"
               placeholder="请输入账号"></x-input>
    </group>
    <group>
      <x-input title="密码"
               type="password"
               v-model="password"
               placeholder="请输入密码"></x-input>
    </group>
    <flexbox style="padding-top:20px">
      <flexbox-item>
        <x-button type="primary"
                  @click.native="login">登录</x-button>
      </flexbox-item>
    </flexbox>

  </div>
</template>

<script>
import { excuteApis } from '@/apis'
import { AlertModule } from 'vux'
import share from '@/share'
export default {
  mixins: [share],
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      if (this.username === '' || this.password === '') {
        AlertModule.show({
          title: '提示',
          content: '请输入用户名和密码',
          onShow () {
            console.log('Module: I\'m showing')
          },
          onHide () {
            console.log('Module: I\'m hiding now')
          }
        })
      } else {
        console.log(Util.encode(this.password))
        let requestParams = {
          username: this.username,
          password: Util.encode(this.password)
        }
        excuteApis(requestParams, global.constant.commonApis, 'service', 'login').then(data => {
          console.log(data)
          this.$store.state.userid = data.data.id
          this.$router.push('Main')
        })
      }
    }
  }
}
</script>

<style>
.vux-demo {
  padding-top: 30px;
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px;
}
</style>
