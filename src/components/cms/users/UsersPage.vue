<template>
  <v-container>
    <v-card>
      <v-card-title>Users</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-alert v-if="responseError" dense text type="error">
              {{ responseErrorMessage }}
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
                :single-expand="singleExpand"
                :expanded.sync="expanded"
                item-key="username"
                show-expand            >
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
                    @click="editUser(item.id)"                >
                  mdi-pencil
                </v-icon>
                <v-icon
                    small
                    @click="removeUser(item.id)"                >
                  mdi-delete
                </v-icon>
              </template>
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  <v-container>
                    <v-row>
                      <v-col cols="5">
                        <v-simple-table>
                          <template v-slot:default>
                            <tbody>
                            <tr>
                              <td>Username</td>
                              <td>{{ item.username }}</td>
                            </tr>
                            <tr>
                              <td>First name</td>
                              <td>{{ item.firstName }}</td>
                            </tr>
                            <tr>
                              <td>Last name</td>
                              <td>{{ item.lastName }}</td>
                            </tr>
                            <tr>
                              <td>Gender</td>
                              <td>{{ item.gender }}</td>
                            </tr>
                            <tr>
                              <td>Reg date</td>
                              <td>{{ item.regDate }}</td>
                            </tr>
                            <tr>
                              <td>Birth date</td>
                              <td>{{ item.birthDate }}</td>
                            </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-col>
                      <v-col cols="7">
                        <v-simple-table>
                          <template v-slot:default>
                            <tbody>
                            <tr>
                              <td>Email</td>
                              <td>{{ item.email }}</td>
                            </tr>
                            <tr>
                              <td>Phone number</td>
                              <td>{{ item.phoneNumber }}</td>
                            </tr>
                            <tr>
                              <td>Address</td>
                              <td>{{ item.address }}</td>
                            </tr>
                            <tr>
                              <td>Roles</td>
                              <td>{{ item.roles }}</td>
                            </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-col>
                    </v-row>
                  </v-container>
                </td>
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
      expanded: [],
      singleExpand: true,
      deleteResponseSuccess: false,
      deleteResponseError: false,
      search: '',
      responseError: false,
      responseErrorMessage: "",

      headers: [
        {text: 'User ID', align: 'start', value: 'id', width: '100px',},
        {text: 'Username', value: 'username'},
        {text: 'Email', value: 'email'},
        {text: 'Roles', value: 'roles'},
        {text: 'Active', value: 'active', width: '100px', align: 'center'},
        {text: 'Actions', value: 'actions', width: '120px', align: 'center', sortable: false},
        {text: '', value: 'data-table-expand', width: '50px'},
      ]
    };
  },
  methods: {
    readUsers: async function () {

      const data = await api.readUsers();
      this.users = data.map(user => {

        user.firstName = user.firstName == null || user.firstName ==="" ? "-" : user.firstName;
        user.lastName = user.lastName == null || user.lastName ==="" ? "-" : user.lastName;
        user.address = user.address == null || user.address === "" ? "-" : user.address;

        user.regDate = new Date(user.regDate).toLocaleDateString("ru-RU");

        if (user.birthDate == null) {
          user.birthDate = "-";
        } else {
          user.birthDate = new Date(user.birthDate).toLocaleDateString("ru-RU");
        }

        if (user.gender === "m") {
          user.gender = "male";
        } else if (user.gender ==="f") {
          user.gender = "female";
        } else {
          user.gender = "-";
        }

        user.roles = user.roles.map(role => role.toLowerCase()).join(", ");


        return user;
      });
    },

    removeUser: async function (userId) {

      const response = await api.deleteUser(userId);

      if (response.error === undefined) {
        this.responseError = false;
        this.users = api.readUsers();
         await this.$router.push({path: '/cms/user'});
      } else {
        this.responseError = true;
        this.responseErrorMessage = response.errorMessage;
      }
    },

    editUser: async function (userId) {
      await this.$router.push({name: 'CMSEditUserPage', params: {userId: userId}});
    }

  },
  mounted() {
    this.readUsers();
  },
};
</script>
