let workDuration = 2 * 60; // 25 minutes
let breakDuration = 1 * 60; // 5 minutes
let isRunning = false;
let isWorkSession = true;
let timeLeft = workDuration;
let timerInterval;

const timerDisplay = document.getElementById('timer');
const sessionTypeDisplay = document.getElementById('session-type');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function switchSession() {
  isWorkSession = !isWorkSession;
  timeLeft = isWorkSession ? workDuration : breakDuration;
  sessionTypeDisplay.textContent = `Session: ${isWorkSession ? 'Work' : 'Break'}`;
  updateTimerDisplay();
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      isRunning = false;
      alert(isWorkSession ? "Time for a break!" : "Back to work!");
      switchSession();
      startTimer(); // auto start next session
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  timeLeft = isWorkSession ? workDuration : breakDuration;
  updateTimerDisplay();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

updateTimerDisplay();
