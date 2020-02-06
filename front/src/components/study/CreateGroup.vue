<template>
  <div id="createGroup" class="mx-5">
    <v-card class="pa-5 pb-2" elevation="0" v-if="!created">
      <p class="ml-5">그룹 생성</p>
      <hr />
      <v-simple-table>
        <template>
          <thead>
            <tr>
              <th colspan="8" class="text-end"><span class="red--text">*</span>는 필수항목입니다.</th>
            </tr>
          </thead>
          <tbody>
            <tr class="no-hover-color">
              <td><span class="red--text">*</span>카테고리</td>
              <td colspan="1">대분류</td>
              <td colspan="3">
                <div>
                  <v-overflow-btn
                    class="mt-4"
                    :items="majorItems"
                    v-model="major"
                    segmented
                    dense
                    style="width: 200px"
                  ></v-overflow-btn>
                </div>
              </td>
              <td colspan="1">소분류</td>
              <td colspan="3">
                <div>
                  <v-overflow-btn
                    class="mt-4"
                    :items="minorItems"
                    v-model="minor"
                    segmented
                    dense
                    style="width: 200px"
                  ></v-overflow-btn>
                </div>
              </td>
            </tr>
            <tr class="no-hover-color">
              <td><span class="red--text">*</span>그룹명</td>
              <td colspan="7">
                <v-text-field v-model="groupName" label="그룹명" :rules="groupRules" required></v-text-field>
              </td>
            </tr>
            <tr class="no-hover-color">
              <td><span class="red--text">*</span>모임목표(간이)</td>
              <td colspan="7">
                <v-text-field v-model="groupTarget" label="모임목표" :rules="targetRules" required></v-text-field>
              </td>
            </tr>
            <tr class="no-hover-color">
              <td><span class="red--text">*</span>
              모임소개(상세)
              </td>
              <td colspan="7">
                <v-textarea
                  class="pt-6"
                  label="그룹에 대한 소개를 150자 이하로 입력해주세요"
                  outlined
                  v-model="regText"
                  :rules="textRules"
                ></v-textarea>
              </td>
            </tr>
            <tr class="no-hover-color">
              <td>인원제한</td>
              <td colspan="7">
                <div>
                  <v-overflow-btn
                    class="mt-4"
                    :items="dropItems"
                    v-model="userLimit"
                    segmented
                    dense
                    label="제한없음"
                    style="width: 200px"
                  ></v-overflow-btn>
                </div>
              </td>
            </tr>
            <tr class="no-hover-color">
              <td>기간</td>
              <td colspan="7">
                <v-daterange
                  v-model="range"
                  display-format="yyyy-mm-dd"
                  no-title
                  :action-labels="{ apply: 'Apply' }"
                ></v-daterange>
              </td>
            </tr>
            <tr class="no-hover-color">
              <td>요일</td>
              <td colspan="7">
                <v-btn-toggle v-model="dayofweek" multiple dense group>
                  <v-btn v-for="item in weekformat" :key="item" :value="item">
                    {{
                    item
                    }}
                  </v-btn>
                </v-btn-toggle>
              </td>
            </tr>
            <tr class="no-hover-color">
              <td>시간대</td>
              <td colspan="7">
                <v-row>
                  <v-col cols="4" sm="3" class="pb-0 pr-0">
                    <timeselector v-model="starttime" class="grey lighten-4" />
                  </v-col>
                  <v-col cols="1" class="pb-0 px-0 text-center">
                    <span>~</span>
                  </v-col>
                  <v-col cols="4" sm="3" class="pb-0 pl-0">
                    <timeselector v-model="endtime" class="grey lighten-4" />
                  </v-col>
                  <v-spacer />
                </v-row>
              </td>
            </tr>
            <tr class="no-hover-color">
              <td>태그</td>
              <td colspan="7"></td>
            </tr>
            <tr class="no-hover-color">
              <td>공개 비공개</td>
              <td colspan="7">
                <v-radio-group v-model="radios" :mandatory="false">
                  <v-radio label="공개" value="공개"></v-radio>
                  <v-radio label="비공개" value="비공개"></v-radio>
                </v-radio-group>
              </td>
            </tr>
            <td colspan="8">
              <v-container class="pt-8 text-end">
                <span class="red--text pr-5">
                  {{message}}
                </span>
                <v-btn
                  class="primary font-weight-light"
                  @click="createGroup"
                  :disabled="!isComplete"
                >모임생성</v-btn>
              </v-container>
            </td>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <create-success v-else
      v-on:moveGroups="moveGroups"
      v-on:moveDetail="moveDetail"/>
  </div>
</template>

<script>
import VDaterange from "@/components/base/VDaterange";
import Timeselector from "vue-timeselector";
import { format } from 'date-fns'

