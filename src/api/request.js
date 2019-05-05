import axios from 'axios'
import qs from 'qs'

const instance = axios.create({})

// 添加一个请求拦截器
instance.interceptors.request.use(config => {
  if (config.data && config.method!='get') {
    config.data = qs.stringify(config.data)
  }
  if (localStorage.getItem("token") == null) {
    config.headers.Authorization = 'Basic Y2xpZW50XzI6MTIzNDU2'
  } else {
    config.headers.Authorization = localStorage.getItem("token")
  }
  return config
}, error => {
  return Promise.reject(error);
})

// 添加一个响应拦截器
instance.interceptors.response.use(response => {
  return response
}, error => {
  console.log(error.response)
  return Promise.reject(error);
});

export default instance;
