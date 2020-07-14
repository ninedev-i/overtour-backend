import axios from 'axios';
import {Notification} from 'element-ui';

const Axios = axios.create({
    baseURL: 'http://localhost:3333/api/',
});

Axios.interceptors.response.use(
    (response) =>  response,
    (error) => {
        Notification.error({
            title: 'Ошибка',
            message: error.message,
            position: 'bottom-right',
            duration: 0
        })
        return Promise.reject(error);
});

export {Axios};