export default {
  name: "createGroup",
  data: () => ({
    groupName: "",
    regText: "",
    groupTarget: "",
    groupRules: [
      v => !!v || "그룹명을 입력해주세요",
      v =>
        (v && v.length <= 15 && v.length >= 3) ||
        "그룹명은 3자이상 15자이내 입니다"
    ],
    textRules: [v => v.length <= 150 || "150자 초과"],
    targetRules: [
      v => !!v || "목표를 작성해주세요",
      v => (v && v.length <= 15) || "15자 이내로 작성해주세요"
    ],
    dropItems: [],
    userLimit: 0,
    majorItems: [],
    major: -1,
    minorItems: [],
    minor: -1,
    range: {},
    weekformat: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    dayofweek: [],
    starttime: "",
    endtime: "",
    radios: "공개",
    isComplete: false,
    created: 0,
    message: '',
  }),
  components: {
    VDaterange,
    Timeselector,
    CreateSuccess: () => import('@/components/study/CreateSuccess')
  },
  computed: {
    userID: function() {
      return this.$store.getters.userID;
    },
    accessToken: function() {
      return this.$store.getters.getToken;
    }
  },
  watch: {
    groupName() {
      this.validation();
    },
    groupTarget() {
      this.validation();
    },
    minor() {
      this.validation();
    },
    userLimit(){
      this.validation();
    },

    async major() {
      this.minorItems = [];

      const minor_classes = await this.$store.dispatch('study/getMinorClass', this.major);
      for (let i = 0; i < minor_classes.length; i++) {
        this.minorItems.push({
          value: minor_classes[i].id,
          text: minor_classes[i].name,
          callback: () => console.log(i)
        });
      }
      this.validation();
    }
  },
  methods: {
    validation() {
      if(this.major == -1){
        this.message = "대분류를 선택해주세요."
        this.isComplete = false
        return
      }else if(this.minor == -1){
        this.message = "소분류를 선택해주세요."
        this.isComplete = false
        return
      }else if (this.groupName.length < 3){
        this.message = "그룹명은 3자이상입니다."
        this.isComplete = false
        return;
      }else if (!this.groupTarget){
        this.message = "그룹의 목표를 입력해주세요."
        this.isComplete = false
        return;
      }
      this.message = ""
      this.isComplete = true;
    },
    async createGroup() {
      const studyInfo = {
        minor_class_id: this.minor, //int(11)	YES	MUL
        captain: this.$store.state.auth.user.uid, //int(11)	NO	MUL
        name: this.groupName, //varchar(45)	NO	UNI
        goal: this.groupTarget, //varchar(45)	YES
        description: this.regText, //longtext	NO
        user_limit: this.userLimit, //int(11)	YES
        start_time: (this.starttime)? this.starttime.getHours()*100 + this.starttime.getMinutes() : '0000', //int(11)	YES
        end_time: (this.endtime)?this.endtime.getHours()*100 + this.endtime.getMinutes() : '0000', //int(11)	YES
        status: "진행중",	//varchar(45)	YES
        start_date: (this.range.start)?this.range.start: format(new Date(), 'yyyy-MM-dd'), //date	YES
        end_date: (this.range.end)?this.range.end: format(new Date(), 'yyyy-MM-dd'), //date	YES
        isopen: this.radios == "공개" ? 1 : 0, //tinyint(4)	YES
        days: this.dayofweek,
      };

      const res = await this.$store.dispatch('study/createStudy', [studyInfo, this.$store.getters['auth/getToken']]);
      if(res.state == 'success'){
        this.created = res.detail.id
      }else{
        this.message = res.detail
      }
    },

    moveGroups(){
      this.$emit('moveGroups')
    },
    moveDetail(){
      this.$router.push({path: 'study/detail/'+this.created})
    }
  },
  async mounted() {
    this.dropItems = [{value: 0, text: '제한없음',callback: () => console.log('제한없음')}];
    for (var i = 1; i <= 99; i++) {
      this.dropItems.push({
        value: i,
        text: i,
        callback: () => console.log(i)
      });
    }

    this.majorItems = [];
    const getMajorRes = await this.$store.dispatch('study/getMajorClass') //await api.getMajorClasses();
    for (let i = 0; i < getMajorRes.length; i++) {
      this.majorItems.push({
        value: getMajorRes[i].id,
        text: getMajorRes[i].name,
        callback: () => console.log(i)
      });
    }
  }
};
</script>

<style>
p {
  font-size: 30px;
}

.v-text-field__details {
  display: inline-block !important;
}

.v-radio {
  display: flex;
  float: left;
}

.v-input--radio-group__input {
  display: inline-block;
}

.v-messages {
  display: none;
}

.no-hover-color:hover {
  background-color: white !important;
}
</style>
