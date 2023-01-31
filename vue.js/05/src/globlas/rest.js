import axios from "axios";
import router from "@/router";

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
        switch (error.response.status) {
            case 401:
                alert("로그인이 필요합니다.");
                router.push("/login");
                break;

            default:
                router.push("/system-error");
                break;
        }

        // TODO 공통 오류 처리
        return Promise.reject(error);
    }
);

export default instance;
