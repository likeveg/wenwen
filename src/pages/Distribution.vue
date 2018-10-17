<template>
  <div>
    <!-- <x-header>分销员申请</x-header> -->
    <group gutter="0px">
      <x-input title="姓名"
               placeholder="请输入用户名"
               placeholder-align="left"
               v-model="username"
               label-width="5"
               required
               should-toast-error
               type="text"></x-input>
      <x-input title="手机号码"
               name="mobile"
               label-width="5"
               placeholder="请输入手机号码"
               placeholder-align="left"
               v-model="mobile"
               keyboard="number"
               required
               should-toast-error
               is-type="china-mobile"
               ref="refMobile"></x-input>
      <x-input title="微信号"
               required
               placeholder=""
               label-width="5"
               should-toast-error
               v-model="wechat"></x-input>
      <x-input title="从事职业"
               required
               label-width="5"
               v-model="job"
               should-toast-error
               type="text"
               placeholder=""></x-input>
      <x-input title="分销渠道"
               required
               label-width="5"
               should-toast-error
               v-model="channel"
               placeholder=""></x-input>
      <x-input title="身份证号码"
               label-width="5"
               required
               v-model="cnum"
               should-toast-error
               placeholder=""></x-input>
      <!-- <group> -->
      <div class="h5ui-group h5ui-uploader">
        <h5 class="h5ui-uploader_title">
          身份证正面
        </h5>
        <div class="h5ui-uploader_btn">
          <div class="h5ui-uploader_btn_border"></div>
          <input type="file"
                 id="certfront"
                 @change="getFileFront"
                 name="uploadFile"
                 accept="image/*">
        </div>
        <ul class="h5ui-uploader_files">
          <li class="h5ui-uploader_files_item">
            <a>
              <img id="imgContentImgFront"
                   width="75px"
                   height="75px">
            </a>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <!-- </group> -->
      <!-- <group> -->
      <div class="h5ui-group h5ui-uploader">
        <h5 class="h5ui-uploader_title">
          身份证反面
        </h5>
        <div class="h5ui-uploader_btn">
          <div class="h5ui-uploader_btn_border"></div>
          <input type="file"
                 @change="getFileBack"
                 name="uploadFile"
                 id="certback"
                 accept="image/*">
        </div>
        <ul class="h5ui-uploader_files">
          <li class="h5ui-uploader_files_item">
            <a>
              <img id="imgContentImgBack"
                   width="75px"
                   height="75px">
            </a>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <!-- </group> -->
      <group>
        <x-textarea title="描述"
                    placeholder="请填写描述"
                    :show-counter="false"
                    required
                    should-toast-error
                    v-model="description"
                    :rows="3"></x-textarea>
      </group>
      <flexbox style="margin:20px 0px">
        <flexbox-item>
        </flexbox-item>
        <flexbox-item>
          <x-button type="primary"
                    @click.native="submit">确定</x-button>
        </flexbox-item>
        <flexbox-item>
        </flexbox-item>
      </flexbox>
    </group>
    <toast v-model="showPositionValue"
           type="text"
           :text="text"
           width="15em"></toast>
  </div>
</template>

