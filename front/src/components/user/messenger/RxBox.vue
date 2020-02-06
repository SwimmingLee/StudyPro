<template>
  <v-list>
    <v-list-item>
      <v-row style="border-bottom: 5px solid #1C6EA4;">
        <v-col align="center" cols="2">
          <span>보낸 사람</span>
        </v-col>

        <v-col align="center" cols="8">
          <span>제 목</span>
        </v-col>

        <v-col align="center" cols="2">
          <span>받은 시간</span>
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item v-for="item in rxBox" :key="item.title">
      <v-card elevation="0" width="1500" @click="viewDetail(item)">
        <v-row style="border-bottom: 1px solid #E5C1D4;">
          <v-col cols="2" align="center">
            <v-avatar size="40px" class="ma-0">
              <img :src="item.avatar" />
            </v-avatar>

            <p style="font-size:14px" class="ma-0 pt-2">{{ item.sender }}</p>
          </v-col>

          <v-col align-self="center" cols="8">
            <v-row>
              <span style="font-size:15px" class="ma-0">
                <v-icon v-if="item.isRead" style="color:grey">mdi-email</v-icon>
                <v-icon v-else style="color:black">mdi-email</v-icon>
                {{ item.title }}
              </span>
            </v-row>
          </v-col>

          <v-col align-self="center" cols="2">
            <span style="font-size:15px" class="ma-0">
              {{ item.year }}-{{ item.month }}-{{ item.day }} {{ item.hour }}:{{
              item.minute
              }}
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
import AlarmService from "@/services/alarm.service"
export default {
  data: () => ({
    groupModal: false,
    item: {},
    rxBox: [
      {
        msgID: "",
        isRead: false,
        avatar:
          "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBXklQl.img?h=208&w=270&m=6&q=60&o=f&l=f&x=293&y=183",
        title: "질문있습니다.",
        sender: "아이유",
        receiver: "윤찬희",
        detail:
          "사실은 질문이 없었습니다.가머나더링머ㅣ댜ㅓ자ㅓㅣㅏㅇㄹ마우ㅏㅣㅁ",
        year: "2020",
        month: "01",
        day: "22",
        hour: "10",
        minute: "51",
        second: "08"
      },
      // { divider: true, inset: true },
      {
        msgID: "",
        isRead: true,
        avatar:
          "http://img.etoday.co.kr/pto_db/2017/01/20170123024249_1009466_600_900.jpg",
        title: "찬물나옴",
        sender: "신민아",
        receiver: "윤찬희",
        detail: "아니에요. 잘 나와여.",
        year: "2020",
        month: "01",
        day: "12",
        hour: "10",
        minute: "51",
        second: "08"
      },
      // { divider: true, inset: true },
      {
        msgID: "",
        isRead: false,
        avatar:
          "http://file3.instiz.net/data/file3/2018/03/22/b/f/3/bf3955e2f653ea718547f0d2dc1f13aa.gif",
        title: "지금 몇시인가요",
        sender: "김다현",
        receiver: "윤찬희",
        detail: "시계가 없어요.",
        year: "2020",
        month: "03",
        day: "22",
        hour: "10",
        minute: "51",
        second: "08"
      },
      {
        msgID: "",
        isRead: false,
        avatar: "https://ppss.kr/wp-content/uploads/2015/07/16.jpg",
        title: "안녕하세요.",
        sender: "배수지",
        receiver: "윤찬희",
        detail: "안녕히 가세요.",
        year: "2010",
        month: "04",
        day: "30",
        hour: "12",
        minute: "12",
        second: "19"
      }
    ]
  }),

  computed: {
    isAuth: function() {
      return this.$store.getters.isAuth;
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
    const rsvMsg = await AlarmService.getReceivedAlarm();
    this.rxBox = rsvMsg.data;
  }
};
</script>
