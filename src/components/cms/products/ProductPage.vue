<template>
  <v-card flat elevation="4">
    <v-card-title>{{ product.name }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="5">
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <p class="font-weight-black">
                Product info
              </p>
              </thead>
              <tbody>
              <tr>
                <td>Id</td>
                <td>{{ product.id }}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>{{ product.name }}</td>
              </tr>
              <tr>
                <td>Available for sale</td>
                <td>{{ product.availableForSale }}</td>
              </tr>
              <tr>
                <td>Current price</td>
                <td>{{ product.price }}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-col cols="2">

        </v-col>
        <v-col cols="4">
          <v-img
              :src=product.imgLink
              contain
              max-height="250">
          </v-img>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-sheet class="ma-4">


            <v-card height="400px" elevation="0" v-if="!loaded">
              <v-layout align-center justify-center column fill-height>
                <v-flex row align-center>
                  <v-progress-circular
                      class="text-center justify-center"
                      :size="50"
                      color="success"
                      indeterminate
                  ></v-progress-circular>
                </v-flex>
              </v-layout>
            </v-card>
            <BarChart
                v-if="loaded"
                :chartdata="chartdata"
                :options="chartOptions"/>
          </v-sheet>
        </v-col>

      </v-row>

      <v-sheet class="ma-4" align="center">
        <v-btn color="success" to='/cms/product'>
          Back to products
        </v-btn>
      </v-sheet>
    </v-card-text>
  </v-card>

</template>

<script>

import api from "@/services/cms.product.service";
import BarChart from "@/components/charts/BarChart";


export default {

  name: "ProductPage",
  props: ['productId'],

  components: {
    BarChart
  },


  data() {
    return {
      loaded: false,
      chartdata: null,
      labels: [],
      values: [],

      product: {
        id: this.productId,
      },

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }
  },

  methods: {
    readProduct: async function () {
      const data = await api.readProduct(this.productId);
      this.product = data;
    },

    readProductLastMonthSales: async function () {
      const data = await api.readProductLastMonthSales(this.productId);
      await console.debug('Product last month sales from server: ', data);


      let sales = Object.entries(data.lastMonthSales).map(([key, value]) => ({key, value}));
      sales.forEach(e => {
        this.labels.push(e.key);
        this.values.push(parseFloat(e.value).toFixed(2));
      })
      this.fillData();
      this.loaded = true;
    },

    fillData() {
      this.chartdata = {
        labels: this.labels,
        datasets: [
          {
            label: 'Sales in last month, $',
            backgroundColor: '#52a54c',
            data: this.values
          },
        ]
      }
    },
  },
  mounted() {
    this.readProduct();
    this.readProductLastMonthSales();
  }
}
</script>
