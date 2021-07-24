<template>
  <v-container>
    <h1>Users CMS</h1>
    <v-row>
      <v-col>
        <v-alert v-if="deleteResponseSuccess" dense text type="success">
          You have successfully deleted user.
        </v-alert>
        <v-alert v-if="deleteResponseError" dense text type="error">
          Cannot delete user
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn :to="{ name: 'CMSAddUserPage'}">
          Add user
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-simple-table>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">
                Username
              </th>
              <th class="text-center">
                Email
              </th>
              <th class="text-center">
                Delete
              </th>
              <th class="text-center">
                Edit
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.username }}</td>
              <td class="text-center" width="10%">{{ user.email }}</td>
              <td class="text-center" width="1%">
                <v-btn icon color="pink" v-on:click="removeUser(user.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
              <td class="text-center" width="1%">
                <v-btn icon color="blue"
                       :to="{ name: 'CMSEditUserPage', params: { userId : user.id }}">
                  <v-icon>mdi-pencil-box-outline</v-icon>
                </v-btn>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/services/cms.user.service";

export default {
  name: "UsersPage",
  data() {
    return {
      users: [],
      deleteResponseSuccess: false,
      deleteResponseError: false,
    };
  },
  methods: {
    readUsers: async function () {
      this.users = await api.readUsers();
    },

    removeUser: async function (userId) {
      console.log("Removing user " + userId);
      this.users = this.users.filter(
          (user) => user.id != userId
      );
      const data = await api.deleteUser(userId);
      if (data == 200) {
        this.deleteResponseSuccess = true;
        this.deleteResponseError = false;
      } else {
        this.deleteResponseSuccess = false;
        this.deleteResponseError = true;
        this.users = api.readUsers();
      }

    },

  },
  mounted() {
    this.readUsers();
  },
};
</script>
