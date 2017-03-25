'use strict'

// import modules
let moment = require('moment-timezone'); 
require('moment-transform')
require('moment-duration-format');


// set time zone to locale
moment.tz.setDefault("America/Los_Angeles");


// set wake up time in 24-hour format
let alarmTime = '18:29:00'


// declare variables
let alarmMoment
let when


//set alarmTime for today or tomorrow, whichever happens first
if ( moment().isAfter(moment().transform(alarmTime))) { alarmMoment = moment().transform(`YYYY-MM-+01 ${ alarmTime }`); when = 'TOMORROW'; }
else { alarmMoment = moment().transform(alarmTime); when = 'TODAY'; }


//calculate the alarm delay in milliseconds
let timeUntilNextAlarm = alarmMoment.diff(moment(), 'milliseconds', true)


//output time information to console
getTimeUntilNextAlarm()


//set the delay
setTimeout(
    function () {console.log(` \nHEY IT\'S TIME!!! ${moment().format('ddd MMM Do HH:mm')} PST`)}, 
    timeUntilNextAlarm
)

console.log('bloop')






function getTimeUntilNextAlarm() {
    console.log(`Time: ${moment().format('ddd MMM Do HH:mm')} PST`)
    console.log(`Next Alarm [${when}]: ${alarmMoment.format('ddd MMM Do HH:mm')} PST`)
    let timeDifference = moment.duration(alarmMoment.diff(moment(), 'milliseconds', true), 'milliseconds')
    
    let alarmStatus
    if (timeDifference < 0) { alarmStatus = 'ALARM SURPASSED' }
    else { alarmStatus = 'T-MINUS'}
        
    console.log(`${alarmStatus}: ${ timeDifference.format('h [hours] [and] m [min] [and] s [sec]') } \n`)    
}