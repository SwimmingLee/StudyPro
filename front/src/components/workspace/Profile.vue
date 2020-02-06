<template>
    <v-menu v-model="profile.showProfile" :position-x="profile.x" :position-y="profile.y" offset-y absolute>
      <v-card width="300">
        <v-list class="pa-0">
          <v-list-item>
            <v-list-item-avatar>
              <img src="@/assets/images/pengsoo.jpg" alt="PengSoo" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>PengSoo</v-list-item-title>
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
              <v-list-item-subtitle>I'm PengSoo. 친구추가 하지마세요 진짜로 ㅋㅋㅋㅋㅋ</v-list-item-subtitle>
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
export default {
    props: ["profile"]
}
</script>

<style>

</style>