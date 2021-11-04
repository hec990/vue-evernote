import axios from 'axios'
import {Message} from "element-ui";

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = "//note-server.hunger-valley.com"
// 跨域请求数据，携带cookie（用于知道登录状态）
axios.defaults.withCredentials = true

export default function request(url, type = 'GET', data = {}) {
    return new Promise((resolve, reject) => {
        let option = {
            url,
            method: type,
            validateStatus(status) {
                return (status >=200 && status < 300) || status === 400
            }
        }
        if(type.toLowerCase() === 'get') {
            option.params = data
        }else {
            option.data = data
        }
        axios(option).then(res => {
            if(res.status === 200) {
                resolve(res.data)
            }else {
                Message.error(res.data)
                reject(res.data)
            }
        }).catch(()=>{
            Message.error('网络异常')
            reject({msg: '网络异常'})
        })
    })
}