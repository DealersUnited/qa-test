<template>
    <div class="card">
      <div class="card__header">
        <div class="card__marker">
          <div class="card__image">
            <img src="../assets/marker.png" alt="marker">
          </div>
        </div>
        <div class="card__title">{{city}}, {{country}}</div>
      </div>
      <div class="card__block">
        <div class="card__desc">Currently</div>
        <div class="card__container">
          <div class="card__details">
            <div class="card__image">
              <img :src="'https://openweathermap.org/img/wn/'+todayImg+'@2x.png'" alt="weather icon">
            </div>
            <div class="card__text">{{todayDesc}}</div>
          </div>  
          <div class="card__temp">
            <div class="card__big">{{todayTemp}}&deg;</div>
            <div class="card__sub">
              <div class="card__range">
                <div class="card__type">Min</div>
                <div class="card__low">{{todayMin}}&deg;</div>
              </div>
              <div class="card__range">
                <div class="card__type">Max</div>
                <div class="card__low">{{todayMax}}&deg;</div>
              </div>
            </div>
          </div>
        </div> 
      </div>
      <div class="card__block tomorrow">
        <div class="card__desc">Tomorrow's Forcast</div>
        <div class="card__container">
          <div class="card__details">
            <div class="card__image">
              <img :src="'https://openweathermap.org/img/wn/'+tomorrowImg+'@2x.png'" alt="weather icon">
            </div>
            <div class="card__text">{{tomorrowDesc}}</div>
          </div>  
          <div class="card__temp">
            <div class="card__big">{{tomorrowTemp}}&deg;</div>
            <div class="card__sub">
              <div class="card__range">
                <div class="card__type">Min</div>
                <div class="card__low">{{tomorrowMin}}&deg;</div>
              </div>
              <div class="card__range">
                <div class="card__type">Max</div>
                <div class="card__low">{{tomorrowMin}}&deg;</div>
              </div>
            </div>
          </div>
        </div> 
      </div>
      <router-link :to="`/location/${city}`" class="card__link">View 4-day Forecast</router-link>
    </div>
</template>

<script>
export default {
  name: 'LocationCard',
  props: [
    'city', 
    'country', 
    'todayImg', 
    'todayDesc', 
    'todayTemp', 
    'todayMax', 
    'todayMin', 
    'tomorrowImg', 
    'tomorrowDesc', 
    'tomorrowTemp', 
    'tomorrowMax', 
    'tomorrowMin' 
    ]
  }
</script>

<style scoped lang="scss">
.card{
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: inline-block;
  width: 30%;
  margin:1.5%;
  &__header{
    height: 92px;
    display: flex;
    border-bottom: 1px solid #E7E7E7;
    @media all and (max-width: 1024px){
      height: 60px;
    }
  }
  &__marker{
    width: 87px;
    display:flex;
    align-items: center;
    justify-content: center;
    @media all and (max-width: 1024px){
      width: 60px;
    }
  }
  &__image{
    position: relative;
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
  &__title{
    font-size: 26px;
    font-weight: 500;
    color: #838383;
    padding: 0 30px;
    display: flex;
    align-items: center;
    border-left: 1px solid #E7E7E7;
    @media all and (max-width: 1024px){
      font-size: 18px;
      padding: 0 15px;
    }
  }
  &__block{
    padding:28px 25px;
    @media all and (max-width: 1024px){
      padding:15px;
    }
  }
  &__desc{
    text-align: left;
    font-size: 18px;
    color: #42A5F5;
    margin-bottom:20px;
    @media all and (max-width: 1024px){
      font-size: 14px;
    }
  }
  &__container{
    display: flex;
    margin-bottom:20px;
  }
  &__details{
    width: 50%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    img{
      max-width: 80px;
      height: auto;
      @media all and (max-width: 1024px){
        max-width: 50px;
      }
    }
  }
  &__temp{
    width: 50%;
    text-align: center;
  }
  &__sub{
    display: flex;
    justify-content: center;
  }
  &__big{
    font-size: 54px;
    color: #42A5F5;
    margin-bottom:5px;
    @media all and (max-width: 1024px){
      font-size: 40px;
    }
  }
  &__text{
    font-size: 12px;
    color: #838383;
    text-transform: uppercase;
    text-align: center;
    @media all and (max-width: 1024px){
      font-size: 10px;
    }
  }
  &__range{
    margin-top:5px;
  }
  &__type{
    text-transform: uppercase;
    color: #838383;
    font-size: 11px;
  }
  &__low{
    font-size: 22px;
    color: #42A5F5;
    margin:0 10px;
    @media all and (max-width: 1024px){
      font-size: 14px;
    }
  }
  &__link{
    display: block;
    background:#42A5F5;
    color: white;
    text-decoration: none;
    height: 75px;
    display: flex;
    text-align:center;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
    text-transform: uppercase;
    transition: 0.3s;
    &:hover{
      background:#00D4BE;
    }
    @media all and (max-width: 1024px){
      height:50px;
      font-size: 16px;
    }
  }
  @media all and (max-width: 768px){
    width: 47%;
  }
  @media all and (max-width: 550px){
    width: 100%;
    margin:0 0 30px 0;
  }
}
.tomorrow{
  background:#FBFBFB;
}
</style>
