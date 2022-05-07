<template>
  <nav class="navbar is-dark">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item"
        ><strong>{{ $store.state.abb_store_name }}</strong></router-link
      >
      <a
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbar-menu"
        @click="showMobileMenu = !showMobileMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      class="navbar-menu"
      id="navbar-menu"
      v-bind:class="{ 'is-active': showMobileMenu }">

      <div class="navbar-start">
          <div class="navbar-item">
            <form method="get" action="/search">
              <div class="field has-addons">
                <div class="control">
                  <input type="text" class="input" placeholder="搜尋" name="query">
                </div>

                <div class="control">
                  <button class="button is-success">
                      <span class="icon">
                      <i class="fas fa-search"></i>
                      </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>


      <div class="navbar-end">
        <router-link
          v-for="category in categories"
          :key="category.id"
          :to="category.get_absolute_url"
          class="navbar-item">
          {{ category.name }}
        </router-link>

        <div class="navbar-item">
          <div class="buttons">
            <template v-if="$store.state.isAuthenticated">
              <router-link to="/my-account" class="button is-light"
                >我的帳號</router-link
              >
            </template>

            <template v-else>
              <router-link to="/login" class="button is-light"
                >Log in</router-link
              >
            </template>

            <router-link to="/cart" class="button is-success">
              <span class="icon"><i class="fas fa-shopping-cart"></i></span>
              <span>Cart ({{ cartTotalLength }})</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NavBar',
  data() {
    return {
      // TODO: request to backend to get categories dynamically.
      categories: [],
      showMobileMenu: false,
      cartTotalLength: parseInt(0),
      cart: {
        items: []
      }
    };
  },

  methods: {
    async getCategoryNames() {
      this.$store.commit('setIsLoading', true);
      await axios
        .get('api/v1/category-names/')
        .then((response) => {
          this.categories = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
      this.$store.commit('setIsLoading', false);
    }
  },

  computed: {
    cartTotalLength() {
      let totalLength = 0;
      for (let i = 0; i < this.cart.items.length; i++) {
        totalLength += this.cart.items[i].quantity;
      }
      return totalLength;
    }
  },

  mounted() {
    this.cart = this.$store.state.cart;
    this.getCategoryNames();
  },

  beforeCreate() {
    // use commit to call mutations @store
    this.$store.commit('initalizeStore');
  },

  computed: {
    cartTotalLength() {
      let totalLength = 0;
      for (let i = 0; i < this.cart.items.length; i++) {
        totalLength += this.cart.items[i].quantity;
      }
      return totalLength;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
