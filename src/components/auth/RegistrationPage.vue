<template>
  <v-container>
    <v-card flat elevation="4">
      <v-card-title>
        Registration form
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-alert v-if="responseError" dense text type="error">
              {{ responseErrorMessage }}
            </v-alert>
          </v-col>
        </v-row>

        <v-form
            ref="form"
            v-model="valid">
          <v-row>
            <v-col cols="6" class="pa-8">
              <v-text-field
                  v-model="user.username"
                  label="username"
                  required
                  :rules="usernameRules"/>
              <v-text-field
                  v-model="user.password"
                  label="password"
                  type="password"
                  required
                  :rules="passwordRules"/>
              <v-text-field
                  v-model="user.firstName"
                  label="first name"
                  :rules="firstNameRules"/>
              <v-text-field
                  v-model="user.lastName"
                  label="last name"
                  :rules="lastNameRules"/>
              <v-text-field
                  v-model="user.email"
                  label="email"
                  required
                  :rules="emailRules"/>

              <v-text-field
                  v-model="user.phoneNumber"
                  label="phone number"
                  required
                  :rules="phoneNumberRules"/>
            </v-col>
            <v-col cols="6" class="pa-8">
              <v-text-field
                  v-model="user.address"
                  label="address"
                  :rules="lastNameRules"/>
              <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="user.birthDate"
                      label="birth date"
                      prepend-icon="mdi-calendar"

                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="user.birthDate"
                    @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
              <v-row>
                <v-col cols="4">
                  <v-container fluid>
                    <p>Gender</p>
                    <v-checkbox
                        v-model="user.gender"
                        label="Male"
                        value="m"
                    ></v-checkbox>
                    <v-checkbox
                        v-model="user.gender"
                        label="Female"
                        value="f"
                    ></v-checkbox>
                  </v-container>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col align="center" justify="center" cols="12">
              <v-btn color="success"
                     class="ma-2"
                     :disabled="!valid "
                     @click="submit">
                Submit
              </v-btn>
              <v-btn color="error"
                     class="ma-2"
                     to="/cms/user">
                Cancel
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import api from "@/services/reg.service";
import router from "@/router";
import RegUser from "@/models/regUser";

export default {
  name: 'RegistrationPage',
  data() {
    return {
      user: new RegUser(),

      responseError: false,
      responseErrorMessage: "",
      valid: true,

      menu: false,

      usernameRules: [
        v => !!v || 'username is required',
        v => (v && v.length >= 5 && v.length <= 20) || 'Login must be more than 5 and less than 20 characters',
      ],

      passwordRules: [
        v => !!v || 'password is required',
        v => (v && v.length >= 6 && v.length <= 20) || 'Password must be more than 6 and less than 20 characters',
      ],

      firstNameRules: [],

      lastNameRules: [],

      birthDate: [],

      genderRules: [],

      addressRules: [],

      emailRules: [
        v => !!v || 'email is required',
        v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid' || 'E-mail must be valid',
      ],

      phoneNumberRules: [
        v => !!v || 'phone is required',
      ],

    };
  },

  methods: {

    createUser: async function () {
      this.user.active = true;
      console.debug('Sending user reg data to server: ', this.user)
      const response = await api.registerUser(this.user)
      await console.debug('Server reg response: ', response)

      if (!response.error) {
        this.responseError = false;
        await router.push({path: '/login'});
      } else {
        this.responseError = true;
        this.responseErrorMessage = response.errorMessage;
      }
    },

    submit() {
      this.$refs.form.validate();
      if (this.valid) {
        this.createUser();
      }
    },
  },

  mounted() {
    this.user.birthDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000))
        .toISOString().substr(0, 10);
  },
};
</script>