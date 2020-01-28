<template>
  <v-content app class="pa-0">
    <v-btn
      v-scroll="onScroll"
      v-show="toTopBtn"
      fab
      fixed
      bottom
      right
      class="red pa-0"
      @click="toTop"
    >
      <v-icon class="white--text">fa-arrow-up</v-icon>
    </v-btn>
    <v-footer class="customTheme" padless>
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          text
          rounded
          class="my-2"
          >{{ link }}</v-btn
        >
        <v-col
          class="customTheme lighten-1 py-4 text-center white--text"
          cols="12"
        >
          <span class="font-weight-light">Study</span>
          <span>PRO</span>
        </v-col>
      </v-row>
    </v-footer>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      toTopBtn: false,
      links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"]
    };
  },
  methods: {
    onScroll(scr) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || scr.target.scrollTop || 0;
      this.toTopBtn = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    }
  }
};
</script>
