<template>
  <v-content app id="search" class="fill-height">
    <v-card min-height="90%" min-width="539px" class="mx-3">
      <v-tabs vertical>
        <v-tab>
          <v-icon left>mdi-magnify</v-icon>
          스터디그룹 검색
        </v-tab>
        <v-tab>
          <v-icon left>mdi-account-multiple</v-icon>
          스터디그룹 리스트
        </v-tab>
        <v-tab>
          <v-icon left>mdi-book-open-variant</v-icon>
          스터디생성
        </v-tab>

        <v-tab-item>
          <v-card flat>
            <study-search />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>

          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <create-group/>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-content>
</template>

<script>
export default {
  name: "search",
  components: {
    studySearch: () => import("@/components/study/Search"),
    createGroup: () => import("@/components/study/CreateGroup")
  }
};
</script>
