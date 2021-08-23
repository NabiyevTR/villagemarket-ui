<template>
  <v-card flat elevation="4">
    <v-card-title>Order №{{ orderId }}</v-card-title>
    <v-card-text>


      <v-row>
        <v-col cols="6">
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <p class="font-weight-black">
                Customer info
              </p>
              <tr>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Username</td>
                <td>{{ order.username }}</td>
              </tr>
              <tr>
                <td>First name</td>
                <td>{{ order.firstName }}</td>
              </tr>
              <tr>
                <td>Last name</td>
                <td>{{ order.lastName }}</td>
              </tr>
              <tr>
                <td> Email</td>
                <td>{{ order.email }}</td>
              </tr>
              <tr>
                <td> Phone</td>
                <td> {{ order.phoneNumber }}</td>
              </tr>
              <tr>
                <td> Address</td>
                <td>{{ order.address }}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-col cols="6">
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <p class="font-weight-black">
                Ordered products
              </p>
              <tr>
                <th class="text-left">
                  Product name
                </th>
                <th class="text-center">
                  Price
                </th>
                <th class="text-center">
                  Quantity
                </th>

              </tr>
              </thead>
              <tbody>
              <tr v-for="product in order.products" :key="product.id">
                <td>{{ product.name }}</td>
                <td class="text-center" width="20%">{{ product.price }}</td>
                <td class="text-center" width="20%">{{ product.quantity }} ps</td>
              </tr>
              </tbody>
              <tfoot>
              <span class="font-weight-medium">Total: {{ order.totalPrice }}</span>
              </tfoot>
            </template>
          </v-simple-table>

          <v-simple-table class="pt-10">
            <template v-slot:default>

              <thead>
              <p class="font-weight-black">
                Order history
              </p>
              <tr>
                <th class="text-left">
                  Status
                </th>
                <th class="text-center">
                  Date
                </th>
                <th class="text-center">
                  Time
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="historyItem in order.history" :key="historyItem.id">
                <td>{{ historyItem.status }}</td>
                <td class="text-center" width="20%">{{ (new Date(historyItem.date)).toLocaleDateString("ru-RU") }}</td>
                <td class="text-center" width="20%">{{ (new Date(historyItem.date)).toLocaleTimeString("ru-RU") }}</td>
              </tr>
              </tbody>

            </template>
          </v-simple-table>

          <v-container>
            <v-row>

              <v-col cols="6">

                <v-select
                    v-model="this.order.status"
                    :items="statusItems"
                    item-text="status"
                    label="Order status"
                    @change="checkStatusChange"
                ></v-select>
              </v-col>
              <v-col align-self="center">
                <v-btn class="success" v-show="isStatusChanged" @click="updateStatus">
                  Submit
                </v-btn>
              </v-col>
            </v-row>
          </v-container>

        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" align="center">
          <v-btn class="success mb-4" @click="$router.push({path: '/cms/order'})">
            Back to orders
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import api from "@/services/cms.order.service";


export default {
  name: "CMSOrderPage",
  props: ['orderId'],




  data() {
    return {


      order: {
        id: this.orderId,
      },


      newStatus: "",

      statusItems: [
        {status: 'Cancelled'},
        {status: 'Located'},
        {status: 'Confirmed'},
        {status: 'Assembling'},
        {status: 'Awaiting delivery'},
        {status: 'Delivery'},
        {status: 'Delivered'},
        {status: 'Closed'}
      ],

      isStatusChanged: false,

    };
  },



  methods: {
    readOrder: async function () {
      const data = await api.readOrder(this.orderId);

      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

      this.order = data;
      this.order.totalPrice = formatter.format(this.order.totalPrice);
      this.order.poducts = this.order.products.map(product => {
        product.price = formatter.format(product.price);
        return product
      })
      this.newStatus = this.order.status;

    },

    checkStatusChange(status) {
      this.newStatus = status;
      this.isStatusChanged = this.order.status !== this.newStatus;
    },

    updateStatus: async function () {

      const request = {
        orderId: this.order.id,
        status: this.newStatus
      }

      const response = await api.updateOrderStatus(this.order.id, request);
      this.order.status = response.status;
      this.order.history = response.history;
      this.isStatusChanged = this.order.status !== this.newStatus;
    }
  },

  mounted() {
    this.readOrder()
  },
}
</script>

