<template>
    <div class="body">
        <div class="row">
            <div class="left">
                email
            </div>
            <div class="right">
                <input type="text" v-model="signup.email" style="width: 100%;" />
            </div>
            <p class="error-text">{{ signup.errorEmail }}</p>
        </div>

        <div class="row">
            <div class="left">
                비번
            </div>
            <div class="right">
                <input type="password" v-model="signup.password" style="width: 100%;" />
            </div>
            <p class="error-text">{{ signup.errorPassword }}</p>
        </div>

        <div class="row">
            <div class="left">
                비번확인
            </div>
            <div class="right">
                <input type="password" v-model="signup.passwordConfirm" style="width: 100%;" />
            </div>
            <p class="error-text">{{ signup.errorPasswordConfirm }}</p>
        </div>

        <div class="row">
            <button @click="signup.submit" :disabled="!signup.canSignup" style="margin-top: 32px">가입하기</button>
        </div>
    </div>
</template>

<script>
import { useSignupStore } from '@/store/signup';

export default {
    setup() {
        const signup = useSignupStore();
        return {
            signup: signup,
        }
    },
}
</script>

<style scoped>
.body {
    padding: 16px;
}

.row {
    width: 500px;
    height: 80px;
    word-break: break-all;
    word-wrap: break-word;
}

.left {
    width: 120px;
    height: 36px;
    padding: 8px;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    background: #9FA8DA;
}

.right {
    width: 380px;
    height: 36px;
    padding: 8px;
    float: left;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    background: #C5CAE9;
}

.error-text {
    margin-left: 130px;
    font-size: small;
    color: red;
}
</style>