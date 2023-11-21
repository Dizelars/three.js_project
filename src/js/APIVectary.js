import { VctrModelApi } from "https://app.vectary.com/studio-lite/scripts/api.js";

const LOADING_TIME = 20000;
const PERCENT_STEP = 5;
const COUNT_LOAD_TIME = LOADING_TIME / (100 / PERCENT_STEP);
let percent = 0;
let preloader = document.querySelector(".progress-bar");
const percentEl = document.getElementById("progress-label");
const barEl = document.getElementById("progress-bar");
let progressText = document.getElementById("progress_text");
let VectaryIframe = document.querySelector('.VectaryIframe');
let viewerApi = new VctrModelApi("9f0e8cf5-2302-46a3-8e49-0a7c4c3911d8"); // DOM Id
let isModelLoaded = false;

async function initializeModelApi() {
    await viewerApi.init();
    viewerApi.isReady().then(() => {
        isModelLoaded = true;
    });
}

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
        // if (percent === 100) {
        //     clearInterval(countInterval);
        //     // setTimeout(function () {
        //     //     fadeOutnojquery(preloader);
        //     // }, 100);
        // }
        if (isModelLoaded) {
            clearInterval(countInterval);
            percentEl.textContent = `100%`;
            barEl.style.width = `100%`;
            setTimeout(function () {
                fadeOutnojquery(preloader);
            }, 250);
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

document.addEventListener("DOMContentLoaded", () => {
    const IframeObject = {
        'amarok_iframe': {
            AR_ON: 'https://app.vectary.com/p/05xqKl2g22Pw4ClSHgLBWU',
            AR_OFF: 'https://app.vectary.com/p/6DUi1J389W2CpLx6rKd6NZ'
        },
        'transit_iframe': {
            AR_ON: 'https://www.vectary.com/p/2zkou5LI5mWhXqo06RLBTm',
            AR_OFF: 'https://app.vectary.com/p/04gT055hqpx33xeOIRCCsw'
        },
        'solaris_iframe': {
            AR_ON: 'https://www.vectary.com/p/3yUUqLuKMivlvJ7atkLNjW',
            AR_OFF: 'https://www.vectary.com/p/0VL9N8lcfOKZty8trMbgBC'
        },
        'bus_iframe': {
            AR_ON: 'https://www.vectary.com/p/23bkuyEyPWkahKc2YGpnPH',
            AR_OFF: 'https://app.vectary.com/p/4yCKixsmks4yIU7RUZMH4V'
        },
        'kater_iframe': {
            AR_ON: 'https://www.vectary.com/p/7NLghh4BVi6QtYfWBIhIiD',
            AR_OFF: 'https://www.vectary.com/p/5XqA1vpoxjGloVklJ00a7H'
        },
        'moskvich_iframe': {
            AR_ON: 'https://app.vectary.com/p/7arDxbsHpAKCWD7uxgRqOq',
            AR_OFF: 'https://app.vectary.com/p/0q5RwfFnHQ0zWleDwP9pvH'
        },
        'velo_iframe': {
            AR_ON: 'https://www.vectary.com/p/1OaMXKivHNjDz5dAVF1jAI',
            AR_OFF: 'https://www.vectary.com/p/3m2dU1xt6Dmw4b4RY71iN7'
        }
    };

    // let VectaryIframe = document.querySelector('.VectaryIframe');
    let VectaryIframeClass = VectaryIframe.classList[0];
    let screenWidth = window.innerWidth;

    if (screenWidth >= 700 && screenWidth <= 1200) {
        VectaryIframe.src = IframeObject[VectaryIframeClass].AR_OFF;
    } else {
        VectaryIframe.src = IframeObject[VectaryIframeClass].AR_ON;
    }

    initializeModelApi();
});