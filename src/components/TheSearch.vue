<template>
  <div class="search">
    <div class="search__container">
      <div class="search__desc">Search for a location (e.g. London, Paris, Tokyo, etc.)</div>
      <input type="text" v-model="city" placeholder="Enter city" class="search__field" @keypress.enter="setCity" @input="error = ''">
      <button class="search__button" @click="setCity" type="button" v-if="!isPending">Add Location</button>
      <button class="search__button" type="button" v-else>Wait...</button>
    </div>
  </div>
  <div v-if="error" class="error">{{error}}</div>
  <div ref="scrollPos"></div>
</template>

<script>
export default {
  name: 'TheSearch',
  data(){
    return{
      isPending: false,
      city: '',
      error: ''
    }
  },
  computed: {
    errors() { 
      return this.$store.getters['errorsGetter']; 
    }
  },
  watch: {
    errors(){
      this.error = this.$store.getters['errorsGetter'];
    }
  },
  methods:{
    async setCity(){
      if (this.city === '') {
        this.error = 'Please enter the country!';
        return;
      }
      this.isPending = true;
      await this.$store.dispatch('setCityAction', this.city);
      this.isPending = false;
      this.city = '';
      let scrollPos = this.$refs.scrollPos;
      window.scrollTo({
        top: scrollPos.offsetTop,
        behavior: "smooth"
      });
    }
  }
}
</script>
 
<style scoped lang="scss">
button,
input { 
  overflow: visible;
}
button { 
  text-transform: none;
  -webkit-appearance: button;
}
.error{
  color: red;
  font-size: 16px;
  margin-top:15px;
  font-weight: 600;
  text-align: center;
  @media all and (max-width: 1024px){
    font-size: 11px;
    padding:0 15px;
  }
}
.search{
  margin-top:140px;
  display: flex;
  justify-content: center;
   
  &__container{
    display: inline-block;
    position: relative;
    display: flex;
  }
  &__desc{
    font-size: 20px;
    color:#353535;
    position: absolute;
    top:-40px;
    left:30px;
    @media all and (max-width: 1024px){
      left:15px;
      font-size: 16px;
      top:-30px;
    }
    @media all and (max-width: 600px){
      font-size: 12px;
      left:0;
    }
  }
  &__field{
    font-family: 'Open Sans', sans-serif;
    height: 76px;
    width: 589px;
    box-sizing: border-box;
    border: 1px solid #979797;
    padding-left:30px;
    font-size: 20px;
    margin-right:15px;
    &:focus{
      outline: none;
    }
    &::placeholder{
      color: #838383
    }
    @media all and (max-width: 1024px){
      width: 280px;
      height: 55px;
      padding-left:15px;
    }
    @media all and (max-width: 500px){
      width: 180px;
      font-size: 16px;
      margin-right: 0;
    }
  }
  &__button{
    font-family: 'Open Sans', sans-serif;
    text-transform: uppercase;
    width: 223px;
    height: 76px;
    outline: none;
    border: 0;
    background: #42A5F5;
    color:white;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
    &:hover{
      background:#00D4BE;
    }
    @media all and (max-width: 1024px){
      height: 55px;
      font-size: 16px;
      width: 160px;
    }
    @media all and (max-width: 500px){
      width: 120px;
      font-size: 11px;
    }
  }
  @media all and (max-width: 1024px){
    margin-top: 80px;
  }
}
</style>
