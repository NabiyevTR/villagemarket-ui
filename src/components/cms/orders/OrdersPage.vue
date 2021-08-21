<template>
  <v-container>
    <v-card flat elevation="4">
      <v-card-title>Orders
        <v-spacer></v-spacer>

        <v-switch flat
                  v-model="onlyActiveOrders"
                  label="Only active orders"
                  color="success"
                  inset
                  @change="readOrders">

        </v-switch>
      </v-card-title>

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
            :items="orders"
            item-key="name"
            class="elevation-0"
            :search="search"
            @dblclick:row="handleDoubleClick">
          <template v-slot:top>
            <v-text-field
                v-model="search"
                label="Search"
                class="mx-3"
            ></v-text-field>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>


<script>

import api from "@/services/cms.order.service";

export default {
  data() {
    return {
      alert: true,
      orders: [],
      search: '',
      onlyActiveOrders: true,
    }
  },

  computed: {
    headers() {
      return [
        {text: 'Order ID', align: 'start', value: 'id'},
        {text: 'Username', value: 'username'},
        {text: 'Status', value: 'status'},
        {text: 'Order Date', value: 'orderDate'},
        {text: 'Delivery Date', value: 'deliveryDate'},
        {text: 'Total price', value: 'totalPrice'},

      ]
    },
  },

  methods: {
    readOrders: async function () {
      try {
        let data;
        if (this.onlyActiveOrders) {
          data = await api.readActiveOrders();
        } else {
          data = await api.readOrders();
        }
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        });

        this.orders = data.map((item) => {
          return {
            id: item.id,
            username: item.username,
            status: item.status,
            orderDate: this.convertDateTime(item.orderDate),
            deliveryDate: this.convertDateTime(item.deliveryDate),
            totalPrice: formatter.format(item.totalPrice),
          }
        });
      } catch (e) {
        console.warn(e)
      }
    },

    convertDateTime: function (orderDate) {
      let date = new Date(orderDate);
      return date.toLocaleString("ru-RU");
    },

    handleDoubleClick(event, {item}) {
      this.$router.push({name: 'CMSOrderPage', params: {orderId: item.id}})
    },
  },

  mounted() {
    this.readOrders();
  }
}
</script>