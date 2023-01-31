# MVVM for Vue.js episode 2 - 전역 상태 관리

이 예제는 "episode 1"의 소스에 자료에 이어서 진행됩니다.

## pinia 설치

상태 관리를 위해서 pinia를 설치합니다.

```
npm install pinia
```

## @/main.js

``` js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount('#app')
```

## @store/post.js

``` js
import { defineStore } from "pinia";
import rest from '@/globlas/rest';

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
                const res = await rest.get('/posts');
                this.posts = res.data;
            } catch (error) {
                this.posts = [];
            }
        }
    },
});
```

## @/components/ListComponent.vue

``` html
<template>
    <div style="background: silver;">
        <ul>
            <li v-for="post in postStore.posts" :key="post.id">
                {{ post.title }}
            </li>
        </ul>
    </div>
</template>

<script>
import { usePostStore } from '@/store/post'

export default {
    setup() {
        const postStore = usePostStore();
        return { postStore }
    },
}
</script>
```

## @/components/TableComponent.vue

``` html
<template>
    <div style="background: silver;">
        <table>
            <tr>
                <th>id</th>
                <th>Title</th>
            </tr>
            <tr v-for="post in postStore.posts" :key="post.id">
                <td>{{ post.id }}</td>
                <td>{{ post.title }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import { usePostStore } from '@/store/post'

export default {
    setup() {
        const postStore = usePostStore();
        return { postStore }
    },
}
</script>

<style>
table {
    width: 100%;
    border: 1px solid #444444;
    border-collapse: collapse;
}
th,
td {
    border: 1px solid #444444;
    padding: 10px;
}
</style>
```

## @/components/SummaryComponent.vue

``` html
<template>
    <div>
       Record count: {{ postStore.posts.length }}
    </div>
</template>

<script>
import { usePostStore } from '@/store/post'

export default {
    setup() {
        const postStore = usePostStore();
        return { postStore }
    },
}
</script>
```

## @/views/HomeView.vue

``` html
<template>
    <div>
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
import { usePostStore } from '@/store/post'
import ListComponent from '@/components/ListComponent';
import TableComponent from '@/components/TableComponent';
import SummaryComponent from '@/components/SummaryComponent';

export default {
    components: {
        ListComponent, TableComponent, SummaryComponent,
    },

    setup() {
        const postStore = usePostStore();
        return { postStore }
    },

    mounted() {
        this.postStore.fetchPosts();
    },
}
</script>
```
