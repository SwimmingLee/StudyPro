<template>
  <v-content>
    <v-container>
      <div class="tabs">

        <v-toolbar flat color="black" dark>
            <v-toolbar-title style="font-size:30px">쪽지함</v-toolbar-title>
          </v-toolbar>


        <v-tabs>
          <v-tab>받은 쪽지함</v-tab>
          <v-tab>보낸 쪽지함</v-tab>
          <v-tab>주소록</v-tab>

          <v-tab-item>
            <rx-box />
          </v-tab-item>

          <v-tab-item>
            <tx-box />
          </v-tab-item>

          <v-tab-item>
            <friends-list />
          </v-tab-item>

        </v-tabs>
      </div>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data: () => ({}),

  computed: {
    isAuth: function() {
      return this.$store.getters.isAuth;
    }
  },
  components: {
    RxBox: () => import("@/components/user/messenger/RxBox"),
    TxBox: () => import("@/components/user/messenger/TxBox"),
    FriendsList: () => import("@/components/user/messenger/FriendsList")
  },

  methods: {

  }
};
</script>
