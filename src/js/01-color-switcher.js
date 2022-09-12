const startEl = document.querySelector('button[data-start]');
const stopEl = document.querySelector('button[data-stop]');
const COLORCHANGE_DELAY = 1000;
let timeIntervalId = null;

startEl.addEventListener('click', () => {
  timeIntervalId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, COLORCHANGE_DELAY);
  startEl.disabled = true;
  stopEl.disabled = false;
});

stopEl.addEventListener('click', () => {
  clearInterval(timeIntervalId);
  startEl.disabled = false;
  stopEl.disabled = true;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
