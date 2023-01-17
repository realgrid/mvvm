import rest from '@/globlas/rest';

export default {
    async getPosts() {
        try {
            const res = await rest.get('/posts');
            return Promise.resolve(res);
        } catch (error) {
            // TODO 공통 에러 처리
            console.log(error);
        }

        // TODO API 에러 처리
        return Promise.resolve({data: []});
    },
}