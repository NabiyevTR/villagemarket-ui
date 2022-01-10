<template>
    <v-app-bar app color="green darken-2" flat min-width="1000" elevation="4">
      <v-container class="py-0 fill-height" max-width="1200">
        <v-btn to="/" text color="white">Home</v-btn>
        <template>
          <ShopMenu></ShopMenu>
        </template>
        <v-btn to="/about" text color="white">About Us</v-btn>
        <v-btn to="/contacts" text color="white">Contact Us</v-btn>
        <template v-if="isManager || isSuperAdmin">
          <ManagerMenu></ManagerMenu>
        </template>
        <template v-if="isAdmin || isSuperAdmin">
          <AdminMenu></AdminMenu>
        </template>
        <v-spacer></v-spacer>
        <!-- Profile -->
        <v-btn
          class="mx-2"
          fab
          dark
          small
          color="green darken-2"
          v-show="loggedIn"
          to="/profile"
        >
          <v-icon color="white">
            {{ this.icons.mdiAccountCowboyHat }}
          </v-icon>
        </v-btn>
        <!--   Cart-->
        <v-badge
          :value="!cartIsEmpty"
          bordered
          overlap
          color="pink accent-4"
          dot
          offset-x="18"
          offset-y="10"
        >
          <v-btn class="mx-2" fab dark small color="green darken-2" to="/cart">
            <v-icon color="white">
              {{ this.icons.mdiCart }}
            </v-icon>
          </v-btn>
        </v-badge>

        <!--Login-->

        <v-btn
          class="mx-2"
          fab
          dark
          small
          color="green darken-2"
          v-show="!loggedIn"
          @click="logIn"
        >
          <v-icon color="white">
            {{ this.icons.mdiLoginVariant }}
          </v-icon>
        </v-btn>

        <!--Logout-->

        <v-btn
          class="mx-2"
          fab
          dark
          small
          color="green darken-2"
          v-show="loggedIn"
          @click="logOut"
        >
          <v-icon color="white">
            {{ this.icons.mdiLogoutVariant }}
          </v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>
</template>
<script>
import AdminMenu from "@/components/header/AdminMenu";
import ManagerMenu from "@/components/header/ManagerMenu";
import {
  mdiCart,
  mdiLoginVariant,
  mdiLogoutVariant,
  mdiAccountCowboyHat,
} from "@mdi/js";
import ShopMenu from "@/components/header/ShopMenu";

export default {
  name: "c-app-bar",
  components: { ShopMenu, ManagerMenu, AdminMenu },

  data() {
    return {
      icons: {
        mdiCart,
        mdiLoginVariant,
        mdiLogoutVariant,
        mdiAccountCowboyHat,
      },
    };
  },

  computed: {
    user() {
      return this.$store.state.auth.user;
    },

    roles() {
      try {
        return this.user.grantedAuthorities.map((e) => e.authority);
      } catch (e) {
        return [];
      }
    },

    isAdmin() {
      return this.roles.includes("ROLE_ADMIN");
    },

    isSuperAdmin() {
      return this.roles.includes("ROLE_SUPERADMIN");
    },

    isManager() {
      return this.roles.includes("ROLE_MANAGER");
    },

    isCustomer() {
      return this.roles.includes("ROLE_CUSTOMER");
    },

    loggedIn() {
      return Boolean(this.user);
    },

    cartIsEmpty() {
      const cart = this.$store.state.cart;
      if (cart == null) {
        return true;
      }

      if (cart.items.length === 0) {
        return true;
      }
      return false;
    },
  },

  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    logIn() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
</style>