<template>
  <v-container>
    <v-card>
      <v-card-title>
        Profile
        <v-spacer/>
        <v-btn
            class="mx-2"
            fab
            dark
            small
            color="green darken-2"
            to="/profile/edit">
          <v-icon
              color="white">
            {{ this.icons.mdiAccountEdit }}
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="5">
            <v-card flat>
              <v-card-title>User info</v-card-title>
              <v-card-text>
                <v-simple-table>
                  <template v-slot:default>
                    <tbody>
                    <tr>
                      <td>Username</td>
                      <td>{{ user.username }}</td>
                    </tr>
                    <tr>
                      <td>First name</td>
                      <td>{{ user.firstName }}</td>
                    </tr>
                    <tr>
                      <td>Last name</td>
                      <td>{{ user.lastName }}</td>
                    </tr>
                    <tr>
                      <td>Gender</td>
                      <td>{{ user.gender }}</td>
                    </tr>
                    <tr>
                      <td> Email</td>
                      <td>{{ user.email }}</td>
                    </tr>
                    <tr>
                      <td> Phone</td>
                      <td> {{ user.phoneNumber }}</td>
                    </tr>
                    <tr>
                      <td> Address</td>
                      <td>{{ user.address }}</td>
                    </tr>
                    <!--    <tr>
                          <td> Reg date</td>
                          <td>{{ user.regDate }}</td>
                        </tr>-->
                    <tr>
                      <td> Birth date</td>
                      <td>{{ user.birthDate }}</td>
                    </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="7">
            <v-card flat>
              <v-card-title>Orders</v-card-title>
              <v-card-text>
                <v-data-table
                    :headers="headers"
                    :items="user.orders"
                    :single-expand="singleExpand"
                    :expanded.sync="expanded"
                    item-key="id"
                    show-expand
                    class="elevation-0">
                  <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length">
                      <v-container>
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                            <tr>
                              <th class="text-left">
                                Product
                              </th>
                              <th class="text-left">
                                Price
                              </th>
                              <th class="text-left">
                                Quantity
                              </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="product in item.products"
                                :key="product.name">
                              <td>{{ product.name }}</td>
                              <td>${{ product.price }}</td>
                              <td>{{ product.quantity }} ps</td>
                            </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-container>
                    </td>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>

import api from "@/services/user.service";
import {
  mdiAccountEdit
} from '@mdi/js'

export default {
  name: "UserProfilePage",

  data() {
    return {
      user: '',
      singleExpand: false,
      expanded: [],
      icons: {
        mdiAccountEdit
      }
    }
  },

  methods: {
    readUserProfile: async function () {

      const response = await api.readUserProfile();

      const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

      const dateTimeFormatter = new Intl.DateTimeFormat('ru-RU', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      });

      this.user = response;
      this.user.firstName = this.user.firstName == null || this.user.firstName === "" ? "-" : this.user.firstName;
      this.user.lastName = this.user.lastName == null || this.user.lastName === "" ? "-" : this.user.lastName;
      this.user.address = this.user.address == null || this.user.address === "" ? "-" : this.user.address;
      this.user.regDate = new Date(this.user.regDate).toLocaleDateString("ru-RU");

      if (this.user.birthDate == null) {
        this.user.birthDate = "-";
      } else {
        this.user.birthDate = new Date(this.user.birthDate).toLocaleDateString("ru-RU");
      }

      if (this.user.gender === "m") {
        this.user.gender = "male";
      } else if (this.user.gender === "f") {
        this.user.gender = "female";
      } else {
        this.user.gender = "-";
      }

      this.user.orders = this.user.orders.map(order => {
        order.totalPrice = currencyFormatter.format(order.totalPrice);
        order.orderDate = dateTimeFormatter.format(new Date(order.orderDate));
        return order;
      });

    }
  },

  computed: {
    headers() {
      return [
        {text: 'Order ID', align: 'start', value: 'id', width: "100px"},
        {text: 'Order Date', value: 'orderDate'},
        {text: 'Status', value: 'status'},
        {text: 'Price', value: 'totalPrice'},
        {text: '', value: 'data-table-expand'},
      ]
    },
  },

  mounted() {
    this.readUserProfile();
  }

}
</script>

