<template>
  <v-container>
    <v-card flat elevation="4">
      <v-card-title>Your Cart</v-card-title>
      <v-card-text>
        <v-alert elevation="4"
                 type="info"
                 v-show="this.isEmpty">
          Cart is empty
        </v-alert>
        <v-simple-table v-show="!this.isEmpty">
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
              <td class="text-center" width="150px">$ {{ product.price }}</td>
              <td class="text-center" width="1px">
                <v-icon color="green darken-2"
                        @click="decItem(product.id)">
                  {{ icons.mdiMinusCircle }}
                </v-icon>
              </td>
              <td class="text-center" width="10px">{{ product.quantity }}</td>
              <td class="text-center" width="1px">
                <v-icon color="green darken-2"
                        @click="incItem(product.id)">
                  {{ icons.mdiPlusCircle }}
                </v-icon>
              </td>
              <td class="text-center" width="1px">
                <v-btn icon color="pink" v-on:click="removeItem(product.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
        <p v-show="!isEmpty" class="font-weight-black ma-3">
          Total: {{ total}}
        </p>


        <v-sheet align="center">

          <v-btn color="success"
                 @click="$router.push({path: '/product'})"
                 class="ma-2">
            Back to shop
          </v-btn>

          <v-btn color="success"
                 v-show="!loggedIn && !isEmpty"
                 :disabled="!valid"
                 @click="logIn"
                 class="ma-2">
            Login to continue
          </v-btn>

          <v-btn color="success"
                 v-show="loggedIn && !isEmpty"
                 :disabled="!valid"
                 @click="submit"
                 class="ma-2">
            Submit
          </v-btn>
        </v-sheet>

      </v-card-text>
    </v-card>


  </v-container>

</template>

<script>

const user = JSON.parse(localStorage.getItem('user'));
import api from "@/services/cart.service";
import {mapGetters, mapState} from 'vuex'
import {
  mdiPlusCircle,
  mdiMinusCircle
} from '@mdi/js'


export default {

  data() {
    return {
      icons: {
        mdiPlusCircle,
        mdiMinusCircle
      },

      valid: true,
      user: JSON.parse(localStorage.getItem('user'))
    }
  },


  computed: {
    ...mapState({
      checkoutStatus: state => state.cart.checkoutStatus
    }),
    ...mapGetters('cart', {
      products: 'cartProducts',
      total: 'cartTotalPrice'

    }),

    loggedIn: {
      get: function () {
        return Boolean(this.user)
      }
    },

    isEmpty: {
      get: function () {
        if (this.products == null) {
          return true;
        }
        return this.products.length === 0;
      }
    }
  },

  methods: {

    pushCartToServer: async function () {
      if (user) {
        await api.updateCart(this.products);
      }
    },

    update() {
      this.$store.dispatch('cart/update')
    },

    logIn() {
      this.$router.push('/login');
    },

    submit() {
      this.$router.push('/order/new');
      this.pushCartToServer();
    },

    incItem(id) {
      this.$store.dispatch('cart/incrementItemQuantity', {
        id: id,
      });
      this.pushCartToServer();
    },

    decItem(id) {
      this.$store.dispatch('cart/decrementItemQuantity', {
        id: id,
      });
      this.pushCartToServer();
    },

    removeItem(id) {
      this.$store.dispatch('cart/removeItem', {
        id: id,
      })
      this.pushCartToServer();
    }
  },

}


</script>
