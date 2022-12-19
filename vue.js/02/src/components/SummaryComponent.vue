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
