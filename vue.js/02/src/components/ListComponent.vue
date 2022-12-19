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
