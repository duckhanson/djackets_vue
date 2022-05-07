<template>
  <tr>
    <td>
      <router-link :to="item.product.get_absolute_url">{{
        item.product.name
      }}</router-link>
    </td>
    <td>${{ item.product.price }}</td>
    <td>
      {{ item.quantity }}
      <a @click="decrementQuantity(item)">-</a>
      <a @click="incrementQuantity(item)">+</a>
    </td>
    <td>${{ getItemTotal(item) }}</td>
    <td><button class="delete" @click="removeFromCart(item)"></button></td>
  </tr>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    initialItem: Object
  },

  data() {
    return {
      item: this.initialItem
    };
  },

  methods: {
    getItemTotal() {
      return this.item.quantity * this.item.product.price;
    },
    decrementQuantity(item) {
      item.quantity -= 1
      this.updateCart()
    },
    incrementQuantity(item) {
      item.quantity += 1
      this.updateCart()
    },
    updateCart() {
      if (this.item.quantity === 0) {
        this.$emit('removeFromCart', this.item)
      }
      localStorage.setItem('Cart', JSON.stringify(this.$store.state.cart))
    },
    removeFromCart(item) {
      this.$emit('removeFromCart', item)
      localStorage.setItem('Cart', JSON.stringify(this.$store.state.cart))
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
