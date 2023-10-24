import { GallerySwitchHook } from "../../helpers/gallerySwitchHook";
import { InteriorTransitionHelper } from "../../helpers/interiorTransitionHelper";

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
// const screenHeight = window.innerHeight;

let isAutoParkVisible = true; // Флаг для отслеживания состояния видимости секции .auto_park

// Добавляем обработчик события на весь документ
document.addEventListener('mousedown', (event) => {
    const target = event.target;

    // Проверяем, является ли целевой элемент клика блоком .tech_spec или .auto_park_wrapper или их потомком
    const isInsideTechSpec = target.closest('.tech_spec');
    const isInsideAutoParkWrapper = target.closest('.auto_park_wrapper');

    if (!isInsideTechSpec) {
        // Скрываем блок .tech_spec__visible и выполняем необходимые действия
        techSection.classList.add('active');
        visibleBlockMission.classList.add('hidden');
        visibleBlockOutfit.classList.add('hidden');
        techSpecWrapper.classList.add('hidden');
        techSpecGridWrapper.classList.add('hidden');
        techSpecWrapperText.classList.add('hidden');
        visibleDescr.classList.add('hidden');
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
    visibleBlockMission.classList.toggle('hidden');
    visibleBlockOutfit.classList.toggle('hidden');
    techSpecWrapper.classList.toggle('hidden');
    techSpecGridWrapper.classList.toggle('hidden');
    techSpecWrapperText.classList.toggle('hidden');
    visibleDescr.classList.toggle('hidden');

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
        visibleBlockMission.classList.add('hidden');
        visibleBlockOutfit.classList.add('hidden');
        techSpecWrapper.classList.add('hidden');
        techSpecGridWrapper.classList.add('hidden');
        techSpecWrapperText.classList.add('hidden');
        visibleDescr.classList.add('hidden');
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
interior.addEventListener('click', () => {
    if (transitionHelper.isTextChangedOnTransition()) {
        return;
    }
    // Переключаем класс, чтобы показать/скрыть блок .tech_spec__visible с плавной анимацией
    techSection.classList.toggle('hidden');
    autoSection.classList.toggle('hidden');
    sliderButton.forEach(e => {
        e.classList.toggle('hidden');
    });

    // Получаем значение атрибута id элемента interior
    const idValue = interior.getAttribute('id');

    if (interiorText.textContent === 'В салон') {
        interiorText.textContent = 'В гараж';

        // Применяем класс в зависимости от значения атрибута id
        if (idValue === 'amarok') {
            interior.classList.toggle('garage_amarok');
        } else if (idValue === 'ford') {
            interior.classList.toggle('garage_ford');
        } else if (idValue === 'solaris_green') {
            interior.classList.toggle('garage_solaris_green');
        } else if (idValue === 'solaris_gray') {
            interior.classList.toggle('garage_solaris_gray');
        } else if (idValue === 'bus') {
            interior.classList.toggle('garage_bus');
        }
    } else {
        interiorText.textContent = 'В салон';

        // Убираем классы в зависимости от значения атрибута id
        if (idValue === 'amarok') {
            interior.classList.toggle('garage_amarok');
        } else if (idValue === 'ford') {
            interior.classList.toggle('garage_ford');
        } else if (idValue === 'solaris_green') {
            interior.classList.toggle('garage_solaris_green');
        } else if (idValue === 'solaris_gray') {
            interior.classList.toggle('garage_solaris_gray');
        } else if (idValue === 'bus') {
            interior.classList.toggle('garage_bus');
        }
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