import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
    BtnStartEl: document.querySelector('button[data-start]'),
    inputDays: document.querySelector('.field [data-days]'),
    inputHours: document.querySelector('.field [data-hours]'),
    inputMinutes: document.querySelector('.field [data-minutes]'),
    inputSeconds: document.querySelector('.field [data-seconds]'),
}

refs.BtnStartEl.disabled = 'disabled';
const SELECTED_DATA = 'selected-data-item';
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (this.selectedDates[0] > Date.now()) {
            refs.BtnStartEl.disabled = null;
            Notiflix.Notify.success('Goog! You choose a date in the future');
        } else {
            return Notiflix.Notify.failure('Please choose a date in the future');
        }
  },
};

const fp = flatpickr("#datetime-picker", options);
const ACTION_DELAY = 1000;


class Timer {
    constructor({onTick}) {
        this.intervalId = null;
        this.isActive = false;
        this.onTick = onTick;
    };
    start() {
        if (this.isActive) {
            return;
        }
        const startTimeEl = fp.selectedDates[0].getTime();
        this.isActive = true;

        this.intervalId = setInterval(() => {
            const currentTimeEl = Date.now();
            const deltaTime = startTimeEl - currentTimeEl;

            if (deltaTime < 0) {
                clearInterval(this.intervalId);
                return;
            }
            
            const time = this.convertMs(deltaTime);
            this.onTick(time);
        }, ACTION_DELAY);
        
        refs.BtnStartEl.disabled = 'disabled';
    };
    convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        
        const days = this.addLeadingZero(Math.floor(ms / day));
        const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
        const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
        const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

        return { days, hours, minutes, seconds };
    };
    addLeadingZero(value) {
        return String(value).padStart(2, '0');
    };
};

const timer = new Timer({
    onTick: renderInterface,
});

function renderInterface ({ days, hours, minutes, seconds }) {
    refs.inputDays.textContent = `${days}`;
    refs.inputHours.textContent = `${hours}`;
    refs.inputMinutes.textContent = `${minutes}`;
    refs.inputSeconds.textContent = `${seconds}`;
};


refs.BtnStartEl.addEventListener('click', timer.start.bind(timer));