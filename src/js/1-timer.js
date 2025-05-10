import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"; 

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


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

let userSelectedDate = null

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
    const intervalId = setInterval(() => {
        const now = new Date();
        const diff = userSelectedDate - now;
        const { days, hours, minutes, seconds } = convertMs(diff);
        startBtn.disabled = true;
        if (diff <= 0) {
            clearInterval(intervalId);
            return;
            document.querySelector('[data-days]').textContent = '00';
            document.querySelector('[data-hours]').textContent = '00';
            document.querySelector('[data-minutes]').textContent = '00';
            document.querySelector('[data-seconds]').textContent = '00';
        }          


        document.querySelector('[data-days]').textContent = addLeadingZero(days);
        document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
        document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
        document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
    }
        , 1000);

    
}) 

//////////////////////////////////////////////////////////////////

iziToast.show({
    title: 'Error',
    message: 'Please choose a date in the future'
});
