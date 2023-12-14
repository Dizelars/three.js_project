// import '../../js/loader.js';
// import '../../js/APIVectary.js';
import '../../js/layout/script.js';
import { InteriorTransitionHelper } from '../../helpers/interiorTransitionHelper.js';

const interiorButton = document.querySelector('.tech_spec__interior');
const ARButtonPulse = document.querySelector('.pulse_wrapper');
const aFrameScene = document.querySelector('a-scene');
aFrameScene.pause();

let activeScene = 1;

const transitionHelper = new InteriorTransitionHelper(interiorButton);
interiorButton.addEventListener('click', () => {
    if (transitionHelper.isTransition()) {
        return;
    }
    transitionHelper.startTransition();
    if (activeScene === 1) {
        ARButtonPulse.classList.add('hidden');
        setTimeout(() => {
            activeScene = 2;
            aFrameScene.style.opacity = '1';
            aFrameScene.style.height = 'auto';
            aFrameScene.style.pointerEvents = 'auto';
            aFrameScene.play();
            transitionHelper.endTransition();
        }, 1500);
    } else {
        setTimeout(() => {
            activeScene = 1;
            aFrameScene.style.opacity = '0';
            aFrameScene.style.height = '0';
            aFrameScene.style.pointerEvents = 'none';
            aFrameScene.pause();
            transitionHelper.endTransition();
        }, 1500);
        setTimeout(() => {
            ARButtonPulse.classList.remove('hidden');
        }, 3100);
    }
});