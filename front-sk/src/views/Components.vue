<template>
    <div>
        <topBlock></topBlock>
        <basic-elements></basic-elements>
    </div>
</template>
<script>
import topBlock from "./components/TopBlock";
import BasicElements from "./components/BasicElements";
export default {
  name: "components",
  components: {
    topBlock,
    BasicElements
  }
};
</script>
