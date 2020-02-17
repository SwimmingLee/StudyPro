<template>
    <v-menu v-model="profile.showProfile" :position-x="profile.x" :position-y="profile.y" offset-y absolute>
      <v-card width="300">
        <v-list class="pa-0">
          <v-list-item>
            <v-list-item-avatar>
              <img :src="user.profile_url" alt="PengSoo" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{user.nickname}}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn :class="profile.fav ? 'red--text' : ''" icon @click="profile.fav = !profile.fav">
                <v-icon>favorite</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-divider />
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>{{user.about}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-btn class="ml-auto" color="error" text @click="profile.showProfile = false">닫기</v-btn>
          <v-btn class="ml-0" color="primary" text @click="profile.showProfile = false">친구 추가</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
</template>

<script>
import UserService from "@/services/user.service"

export default {
    data() {
      return {
        user: {},
      }
    },
    props: ["profile", "show_profile_id", "debuging"],
    watch: {

      show_profile_id: function() {
        this.getUser()
      }
    },
    mounted() {
      this.getUser()
    },
    methods: {
      getUser() {
        UserService.getUserById(this.show_profile_id)
        .then(data => {
          this.user.nickname= data.data.nickname
          this.user.profile_url = data.data.profile_url
          this.user.about = data.data.about
        })
      },
    }
}
</script>

<style>

</style>