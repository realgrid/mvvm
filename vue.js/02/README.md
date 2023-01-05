# MVVM for Vue.js episode 2

이 예제는 "episode 1"의 소스에 자료에 이어서 진행됩니다.

## @/components/ListComponent.vue

``` html
<template>
    <div style="background: silver;">
        <ul>
            <li v-for="post in posts" :key="post.id">
                {{ post.title }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ["posts"],
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
            <tr v-for="post in posts" :key="post.id">
                <td>{{ post.id }}</td>
                <td>{{ post.title }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    props: ["posts"],
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
       Record count: {{ posts.length }}
    </div>
</template>

<script>
export default {
    props: ["posts"],
}
</script>
```

## @/views/HomeView.vue

``` html
<template>
    <div>
        <h1>Posts</h1>

        <button @click="posts=[]">Clear</button>
        <br><br>

        <ListComponent :posts="posts" style="height: 200px; overflow: auto;" />
        <br>

        <TableComponent :posts="posts" style="height: 200px; overflow: auto;" />
        <br>

        <SummaryComponent :posts="posts" />
    </div>
</template>

<script>
import rest from '@/globlas/rest';
import ListComponent from '@/components/ListComponent';
import TableComponent from '@/components/TableComponent';
import SummaryComponent from '@/components/SummaryComponent';

export default {
    components: {
        ListComponent, TableComponent, SummaryComponent,
    },

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