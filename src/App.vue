<template>

  <v-app id="inspire" >

    <c-app-bar>
      <!-- -->
    </c-app-bar>


    <!-- Main content -->


    <v-main class="grey lighten-5">

        <v-container  class="grey lighten-5">
          <v-row>
            <v-col align="center">
              <v-sheet min-height="70vh"
                       rounded="lg"
                       max-width="1200"
                       min-width="1000"
                       align="left"
                       class="grey lighten-5">
                <!--  -->
                <router-view></router-view>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>

   <!--     <v-container fluid class="pa-0">
          <v-img
              :src="require('@/assets/welcome-bg.jpg')"
              :height="bgHeight"
          >
          <v-parallax
              dark
              :src="require('@/assets/welcome-bg.jpg')"
          >
          <v-sheet min-height="70vh"

                   >
            <router-view></router-view>
          </v-sheet>
          </v-img>
          </v-parallax>
        </v-container>
      color="transparent"
      class="overflow-y-auto"-->

    </v-main>

    <c-footer >
      <!-- -->
    </c-footer>




  </v-app>



</template>



<script>

import CFooter from "@/components/footer/AppFooter";
import CAppBar from "@/components/header/AppBar";


export default {
  name: 'App',

  components: {CAppBar, CFooter},

  watch: {
    '$route':{
      // eslint-disable-next-line no-unused-vars
      handler: (to, from) => {
        document.title = to.meta.title || 'Your Website'
      },
      immediate: true
    }
  },


  data: () => ({
    //
  })
};


</script>
