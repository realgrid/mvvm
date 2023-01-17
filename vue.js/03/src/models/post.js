import rest from '@/globlas/rest';

export default {
    async getPosts() {
        try {
            const res = await rest.get('/posts');
            return Promise.resolve(res);
        } catch (error) {
            console.log(error);
        }

        // TODO API 오류 처리
        return Promise.resolve({data: []});
    },
}