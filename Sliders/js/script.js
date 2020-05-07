window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    //Tabs

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    let hideTabContect = (a) => {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContect(1);

    let showTabContent = (b) => {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function (event) {
        let target = event.target;

        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContect(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    })


    // Timer

    let deadline = '2020-04-20';
    console.log(deadline)

    let getTimeRemaining = (endtime) => {
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

    let setClock = (id, endtime) => {
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

    //Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        descrBtn = document.querySelectorAll('.description-btn');


    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden' //запрет прокрутки при открытом модальном окне
    });

    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });


    descrBtn.forEach(function (item) {
        item.addEventListener('click', function () {

            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        })
    });


// Send form

let message = {
    loading: 'Загрузка',
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так...'
};

let form = document.querySelector('.main-form'),
    input = form.getElementsByTagName('input'),
    statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

form.addEventListener('submit', function(event){
    event.preventDefault();
    form.appendChild(statusMessage);

    let request = new XMLHttpRequest();
    request.open('POST', 'server.php');
    //request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');


    let formData = new FormData(form);

    let obj = {};
    formData.forEach(function(value, key){
        obj[key] = value;
    });

    let json = JSON.stringify(obj);

    //request.send(formData);
    request.send(json);

    request.addEventListener('readystatechange', function(){
        if (request.readyState < 4){
            statusMessage.innerHTML = message.loading;
        } else if (request.readyState === 4 && request.readyState ==200) {
            statusMessage.innerHTML = message.success;
        } else {
            statusMessage.innerHTML = message.failure;
        }
    });

    for (let i=0; i<input.length; i++) {
        input[i].value = '';
    }


});

});
