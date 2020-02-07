<template>
  <v-content id="boardRegister">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card class="pa-5">
          <v-flex class="ma-2 mb-5">
            <v-icon large class="mr-2" color="black">edit</v-icon>새 글 작성
          </v-flex>
          <v-card class="pa-3 px-5" outlined>
            <v-row justify="center">
              <v-col cols="12" class="py-0">
                <v-subheader>제목 :</v-subheader>
              </v-col>
              <v-col cols="12" md="3" sm="4" class="py-0">
                <v-select
                  v-model="postData.board"
                  :items="items"
                  outlined
                  label="게시판을 선택하세요"
                  dense
                  solo
                ></v-select>
              </v-col>
              <v-col cols="12" md="9" sm="8" class="py-0">
                <v-text-field v-model="postData.title" clearable label="제목을 입력하세요" outlined dense></v-text-field>
              </v-col>
            </v-row>
            <v-divider />
            <v-row>
              <v-col cols="12" class="py-0">
                <v-subheader>내용 :</v-subheader>
              </v-col>
            </v-row>
            <v-row style="min-height: 500px">
              <v-col class="py-0">
                <tiptap-vuetify
                  placeholder="내용을 입력하세요..."
                  v-model="postData.content"
                  :extensions="extensions"
                  :toolbar-attributes="{ color: 'customTheme', dark: true }"
                />
              </v-col>
            </v-row>
            <v-divider class="mt-5 mb-3" />
            <v-row>
              <v-col>
                <v-file-input
                  :rules="rules"
                  accept="image/png, image/jpeg, image/bmp"
                  outlined
                  v-model="files"
                  color="deep-purple accent-4"
                  label="Attach File"
                  counter
                  multiple
                  placeholder="Select Files"
                  prepend-icon="mdi-paperclip"
                  :show-size="1000"
                >
                  <template v-slot:selection="{ index, text }">
                    <v-chip v-if="index < 5" color="deep-purple accent-4" dark label>{{ text }}</v-chip>
                    <span
                      v-else-if="index === 5"
                      class="overline grey--text text--darken-3 mx-2"
                    >+{{ files.length - 5 }} File(s)</span>
                  </template>
                </v-file-input>
              </v-col>
            </v-row>
            <v-divider />
            <v-row>
              <v-col class="text-end">
                <v-dialog v-model="dialog" persistent max-width="290">
                  <template v-slot:activator="{ on }">
                    <v-btn class="mx-1 error" v-on="on">
                      <v-icon left dark>keyboard_backspace</v-icon>이전으로
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="error white--text pa-2 pl-5">경고</v-card-title>
                    <v-card-text class="pa-4 pb-2">
                      작성 중이던 내용이 사라집니다.
                      <br />이전 페이지로 이동하시겠습니까?
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text @click="dialog = false">계속 작업하기</v-btn>
                      <v-btn color="green darken-1" text @click="clickBack">이전으로</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-btn class="mx-1 primary" @click="create">
                  <v-icon left dark>create</v-icon>글 작성
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
import PostService from "@/services/post.service";

import Vue from "vue";
import Vuetify from "vuetify";

import {
  TiptapVuetifyPlugin,
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Code,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History
} from "tiptap-vuetify";
import "tiptap-vuetify/dist/main.css";
import "vuetify/dist/vuetify.min.css";

const vuetify = new Vuetify();
Vue.use(Vuetify);
Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconGroup: "md"
});

export default {
  components: { TiptapVuetify },
  data() {
    return {
      items: ["study", "free", "notice"],
      dialog: false,
      loginDialog: false,

      postData: {
        type: "study",
        study_id: "8",
        writer: "",
        title: "",
        content: "",
        board: "study"
      },

      files: [],
      rules: [
        value => value.size < 5000000 || "File size should be less than 5 MB"
      ],

      extensions: [
        History,
        Blockquote,
        Bold,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3]
            }
          }
        ],
        Link,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak
      ]
    };
  },

  methods: {
    create() {
      PostService.createPost(this.postData);
      this.$router.go(-1);
    },
    clickBack() {
      this.$router.go(-1);
    },
    isAuth() {
      return this.$store.getters["auth/isAuth"];
    },
    getUser() {
      return this.$store.getters["auth/getUser"];
    }
  }
};
</script>

<style scoped>
</style>