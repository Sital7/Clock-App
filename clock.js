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
