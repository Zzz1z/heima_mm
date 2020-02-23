import axios from 'axios'

// export function loginSMS(data) {
//     return axios({
//         url: process.env.VUE_APP_URL + '/captcha?type=login',
//         method:'post',
//         data,
//         withCredentials: true
//     })
// }

export  function login(data) {
    return axios({
        url: process.env.VUE_APP_URL + '/login',
        method:'post',
        data,
        withCredentials: true
    })
}