import { VctrModelApi } from "https://app.vectary.com/studio-lite/scripts/api.js";

async function initializeModelApi() {
    let VectaryIframe = document.querySelector('.VectaryIframe');

    if (VectaryIframe.src !== "") {
        let modelApi = new VctrModelApi("9f0e8cf5-2302-46a3-8e49-0a7c4c3911d8"); // DOM Id
        await modelApi.init();
        // Your API magic here
        modelApi.isReady().then(() => console.log("IsReady"));
        modelApi.postViewData().then((r) => console.log("PostViewData:", r));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const IframeObject = {
        'amarok_iframe': {
            AR_ON: 'https://app.vectary.com/p/05xqKl2g22Pw4ClSHgLBWU',
            AR_OFF: 'https://app.vectary.com/p/0RbOH9MPO3BnsOhDY52zqF'
        },
        'transit_iframe': {
            AR_ON: 'https://app.vectary.com/p/2zkou5LI5mWhXqo06RLBTm',
            AR_OFF: 'https://app.vectary.com/p/653hmLhISTzEqZVP2DpI1Y'
        },
        'solaris_iframe': {
            AR_ON: 'https://app.vectary.com/p/3yUUqLuKMivlvJ7atkLNjW',
            AR_OFF: 'https://app.vectary.com/p/2nJznMdXw4HmPslEs1RUVl'
        },
        'bus_iframe': {
            AR_ON: 'https://app.vectary.com/p/23bkuyEyPWkahKc2YGpnPH',
            AR_OFF: 'https://app.vectary.com/p/1DxEomvLdgsZvxHG7bCbrG'
        },
        'kater_iframe': {
            AR_ON: 'https://app.vectary.com/p/7NLghh4BVi6QtYfWBIhIiD',
            AR_OFF: 'https://app.vectary.com/p/5o5bNVoXf9Dvf9xOzfGvqq'
        },
        'moskvich_iframe': {
            AR_ON: 'https://app.vectary.com/p/7arDxbsHpAKCWD7uxgRqOq',
            AR_OFF: 'https://app.vectary.com/p/7arDxbsHpAKCWD7uxgRqOq'
        },
        'velo_iframe': {
            AR_ON: 'https://app.vectary.com/p/1OaMXKivHNjDz5dAVF1jAI',
            AR_OFF: 'https://app.vectary.com/p/1OaMXKivHNjDz5dAVF1jAI'
        }
    };

    let VectaryIframe = document.querySelector('.VectaryIframe');
    let VectaryIframeClass = VectaryIframe.classList[0];
    let screenWidth = window.innerWidth;

    if (screenWidth >= 700 && screenWidth <= 1200) {
        VectaryIframe.src = IframeObject[VectaryIframeClass].AR_OFF;
    } else {
        VectaryIframe.src = IframeObject[VectaryIframeClass].AR_ON;
    }

    initializeModelApi(); // Вызываем функцию после установки src
});