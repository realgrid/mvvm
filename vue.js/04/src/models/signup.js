export default {
    submit(request) {
        console.log("signup.submit - request:", request);

        return {
            data: {
                // errorCode: 100,
                // errorMessage: "이미 등록된 이메일입니다.",
            },
        }
    },
};