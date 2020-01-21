<template>
  <div id="search">
    <banner />
    <contents />
  </div>
</template>

<script>
export default {
  name: "home",
  data: () => ({
    isLoading: false,
    items: [],
    model: null,
    search: null,
    tab: null,
  }),
  components: {
    Banner: () => import("@/components/studysearch/Banner"),
    contents: () => import("@/components/studysearch/Contents")
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
  }
};
</script>
