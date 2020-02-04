<template>
  <div id="singup">
    <div v-if="!created">
      <v-form>
        <v-content>
          <v-container>
            <div id="app">
              <v-app id="inspire">
                <v-form ref="form" v-model="valid">
                  <v-card max-width="1000" class="mx-auto">
                    <br />

                    <v-row justify="center"
                      ><v-col cols="12" sm="10">
                        <v-card-text style="font-size:30px"
                          >?åÏõêÍ∞Ä??</v-card-text
                        >
                      </v-col></v-row
                    >

                    <v-row justify="center" align="center"
                      ><v-col cols="12" sm="10">
                        <v-text-field
                          v-model="id"
                          :rules="idRules"
                          label="?ÑÏù¥??"
                          required
                        ></v-text-field> </v-col
                    ></v-row>

                    <v-row justify="center" align="center"
                      ><v-col cols="12" sm="10">
                        <v-text-field
                          label="ÎπÑÎ?Î≤àÌò∏"
                          v-model="password"
                          :rules="passwordRules"
                          type="password"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row justify="center" align="center">
                      <v-col cols="12" sm="10">
                        <v-text-field
                          label="ÎπÑÎ?Î≤àÌò∏ ?ïÏù∏"
                          v-model="confirmPassword"
                          :rules="
                            confirmPasswordRules.concat(
                              passwordConfirmationRule
                            )
                          "
                          type="password"
                          required
                        ></v-text-field> </v-col
                    ></v-row>

                    <v-row justify="center" align="center"
                      ><v-col cols="12" sm="10">
                        <v-text-field
                          v-model="name"
                          :rules="nameRules"
                          label="?¥Î¶Ñ"
                          required
                        ></v-text-field> </v-col
                    ></v-row>

                    <v-row justify="center" align="center">
                      <v-col cols="12" sm="10">
                        <v-select
                          v-model="genderinput"
                          :items="gender"
                          label="?±Î≥Ñ"
                          :rules="genderRules"
                          dense
                        ></v-select> </v-col
                    ></v-row>

                    <v-row justify="center" align="center"
                      ><v-col cols="12" sm="10">
                        <v-text-field
                          v-model="nickname"
                          :counter="10"
                          :rules="nicknameRules"
                          label="?âÎÑ§??"
                          required
                        ></v-text-field> </v-col
                    ></v-row>

                    <v-row justify="center" align="center"
                      ><v-col cols="12" sm="10">
                        <v-text-field
                          v-model="phone"
                          :rules="phoneRules"
                          label="?¥Î??ÑÌôî Î≤àÌò∏( - ?úÏô∏?òÍ≥† ?ÖÎ†•?? Ï£ºÏÑ∏??.)"
                          required
                        ></v-text-field> </v-col
                    ></v-row>

                    <v-row justify="center" align="center"
                      ><v-col cols="12" sm="10">
                        <v-text-field
                          v-model="introducing"
                          :counter="50"
                          :rules="introducingRules"
                          label="?êÏã†?? Î©ãÏ?Í≤? ?åÍ∞ú?? Ï£ºÏÑ∏??!"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row justify="center">
                        <image-input v-model="avatar" class="wrap-content">
                          <div slot="activator" class="wrap-content pointer">
                            <v-avatar size="150px" v-ripple v-if="!avatar" class="grey lighten-3 mb-3">
                              <span>Click to add avatar</span>
                            </v-avatar>
                            <v-avatar size="150px" v-ripple v-else class="mb-3">
                              <img :src="avatar.imageURL" alt="avatar">
                            </v-avatar>
                          </div>
                        </image-input>
                    </v-row>
                  </v-card>

                  <v-row
                    ><v-col cols="12" sm="12">
                      <v-card class="px-5 mx-auto" max-width="1000">
                        <v-card-text class="pt-0" style="font-size:18px">
                          <p><br /></p>
                          Í¥Ä?¨Ïûà?? Î∂ÑÏïºÎ•? ?†ÌÉù?? Ï£ºÏÑ∏??.
                        </v-card-text>

                        <v-row justify="center" align="center">
                          <v-col cols="12" sm="3"
                            ><v-checkbox
                              v-model="db"
                              class="mx-2"
                              label="?∞Ïù¥?∞Î≤†?¥Ïä§"
                            ></v-checkbox
                          ></v-col>
                          <v-col cols="12" sm="3"
                            ><v-checkbox
                              v-model="bc"
                              class="mx-2"
                              label="Î∏îÎ°ùÏ≤¥Ïù∏"
                            ></v-checkbox
                          ></v-col>
                          <v-col cols="12" sm="3"
                            ><v-checkbox
                              v-model="al"
                              class="mx-2"
                              label="?åÍ≥†Î¶¨Ï¶ò"
                            ></v-checkbox
                          ></v-col>
                          <v-col cols="12" sm="3"
                            ><v-checkbox
                              v-model="os"
                              class="mx-2"
                              label="?¥ÏòÅÏ≤¥Ï†ú"
                            ></v-checkbox
                          ></v-col>
                        </v-row>

                        <v-row justify="center" align="center">
                          <v-col cols="12" sm="3"
                            ><v-checkbox
                              v-model="ai"
                              class="mx-2"
                              label="?∏Í≥µÏßÄ??"
                            ></v-checkbox
                          ></v-col>
                          <v-col cols="12" sm="3"
                            ><v-checkbox
                              v-model="ad"
                              class="mx-2"
                              label="?êÏú®Ï£ºÌñâ"
                            ></v-checkbox
                          ></v-col>
                          <v-col cols="12" sm="3"
                            ><v-checkbox
                              v-model="cs"
                              class="mx-2"
                              label="Ïª¥Ìì®?∞Î≥¥??"
                            ></v-checkbox
                          ></v-col>
                          <v-col cols="12" sm="3"
                            ><v-checkbox
                              v-model="cn"
                              class="mx-2"
                              label="Ïª¥Ìì®?∞ÌÜµ??"
                            ></v-checkbox
                          ></v-col>
                        </v-row>
                      </v-card> </v-col
                  ></v-row>

                  <v-card
                    class="mx-auto"
                    max-width="1000"
                    color="rgb(0, 0, 0, 0)"
                    elevation="0"
                  >
                    <v-layout row right justify-end>
                      <span
                        class="red--text lighten-1 mr-10 pt-2"
                        v-show="notcreated"
                        >?ÑÏù¥?îÍ? ?¥Î? Ï°¥Ïû¨?©Îãà??.</span
                      >
                      <v-btn
                        class="mr-4"
                        :disabled="!valid"
                        color="green lighten-4"
                        @click="onSignup()"
                      >
                          Í∞Ä?ÖÌïòÍ∏?
                      </v-btn>
                    </v-layout>
                  </v-card>
                </v-form>
              </v-app>
            </div>
          </v-container>
        </v-content>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,

    id: "test@naver.com",
    idRules: [
      v => !!v || "?ÑÏù¥?îÎ? ?ÖÎ†•?? Ï£ºÏÑ∏??.",
      v =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "ex) sample@example.com"
    ],

    password: "s12341234",
    confirmPassword: "s12341234",
    passwordRules: [
      v => !!v || "ÎπÑÎ?Î≤àÌò∏Î•? ?ÖÎ†•?? Ï£ºÏÑ∏??.",
      v =>
        (v && v.length >= 8) ||
        "Î¨∏Ïûê / ?´Ïûê ?ºÏö© 8?êÎ¶¨ ?¥ÏÉÅ?ºÎ°ú ÎßåÎì§?? Ï£ºÏÑ∏??.",
      v =>
        /(?=.*[a-zA-Z])/.test(v) ||
        "Î¨∏Ïûê / ?´Ïûê ?ºÏö© 8?êÎ¶¨ ?¥ÏÉÅ?ºÎ°ú ÎßåÎì§?? Ï£ºÏÑ∏??.",
      v =>
        /(?=.*\d)/.test(v) || "Î¨∏Ïûê / ?´Ïûê ?ºÏö© 8?êÎ¶¨ ?¥ÏÉÅ?ºÎ°ú ÎßåÎì§?? Ï£ºÏÑ∏??."
    ],
    confirmPasswordRules: [v => !!v || "ÎπÑÎ?Î≤àÌò∏Î•? ?? Î≤? ?? ?ÖÎ†•?? Ï£ºÏÑ∏??."],
    introducing: "",
    introducingRules: [
      v => !!v || "?òÍ≥†?∂Ï? ÎßêÏùÑ ?êÏú†Î°?≤å ?ëÏÑ±?? Î≥¥ÏÑ∏??!",
      v => (v && v.length <= 50) || "ÏµúÎ? 50?êÍπåÏßÄ ?ÖÎ†• Í∞Ä?•Ìï©?àÎã§."
    ],

    name: "Test",
    nameRules: [
      v => !!v || "?¥Î¶Ñ?? ?ÖÎ†•?? Ï£ºÏÑ∏??.",
      v => (v && v.length <= 50) || "?¥Î¶Ñ?? ?àÎ¨¥ ÍπÅÎãà??."
    ],

    gender: ["?®ÏÑ±", "?¨ÏÑ±"],
    genderRules: [v => !!v || "?±Î≥Ñ?? ?†ÌÉù?? Ï£ºÏÑ∏??."],
    genderinput: "?®ÏÑ±",

    nickname: "Test",
    nicknameRules: [
      v => !!v || "?âÎÑ§?ÑÏùÑ ?ÖÎ†•?? Ï£ºÏÑ∏??.",
      v => (v && v.length <= 10) || "?âÎÑ§?ÑÏ? ÏµúÎ? 10?êÏûÖ?àÎã§."
    ],

    phone: "01012341234",
    phoneRules: [
      v => !!v || "?¥Î??ÑÌôî Î≤àÌò∏Î•? ?ÖÎ†•?? Ï£ºÏÑ∏??.",
      v =>
        (v && v.length >= 10 && v.length <= 11) ||
        "?ÑÌôîÎ≤àÌò∏ ?ïÏãù?? ?¨Î∞îÎ•¥Ï? ?äÏäµ?àÎã§.",
      v =>
        !/(?=.*[a-zA-Z!@#$%^&*()_+=-?/'";{}])/.test(v) ||
        "?ÑÌôîÎ≤àÌò∏ ?ïÏãù?? ?¨Î∞îÎ•¥Ï? ?äÏäµ?àÎã§."
    ],

    ai: false,
    bc: false,
    al: false,
    ad: false,
    os: false,
    db: false,
    cn: false,
    cs: false,
    notcreated: false,
    created: false,
    avatar: null,
  }),
  components: {
    ImageInput: () => import('@/components/base/ImageInput'),
  },
  methods: {
    async onSignup() {
      try {
        let formData = new FormData();
        formData.append('email', this.id)
        formData.append('password', this.password)
        formData.append('name', this.name)
        formData.append('nickname', this.nickname)
        formData.append('gender', this.genderinput == "?®ÏÑ±"? "M" : 'W')
        formData.append('phone', this.phone)
        formData.append('img', this.avatar.imageFile);


        this.$store.dispatch('auth/register', formData).then(
          (state) => {
            if(state == 'success'){
              this.$router.push({path:'/user/signup/success'})
            }else{
              this.message = '?ÑÏù¥?? ?êÎäî ÎπÑÎ?Î≤àÌò∏Î•? ?òÎ™ª?ÖÎ†•?àÏäµ?àÎã§.'
            }
            this.isLoading = false;
          },
          error => {
            this.isLoading = false
            this.message = error.message
          }
        )

      } catch (err) {
        console.error(err);
      }
    },
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmPassword ||
        "ÎπÑÎ?Î≤àÌò∏Í∞Ä ?úÎ°ú ?ºÏπò?òÏ? ?äÏäµ?àÎã§.";
    }
  }
};
</script>
