<template>

    <v-form>
        <v-container>

            <v-card-text style="font-size:30px">
            회원가입
            </v-card-text>

            <v-row>
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


            <v-row>

                <v-col cols="12" sm="6">
                <v-text-field
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Normal with hint text"
                    hint="At least 8 characters"
                    counter
                    @click:append="show1 = !show1"
                ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                <v-text-field
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show2 ? 'text' : 'password'"
                    name="input-10-2"
                    label="Visible"
                    hint="At least 8 characters"
                    value=""
                    class="input-group--focused"
                    @click:append="show2 = !show2"
                ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                <v-text-field
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show3 ? 'text' : 'password'"
                    name="input-10-2"
                    label="Not visible"
                    hint="At least 8 characters"
                    value=""
                    class="input-group--focused"
                    @click:append="show3 = !show3"
                ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                <v-text-field
                    :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.emailMatch]"
                    :type="show4 ? 'text' : 'password'"
                    name="input-10-2"
                    label="Error"
                    hint="At least 8 characters"
                    value=""
                    error
                    @click:append="show4 = !show4"
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

            </v-row>
            
        
                    
                     
        </v-container>
    </v-form>
</template>


<script>
  export default {
    data () {
      return {

        show1: false,
        show2: true,
        show3: false,
        show4: false,
        password: 'Password',

        first: '',
        last: '',
        nickname: '',
        email: '',
        rules: {
          required: value => !!value || '필수사항',
          counter: value => value.length <= 20 || '최대 10자까지 가능합니다.',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || '이메일 형식이 올바르지 않습니다.'
          },
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
        },


      }
    },
  }
</script>
