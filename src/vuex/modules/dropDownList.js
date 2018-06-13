import {
  SET_USERLIST,
  SET_UNITLIST,
  CLR_LIST
} from '../mutationTypes'
import Vue from 'vue'

const state = {
  // 保存第一页数据
  userList: [{label: '无', value: ''}],
  unitList: [{label: '无', value: ''}],
  stateList: [{label: '全部', value: 0},
              {label: '未提交', value: 1001},
              {label: '待审核', value: 1002},
              {label: '审核成功', value: 1003},
              {label: '审核失败', value: 1004}],
  temperList: [{
                value: '40℃',
                label: '40℃'
              }, {
                value: '35℃',
                label: '35℃'
              }, {
                value: '30℃',
                label: '30℃'
              }, {
                value: '25℃',
                label: '25℃'
              }, {
                value: '20℃',
                label: '20℃'
              }, {
                value: '15℃',
                label: '15℃'
              }, {
                value: '10℃',
                label: '10℃'
              }, {
                value: '5℃',
                label: '5℃'
              }, {
                value: '0℃',
                label: '0℃'
              }, {
                value: '-5℃',
                label: '-5℃'
              }],
  humidityList: [{
                value: '0%',
                label: '00%'
              }, {
                value: '10%',
                label: '10%'
              }, {
                value: '20%',
                label: '20%'
              }, {
                value: '30%',
                label: '30%'
              }, {
                value: '40%',
                label: '40%'
              }, {
                value: '50%',
                label: '50%'
              }, {
                value: '60%',
                label: '60%'
              }, {
                value: '70%',
                label: '70%'
              }, {
                value: '80%',
                label: '80%'
              }, {
                value: '90%',
                label: '90%'
              }, {
                value: '100%',
                label: '100%'
              }],
  bdyyList: [{
                value: '事主进入',
                label: '事主进入'
              }, {
                value: '报案人进入',
                label: '报案人进入'
              }, {
                value: '公共区域',
                label: '公共区域'
              }, {
                value: '补勘现场',
                label: '补勘现场'
              }, {
                value: '其他',
                label: '其他'
              }],
  bhfsList: [{
                value: '专人看护现场，防止他人进入',
                label: '专人看护现场，防止他人进入'
              }, {
                value: '设立警戒带，划定禁行区域',
                label: '设立警戒带，划定禁行区域'
              }, {
                value: '封锁出入口',
                label: '封锁出入口'
              }, {
                value: '其他',
                label: '其他'
              }],
  fileTypeList: [{
    label: '中心现场图',
    value: 2001
  }, {
    label: '现场概貌图',
    value: 2002
  }, {
    label: '重点部位图',
    value: 2003
  }, {
    label: '现场制图',
    value: 2004
  }, {
    label: '其他',
    value: 2005
  }, {
    label: '见证人签名',
    value: 2006
  }, {
    label: '现场方位图',
    value: 2007
  }, {
    label: '现场平面图',
    value: 2008
  }]
}

const mutations = {
  // 设置 token 登录名 头像
  [SET_USERLIST] (state, data) {
    try {
      let userList = [{label: '无', value: ''}]
      for (var i = 0; i < data.length; i++) {
        let tmp = {
          label: data[i].label,
          value: data[i].value
        }
        userList.push(tmp)
      }
      state.userList = userList
    } catch (err) {
      console.log(err)
    }
  },
  [SET_UNITLIST] (state, data) {
    try {
      let unitList = [{label: '无', value: ''}]
      for (var i = 0; i < data.length; i++) {
        let tmp = {
          label: data[i].label,
          value: data[i].value
        }
        unitList.push(tmp)
      }
      state.unitList = unitList
    } catch (err) {
      console.log(err)
    }
  },
  [CLR_LIST] (state) {
    state.userList = [{label: '无', value: ''}]
    state.unitList = [{label: '无', value: ''}]
  }
}

const actions = {
  'clearList': function (store) {
    store.commit(CLR_LIST)
  }
}
const getters = {
  GetterUnitState: state => {
    return state.unitList
  },
  GetterUserState: state => {
    return state.userList
  },
  GetterStateList: state => {
    return state.stateList
  },
  GetterTemperList: state => {
    return state.temperList
  },
  GetterHumidityList: state => {
    return state.humidityList
  },
  GetterBdyyList: state => {
    return state.bdyyList
  },
  GetterBhfsList: state => {
    return state.bhfsList
  },
  GetterFileTypeList: state => {
    return state.fileTypeList
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
