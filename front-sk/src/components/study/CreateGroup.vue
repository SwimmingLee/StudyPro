<template>
  <div id="createGroup" class="mx-5">
    <v-card class="pa-5 pb-2">
      <p class="ml-5">그룹 생성</p>
      <hr />
      <v-simple-table>
        <template>
          <thead>
            <tr>
              <th v-for="(item, i) in 8" :key="i"></th>
            </tr>
          </thead>
          <tbody>
            <tr class="no-hover-color">
              <td>카테고리</td>
              <td colspan="7">[카테고리선택]</td>
            </tr>
            <tr class="no-hover-color">
              <td>그룹명</td>
              <td colspan="7">
                <v-text-field
                  v-model="groupName"
                  label="그룹명"
                  :rules="groupRules"
                  required
                ></v-text-field>
              </td>
            </tr>
            <tr class="no-hover-color">
              <td>모임목표(간이)</td>
              <td colspan="7">
                <v-text-field
                  v-model="groupTarget"
                  label="모임목표"
                  :rules="targetRules"
                  required
                ></v-text-field>
              </td>
            </tr>
            <tr class="no-hover-color">
              <td>모임소개(상세)</td>
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
                    segmented
                    dense
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
                  <v-btn v-for="item in weekformat" :key="item">{{
                    item
                  }}</v-btn>
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
              <td>검색어</td>
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
                <v-btn 
                 class="primary font-weight-light" 
                 @click="createGroup"
                 :disabled="!isComplete">
                 모임생성
                </v-btn>
              </v-container>
            </td>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
import VDaterange from "@/components/base/VDaterange";
import Timeselector from "vue-timeselector";

export default {
  name: "createGroup",
  data: () => ({
    category: 'dsf',
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
    range: {},
    weekformat: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    dayofweek: [],
    starttime: "",
    endtime: "",
    radios: '',
    isComplete: false,
  }),
  components: {
    VDaterange,
    Timeselector
  },
  watch: {
    groupName(){this.validation();},
    groupTarget(){this.validation();},
    category(){this.validation();}
  }, 
  methods: {
    validation(){
      if(!this.groupName) return false;
      else if(!this.groupTarget) return false;
      else if(!this.category) return false;

      this.isComplete = true;
    },
    createGroup(){
      
    },
  },
  mounted() {
    this.dropItems = [];
    for (var i = 1; i <= 6; i++) {
      this.dropItems.push({
        text: i,
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

.no-hover-color:hover{
  background-color: white !important;
}

</style>
