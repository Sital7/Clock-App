<<<<<<< HEAD
let clockSection = document.getElementById("clockSection");
let countdownSection = document.getElementById("countdownSection");
let timerSection = document.getElementById("timerSection");
let countdownDisplay = document.getElementById("countdownDisplay");
let countdownInput = document.getElementById("countdownInput");

let timerDisplay = document.getElementById("timerDisplay");
let timerIcon = document.getElementById("showTimer");
let countdownIcon = document.getElementById("showCountdown");

let timerInterval;
let countdownInterval;
let timerSeconds = 0;
let countdownTime = 0;
let isTimerRunning = false;
let isCountdownRunning = false;

// Clock-related variables
let is12HourFormat = false;
let clockInterval;
let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let sec = document.getElementById("sec");
let period = document.getElementById("period");

// Function to format time in 12-hour format
function formatClockTime(hours, minutes, seconds) {
    let formattedHours = hours;
    let ampm = "AM";
    if (is12HourFormat) {
        if (hours >= 12) {
            ampm = "PM";
            if (hours > 12) formattedHours = hours - 12;
        }
        if (hours === 0) formattedHours = 12;
        period.textContent = ampm;
    } else {
        period.textContent = "";
    }

    return {
        hours: formattedHours,
        minutes: minutes,
        seconds: seconds
    };
}

// Update the clock every second
function updateClock() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    const formattedTime = formatClockTime(hours, minutes, seconds);
    
    hrs.textContent = formattedTime.hours.toString().padStart(2, "0");
    min.textContent = formattedTime.minutes.toString().padStart(2, "0");
    sec.textContent = formattedTime.seconds.toString().padStart(2, "0");
}

// Start the clock
function startClock() {
    clockInterval = setInterval(updateClock, 1000);
}

// Stop the clock
function stopClock() {
    clearInterval(clockInterval);
}

// Timer Functions
function formatTime(seconds) {
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// Start Timer
document.getElementById("startTimer").addEventListener("click", () => {
    if (!isTimerRunning) {
        isTimerRunning = true;
        timerInterval = setInterval(() => {
            timerSeconds++;
            timerDisplay.textContent = formatTime(timerSeconds);
        }, 1000);
    }
});

// Pause/Resume Timer
document.getElementById("pauseResumeTimer").addEventListener("click", function () {
    if (this.textContent === "Pause") {
        clearInterval(timerInterval);
        isTimerRunning = false;
        this.textContent = "Resume";
    } else {
        isTimerRunning = true;
        timerInterval = setInterval(() => {
            timerSeconds++;
            timerDisplay.textContent = formatTime(timerSeconds);
        }, 1000);
        this.textContent = "Pause";
    }
});

// Stop Timer
document.getElementById("stopTimer").addEventListener("click", () => {
    clearInterval(timerInterval);
    timerSeconds = 0;
    isTimerRunning = false;
    timerDisplay.textContent = formatTime(timerSeconds);
    document.getElementById("pauseResumeTimer").textContent = "Pause"; // Reset button to Pause
});

// Countdown Functions
function formatCountdownTime(seconds) {
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// Start Countdown
document.getElementById("startCountdown").addEventListener("click", () => {
    let inputTime = parseInt(countdownInput.value);
    if (inputTime > 0) {
        countdownTime = inputTime;
        countdownDisplay.textContent = formatCountdownTime(countdownTime);
        isCountdownRunning = true;
        countdownInterval = setInterval(() => {
            if (countdownTime > 0) {
                countdownTime--;
                countdownDisplay.textContent = formatCountdownTime(countdownTime);
            } else {
                clearInterval(countdownInterval);
                isCountdownRunning = false;
            }
        }, 1000);
    }
});

// Pause Countdown
document.getElementById("pauseCountdown").addEventListener("click", () => {
    if (isCountdownRunning) {
        clearInterval(countdownInterval);
        isCountdownRunning = false;
    }
});


// Stop Countdown
document.getElementById("stopCountdown").addEventListener("click", () => {
    clearInterval(countdownInterval);
    countdownTime = 0;
    countdownDisplay.textContent = "00:00:00";
    isCountdownRunning = false;
});


timerIcon.addEventListener("click", () => {
    clockSection.style.display = "none";
    countdownSection.style.display = "none";
    timerSection.style.display = "block";
    
});


countdownIcon.addEventListener("click", () => {
    clockSection.style.display = "none";
    timerSection.style.display = "none";
    countdownSection.style.display = "block";
    
});


window.addEventListener('load', () => {
    clockSection.style.display = "block";
    countdownSection.style.display = "none";
    timerSection.style.display = "none";
    startClock(); 
});


document.getElementById("toggleFormat").addEventListener("click", () => {
    is12HourFormat = !is12HourFormat;
    updateClock();
});


document.getElementById("backToClockCountdown").addEventListener("click", () => {
    clockSection.style.display = "block";
    countdownSection.style.display = "none";
    timerSection.style.display = "none";
});


document.getElementById("backToClockTimer").addEventListener("click", () => {
    clockSection.style.display = "block";
    countdownSection.style.display = "none";
    timerSection.style.display = "none";
});
=======
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
>>>>>>> efc0a9d321131d944deac3509989317f735294ef
