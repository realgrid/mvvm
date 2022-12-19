# MVVM for Vue.js episode 1

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


## Project setup

```
cd mvvm-01
npm install pinia
npm install axios
```
* 상태 관리를 위해서 pinia를 설치합니다.
* REST API 호출을 위해서 axios를 설치합니다.

## Compiles and hot-reloads for development

```
npm run serve
```

## @/globlas/rest.js

``` js

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

    mounted() {
        this.fetchPosts();
    },

    methods: {
        async fetchPosts() {
            const res = await rest.get('/posts');
            this.posts = res.data;
        },
    },
}
</script>
```