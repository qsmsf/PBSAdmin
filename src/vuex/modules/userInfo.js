// content
import {
  SET_BASEINFO,
  CLR_BASEINFO,
  SET_PRIVLIST
} from '../mutationTypes'

const state = {
  // 保存第一页数据
  userCode: '',
  userName: '',
  position: '',
  departmentId: '',
  job: '',
  deptCode: '',
  parentId: '',
  deptName: '',
  accessToken: '',
  privList: []
}

const mutations = {
  // 设置 token 登录名 头像
  [SET_BASEINFO] (state, data) {
    try {
      state.userCode = data.userCode;
      state.userName = data.userName;
      state.position = data.position;
      state.departmentId = data.departmentId;
      state.job = data.job;
      state.deptCode = data.deptCode;
      state.parentId = data.parentId;
      state.deptName = data.deptName;
      state.accessToken = data.accessToken;
    } catch (err) {
      console.log(err)
    }
  },
  [CLR_BASEINFO] (state) {
      state.userCode = '';
      state.userName = '';
      state.position = '';
      state.departmentId = '';
      state.job = '';
      state.deptCode = '';
      state.parentId = '';
      state.deptName = '';
      state.accessToken = '';
  },
  [SET_PRIVLIST] (state, data) {
    state.privList = data
  }
}
const actions = {
}

const getters = {
  GetterToken: state => {
    return state.accessToken
  },
  GetterMe: state => {
    return state
  },
  GetterPrivList: state => {
    return state.privList
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
