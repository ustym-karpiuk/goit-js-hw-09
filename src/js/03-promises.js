import Notiflix from "notiflix";


const formEl = document.querySelector('.form');

formEl.addEventListener('submit', startPromise);


function createPromise(position, newDelay) {
  const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
     
        if (shouldResolve) {
          return resolve({ position, newDelay });
        } else {
          return reject({ position, newDelay });
        }
  })
};

function startPromise(e) {
  e.preventDefault()
  const inputForm = e.currentTarget;

  let delayEl = +inputForm['delay'].value;
  const stepEl = +inputForm['step'].value;
  const amountEl = +inputForm['amount'].value;

  let position = 0;
  
    for (let i = 1; i <= amountEl; i += 1) {
      position = i;
      
      const firstDelay = delayEl;
      let newDelay = delayEl += stepEl;

      createPromise(position, firstDelay, newDelay)
            
        .then(({ position, newDelay }) => {
            
          setTimeout(() => {
            Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${newDelay}ms`);
          }, newDelay);
        })
    
        .catch(({ position, newDelay }) => {
            
          setTimeout(() => {
            Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${newDelay}ms`);
          }, newDelay);
        })
    }
};