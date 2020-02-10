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
          <v-slide-item v-for="studyInfo in studyList" :key="studyInfo.id">
            <v-card
              color="white"
              class="ma-4"
              height="auto"
              width="200"
              @click="viewDetail(studyInfo)"
            >
              <v-img
                color="rgb(255, 0, 0, 0.2)"
                class="white--text align-end"
                height="auto"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-row class="pt-4" justify="center">
                  <v-avatar size="100" class="mr-2">
                    <v-img :src="studyInfo.captain.profile_url"> </v-img>
                  </v-avatar>
                </v-row>

                <v-card-title style="font-size:30px">{{
                  studyInfo.name
                }}</v-card-title>
                <v-card-title style="font-size:15px">{{
                  studyInfo.description
                }}</v-card-title>
                <v-card-title style="font-size:15px">
                  시간 : {{ studyInfo.start_time }} -
                  {{ studyInfo.end_time }}</v-card-title
                >
              </v-img>

              <!-- <v-img
                class="white--text align-end"
                height="150px"
                :src="item.imgsrc"
              ></v-img> -->

              <!-- <v-row justify="center">
                <p id="istudyname" class="mt-3">{{ studyInfo.name }}</p>
              </v-row>

              <v-row justify="center">
                <p id="istudytopic">{{ studyInfo.description }}</p>
              </v-row>

              <v-row justify="center">
                <p style="font-size:15px">{{ item.days }}</p>
              </v-row>

              <v-row justify="center">
                <p style="font-size:15px">
                  시간 : {{ studyInfo.start_time }} - {{ studyInfo.end_time }}
                </p>
              </v-row>

              <v-row justify="center">
                <p style="font-size:15px">인원 : {{ item.member }} / 6</p>
              </v-row> -->
            </v-card>
          </v-slide-item>
          <template>
            <group-modal
              :group-modal="groupModal"
              :study-info="studyInfo"
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
import StudyService from "@/services/study.service";

export default {
  name: "tabs",
  data: () => ({
    current: "ng",

    studyList: [],
    studyInfo: null,

    groupModal: false,
    item: {},
    items: []
  }),
  async created() {
    this.studyList = await StudyService.getAllStudy();
  },
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
    viewDetail(studyInfo) {
      console.log('viewde',studyInfo)
      this.groupModal = true;
      this.studyInfo = studyInfo;
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
