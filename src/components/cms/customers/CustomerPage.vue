<template>
  <v-card flat elevation="4">

    <v-card-title>Customer №{{ customerId }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="5">
          <v-card flat>
            <v-card-title>Customer Info</v-card-title>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                  <tr>
                    <td>Username</td>
                    <td>{{ customer.username }}</td>
                  </tr>
                  <tr>
                    <td>First name</td>
                    <td>{{ customer.firstName }}</td>
                  </tr>
                  <tr>
                    <td>Last name</td>
                    <td>{{ customer.lastName }}</td>
                  </tr>
                  <tr>
                    <td> Email</td>
                    <td>{{ customer.email }}</td>
                  </tr>
                  <tr>
                    <td> Phone</td>
                    <td> {{ customer.phoneNumber }}</td>
                  </tr>
                  <tr>
                    <td> Address</td>
                    <td>{{ customer.address }}</td>
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
              <v-alert
                  v-model="alert"
                  elevation="5"
                  dismissible
                  dense
                  type="info">
                Double click on row to view order info
              </v-alert>
              <v-data-table

                  :headers="headers"
                  :items="customer.orders"
                  item-key="name"
                  class="elevation-0"
                  :search="search"
                  @dblclick:row="handleDoubleClick"
              >
                <template v-slot:top>
                  <v-text-field
                      v-model="search"
                      label="Search"
                      class="mx-3">

                  </v-text-field>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" align="center">
          <v-btn class="success mb-4" @click="$router.push({path: '/cms/customer'})">
            Back to customers
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>

import api from "@/services/cms.customer.service";

export default {
  name: "CMSCustomerPage",
  props: ['customerId'],

  data() {
    return {
      search: '',
      alert: true,
      customer: {
        id: this.customerId,
      },

    };
  },

  computed: {
    headers() {
      return [
        {text: 'Order ID', align: 'start', value: 'id'},
        {text: 'Order Date', value: 'orderDate'},
        {text: 'Status', value: 'status'},
        {text: 'Price', value: 'totalPrice'},
      ]
    },
  },

  methods: {
    readCustomer: async function () {
      const response = await api.readCustomer(this.customerId)
      console.debug('Get customer from server: ', response);

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
      })

      this.customer = response;

      this.customer.orders = this.customer.orders.map(order => {
        order.totalPrice = currencyFormatter.format(order.totalPrice);
        order.orderDate = dateTimeFormatter.format(new Date(order.orderDate));

        return order;
      });
    },

    handleDoubleClick(event, {item}) {
      console.debug('Row selected: ', item);
      this.$router.push({name: 'CMSOrderPage', params: {orderId: item.id}})
    },
  },

  mounted() {
    this.readCustomer()
  },
}
</script>

