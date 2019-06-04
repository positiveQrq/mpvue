const baseURL = process.env.API_BASE_URL
export const imgUrl = process.env.IMG_URL
export function wxRequest (url, data, fn, method = 'GET') {
  var header = {}
  if (!mpvue.getStorageSync('PHPSESSID')) {
    header = {
      'Content-Type': 'application/json'
    }
  } else {
    header = {
      'Cookie': 'PHPSESSID=' + wx.getStorageSync('PHPSESSID'),
      'content-type': 'application/x-www-form-urlencoded'
    }
  }
  mpvue.request({
    url: baseURL + url,
    method: method,
    data: data,
    header: header,
    success: function (res) {
      fn(res)
    }
  })
}

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export default {
  formatNumber,
  formatTime,
  wxRequest,
  imgUrl
}
