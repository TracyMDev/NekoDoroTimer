const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");
const timeLeft_Div = document.getElementById("count-down");
const taskInput = document.getElementById("clock-task");
const taskDisplay = document.querySelector(".task-text");

// set up the timer intervals
let workIntervalMin = 2;
let breakIntervalMin = 1;
let numPomodoros = 4;

let workIntervalSec = workIntervalMin * 60;
let breakIntervalSec = breakIntervalMin * 60;
let isBreakTime = false;
let clockTimerId;
let currentTimeLeft = workIntervalSec; // time left in s
let isClockRunning = false;

//event listeners
startBtn.addEventListener("click", startPomodoro);
stopBtn.addEventListener("click", stopPomodoro);

function startPomodoro() {
  if (!isClockRunning) {
    isClockRunning = true;
    clockTimerId = setInterval(getRemainingTime, 1000);
  }
  //   console.log(startTime);
  // change the button to a pause button
}

function stopPomodoro() {
  isClockRunning = false;
  // stop the interval timer
  clearInterval(clockTimerId);
  // reset the Time
  setClock(workIntervalSec);
}

function getRemainingTime() {
  currentTimeLeft--;
  //   console.log(`Time left is ${currentTimeLeft}`);
  setClock(currentTimeLeft);
  if (currentTimeLeft === 0) checkIntervals();
}

function setClock(timeSet) {
  let minutes;
  let seconds;
  let taskText = taskInput.value ? taskInput.value : "Work";
  const oneMinute = 60; // 1 min in sec

  minutes = Math.floor(timeSet / oneMinute);
  seconds = timeSet % oneMinute;
  // console.log(timeSet);
  // console.log(`${minutes} : ${seconds}`);

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  timeLeft_Div.textContent = `${minutes}:${seconds}`;
  taskDisplay.textContent = isBreakTime ? "Break" : taskText;
}

function checkIntervals() {
  // check if we should be taking a break or working
  if (isBreakTime == false && currentTimeLeft === 0 && numPomodoros > 0) {
    isBreakTime = true;
    currentTimeLeft = breakIntervalSec;
    setClock(currentTimeLeft);
  } else if (currentTimeLeft === 0 && numPomodoros > 0 && isBreakTime == true) {
    isBreakTime = false;
    currentTimeLeft = workIntervalSec;
    setClock(currentTimeLeft);

    // only decrement a pomodoro set when you finished working
    numPomodoros--;
  } else {
    stopPomodoro();
  }
}