<script>
import Share from '@/share/index.js'
import { excuteApis } from '@/apis'
import canvasResize from 'canvas-resize'
export default {
  mixins: [Share],
  data () {
    return {
      iframe: '',
      show15: false,
      username: '',
      mobile: '',
      wechat: '',
      job: '',
      channel: '',
      cnum: '',
      description: '',
      frontTrue: false,
      backTrue: false,
      front: {},
      back: {},
      position: 'default',
      showPositionValue: false,
      text: ''
    }
  },
  mounted () {
    // this.$nextTick(function () {
    //   this.getConfig()
    // })
  },
  methods: {
    readFileFront () {
      var fileDom = document.getElementById('certfront');
      var img = document.getElementById('imgContentImgFront');
      if (fileDom && img) {
        this.fileHandle(fileDom, img)
      }
    },
    readFileBack () {
      var fileDom = document.getElementById('certback');
      var img = document.getElementById('imgContentImgBack');
      if (fileDom && img) {
        this.fileHandle(fileDom, img)
      }
    },
    //文件处理
    fileHandle (fileDom, img) {
      //读取计算机文件
      var file = fileDom.files[0]
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadstart = function () {
      },
        //操作完成
        reader.onload = function (e) {
          //file 对象的属性
          img.setAttribute('src', reader.result)
        }
    },
    getFileFront (e) {
      console.log(11111111)
      e.preventDefault()
      let files
      if (e.dataTransfer) {
        files = e.dataTransfer.files
      } else if (e.target) {
        files = e.target.files
      }
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      if (files[0].type == '') {
        // 第一个参数支持单类型，或多类型，多类型时用竖线分隔，用于生成正则式
        checkFileType('(png|jpg|jpeg|mp4|mov|m4v|ogg)', file, function (fileType) {
          console.log(fileType)
          //'png'
        })
        checkFileType('jpg', file, function (fileType) {
          console.log(fileType)
          //false
        })
      }
      let file = files[0]
      let self = this
      canvasResize(file, {
        crop: false, // 是否裁剪
        quality: 0.5, // 压缩质量  0 - 1
        rotate: 0, // 旋转角度
        callback (baseStr) {
          let filename = '身份证正面'
          let arr = baseStr.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
          }
          self.front = new File([u8arr], filename, { type: mime })
          console.log(self.front)
          self.frontTrue = self.verificationPicFile(self.front)
          if (self.frontTrue) {
            self.readFileFront()
          } else {
            self.front = {}
            self.position = 'middle'
            self.showPositionValue = true
            self.text = '图片大小不能大于2M'
            e.target.value = ''
          }
        }
      })
    },
    getFileBack (e) {
      e.preventDefault()
      let files
      if (e.dataTransfer) {
        files = e.dataTransfer.files
      } else if (e.target) {
        files = e.target.files
      }
      const reader = new FileReader()
      reader.readAsDataURL(files[0])

      if (files[0].type == '') {
        // 第一个参数支持单类型，或多类型，多类型时用竖线分隔，用于生成正则式
        checkFileType('(png|jpg|jpeg|mp4|mov|m4v|ogg)', file, function (fileType) {
          console.log(fileType)
          //'png'
        })
        checkFileType('jpg', file, function (fileType) {
          console.log(fileType)
          //false
        })
      }
      let file = files[0]
      let self = this
      canvasResize(file, {
        crop: false, // 是否裁剪
        quality: 0.5, // 压缩质量  0 - 1
        rotate: 0, // 旋转角度
        callback (baseStr) {
          let filename = '身份证反面'
          let arr = baseStr.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
          }
          self.back = new File([u8arr], filename, { type: mime })
          console.log(self.back)
          self.backTrue = self.verificationPicFile(self.back)
          if (self.backTrue) {
            self.readFileBack()
          } else {
            self.back = {}
            self.position = 'middle'
            self.showPositionValue = true
            self.text = '图片大小不能大于2M'
            e.target.value = ''
          }
        }
      })
    },
    submit () {
      if (this.username === '') {
        this.position = 'middle'
        this.showPositionValue = true
        this.text = '姓名不能为空'
        return
      }
      if (this.mobile === '') {
        this.position = 'middle'
        this.showPositionValue = true
        this.text = '手机号不能为空'
        return
      } else if (this.$refs.refMobile.valid === false) {
        this.position = 'middle'
        this.showPositionValue = true
        this.text = '手机号格式不对'
        return
      }
      if (this.wechat === '') {
        this.position = 'middle'
        this.showPositionValue = true
        this.text = '微信号不能为空'
        return
      }
      if (this.job === '') {
        this.position = 'middle'
        this.showPositionValue = true
        this.text = '从事职业不能为空'
        return
      }
      if (this.channel === '') {
        this.position = 'middle'
        this.showPositionValue = true
        this.text = '分销渠道不能为空'
        return
      }
      if (this.cnum === '') {
        this.position = 'middle'
        this.showPositionValue = true
        this.text = '身份证号码不能为空'
        return
      } else if (this.IdentityCodeValid(this.cnum) === false) {
        this.position = 'middle'
        this.showPositionValue = true
        this.text = '身份证号格式错误'
        return
      }
      if (this.description === '') {
        this.position = 'middle'
        this.showPositionValue = true
        this.text = '描述不能为空'
        return
      }
      let param = {
        name: this.username,
        mobile: this.mobile,
        wechat: this.wechat,
        job: this.job,
        channel: this.channel,
        cnum: this.cnum,
        description: this.description,
        level: this.$store.state.level,
        sex: this.$store.state.sex,
        chief: this.$store.state.chief
      }
      let formData = new FormData()
      formData.append('front', this.front)
      formData.append('back', this.back)
      formData.append('name', this.username)
      formData.append('mobile', this.mobile)
      formData.append('wechat', this.wechat)
      formData.append('job', this.job)
      formData.append('channel', this.channel)
      formData.append('cnum', this.cnum)
      formData.append('description', this.description)
      formData.append('level', this.$store.state.level)
      formData.append('sex', this.$store.state.sex)
      formData.append('status', 'none')
      formData.append('action', 'push')
      const instance = this.$http.create({
        withCredentials: true,
      })
      // console.log(document.cookie)
      // instance.post('/soa-system-authority/salesApply/add', formData, config).then(response => {
      //   console.log(response.data)
      // })
      console.log(formData)
      excuteApis(formData, global.constant.commonApis, 'service', 'add').then(data => {
        console.log(data)
        this.position = 'middle'
        this.showPositionValue = true
        this.text = '申请成功'
        this.$router.go(-1)
      }).catch(error => {
        console.log(11111111111)
        console.log(error.response.data)
        this.position = 'middle'
        this.showPositionValue = true
        this.text = error.response.data.message
      })
    },
    //图片大小验证
    verificationPicFile (file) {
      let fileSize = 0
      let fileMaxSize = 2048
      let fileName = file.name
      console.log(file)
      console.log(222222222)
      console.log(fileName)
      if (fileName) {
        fileSize = file.size
        var size = fileSize / 1024
        if (size > fileMaxSize) {
          file.value = ''
          return false
        } else if (size <= 0) {
          file.value = ''
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/close.less';
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px;
}
</style>
