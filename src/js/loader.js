const LOADING_TIME = 5000;
const PERCENT_STEP = 5;
const COUNT_LOAD_TIME = LOADING_TIME / (100 / PERCENT_STEP);
let percent = 0;
let hellopreloader = document.querySelector(".progress-bar");
const percentEl = document.getElementById("progress-label");
const barEl = document.getElementById("progress-bar");

function countLoad() {
    barEl.style.width = "0%";
    percentEl.textContent = `0%`;
    let countInterval = setInterval(function () {
        percent += PERCENT_STEP;
        percentEl.textContent = `${percent}%`;
        barEl.style.width = `${percent}%`;
        if (percent === 100) {
            clearInterval(countInterval);
            setTimeout(function () {
                fadeOutnojquery(hellopreloader);
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
            hellopreloader.style.display = "none";
        }
    }, 16);
}

countLoad();