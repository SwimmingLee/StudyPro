<template>
  <v-content app id="search" class="fill-height">
    <v-card>
      <v-img src="@/assets/images/cherryblossom.jpg" aspect-ratio="7">
        <v-card-title class="pt-10" style="color:blue;font-size:80px"
          >6조 공통 프로젝트 스터디</v-card-title
        >
      </v-img>

      <v-btn
        class="mr-4"
        color="pink"
        fab
        absolute
        x-large
        right
        style="transform: translateY(-150%)"
      >
        입장하기
      </v-btn>
    </v-card>

    <v-card>
      <v-tabs vertical>
        <v-tab class="py-10">
          <!-- <v-icon left>mdi-magnify</v-icon> -->
          홈으로
        </v-tab>
        <v-tab class="py-10">
          <!-- <v-icon left>mdi-account-multiple</v-icon> -->
          스터디 게시판
        </v-tab>

        <v-tab class="py-10">
          <!-- <v-icon left>mdi-book-open-variant</v-icon> -->
          멤버리스트
        </v-tab>
        

        <v-tab-item>
          <v-card flat>
            <study-home />
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <study-board />
          </v-card>
        </v-tab-item>

        <!-- <v-tab-item>
          <v-card flat>
            <create-group/>
          </v-card>
        </v-tab-item> -->
      </v-tabs>
    </v-card>
  </v-content>
</template>

<script>
export default {
  name: "studydetail",
  components: {
    StudyHome: () => import("@/components/studydetail/StudyHome"),
    StudyBoard: () => import("@/components/studydetail/StudyBoard"),
  }
};
</script>
