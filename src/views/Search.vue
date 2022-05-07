<template>
    <div class="page-search">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Search</h1>

                <h2 class="is-size-5 has-text-grey">Search term: "{{ query }}"</h2>
            </div>

            <ProductBox 
                v-for="product in products"
                v-bind:key="product.id"
                v-bind:product="product" />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'
import LoadingCircle from '@/components/LoadingCircle'
import ProductBox from '@/components/ProductBox'

export default {
    name: 'Search',

    components: {
        LoadingCircle,
        ProductBox,
    },

    data() {
        return {
            products: [],
            query: ''
        }
    },

    mounted() {
        document.title = 'Search | ' + this.$store.state.abb_store_name
        let uri = window.location.search.substring(1)
        let params = new URLSearchParams(uri)
        if (params.get('query')) {
            this.query = params.get('query')
            this.performSearch()
        }
    },

    methods: {
        async performSearch() {
            this.$store.commit('setIsLoading', true)
            const category_slug = this.$route.params.category_slug
            console.log(`/api/v1/products/${category_slug}/`)
            await axios
                .post('/api/v1/products/search/', {'query': this.query})
                .then(response => {
                    this.products = response.data
                })
                .catch(error => {
                    console.log(error)
                })
            this.$store.commit('setIsLoading', false)
        },
    },
}
</script>