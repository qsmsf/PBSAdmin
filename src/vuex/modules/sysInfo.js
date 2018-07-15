import {
  SET_SYSINFO
} from '../mutationTypes'

const state = {
  // 保存第一页数据
  baseUrl: '',
  accessToken: '',
}

const mutations = {
  // 设置 token 登录名 头像
  [SET_SYSINFO] (state, data) {
    try {
      state.baseUrl = data.baseUrl
      state.accessToken = data.accessToken
    } catch (err) {
      console.log(err)
    }
  },
  [SET_BASEURL] (state, url) {
    state.baseUrl = rul
  },
  [SET_TOKEN] (state, token) {
    state.accessToken = token
  }
}

const actions = {
}

const getters = {
  GetterBaseUrl: state => {
    return state.baseUrl
  },
  GetterAccessToken: state => {
    return state.accessToken
  },
  GetterSysInfo: state => {
    return state
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
