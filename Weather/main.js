//Api calling data
//api.openweathermap.org/data/2.5/weather?q=London,uk&appid=eff028cd522116d02e73993524d4308b&units=metric

//instantiate store
const store = new Store();
//Instantiate ui class
const ui = new Ui;
//Instantiate weather class
const {city,country} = store.getLocation();
const weather = new Weather(city,country);
//Instantiate weather and ui class
document.addEventListener('DOMContentLoaded',weatherData);
document.getElementById('w-form')
    .addEventListener('submit', (e)=>{
        e.preventDefault();
        const city = document.getElementById('city').value;
        const country = document.getElementById('country').value;
        
        if(city ==='' || country === ''){
            ui.setMessage('Please provide necessary information');
        }else{  
            weather.setLocation(city,country);
            store.setLocation(city,country);
            ui.clearField();
            weatherData();
        }
    })

function weatherData(){
    weather.getWeather().then(data=>{
        
        ui.paint(data);
    })
    .catch(e=>ui.setMessage('Your city is not found'));
}
