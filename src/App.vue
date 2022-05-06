<template>
  <div id="wrapper">
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item"
          ><strong>SXRD</strong></router-link
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
        <div class="navbar-end">
          <router-link
            v-for="category in categories"
            :key="category.id"
            :to="`/${category.url}`"
            class="navbar-item">
            {{ category.name }}
          </router-link>

          <div class="navbar-item">
            <div class="buttons">
              <template v-if="$store.state.isAuthenticated">
                <router-link to="/my-account" class="button is-light"
                  >My account</router-link
                >
              </template>

              <template v-else>
                <router-link to="/log-in" class="button is-light"
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
      cartTotalLength: parseInt(0)
    };
  }
};
</script>

<style lang="scss">
@import '../node_modules/bulma';

// #wrapper {
//   margin: 0;
//   height: 100vh;
//   width: 100vw;
//   display: flexbox;
//   justify-content: space-between;
// }
</style>
