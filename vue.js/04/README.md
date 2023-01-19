# MVVM for Vue.js episode 4

## @/views/SignupView.vue 레이아웃 설정

``` js
<template>
    <div class="body">
        <div class="row">
            <div class="left">
                email
            </div>
            <div class="right">
                <input type="text" v-model="id" style="width: 100%;" /><br />
            </div>
            <p class="error-text">{{ errorEmail }}</p>
        </div>

        <div class="row">
            <div class="left">
                비번
            </div>
            <div class="right">
                <input type="password" v-model="password" style="width: 100%;" /><br />
            </div>
            <p class="error-text">{{ errorPassword }}</p>
        </div>

        <div class="row">
            <div class="left">
                비번확인
            </div>
            <div class="right">
                <input type="password" v-model="passwordConfirm" style="width: 100%;" /><br />
            </div>
            <p class="error-text">{{ errorPasswordConfirm }}</p>
        </div>

        <div class="row">
            <button style="margin-top: 32px">가입하기</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            passwordConfirm: '',
            errorEmail: '이메일 규칙에 맞지 않습니다.',
            errorPassword: '비밀번호는 6자 이상 입력해주세요.',
            errorPasswordConfirm: '비밀번호가 일치하지 않습니다.',
        }
    }
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
```
