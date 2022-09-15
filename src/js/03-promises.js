import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const submitEl = e => {
  e.preventDefault();

  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  const delayEl = Number(delay.value);
  const amountEl = Number(amount.value);
  const stepEl = Number(step.value);

  for (let i = 0; i < amountEl; i += 1) {
    createPromise(i + 1, delayEl + stepEl * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }

  e.currentTarget.reset();
};

formEl.addEventListener('submit', submitEl);
