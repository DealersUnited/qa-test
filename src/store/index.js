import { createStore } from 'vuex';

const API_KEY = 'dade1a930ac1e6120813f818d8d7b8fa'

export default createStore({
  state: {
    locations: {},
    errors: ''
  },
  mutations: {
    setCityMutation(state, payload){
      Object.assign(state.locations, payload);
    },
    setErrorMutation(state, payload){
      state.errors = payload;
    }
  },
  actions: {
    async setCityAction(context, payload) {
      try{
        const forecastResult = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${payload}&units=imperial&appid=${API_KEY}`);
        if(!forecastResult.ok) throw new Error ('Problems with getting forecast data. Please try again')
        const forecast = await forecastResult.json();
        const details = forecast.list;
        const days = [];
        const city = { [forecast.city.name]: days }
        for (const [i, detail] of details.entries()) {
          if (i % 8 === 0 && days.length < 4 ){
            console.log(i)
            Object.assign(detail, {
              country: forecast.city.country,
              city: forecast.city.name
            });
            days.push(detail);
          } 
        }
        context.commit('setCityMutation', city);
      } catch (err){
        console.log('Oops... we have error: ' + err)
        context.commit('setErrorMutation', err);
      }
    },
  },
  getters: {
    locationsGetter(state) {
      return state.locations;
    },
    errorsGetter(state) {
      return state.errors;
    },
  }
})
