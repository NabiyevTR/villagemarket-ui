<template>
  <v-container>
    <h1>Products CMS</h1>
    <v-row>
      <v-col>
        <v-alert v-if="deleteResponseSuccess" dense text type="success">
          You have successfully deleted product.
        </v-alert>
        <v-alert v-if="deleteResponseError" dense text type="error">
          Cannot delete product
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn :to="{ name: 'CMSAddProductPage'}">
          Add product
        </v-btn>
      </v-col>
    </v-row>
    <v-row >
      <v-col >
        <v-simple-table>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">
                Product name
              </th>
              <th class="text-center" >
                Price
              </th>
              <th class="text-center">
                Delete
              </th>
              <th class="text-center">
                Edit
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.name }}</td>
              <td class="text-center" width="10%">{{ product.price }}</td>
              <td class="text-center" width="1%">
                <v-btn icon color="pink" v-on:click="removeProduct(product.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
              <td class="text-center" width="1%">
                <v-btn icon color="blue"
                       :to="{ name: 'CMSEditProductPage', params: { productId: product.id }}">
                  <v-icon>mdi-pencil-box-outline</v-icon>
                </v-btn>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/services/cms.product.service";

export default {
  name: "ProductsPage",
  data() {
    return {
      products: [],
      deleteResponseSuccess: false,
      deleteResponseError: false,
    };
  },
  methods: {
    readProducts: async function () {
      try {
        const data = await api.readProducts();
        this.products = data;
      } catch (e) {
        console.warn(e)
      }
    },

    removeProduct: async function (productId) {
      console.log("Removing Product " + productId);
      this.products = this.products.filter(
          (product) => product.id != productId
      );
      const data = await api.deleteProduct(productId);
      //todo handle response status
      if (data == 200) {
        this.deleteResponseSuccess = true;
        this.deleteResponseError = false;
      } else {
        this.deleteResponseSuccess = false;
        this.deleteResponseError = true;
        const data = api.readProducts();
        this.products = data;
      }

    },


  },
  mounted() {
    this.readProducts();
  },
};
</script>
