# MVVM for Vue.js episode 5 - 에러처리

## @/globals/rest.js

``` js
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

        // TODO 후처리 (실패)
        return Promise.reject(error);
    }
);

export default instance;
```

## @/models/post.js

``` js
import rest from '@/globlas/rest';

export default {
    async getPosts() {
        let res = ({data: []});

        try {
            res = await rest.get('/posts');
            return Promise.resolve(res);
        } catch (error) {
            // 이곳에서는 시스템 에러처리를 무시하고 로그만 남긴다.
            console.log(error);
        }

        // 레거시 API의 오류 처리 방식이 다른 경우의 가상 시나리오
        if (res.error) {
            res.errorCode = rest.error;
            res.errorMessage = rest.message;
        }

        return Promise.resolve(res);
    },
}
```

## @/store/post.js

``` js
import { defineStore } from "pinia";
import post from "@/models/post";
import router from "@/router";

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

            // 게시판 읽기 권한이 없음을 가상 시나리오로 적용
            const POST_READ_PERMISSION = 100;
            if (res.errorCode === POST_READ_PERMISSION) {
                alert(res.errorMessage);
                router.push("/");
            }
        }
    },
});
```

## @/views/HomeView.vue

```html
<template>
    <div v-if="postStore.posts.length <= 0">
        게시물이 없습니다.
    </div>

    <div v-if="postStore.posts.length > 0">
        <h1>Posts</h1>

        <button @click="postStore.clear()">Clear</button>
        <br><br>

        <ListComponent style="height: 200px; overflow: auto;" />
        <br>

        <TableComponent style="height: 200px; overflow: auto;" />
        <br>

        <SummaryComponent />
    </div>
</template>

<script>
...
</script>
```
