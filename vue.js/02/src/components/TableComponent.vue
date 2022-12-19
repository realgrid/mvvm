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
