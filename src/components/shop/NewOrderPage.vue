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
              v-model="order.firstName"
              label="first name"
          />

          <v-text-field
              v-model="order.lastName"
              label="last name"
          />

          <v-text-field
              v-model="order.address"
              label="address"
              required
              :rules="newOrderPageRules.addressRules"/>

          <v-text-field
              v-model="order.phoneNumber"
              label="phone number"
              required
              :rules="newOrderPageRules.phoneNumberRules"/>

          <v-text-field
              v-model="order.email"
              label="email"
              required
              :rules="newOrderPageRules.emailRules"/>

          <v-textarea
              v-model="order.comments"
              label="comments">
          </v-textarea>


          <v-menu
              v-model="this.menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="order.deliveryDate"
                  label="delivery date"
                  prepend-icon="mdi-calendar"

                  v-bind="attrs"
                  v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="order.deliveryDate"
                @input="menu2 = false"
            ></v-date-picker>
          </v-menu>

          <v-btn color="success"
                 :disabled="!valid"
                 @click="this.submit">
            Submit
          </v-btn>


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
      menu: false,
      createOrderResponseError: false,
      valid: true,

      // RULES
      newOrderPageRules: {
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
      },

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

    getDataForOrder() {
      api.getDataForOrder().then((result) => {
        console.debug("Receive data for new order", result);
        this.order.firstName = result.firstName;
        this.order.lastName = result.lastName;
        this.order.address = result.address;
        this.order.email = result.email;
        this.order.phoneNumber = result.phoneNumber;

        let date = new Date(result.deliveryDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (month < 10) {
          month = "0" + month;
        }
        let day = date.getDate()
        if (day < 10) {
          day = "0" + day;
        }
        this.order.deliveryDate = year + "-" + month + "-" + day

      })
    },

    createOrder: async function () {

      const data = await api.createOrder(this.order)
      console.debug("Response from server: ", data)
      //TODO change according ResponseDto
      if (data == 200 || true) {
        this.createOrderResponseError = false;
        //TODO push to order details page
        await this.$store.dispatch('cart/clearCart');
        await router.push({name: "ProductsPage"});
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