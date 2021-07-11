<template>
  <v-container>
    <h1>Products</h1>
    <v-row>
      <v-col sm="6">
        <v-simple-table>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">
                Product name
              </th>
              <th class="text-left">
                Price
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.name }}</td>
              <td>{{ product.price }}</td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/service/apiService";

export default {
  name: "Products",
  data() {
    return {
      products: [],
      responseSuccess: false
    };
  },
  methods: {
    readProducts: async function () {
      const data = await api.readProducts();
      this.products = data;
    },
  },
  mounted() {
    this.readProducts();
  },
};
</script>
