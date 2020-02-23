import axios from 'axios'

export function register(data) {
    return axios({
        url: process.env.VUE_APP_URL + '/register',
        method:'post',
        data,
        withCredentials: true
    })
}

export  function sendSMS(data) {
    return axios({
        url: process.env.VUE_APP_URL + '/sendsms',
        method:'post',
        data,
        withCredentials: true
    })
}