<template>
  <div>
    <div class="login-page" v-if="!isLogin">
      <div class="img-box">
        <img mode="widthFix" src="/static/images/1_02.jpg">
        <img mode="widthFix" src="/static/images/1_03.jpg">
        <div class="btn-box">
          <img mode="widthFix" src="/static/images/1_04.jpg">
          <!-- <div class="accredit-btn" open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber"></div> -->
          <button class="accredit-btn" 
            open-type="getPhoneNumber"
            @getphonenumber="getPhoneNumber">
              微信授权登录
          </button>
        </div>
      </div>
    </div>
    <div class="answer-page" v-if="isLogin && !isAnswer">
      <!-- 第1题 -->
      <div class="question" v-if="questionIndex === 0">
        <img class="animated bounceInDown" mode="widthFix" src="/static/images/2_01.png">
        <div class="answer-box">
          <img class="animated bounceInUp" mode="widthFix" src="/static/images/2_02.png">
          <div v-for="(item, index) in result[questionIndex]" 
            :key="index"
            class="result animated bounceInUp"
            @click="getAnswer(index, item)"
            :class="['result'+ questionIndex +index, index === ActiveIndex ? 'active' : '']"></div>
        </div>
      </div>
      <!-- 第2题 -->
      <div class="question" v-if="questionIndex === 1">
        <img class="animated bounceInDown" mode="widthFix" src="/static/images/9_02.jpg">
        <div class="answer-box">
          <img class="animated bounceInUp" mode="widthFix" src="/static/images/9_03.jpg">
          <div v-for="(item, index) in result[questionIndex]" 
            :key="index"
            class="result result animated bounceInUp"
            @click="getAnswer(index, item)"
            :class="['result'+ questionIndex +index, index === ActiveIndex ? 'active' : '']"></div>
        </div>
      </div>
      <!-- 第3题 -->
      <div class="question" v-if="questionIndex === 2">
        <img class="animated bounceInDown" mode="widthFix" src="/static/images/10_01.jpg">
        <div class="answer-box">
          <img class="animated bounceInUp" mode="widthFix" src="/static/images/10_02.jpg">
          <div v-for="(item, index) in result[questionIndex]" 
            :key="index"
            class="result result animated bounceInUp"
            @click="getAnswer(index, item)"
            :class="['result'+ questionIndex +index, index === ActiveIndex ? 'active' : '']"></div>
        </div>
      </div>
      <!-- 第4题 -->
      <div class="question" v-if="questionIndex === 3">
        <img class="animated bounceInDown" mode="widthFix" src="/static/images/14_01.jpg">
        <div class="answer-box">
          <img class="animated bounceInUp" mode="widthFix" src="/static/images/14_02.jpg">
          <div v-for="(item, index) in result[questionIndex]" 
            :key="index"
            class="result result animated bounceInUp"
            @click="getAnswer(index, item)"
            :class="['result'+ questionIndex +index, index === ActiveIndex ? 'active' : '']"></div>
        </div>
      </div>
      <div class="answer-pop" 
        @click="closePop"
        v-show="isPop">
        <img class="animated bounceInUp" :src="popImg">
      </div>
      <div class="next-btn" v-show="isActive" @click="goNextQuestion"></div>
    </div>
  </div>
</template>

<script>
import {wxRequest} from '../../utils/index'
export default {
  data () {
    return {
      isLogin: false,
      isAnswer: false,
      result: [
        ['渴望', '蓝猫淘气三千问', '小龙人', '还珠格格', '喜羊羊与灰太狼', '春光灿烂猪八戒'],
        ['坐在办公司成为敲键盘的DJ', '想想没接到活儿还是回笼睡觉吧', '带领一票人升职加薪有点小激动',
          '当代焦裕禄，从来不迟到', '到工厂去车间螺帽能奏交响乐', '承包一块田，当养猪界的吴彦祖'],
        ['总有一天能拉一个进来', '已经进去过了，这算通关吧'],
        ['缓兵之计一气儿拖到二十五', '万水千山总是情，三十再结行不行']
      ],
      questionIndex: 0,
      isPop: false,
      isActive: false,
      ActiveIndex: -1,
      selectArr: [],
      popImgArr: [['3_02', '6_02', '', '', '', ''], [], ['11_02', '12_03'], [], [], []],
      popImg: `/static/images/3_02.jpg`
    }
  },
  created () {
    this.checkIsLogin()
  },
  methods: {
    checkIsLogin () {
      var isLogin = mpvue.getStorageSync('loginStatus')
      if (isLogin) {
        this.isLogin = true
      }
    },
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
            this.isLogin = true
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
    },
    getAnswer (index, answer) {
      this.isActive = true
      this.ActiveIndex = index
      this.selectArr.splice(this.questionIndex, 1, answer)
    },
    goNextQuestion () {
      this.isActive = false
      var questionIndex = this.questionIndex
      var ActiveIndex = this.ActiveIndex
      if (questionIndex === 0 || questionIndex === 2) {
        this.popImg = `/static/images/${this['popImgArr'][questionIndex][ActiveIndex]}.jpg`
        this.isPop = true
      } else {
        if (questionIndex === 3) {
          this.submit()
          console.log('111')
        } else {
          this.questionIndex++
        }
      }
      this.ActiveIndex = -1
    },
    closePop () {
      this.isPop = false
      this.questionIndex++
    },
    submit () {
      console.log(this.selectArr)
      // wxRequest('')
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

img {
  display: block;
}
.answer-box {
  position: relative;
  overflow: hidden;
}
.question {
  .result {
    position: absolute;
  }
  .result00 {
    background-color:#000;
    width:290rpx;
    height:286rpx;
    top:0;
    left:3%;
  }
  .result01 {
    background-color:#335a94;
    width:350rpx;
    height:266rpx;
    top:0;
    right:12%;
  }
  .result10 {
    background-color:#000;
    width:270rpx;
    height:226rpx;
    top:10%;
    left:7%;
  }
  .result11 {
    background-color:#000;
    width:270rpx;
    height:256rpx;
    top:11%;
    right:5%;
  }
  .result20 {
    background-color:#000;
    width:270rpx;
    height:226rpx;
    top:10%;
    left:7%;
  }
  .result21 {
    background-color:#000;
    width:270rpx;
    height:256rpx;
    top:11%;
    right:5%;
  }
  .result30 {
    background-color:#000;
    width:270rpx;
    height:226rpx;
    top:10%;
    left:7%;
  }
  .result31 {
    background-color:#000;
    width:270rpx;
    height:256rpx;
    top:11%;
    right:5%;
  }
}
.active {
  border: 2px solid red;
}
.answer-pop {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #cccccca3;
  z-index: 9999;
  img {
    position: absolute;
    bottom: 0;
  }
}
.next-btn {
  position: absolute;
  bottom: 10%;
  width: 100rpx;
  height: 100rpx;
  background-color:#000;
  left: 50%;
  transform: translate(-50%);
}
</style>
