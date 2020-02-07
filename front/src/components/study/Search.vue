<template>
  <v-content id="contents" class="py-5">
    <v-row class="justify-center">
      <v-col class="pa-2 col-10 col-md-9">
        <!-- 검색 창 -->
        <v-autocomplete
          :items="recommendItems"
          :loading="isLoading"
          :search-input.sync="searchInput"
          clearable
          hide-details
          item-text="name"
          item-value="symbol"
          label="이름으로 검색"
          solo
          @keyup.enter="searchEnter()"
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-title>
                찾으실
                <strong>모임이름</strong>
                을 입력해주세요.
              </v-list-item-title>
            </v-list-item>
          </template>
          <template v-slot:item="{ item }" @click="selectAuto(item.name)">
            <v-list-item-avatar
              color="indigo"
              class="headline font-weight-light white--text"
              >{{ item.name.charAt(0) }}</v-list-item-avatar
            >
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>people</v-icon>
            </v-list-item-action>
          </template>
        </v-autocomplete>
        <!-- 검색 창 끝 -->
      </v-col>
    </v-row>

    <!-- 상세 검색 -->
    <v-row class="justify-center">
      <v-col class="col-11 col-md-9 pt-0 mx-auto">
        <v-expansion-panels>
          <v-expansion-panel hover>
            <v-expansion-panel-header>상세검색</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col sm="3" class="pl-6 pb-0">
                  <span>시작날짜</span>
                </v-col>
                <v-col sm="4" md="3" class="pb-0 pt-0">
                  <v-menu
                    ref="calendar"
                    v-model="calendar"
                    :close-on-content-click="false"
                    :return-value.sync="searchForm.startdate"
                    transition="scale-transition"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="searchForm.startdate"
                        label="start date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        class="pt-0"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="searchForm.startdate"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="calendar = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.calendar.save(searchForm.startdate)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <hr />
              <v-row class="pb-4">
                <v-col sm="3" class="pl-6 pb-0">
                  <span>시간</span>
                </v-col>
                <v-col cols="4" sm="3" class="pb-0 pr-0">
                  <timeselector
                    v-model="searchForm.starttime"
                    class="grey lighten-4"
                  />
                </v-col>
                <v-col cols="1" class="pb-0 px-0 text-center">
                  <span>~</span>
                </v-col>
                <v-col cols="4" sm="3" class="pb-0 pl-0">
                  <timeselector
                    v-model="searchForm.endtime"
                    class="grey lighten-4"
                  />
                </v-col>
                <v-spacer />
              </v-row>
              <hr />
              <v-row>
                <v-col sm="3" class="pl-6 pb-0 pt-4">
                  <span>요일</span>
                </v-col>
                <v-col sm="9" class="pb-0 pt-1 pl-0">
                  <v-btn-toggle
                    v-model="searchForm.dayofweek"
                    multiple
                    dense
                    group
                  >
                    <v-btn>Mon</v-btn>
                    <v-btn>Tue</v-btn>
                    <v-btn>Wed</v-btn>
                    <v-btn>Thu</v-btn>
                    <v-btn>Fri</v-btn>
                    <v-btn>Sat</v-btn>
                    <v-btn>Sun</v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-row>
              <hr />
              <v-row class="pt-4">
                <v-col sm="3" class="pl-6 pb-0 pt-4">
                  <span>기간</span>
                </v-col>
                <v-col sm="2" class="pb-0 pt-2">
                  <v-text-field
                    class="pt-0 pb-3 inputDuration"
                    hide-details
                    v-model="searchForm.duration"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col sm="3" class="pb-0 pt-0">
                  <v-overflow-btn
                    class="my-2 pb-0"
                    v-model="durationOp"
                    :items="itemsDuration"
                    label="select"
                    target="#"
                    dense
                  ></v-overflow-btn>
                </v-col>
              </v-row>
              <hr />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <!-- 결과 테이블 -->
    <v-card class="col-10 offset-1">
      <v-toolbar color="blue lighten-2" dark>
        <v-toolbar-title>Search Results</v-toolbar-title>
      </v-toolbar>
      <v-content v-if="noResult" class="text-center pt-10">
        <span>검색 대상을 찾지 못했습니다.</span>
      </v-content>
      <v-list
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="10"
      >
        <v-list-group
          v-for="item in display"
          :key="item.id"
          v-model="item.active"
          :prepend-icon="item.action"
          :disabled="disLoading"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-row>
                <v-col cols="12" md="5" class="pl-3 text-center">
                  <v-list-item-title 
                    v-text="item.name"
                    class="text-overflow">
                  </v-list-item-title>
                </v-col>
                <v-col cols="6" sm="4" md="2" class="text-center">
                  <span>Mon, Fri</span>
                </v-col>
                <v-col cols="6" sm="4" md="2" class="text-center">
                  <span>{{ item.start_time+'/'+item.end_time | times}}</span>
                </v-col>
                <v-col cols="6" sm="2" md="2" class="text-center">
                  <span>{{ 0 +'/'+ item.user_limit | limit}}</span>
                </v-col>
                <v-col cols="6" sm="2" md="1" class="text-center pr-3" v-if="item.isopen">
                  <v-icon class="mdi mdi-lock"></v-icon>
                </v-col>
              </v-row>
            </v-list-item-content>
          </template>
          <!-- 펼쳤을 때 화면 -->
          <template>
            <v-layout class="ma-2" row>
              <v-list-item :key="item.id">
                <v-list-item-content class="pt-0 pb-1">
                  <v-row class="px-2">
                    <v-col cols="12" md="5" class="align-center justify-center">
                      <v-avatar color="white">
                        <v-icon size="62">mdi-account-circle</v-icon>
                      </v-avatar>
                    </v-col>

                    <!-- 내용 -->
                    <v-col cols="12" md="7" class="pl-4">
                      <!-- 스터디 소개글 -->
                      <v-row class="pb-2">
                        <v-col cols="4" md="5" class="text-end pr-3">
                          <v-content text class="pt-0 font-weight-bold"
                            >스터디 목표</v-content
                          >
                        </v-col>
                        <v-col cols="8" md="7" class="pl-2">{{
                          item.goal
                        }}</v-col>
                      </v-row>
                      <!-- 시작시간 -->
                      <v-row class="pb-2">
                        <v-col cols="4" md="5" class="text-end pr-3">
                          <v-content text class="pt-0 font-weight-bold"
                            >시작날짜</v-content
                          >
                        </v-col>
                        <v-col cols="8" md="7" class="pl-2">{{
                          item.start_date
                        }}</v-col>
                      </v-row>
                      <!-- 스터디기간 -->
                      <v-row>
                        <v-col cols="4" md="5" class="text-end pr-3">
                          <v-content text class="pt-0 font-weight-bold"
                            >스터디기간</v-content
                          >
                        </v-col>
                        <v-col cols="8" md="7" class="pl-2">{{
                          item.start_date + '/' + item.end_date | duration
                        }}</v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" class="justify-center pa-0">
                      <v-btn
                        class="white lighten-3"
                        elevation="1"
                        @click="viewDetail(item.id)"
                      >
                        <span class="dark--text">view detail</span>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
              <group-modal
                :group-modal="groupModal"
                :id="id"
                :item="item"
                v-on:close="modalClose"
              />
            </v-layout>
          </template>
        </v-list-group>
      </v-list>
    </v-card>
  </v-content>
