<template>
  
    <v-app id="inspire">
      <c-app-bar />

      <!-- Main content -->
      <v-main class="grey lighten-5">
        <v-container class="grey lighten-5">
          <v-row>
            <v-col align="center">
              <v-sheet
                min-height="70vh"
                rounded="lg"
                max-width="1200"
                min-width="1000"
                align="left"
                class="grey lighten-5"
              >
                <!--  -->
                <router-view></router-view>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <c-footer />
    </v-app>
  
</template>
<script>
import CFooter from "@/components/footer/AppFooter";
import CAppBar from "@/components/header/AppBar";

export default {
  name: "App",

  components: { CAppBar, CFooter },

  watch: {
    $route: {
      // eslint-disable-next-line no-unused-vars
      handler: (to, from) => {
        document.title = to.meta.title || "Your Website";
      },
      immediate: true,
    },
  },

  data: () => ({
    //
  }),
};
</script>
