<template>
  <v-container>
    <h1>Edit product</h1>
    <v-row>
      <v-col cols="12">
        <v-alert v-if="updateResponseError" dense text type="error">
          Cannot update product
        </v-alert>
      </v-col>
    </v-row>
    <v-form
        ref="form"
        v-model="valid"    >
    <v-row>
      <v-col cols="6" class="pa-8">
          <v-text-field
              v-model="editedProduct.name"
              label="name"
              required
              :rules="[v => !!v || 'Name is required']"
          ></v-text-field>
          <v-text-field
              v-model="editedProduct.price"
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
  name: 'CMSEditProductPage',
  props: ['productId'],



  data() {
    return {
      editedProduct: {
        id: this.productId,
        name: "",
        price: "",
      },
      updateResponseError: false,
      valid: true,
    };
  },

  methods: {
    readProduct: async function () {
      const data = await api.readProduct(this.productId)
      this.editedProduct = data;
    },
    updateProduct: async function () {
      const requestData = {
        id: this.editedProduct.id,
        name: this.editedProduct.name,
        price: this.editedProduct.price,
      };
      const data = await api.updateProduct(requestData);

      if (data == 200) {
        this.updateResponseError = false;
        await router.push({name: "CMSProductsPage"});
      } else {
        this.updateResponseError = true;
      }
    },

    submit() {
      this.$refs.form.validate();
      if (this.valid) {
        this.updateProduct();
      }
    },
  },
  mounted() {
    this.readProduct(this.productId)

  },
};
</script>