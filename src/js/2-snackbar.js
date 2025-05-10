import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const delay = event.target.elements.delay.value;
    const selectedState = event.target.elements.state.value;

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

    const isFulfilled = selectedState === 'fulfilled';

    createPromise(delay, isFulfilled)
        .then((message) => {
            iziToast.show({
                title: '✅',
                message: message,
                color: 'green',
            });
        })
        .catch((message) => {
            iziToast.show({
                title: '❌',
                message: message,
                color: 'red',
            });
        });
});
