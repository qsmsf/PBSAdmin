import {
  SET_SYSINFO,
  SET_BASEURL,
  SET_TOKEN
} from '../mutationTypes'

const state = {
  // 保存第一页数据
  baseUrl: '',
  accessToken: '',
  applyID:'0c1d06a15fbf4e7ca7c139644478d081',
  secretKey:'7A15945FFC865185AEB0D8DEE536DF46'
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
    state.baseUrl = url
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
