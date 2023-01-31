# MVVM for Vue.js episode 4 - 회원가입

## @/views/SignupView.vue (레이아웃 설정)

``` html
<template>
    <div class="body">
        <div class="row">
            <div class="left">
                email
            </div>
            <div class="right">
                <input type="text" v-model="id" style="width: 100%;" />
            </div>
            <p class="error-text">{{ errorEmail }}</p>
        </div>

        <div class="row">
            <div class="left">
                비번
            </div>
            <div class="right">
                <input type="password" v-model="password" style="width: 100%;" />
            </div>
            <p class="error-text">{{ errorPassword }}</p>
        </div>

        <div class="row">
            <div class="left">
                비번확인
            </div>
            <div class="right">
                <input type="password" v-model="passwordConfirm" style="width: 100%;" />
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

## @/models/signup.js

회원 가입 처리는 테스트를 위해서 테스트 코드를 사용하도록 하겠습니다.

``` js
export default {
    submit(request) {
        console.log("signup.submit - request:", request);

        return {
            data: {
                // TODO: 에러 테스트 할 때는 아래 코드를 사용합니다.
                // errorCode: 100,
                // errorMessage: "이미 등록된 이메일입니다.",
            },
        }
    },
};
```

## @/store/signup.js (pinia 기본 구조)

``` js
import { defineStore } from "pinia";

export const useSignupStore = defineStore("signup",  {
    id: "signup",

    state: () => ({
        // 상태 변수들
    }),

    getters: {
        // 읽기 속성들
        // computed처럼 계산이 필요한 경우에도 활용
    },

    actions: {
        // 상태 변경 요청
    },
});
```

## @/store/signup.js (완성)

``` js
import { defineStore } from "pinia";
import router from "@/router";
import signup from "@/models/signup";

export const useSignupStore = defineStore("signup",  {
    id: "signup",

    state: () => ({
        email: "",
        password: "",
        passwordConfirm: "",
    }),

    getters: {
        errorEmail() {
            if (this.email.length == 0) return "이메일을 입력해주세요.";
            if (!checkEmail(this.email)) return "이메일 형식이 잘못되었습니다.";
            return "";
        },

        errorPassword() {
            if (this.password.length == 0) return "비밀번호를 입력해주세요.";
            if (this.password.length < 6) return "비밀번호는 6자 이상 입력해주세요.";
            return "";
        },

        errorPasswordConfirm() {
            if (this.passwordConfirm.length == 0) return "비밀번호를 입력해주세요.";
            if (this.passwordConfirm.length < 6) return "비밀번호는 6자 이상 입력해주세요.";
            if (this.passwordConfirm !== this.password) return "비밀번호가 일치하지 않습니다.";
            return "";
        },

        canSignup() {
            return (this.email != "") &&
                (this.errorEmail === "") &&
                (this.errorPassword === "") &&
                (this.errorPasswordConfirm === "");
        },
    },

    actions: {
        async submit() {
            const response = await signup.submit(this.$state);

            if (response.data.errorCode) {
                alert(response.data.errorMessage);
                return;
            }

            alert("회원가입이 완료되었습니다.");
            router.push({ path: '/'});
        },
    },
});

function checkEmail(email) {
    try {
        let pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        return (pattern.test(email));
    } catch (error) {
        return false;
    }
}
```

## @/router/index.js (/signup 경로 추가)

``` js
...
const routes = [
    ...
    {
        path: '/signup',
        component: () => import('../views/SignupView.vue')
    }
]
...
```

## @/views/SignupView.vue

```html
<template>
    email: <input type="text" v-model="signup.email" />
    <p>{{ signup.errorEmail }}</p>

    password: <input type="password" v-model="signup.password" />
    <p>{{ signup.errorPassword }}</p>

    password: <input type="password" v-model="signup.passwordConfirm" />
    <p>{{ signup.errorPasswordConfirm }}</p>

    <button @click="signup.submit" :disabled="!signup.canSignup" style="margin-top: 32px">가입하기</button>
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
```

## @/views/SignupView.vue (최종 완성)

``` html
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
```
