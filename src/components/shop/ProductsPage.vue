<template>
  <v-container>
    <v-card flat>
      <v-card-title>Products</v-card-title>
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

  data() {
    return {
      products: []
    };
  },
  methods: {
    readProducts: async function () {
      const data = await api.readProducts();
      this.products = data.map(e => e);

    },
  },
  mounted() {
    this.readProducts();
  },
};
</script>
