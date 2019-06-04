<template>
  <div class="home-body">
    <v-login  v-if="currentTabComponent === 'login'"/>
    <v-answer v-if="currentTabComponent === 'answer'"/>
    <v-label v-if="currentTabComponent === 'label'"/>
    <make-price  v-if="currentTabComponent === 'makePrice'"/>
    <configuration-list v-if="currentTabComponent === 'configurationList'"/>
  </div>
</template>

<script>
import store from '@/store/index'
import login from '@/components/login'
import answer from '@/components/answer'
import label from '@/components/label'
import makePrice from '@/components/makePrice'
import configurationList from '@/components/configurationList'
export default {
  components: {
    'v-login': login,
    'v-answer': answer,
    'v-label': label,
    'make-price': makePrice,
    'configuration-list': configurationList
  },
  data () {
    return {
      isLogin: false,
      isAnswer: false
    }
  },
  computed: {
    currentTabComponent () {
      return store.state.currentTabComponent
    }
  },
  created () {
    this.checkIsLogin()
  },
  methods: {
    checkIsLogin () {
      var isLogin = mpvue.getStorageSync('loginStatus')
      if (isLogin) {
        store.commit('changeComponent', 'answer')
      }
    }
  }
}
</script>

<style lang="less">
.img-box {
  img {
    display: block;
  }
}
</style>



