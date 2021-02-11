import * as axios from 'axios';

export default () => {
    return axios.create({
        baseURL: process.env.VUE_APP_BACKEND || 'http://192.168.178.77:4001/'
    })
}