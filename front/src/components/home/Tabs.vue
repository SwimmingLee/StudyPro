<template>
  <!-- <v-container> -->
  <v-row>
    <v-col>
      <div class="tabs">
        <v-tabs>
          <v-tab @click="tabSwitch('ng')">신설 스터디</v-tab>
          <v-tab @click="tabSwitch('np')">New Posts</v-tab>
          <v-tab v-if="isAuth">My Groups</v-tab>
        </v-tabs>

        <v-slide-group
          v-if="current === 'ng'"
          class="pa-4"
          multiple
          show-arrows
        >
          <v-slide-item v-for="item in items" :key="item.gid">
            <v-card
              color="white"
              class="ma-4"
              height="auto"
              width="200"
              @click="viewDetail(item)"
            >
              <v-img
                class="white--text align-end"
                height="150px"
                :src="item.imgsrc"
              ></v-img>

              <v-row justify="center">
                <p id="istudyname" class="mt-3">{{ item.name }}</p>
              </v-row>

              <v-row justify="center">
                <p id="istudytopic">{{ item.topic }}</p>
              </v-row>

              <v-row justify="center">
                <p style="font-size:15px">{{ item.days }}</p>
              </v-row>

              <v-row justify="center">
                <p style="font-size:15px">
                  시간 : {{ item.starttime }} - {{ item.endtime }}
                </p>
              </v-row>

              <v-row justify="center">
                <p style="font-size:15px">인원 : {{ item.member }} / 6</p>
              </v-row>
            </v-card>
          </v-slide-item>
          <template>
            <group-modal
              :group-modal="groupModal"
              :item="item"
              v-on:close="modalClose"
            />
          </template>
        </v-slide-group>

        <v-list three-line v-else-if="current === 'np'">
          <template v-for="(item, index) in items">
            <v-subheader
              v-if="item.header"
              :key="item.header"
              v-text="item.header"
            ></v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="item.inset"
            ></v-divider>

            <v-list-item v-else :key="item.title">
              <v-list-item-avatar>
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="item.subtitle"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </div>
    </v-col>
  </v-row>
  <!-- </v-container> -->
</template>

<script>
export default {
  name: "tabs",
  data: () => ({
    current: "ng",

    groupModal: false,
    item: {},
    items: [
      {
        imgsrc: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        name: "OS 2주 완성",
        topic: "운영체제",
        goal: "운영체제 기초 다지기",
        gmaster: "나야나",
        startdate: "2020-02-03",
        days: "토,일",
        starttime: "10",
        endtime: "12",
        duration: "",
        intro: "마! 너 내 동료가 돼라!",
        member: "2"
      },

      {
        imgsrc: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        name: "DS 마스터",
        topic: "자료구조",
        goal: "이 세상 모든 자료형 마스터",
        gmaster: "김자료",
        startdate: "2020-01-13",
        days: "수,금",
        starttime: "19",
        endtime: "21",
        duration: "",
        intro: "옷장 정리 잘하시는 분 환영",
        member: "4"
      },

      {
        imgsrc: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        name: "백준 직강",
        topic: "알고리즘",
        goal: "코딩 테스트 패스하기",
        gmaster: "알고몬",
        startdate: "2019-11-13",
        days: "월,수,금",
        starttime: "06",
        endtime: "08",
        duration: "",
        intro: "함께 해요~",
        member: "5"
      },

      {
        imgsrc: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        name: "면접의 신",
        topic: "기술면접",
        goal: "면접관 뽀개기",
        gmaster: "신면접",
        startdate: "2019-12-22",
        days: "금",
        starttime: "20",
        endtime: "22",
        duration: "",
        intro: "모의면접을 실전면접처럼",
        member: "0"
      },

      {
        imgsrc: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        name: "알파베타감마고",
        topic: "인공지능",
        goal: "알파고 이기기",
        gmaster: "델타고",
        startdate: "2019-12-29",
        days: "화,금,토",
        starttime: "21",
        endtime: "23",
        duration: "",
        intro: "로봇에게 질 순 없잖아요?",
        member: "3"
      }
    ]
  }),
  computed: {
    isAuth: function() {
      return this.$store.getters.isAuth;
    }
  },
  components: {
    GroupModal: () => import("@/components/study/GroupModal")
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
    }
  }
};
</script>

<style>
#istudyname {
  color: blue;
  font-size: 25px;
  font-weight: 700;
}
#istudytopic {
  color: #24ccff;
  font-size: 20px;
  text-decoration: underline;
}
</style>