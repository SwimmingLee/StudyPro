<template>
  <v-content id="home">
    <v-container>
      <v-row>
        <v-col cols="12" lg="9" md="8" sm="12">
          <v-card class="pa-1" outlined tile>
            <top-left />
          </v-card>
        </v-col>
        <v-col lg="3" md="4" class="d-none d-md-block">
          <v-card class="pa-1" outlined tile>
            <top-right />
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="pa-1 transparent" outlined tile>
            <middle />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>


export default {
  name: "home",
  components: {
    TopLeft: () => import("@/components/home/TopLeft"),
    TopRight: () => import("@/components/home/TopRight"),
    Middle: () => import("@/components/home/Middle")
  }
};
</script>
