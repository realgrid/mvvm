# MVVM for Vue.js episode 3

이 예제는 "episode 2"의 소스에 자료에 이어서 진행됩니다.

## @/mdoels/post.js

``` js
import rest from '@/globlas/rest';

export default {
    getPosts() {
        return rest.get('/posts');
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
            try {
                const res = await post.getPosts();
                this.posts = res.data;
            } catch (error) {
                this.posts = [];
            }
        }
    },
});
```