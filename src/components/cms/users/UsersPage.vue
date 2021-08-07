<template>
  <v-container>
    <v-card>
      <v-card-title>Users</v-card-title>
      <v-card-text>
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
            <v-btn
                class="success"
                :to="{ name: 'CMSAddUserPage'}">
              Add user
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>


            <v-data-table

                :headers="headers"
                :items="users"
                sort-by="id"
                class="elevation-0"
                :search="search"
            >
              <template v-slot:top>
                <v-text-field
                    v-model="search"
                    label="Search"
                    class="mx-4"
                ></v-text-field>
              </template>


              <template v-slot:item.active="{ item }">
                <v-simple-checkbox
                    v-model="item.active"
                    disabled
                ></v-simple-checkbox>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="editUser(item.id)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                    small
                    @click="removeUser(item.id)"
                >
                  mdi-delete
                </v-icon>
              </template>

            </v-data-table>

          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
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
      search: '',

      headers: [
        {text: 'User ID', align: 'start', value: 'id', width: '100px', },
        {text: 'Username', value: 'username'},
        {text: 'Email', value: 'email'},
        {text: 'Active', value: 'active', width: '100px', align: 'center'},
        {text: 'Actions', value: 'actions', width: '120px', align: 'center',  sortable: false},
      ]
    };
  },
  methods: {
    readUsers: async function () {
      this.users = await api.readUsers();
      await console.debug('Get users from server: ', this.users)
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

    editUser: async function(userId) {
    await this.$router.push({ name: 'CMSEditUserPage', params: { userId : userId}});
    }

  },
  mounted() {
    this.readUsers();
  },
};
</script>
