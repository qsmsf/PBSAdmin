// content
import {
  SET_RECORDBASE,
  SET_RECORDDISP,
  SET_RECORDPERSON,
  SET_RECORDOTHER,
  SET_RECORDFILES,
  SET_MAPZB,
  SET_RECORDSH,
  SET_RECORDID,
  CLR_RECORDINFO,
  SET_LOC
} from '../mutationTypes'

const state = {
  // 保存第一页数据
  entity: {
    recordId: 0,
    uuid: '',
    recordNo: '',
    recordKyNo: '',
    recordJjNo: '',
    recordAjNo: '',
    kyrName: '',
    kyUnitName: '',
    jjrName: '',
    jjUnitName: '',
    kyUnitId: '',
    bgrId: '',
    bgrName: '',
    recTitle: '',
    recXz: '',
    fsqy: '',
    xcwz: '',
    xczb: '',
    recState: 0,
    xctq: '',
    xcsd: '',
    xcwd: '',
    kyDate: '',
    jjTime: '',
    afTime: '',
    kyksTime: '',
    kyjsTime: '',
    xcfx: '',
    xcgz: '',
    xczk: '',
    bhFlag: 0,
    bhrName: '',
    bhrUnitName: '',
    bhrZw: '',
    bdyy: '',
    bhfs: '',
    xcEast: '',
    xcWest: '',
    xcSouth: '',
    xcNorth: '',
    jzrName: '',
    jzrSex: '',
    jzrBirth: '',
    jzrAddress: '',
    zhrName: '',
    zhrUnitName: '',
    zhrZw: '',
    blrName: '',
    ztrName: '',
    zxrName: '',
    lxrName: '',
    lyrName: '',
    jjrOther: '',
    kysy: '',
    xcms: '',
    shyj: ''
  },
  fileList: []
}

