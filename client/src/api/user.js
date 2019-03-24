import axios from '@/libs/api.request'

// export const signup = ({ username, password }) => {
//   const data = {
//     firstName,
//     lastName,
//     username,
//     password
//   }
//   return axios.request({
//     url: 'users/register',
//     data,
//     method: 'post'
//   })
// }

export const login = ({ email, password }) => {
  const data = {
    email,
    password
  }
  return axios.request({
    url: 'auth/login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'users/profile',
    params: {
      token: token
    },
    method: 'get'
  })
}


// const tokenConfig = {
//   headers: {
//      Authorization: "Bearer " + yourJWTToken
//   }
// }

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}
