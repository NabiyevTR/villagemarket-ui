<template>
  <v-card flat elevation="4">
    <v-card-title>
      Edit product
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-alert v-if="updateResponseError" dense text type="error">
            Cannot update product
          </v-alert>
        </v-col>
      </v-row>
      <v-form
          ref="form"
          v-model="valid">
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
            v => /^(\d*([.,](?=\d{2}))?\d+)+((?!\2)[.,]\d\d)?$/.test(v) || 'Price is required']"
            ></v-text-field>
            <v-text-field
                v-model="editedProduct.imgLink"
                label="image link">
            </v-text-field>
            <v-checkbox
                v-model="editedProduct.availableForSale"
                label="available for sale"
                color="success">
            </v-checkbox>

            <v-sheet
                outlined
                rounded
                class="pa-4"
            >
              <p class="font-weight-black">
                Categories
              </p>
              <div v-for="(category,index) in this.allCategories" :key="index" >
                <v-checkbox
                    color="success"
                    light
                    :label="category"
                    :value="category.toLowerCase()"
                    v-model="editedProduct.categories">

                </v-checkbox>
              </div>
            </v-sheet>


          </v-col>
          <v-col cols="6" class="pa-8">
            <v-textarea label="description" v-model="editedProduct.description">
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
  name: 'CMSEditProductPage',
  props: ['productId'],


  data() {
    return {

      allCategories: ['Fruits', 'Vegetables'],

      editedProduct: {
        id: this.productId,
        name: "",
        categories: [],
        price: "",
        description: "",
        imgLink: "",
        availableForSale: false,
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
        categories: this.editedProduct.categories,
        price: this.editedProduct.price,
        description: this.editedProduct.description,
        imgLink: this.editedProduct.imgLink,
        availableForSale: this.editedProduct.availableForSale,
      };
      await console.debug('Sending update request: ', requestData)
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