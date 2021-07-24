<template>
  <v-card
      class="mx-auto"
      max-width="300"
  >
    <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="200px"
    ></v-img>

    <v-card-title>
      {{ product.name }}
    </v-card-title>

    <v-card-subtitle>
      $ {{product.price }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
          color="orange lighten-2"
          text
          @click="addProductToCart(product)"
      >
        Add to cart
      </v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>

import {mapActions} from 'vuex'
import Product from "@/models/product";

export default {

  props: {
    product: Product,
  },

  data: () => ({}),
  methods: mapActions('cart', [
    'addProductToCart'
  ]),
  mounted() {

  }
}
</script>