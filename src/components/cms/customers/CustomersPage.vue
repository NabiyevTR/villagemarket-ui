<template>
  <v-container>
    <v-card flat elevation="4">
      <v-card-title>Customers</v-card-title>
      <v-card-text>
        <v-alert
            v-model="alert"
            elevation="5"
            dismissible
            dense
            type="info"
        >
          Double click on row to view customer info
        </v-alert>
        <v-data-table
            :headers="headers"
            :items="customers"
            item-key="name"
            class="elevation-0"
            :search="search"
            @click:row="handleClick"
            @dblclick:row="handleDoubleClick"
        >
          <template v-slot:top>
            <v-text-field
                v-model="search"
                label="Search"
                class="mx-3"></v-text-field>
          </template>

          <template v-slot:item.isActive ="{ item }">
            <v-simple-checkbox
                v-model="item.isActive"
                disabled
            ></v-simple-checkbox>
          </template>


        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>

import api from "@/services/cms.customer.service";

export default {
  data() {
    return {
      alert: true,
      customers: [],
      search: '',

    }
  },
  computed: {
    headers() {
      return [
        {text: 'Customer ID', align: 'start', value: 'id'},
        {text: 'Username', value: 'username'},
        {text: 'Reg date', value: 'regDate'},
        {text: 'Active', value: 'isActive'},
        {text: 'Total orders', value: 'totalOrders'},
        {text: 'Total price', value: 'totalPrice'},
      ]
    },


  },
  methods: {
    readCustomers: async function () {
      try {
        const data = await api.readCustomers()

        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        });

        console.debug("Customers from server: ", data);
        this.customers = data.map((item) => {
          return {
            id: item.id,
            username: item.username,
            regDate: this.convertDateTime(item.regDate),
            isActive: !item.blocked,
            totalOrders: item.totalOrders,
            totalPrice: formatter.format(item.totalPrice),
          }
        });
      } catch (e) {
        console.warn('Error during loading customer data: ', e)
      }
    },

    convertDateTime: function (orderDate) {
      let date = new Date(orderDate);
      return date.toLocaleString("ru-RU");

    },

    handleClick(item) {
      console.debug('Row selected: ', item);
    },

    handleDoubleClick(event, {item}) {
      console.debug('Row selected: ', item);
      this.$router.push({name: 'CMSCustomerPage', params: {customerId: item.id}})
    },
  },

  mounted() {
    this.readCustomers();
  }
}
</script>