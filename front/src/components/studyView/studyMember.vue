<template>
  <v-container style="min-height: 500px">
    <v-list v-if="isCaptain">
      <v-toolbar elevation="0" style="border-bottom: 5px solid #736C70;">
        <v-toolbar-title>가입 요청 목록</v-toolbar-title>
      </v-toolbar>

      <v-list-item v-for="newbie in newbieList" :key="newbie.id">
        <v-row style="border-bottom: 1px solid #E5C1D4;">
          <v-col cols="1" align="center">
            <v-avatar size="40px" class="ma-0">
              <img :src="newbie.user.profile_url" />
            </v-avatar>
          </v-col>

          <v-col align="center" cols="2">
            <p style="font-size:14px" class="ma-0 pt-2">
              {{ newbie.user.nickname }}
            </p>
          </v-col>

          <v-col align="center" cols="1">
            <p style="font-size:14px" class="ma-0 pt-2">
              {{ newbie.user.gender == "M" ? "남성" : "여성" }}
            </p>
          </v-col>

          <v-col align="center" cols="5">
            <p style="font-size:14px" class="ma-0 pt-2">
              {{ newbie.user.email }}
            </p>
          </v-col>

          <v-col align="center" cols="1">
            <v-icon
              @click="
                (modalType = 'greeting'),
                  (selectedUser = newbie),
                  (modal = true)
              "
              color="black"
              >more_horiz</v-icon
            >
          </v-col>

          <v-col align="center" cols="1">
            <v-icon
              @click="
                (modalType = 'accept'), (selectedUser = newbie), (modal = true)
              "
              color="green"
              >check</v-icon
            >
          </v-col>

          <v-col align="center" cols="1">
            <v-icon
              @click="
                (modalType = 'decline'), (selectedUser = newbie), (modal = true)
              "
              color="red"
              >close</v-icon
            >
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>

    <v-list>
      <v-toolbar elevation="0" style="border-bottom: 5px solid #736C70;">
        <v-toolbar-title>스터디 팀원</v-toolbar-title>
      </v-toolbar>

      <v-list-item v-for="member in memberList" :key="member.id">
        <v-row style="border-bottom: 1px solid #E5C1D4;">
          <v-col align-self="center" align="center" cols="1">
            <v-avatar size="40px" class="ma-0">
              <img :src="member.profile_url" />
            </v-avatar>
          </v-col>

          <v-col align-self="center" align="center" cols="2">
            <p style="font-size:14px" class="ma-0">
              {{ member.nickname }}
            </p>
          </v-col>

          <v-col align-self="center" align="center" cols="1">
            <p style="font-size:14px" class="ma-0">
              {{ member.gender == "M" ? "남성" : "여성" }}
            </p>
          </v-col>

          <v-col align-self="center" align="center" cols="5">
            <p style="font-size:14px" class="ma-0">
              {{ member.email }}
            </p>
          </v-col>

          <v-col align="center" cols="3">
            <!-- <v-icon @click="viewGreeting(member)" color="black"
              >more_horiz</v-icon
            > -->
            <v-row>
              <v-col cols="6">
                <v-img
                  v-if="member.level == 'captain'"
                  src="@/assets/images/crown.png"
                  height="30px"
                  width="30px"
                />

                <v-btn
                  v-else-if="member.level == 'gold'"
                  @click="changeLevel(member)"
                  fab
                  dark
                  color="orange"
                  height="30px"
                  width="30px"
                >
                  <v-icon style="font-size:20px" class="mb-2" dark>G</v-icon>
                </v-btn>

                <v-btn
                  v-else-if="member.level == 'silver'"
                  @click="changeLevel(member)"
                  fab
                  dark
                  color="grey"
                  height="30px"
                  width="30px"
                >
                  <v-icon style="font-size:20px" class="mb-2" dark>S</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-icon
                  v-if="isCaptain && member.level != 'captain'"
                  @click="
                    (modalType = 'delete'),
                      (selectedUser = member),
                      (modal = true)
                  "
                  color="red"
                  >close</v-icon
                >

                <v-icon
                  v-else-if="
                    !isCaptain &&
                      member.level != 'captain' &&
                      member.id == currentUser.uid
                  "
                  style="font-size:15px"
                  @click="
                    (modalType = 'selfdel'),
                      (selectedUser = member),
                      (modal = true)
                  "
                  color="red"
                  >탈퇴하기</v-icon
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-list-item>

      <modal :open-modal="modal" :close="modalClose">
        <template v-slot:text>
          <span v-if="modalType == 'delete'">{{ selectedUser.nickname }}</span>
          <span
            v-if="
              modalType != 'delete' &&
                modalType != 'error' &&
                modalType != 'selfdel'
            "
            >{{ selectedUser.user.nickname }}</span
          >
          {{ modalText[modalType] }}
          <p v-if="modalType == 'greeting'">{{ selectedUser.comment }}</p>
        </template>
        <template v-slot:btn>
          <div class="text-end pr-3 pb-3">
            <v-btn
              text
              @click="acceptMember"
              class="primary--text"
              v-show="modalType == 'accept'"
              >예</v-btn
            >
            <v-btn
              text
              @click="declineMember"
              class="primary--text"
              v-show="modalType == 'decline'"
              >예</v-btn
            >
            <v-btn
              text
              @click="deleteMember"
              class="primary--text"
              v-show="modalType == 'delete'"
              >예</v-btn
            >

            <v-btn
              text
              @click="deleteMember"
              class="primary--text"
              v-show="modalType == 'selfdel'"
              >예</v-btn
            >

            <v-btn
              text
              @click="modal = false"
              class="error--text"
              v-show="modalType != 'error' && modalType != 'greeting'"
              >아니오</v-btn
            >
            <v-btn
              text
              @click="modal = false"
              class="error--text"
              v-show="modalType == 'error' || modalType == 'greeting'"
              >확인</v-btn
            >
          </div>
        </template>
      </modal>
    </v-list>
  </v-container>
