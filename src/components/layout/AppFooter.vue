<template>
  <v-card tile >
      <v-footer class="green lighten-2"
          padless

      >

    <!--    <img

            :src="require('@/assets/footerback.png')"
        />-->
        <v-container class="py-0 fill-height justify-center">
          <v-card
              flat
              tile
              class="green lighten-2 white--text text-center "

          >

            <v-card-title class="white--text pt-4 justify-center">
              VillageMarket
            </v-card-title>

            <v-card-text>
              <v-btn
                  v-for="icon in icons"
                  :key="icon"
                  class="mx-4 white--text"
                  icon
              >
                <v-icon size="18px">
                  {{ icon }}
                </v-icon>
              </v-btn>
            </v-card-text>


            <v-divider></v-divider>

            <v-card-text class="white--text">
              Copyright {{ new Date().getFullYear() }} — VillageMarket. All rights reserved
            </v-card-text>
          </v-card>
        </v-container>
      </v-footer>
  </v-card>



</template>
<script>

export default {
  name: 'c-footer',
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
      'mdi-skype',
    ],

    padless: false,


  }),
}
</script>
