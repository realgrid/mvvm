import rest from '@/globlas/rest';

export default {
    async getPosts() {
        let res = ({data: []});

        try {
            res = await rest.get('/posts');
            return Promise.resolve(res);
        } catch (error) {
            // 이곳에서는 시스템 에러처리를 무시하고 로그만 남긴다.
            console.log(error);
        }

        // 레거시 API의 오류 처리 방식이 다른 경우의 가상 시나리오
        if (res.error) {
            res.errorCode = rest.error;
            res.errorMessage = rest.message;
        }

        return Promise.resolve(res);
    },
}