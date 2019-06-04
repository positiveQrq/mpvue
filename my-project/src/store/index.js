import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    currentTabComponent: 'login',
    labelIndex: 0,
    price: 200,
    configList: ['酷黑套装', '轻奢套装', 'WHUD抬头显示', '14寸中控大屏', '全液晶仪表', 'L2.5级别自动驾驶', '离骚模式',
      '自动泊车辅助', 'LED自动大灯', 'Alcantara座椅', '蓝色皮质座椅', '全景天窗', '真皮座椅', '律动64色氛围灯', '橙色车身颜色', '车联网'
    ],
    label: [
      {
        img: 'A',
        text: '社畜',
        LableConfigList: [0, 2, 3, 4, 5, 7, 12, 13, 15]
      },
      {
        img: 'B',
        text: '夜场贵族',
        LableConfigList: [0, 3, 4, 6, 9, 13, 14, 15]
      },
      {
        img: 'A',
        text: '大尾巴狼',
        LableConfigList: [0, 3, 4, 6, 8, 9, 11, 13, 15]
      },
      {
        img: 'A',
        text: '有证恋爱',
        LableConfigList: [5, 6, 7, 8, 11, 12, 13, 15]
      },
      {
        img: 'A',
        text: '中二病',
        LableConfigList: [0, 2, 5, 6, 7, 9, 11, 15]
      },
      {
        img: 'A',
        text: '白骨精',
        LableConfigList: [2, 3, 4, 6, 10, 11, 13, 15]
      },
      {
        img: 'A',
        text: '单身大佬',
        LableConfigList: [1, 2, 3, 8, 11, 12, 13, 15]
      },
      {
        img: 'A',
        text: '吃货',
        LableConfigList: [1, 2, 3, 4, 8, 11, 12, 15]
      },
      {
        img: 'A',
        text: '隐形贫困人口',
        LableConfigList: [1, 3, 6, 8, 10, 11, 13, 15]
      }
    ]
  },
  mutations: {
    changeComponent (state, view) {
      state.currentTabComponent = view
      console.log(view, state.currentTabComponent)
    },
    changeLabelIndex (state, index) {
      state.labelIndex = index
    },
    setPrice (state, price) {
      state.price = price
    }
  }
})
