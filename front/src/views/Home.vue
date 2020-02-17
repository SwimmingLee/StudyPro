<template>
  <v-content app id="home" class="pa-0">
    <div class="bannerContainer">
      <v-img class="banner" src="@/assets/images/banner/main.png" />
    </div>
    <v-row justify="center">
      <v-col cols="12" lg="9" md="12" sm="12" class='pt-0'>
        <top-left />
      </v-col>
      <!-- <v-col lg="3" class="d-none d-lg-block">
        <v-card class="pa-1 pt-9" outlined tile>
          <top-right />
        </v-card>
      </v-col> -->
      
    </v-row>

    <v-row>
      <!-- <v-col cols="12">
        <v-card class="pa-1 transparent" outlined tile>
          <middle />
        </v-card>
      </v-col> -->
    </v-row>
  </v-content>
</template>

<script>
export default {
  name: "home",

  data() {
    return {
      items: [
        { avatar: "@/assets/images/pengsoo.jpg" },
        {
          avatar:
            "https://lh3.googleusercontent.com/proxy/BrygeoVAlP2KobI6jyhQ6rLAITSeAncXc0e-Sm9W5vzUz-OJsKT7u2e0OEBkeDOvJtQ6aqazQUlpbUb5QlfDcyQd-8pC8vlW9Su2ux8Y4Ki_idbRfVXT"
        },
        { avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg" }
      ],
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4"
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"]
    };
  },

  components: {
    TopLeft: () => import("@/components/home/TopLeft"),
    // TopRight: () => import("@/components/home/TopRight"),
    // Middle: () => import("@/components/home/Middle")
  }
};
</script>

<style>
.bannerContainer{
  height: 150px;
  overflow: hidden;
}
.banner{
  width: auto;
  height: 100%;
}
</style>
