import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"; 

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = null

const inputSet = document.querySelector('#datetime-picker');

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        const currentDate = new Date();

        if (selectedDate <= currentDate) {
            iziToast.show({
            title: 'Error',
            message: 'Please choose a date in the future'
     });

            startBtn.disabled = true;
        } else {
          startBtn.disabled = false;
          userSelectedDate = selectedDate;
        }
        
        
  },
});
///////////////////////////////////////////////////////////////////////////
function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
///////////////////////////////////////////////////////////////////////////

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  inputSet.disabled = true;
  
    const intervalId = setInterval(() => {
        const now = new Date();
        const diff = userSelectedDate - now;
        const { days, hours, minutes, seconds } = convertMs(diff);
      if (diff <= 0) {
            inputSet.disabled = false;
            clearInterval(intervalId);
            return;
        }          
        document.querySelector('[data-days]').textContent = addLeadingZero(days);
        document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
        document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
        document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
    }
        , 1000);

}) 
