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