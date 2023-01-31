import { defineStore } from "pinia";
import post from "@/models/post";
import router from "@/router";

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

            // 게시판 읽기 권한이 없음을 가상 시나리오로 적용
            const POST_READ_PERMISSION = 100;
            if (res.errorCode === POST_READ_PERMISSION) {
                alert(res.errorMessage);
                router.push("/");
            }
        }
    },
});