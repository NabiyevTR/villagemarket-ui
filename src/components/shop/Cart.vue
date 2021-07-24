<template>
  <v-container class="pa-10">

    <h2>Your Cart</h2>

    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">
            Product name
          </th>
          <th class="text-center">
            Price
          </th>
          <th></th>
          <th class="text-center">
            Quantity
          </th>
          <th></th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td class="text-center" width="5%">$ {{ product.price }}</td>
          <th></th>
          <td class="text-center" width="5%">{{ product.quantity }}</td>
          <th></th>
          <th></th>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <p>
      Total: $ {{ total }}
    </p>
    <!--<p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>-->

    <v-btn color="success"
           v-show="!loggedIn"
           :disabled="!valid"
           @click="logIn">
      Login to continue
    </v-btn>

    <v-btn color="success"
           v-show="loggedIn"
           :disabled="!valid"
           @click="submit">
      Submit
    </v-btn>

  </v-container>

</template>

<script>

//const user = JSON.parse(localStorage.getItem('user'));
import {mapGetters, mapState} from 'vuex'

export default {

  data() {
    return {
      valid: true,
      user: JSON.parse(localStorage.getItem('user'))
    }
  },

  computed: {
    ...
        mapState({
          checkoutStatus: state => state.cart.checkoutStatus
        }),
    ...
        mapGetters('cart', {
          products: 'cartProducts',
          total: 'cartTotalPrice'
        }),

    loggedIn: {
      get: function () {
        return Boolean(this.user)
      }
    }
// loggedIn: Boolean(this.$store.state.auth.user)
  },

  methods: {
    update() {
      this.$store.dispatch('cart/update')
    }
    ,

    logIn() {
      this.$router.push('/login');
    }
    ,

    submit() {
      /*this.$store.dispatch('auth/login');*/
      this.$router.push('/order/new');
    }
  }
  ,

}


</script>
