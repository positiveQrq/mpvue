<template>
  <div class="login-page" v-if="!isLogin">
    <div class="img-box">
      <img mode="widthFix" :src="imgUrl + '1_02.jpg'">
      <img mode="widthFix" :src="imgUrl + '1_03.jpg'">
      <div class="btn-box">
        <img mode="widthFix" :src="imgUrl + '1_04.jpg'">
        <button class="accredit-btn" 
          open-type="getPhoneNumber"
          @getphonenumber="getPhoneNumber">
            微信授权登录
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store/index'
import {wxRequest, imgUrl} from '../utils/index'
export default {
  data () {
    return {
      imgUrl: imgUrl
    }
  },
  methods: {
    getPhoneNumber (e) {
      var detail = e.mp.detail
      if (detail.encryptedData) {
        wxRequest('/action.php?act=auto_send', {
          mobile_encryptedData: detail.encryptedData,
          mobile_iv: detail.iv
        }, (res) => {
          var resData = res.data.data.data
          console.log(resData)
          if (resData.success) {
            mpvue.setStorageSync('loginStatus', true) // 缓存登录状态--
            store.commit('changeComponent', 'answer')
          } else {
            this.modaHint(resData.errmsg)
          }
        })
      }
    },
    modaHint (content = '错误信息') {
      mpvue.showModal({
        showCancel: false, // 是否显示取消按钮
        content: content,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-page {
  .btn-box {
    position: relative;
    .accredit-btn {
      position:absolute;
      bottom: 22%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 300rpx;
      height: 100rpx;
      background-color: #000;
      color: #fff;
    }
  }
}
</style>
