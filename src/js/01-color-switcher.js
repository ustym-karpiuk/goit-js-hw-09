BtnStartEl = document.querySelector('button[data-start]');
BtnStopEl = document.querySelector('button[data-stop]');
const ACTION_DELAY = 1000;
const onInretval = {
    timerId: null,
    isActiveBtn: false,
}

BtnStartEl.addEventListener("click", onStart);
BtnStopEl.addEventListener("click", onStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStart() {  
    if (onInretval.isActiveBtn) {
        return;
    }
        onInretval.isActiveBtn = true;
        BtnStartEl.setAttribute('disabled', true);
        BtnStopEl.removeAttribute('disabled');
            onInretval.timerId = setInterval(() => {
            document.body.style.backgroundColor = getRandomHexColor();
            }, ACTION_DELAY);
    console.log('onStart');
}

function onStop() {
    if (BtnStartEl.hasAttribute('disabled')) {
        BtnStopEl.setAttribute('disabled', true);
        BtnStartEl.removeAttribute('disabled');
        clearInterval(onInretval.timerId);
        onInretval.isActiveBtn = false;
    } else {
        return;
    }
    console.log('onStop');
}