<template>
  <div id="appHeader">
    <nav>
      <v-toolbar text>
        <v-toolbar-title class="gray--text">
          <span class="font-weight-light">Study</span>
          <span>PRO</span>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu>
          <v-btn text slot="activator" color="gray">
            <v-icon>favorite</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile
              v-for="link in links"
              :key="link.text"
              router
              :to="link.route"
            >
              <v-list-tile-title>{{ link.text }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

        <v-btn @click="loginModal = true" text color="gray">
          <span>Sign Out</span>
          <v-icon right>exit_to_app</v-icon>
        </v-btn>

        <!-- loginModal -->
        <v-dialog v-model="loginModal">
          <v-card>
            <v-card-title>
              <span class="headline">Log In</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Login" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Legal middle name"
                      hint="example of helper text only on focus"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Legal last name*"
                      hint="example of persistent helper text"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="Email*" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Password*"
                      type="password"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      :items="['0-17', '18-29', '30-54', '54+']"
                      label="Age*"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      :items="[
                        'Skiing',
                        'Ice hockey',
                        'Soccer',
                        'Basketball',
                        'Hockey',
                        'Reading',
                        'Writing',
                        'Coding',
                        'Basejump'
                      ]"
                      label="Interests"
                      multiple
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="loginModal = false"
                >Close</v-btn
              >
              <v-btn color="blue darken-1" text @click="loginModal = false"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </nav>
  </div>
</template>

<script>
export default {
  name: "appHeader",
  data() {
    return {
      drawer: false,
      loginModal: false,
      links: [
        { icon: "dashboard", text: "DashBoard", route: "/" },
        { icon: "folder", text: "My Projects", route: "/projects" },
        { icon: "person", text: "Team", route: "/team" }
      ]
    };
  }
};
</script>
