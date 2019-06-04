<template>
  <div class="config-page">
    <img mode="widthFix" :src="imgUrl + '27_02.jpg'"/>
    <div class="list">
      <img mode="widthFix" :src="imgUrl + '26_01_04.jpg'"/>
      <p class="car"></p>
      <div class="content">
         <p class="labelName">我为最适合我的{{labelName}}配置</p>
         <p class="configName">{{configName}}定价{{price}}</p>
      </div>
    </div>
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
      price: store.state.price,
      labelName: '',
      configName: '',
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
    }
  }
}
</script>

<style lang="less" scoped>
.config-page {
  position: relative;
  .car {
    position:absolute;
    top:17%;
    left:50%;
    transform:translate(-50%);
    width:440rpx;
    height:190rpx;
    background-color:#000;
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
.list {
  width:78%;
  position: absolute;
  top: 3%;
  left: 50%;
  transform: translate(-50%);
  background-color: #fff;
  .content {
    padding: 0 40rpx;
    .labelName {
      font-size: 30rpx;
    }
    .configName {
      position: relative;
      font-size: 40rpx;
      padding-left: 40rpx;
      &:after {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(-50%);
        content:'';
        width: 40rpx;
        border: 1px solid #000; 
      }
    }
  }
}
</style>
