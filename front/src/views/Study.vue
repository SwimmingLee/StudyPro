<template>
  <v-content app id="search">
    <v-row class="fill-height">
      <v-col cols="12">
        <v-card min-height="90%" min-width="539px" class="mx-3">
          <v-tabs vertical class="pl-3 pt-3">
            <v-tab class="py-3">
              <v-icon left>mdi-magnify</v-icon>
              <span>스터디그룹 검색</span>
            </v-tab>
            <v-tab class="py-3">
              <v-icon left>mdi-account-multiple</v-icon>
              <span>스터디그룹 리스트</span>
            </v-tab>
            <v-tab class="py-3">
              <v-icon left>mdi-book-open-variant</v-icon>
              <span>스터디생성</span>
            </v-tab>

            <v-tab-item>
              <v-card flat>
                <study-search />
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <group-list />
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <create-group />
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
export default {
  name: "search",
  components: {
    studySearch: () => import("@/components/study/Search"),
    createGroup: () => import("@/components/study/CreateGroup"),
    groupList: () => import("@/components/user/MyGroupList")
  }
};
</script>
