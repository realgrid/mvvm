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
