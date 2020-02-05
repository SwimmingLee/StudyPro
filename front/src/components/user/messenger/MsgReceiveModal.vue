<template>
  <div id="groupmodal">
    <v-dialog v-model="open" max-width="40%">
      <v-card id="lgiModal" class="px-0 pt-0">
        <v-card-title class="customTheme darken-2 white--text pb-3">
          <span class="headline">[제목]  {{ item.title }}</span>
        </v-card-title>
        <v-card-text class="py-0 px-7">
          <v-container class="pb-0">
            <v-row class="justify-center">
              <v-avatar size="140" color="white">
                <v-img :src="item.avatar"></v-img>
                <!-- <v-icon size="140">mdi-account-circle</v-icon> -->
              </v-avatar>
            </v-row>
            <v-row class="py-4">
              <v-col cols="3" class="py-0">
                <v-content text class="py-0 font-weight-bold">제목</v-content>
              </v-col>
              <v-col class="py-0">
                <v-content text class="py-0">{{ item.title }}</v-content>
              </v-col>
            </v-row>
            <hr />
            <v-row class="pt-4 pb-1">
              <v-col cols="3" class="py-0">
                <v-content text class="py-0 font-weight-bold"
                  >보낸 사람</v-content
                >
              </v-col>
              <v-col class="py-0">
                <v-content text class="py-0">{{ item.sender }}</v-content>
              </v-col>
            </v-row>
            <v-row class="py-1">
              <v-col cols="3" class="py-0">
                <v-content text class="py-0 font-weight-bold"
                  >보낸 시간</v-content
                >
              </v-col>
              <v-col class="py-0">
                <v-content text class="py-0"
                  >{{ item.year }}-{{ item.month }}-{{ item.day }}
                  {{ item.hour }}:{{ item.minute }}</v-content
                >
              </v-col>
            </v-row>

            <hr />
            <v-row class="pt-3 pb-4">
              <v-col cols="3" class="py-0">
                <v-content text class="py-0 font-weight-bold"
                  >메시지 내용</v-content
                >
              </v-col>
              <v-col class="py-0">
                <v-content text class="py-0">{{ item.detail }}</v-content>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <div v-show="showResponse">
          <v-divider></v-divider>

          <v-row class="pt-6, ma-0">
            <v-col cols="12" class="pa-0">
              <v-textarea
                class="px-10"
                label="보낼 메시지"
                outlined
                single-line
                v-model="regText"
                counter
                maxlength="100"
              ></v-textarea>
            </v-col>
          </v-row>
        </div>
        <v-card-actions class="pt-0 pr-5">
          <v-spacer></v-spacer>
          <v-btn
            color="error--text lighten-1 transparent"
            elevation="0"
            @click="clickExit"
            >닫기</v-btn
          >

          <v-btn
            color="primary--text transparent"
            elevation="0"
            @click="clickResponse"
            v-if="!showResponse"
            >답장하기</v-btn
          >

          <v-btn
            color="primary--text transparent"
            elevation="0"
            @click="clickSend"
            v-else
            >보내기</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  show: false,
  name: "groupmodal",
  data: () => ({
    open: false,
    regText: "",
    showResponse: false
  }),
  props: ["groupModal", "gid", "item"],
  watch: {
    groupModal() {
      this.open = this.groupModal;
    },
    open() {
      if (this.open == false) {
        this.showResponse = false;
        this.$emit("close");
      }
    }
  },
  methods: {
    clickResponse() {
      this.showResponse = true;
      this.$emit("clickRes");
    },
    clickExit() {
      this.regText = "";
      this.open = false;
    },
    async clickSend() {
      //보내는 통신
      this.open = false;
      this.regText = "";
    }
  }
};
</script>
