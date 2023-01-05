import rest from '@/globlas/rest';

export default {
    getPosts() {
        return rest.get('/posts');
    },
}