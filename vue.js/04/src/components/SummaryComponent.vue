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
