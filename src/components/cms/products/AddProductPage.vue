<template>
  <v-container>
    <h1>Add new product</h1>
    <v-row>
      <v-col cols="12">
        <v-alert v-if="addResponseError" dense text type="error">
          Cannot add product
        </v-alert>
      </v-col>
    </v-row>
    <v-form
        ref="form"
        v-model="valid"    >
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
          <v-btn color="success"
                 :disabled="!valid"
                 @click="submit">
            Submit
          </v-btn>
        </v-col>
        <v-col cols="6" class="pa-8">
          <v-textarea label="description">
          </v-textarea>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
import api from "@/services/cms.product.service";
import router from "@/router";

export default {
  name: 'CMSAddProductPage',

  data() {
    return {
      product: {
        id: "",
        name: "",
        price: "",
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
      };

      const response = await api.createProduct(requestData);

      if (response == 200) {
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

};
</script>