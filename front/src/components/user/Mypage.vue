<template>
  <v-content>
    <v-form v-if="isAuth">
      <v-row justify="center"
        ><v-col cols="12" sm="10">
          <v-card class="mx-auto" max-width="1500">
            <v-toolbar flat color="customTheme" dark>
            <v-toolbar-title class="ml-5">마이페이지</v-toolbar-title>
          </v-toolbar>
            <v-tabs vertical>
              <v-tab class="py-3">
                <!-- <v-icon left>mdi-account</v-icon> -->
                회원정보수정
              </v-tab>
              <v-tab class="py-3">
                <!-- <v-icon left>mdi-lock</v-icon> -->
                비밀번호변경
              </v-tab>
              <v-tab class="py-3">
                <!-- <v-icon left>mdi-access-point</v-icon> -->
                회원탈퇴
              </v-tab>

              <v-tab-item>
                <edit-profile />
              </v-tab-item>

              <v-tab-item>
                <manage-study />
              </v-tab-item>

              <v-tab-item>
                <withdrawal />
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
    <request-signin v-else>
      <template v-slot:text>
        <p>로그인이 필요합니다</p>
      </template>
    </request-signin>
  </v-content>
</template>

<script>
export default {
  components: {
    EditProfile: () => import("@/components/mypage/EditProfile"),
    ManageStudy: () => import("@/components/mypage/ChangePassword"),
    Withdrawal: () => import("@/components/mypage/Withdrawal"),
    requestSignin: () => import("@/components/base/RequestSignin")
  },
  computed: {
    isAuth() {
      return this.$store.getters["auth/isAuth"];
    }
  }
};
</script>
