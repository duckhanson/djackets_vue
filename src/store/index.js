import { createStore } from 'vuex';

export default createStore({
  state: {
    cart: {
      items: []
    },
    isAuthenticated: false,
    token: '',
    isLoading: false
  },
  getters: {},
  mutations: {
    initalizeStore(state) {
      if (localStorage.getItem('cart')) {
        state.cart = JSON.parse(localStorage.getItem('cart'));
      } else {
        localStorage.setItem(JSON.stringify(state.cart));
      }
    },

    addToCart(state, item) {
      const exists = state.cart.items.filter(
        (i) => i.product.id === item.product.id
      );

      if (exists.length) {
        exists[0].quantity =
          parseInt(exists[0].quantity) + parseInt(item.quantity);
      } else {
        state.cart.push(item)
      }

      localStorage.setItem(JSON.stringify(state.cart))
    }
  },
  actions: {},
  modules: {}
});
