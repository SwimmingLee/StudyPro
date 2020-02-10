<template>
  <div id="groupmodal">
    <v-dialog v-model="open" max-width="80%">
      <v-card id="lgiModal" class="px-0 pt-0">
        <v-card-title class="customTheme darken-2 white--text pb-3">
          <span class="headline">{{studyInfo.name}}</span>
        </v-card-title>
        <v-card-text class="py-0 px-7">
          <v-container class="pb-0">
            <v-row class="justify-center">
              <v-avatar size="140" color="white">
                <!-- <v-icon size="140">mdi-account-circle</v-icon> -->
                  <v-img :src="studyInfo.captain.profile_url"></v-img>
              </v-avatar>
            </v-row>
            <v-row class="py-4">
              <v-col cols="3" class="py-0">
                <v-content text class="py-0 font-weight-bold">카테고리</v-content>
              </v-col>
              <v-col class="py-0">
                <v-content text class="py-0">{{studyInfo.minor_class.name}}</v-content>
              </v-col>
            </v-row>
            <hr/>
            <v-row class="pt-4 pb-1">
              <v-col cols="3" class="py-0">
                <v-content text class="py-0 font-weight-bold">스터디명</v-content>
              </v-col>
              <v-col class="py-0">
                <v-content text class="py-0">{{studyInfo.name}}</v-content>
              </v-col>
            </v-row>
            <v-row class="py-1">
              <v-col cols="3" class="py-0">
                <v-content text class="py-0 font-weight-bold">스터디 소개</v-content>
              </v-col>
              <v-col class="py-0">
                <v-content text class="py-0">{{studyInfo.description}}</v-content>
              </v-col>
            </v-row>
            <v-row class="py-1">
              <v-col cols="3" class="py-0">
                <v-content text class="py-0 font-weight-bold">스터디 목표</v-content>
              </v-col>
              <v-col class="py-0">
                <v-content text class="py-0">{{studyInfo.goal}}</v-content>
              </v-col>
            </v-row>
            <v-row class="py-1">
              <v-col cols="3" class="py-0">
                <v-content text class="py-0 font-weight-bold">시작날짜</v-content>
              </v-col>
              <v-col class="py-0">
                <v-content text class="py-0">{{studyInfo.start_time}}</v-content>
              </v-col>
            </v-row>
            <v-row class="py-1">
              <v-col cols="3" class="py-0">
                <v-content text class="py-0 font-weight-bold">시간</v-content>
              </v-col>
              <v-col class="py-0">
                <v-content text class="py-0">{{studyInfo.start_time}} ~ {{studyInfo.end_time}}</v-content>
              </v-col>
            </v-row>
            <v-row class="py-1">
              <v-col cols="3" class="py-0">
                <v-content text class="py-0 font-weight-bold">요일</v-content>
              </v-col>
              <v-col class="py-0">
                <v-content text class="py-0">{{studyInfo.start_time}}</v-content>
              </v-col>
            </v-row>
            <v-row class="py-1">
              <v-col cols="3" class="py-0">
                <v-content text class="py-0 font-weight-bold">기간</v-content>
              </v-col>
              <v-col class="py-0">
                <v-content text class="py-0">{{studyInfo.start_time}}</v-content>
              </v-col>
            </v-row>
            <hr/>
            <v-row class="pt-1 pb-4">
              <v-col cols="3" class="py-0">
                <v-content text class="py-0 font-weight-bold">그룹장</v-content>
              </v-col>
              <v-col class="py-0">
                <v-content text class="py-0">{{studyInfo.captain.nickname}}</v-content>
              </v-col>
            </v-row>

             <v-row class="pt-1 pb-4">
              <v-col cols="3" class="py-0">
                <v-content text class="py-0 font-weight-bold">멤버 수</v-content>
              </v-col>
              <v-col class="py-0">
                <v-content text class="py-0">{{studyInfo.status}} / 6</v-content>
              </v-col>
            </v-row>



            <v-row class="pt-6">
              <v-col cols="12" class="py-0">
                <!-- <v-content text class="pt-0 pb-3 font-weight-bold">가입양식</v-content> -->
                <v-textarea
                  label="가입인사"
                  outlined
                  height="150px"
                  v-model="regText"
                  single-line
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="pt-0 pr-5">
          <v-spacer></v-spacer>
          <v-btn color="error--text lighten-1 transparent" elevation="0" @click="open = false">close</v-btn>
          <v-btn color="primary--text transparent" elevation="0" @click="regGroup"
            >가입하기</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "groupmodal",
  data: () => ({
    open: false,
    regText: ''
  }),
  props: ["groupModal", "gid", "studyInfo"],
  watch: {
    groupModal() {
      this.open = this.groupModal;
    },
    open(){
      if(this.open == false){
        this.$emit('close')
      }
    }
  },
  mounted(){
    console.log('modal', this.studyInfo)
  },
  methods: {
    regGroup(){
      
    }
  }
};
</script>
