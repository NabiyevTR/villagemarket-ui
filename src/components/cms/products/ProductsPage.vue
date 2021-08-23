<template>
  <v-card flat elevation="4">
    <v-card-title>Products
      <v-spacer></v-spacer>
      <v-switch flat
                v-model="availableForSale"
                label="Only available for sale"
                color="success"
                inset
                @change="readProducts">
      </v-switch>
    </v-card-title>
    <v-card-text>
      <v-alert
          v-model="alert"
          elevation="5"
          dismissible
          dense
          type="info">
        Double click on row to view product info
      </v-alert>
      <v-alert v-if="deleteResponseSuccess" dense text type="success">
        You have successfully deleted product.
      </v-alert>
      <v-alert v-if="deleteResponseError" dense text type="error">
        Cannot delete product
      </v-alert>
      <v-btn
          color="success"
          :to="{ name: 'CMSAddProductPage'}">
        Add product
      </v-btn>
      <v-data-table
          :headers="headers"
          :items="products"
          item-key="name"
          class="elevation-0"
          :search="search"
          @dblclick:row="handleDoubleClick">
        <template v-slot:top>
          <v-text-field
              v-model="search"
              label="Search"
              class="mx-4"
          ></v-text-field>
        </template>
        <template v-slot:item.availableForSale="{ item }">
          <v-simple-checkbox
              v-model="item.availableForSale"
              disabled
          ></v-simple-checkbox>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
              small
              class="mr-2"
              @click="editProduct(item.id)">
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import api from "@/services/cms.product.service";

export default {
  name: "ProductsPage",

  data() {
    return {
      alert: true,
      products: [],
      deleteResponseSuccess: false,
      deleteResponseError: false,
      search: '',
      availableForSale: true,
    };
  },

  computed: {

    headers() {
      return [
        {text: 'Id', align: 'start', value: 'id', width: '100px'},
        {text: 'Name', value: 'name',},
        {text: 'Price', value: 'price', width: '100px', align: 'center'},
        {text: 'Available', value: 'availableForSale', width: '100px', align: 'center', sortable: false},
        {text: 'Actions', value: 'actions', width: '100px', align: 'center', sortable: false},
      ]
    }
  },

  methods: {

    readProducts: async function () {

      let data;

      try {
        if (this.availableForSale) {
          data = await api.readAvailableProducts();
        } else {
          data = await api.readProducts();
        }

        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        });

        this.products = data.map((item) => {
          return {
            id: item.id,
            name: item.name,
            availableForSale: item.availableForSale,
            price: formatter.format(item.price),
          }
        });
      } catch (e) {
        console.warn(e)
      }
    },

    editProduct: async function (productId) {
      await this.$router.push({name: 'CMSEditProductPage', params: {productId: productId}});
    },

    handleDoubleClick(event, {item}) {
      this.$router.push({name: 'CMSProductPage', params: {productId: item.id}})
    },
  },

  mounted() {
    this.readProducts();
  },
};
</script>
