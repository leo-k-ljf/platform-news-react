import request from './request'


// 登录
export function getLogin(params) {
    let res = request({
      url: '/api/auth/oauth/token',
      method: 'post',
      data: params
    })
    return res
  }
  
// 初始化用户信息
export function getUser(username){
    let res = request({
        url: '/api/news/user/' + username,
        method: 'get',
    })
    res.then((res) => {
        localStorage.setItem("infoId",res.data.data.infoId)
        localStorage.setItem("userId",res.data.data.id)
        localStorage.setItem("username",res.data.data.username)
    })
}

// 注册
export function register(params){
    return request({
        url: '/api/auth/user/registry',
        method: 'post',
        data: params
    })
}

// 获取用户信息
export function getInfo(infoId){
  return request({
    url: 'api/news/user/info/' + infoId,
    method: 'get',
  })
}

export function putInfo(infoId,params){
  return request({
    url: 'api/news/user/info/'+ infoId,
    method: 'put',
    data: params
  })
}

// 新闻总数
export function getCount(){
  return request({
    url: 'api/news/news/count',
    method: 'get'
  })
}

  // 新闻列表 
  export function getNews(params){
    return request({
      url: '/api/news/news',
      method: 'get',
      params
    })
  }

//新闻内容
export function getContent(id){
  return request({
    url: '/api/news/content/' + id,
    method: 'get' 
  })
}
  
  //评论列表
  export function getCommentList(params){
    return request({
      url: '/api/news/comment/list',
      method: 'get',
      params
    })
  }
  
  // 提交评论
  export function postComment(params){
    return request({
      url: '/api/news/comment',
      method: 'post',
      data: params
    })
  }
  
  //删除评论
  export function  deleteComment(id){
    return request({
      url: '/api/news/comment' + id,
      method: 'delete'
    })
  } 