</template>

<script>
import Timeselector from "vue-timeselector";
//import api from "@/services";

export default {
  data: () => ({
    isLoading: false,
    searchInput: null,
    tab: null,
    busy: false,
    groupModal: false,
    calendar: false,
    durationOp: "",
    itemsDuration: ["Day", "Week", "Month", "Year"],
    id: 0,
    searchForm: {
      name: "",
      startdate: "",
      starttime: "",
      endtime: "",
      dayofweek: [],
      duration: "",
      tags: "",
      minorClass: "",
      goal: ""
    },
    items: [],
    copyItems: [],
    recommendItems: [],
    displayItems: [],
    searchedItems: [],
    disLoading: false,
    noResult: false,
  }),
  components: {
    GroupModal: () => import("@/components/study/GroupModal"),
    Timeselector
  },
  computed: {
    display() {
      if(this.items.length == 0){
        this.loadDeaultList()
      }
      return this.displayItems;
    },

    autocomplete() {
      return 1;
    },
  },
  watch: {
    searchInput() {
      this.recommendItems = [];

      if (this.searchInput == "") {
        return;
      } else {
        for (var item of this.items) {
          if (item.name.includes(this.searchInput)) {
            this.recommendItems.push(item);
          }
        }
      }
    }
  },
  methods: {
    async loadDeaultList() {
      this.items = await this.$store.dispatch("study/getAllStudy");
      this.copyItems = this.items.slice(0);

      this.displayItems = [];
      let len = this.copyItems.length < 20 ? this.copyItems.length : 20;
      for (var i = 0; i < len; i++) {
        this.displayItems.push(this.copyItems.shift());
      }
    },

    loadMore() {
      this.busy = true;
      setTimeout(() => {
        let len = 10;
        if (this.recommendItems.length < 10) len = this.recommendItems.length;
        for (var i = 0; i < len; i++) {
          this.displayItems.push(this.recommendItems.shift());
        }
      }, 1000);
      this.busy = false;
    },

    async searchEnter() {
      this.busy = true
      this.displayItems = []
      this.noResult = false
      if (!this.searchInput) {
        await this.loadDeaultList();
        this.busy = false;
        return;
      } else {
        for (var item of this.items) {
          if (item.name.includes(this.searchInput)) {
            this.searchedItems.push(item);
          }
        }
        let len = this.searchedItems.length < 20 ? this.searchedItems.length : 20;
        for (var i = 0; i < len; i++) {
          this.displayItems.push(this.searchedItems.shift());
        }
      }
      console.log(this.displayItems)
      this.searchInput = ''
      if (this.displayItems.length == 0) {
        this.noResult = true
      }
      this.busy = false;
    },

    selectAuto(name) {
      this.searchInput = name;
    },

    viewDetail(id) {
      this.id = id;
      this.groupModal = true;
    },
    modalClose() {
      this.groupModal = false;
    }
  },
  filters: {
    duration(value){
      let arr = value.split('/')
      let start = arr[0].trim().split('-')
      let end = arr[1].trim().split('-')
      let year = end[0] - start[0]
      let month = end[1] - start[1]
      let day = end[2] - start[2]
      let result = ''
      if(year != 0)  result += year+'년 '
      if(month != 0)  result += month+'월 '
      if(day != 0)  result += day+'일'
      
      if(result == '')  return '기간미지정'
      else  return result
    },
    times(value){
      let arr = value.split('/')
      let start = [Math.floor(arr[0]/100), arr[0]%100]
      let end = [Math.floor(arr[1]/100), arr[1]%100]
      return start[0]+':'+start[1]+' ~ '+end[0]+':'+end[1]
    },
    limit(value){
      let arr = value.split('/')
      if(arr[0] == arr[1]){
        return '무제한'
      }
      return value
    }
  }
};
</script>

<style>
.v-text-field__details {
  display: none;
}
.v-list-item__icon{
  min-width: 24px !important;
}
</style>
