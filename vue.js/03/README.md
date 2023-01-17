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
            // TODO 공통 에러 처리
            console.log(error);
        }

        // TODO API 에러 처리
        return Promise.resolve({data: []});
    },
}
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