<template>
  <v-card tile elevation="4">
    <v-footer class="success"
              color="green darken-2">
      <v-container class="py-0 fill-height justify-center" fluid>
        <v-card
            flat
            tile
            class="success white--text text-center"
            color="green darken-2">
          <v-card-title class="white--text pt-4 justify-center">
            VillageMarket
          </v-card-title>
          <v-card-text>
            <v-btn
                v-for="icon in icons"
                :key="icon"
                class="mx-4 white--text"
                icon>
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
