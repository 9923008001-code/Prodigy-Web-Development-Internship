let startTime = 0;
let elapsedTime = 0;
let timerInterval;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

document.getElementById("startBtn").onclick = startTimer;
document.getElementById("pauseBtn").onclick = pauseTimer;
document.getElementById("resetBtn").onclick = resetTimer;
document.getElementById("lapBtn").onclick = recordLap;

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 10);
}

function pauseTimer() {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
}

function resetTimer() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    display.innerHTML = "00:00:00.000";
    laps.innerHTML = "";
}

function recordLap() {
    const li = document.createElement("li");
    li.textContent = display.innerHTML;
    laps.appendChild(li);
}

function updateTimer() {
    elapsedTime = Date.now() - startTime;

    let milliseconds = elapsedTime % 1000;
    let seconds = Math.floor(elapsedTime / 1000) % 60;
    let minutes = Math.floor(elapsedTime / 60000) % 60;
    let hours = Math.floor(elapsedTime / 3600000);

    display.innerHTML =
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds) + "." +
        (milliseconds < 100 ? (milliseconds < 10 ? "00" + milliseconds : "0" + milliseconds) : milliseconds);
}
