<template>
  <v-form>
    <banner />

    <v-row justify="center"
      ><v-col cols="12" sm="10">
        <v-card class="mx-auto" max-width="1500">
          <v-toolbar flat color="black" dark>
            <v-toolbar-title style="font-size:30px">마이페이지</v-toolbar-title>
          </v-toolbar>
          <v-tabs vertical>
            <v-tab>
              <!-- <v-icon left>mdi-account</v-icon> -->
              회원정보수정
            </v-tab>
            <v-tab>
              <!-- <v-icon left>mdi-lock</v-icon> -->
              내 스터디 관리
            </v-tab>
            <v-tab>
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
</template>

<script>
export default {
  components: {
    Banner: () => import("@/components/home/Banner"),
    EditProfile: () => import("@/components/mypage/EditProfile"),
    ManageStudy: () => import("@/components/mypage/ManageStudy"),
    Withdrawal: () => import("@/components/mypage/Withdrawal")
  }
};
</script>
