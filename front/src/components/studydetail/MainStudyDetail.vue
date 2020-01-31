<template>
  <v-content app id="search" class="fill-height">
    <v-card>
      <v-img src="@/assets/images/cherryblossom.jpg" aspect-ratio="7">
        <v-row>
          <v-col cols="12">
            <v-card-title>
              <p
                style="
          font-family: Tahoma, Geneva, sans-serif;
          font-size:7vw;
          font-weight: 600;
          color: #FFFFFF;
          text-shadow: 6px 4px 0 #686669;
          "
              >
                Team #6 SSAFY study
              </p>
            </v-card-title>
          </v-col>
        </v-row>
        <v-row justify="end" align="end">
          <v-col cols="5" md="3" lg="3" class="text-end mb-4 mr-4">
            <router-link to="/workspace">
              <v-btn
                color="#9EFFBE"
                class="display-1"
                x-large
                right
                target="__blank"
                style="
        box-shadow:inset 0px 1px 0px 0px #fff6af;
        background:linear-gradient(to bottom, #ffec64 5%, #ffab23 100%);
        background-color:#ffec64;
        border-radius:6px;
        border:1px solid #ffaa22;
        display:inline-block;
        cursor:pointer;
        color:#333333;
        font-family:Arial;
        text-decoration:none;
        text-shadow:0px 1px 0px #ffee66;"
              >
                입장하기
              </v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-img>
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
    StudyBoard: () => import("@/components/studydetail/StudyBoard")
  }
};
</script>
