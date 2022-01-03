<template>
    <router-link :to="{name: 'Home'}" class="back">
        <img src="../assets/back-arrow.svg" alt="Back" class="back__img"> Back to homepage</router-link>
    <div class="city">
      <div class="city__block">
        <div class="city__marker"><img src="../assets/marker.png" alt="marker"></div>
        <div class="city__title">4-Day Forecast &nbsp; <span>/</span> &nbsp; {{currentLocation[0].city}}, {{currentLocation[0].country}}</div>
        <div class="city__left">
          <div class="city__today">Today's Weather</div>
          <div class="city__maintemp">
            <div class="city__details">
              <div class="city__image">
                <img :src="'https://openweathermap.org/img/wn/'+currentLocation[0].weather[0].icon+'@2x.png'" alt="weather icon">
              </div>
              <div class="city__text"> {{currentLocation[0].weather[0].description}}</div>
            </div>  
            <div class="city__temp">
              <div class="city__big">{{currentLocation[0].main.temp.toFixed(0)}}&deg;</div>
              <div class="city__sub">
                <div class="city__range">
                  <div class="city__type">Min</div>
                  <div class="city__low">{{currentLocation[0].main.temp_min.toFixed(0)}}&deg;</div>
                </div>
                <div class="city__range">
                  <div class="city__type">Max</div>
                  <div class="city__low">{{currentLocation[0].main.temp_max.toFixed(0)}}&deg;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="city__right">
          <div class="city__compact" v-for="(city, index) in currentLocation.slice(1)" :key="index">
            <div class="city__l">
              <div class="city__subtitle" v-if="index === 0">Tomorrow</div>
              <div class="city__subtitle" v-else v-html="getNormalDay(city.dt)"></div>
              <div class="city__compactdesc">
                <div class="city__compactimg">
                  <img :src="'https://openweathermap.org/img/wn/'+city.weather[0].icon+'@2x.png'" alt="weather icon">
                </div>
                <div class="city__text">{{city.weather[0].description}}</div>
              </div> 
            </div>
            <div class="city__r">
              <div class="city__compactsub">
                <div class="city__range">
                  <div class="city__type">Min</div>
                  <div class="city__low">{{city.main.temp_min.toFixed(0)}}&deg;</div>
                </div>
                <div class="city__range">
                  <div class="city__type">Max</div>
                  <div class="city__low">{{city.main.temp_max.toFixed(0)}}&deg;</div>
                </div>
                <div class="city__range">
                  <div class="city__type">Humidity</div>
                  <div class="city__low">{{city.main.humidity}}<span class="little">%</span></div>
                </div>
                <div class="city__range">
                  <div class="city__type">Wind</div>
                  <div class="city__low">{{city.wind.speed.toFixed(0)}}<span class="little" v-if="index && index === 1">kmph</span><span class="little" v-else>mph</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data(){
    return{
      currentCity: ''
    }
  },
 computed: {
    currentLocation() { 
      return this.$store.getters['locationsGetter'][this.$route.params.city]; 
    }
  },
  methods:{
    getNormalDay(date) { 
      return new Date(date * 1000).toLocaleString('en-us', { weekday: 'long' })
    }
  }
}
</script>


