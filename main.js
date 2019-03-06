const clock = document.querySelector('.clock');
const start = document.querySelector('.start');
const stop = document.querySelector('.stop');
const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const audio = document.querySelector('.audio');

let clockOn = false;
let setTime = 0;
let startButtonClickTime = 0;
let stopButtonClickTime = 0;
let difference = 0;
let resetState = false;
let intervalId;

const toReadableConverter = (ms) => {
  let milliseconds = parseInt(ms % 1000);
	let seconds = parseInt((ms / 1000 * 1) % 60);
	let minutes = parseInt((ms / (1000 * 60)) % 60);

	minutes = minutes < 10 ? '0' + minutes : minutes;
	seconds = seconds < 10 ? '0' + seconds : seconds;
	if (milliseconds < 10) {
		milliseconds = '00' + milliseconds;
	} else if (milliseconds < 100) {
		milliseconds = '0' + milliseconds;
	} else {
		milliseconds;
	};

	return `${minutes}:${seconds}`;
};
const countDownClock = (setTime, startButtonClickTime) => {
  difference = stopButtonClickTime === 0 ? setTime + startButtonClickTime - new Date().getTime() : stopButtonClickTime + startButtonClickTime - new Date().getTime();
  clock.textContent = toReadableConverter(difference);
  if (difference <= 10000) {
    audio.play();
  };
  if (difference < 0) {
    clockOn = false;
    clearInterval(intervalId);
  };

  return difference;
};

plus.addEventListener('click', () => {
  if (!clockOn && stopButtonClickTime === 0) {
    setTime += 60000;
    clock.textContent = toReadableConverter(setTime);
  } else if (!clockOn && difference > 0) {
    stopButtonClickTime += 60000;
    setTime = stopButtonClickTime;
    clock.textContent = toReadableConverter(setTime);
  }
});
minus.addEventListener('click', () => {
  if (!clockOn && setTime >= 60000 && difference === 0) {
    setTime -= 60000;
    clock.textContent = toReadableConverter(setTime);
  } else if (!clockOn && setTime >= 60000 && difference >= 60000) {
    stopButtonClickTime -= 60000;
    setTime = stopButtonClickTime;
    clock.textContent = toReadableConverter(setTime);
  }
});
start.addEventListener('click', () => {
  if (!clockOn) {
    clockOn = !clockOn;
    startButtonClickTime = new Date().getTime();
    intervalId = setInterval(countDownClock, 100, setTime, startButtonClickTime);

    resetState = false;
    stop.textContent = 'STOP';
  }
});
stop.addEventListener('click', () => {
  if (!resetState && difference !== 0) {
    clockOn = !clockOn;
    stopButtonClickTime = difference;
    clearInterval(intervalId);

    resetState = !resetState;
    stop.textContent = 'RESET';
  } else {
    clockOn = false;
    resetState = false;
    stop.textContent = 'STOP';
    stopButtonClickTime = 0;
    setTime = 0;
    difference = 0;
    clock.textContent = toReadableConverter(setTime);
  }
});