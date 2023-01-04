import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const btnStart = document.querySelector('[data-start]');
btnStart.setAttribute("disabled", "disabled");

const initDate = document.querySelector('#datetime-picker');
const initDaysValue = document.querySelector('[data-days]');
const initHoursValue = document.querySelector('[data-hours]');
const initMinutesValue = document.querySelector('[data-minutes]');
const initSecondsValue = document.querySelector('[data-seconds]');

const dateNow = new Date();
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
       if (dateNow > selectedDates[0]) {
       alert('Please choose a date in the future')
    } 
        btnStart.removeAttribute("disabled", "disabled");
    },
  };

  const datePickr = flatpickr(initDate, options)

  const timer = {
    start () {
    setInterval(() => {
      const currentTime = Date.now();
      const selectDate = datePickr.selectedDates[0].getTime();
      const ms = selectDate - currentTime;
    
    function convertMs(ms) {
        // Number of milliseconds per unit of time
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
      
        // Remaining days
        const days = Math.floor(ms / day);
        // Remaining hours
        const hours = Math.floor((ms % day) / hour);
        // Remaining minutes
        const minutes = Math.floor(((ms % day) % hour) / minute);
        // Remaining seconds
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);
      
        return { days, hours, minutes, seconds };
      }

        initDaysValue.textContent = Number(convertMs(ms).days);
        initHoursValue.textContent = Number(convertMs(ms).hours);
        initMinutesValue.textContent = Number(convertMs(ms).minutes);
        initSecondsValue.textContent = Number(convertMs(ms).seconds);
    }, 1000) 
  }
  };

btnStart.addEventListener('click', () => {
  btnStart.setAttribute("disabled", "disabled");
  initDate.setAttribute("disabled", "disabled");
  
  timer.start();
  
  const body = document.querySelector('body');
  body.insertAdjacentHTML("beforeend", `<button type="button" data-newtimer>New Timer</button>`);
  const btnNewTimer = document.querySelector('[data-newtimer]');
  btnNewTimer.addEventListener('click', () => {
    location.reload();
  })
});

