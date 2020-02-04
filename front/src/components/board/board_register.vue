<template>
  <v-container>
    <v-flex class="ma-2 mb-5">
      <v-icon large class="mr-2" color="black">edit</v-icon>새 글 작성
    </v-flex>
    <v-card class="pa-3 px-5" outlined>
      <v-row justify="center">
        <v-col cols="12" class="py-0">
          <v-subheader>제목 :</v-subheader>
        </v-col>
        <v-col cols="12" md="3" sm="4" class="py-0">
          <v-select v-model="postData.board" :items="items" outlined label="게시판을 선택하세요" dense solo></v-select>
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
        <v-col class="py-0">
          <v-textarea v-model="postData.content" outlined auto-grow rows="15"></v-textarea>
        </v-col>
      </v-row>
      <v-divider />
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
          <v-btn class="mx-1 error">
            <v-icon left dark>keyboard_backspace</v-icon>이전으로
          </v-btn>
          <v-btn class="mx-1 primary" @click="create">
            <v-icon left dark>create</v-icon>글 작성
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: ["study", "free", "notice"],

      postData: {
        type: "study",
        study_id: "1",
        writer: "1",
        title: "",
        content: "",
        board: ""
      },

      files: [],
      rules: [
        value => value.size < 5000000 || "File size should be less than 5 MB"
      ]
    };
  },

  methods: {
    create() {
        console.log(this.postData);
    }
  }
};
</script>

<style scoped>
</style>