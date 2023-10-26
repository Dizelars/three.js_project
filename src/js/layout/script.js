import {GallerySwitchHook} from "../../helpers/gallerySwitchHook";
import {InteriorTransitionHelper} from "../../helpers/interiorTransitionHelper";

const techSection = document.querySelector('section.tech_spec');
const autoSection = document.querySelector('section.auto_park');
const techSpecWrapper = document.querySelector('section.tech_spec .tech_spec__wrapper');
const visibleBlockMission = document.querySelector('.tech_spec__mission');
const visibleBlockOutfit = document.querySelector('.tech_spec__outfit');
const techSpecGridWrapper = document.querySelector('.tech_spec__description-grid_wrapper');
const visibleDescr = document.querySelector('.tech_spec__description');
const sliderButton = document.querySelectorAll('.auto_park_slider-button button');
const techSpecWrapperText = document.querySelector('.tech_spec__titles');
const buttontech = document.querySelector('.tech_spec__btn');
const buttonText = document.querySelector('.tech_spec__btn span');
const buttonIcon = document.querySelector('.tech_spec__btn img');
const autoParkSection = document.querySelector('.auto_park');
const autoParkControl = document.querySelector('.auto_park__control');
const buttonIcon2 = document.querySelector('.auto_park__control img');
const interior = document.querySelector('.tech_spec__interior');
const gallery_toggle = document.querySelectorAll('.gallery_item');
const interiorText = document.querySelector('.tech_spec__interior-text');
const screenWidth = window.innerWidth;

const overlay = document.getElementById('overlay');
let VectaryIframe = document.getElementById('VectaryIframe');
// const screenHeight = window.innerHeight;

document.addEventListener("DOMContentLoaded", () => {
    // Установка высоты iframe после загрузки страници

    let headerHeight = document.querySelector('header.header');
    let headerHeightValue = headerHeight.clientHeight;
    VectaryIframe.style.height = `calc(100vh - ${headerHeightValue - 2}px)`;

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
    };

    let VectaryIframeClass = VectaryIframe.classList[0];
    // Получите текущую ширину экрана
    let screenWidth = window.innerWidth;

    if (screenWidth >= 700 && screenWidth <= 1200) {
        VectaryIframe.src = IframeObject[VectaryIframeClass].AR_OFF;
    } else {
        VectaryIframe.src = IframeObject[VectaryIframeClass].AR_ON;
    }


    // const overlay = document.getElementById('overlay');
    //
    // interior.addEventListener('click', () => {
    //     VectaryIframe.classList.toggle('active');
    //     overlay.classList.toggle('active');
    // });

});


let isAutoParkVisible = true; // Флаг для отслеживания состояния видимости секции .auto_park

function toggleElements(action) {
    const elements = [
        visibleBlockMission,
        visibleBlockOutfit,
        techSpecWrapper,
        techSpecGridWrapper,
        techSpecWrapperText,
        visibleDescr
    ];

    elements.forEach(element => {
        if (action === 'toggle') {
            element.classList.toggle('hidden');
        } else if (action === 'add') {
            element.classList.add('hidden');
        }
    });
}

// Добавляем обработчик события на весь документ
document.addEventListener('mousedown', (event) => {
    const target = event.target;

    // Проверяем, является ли целевой элемент клика блоком .tech_spec или .auto_park_wrapper или их потомком
    const isInsideTechSpec = target.closest('.tech_spec');
    const isInsideAutoParkWrapper = target.closest('.auto_park_wrapper');

    if (!isInsideTechSpec) {
        // Скрываем блок .tech_spec__visible и выполняем необходимые действия
        techSection.classList.add('active');
        toggleElements('add');
        buttonText.textContent = 'Подробнее';
        buttonIcon.classList.remove('rotate');
    }

    if (!isInsideAutoParkWrapper) {
        // Скрываем блок .auto_park и выполняем необходимые действия
        if (!isAutoParkVisible) {
            toggleAutoParkSection();
        }
    }
});

// Добавляем обработчик события на клик по кнопке .tech_spec__btn
buttontech.addEventListener('click', () => {
    // Переключаем класс, чтобы показать/скрыть блок .tech_spec__visible с плавной анимацией
    techSection.classList.toggle('active');
    toggleElements('toggle');

    if (visibleBlockMission.classList.contains('hidden')) {
        buttonText.textContent = 'Подробнее';
        buttonIcon.classList.remove('rotate');
    } else {
        buttonText.textContent = 'Скрыть';
        buttonIcon.classList.add('rotate');
    }
    // Если блок .auto_park открыт, скрываем его
    if (!isAutoParkVisible) {
        toggleAutoParkSection();
    }
});

// Обработчик события клика на блок .auto_park__control
autoParkControl.addEventListener('click', () => {
    // Скрываем блок .tech_spec__visible, если он открыт
    if (!visibleBlockMission.classList.contains('hidden')) {
        techSection.classList.add('active');
        toggleElements('add');
        buttonText.textContent = 'Подробнее';
        buttonIcon.classList.remove('rotate');
    } else if (visibleBlockMission.classList.contains('hidden') && window.matchMedia("(orientation: landscape)").matches) {
        techSpecWrapperText.style.height = 'auto';
        buttontech.style.display = 'block';
        interior.style.zIndex = 'none';
    }

    toggleAutoParkSection();
});

function toggleAutoParkSection() {
    if (isAutoParkVisible) {
        // Если секция .auto_park видима, скрываем ее
        if (screenWidth <= 576 || (screenWidth <= 900 && window.matchMedia("(orientation: landscape)").matches)) {
            autoParkSection.style.transform = 'translateY(20px)';
        } else {
            autoParkSection.style.transform = 'translateY(0)';
        }
        buttonIcon2.classList.remove('rotate');
    } else {
        autoParkSection.style.transform = 'translateY(74%)';
        buttonIcon2.classList.add('rotate');
    }

    // Инвертируем флаг видимости секции .auto_park
    isAutoParkVisible = !isAutoParkVisible;
}

const transitionHelper = new InteriorTransitionHelper(interior);
const idToClassMap = {
    'amarok': 'garage_amarok',
    'ford': 'garage_ford',
    'solaris_green': 'garage_solaris_green',
    'solaris_gray': 'garage_solaris_gray',
    'bus': 'garage_bus',
};

interior.addEventListener('click', () => {
    if (transitionHelper.isTextChangedOnTransition()) {
        return;
    }

    VectaryIframe.classList.toggle('active');
    overlay.classList.toggle('active');
    setTimeout(() => {
        techSection.classList.toggle('hidden');
        autoSection.classList.toggle('hidden');
        VectaryIframe.classList.toggle('active');
        overlay.classList.toggle('active');
        sliderButton.forEach(e => {
            e.classList.toggle('hidden');
        });
    }, 1500);

    const idValue = interior.getAttribute('id');
    const interiorTextContent = interiorText.textContent;
    const classToAdd = idToClassMap[idValue];

    if (interiorTextContent === 'В салон') {
        interiorText.textContent = 'В гараж';
    } else {
        interiorText.textContent = 'В салон';
    }

    if (classToAdd) {
        interior.classList.toggle(classToAdd);
    }

    transitionHelper.onTextChange();
});

gallery_toggle.forEach((e) => {
    e.addEventListener('click', () => {
        gallery_toggle.forEach((el) => el.classList.remove('active'));
        e.classList.add('active');
    });
});

new GallerySwitchHook({});