<style scoped lang="scss">
.back{
  color:#838383;
  font-size: 20px;
  font-weight: 500;
  text-decoration: none;
  text-transform: uppercase;
  transition:0.3s;
  margin-top:45px;
  margin-left:55px;
  display: inline-block;
  &:hover{
    color:#42A5F5
  }
  @media all and (max-width: 768px){
    margin-left: 30px;
    margin-top: 30px;
  }
  &__img{
    height: 25px;
    width: 25px;
    vertical-align: top;
    color: #838383;
  }
}
.city{
  display: flex;
  justify-content: center;
  &__title{
    position: absolute;
    top:-60px;
    left:75px;
    font-size: 31px;
    color:#838383;
    span{
      color:#D0D0D0;
    }
    @media all and (max-width: 768px){
      font-size: 20px;
      top:-55px;
    }
    @media all and (max-width: 450px){
      font-size: 16px;
    }
  }
  &__marker{
    position: absolute;
    top:-65px;
    left:25px;
    &:after{
      content: '';
      position: absolute;
      top:7px;
      left:7px;
      width:13px;
      height:13px;
      border-radius:50%;
      background:white;
    }
  }
  &__block{
    box-sizing: border-box;
    background: white;
    margin-top:160px;
    box-shadow: rgba(100, 100, 111, 0.4) 0px 7px 29px 0px;
    width: 100%;
    height: 526px;
    display: flex;
    max-width: 1215px;
    position: relative;
    margin-bottom:100px;
    @media all and (max-width: 1300px){
      max-width: 1000px;
    }
    @media all and (max-width: 1024px){
      flex-direction: column;
      height: auto;
      max-width: calc(100% - 60px);
    }
    @media all and (max-width: 768px){
      margin-top: 95px;
    }
  }
  &__right{
    width:50%;
    @media all and (max-width: 1024px){
      width: 100%;
    }
  }
  &__left{
    width:calc(50% - 1px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    border-right: 1px solid #E7E7E7;
    @media all and (max-width: 1024px){
      border-right: 0;
      width: 100%;
    }
  }
  &__today{
    height:93px;
    border-bottom:1px solid #E7E7E7;
    display: flex;
    align-items: center;
    position: absolute;
    top:0;
    left:0;
    right:0;
    font-size: 26px;
    color: #42A5F5;
    font-weight: 500;
    padding-left:40px;
    @media all and (max-width: 450px){
     font-size: 20px;
     height: 50px;
    }
  }
  &__maintemp{
    display: flex;
    margin-bottom:20px;
    padding-top: 93px;
    justify-content: center;
    @media all and (max-width: 450px){
      padding-top: 50px;
    }
  }
  &__details{
    margin:20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    img{
      width: 150px;
      height: auto;
      vertical-align: top;
      @media all and (max-width: 600px){
        width: 100px;
      }
      @media all and (max-width: 450px){
        width: 70px;
      }
    }
  }
  &__low{
    font-size: 31px;
    color: #42A5F5;
    margin:0 10px;
    font-weight: 500;
  }
  &__temp{
    margin:20px;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  &__sub{
    display: flex;
    justify-content: center;
  }
  &__big{
    font-size:100px;
    font-weight: 500;
    color: #42A5F5;
    margin-bottom:5px;
    margin-left:30px;
    @media all and (max-width: 600px){
      font-size: 60px;
      margin-left: 0;
    }
  }
  &__text{
    font-size: 12px;
    color: #838383;
    text-transform: uppercase;
    text-align: center;
  }
  &__range{
    margin-top:15px;
    @media all and (max-width: 600px){
      margin-top:0;
    }
  }
  &__type{
    text-transform: uppercase;
    color: #838383;
    font-size: 11px;
    text-align: center;
  }

  &__compact{
    display: flex;
    height: 175px;
    &:nth-of-type(odd){
      background: #FBFBFB;
    }
    @media all and (max-width: 600px){
      flex-direction: column;
      justify-content: center;
      padding: 15px 0;
    }
  }
  &__l{
    width:50%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    padding-left:60px;
    box-sizing: border-box;
    @media all and (max-width: 600px){
      width: 100%;
      align-items: center;
      padding-left:0;
    }
  }
  &__r{
    width:50%;
    display: flex;
    align-items: center;
    @media all and (max-width: 600px){
      width: 100%;
      justify-content: center;
    }
  }
  &__compactsub{
    display: flex;
    .city__low{
      font-size:22px;
    }
  }
  &__subtitle{
    font-size:16px;
    margin-left:15px;
    font-weight: 500;
    color: #42A5F5;
  }
  &__compactdesc{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__compactimg img{
    max-width: 80px;
    height: auto;
  }
}
.little{
  font-size:12px;
}
</style>