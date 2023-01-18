# MVVM for Vue.js episode 3

이 예제는 "episode 2"의 소스에 자료에 이어서 진행됩니다.

## @/models/post.js

``` js
import rest from '@/globlas/rest';

export default {
    async getPosts() {
        try {
            const res = await rest.get('/posts');
            return Promise.resolve(res);
        } catch (error) {
            // 공통 오류처리는 rest 모듈에서 한 번에 처리한다.
            console.log(error);
        }

        // TODO API 오류 처리
        return Promise.resolve({data: []});
    },
}
```

## @/globlas/rest.js

``` js
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
```

## @/store/post.js

``` js
import { defineStore } from "pinia";
import post from "@/models/post";

export const usePostStore = defineStore("post", {
    id: "post",

    state: () => ({
        posts: [],
    }),

    actions: {
        async clear() {
            this.posts = [];
        },

        async fetchPosts() {
            const res = await post.getPosts();
            this.posts = res.data;
        }
    },
});
```
