document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start");
    const pauseResumeButton = document.getElementById("pauseResume");
    const resetButton = document.getElementById("reset");
    const durationInput = document.getElementById("duration");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    let countdown;
    let secondsRemaining;

    startButton.addEventListener("click", function () {
        startTimer();
    });

    pauseResumeButton.addEventListener("click", function () {
        pauseResumeTimer();
    });

    resetButton.addEventListener("click", function () {
        resetTimer();
    });

    function startTimer() {
        secondsRemaining = parseInt(durationInput.value) || 0;

        if (secondsRemaining <= 0) {
            alert("Geçerli bir süre girin.");
            return;
        }

        countdown = setInterval(function () {
            updateTimerDisplay();
            secondsRemaining--;

            if (secondsRemaining < 0) {
                clearInterval(countdown);
                alert("Süre doldu!");
            }
        }, 1000);

        toggleButtons(true);
    }

    function pauseResumeTimer() {
        if (countdown) {
            clearInterval(countdown);
            countdown = null;
            toggleButtons(false);
        } else {
            startTimer();
        }
    }

    function resetTimer() {
        clearInterval(countdown);
        countdown = null;
        secondsRemaining = 0;
        updateTimerDisplay();
        toggleButtons(false);
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(secondsRemaining / 60);
        const seconds = secondsRemaining % 60;
        minutesElement.textContent = padZero(minutes);
        secondsElement.textContent = padZero(seconds);
    }

    function padZero(value) {
        return value < 10 ? "0" + value : value;
    }

    function toggleButtons(running) {
        startButton.disabled = running;
        pauseResumeButton.textContent = running ? "Duraklat" : "Devam Et";
    }
});
