<template>
  <v-content>
    <v-card class="mx-3 pa-3">
      <v-card flat class="pa-3 mb-5">
        <v-row no-gutters>
          <v-col style="max-width: 50px;">제목 :</v-col>
          <v-col>{{ this.post_contents.title }}</v-col>
        </v-row>
        <v-divider class="my-2" />
        <v-row no-gutters>
          <v-col style="max-width: 60px;">작성자 :</v-col>
          <v-col>{{ this.post_contents.writer }}</v-col>
          <v-col style="max-width: 45px;">조회 :</v-col>
          <v-col style="max-width: 40px;">{{ this.post_contents.view }}</v-col>
          <v-col style="max-width: 45px;">추천 :</v-col>
          <v-col
            style="max-width: 30px;"
          >{{ this.post_contents.num_like + this.post_contents.like }}</v-col>
        </v-row>
      </v-card>

      <v-row no-gutters class="mb-3">
        <v-col cols="12">
          <v-card flat class="pa-3">
            <span v-html="this.post_contents.content"></span>
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters class="mb-3">
        <v-col class="text-center ma-2">
          <v-btn class="mx-1 mr-3 primary" @click="toggleLike">
            <v-icon left small dark :class="post_like ? 'red--text' : ''" icon>favorite</v-icon>추천
            <span class="ma-1 ml-3">{{ this.post_contents.num_like + this.post_contents.like }}</span>
          </v-btn>
          <v-btn v-if="!isWriter" class="mx-1 error">
            <v-icon left small dark>report_problem</v-icon>신고하기
          </v-btn>
          
          <v-dialog v-if="isWriter" v-model="dialog" persistent max-width="290">
            <template v-slot:activator="{ on }">
              <v-btn  class="mx-1 error" v-on="on">
                <v-icon left small dark>delete</v-icon>글 삭제
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="error white--text pa-2 pl-5">경고</v-card-title>
              <v-card-text class="pa-4 pb-2">
                삭제된 글은 복구할 수 없습니다.
                <br />정말로 삭제하시겠습니까?
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false">이전으로</v-btn>
                <v-btn color="green darken-1" text @click="deletePost">삭제하기</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
      <v-card outlined>
        <v-card v-if="!isAuth" flat class="pa-5" align="center">댓글을 입력하시려면 로그인이 필요합니다.</v-card>
        <v-card v-if="isAuth" flat class="ma-0 mt-1 pa-0">
          <v-row no-gutters>
            <v-col align-self="center" cols="2" align="center" class="mb-3">
              <v-avatar>
                <img :src="currentUser.profile_url" />
              </v-avatar>
              <p style="font-size:14px" class="ma-0 pt-2">{{ currentUser.nickname }}</p>
            </v-col>
            <v-divider />
            <v-col cols="7" class="ma-3">
              <v-textarea
                @keydown.enter="createComment"
                clearable
                clear-icon="cancel"
                no-resize
                rows="3"
                dense
                outlined
                single-line
                counter
                maxlength="500"
                label="댓글을 입력해주세요."
                v-model="new_comment"
              ></v-textarea>
            </v-col>
            <v-col align-self="center" cols="2" class="mb-7 ml-2">
              <v-btn dark class="green my-3">
                <v-icon left dark @click="createComment">create</v-icon>댓글 달기
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
        <v-divider v-if="this.post_comments.length" class="mx-3 mb-3" />
        <v-row no-gutters class="pa-0">
          <v-col cols="12">
            <v-card flat class="px-3" v-for="comment in post_comments" :key="comment.id">
              <v-row>
                <v-col cols="3" align-self="center" class="pa-0">
                  <v-card flat class="pa-0 ml-3">
                    <v-row no-gutters>
                      <v-col cols="4" align="center">
                        <v-avatar size="30">
                          <img :src="comment.writer.profile_url" />
                        </v-avatar>
                      </v-col>
                      <v-col cols="8">
                        <span class="ma-0 pt-2">{{ comment.writer.nickname }}</span>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
                <v-col align-self="center" cols="6">{{ comment.content }}</v-col>
                <v-col align-self="center" cols="3">{{ comment.created_date }}</v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-card>
  </v-content>
