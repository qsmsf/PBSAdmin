import axios from 'axios';

let base = '';

export const getRecordList = params => { 
	return axios({
	  method: 'get',
	  baseURL: 'http://127.0.0.1:8081',
	  url: '/records/getRecentRecordList',
	  headers: {
	  	'content-type': 'application/x-www-form-urlencoded',
	    filter: params
	  }});
};

export const requestLogin = params => { 
	return axios.post(`${base}/login`, params).then(res => res.data); 
};

export const getUserList = params => { 
	return axios.get(`${base}/user/list`, { params: params }); 
};

export const getUserListPage = params => { 
	return axios.get(`${base}/user/listpage`, { params: params }); 
};

export const removeUser = params => { 
	return axios.get(`${base}/user/remove`, { params: params }); 
};

export const batchRemoveUser = params => { 
	return axios.get(`${base}/user/batchremove`, { params: params }); 
};

export const editUser = params => { 
	return axios.get(`${base}/user/edit`, { params: params }); 
};

export const addUser = params => { 
	return axios.get(`${base}/user/add`, { params: params }); 
};