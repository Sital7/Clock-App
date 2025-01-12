const hrs = document.getElementById("hrs");
const min = document.getElementById("min");
const sec = document.getElementById("sec");
const period = document.getElementById("period");
const toggleFormatBtn = document.getElementById("toggleFormat");

let is24Hour = true;

// Clock functionality
setInterval(() => {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    if (!is24Hour) {
        period.textContent = hours >= 12 ? " PM" : " AM";
        hours = hours % 12 || 12; // Convert to 12-hour format
    } else {
        period.textContent = "";
    }

    hrs.textContent = hours.toString().padStart(2, "0");
    min.textContent = minutes.toString().padStart(2, "0");
    sec.textContent = seconds.toString().padStart(2, "0");
}, 1000);

toggleFormatBtn.addEventListener("click", () => {
    is24Hour = !is24Hour;
});

// Timer functionality
let timerInterval, timerSeconds = 0, isTimerRunning = false, isTimerPaused = false;

function updateTimerDisplay() {
    const hours = Math.floor(timerSeconds / 3600);
    const minutes = Math.floor((timerSeconds % 3600) / 60);
    const seconds = timerSeconds % 60;

    document.getElementById("timerDisplay").textContent =
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

document.getElementById("startTimer").addEventListener("click", () => {
    if (!isTimerRunning) {
        isTimerRunning = true;
        timerInterval = setInterval(() => {
            timerSeconds++;
            updateTimerDisplay();
        }, 1000);
    }
});

document.getElementById("pauseTimer").addEventListener("click", (e) => {
    if (isTimerRunning && !isTimerPaused) {
        clearInterval(timerInterval);
        isTimerPaused = true;
        e.target.textContent = "Resume";
    } else if (isTimerRunning && isTimerPaused) {
        timerInterval = setInterval(() => {
            timerSeconds++;
            updateTimerDisplay();
        }, 1000);
        isTimerPaused = false;
        e.target.textContent = "Pause";
    }
});

document.getElementById("stopTimer").addEventListener("click", () => {
    clearInterval(timerInterval);
    timerSeconds = 0;
    updateTimerDisplay();
    isTimerRunning = false;
    isTimerPaused = false;
    document.getElementById("pauseTimer").textContent = "Pause";
});

// Countdown functionality
let countdownInterval, countdownSeconds = 0, isCountdownRunning = false, isCountdownPaused = false;

function updateCountdownDisplay() {
    const hours = Math.floor(countdownSeconds / 3600);
    const minutes = Math.floor((countdownSeconds % 3600) / 60);
    const seconds = countdownSeconds % 60;

    document.getElementById("countdownDisplay").textContent =
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

document.getElementById("startCountdown").addEventListener("click", () => {
    const inputSeconds = parseInt(document.getElementById("countdownInput").value, 10);
    if (!isCountdownRunning && inputSeconds > 0 && inputSeconds <= 100000) {
        countdownSeconds = inputSeconds;
        isCountdownRunning = true;
        updateCountdownDisplay();
        countdownInterval = setInterval(() => {
            if (countdownSeconds > 0) {
                countdownSeconds--;
                updateCountdownDisplay();
            } else {
                clearInterval(countdownInterval);
                isCountdownRunning = false;
            }
        }, 1000);
    }
});

document.getElementById("pauseCountdown").addEventListener("click", (e) => {
    if (isCountdownRunning && !isCountdownPaused) {
        clearInterval(countdownInterval);
        isCountdownPaused = true;
        e.target.textContent = "Resume";
    } else if (isCountdownRunning && isCountdownPaused) {
        countdownInterval = setInterval(() => {
            if (countdownSeconds > 0) {
                countdownSeconds--;
                updateCountdownDisplay();
            } else {
                clearInterval(countdownInterval);
                isCountdownRunning = false;
            }
        }, 1000);
        isCountdownPaused = false;
        e.target.textContent = "Pause";
    }
});

document.getElementById("stopCountdown").addEventListener("click", () => {
    clearInterval(countdownInterval);
    countdownSeconds = 0;
    updateCountdownDisplay();
    isCountdownRunning = false;
    isCountdownPaused = false;
    document.getElementById("pauseCountdown").textContent = "Pause";
});
