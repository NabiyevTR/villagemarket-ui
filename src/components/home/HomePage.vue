<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col>
        <v-carousel
            cycle
            height="600"
            hide-delimiter-background
            show-arrows-on-hover        >
          <v-carousel-item
              v-for="(item,i) in items"
              :key="i"
              :src="item.src"
              reverse-transition="fade-transition"          >
            <v-row
                class="fill-height"
                align="center"
                justify="center"           >
              <div class="caruselInfo">
                {{ item.text }}
              </div>
            </v-row>
          </v-carousel-item>
        </v-carousel>
        <v-sheet align="center" class="grey lighten-5 ma-7">
          <v-btn
              class="success"
              @click="$router.push({path: '/product'})">
            Start shopping
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

export default {
  name: "HomePage",

  data() {
    return {
      items: [
        {
          src: 'http://bimel.ru/content/vm/website/home/1.jpg',
          text: 'Always fresh'
        },
        {
          src: 'http://bimel.ru/content/vm/website/home/2.jpg',
          text: 'Healthy nutrition'
        },
        {
          src: 'http://bimel.ru/content/vm/website/home/3.jpg',
          text: 'Local supplier'
        },

      ],
    }
  },

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Merienda&display=swap');

.caruselInfo{
  font-family: "Merienda", Helvetica, Arial;
  color: white;
  font-size: 90px;
  font-weight: bold;
}
</style>