<template>
  <div id="contents">
    <v-container fluid>
      <v-row class="justify-center">
        <v-col class="pa-2 col-10 col-md-9">
          <!-- 검색 창 -->
          <v-autocomplete
            v-model="model"
            :items="items"
            :loading="isLoading"
            :search-input.sync="search"
            chips
            clearable
            hide-details
            hide-selected
            item-text="name"
            item-value="symbol"
            label="Search for Study Groups..."
            solo
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-title>
                  Search for your favorite
                  <strong>Groups</strong>
                </v-list-item-title>
              </v-list-item>
            </template>
            <template v-slot:selection="{ attr, on, item, selected }">
              <v-chip
                v-bind="attr"
                :input-value="selected"
                color="blue-grey"
                class="white--text"
                v-on="on"
              >
                <v-icon left>mdi-coin</v-icon>
                <span v-text="item.name"></span>
              </v-chip>
            </template>
            <template v-slot:item="{ item }">
              <v-list-item-avatar
                color="indigo"
                class="headline font-weight-light white--text"
              >
                {{ item.name.charAt(0) }}
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
                <v-list-item-subtitle
                  v-text="item.symbol"
                ></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-coin</v-icon>
              </v-list-item-action>
            </template>
          </v-autocomplete>
          <!-- 검색 창 끝 -->
        </v-col>
      </v-row>

      <!-- 상세 검색 -->
      <v-row class="justify-center">
        <v-col class="col-10 col-md-9 pt-0 mx-auto">
          <v-expansion-panels>
            <v-expansion-panel hover>
              <v-expansion-panel-header>Details</v-expansion-panel-header>
              <v-expansion-panel-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>

    <!-- 결과 테이블 -->
    <v-container>
      <v-card max-width="100%" class="mx-auto">
        <v-toolbar color="red lighten-3" dark>
          <v-toolbar-title>Search Results</v-toolbar-title>
        </v-toolbar>

        <v-list
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="10"
        >
          <v-list-group
            v-for="item in items"
            :key="item.gid"
            v-model="item.active"
            :prepend-icon="item.action"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-layout row>
                  <v-flex column xs7 class="pl-3">
                    <v-list-item-title
                      v-text="item.groupName"
                    ></v-list-item-title>
                  </v-flex>
                  <v-flex column xs2>
                    <span>Mon, Fri</span>
                  </v-flex>
                  <v-flex column xs2>
                    <span>08:00 ~ 12:00</span>
                  </v-flex>
                  <v-flex column xs1 text-center>
                    <v-icon class="mdi mdi-lock" v-if="item.locked"></v-icon>
                  </v-flex>
                </v-layout>
              </v-list-item-content>
            </template>
            <!-- 펼쳤을 때 화면 -->
            <template>
              <v-layout class="ma-2" row>
                <v-flex column xs12 md10>
                  <v-list-item
                    v-for="subItem in item.items"
                    :key="subItem.intro"
                  >
                    <v-list-item-content>
                      <v-layout row class="px-3">
                        <v-layout column xs2 align-center justify-center>
                          <v-avatar color="white ">
                            <v-icon size="62">mdi-account-circle</v-icon>
                          </v-avatar>
                        </v-layout>

                        <!-- 내용 -->
                        <v-flex column xs10 class="pl-4">
                          <!-- 스터디 소개글 -->
                          <v-layout row class="pb-2">
                            <v-flex column xs2 class="text-end pr-3">
                              <v-content text class="font-weight-bold"
                                >스터디 소개</v-content
                              >
                            </v-flex>
                            <v-flex column xs7>
                              {{ subItem.intro }}
                            </v-flex>
                          </v-layout>
                          <!-- 시작시간 -->
                          <v-layout row class="pb-2">
                            <v-flex column xs2 class="text-end pr-3">
                              <v-content text class="font-weight-bold"
                                >시작날짜</v-content
                              >
                            </v-flex>
                            <v-flex column xs7>
                              {{ subItem.startDate }}
                            </v-flex>
                          </v-layout>
                          <!-- 스터디기간 -->
                          <v-layout row>
                            <v-flex column xs2 class="text-end pr-3">
                              <v-content text class="font-weight-bold"
                                >스터디기간</v-content
                              >
                            </v-flex>
                            <v-flex column xs7>
                              {{ subItem.duration }}
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-list-item-content>
                  </v-list-item>
                </v-flex>
                <v-layout column xs-3 md-2 justify-center>
                  <v-btn
                    class="white lighten-3"
                    elevation="1"
                    @click="viewDetail(item.gid)"
                  >
                    <span class="dark--text">view detail</span>
                  </v-btn>
                </v-layout>
                <group-modal
                  :group-modal="groupModal"
                  :gid="gid"
                  v-on:close="modalClose"
                />
              </v-layout>
            </template>
          </v-list-group>
        </v-list>
      </v-card>
    </v-container>
  </div>
</template>

<script>
var count = 2;
export default {
  data: () => ({
    isLoading: false,
    model: null,
    search: null,
    tab: null,
    data: [],
    busy: false,
    items: [
      {
        action: "local_activity",
        gid: 1,
        groupName: "Group1",
        items: [
          {
            intro: "저희 스터디 모임은 ....",
            startDate: "2020년 1월 22일",
            duration: "2달"
          }
        ],
        locked: true
      }
    ],
    groupModal: false,
    gid: 0
  }),
  components: {
    GroupModal: () => import("@/components/studysearch/GroupModal")
  },
  watch: {
    model(val) {
      if (val != null) this.tab = 0;
      else this.tab = null;
    },
    search() {
      // Items have already been loaded
      if (this.items.length > 0) return;

      this.isLoading = true;

      // Lazily load input items
      fetch("https://api.coinmarketcap.com/v2/listings/")
        .then(res => res.json())
        .then(res => {
          this.items = res.data;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    }
  },
  methods: {
    loadMore: function() {
      this.busy = true;
      setTimeout(() => {
        for (var i = 0; i < 10; i++) {
          this.items.push({
            action: "local_activity",
            gid: 0 + count,
            groupName: "Group" + count++,
            items: [
              {
                intro: "저희 스터디 모임은 ....",
                startDate: "2020년 1월 " + count + "일",
                duration: count + "달"
              }
            ],
            locked: false
          });
          this.busy = false;
        }
      }, 1000);
    },
    viewDetail(gid) {
      this.gid = gid;
      this.groupModal = true;
    },
    modalClose() {
      this.groupModal = false;
    }
  }
};
</script>
