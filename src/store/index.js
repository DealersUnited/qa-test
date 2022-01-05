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
      console.log(payload)
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
        
        forecast.list.forEach(oneEightOfADay => {
          let splitTime = oneEightOfADay.dt_txt.split(" ")
          splitTime[0];
          
          oneEightOfADay.txtDay = splitTime[0];
        })

        function groupBy(list, keyGetter) {
          const map = new Map();
          list.forEach((item) => {
               const key = keyGetter(item);
               const collection = map.get(key);
               if (!collection) {
                   map.set(key, [item]);
               } else {
                   collection.push(item);
               }
          });
          return map;
        }
        
        let groupedDays = groupBy(forecast.list, forecastDay => forecastDay.txtDay)
        
        groupedDays.forEach(day => {
          day.minTemp = 1000;
          day.maxTemp = 0;
          day.forEach(threeHours => {
            if (day.minTemp > threeHours.main.temp_min) {
              day.minTemp = threeHours.main.temp_min
            } 
            
            if (day.maxTemp < threeHours.main.temp_max) {
              day.maxTemp = threeHours.main.temp_max
            }
          })
        })

        const details = forecast.list;
        const days = [];
        const city = { [forecast.city.name]: days }
        for (const [i, detail] of details.entries()) {
          if (i % 8 === 0 && days.length < 4 ){
            let dayMinTemp = 0;
            let dayMaxTemp = 0;
            groupedDays.forEach(groupedDay => {
              if (groupedDay[0].txtDay == detail.txtDay) {
                dayMinTemp = groupedDay.minTemp
                dayMaxTemp = groupedDay.maxTemp
              }
            });
            Object.assign(detail, {
              country: forecast.city.country,
              city: forecast.city.name,
              minTemp: dayMinTemp,
              maxTemp: dayMaxTemp
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
