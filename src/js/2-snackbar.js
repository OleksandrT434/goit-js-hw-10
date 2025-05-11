import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

function createPromise(delay, isFulfilled) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFulfilled) {
        resolve(`Promise fulfilled in ${delay}ms`);
      } else {
        reject(`Promise rejected in ${delay}ms`);
      }
    }, delay);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const delay = event.target.elements.delay.value;
  const selectedState = event.target.elements.state.value;
    

  const isFulfilled = selectedState === 'fulfilled';

  createPromise(delay, isFulfilled)
    .then((message) => {
      iziToast.show({
        title: '✅',
        message: message,
        color: 'green',
        position: 'topRight',
      });
    })
    .catch((message) => {
      iziToast.show({
        title: '❌',
        message: message,
        color: 'red',
        position: 'topRight',
      });
    });
});