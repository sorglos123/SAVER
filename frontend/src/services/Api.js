import * as axios from 'axios';

export default () => {
    return axios.create({
        baseURL: process.env.VUE_APP_BACKEND || 'http://10.202.131.247:4001/'
    })
}