</template>

<script>
import StudyService from "@/services/study.service";

export default {
  props: ["study_id"],

  data: () => ({
    // thisUser: "",
    // thisCaptain: "",

    // flag: false,
    modal: false,
    modalType: "",
    member: {},
    newbieList: [],
    memberList: [],
    studyInfo: {},
    isCaptain: false,
    selectedUser: {
      user: {
        nickname: ""
      }
    },
    modalText: {
      greeting: "님의 가입인사",
      accept: "님의 가입 요청을 승인하시겠습니까?",
      decline: "님의 가입 요청을 거절하시겠습니까?",
      delete: "님을 탈퇴시키겠습니까?",
      selfdel: "정말로 탈퇴하시겠습니까?",
      error: "오류가 발생했습니다"
    }
  }),

  async created() {
    await this.loadStudyInfo();
    if (this.isCaptain) this.getApplyList();
    this.getjoinedUser();
  },

  watch: {
    studyInfo() {
      if (
        this.studyInfo &&
        this.currentUser &&
        this.currentUser.uid == this.studyInfo.captain
      ) {
        this.isCaptain = true;
      } else this.isCaptain = false;
    }
  },

  computed: {
    currentUser() {
      return this.$store.getters["auth/getUser"];
    }
  },

  components: {
    modal: () => import("@/components/base/Modal")
  },
  methods: {
    changeLevel(member) {
      console.log(member.level);
      console.log(member.id);
      console.log("clicked..!");
    },

    confirmAccept(newbie) {
      this.acceptModal = true;
      this.newbie = newbie;
    },
    confirmDecline(newbie) {
      this.declineModal = true;
      this.newbie = newbie;
    },
    viewGreeting(newbie) {
      this.greetingModal = true;
      this.newbie = newbie;
    },
    confirmDelete(member) {
      this.deleteModal = true;
      this.member = member;
    },

    getApplyList() {
      StudyService.getApplyList({ study_id: this.study_id }).then(
        newbieList => {
          this.newbieList = newbieList.data;
        }
      );
    },
    getjoinedUser() {
      StudyService.getjoinedUser({ study_id: this.study_id }).then(
        memberList => {
          this.memberList = memberList.data;
        }
      );
    },

    async loadStudyInfo() {
      this.studyInfo = await StudyService.getStudyInfo({
        study_id: this.study_id
      }).then(res => {
        return res.data;
      });
    },

    async acceptMember() {
      var res = await StudyService.joinStudy({
        apply_id: this.selectedUser.id,
        accept: true
      }).then(res => {
        return res.data;
      });
      if (res.state == "success") {
        this.getApplyList();
        this.getjoinedUser();
        this.modal = false;
      } else {
        this.modalType = "error";
      }
    },

    async declineMember() {
      var res = await StudyService.joinStudy({
        apply_id: this.selectedUser.id,
        accept: false
      }).then(res => {
        return res.data;
      });
      if (res.state == "success") {
        this.getApplyList();
        this.getjoinedUser();
        this.modal = false;
      } else {
        this.modalType = "error";
      }
    },

    async deleteMember() {
      var res = await StudyService.deleteUser({
        study_id: this.study_id,
        user_id: this.selectedUser.id
      }).then(res => {
        return res.data;
      });
      if (res.state == "success") {
        this.getApplyList();
        this.getjoinedUser();
        this.modal = false;
      } else {
        this.modalType = "error";
      }
    },

    modalClose() {
      this.modal = false;
    }
  }
};
</script>
