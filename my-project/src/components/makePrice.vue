<template>
  <div class="config-page">
    <img mode="widthFix" :src="imgUrl + '26_02.jpg'"/>
    <div class="car"></div>
    <p class="labelName">{{labelName}}</p>
    <p class="configName">{{configName}}</p>
    <input v-model="price" class="input" type="text" name="" id="">
    <div class="btn" @click="goNext">打印配置单</div>
  </div>
</template>

<script>
import store from '../store/index'
import {wxRequest, imgUrl} from '../utils/index'
export default {
  data () {
    return {
      label: store.state.label,
      labelIndex: store.state.labelIndex,
      configList: store.state.configList,
      labelName: '',
      configName: '',
      price: '',
      imgUrl: imgUrl
    }
  },
  created () {
    this.getLabel()
    this.setconfigList()
  },
  methods: {
    setconfigList () {
      var labelIndex = this.labelIndex
      var configList = this.configList
      var label = this.label
      var labelConfigList = label[labelIndex].LableConfigList.map(item => {
        return configList[item]
      })
      var len = labelConfigList.length
      var activeIndex = parseInt(Math.random() * len) // 等概率
      this.configName = labelConfigList[activeIndex]
      console.log(labelConfigList, activeIndex, this.configName)
    },
    getLabel () {
      this.labelName = this.label[this.labelIndex].text
      console.log(this.labelName)
    },
    goNext () {
      console.log(wxRequest)
      store.commit('changeComponent', 'configurationList')
      store.commit('setPrice', this.price)
    }
  }
}
</script>

<style lang="less" scoped>
.config-page {
  position: relative;
  .car {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translate(-50%);
    width: 690rpx;
    height: 200rpx;
    background-color: #000;
  }
  .labelName {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%) rotate(-15deg);
    font-size: 40rpx;
    color:red;
  }
  .configName {
    .labelName;
    top: 50%;
  }
  .input {
    .labelName;
    left: 41%;
    top: 68%;
    width: 267rpx;
    height: 50rpx;
    background-color: #000;
    padding-left: 30rpx;
  }
  .btn {
    position: absolute;
    bottom: 15%;
    left: 50%;
    transform: translate(-50%);
    width: 300rpx;
    height: 100rpx;
    background-color: #000;
    color: #fff;
  }
}
</style>
