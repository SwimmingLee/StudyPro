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
            :key="item.title"
            v-model="item.active"
            :prepend-icon="item.action"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item v-for="subItem in item.items" :key="subItem.title">
              <v-list-item-content>
                <v-list-item-title v-text="subItem.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-card>
    </v-container>
  </div>
</template>

<script>
var count = 0;
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
        title: "Attractions",
        items: [{ title: "List Item" }]
      },
      {
        action: "restaurant",
        title: "Dining",
        active: true,
        items: [
          { title: "Breakfast & brunch" },
          { title: "New American" },
          { title: "Sushi" }
        ]
      },
      {
        action: "school",
        title: "Education",
        items: [{ title: "List Item" }]
      },
      {
        action: "directions_run",
        title: "Family",
        items: [{ title: "List Item" }]
      },
      {
        action: "healing",
        title: "Health",
        items: [{ title: "List Item" }]
      },
      {
        action: "content_cut",
        title: "Office",
        items: [{ title: "List Item" }]
      },
      {
        action: "local_offer",
        title: "Promotions",
        items: [{ title: "List Item" }]
      }
    ]
  }),
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
      console.log(this.items);
      setTimeout(() => {
        for (var i = 0; i < 10; i++) {
          this.items.push({
            action: "local_activity",
            title: "Attractions" + count++,
            items: [{ title: "List Item" }]
          });
          this.busy = false;
        }
      }, 1000);
    }
  }
};
</script>
