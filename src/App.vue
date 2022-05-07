<template>
  <div id="wrapper">
    <NavBar/>

    <section>
      <router-view />
    </section>

    <footer class="footer">
      <p class="has-text-centered">
        <small>&copy; Copyright 世賢烤鴨, {{ new Date().getFullYear() }}</small>
      </p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';
import NavBar from './components/NavBar.vue'

export default {
  data() {},

  components: {
    NavBar,
  },


  beforeCreate() {
    // use commit to call mutations @store
    this.$store.commit('initalizeStore')

    const token = this.$store.state.token
    if (token) {
      axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  },


};
</script>

<style lang="scss">
@import '../node_modules/bulma';

</style>
