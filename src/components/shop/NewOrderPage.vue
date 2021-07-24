<script src="../../models/order.js"></script>
<template>
  <v-container>
    <h1>Confirm order</h1>
    <v-row>
      <v-col cols="12">
        <v-alert v-if="this.createOrderResponseError" dense text type="error">
          Cannot update product
        </v-alert>
      </v-col>
    </v-row>

    <v-form
        ref="form"
        v-model="valid">
      <v-row>
        <v-col>
          <v-text-field
              v-model="this.order.firstName"
              label="first name"
              :rules="this.firtsNameRules"/>

          <v-text-field
              v-model="this.order.lastName"
              label="last name"
              :rules="this.lastNameRules"/>

          <v-text-field
              v-model="this.order.address"
              label="address"
              required
              :rules="this.addressRules"/>

          <v-text-field
              v-model="this.order.phoneNumber"
              label="phone number"
              required
              :rules="this.phoneNumberRules"/>

          <v-text-field
              v-model="this.order.email"
              label="email"
              required
              :rules="this.emailRules"/>

          <v-textarea
              v-model="this.order.comments"
              label="comments">
          </v-textarea>


        </v-col>


      </v-row>


    </v-form>


  </v-container>
</template>
<script>

import api from "@/services/order.service";
import router from "@/router";
import Order from "@/models/order";
import {mapGetters} from 'vuex';

export default {
  name: 'NewOrderPage',

  data() {
    return {
      order: new Order(),

      createOrderResponseError: false,
      valid: true,

      // RULES

      firstNameRules: [],

      lastNameRules: [],

      addressRules: [
        v => !!v || 'address is required',
      ],

      emailRules: [
        v => !!v || 'email is required',
        v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid' || 'E-mail must be valid',
      ],

      phoneNumberRules: [
        v => !!v || 'phone is required',
      ],
    };
  },

  computed: {
    ...mapGetters('cart', {
      products: 'cartProducts',
      total: 'cartTotalPrice'
    })
  },

  methods: {

    checkout(products) {
      this.$store.dispatch('cart/checkout', products)
    },

    getDataForOrder: async function () {
      this.order = await api.getDataForOrder();
    },

    createOrder: async function () {

      const data = await api.createOrder(this.order)

      //TODO change according ResponseDto
      if (data == 200) {
        this.createOrderResponseError = false;
        await router.push({name: "CMSProductsPage"});
      } else {
        this.createOrderResponseError = true;
      }
    },

    submit() {
      this.$refs.form.validate();
      if (this.valid) {
        this.createOrder();
      }
    },
  },
  mounted() {
    this.getDataForOrder();

  },
};
</script>