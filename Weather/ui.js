class Ui{
    constructor(){
        this.city = document.getElementById('w-city');
        //this.country = document.getElementById('country');
        this.icon = document.getElementById('w-icon');
        this.feels = document.getElementById('w-feels');
        this.temperature = document.getElementById('w-temp');
        this.pressure = document.getElementById('w-pressure');
        this.humidity = document.getElementById('w-humidity');
    }
    paint({main_data :{temp,pressure,humidity}, overall_data: {main,icon}, cityName}){
        const iconUrl = Ui.generateIcon(icon);
        this.icon.setAttribute('src',iconUrl);
        this.city.textContent = cityName;
        this.feels.textContent = main;
        this.temperature.textContent = `Temparature(cel): ${temp}`;
        this.pressure.textContent = `Pressure(hpa): ${pressure}`;
        this.humidity.textContent = `Humidity(%): ${humidity}`;
    }
    static generateIcon(icon){
        return 'http://openweathermap.org/img/wn/'+ icon +'.png';
    }
    clearField(){
        document.getElementById('city').value = '';
        document.getElementById('country').value='';
    }
    setMessage(msg){
        const para = document.querySelector('.jumbotron p');
        const div = document.createElement('div');
        div.className = 'alert alert-danger';
        div.id = 'message'
        div.textContent = msg;
        Ui.hideMessage();
        para.insertAdjacentElement('afterend',div);
    }
    static hideMessage(){
        setTimeout(()=>{
            document.getElementById('message').remove();
        },2000);
    }

}//heandle weather UI