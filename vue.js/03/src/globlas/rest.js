import axios from "axios";

const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
});

instance.interceptors.request.use(function (config) {
    // TODO 전처리
    return config;
});

instance.interceptors.response.use(
    function (response) {
        // TODO 후처리 (성공)
        return Promise.resolve(response);
    },

    function (error) {
        // TODO 공통 오류 처리
        return Promise.reject(error);
    }
);

export default instance;
