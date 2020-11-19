<template>
  <div class="home">
      <product-component v-for="product in products" 
      :key="product.productId"
      :product="product"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductComponent from '@/components/ProductComponent.vue'

export default {
  name: 'Home',
  components: {
    ProductComponent,
  },
  created() {
    this.$store.dispatch('fetchProducts');
  },
  computed: {
    products() {
      return this.$store.getters.allProducts;
      
    },
  },
}
</script>

<style lang="stylus">
    .home
        padding:20px 0px 0px 90px;
</style>