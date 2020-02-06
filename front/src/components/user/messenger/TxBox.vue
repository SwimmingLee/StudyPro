<template>
  <v-list>
    <v-list-item>
      <v-row style="border-bottom: 5px solid #1C6EA4;">
        <v-col align="center" cols="2">
          <span>받은 사람</span>
        </v-col>

        <v-col align="center" cols="8">
          <span>제 목</span>
        </v-col>

        <v-col align="center" cols="2">
          <span>보낸 시간</span>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item v-for="item in txBox" :key="item.title">
      <v-card elevation="0" width="1500" @click="viewDetail(item)">
        <v-row style="border-bottom: 1px solid #E5C1D4;">
          <v-col cols="2" align="center">
            <v-avatar size="40px" class="ma-0">
              <img :src="item.avatar" />
            </v-avatar>

            <p style="font-size:14px" class="ma-0 pt-2">{{ item.receiver }}</p>
          </v-col>

          <v-col align-self="center" cols="8">
            <v-row>
              <span style="font-size:15px" class="ma-0">{{ item.title }}</span>
            </v-row>
          </v-col>

          <v-col align-self="center" cols="2">
            <span style="font-size:15px" class="ma-0">
              {{item.created_date.substr(0, 10)}}
              {{item.created_date.substr(11, 5)}}
            </span>
          </v-col>
        </v-row>
      </v-card>
    </v-list-item>
    <template>
      <group-modal
        :group-modal="groupModal"
        :item="item"
        v-on:close="modalClose"
        v-on:clickRes="modalReload"
      />
    </template>
  </v-list>
</template>

<script>
import AlarmService from "@/services/alarm.service";

export default {
  data: () => ({
    groupModal: false,
    item: {},
    txBox: []
  }),

  computed: {
    isAuth: function() {
      return this.$store.getters.isAuth;
    },
    sendMsg : function() {
      return this.txBox
    }
  },
  components: {
    GroupModal: () => import("@/components/user/messenger/MsgReceiveModal")
  },

  methods: {
    viewDetail(item) {
      this.groupModal = true;
      this.item = item;
    },
    modalClose() {
      this.groupModal = false;
    },
    modalReload() {
      this.groupModal = false;
      this.groupModal = true;
    }
  },
  async created() {
    const sendMsg = await AlarmService.getSendAlarm()
    this.txBox = sendMsg.data
  }
};
</script>
