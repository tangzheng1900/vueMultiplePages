import Axios from 'axios'
import Config from '../config/app.js'
import { Toast } from 'vant';

const service = Axios.create({
    baseURL: Config.apiUrl + '/' + Config.apiPrefix,
    headers: {
        'Accept': '*/*'
    },
    timeout: Config.timeout
})


service.defaults.retry = Config.requestFailureRetry;
service.defaults.retryDelay = Config.requestFailureRetryDelay;


service.interceptors.response.use(
    response => {
        const res = response
        if(
            res.config.hasOwnProperty('noInterception')
            && res.config.noInterception
        ){
            return res.data
        }

        if (res.status !== 200) {
            Toast('数据返回出错');
            return Promise.reject('error')
        } else {
            if(res.data.resultCode != 200){
                Toast(res.data.message);
                return Promise.reject('error');
            }
            return res.data.data
        }
    },
    error => {
        Toast("请求未响应");
        return Promise.reject(error)
    }
)

export default service
