<template>
  <v-container>
    <v-row>
      <v-col cols="4">

      </v-col>
      <v-col cols="4">


        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
          <v-text-field
              v-model="user.username"
              :counter="20"
              :rules="nameRules"
              label="Name"
              required
          ></v-text-field>

          <v-text-field
              v-model="user.password"
              :counter="20"
              :rules="passwordRules"
              label="Password"
              required
          ></v-text-field>

          <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="handleLogin"
          >
            Submit
          </v-btn>


        </v-form>


      </v-col>
      <v-col cols="4">

      </v-col>
    </v-row>
  </v-container>

</template>

<script>

import User from './../../models/user';


export default {

  name: 'Login',

  data: () => ({


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
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },

  created() {
    if (!this.loggedIn) {
      this.$router.push('/cms/product');
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

              this.$router.push('/');
            },
            error => {
              this.loading = false;
              this.message =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
            });

      }
    }
  }
};
</script>



