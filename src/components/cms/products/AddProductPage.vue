<template>
  <v-card flat elevation="4">
    <v-card-title>Add new product</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-alert v-if="addResponseError" dense text type="error">
            Cannot add product
          </v-alert>
        </v-col>
      </v-row>
      <v-form
          ref="form"
          v-model="valid">
        <v-row>
          <v-col cols="6" class="pa-8">
            <v-text-field
                v-model="product.name"
                label="name"
                required
                :rules="[v => !!v || 'Name is required']"
            ></v-text-field>
            <v-text-field
                v-model="product.price"
                label="price"
                required
                :rules="[v => !!v || 'Price is required',
            v => /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/.test(v) || 'Price is required']"
            ></v-text-field>
            <v-text-field
                v-model="product.imgLink"
                label="image link">
            </v-text-field>
            <v-checkbox
                v-model="product.availableForSale"
                label="available for sale"
                color="success">
            </v-checkbox>
            <v-sheet
                outlined
                rounded
                class="pa-4">
              <p class="font-weight-black">
                Categories
              </p>
              <div v-for="(category,index) in this.allCategories" :key="index">
                <v-checkbox
                    color="success"
                    light
                    :label="category"
                    :value="category.toLowerCase()"
                    v-model="product.categories">
                </v-checkbox>
              </div>
            </v-sheet>
          </v-col>
          <v-col cols="6" class="pa-8">
            <v-textarea
                label="description"
                v-model="product.description">
            </v-textarea>
          </v-col>
        </v-row>
        <v-container>
          <v-sheet align="center">
            <v-btn color="success"
                   :disabled="!valid"
                   class="ma-2"
                   @click="submit">
              Submit
            </v-btn>
            <v-btn color="error"
                   class="ma-2"
                   to="/cms/product">
              Cancel
            </v-btn>
          </v-sheet>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>

import api from "@/services/cms.product.service";
import router from "@/router";

export default {
  name: 'CMSAddProductPage',

  data() {
    return {

      allCategories: ['Fruits', 'Vegetables'],

      product: {
        id: "",
        name: "",
        categories: [],
        price: "",
        description: "",
        imgLink: "",
      },

      addResponseError: false,
      valid: true,
    };
  },

  methods: {
    createProduct: async function () {
      const requestData = {
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        description: this.product.description,
        imgLink: this.product.imgLink
      };

      const response = await api.createProduct(requestData);

      if (!response.error) {
        this.addResponseError = false;
        await router.push({name: "CMSProductsPage"});
      } else {
        this.addResponseError = true;
      }
    },

    submit() {
      this.$refs.form.validate();
      if (this.valid) {
        this.createProduct();
      }
    },
  },
  mounted() {
    this.user.roles = [];
  }

};
</script>