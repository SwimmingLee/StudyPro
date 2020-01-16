<template>
  <v-app>
    <Header/>
    <Footer/>
  </v-app>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',

  components: {
    Header,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>