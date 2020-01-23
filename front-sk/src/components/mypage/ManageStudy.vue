
<template>
  <v-form>
    <v-container>
      <v-row
        ><v-col cols="12" sm="12">
          <v-card class="mx-auto" max-width="1000" tile >

   

            <v-list rounded>
              <v-subheader>REPORTS</v-subheader>
              <v-list-item-group v-model="item" color="primary">
                <v-list-item v-for="(item, i) in items" :key="i">
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>




          </v-card>
        </v-col> </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    item: 1,
    items: [
      { text: "Real-Time", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" }
    ]
  })
};
</script>
