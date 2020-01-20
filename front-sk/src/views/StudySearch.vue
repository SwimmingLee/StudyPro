<template>
  <div id="search">
    <banner />
    <v-container fluid>
    <v-row>
      <v-col cols="8">
          <v-card class="pa-1" outlined tile>
            <top-left/>
          </v-card>
      </v-col>
      <v-col cols="4">
          <v-card class="pa-1" outlined tile>
            <top-right/>
          </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
          <v-card class="pa-1" outlined tile>
            <middle/>
          </v-card>
      </v-col>
    </v-row>
    </v-container>
  </div> 
</template>

<script>
  export default {
      name: "home",
      components: {
        Banner: () => import('@/components/studysearch/Banner'),
        TopLeft: () => import('@/components/home/TopLeft'),
        TopRight: () => import('@/components/home/TopRight'),
        Middle: () => import('@/components/home/Middle'),
      }
  }
</script>