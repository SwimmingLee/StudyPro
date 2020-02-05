<template>
  <v-list>
    <v-list-item v-for="item in items" :key="item.title">
      <v-card elevation="0" width="1500">
        <v-row style="border-bottom: 1px solid #E5C1D4;">
          <v-col cols="2" align="center">
            <v-avatar size="40px" class="ma-0">
              <img :src="item.avatar" />
            </v-avatar>

            <p style="font-size:14px" class="ma-0 pt-2">{{ item.receiver }}</p>
          </v-col>

          <v-col align-self="center" cols="8">
            <v-row> </v-row>
          </v-col>

          <v-col align-self="center" cols="2">
            <v-btn color="green lighten-4" @click="viewDetail(item)"
              >쪽지 보내기</v-btn
            >
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
export default {
  data: () => ({
    groupModal: false,
    item: {},
    items: [
      {
        msgID: "",
        isRead: false,
        avatar: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBXklQl.img?h=208&w=270&m=6&q=60&o=f&l=f&x=293&y=183",
        title: "질문있습니다.",
        sender: "윤찬희",
        receiver: "아이유",
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
        avatar: "http://img.etoday.co.kr/pto_db/2017/01/20170123024249_1009466_600_900.jpg",
        title: "찬물나옴",
        sender: "윤찬희",
        receiver: "신민아",
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
        avatar: "http://file3.instiz.net/data/file3/2018/03/22/b/f/3/bf3955e2f653ea718547f0d2dc1f13aa.gif",
        title: "지금 몇시인가요",
        sender: "윤찬희",
        receiver: "김다현",
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
        sender: "윤찬희",
        receiver: "배수지",
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
    GroupModal: () => import("@/components/user/messenger/MsgSendModal")
  },

  methods: {
    viewDetail(item) {
      this.groupModal = true;
      this.item = item;
    },
    modalClose() {
      this.groupModal = false;
    }
  }
};
</script>
