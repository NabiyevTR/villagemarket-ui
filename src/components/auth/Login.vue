<template>
  <v-container>

    <v-container>

      <v-alert
          elevation="1"
          dense
          text
          type="error"
          v-show="loginError"
      >
        Illegal username or password
      </v-alert>

    </v-container>


    <v-row justify="center" align="center">

      <v-col cols="4"/>
      <v-col cols="4">

        <v-sheet
            :rounded="'lg'"
            class="pa-8"
            outlined>
          <h3 class="font-weight-black" align="center">Login form</h3>
          <v-form align="center"
                  class="ma-5"
                  ref="form"
                  v-model="valid"
                  lazy-validation          >
            <v-text-field
                v-model="user.username"
                :counter="20"
                :rules="nameRules"
                label="Name"
                required
            ></v-text-field>
            <v-text-field
                v-model="user.password"
                type="password"
                :counter="20"
                :rules="passwordRules"
                label="Password"
                required
            ></v-text-field>

            <v-btn

                :disabled="!valid"
                color="success"
                class="ma-5"
                @click="handleLogin"
            >
              Submit
            </v-btn>
            <br>
            <v-btn
                color="success"
                @click="$router.push({path: '/registration'})"
            >
              Registration
            </v-btn>


          </v-form>
        </v-sheet>


      </v-col>
      <v-col cols="4">

      </v-col>
    </v-row>
  </v-container>

</template>

<script>

import User from './../../models/user';
//import cartApi from "@/services/cart.service";
import {mapGetters} from "vuex";

export default {

  name: 'Login',

  data: () => ({

    loginError: false,
    user: new User('', ''),
    loading: false,
    valid: true,

    nameRules: [
      v => !!v || 'login is required',
      v => (v && v.length >= 6 && v.length <= 20) || 'Login must be more than 6 and less than 20 characters',
    ],

    passwordRules: [
      v => !!v || 'password is required',
      v => (v && v.length >= 6 && v.length <= 20) || 'Password must be more than 6 and less than 20 characters',
    ],
    select: null,
  }),

  computed: {
    ...mapGetters('cart', {
      products: 'cartProducts',
    }),

    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },

  methods: {

    handleLogin() {
      this.loading = true;
      this.$refs.form.validate()

      if (!this.valid) {
        this.loading = false;
        return;
      }
      if (this.user.username && this.user.password) {
        this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.loginError = localStorage.getItem('user') === null
              if (!this.loginError) {

                try{
                  this.$router.push(localStorage.getItem('targetPage'));
                  localStorage.setItem('targetPage', '/');
                } catch (e) {
                  this.$router.push('/');
                }
              } else {
                this.user.username = "";
                this.user.password = "";
                this.$refs.form.reset();
              }
            },
            error => {
              this.loading = false;
              this.message =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
            })

      }
    }
  },
};
</script>



