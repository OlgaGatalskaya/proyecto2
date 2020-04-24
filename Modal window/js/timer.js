// Timer

'use strict'

let deadline = '2019-05-20';
console.log(deadline)

function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t / 1000) % 60),
        minutes = Math.floor((t / 1000 / 60) % 60),
        hours = Math.floor((t / (1000 * 60 * 60)));
    // hours = Math.floor((t/1000/60/60)%24),
    // days = Math.floor((t/1000*60*60 *24));
    console.log(t)
    return {
        'total': t,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };



}

function setClock(id, endtime) {
    let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        timeInterval = setInterval(upDateClock, 1000);

    function upDateClock() {
        let t = getTimeRemaining(endtime);

        function addZero(num) {

            if (num <= 9) {
                return '0' + num;
            } else return num;
        };

        hours.textContent = addZero(t.hours);
        minutes.textContent = addZero(t.minutes);
        seconds.textContent = addZero(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval);
            hours.textContent = '00';
            minutes.textContent = '00';
            seconds.textContent = '00';

        }
    }
}



setClock('timer', deadline);