</template>

<script>
import PostService from "@/services/post.service";

export default {
  data() {
    return {
      dialog: false,

      defaultPost: "게시글을 선택하세요",
      post_id: "",
      new_comment: "",
      post_contents: [],
      post_comments: []
    };
  },

  created() {
    this.post_id = this.$route.params.post_id;
    this.getPost();
    this.getComment();
  },

  watch: {
    $route() {
      this.post_id = this.$route.params.post_id;
      this.getPost();
      this.getComment();
    }
  },

  computed: {
    currentUser() {
      return this.$store.getters["auth/getUser"];
    },
    isAuth() {
      return this.$store.getters["auth/isAuth"];
    },
    isWriter() {
      return (
        this.post_contents.writer ===
        this.$store.getters["auth/getUser"].nickname
      );
    },
    post_like() {
      return this.post_contents.like;
    }
  },

  methods: {
    async getPost() {
      const tmp = await PostService.getPostContents({
        type: "study",
        post_id: this.post_id
      });
      this.post_contents = tmp.data;
      this.post_like = this.post_contents.like;
      if (this.post_like) {
        this.post_contents.num_like--;
      }
    },

    async deletePost() {
      console.log(this.post_id);
      const tmp = await PostService.deletePost({
        type: "study",
        post_id: this.post_id
      });
      console.log(tmp);
      this.$router.go(-1);
      this.getPost();
    },

    async getComment() {
      const tmp = await PostService.getPostComments({
        type: "study",
        post_id: this.post_id
      });
      this.post_comments = tmp.data === "error" ? [] : tmp.data;
      this.calculate();
    },

    async toggleLike() {
      const tmp = await PostService.toggleLike({
        type: "study",
        post_id: this.post_id
      });
      this.post_contents.like = tmp.data.like;
    },

    createComment(e) {
      e.preventDefault();
      if (this.new_comment !== "") {
        PostService.createComment({
          type: "study",
          post_id: this.post_id,
          content: this.new_comment
        });
        this.new_comment = "";
        this.getComment();
      }
    },

    calculate() {
      for (let i = 0; i < this.post_comments.length; i++) {
        let created = new Date(this.post_comments[i].created_date);
        let now = new Date();
        this.post_comments[i].created_date_int = created;

        let minus;
        if (now.getFullYear() > created.getFullYear()) {
          minus = now.getFullYear() - created.getFullYear();
          this.post_comments[i].created_date = minus + "년 전";
        } else if (now.getMonth() > created.getMonth()) {
          minus = now.getMonth() - created.getMonth();
          this.post_comments[i].created_date = minus + "달 전";
        } else if (now.getDate() > created.getDate()) {
          minus = now.getDate() - created.getDate();
          this.post_comments[i].created_date = minus + "일 전";
        } else if (now.getDate() == created.getDate()) {
          let nowTime = now.getTime();
          let createdTime = created.getTime();
          if (nowTime > createdTime) {
            let day, hour, min, sec;
            sec = parseInt(nowTime - createdTime) / 1000;
            day = parseInt(sec / 60 / 60 / 24);
            sec = sec - day * 60 * 60 * 24;
            hour = parseInt(sec / 60 / 60);
            sec = sec - hour * 60 * 60;
            min = parseInt(sec / 60);
            sec = parseInt(sec - min * 60);
            if (hour > 0) {
              this.post_comments[i].created_date = hour + "시간 전";
            } else if (min > 0) {
              this.post_comments[i].created_date = min + "분 전";
            } else if (sec > 0) {
              this.post_comments[i].created_date = sec + "초 전";
            }
          }
        }

        if (created.getDay() === now.getDay()) {
          this.post_comments[i].created_date +=
            ", (" +
            created.getHours() +
            ":" +
            created.getMinutes() +
            ":" +
            created.getSeconds() +
            ")";
        } else {
          this.post_comments[i].created_date +=
            ", (" + created.getMonth() + 1 + "/" + created.getDate() + ")";
        }
      }
    }
  }
};
</script>

<style scoped>
</style>