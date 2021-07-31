<template>
  <v-container>
    <h1>Edit user</h1>
    <v-row>
      <v-col cols="12">
        <v-alert v-if="addResponseError" dense text type="error">
          Cannot add user
        </v-alert>
      </v-col>
    </v-row>

    <v-form
        ref="form"
        v-model="valid">
      <v-row>
        <v-col cols="4" class="pa-8">
          <v-text-field
              v-model="user.username"
              label="username"
              required
              :rules="usernameRules"/>
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
          <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto">
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
        </v-col>
        <v-col cols="8" class="pa-8">
          <v-text-field
              v-model="user.address"
              label="address"
              :rules="lastNameRules"/>
          <v-textarea
              v-model="user.comments"
              label="comments">
          </v-textarea>
          <v-row>
            <v-col cols="4">
              <v-container fluid>
                <p>Role</p>
                <v-checkbox
                    v-model="user.roles"
                    label="Administrator"
                    value="ADMIN"
                ></v-checkbox>
                <v-checkbox
                    v-model="user.roles"
                    label="Manager"
                    value="MANAGER"
                ></v-checkbox>
                <v-checkbox
                    v-model="user.roles"
                    label="Customer"
                    value="CUSTOMER"
                ></v-checkbox>
              </v-container>
            </v-col>
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
                 :disabled="!valid || !isRoleSelected"
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
  </v-container>
</template>
<script>

import api from "@/services/cms.user.service";
import router from "@/router";
import User from "@/models/user";

export default {
  name: 'CMSEditUserPage',
  props: {
    userId: Number
  },

  data() {
    return {

      user: new User(),
      addResponseError: false,
      valid: true,
      menu: false,

      usernameRules: [
        v => !!v || 'username is required',
        v => (v && v.length >= 5 && v.length <= 20) || 'Login must be more than 5 and less than 20 characters',
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

  computed: {
    isRoleSelected() {
      if (this.user.roles) {
        return this.user.roles.length > 0;
      } else {
        return false;
      }

    }
  },

  methods: {
    readUser: async function () {
      this.user = await api.readUser(this.userId);
      const birthDate = await (new Date(this.user.birthDate));
      this.user.birthDate = birthDate.toISOString().split('T')[0];
    },

    updateUser: async function () {
      const data = await api.updateUser(this.user);

      if (data == 200) {
        this.updateResponseError = false;
        await router.push({name: "CMSUsersPage"});
      } else {
        this.updateResponseError = true;
      }
    },

    submit() {
      this.$refs.form.validate();
      if (this.valid) {
        this.updateUser();
      }
    },
  },

  mounted() {
    this.readUser(this.userId);
  },

};
</script>