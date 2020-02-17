<template>
  <v-card flat class="pa-0">
    <v-row no-gutters class="pt-2">
      <v-spacer />
      <v-col cols="8">
        <v-card outlined>
          <study-mini-board :study_id="this.study_id" />
          <v-divider class="mx-5"/>
          <v-card flat>
            <study-todo-list :study_id="this.study_id" />
          </v-card>
        </v-card>
      </v-col>

      <v-spacer />
      <v-col cols="3">
        <v-row no-gutters>
          <v-col>
            <v-card flat>
              <study-profile :study_id="this.study_id" />
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-spacer />
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: ["study_id"],
  components: {
    StudyMiniBoard: () =>
      import("@/components/studyView/module/StudyMiniBoard"),
    StudyTodoList: () => import("@/components/studyView/module/StudyTodoList"),
    StudyProfile: () => import("@/components/studyView/module/StudyProfile")
  }
};
</script>

