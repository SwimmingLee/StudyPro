<template>

    <v-form>
        <v-container>

            <v-card-text style="font-size:30px">
            테스트! 테스트!
            </v-card-text>

            <!-- <v-row>
                <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="last"
                        :rules="[rules.required, rules.counter]"
                        label="성"
                        counter
                        maxlength="20"
                    ></v-text-field>
                </v-col>
            </v-row>
            
            <v-row>
                <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="first"
                        :rules="[rules.required, rules.counter]"
                        label="이름"
                        counter
                        maxlength="20"
                    ></v-text-field>
                </v-col>
            </v-row>
    
            <v-row>
                <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="nickname"
                        :rules="[rules.required, rules.counter]"
                        label="닉네임"
                        counter
                        maxlength="20"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="email"
                        :rules="[rules.required, rules.email]"
                        label="이메일"
                    ></v-text-field>
                </v-col>
            </v-row>


            
  

            <v-row align="right">
                <v-col >
                    <v-btn color="success" dark>가입하기</v-btn>
                </v-col>

                <v-col>
                    <v-btn color="error" dark>취소하기</v-btn>
                </v-col>

            </v-row> -->
                     
        </v-container>
    </v-form>
</template>


// <script>
//   export default {
//     data () {
//       return {

//         show1: false,
//         show2: true,
//         show3: false,
//         show4: false,
//         password: 'Password',

//         first: '',
//         last: '',
//         nickname: '',
//         email: '',
//         rules: {
//           required: value => !!value || '필수사항',
//           counter: value => value.length <= 20 || '최대 10자까지 가능합니다.',
//           email: value => {
//             const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//             return pattern.test(value) || '이메일 형식이 올바르지 않습니다.'
//           }
//         },


//       }
//     },
//   }
// </script>

