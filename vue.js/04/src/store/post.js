import { defineStore } from "pinia";
import post from "@/models/post";

export const usePostStore = defineStore("post", {
    id: "post",

    state: () => ({
        posts: [],
    }),

    actions: {
        async clear() {
            this.posts = [];
        },

        async fetchPosts() {
            const res = await post.getPosts();
            this.posts = res.data;
        }
    },
});