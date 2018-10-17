import {
  base64
} from 'vux'
export default {
  map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
  data() {
    return {}
  },
  methods: {
    isIos() {
      let u = navigator.userAgent
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
      let flag
      if (isiOS) {
        flag = 'IOS'
      } else if (isAndroid) {
        flag = 'Android'
      } else {
        flag = 'H5'
      }
      return flag
    },
    IdentityCodeValid(code) {
      var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
      };
      var tip = ''
      var pass = true

      if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        tip = "身份证号格式错误";
        pass = false;
      } else if (!city[code.substr(0, 2)]) {
        tip = "地址编码错误";
        pass = false;
      } else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
          code = code.split('');
          //∑(ai×Wi)(mod 11)
          //加权因子
          var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          //校验位
          var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
          var sum = 0;
          var ai = 0;
          var wi = 0;
          for (var i = 0; i < 17; i++) {
            ai = code[i];
            wi = factor[i];
            sum += ai * wi;
          }
          var last = parity[sum % 11];
          if (parity[sum % 11] != code[17]) {
            tip = "校验位错误";
            pass = false;
          }
        }
      }
      if (!pass) console.log(tip);
      return pass;
    },
    checkFileType(type, file, back) {
      /**
       * type png jpg mp4 ...
       * file input.change=> this.files[0]
       * back callback(boolean)
       */
      var args = arguments;
      if (args.length != 3) {
        back(0);
      }
      var type = args[0]; // type = '(png|jpg)' , 'png'
      var file = args[1];
      var back = typeof args[2] == 'function' ? args[2] : function () {};
      if (file.type == '') {
        // 如果系统无法获取文件类型，则读取二进制流，对二进制进行解析文件类型
        var imgType = [
          'ff d8 ff', //jpg
          '89 50 4e', //png

          '0 0 0 14 66 74 79 70 69 73 6F 6D', //mp4
          '0 0 0 18 66 74 79 70 33 67 70 35', //mp4
          '0 0 0 0 66 74 79 70 33 67 70 35', //mp4
          '0 0 0 0 66 74 79 70 4D 53 4E 56', //mp4
          '0 0 0 0 66 74 79 70 69 73 6F 6D', //mp4

          '0 0 0 18 66 74 79 70 6D 70 34 32', //m4v
          '0 0 0 0 66 74 79 70 6D 70 34 32', //m4v

          '0 0 0 14 66 74 79 70 71 74 20 20', //mov
          '0 0 0 0 66 74 79 70 71 74 20 20', //mov
          '0 0 0 0 6D 6F 6F 76', //mov

          '4F 67 67 53 0 02', //ogg
          '1A 45 DF A3', //ogg
        ];
        var typeName = [
          'jpg',
          'png',
          'mp4',
          'mp4',
          'mp4',
          'mp4',
          'mp4',
          'm4v',
          'm4v',
          'mov',
          'mov',
          'mov',
          'ogg',
          'ogg',
        ];
        var sliceSize = /png|jpg|jpeg/.test(type) ? 3 : 12;
        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.addEventListener("load", function (e) {
          var slice = e.target.result.slice(0, sliceSize);
          reader = null;
          if (slice && slice.byteLength == sliceSize) {
            var view = new Uint8Array(slice);
            var arr = [];
            view.forEach(function (v) {
              arr.push(v.toString(16));
            });
            view = null;
            console.log(arr.join(' '));
            var idx = arr.join(' ').indexOf(imgType);
            if (idx > -1) {
              back(typeName[idx]);
              console.log(typeName[idx]);
            } else {
              back(false);
            }
          } else {
            back(false);
          }

        });
      } else {
        var type = file.name.match(/\.(\w+)$/)[1];
        back(type);
      }
    },
    // dataurl转换成blob
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {
        type: mime
      });
    }
  }
}
