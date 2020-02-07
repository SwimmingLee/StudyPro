<template>
  <div id="checkmodal">
    <v-dialog v-model="subopen" persistent max-width="40%">
      <v-card class="px-0 pt-0">
        <v-card-text style="font-size:15px" align="center" class="pa-5">
          메시지를 전송하시겠습니까?
        </v-card-text>

        <!-- <v-card-text class="pa-5">
          {{titleText}}
        </v-card-text>

        <v-card-text class="pa-5">
          {{item.sender}}
        </v-card-text>

        <v-card-text class="pa-5">
          {{mainText}}
        </v-card-text> -->

        <v-card-actions class="pt-0 pr-5">
          <v-spacer></v-spacer>
          <v-btn
            color="primary--text lighten-1 transparent"
            elevation="0"
            @click="clickYes"
            >예</v-btn
          >
          <v-btn
            color="error--text lighten-1 transparent"
            elevation="0"
            @click="clickNo"
            >아니요</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="subalert" max-width="40%">
      <v-card v-if="this.isSuccess == true" class="px-0 pt-0">
        <v-card-text style="font-size:15px" align="center" class="pa-5">
          메시지를 성공적으로 전송했습니다.
        </v-card-text>

        <v-card-actions class="pt-0 pr-5">
          <v-spacer></v-spacer>

          <v-btn
            color="error--text lighten-1 transparent"
            elevation="0"
            @click="sendSuccess"
            >닫기</v-btn
          >
        </v-card-actions>
      </v-card>

      <v-card v-if="this.isSuccess == false" class="px-0 pt-0">
        <v-card-text style="font-size:15px" align="center" class="pa-5">
          메시지 전송에 실패했습니다.
        </v-card-text>

        <v-card-actions class="pt-0 pr-5">
          <v-spacer></v-spacer>

          <v-btn
            color="error--text lighten-1 transparent"
            elevation="0"
            @click="sendFail"
            >돌아가기</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "checkmodal",
  data: () => ({
    subopen: false,
    subalert: false,
    isSuccess: true
  }),
  props: ["checkModal", "item", "titleText", "mainText"],
  watch: {
    checkModal() {
      this.subopen = this.checkModal;
    },
    subopen() {
      if (!this.subopen) {
        this.$emit("sendNo");
      }
    }
  },
  methods: {
    clickNo() {
      this.$emit("sendNo");
    },
    sendSuccess() {
      this.subalert = false;
      // this.checkModal=false;

      this.$emit("sendYes");
    },
    sendFail() {
      this.subalert = false;
      this.$emit("sendNo");
      // this.checkModal=false;
    },

    async clickYes() {
      
      this.subalert = true;
      this.subopen = false;

      //통신 시도




      // 통신 성공 실패 여부
      this.isSuccess = false;





      //통신 성공
      if (this.isSuccess) {
        this.subopen = false;
        this.$emit("sendYes");

      }

      //통신 실패
      else if(!this.isSuccess){
        this.$emit("sendNo")

      }

      // this.$emit("sendYes")
    }
  }
};
</script>
