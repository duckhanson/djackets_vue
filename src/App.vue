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
  data() {
    return {
      // TODO: request to backend to get categories dynamically.
      categories: [
        { name: '烤鴨', id: 0, url: 'ducks'},
        { name: '配料', id: 1, url: 'sides'},
        { name: '其他品項', id: 2, url: 'others'}
      ],
      showMobileMenu: false,
      cartTotalLength: parseInt(0),
      cart: {
        items: []
      },
    };
  },

  components: {
    NavBar,
  },

  mounted() {
    this.cart = this.$store.state.cart
  },

  beforeCreate() {
    // use commit to call mutations @store
    this.$store.commit('initalizeStore')
  },

  computed: {
    cartTotalLength() {
          let totalLength = 0
          for (let i = 0; i < this.cart.items.length; i++) {
              totalLength += this.cart.items[i].quantity
          }
          return totalLength
      }
  },
};
</script>

<style lang="scss">
@import '../node_modules/bulma';

</style>
