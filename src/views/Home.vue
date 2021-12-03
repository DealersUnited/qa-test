<template>
  <the-search></the-search>
  <div class="locations">
    <div class="locations__title" v-if="Object.keys(locations).length !== 0">Your Locations</div>
    <location-card v-for="(location, index) of locations" 
      :key="index"
      :city="location[0].city"
      :country="location[0].country"
      :todayImg="location[0].weather[0].icon"
      :todayDesc="location[0].weather[0].description"
      :todayTemp="location[0].main.temp.toFixed(0)"
      :todayMin="location[0].main.temp_min.toFixed(0)"
      :todayMax="location[0].main.temp_max.toFixed(0)"
      :tomorrowImg="location[1].weather[0].icon"
      :tomorrowDesc="location[1].weather[0].description"
      :tomorrowTemp="location[1].main.temp.toFixed(0)"
      :tomorrowMin="location[1].main.temp_min.toFixed(0)"
      :tomorrowMax="location[1].main.temp_max.toFixed(0)"
    ></location-card>
  </div>
</template>

<script>
import TheSearch from '@/components/TheSearch.vue'
import LocationCard from '@/components/LocationCard.vue'

export default {
  name: 'Home',
  components: {
    TheSearch,
    LocationCard
  },
  computed: {
    locations() { 
      return this.$store.getters['locationsGetter']; 
    }
  }
}
</script>

<style scoped lang="scss">
.locations{
  padding: 75px 130px;
  min-height: 23vh;
  &__title{
    padding:0 75px;
    font-size: 40px;
    font-weight: 500;
    color: #42A5F5;
    margin-bottom: 30px;
    @media all and (max-width: 1024px){
      margin-top:20px;
      padding:0 25px;
      font-size: 24px;
    }
    @media all and (max-width: 1024px){
      padding: 0;
    }
  }
  @media all and (max-width: 1024px){
    padding: 25px 30px;
  }
}
</style>


