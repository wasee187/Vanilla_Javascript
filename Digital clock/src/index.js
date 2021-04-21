//importing ui class
import { ui } from './Ui';

//DomLoad Event listener
document.addEventListener('DOMContentLoaded', start);

//starting time function 
function start(){
    updateDate();
    setInterval(()=>{
        updateTime();
    },500);
}
//update date function for date, month, year
function updateDate(){
    const {day,month,year} = getDate();
    const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let newMonth = monthList[month];
    //calling ui for showing date. 
    ui.showDate(day,newMonth,year);
}
//update Time method for formating time
function updateTime(){
    const {hour,minutes,seconds,isAm,day} = getTime();
    const minuteFormat = minutes.toString().padStart(2,"0");
    //calling ui for showing hour and second
    ui.showTime(hour,minuteFormat);
    //calling ui for showing seconds
    ui.showSecond(seconds);
    //calling ui for Am/pm
    ui.showAmPm(isAm);
    //calling ui for showing day   
}
//getTime function for getting hour, minutes, seconds & am/pm
function getTime(){
    //initiating date 
    const newTime = new Date();
    return{
        hour: newTime.getHours() % 12 || 12,
        minutes : newTime.getMinutes(),
        seconds: newTime.getSeconds(),
        isAm : newTime.getHours() < 12,
    }
}
//function for getting date
function getDate(){
    const newDate = new Date();
    return{
        day : newDate.getDate(),
        month : newDate.getMonth(),
        year : newDate.getFullYear(),
    }
}
