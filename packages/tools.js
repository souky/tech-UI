import Vue from 'vue'
/*
 * 封装sessionStorage
 * key : 键 string
 * value : 值 object
 * */
Vue.prototype.$setSessionData = function(key,value){
	window.sessionStorage.setItem(key,value);
}
Vue.prototype.$getSessionData = function(key){
	return window.sessionStorage.getItem(key);
}

// 对象解绑定
Vue.prototype.$deepCopy = function(data){
	return JSON.parse(JSON.stringify(data));
}
