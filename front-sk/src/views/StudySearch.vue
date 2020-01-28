<template>
  <div id="search">
    <contents />
  </div>
</template>

<script>
export default {
  name: "search",
  components: {
    contents: () => import("@/components/studysearch/Contents")
  },
};
</script>
