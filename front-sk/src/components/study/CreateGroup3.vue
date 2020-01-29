<template>
    <v-daterange
    v-model="range"
    display-format="dd-MM-yyyy"
    no-title
    :input-props="inputProps"
    :menu-props="menuProps"
    :action-labels="{ apply: 'Custom Apply' }"
    >
    </v-daterange>
</template>
<script>
import VDaterange from '@/components/study/VDaterange';
export default {
  name: 'app',
  components: { VDaterange },
  data() {
    return {
      range: {},
      inputProps: { solo: true, style: { width: '240px' } },
      menuProps: { offsetY: true, closeOnContentClick: false },
    };
  }
};
</script>
