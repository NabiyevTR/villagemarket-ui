<template>
  <v-app-bar app color="white" flat>


    <v-container class="py-0 fill-height">

      <!--Menu buttons-->

      <v-row justify='end'>
        <v-col cols="10">
          <v-btn to="/" text>Home</v-btn>
          <v-btn to="/recipe" text>Recipe</v-btn>
          <v-btn to="/blog" text>Blog</v-btn>
          <v-btn to="/product" text>Shop</v-btn>
          <v-btn to="/contacts" text>Contact Us</v-btn>


          <AdminMenu></AdminMenu>


        </v-col>
        <v-col align="right">

          <v-btn to="/cart" v-show="cartBtnVisible"  text>Cart</v-btn>
          <v-btn to="/cart" v-show="logonBtnVisible" text>Logon</v-btn>
          <v-btn to="/cart" v-show="logoutBtnVisible" @click="logOut" text>Logout</v-btn>
        </v-col>
      </v-row>


      <v-spacer></v-spacer>

      <v-responsive max-width="260"></v-responsive>

    </v-container>
  </v-app-bar>
</template>
<script>


import AdminMenu from "@/components/ui/AdminMenu";

export default {
  name: 'c-app-bar',
  components: {AdminMenu},

  data: () => ({

  }),

  computed: {

    logonBtnVisible() {
      return !this.$store.state.auth.user;
    },
    logoutBtnVisible() {
      return Boolean(this.$store.state.auth.user);
    },
    cartBtnVisible(){
      return Boolean(this.$store.state.auth.user);
    }

  },

  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
}

</script>