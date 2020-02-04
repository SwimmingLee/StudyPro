<template>
  <v-content app id="search" class="fill-height">
    <v-card>
      <v-img src="@/assets/images/cherryblossom.jpg" aspect-ratio="7">
        <v-card-title style="transform: translateY(150%)"
          ><p id="studyname">
            Team #6 SSAFY study
          </p>
        </v-card-title>
      </v-img>

      <router-link to="/workspace" target="_blank">
        <v-btn
          id="enterbtn"
          class="mr-4"
          height="60"
          width="250"
          color="#9EFFBE"
          absolute
          x-large
          right
        >
          입장하기
        </v-btn>
      </router-link>
    </v-card>

    <v-card>
      <v-tabs vertical>
        <v-tab class="py-10">
          <!-- <v-icon left>mdi-magnify</v-icon> -->
          홈으로
        </v-tab>
        <v-tab class="py-10">
          <!-- <v-icon left>mdi-account-multiple</v-icon> -->
          일정 관리
        </v-tab>

        <v-tab class="py-10">
          게시판
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
            <study-schedule />
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <study-board />
          </v-card>
        </v-tab-item>

         <v-tab-item>
          <v-card flat>
            <study-member />
          </v-card>
        </v-tab-item>

      </v-tabs>
    </v-card>
  </v-content>
</template>

<script>
export default {
  name: "studydetail",
  components: {
    StudyHome: () => import("@/components/studydetail/StudyHome"),
    StudySchedule: () => import("@/components/studydetail/StudySchedule"),
    StudyBoard: () => import("@/components/studydetail/StudyBoard"),
    StudyMember: () => import("@/components/studydetail/StudyMember")
  }
};
</script>

<style>
#enterbtn {
  transform: translateY(-130%) translateX(-40%);
  box-shadow: inset 0px 1px 0px 0px #fff6af;
  background: linear-gradient(to bottom, #ffec64 5%, #ffab23 100%);
  background-color: #ffec64;
  border-radius: 6px;
  border: 1px solid #ffaa22;
  display: inline-block;
  cursor: pointer;
  color: #333333;
  font-family: Arial;
  font-size: 30px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #ffee66;
}
#studyname {
  font-family: Tahoma, Geneva, sans-serif;
  font-size: 80px;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 6px 4px 0 #686669;
}
</style>
