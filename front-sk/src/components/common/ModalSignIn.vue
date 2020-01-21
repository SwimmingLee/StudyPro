<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Log In</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">회원 가입</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="* E-mail 주소" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="password" label="* 비밀번호" type="password"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="cpassword" label="* 비밀번호 확인" type="password"
                    v-bind:class="{error:error.password, complete:!error.password&&password.length!==0}"></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field label="* 이름"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="* 닉네임"></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-select
                  :items="['남자', '여자']"
                  label="* 성별"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field label="* 닉네임"></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-autocomplete
                  :items="['인공지능', '자율주행', '블록체인', '딥러닝']"
                  label="관심 분야(최대 3개)"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>* indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
</script>