const mutations = {
  // 设置 token 登录名 头像
  [SET_RECORDBASE] (state, data) {
    try {
      state.entity.recordKyNo = data.recordKyNo
      state.entity.recordJjNo = data.recordJjNo
      state.entity.recordAjNo = data.recordAjNo
      state.entity.kyrName = data.kyrName;
      state.entity.kyUnitName = data.kyUnitName;
      state.entity.jjrName = data.jjrName;
      state.entity.jjrOther = data.jjrOther;
      state.entity.jjUnitName = data.jjUnitName;
      state.entity.kyUnitId = data.kyUnitId;
      state.entity.recTitle = data.recTitle;
      state.entity.recXz = data.recXz;
      state.entity.fsqy = data.fsqy;
      state.entity.xcwz = data.xcwz;
      state.entity.xczb = data.xczb;
      state.entity.xctq = data.xctq;
      state.entity.xcsd = data.xcsd;
      state.entity.xcwd = data.xcwd;
      state.entity.kyDate = data.kyDate;
      state.entity.jjTime = data.jjTime;
      state.entity.afTime = data.afTime
      state.entity.kyksTime = data.kyksTime;
      state.entity.kyjsTime = data.kyjsTime;
      state.entity.xcfx = data.xcfx;
      state.entity.xcgz = data.xcgz;
      state.entity.xczk = data.xczk;
      state.entity.bhFlag = data.bhFlag;
      state.entity.bhrName = data.bhrName;
      state.entity.bhrUnitName = data.bhrUnitName;
      state.entity.bhrZw = data.bhrZw;
      state.entity.bdyy = data.bdyy;
      state.entity.bhfs = data.bhfs;
    } catch (err) {
      console.log(err)
    }
  },
  [SET_RECORDDISP] (state, data) {
    try {
      state.entity.kysy = data.kysy;
      state.entity.xcms = data.xcms;
    } catch (err) {
      console.log(err)
    }
  },
  [SET_RECORDPERSON] (state, data) {
    try {
      state.entity.jzrName = data.jzrName;
      state.entity.jzrSex = data.jzrSex;
      state.entity.jzrBirth = data.jzrBirth;
      state.entity.jzrAddress = data.jzrAddress;
      state.entity.zhrName = data.zhrName;
      state.entity.zhrUnitName = data.zhrUnitName;
      state.entity.zhrZw = data.zhrZw;
      state.entity.blrName = data.blrName;
      state.entity.ztrName = data.ztrName;
      state.entity.zxrName = data.zxrName;
      state.entity.lxrName = data.lxrName;
      state.entity.lyrName = data.lyrName;
    } catch (err) {
      console.log(err)
    }
  },
  [SET_RECORDOTHER] (state, data) {
    try {      
      state.entity.uuid = data.uuid;
      state.entity.recordNo = data.recordNo;
      state.entity.bgrId = data.bgrId;
      state.entity.bgrName = data.bgrName;
      state.entity.recordId = data.recordId;
      state.entity.recState = data.recState;
    } catch (err) {
      console.log(err)
    }
  },
  [SET_RECORDFILES] (state, data) {
    try {
      state.fileList = data;
    } catch (err) {
      console.log(err)
    }
  },
  [SET_RECORDID] (state, data) {
    try {
      state.entity.recordId = data;
    } catch (err) {
      console.log(err)
    }
  },
  [SET_MAPZB] (state, data) {
    try {
      state.entity.xczb = data;
    } catch (err) {
      console.log(err)
    }
  },
  [SET_RECORDSH] (state, data) {
    try {
      state.entity.recState = data.recState
      state.entity.shyj = data.shyj
    } catch (err) {
      console.log(err)
    }
  },
  [SET_LOC] (state, data) {
    try {
      state.entity.xcEast = data.xcEast;
      state.entity.xcWest = data.xcWest;
      state.entity.xcSouth = data.xcSouth;
      state.entity.xcNorth = data.xcNorth;
    } catch (err) {
      console.log(err)
    }
  },
  [CLR_RECORDINFO] (state, data) {
    state.entity = {
      recordId: data.recordId,
      uuid: data.uuid,
      recordNo: data.recordNo,
      recordKyNo: data.recordKyNo,
      recordJjNo: data.recordJjNo,
      recordAjNo: data.recordAjNo,
      kyrName: data.kyrName,
      kyUnitName: data.kyUnitName,
      jjrName: data.jjrName,
      jjUnitName: data.jjUnitName,
      kyUnitId: data.kyUnitId,
      bgrId: data.bgrId,
      bgrName: data.bgrName,
      recTitle: data.recTitle,
      recXz: data.recXz,
      fsqy: data.fsqy,
      xcwz: data.xcwz,
      xczb: data.xczb,
      recState: data.recState,
      xctq: data.xctq,
      xcsd: data.xcsd,
      xcwd: data.xcwd,
      kyDate: data.kyDate,
      jjTime: data.jjTime,
      afTime: data.afTime,
      kyksTime: data.kyksTime,
      kyjsTime: data.kyjsTime,
      xcfx: data.xcfx,
      xcgz: data.xcgz,
      xczk: data.xczk,
      bhFlag: data.bhFlag,
      bhrName: data.bhrName,
      bhrUnitName: data.bhrUnitName,
      bhrZw: data.bhrZw,
      bdyy: data.bdyy,
      bhfs: data.bhfs,
      xcEast: data.xcEast,
      xcWest: data.xcWest,
      xcSouth: data.xcSouth,
      xcNorth: data.xcNorth,
      jzrName: data.jzrName,
      jzrSex: data.jzrSex,
      jzrBirth: data.jzrBirth,
      jzrAddress: data.jzrAddress,
      zhrName: data.zhrName,
      zhrUnitName: data.zhrUnitName,
      zhrZw: data.zhrZw,
      blrName: data.blrName,
      ztrName: data.ztrName,
      zxrName: data.zxrName,
      lxrName: data.lxrName,
      lyrName: data.lyrName,
      jjrOther: data.jjrOther,
      kysy: data.kysy,
      xcms: data.xcms,
      shyj: data.shyj
    }
    state.fileList = []
  }
}
const actions = {

}

const getters = {
  GetterEntity: state => {
    return state.entity
  },
  GetterFileList: state => {
    return state.fileList
  },
  GetterRecord: state => {
    return state
  },
  GetterLoc: state => {
    var loc = {
      east: state.entity.xcEast,
      west: state.entity.xcWest,
      south: state.entity.xcSouth,
      north: state.entity.xcNorth
    }
    return loc
  },
  GetterMapLoc: state => {
    return state.entity.xczb
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
