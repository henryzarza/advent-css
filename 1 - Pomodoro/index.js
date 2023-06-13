const timerText = document.querySelector("#timer-text");
const timerButton = document.querySelector("#timer-button");
const editTimerButton = document.querySelector("#edit-timer");
const checkIcon = document.querySelector("#check-icon");
const gearIcon = document.querySelector("#gear-icon");
const progressCircleRef = document.querySelector('.circle-container__progress');
let isRunning = false;
let timer;
let minutes;
let seconds;
let isEditing = false;

const checkTimeFormat = (number) => {
  return !isNaN(number) && Number(number) >= 0 && Number(number) <= 60;
}

const runTimer = () => {
  isRunning = true;
  const timeInfo = timerText.innerHTML.split(":");

  if (timeInfo.length === 2 && checkTimeFormat(timeInfo[0]) && checkTimeFormat(timeInfo[1])) {
    if (!timer) {
      minutes = Number(timeInfo[0]);
      seconds = Number(timeInfo[1]);
      timerButton.innerHTML = "stop";
      const totalTime = (minutes * 60) + seconds;

      timer = setInterval(() => {
        if (isRunning && minutes >= 0) {
          seconds -= 1;
  
          if (seconds < 0) {
            seconds = 60;
            minutes -= 1;
          }

          if (minutes < 0 && seconds === 60) {
            timerText.innerHTML = '00:00';
            timerButton.innerHTML = "start";
            isRunning = false;
            clearInterval(timer);
            progressCircleRef.style.setProperty('stroke', "var(--red)");
            // TODO: show a better and pretty alert
            alert("The time is over");
          } else {
            const percentage = ((totalTime - ((minutes * 60) + seconds)) / totalTime) * 100;
            progressCircleRef.style.setProperty('--progress', percentage);
            progressCircleRef.style.setProperty('stroke', "var(--green)");
            timerText.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
          }
        }
      }, 1000);
    }

  } else {
    alert("Time format is incorrect");
  }
};

timerButton.addEventListener("click", () => {
  if (isRunning || isEditing) {
    isRunning = false;
  } else {
    runTimer();
  }
});

editTimerButton.addEventListener("click", () => {
  if (isEditing) {
    timerText.setAttribute("contenteditable", "false");
    isEditing = false;
    checkIcon.classList.add("hidden");
    gearIcon.classList.remove("hidden");
  } else {
    timerText.setAttribute("contenteditable", "true");
    timerText.focus();
    timerButton.innerHTML = "start";
    isRunning = false;
    clearInterval(timer);
    timer = null;
    isEditing = true;
    checkIcon.classList.remove("hidden");
    gearIcon.classList.add("hidden");
    progressCircleRef.style.setProperty('--progress', 0);
    progressCircleRef.style.setProperty('stroke', "var(--red)");
  }
});
