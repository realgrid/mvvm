import { defineStore } from "pinia";
import rest from '@/globlas/rest';

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
            try {
                const res = await rest.get('/posts');
                this.posts = res.data;
            } catch (error) {
                this.posts = [];
            }
        }
    },
});