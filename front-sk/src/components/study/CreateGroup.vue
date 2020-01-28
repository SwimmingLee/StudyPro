<template>
  <div id="createGroup" class="ma-5">
    <v-card class="pa-5">
      <p class="ml-5">그룹 생성</p>
      <hr />
      <v-simple-table>
        <template>
          <thead>
            <tr>
              <th v-for="(item, i) in 8" :key="i"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>카테고리</td>
              <td colspan="7">[카테고리선택]</td>
            </tr>
            <tr>
              <td>그룹명</td>
              <td colspan="7">
                  <v-text-field
                    v-model="groupName"
                    label="그룹명"
                    :rules="groupRules"
                    required
                  ></v-text-field>
              </td>
            </tr>
            <tr>
              <td>모임목표(간이)</td>
              <td colspan="7">
                <v-text-field
                    v-model="groupTarget"
                    label="모임목표"
                    :rules="targetRules"
                    required></v-text-field>
              </td>
            </tr>
            <tr>
              <td>모임소개(상세)</td>
              <td colspan="7">
                <v-textarea
                  class="pt-6"
                  label="그룹에 대한 소개를 150자 이하로 입력해주세요"
                  outlined
                  v-model="regText"
                  :rules="textRules"
                ></v-textarea>
              </td>
            </tr>
            <tr>
              <td>인원제한</td>
              <td colspan="7">
                  <div>
                    <v-overflow-btn
                        class="mt-4"
                        :items="dropItems"
                        segmented
                        dense
                        style="width: 200px"
                        ></v-overflow-btn>
                </div>
              </td>
            </tr>
            <tr>
              <td>기간</td>
              <td colspan="7">
                  
              </td>
            </tr>
            <tr>
              <td>시작날짜</td>
              <td colspan="7">
              </td>
            </tr>
            <tr>
              <td>요일</td>
              <td colspan="7">
              </td>
            </tr>
            <tr>
              <td>시간대</td>
              <td colspan="7">
              </td>
            </tr>
            <tr>
              <td>검색어</td>
              <td colspan="7">
              </td>
            </tr>
            <tr>
              <td>공개 비공개</td>
              <td colspan="7">
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "createGroup",
  data: () => ({
    valid: false,
    groupName: '',
    regText: '',
    groupTarget: '',
    groupRules: [
      v => !!v || "그룹명을 입력해주세요",
      v =>
        (v && v.length <= 15 && v.length >= 3) ||
        "그룹명은 3자이상 15자이내 입니다"
    ],
    textRules: [
        v => (v.length <= 150) || "150자 초과"
    ],
    targetRules: [
        v => !!v || "목표를 작성해주세요",
        v => (v && v.length <= 15) || '15자 이내로 작성해주세요'
    ],
    dropItems: []
  }),
  watch: {
      valid(){
          console.log(this.valid)
      }
  },
  mounted() {
      this.dropItems = [];
      for(var i = 1; i <= 6; i++){
        this.dropItems.push({
            text: i,
            callback: () => console.log(i)
        })
      }
  }
};
</script>

<style>
p {
  font-size: 30px;
  color: rgb(49, 78, 173);
}

.v-text-field__details {
  display: inline-block !important;
}
</style>
