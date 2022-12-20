# MVVM for Vue.js episode 1

## Node.js 설치

Node.js 설치를 하시지 않은 분들만 설치하시면 됩니다.

[https://nodejs.org/en/](https://nodejs.org/en/)

## Vue CLI 설치

Vue CLI가 설치하지 않은 경우에는 아래와 같이 설치를 합니다.

```
npm install -g @vue/cli
```

## Vue 프로젝트 생성

```
vue create mvvm-01
```
* Vue.js 3.x 버전 선택
* Router 선택

## axios 설치 setup

REST API 호출을 위해서 axios를 설치합니다.

```
cd mvvm-01
npm install axios
```

## Compiles and hot-reloads for development

```
npm run serve
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
        // TODO 후처리 (실패)
        return Promise.reject(error);
    }
);

export default instance;
```

## @/views/HomeView.vue

``` html
<template>
    <div>
        <h1>Posts</h1>

        <button @click="posts=[]">Clear</button>

        <ul>
            <li v-for="post in posts" :key="post.id">
                {{ post.title }}
            </li>
        </ul>
    </div>
</template>

<script>
import rest from '@/globlas/rest';

export default {
    data() {
        return {
            posts: [],
        };
    },

    async mounted() {
        const res = await rest.get('/posts');
        this.posts = res.data;
    },
}
</script>
```
