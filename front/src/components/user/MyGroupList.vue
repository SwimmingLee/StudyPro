<template>
  <v-card class="mx-4" tile min-height="450px">
    <v-card-title>
      가입한 그룹목록
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      :search="search"
    >
      <template slot="body" slot-scope="props">
        <tr 
          v-for="item in props.items" 
          :key="item.id" 
          @click="clickGroup(item)"
          class="clickable">
          <td class="text-center">{{ item.category }}</td>
          <td class="text-center">{{ item.name }}</td>
          <td class="text-center">{{ item.time }}</td>
          <td class="text-center">{{ item.dayofweek }}</td>
          <td class="text-center">{{ item.regDate }}</td>
        </tr>
      </template>
      <v-alert slot="no-results" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>

<script>

export default {
  components: {},
  data: () => ({
    expanded: [],
    singleExpanded: true,
    selected: [],
    search: "",
    headers: [
      { text: "카테고리", align: "center", value: "category" },
      { text: "그룹명", align: "center", value: "name" },
      { text: "시간", align: "center", value: "time" },
      { text: "요일", align: "center", sortable: false, value: "dayofweek" },
      { text: "가입일", align: "center", value: "regDate" }
    ],
    items: [
      {
        category: "IT/소프트웨어",
        name: "SSAFY 대비반",
        time: "18:00 ~ 20:00",
        dayofweek: "Mon, Wed, Fri",
        regDate: "2020-01-30"
      },
      {
        category: "IT/소프트웨어",
        name: "SSAFY 대비반",
        time: "18:00 ~ 20:00",
        dayofweek: "Mon, Wed, Fri",
        regDate: "2020-01-30"
      },
      {
        category: "IT/소프트웨어",
        name: "SSAFY 대비반",
        time: "18:00 ~ 20:00",
        dayofweek: "Mon, Wed, Fri",
        regDate: "2020-01-30"
      },
      {
        category: "IT/소프트웨어",
        name: "SSAFY 대비반",
        time: "18:00 ~ 20:00",
        dayofweek: "Mon, Wed, Fri",
        regDate: "2020-01-30"
      },
      {
        category: "IT/소프트웨어",
        name: "SSAFY 대비반",
        time: "18:00 ~ 20:00",
        dayofweek: "Mon, Wed, Fri",
        regDate: "2020-01-30"
      },
      {
        category: "IT/소프트웨어",
        name: "SSAFY 대비반",
        time: "18:00 ~ 20:00",
        dayofweek: "Mon, Wed, Fri",
        regDate: "2020-01-30"
      },
      {
        category: "IT/소프트웨어",
        name: "SSAFY 대비반",
        time: "18:00 ~ 20:00",
        dayofweek: "Mon, Wed, Fri",
        regDate: "2020-01-30"
      },
      {
        category: "IT/소프트웨어",
        name: "SSAFY 대비반",
        time: "18:00 ~ 20:00",
        dayofweek: "Mon, Wed, Fri",
        regDate: "2020-01-30"
      },
      {
        category: "IT/소프트웨어",
        name: "SSAFY 대비반",
        time: "18:00 ~ 20:00",
        dayofweek: "Mon, Wed, Fri",
        regDate: "2020-01-30"
      },
      {
        category: "IT/소프트웨어",
        name: "SSAFY 대비반",
        time: "18:00 ~ 20:00",
        dayofweek: "Mon, Wed, Fri",
        regDate: "2020-01-30"
      },
      {
        category: "IT/소프트웨어",
        name: "SSAFY 대비반",
        time: "18:00 ~ 20:00",
        dayofweek: "Mon, Wed, Fri",
        regDate: "2020-01-30"
      },
      {
        category: "IT/소프트웨어",
        name: "SSAFY 대비반",
        time: "18:00 ~ 20:00",
        dayofweek: "Mon, Wed, Fri",
        regDate: "2020-01-30"
      },
      {
        category: "IT/소프트웨어",
        name: "SSAFY 대비반",
        time: "18:00 ~ 20:00",
        dayofweek: "Mon, Wed, Fri",
        regDate: "2020-01-30"
      },
      {
        category: "IT/소프트웨어",
        name: "SSAFY 대비반",
        time: "18:00 ~ 20:00",
        dayofweek: "Mon, Wed, Fri",
        regDate: "2020-01-30"
      },
      {
        category: "IT/소프트웨어",
        name: "SSAFY 대비반",
        time: "18:00 ~ 20:00",
        dayofweek: "Mon, Wed, Fri",
        regDate: "2020-01-30"
      },
      {
        category: "IT/소프트웨어",
        name: "SSAFY 대비반",
        time: "18:00 ~ 20:00",
        dayofweek: "Mon, Wed, Fri",
        regDate: "2020-01-30"
      },
      {
        category: "IT/소프트웨어",
        name: "SSAFY 대비반",
        time: "18:00 ~ 20:00",
        dayofweek: "Mon, Wed, Fri",
        regDate: "2020-01-30"
      },
      {
        category: "IT/소프트웨어",
        name: "SSAFY 대비반",
        time: "18:00 ~ 20:00",
        dayofweek: "Mon, Wed, Fri",
        regDate: "2020-01-30"
      }
    ]
  }),
  methods: {
    clickGroup(p) {
      this.$router.push({ name: 'studydetail', params:{id: p.id}})
    }
  },
  mounted() {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].id = i;
    }
  }
};
</script>

<style>
p {
  font-size: 30px;
}

.clickable {
  cursor: pointer;
}

.clickable:hover{
  background-color: rgba(200,200,200,.2);
}
</style>
