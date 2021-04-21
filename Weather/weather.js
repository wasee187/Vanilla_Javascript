class Weather{
    constructor(city,country){
        this.city = city;
        this.country = country;
        this.APPId = 'eff028cd522116d02e73993524d4308b';
    }
    async getWeather(){
       const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&appid=${this.APPId}&units=metric`).then(data=> data.json());
       
       return{
           main_data : response.main,
           overall_data : response.weather[0],
           cityName : response.name,
       }
    }
    setLocation(city,country){
        this.city = city;
        this.country = country;
    }
}//hendle weather related data. 