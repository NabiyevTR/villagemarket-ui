<template>
  <v-card
      class="mx-auto ma-4"
      elevation="4"
      max-width="250">
    <v-container fluid>
      <v-img
          class="ma-1"
          v-bind:src="product.imgLink"
          contain
          height="200"
      ></v-img>
    </v-container>
    <v-card-title>
      {{ product.name }}
    </v-card-title>
    <v-card-subtitle>
      ${{ product.price }}
    </v-card-subtitle>
    <v-card-actions>
      <v-btn
          color="orange lighten-2"
          text
          @click="addProductToCart(product)">
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

}
</script>