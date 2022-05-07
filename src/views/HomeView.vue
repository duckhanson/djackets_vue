<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">Welcome to 世賢烤鴨</p>
        <p class="subtitle">The best 烤鴨 online</p>
      </div>
    </section>

    <LoadingCircle/>
    

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Recommendation</h2>
      </div>

      <ProductBox
        v-for="product in lastest_products"
        v-bind:key="product.id"
        v-bind:product="product" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ProductBox from '@/components/ProductBox'
import LoadingCircle from '@/components/LoadingCircle'

export default {
  name: 'HomeView',
  components: {
    ProductBox,
    LoadingCircle,
  },

  data() {
    return {
      lastest_products: [],
    }
  },

  mounted() {
    this.getLastestProducts(),
    document.title = '首頁 | ' + this.$store.state.abb_store_name
  },

  methods: {
    async getLastestProducts() {
      this.$store.commit('setIsLoading', true)
      
      await axios
        .get('api/v1/lastest-products/')
        .then(response => {
          this.lastest_products = response.data
        })
        .catch(err => {
          console.log(err)
        })
      this.$store.commit('setIsLoading', false)
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>