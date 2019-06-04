<template>
  <div>
    <div class="img-box">
      <img mode="widthFix" :src="imgUrl + '17.jpg'"/>
      <div class="btn" @click="goNext">生成我的配置单{{labelText}}</div>
    </div>
  </div>
</template>

<script>
import store from '../store/index'
import {wxRequest, imgUrl} from '../utils/index'
export default {
  data () {
    return {
      label: store.state.label,
      activeIndex: '',
      labelText: '',
      imgUrl: imgUrl
    }
  },
  onLoad () {
    var label = this.label
    var len = label.length
    this.activeIndex = parseInt(Math.random() * len) // 等概率
    console.log(label, this.activeIndex)
    this.labelText = label[this.activeIndex].text
  },
  methods: {
    setProbability () {
      var Probability = [0.1, 0.2, 0.32, 0.38] // 相加为1即100%
      var a = 0
      var number = Math.random() * 100
      Probability.map((item, index) => {
        console.log(number, a, a + item * 100)
        if (number >= a && number < a + item * 100) {
          console.log(index)
          this.activeIndex = index
        }
        a += item * 100
      })
    },
    goNext () {
      var labelTxt = this.label[this.activeIndex].text
      console.log(wxRequest, labelTxt)
      store.commit('changeComponent', 'makePrice')
      store.commit('changeLabelIndex', this.activeIndex)
    }
  }
}
</script>

<style lang="less" scoped>
.img-box {
  position: relative;
  .btn {
    position: absolute;
    left: 50%;
    bottom: 5%;
    transform: translate(-50%, -50%);
    padding: 10px;
    background-color: #000;
    color: #fff;
  }
}

</style>
