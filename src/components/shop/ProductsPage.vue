<template>
  <v-container>
    <v-card flat class="grey lighten-5">
      <!--  <v-card-title>Products</v-card-title>-->
      <v-card-text>
        <v-flex d-flex grow="true" align-self-center>
          <v-layout wrap>
            <v-flex v-for="product in this.products" :key="product.id">
              <product-card v-bind:product="product">
              </product-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import api from "@/services/product.service";
import ProductCard from "@/components/shop/ProductCard";


export default {
  name: "ProductsPage",
  components: {ProductCard},
  props: ['category'],
  data() {
    return {
      products: [],
    };
  },

  watch: {
    '$route.params': {
      handler() {
        this.readProducts();
      },
      immediate: true,
    },
  },

  methods: {
    readProducts: async function () {
      let data;

      if (this.category === undefined) {
        data = await api.readProducts();
      } else {
        data = await api.readProductsWithCategory(this.category);
      }
      this.products = data.map(e => e);
    },
  },

  mounted() {
    this.readProducts();
  },
};
</script>
