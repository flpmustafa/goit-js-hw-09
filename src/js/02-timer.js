import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const btnStart = document.querySelector('[data-start]');
btnStart.setAttribute("disabled", "disabled");

const initDate = document.querySelector('#datetime-picker');

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

let timerId = null;
 btnStart.addEventListener('click', () => {
    timerId = setInterval(() => {
    const selectDate = datePickr.selectedDates[0].getTime();
    const result = selectDate - dateNow.getTime();   

    console.log(result);
}, 1000);
  });


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
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
