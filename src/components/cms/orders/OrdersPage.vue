<template>
    <v-card flat>
      <v-card-title>Orders</v-card-title>
      <v-card-text>
        <v-data-table

            :headers="headers"
            :items="orders"
            item-key="name"
            class="elevation-1"
            :search="search"
            @click:row="handleClick"
            @dblclick:row="handleDoubleClick"

        >
          <template v-slot:top >
            <v-text-field
                v-model="search"
                label="Search"
                class="mx-3"

            ></v-text-field>
          </template>


        </v-data-table>
      </v-card-text>
    </v-card>



</template>


<script>

import api from "@/services/cms.order.service";

export default {
  data() {
    return {
      orders: [],
      search: '',

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
        const data = await api.readOrders();
        console.debug("Orders from server: ", data)
        this.orders = data.map((item) => {
          return {
            id: item.id,
            username: item.username,
            status: item.status,
            orderDate: this.convertDateTime(item.orderDate),
            deliveryDate: this.convertDateTime(item.deliveryDate),
            totalPrice: item.totalPrice
          }
        });
      } catch (e) {
        console.warn(e)
      }
    },

    convertDateTime: function(orderDate) {
        let date = new Date(orderDate);
                return date.toLocaleString("ru-RU");

    },

    handleClick(item) {
      console.debug('Row selected: ', item);


    },


    handleDoubleClick(event, {item}) {
      console.debug('Row selected: ', item);
      this.$router.push({ name: 'CMSOrderPage', params: { orderId: item.id } })

    },



  },

  mounted() {

    this.readOrders();

  }
}
</script>