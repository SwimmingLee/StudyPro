<template>
  <div class="tabs">
    <v-tabs>
      <v-tab @click="tabSwitch('rx')">받은 쪽지함</v-tab>
      <v-tab @click="tabSwitch('tx')">보낸 쪽지함</v-tab>
      <v-tab @click="tabSwitch('send')">메세지</v-tab>
      <!-- <v-tab v-if="isAuth">My Groups</v-tab> -->
    </v-tabs>

    <v-list three-line v-if="current === 'rx'">
      <v-list-item v-for="item in rxBox" :key="item.title">
        <!-- <v-divider
          v-if="item.divider"
          :key="item.title"
          :inset="item.inset"
        ></v-divider>
       -->
        <!-- <template v-for="item in rxBox">
        <v-divider
          v-if="item.divider"
          :key="item.title"
          :inset="item.inset"
        ></v-divider>

        <v-list-item v-else :key="item.title"> -->
        <v-card elevation="0" width="1500" @click="viewDetail(item)">
          <v-row justify="center" align="center">
            <v-col>
              <p style="font-size:15px" class="ma-0">{{ item.sender }}</p>
            </v-col>

            <v-col>
              <p style="font-size:15px" class="ma-0">
                <v-icon v-if="item.isRead" style="color:grey">mdi-email</v-icon> 
                <v-icon v-else style="color:black">mdi-email</v-icon>
                {{ item.title }}
              </p>
            </v-col>








            <v-col offset-md="7" md="2">
              <p style="font-size:15px" class="ma-0">
                {{ item.year }}-{{ item.month }}-{{ item.day }}
                {{ item.hour }}:{{ item.minute }}
              </p>
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

      <!-- </template> -->
    </v-list>

    <v-list three-line v-else-if="current === 'tx'">
      <template v-for="(item, index) in txBox">
        <v-divider
          v-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider>

        <v-list-item v-else :key="item.title">
          <v-row
            ><v-col>
              <v-list-item-avatar>
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="item.subtitle"
                ></v-list-item-subtitle>
              </v-list-item-content> </v-col
          ></v-row>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "tabs",
  data: () => ({
    current: "rx",
    groupModal: false,
    item: {},
    rxBox: [
      {
        msgID: "",
        isRead:false,
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "질문있습니다.",
        sender: "아이유",
        receiver: "윤찬희",
        detail:
          "사실은 질문이 없었습니다.ㅈㄷㄻㄹㄴㅇㄻㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ",
        year: "2020",
        month: "01",
        day: "22",
        hour: "10",
        minute: "51",
        second: "08",
        date: "2020-02-04"
      },
      // { divider: true, inset: true },
      {
        msgID: "",
        isRead:true,
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: "찬물나옴",
        sender: "신민아",
        receiver: "윤찬희",
        detail: "아니에요. 잘 나와여.",
        year: "2020",
        month: "01",
        day: "12",
        hour: "10",
        minute: "51",
        second: "08",
        date: "2020-01-22"
      },
      // { divider: true, inset: true },
      {
        msgID: "",
        isRead:false,
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "지금 몇시인가요",
        sender: "이지은",
        receiver: "윤찬희",
        detail: "시계가 없어요.",
        year: "2020",
        month: "03",
        day: "22",
        hour: "10",
        minute: "51",
        second: "08",
        date: "2019-12-15"
      }
    ],

    txBox: [
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        title: "Birthday gift",
        subtitle:
          "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Recipe to try",
        subtitle:
          "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      }
    ]
  }),

  computed: {
    isAuth: function() {
      return this.$store.getters.isAuth;
    }
  },
  components: {
    GroupModal: () => import("@/components/studydetail/MsgReceiveModal")
  },

  methods: {
    tabSwitch(target) {
      this.current = target;
    },
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
  }
};
</script>
