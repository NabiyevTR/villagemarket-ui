<template>

  <v-app id="inspire">

    <c-app-bar>
      <!-- -->
    </c-app-bar>


    <!-- Main content -->


    <v-main class="grey lighten-3">



        <v-container>
          <v-row>
            <v-col>
              <v-sheet min-height="70vh" rounded="lg">
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

import CFooter from "@/components/layout/AppFooter";
import CAppBar from "@/components/layout/AppBar";


export default {
  name: 'App',

  components: {CAppBar, CFooter},

  data: () => ({
    //
  })
};


</script>
