const LOADING_TIME = 18000;
const PERCENT_STEP = 5;
const COUNT_LOAD_TIME = LOADING_TIME / (100 / PERCENT_STEP);
let percent = 0;
let preloader = document.querySelector(".progress-bar");
const percentEl = document.getElementById("progress-label");
const barEl = document.getElementById("progress-bar");
let progressText = document.getElementById("progress_text");

function countLoad() {
    barEl.style.width = "0%";
    percentEl.textContent = `0%`;
    let countInterval = setInterval(function () {
        percent += PERCENT_STEP;
        percentEl.textContent = `${percent}%`;
        barEl.style.width = `${percent}%`;
        if (percent >= 50 && percent < 70) {
            progressText.textContent = 'Экипируемся...';
        } else if (percent >= 70 && percent < 90) {
            progressText.textContent = 'Проводим ТО...';
        }else if (percent >= 80 && percent < 90) {
            progressText.textContent = 'Моем машину...';
        } else if (percent >= 90) {
            progressText.textContent = 'Мы готовы!';
        }
        if (percent === 100) {
            clearInterval(countInterval);
            setTimeout(function () {
                fadeOutnojquery(preloader);
            }, 100);
        }
    }, COUNT_LOAD_TIME);
}
function fadeOutnojquery(el) {
    el.style.opacity = 1;
    let interhellopreloader = setInterval(function () {
        el.style.opacity = el.style.opacity - 0.05;

        if (el.style.opacity <= 0.05) {
            clearInterval(interhellopreloader);
            preloader.style.display = "none";
        }
    }, 16);
}

countLoad();