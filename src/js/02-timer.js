import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/material_red.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const startEl = document.querySelector('button[data-start]');
const dateTime = document.querySelector('#datetime-picker');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
let initialTime = null;
const currentDate = Date.now();
startEl.disabled = true;
let deltaTime = null;
let time = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= currentDate) {
      Report.failure(
        'Error',
        'Please, enter only a date in the future',
        'Done'
      );
    } else {
      startEl.disabled = false;
      deltaTime = selectedDates[0].getTime() - currentDate;
      time = selectedDates[0];
    }
  },
};

flatpickr(dateTime, options);

startEl.addEventListener('click', startElClickRun);

function startElClickRun() {
  const intervalId = setInterval(() => {
    if (deltaTime <= 0) {
      return clearInterval(intervalId);
    }
    addTextContent(deltaTime);
    deltaTime -= 1;
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(deltaTime) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(deltaTime / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((deltaTime % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(
    Math.floor(((deltaTime % day) % hour) / minute)
  );
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((deltaTime % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

function addTextContent() {
  const { days, hours, minutes, seconds } = convertMs(time - new Date());
  days.textContent = days;
  hours.textContent = hours;
  minutes.textContent = minutes;
  seconds.textContent = seconds;
}
