<template>
  <v-container>
    <div class="about" id="about">
      <div class="container">
        <div class="row">
          <div class="col-md-10 offset-md-1 col-lg-5 offset-lg-1">
            <div class="about__img">
              <img src="../../images/about.jpg" alt="про компанию" />
            </div>
          </div>
          <div
            class="
              col-md-10
              offset-md-1 offset-lg-0
              col-lg-6 col-xl-5
              offset-xl-1
            "
          >
            <h1 class="title underlined">About company</h1>
            <div class="about__text">
              Our company has been using automated for more than ten years
              technology growing fresh vegetables and fruits in completely
              Controlled Environment managed using IT IFARM GROWTUNE system
              <br />
              <br />
              In a closed microclimate of the city farm, ideal conditions are
              created for the effective growth of delicious and beneficial
              plants.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="specialists" id="specialists">
      <div class="container">
        <div class="title">Our team</div>
        <div class="row">
          <div class="col-lg-10 offset-lg-1">
            <img
              class="specialists__img"
              src="../../images/team.jpg"
              alt="our team"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="aboutus" id="aboutus">
      <div class="container">
        <h1 class="title aboutus__title">our history</h1>
        <div class="row">
          <div class="col-lg-6">
            <div class="subtitle">About our company</div>
            <div class="aboutus__text">
              We are a team of experienced agrotechnologists, agro-chemicals,
              engineers, scientists and business professionals working together
              to create a cost-effective and sustainable system for year-round
              cultivation of edible plants on vertical farms.
            </div>
          </div>
          <div class="col-lg-6">
            <img
              class="aboutus__img"
              src="../../images/about_1.jpg"
              alt="aboutUs"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-lg-6">
            <img
              class="aboutus__img"
              src="../../images/about_3.jpg"
              alt="aboutUs"
            />
          </div>
          <div class="col-lg-6">
            <div class="subtitle">
              The most important thing for us is the quality
            </div>
            <div class="aboutus__text">
              In a closed microclimate of the city farm, ideal conditions are
              created for the effective growth of delicious and beneficial
              plants.
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-6">
            <div class="subtitle">Modern it technologies</div>
            <div class="aboutus__text">
              СITI Farm IFARM is an automated technology of growing fresh
              salads, berries and vegetables on multiple tiers in a fully
              controlled environment that is controlled using IT-system IFARM
              GROWTUNE.
              <br />
              <br />
              The vertical farm is the sum of the achievements of IT
              technologies, engineering solutions, agricultural engineering and
              crop production.And the excellent opportunity to grow greens,
              berry, vegetables and edible flowers with a guaranteed yield at
              any point of the globe.
            </div>
          </div>
          <div class="col-lg-6">
            <img
              class="aboutus__img"
              src="../../images/about_2.jpg"
              alt="aboutUs"
            />
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "AboutUsPage",
};
</script>

<style scoped>
.about {
  padding-top: 70px;
}
.about__img img {
  width: 100%;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-shadow: 5px 5px 25px #c4c4c4;
  box-shadow: 5px 5px 25px #c4c4c4;
}
.about__text {
  margin-top: 24px;
  font-weight: 400;
  line-height: 22px;
  font-size: 16px;
  letter-spacing: 0.4px;
  color: #484848;
}

.title {
  font-size: 30px;
  color: rgb(72, 112, 72);
  font-weight: 700;
  text-transform: uppercase;
}

.container,
.container-fluid {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.row {
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -ms-flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.specialists {
  padding-top: 70px;
  position: relative;
}

.specialists .title {
  text-align: center;
}

.specialists__img {
  margin-top: 60px;
  width: 100%;
  -webkit-border-radius: 8px;
  border-radius: 8px;
  -webkit-box-shadow: 5px 5px 25px #c4c4c4;
  box-shadow: 5px 5px 25px #c4c4c4;
  margin-bottom: 60px;
}

.subtitle {
  font-size: 18px;
  color: rgb(72, 112, 72);
  font-weight: 700;
  text-transform: uppercase;
}

.aboutus__text {
  line-height: 22px;
  font-size: 18px;
  margin-top: 25px;
}

.aboutus__img {
  width: 100%;
  -webkit-filter: drop-shadow(5px 5px 25px #c4c4c4);
  filter: drop-shadow(5px 5px 25px #c4c4c4);
  -webkit-border-radius: 4px;
  border-radius: 4px;
}

.aboutus__title {
  text-align: center;
  margin-bottom: 60px;
}
</style>