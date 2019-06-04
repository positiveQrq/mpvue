<script>
import 'animate.css'
import {wxRequest} from './utils/index'
export default {
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */
    // console.log(mpvuePlatform, utils)
    this.checkSession()
  },
  methods: {
    getCode () {
      mpvue.login({
        success: function (res) {
          if (res.code) {
            wxRequest('/action.php', { code: res.code }, (res) => {
              mpvue.setStorageSync('PHPSESSID', res.data.data.PHPSESSID) // 存储自定义登录状态
            })
          } else {
            console.log('获取临时登录凭证失败！' + res.errMsg)
          }
        }
      })
    },
    checkSession () {
      var that = this
      var PHPSESSID = wx.getStorageSync('PHPSESSID')
      mpvue.checkSession({
        success: function () {
          if (PHPSESSID === '') {
            that.getCode()
          }
        },
        fail: function () {
          that.getCode()
        }
      })
    }
  }
}
</script>

<style>
body {
  background-color: #fff;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
image {
  width: 100%;
}

.max-img {
  width: 100%;
  height: 100%;
}

.flex {
  display: flex;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex-around {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.flex-align {
  display: flex;
  align-items: center;
}

.rel {
  position: relative;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.f20 {
  font-size: 20rpx;
}

.f22 {
  font-size: 22rpx;
}

.f24 {
  font-size: 24rpx;
}

.f26 {
  font-size: 26rpx;
}

.f28 {
  font-size: 28rpx;
}

.f30 {
  font-size: 30rpx;
}

.f32 {
  font-size: 32rpx;
}

.f34 {
  font-size: 34rpx;
}

.f36 {
  font-size: 36rpx;
}

.f38 {
  font-size: 38rpx;
}

.f40 {
  font-size: 40rpx;
}

.f42 {
  font-size: 42rpx;
}

.f44 {
  font-size: 44rpx;
}

.f46 {
  font-size: 46rpx;
}

.f48 {
  font-size: 48rpx;
}

.f60 {
  font-size: 60rpx;
}
</style>
