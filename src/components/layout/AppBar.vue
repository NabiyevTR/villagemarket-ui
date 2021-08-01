<template>
  <v-app-bar app color="white" flat min-width="1000" >


    <v-container class="py-0 fill-height"  max-width="1200" >

      <!--Menu buttons-->

      <v-row justify='end' >
        <v-col cols="10">
          <v-btn to="/" text>Home</v-btn>
          <!--<v-btn to="/recipe" text>Recipe</v-btn>-->
          <!--<v-btn to="/blog" text>Blog</v-btn>-->
          <v-btn to="/product" text>Shop</v-btn>
          <v-btn to="/about" text>About Us</v-btn>
          <v-btn to="/contacts" text>Contact Us</v-btn>


          <template v-if="isManager || isSuperAdmin">
            <ManagerMenu></ManagerMenu>
          </template>

          <template v-if="isAdmin || isSuperAdmin">
            <AdminMenu></AdminMenu>
          </template>


        </v-col>
        <v-col align="right">

          <v-badge
              :value="!cartIsEmpty"
              bordered
              overlap
              color="pink accent-4"
              dot
              offset-x="18"
              offset-y="10"
          >
            <v-btn
                class="mx-2"
                fab
                dark
                small
                color="green darken-2"
                to="/cart"
            >
              <v-icon

                  color="white"
              >

                {{ this.icons.mdiCart }}
              </v-icon>
            </v-btn>
          </v-badge>

          <v-btn
              class="mx-2"
              fab
              dark
              small
              color="green darken-2"
              v-show=!loggedIn @click="logIn"
          >
            <v-icon color="white">
              {{ this.icons.mdiLoginVariant }}
            </v-icon>
          </v-btn>

          <v-btn
              class="mx-2"
              fab
              dark
              small
              color="green darken-2"
              v-show=loggedIn @click="logOut"
          >
            <v-icon color="white">
              {{ this.icons.mdiLogoutVariant }}
            </v-icon>
          </v-btn>

        </v-col>
      </v-row>

      <v-spacer></v-spacer>

      <v-responsive max-width="260"></v-responsive>

    </v-container>
  </v-app-bar>
</template>
<script>


import AdminMenu from "@/components/ui/AdminMenu";
import ManagerMenu from "@/components/ui/ManagerMenu";
import {
  mdiCart,
  mdiLoginVariant,
  mdiLogoutVariant
} from '@mdi/js'

export default {
  name: 'c-app-bar',
  components: {ManagerMenu, AdminMenu},


  data() {
    return {
      icons: {
        mdiCart,
        mdiLoginVariant,
        mdiLogoutVariant

      }
    }
  },


  computed: {

    user() {
      return this.$store.state.auth.user;
    },

    roles() {
      try {
        return this.user.grantedAuthorities.map(e => e.authority);
      } catch (e) {
        return [];
      }

    },

    isAdmin() {
      return this.roles.includes('ROLE_ADMIN');
    },

    isSuperAdmin() {
      return this.roles.includes('ROLE_SUPERADMIN');
    },

    isManager() {
      return this.roles.includes('ROLE_MANAGER');
    },

    isCustomer() {
      return this.roles.includes('ROLE_CUSTOMER');
    },

    loggedIn() {
      return Boolean(this.user);

    },

    cartIsEmpty() {
      const cart =  this.$store.state.cart;
      //const cart = JSON.parse(localStorage.getItem('cart'));
      //console.log(cart)
      if (cart == null) {
        return true;
      }

      //if (cart.length.items === 0) {
      if (cart.items.length === 0) {
        return true;
      }
      return false;
    }
  },


  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');

    },
    logIn() {
      /*this.$store.dispatch('auth/login');*/
      this.$router.push('/login');

    }
  }
}

</script>