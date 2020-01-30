<template>
  <v-card
    class="mx-4"
    tile
    min-height="450px"
  >
    <v-content class="pa-4">
      <p class="ml-4">가입한 모임 목록</p><hr/>

      <v-data-table
        :headers="headers"
        :items="items"
        multi-sort
        class="elevation-1"
        id="regGroupList"
      ></v-data-table>
    </v-content>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      headers: [
        { text: '카테고리', align: 'center', value: 'category' },
        { text: '그룹명', align: 'center', value: 'name' },
        { text: '시간', align: 'center', value: 'time' },
        { text: '요일', align: 'center', sortable: false, value: 'dayofweek' },
        { text: '가입일', align: 'center', value: 'regDate' },
      ],
      items: [
        {
          category: 'IT/소프트웨어',
          name: 'SSAFY 대비반',
          time: '18:00 ~ 20:00',
          dayofweek: 'Mon, Wed, Fri',
          regDate: '2020-01-30'
        },
        {
          category: 'IT/소프트웨어',
          name: 'SSAFY 대비반',
          time: '18:00 ~ 20:00',
          dayofweek: 'Mon, Wed, Fri',
          regDate: '2020-01-30'
        }
      ],
    }),
    methods: {
      groupDetail(){
        console.log('hello')
      }
    },
    mounted(){
      // var trs = document.getElementsByTagName('tbody')[0].children;
      // for(var i=0; i<trs.length; i++){
      //   trs[i].setAttribute('class', 'clickable')
      // }

      var rows = document.getElementById('regGroupList')
              .getElementsByTagName('tbody')[0].getElementsByTagName('tr');
      for(var i=0; i<rows.length; i++){
        rows[i].setAttribute('class', 'clickable')
      }
    }
  }
</script>

<style>
p {
  font-size: 30px;
}

.clickable{
  cursor: pointer;
}
</style>