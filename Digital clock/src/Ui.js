class UI{
    constructor(){
        this.clockTime = document.querySelector('.clock-time');
        this.clockSecond = document.querySelector('.clock-second');
        this.clockAmPm = document.querySelector('.clock-ampm');
        this.Date = document.querySelector('.date');
    }
    showTime(hour,minute){
        this.clockTime.textContent = `${hour}:${minute}`;
    }
    showSecond(second){
        this.clockSecond.textContent = `.${second}`;
    }
    showAmPm(AmPm){
        this.clockAmPm.textContent = AmPm ? "AM" : "PM";
    }
    showDate(day,month,year){
       this.Date.textContent = `${month} ${day}, ${year}`
    }
}

export const ui = new UI;