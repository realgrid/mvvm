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
