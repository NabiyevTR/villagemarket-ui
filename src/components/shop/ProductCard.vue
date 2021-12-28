<template>
  <v-hover v-slot="{ hover }">
    <v-card class="mx-auto card" color="white lighten-4" max-width="500">
      <v-container fluid>
        <v-img :aspect-ratio="16 / 14" v-bind:src="product.imgLink">
          <v-expand-transition>
            <div
              v-if="hover"
              class="
                d-flex
                transition-fast-in-fast-out
                green
                darken-2
                v-card--reveal
                text-h2
                white--text
              "
              style="height: 100%"
            >
              ${{ product.price }}
            </div>
          </v-expand-transition>
        </v-img>
      </v-container>
      <v-card-text class="pt-6" style="position: relative">
        <v-btn
          @click="addProductToCart(product)"
          absolute
          color="green"
          class="white--text"
          fab
          large
          right
          top
        >
          <v-icon>mdi-cart</v-icon>
        </v-btn>

        <h3 class="text-h4 font-weight-light green--text mb-2">
          {{ product.name }}
        </h3>
        <div class="font-weight-light text-h6 mb-2">
          Our Vintage kitchen utensils delight any chef.<br />
          Made of bamboo by hand
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>
<script>
import { mapActions } from "vuex";
import Product from "@/models/product";

export default {
  props: {
    product: Product,
  },

  data: () => ({}),
  methods: mapActions("cart", ["addProductToCart"]),
};
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}

.card {
  margin-top: 40px;
}
</style>