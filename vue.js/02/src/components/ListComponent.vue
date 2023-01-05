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
