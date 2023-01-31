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
