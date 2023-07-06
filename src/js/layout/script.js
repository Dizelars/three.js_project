const visibleBlock = document.querySelector('.tech_spec__visible');
const visibleDescr = document.querySelector('.tech_spec__description');
const visibleSlide = document.querySelector('.auto_park_wrapper');
const sliderButton = document.querySelectorAll('.auto_park_slider-button button');
const techSpecWrapperText = document.querySelector('.tech_spec__titles');
const buttontech = document.querySelector('.tech_spec__btn');
const buttonText = document.querySelector('.tech_spec__btn span');
const buttonIcon = document.querySelector('.tech_spec__btn img');
const buttontechcopied = document.querySelector('.tech_spec__btn-copied');
const autoParkSection = document.querySelector('.auto_park');
const autoParkControl = document.querySelector('.auto_park__control');
const autoParkSlider = document.querySelector('.auto_park_slider');
const buttonIcon2 = document.querySelector('.auto_park__control img');
const interior = document.querySelector('.tech_spec__interior');
const gallery_toggle = document.querySelectorAll('.gallery_item');
const interiorText = document.querySelector('.tech_spec__interior-text');
const interiorBlock = document.querySelector('.tech_spec__interior');
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

if (screenWidth === 540 && screenHeight === 720) {
    interior.style.top = '500px';
} else if (screenWidth === 414 && screenHeight === 896) {
    interior.style.top = '676px';
} else if (screenWidth === 412 && (screenHeight === 914 || screenHeight === 915)) {
    interior.style.top = '696px';
} else if (screenWidth === 390 && screenHeight === 844) {
    interior.style.top = '625px';
} else if (screenWidth === 375 && screenHeight === 667) {
    interior.style.top = '448px';
} else if (screenWidth === 360 && screenHeight === 740) {
    interior.style.top = '522px';
}



let isAutoParkVisible = true; // Флаг для отслеживания состояния видимости секции .auto_park

// Добавляем обработчик события на весь документ
document.addEventListener('mousedown', (event) => {
    const target = event.target;

    // Проверяем, является ли целевой элемент клика блоком .tech_spec или .auto_park_wrapper или их потомком
    const isInsideTechSpec = target.closest('.tech_spec');
    const isInsideAutoParkWrapper = target.closest('.auto_park_wrapper');

    if (!isInsideTechSpec) {
        // Скрываем блок .tech_spec__visible и выполняем необходимые действия
        visibleBlock.classList.add('hidden');
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
// buttontech.addEventListener('click', () => {
//     console.log(techSpecWrapperText);
//     // Переключаем класс, чтобы показать/скрыть блок .tech_spec__visible с плавной анимацией
//     visibleBlock.classList.toggle('hidden');
//
//     if (visibleBlock.classList.contains('hidden')) {
//         buttonText.textContent = 'Подробнее';
//         buttonIcon.classList.remove('rotate');
//
//         if (window.matchMedia("(orientation: landscape)").matches) {
//             techSpecWrapperText.style.height = 'auto';
//             buttontechcopied.style.display = 'none';
//             buttontech.style.display = 'block';
//             interior.style.zIndex = 'auto';
//         }
//     } else if (!visibleBlock.classList.contains('hidden')) {
//         buttonText.textContent = 'Скрыть';
//         buttonIcon.classList.add('rotate');
//
//         if (window.matchMedia("(orientation: landscape)").matches) {
//             techSpecWrapperText.style.height = '210px';
//             buttontechcopied.style.display = 'block';
//             buttontech.style.display = 'none';
//             interior.style.zIndex = '-1';
//         }
//     }
//     // } else if (visibleBlock.classList.contains('hidden') && window.matchMedia("(orientation: landscape)").matches) {
//     //     techSpecWrapperText.style.height = 'auto';
//     //     buttontechcopied.style.display = 'none';
//     //     buttontech.style.display = 'block';
//     //     interior.style.zIndex = 'auto';
//     // } else if (!visibleBlock.classList.contains('hidden') && window.matchMedia("(orientation: landscape)").matches) {
//     //     techSpecWrapperText.style.height = '210px';
//     //     buttontechcopied.style.display = 'block';
//     //     buttontech.style.display = 'none';
//     //     interior.style.zIndex = '-1';
//     // }
//
//     // Если блок .auto_park открыт, скрываем его
//     if (!isAutoParkVisible) {
//         toggleAutoParkSection();
//     }
// });


buttontech.addEventListener('click', () => {
    console.log(techSpecWrapperText);
    // Переключаем класс, чтобы показать/скрыть блок .tech_spec__visible с плавной анимацией
    visibleBlock.classList.toggle('hidden');

    if (visibleBlock.classList.contains('hidden')) {
        buttonText.textContent = 'Подробнее';
        buttonIcon.classList.remove('rotate');

        if (window.matchMedia("(orientation: landscape)").matches && screenWidth <= 900) {
            techSpecWrapperText.style.height = 'auto';
            buttontechcopied.style.display = 'none';
            buttontech.style.display = 'block';
            interior.style.zIndex = 'auto';
        }
    } else {
        buttonText.textContent = 'Скрыть';
        buttonIcon.classList.add('rotate');

        if (window.matchMedia("(orientation: landscape)").matches && screenWidth <= 900) {
            techSpecWrapperText.style.height = '210px';
            buttontechcopied.style.display = 'block';
            buttontech.style.display = 'none';
            interior.style.zIndex = '-1';
        }
    }

    // Если блок .auto_park открыт, скрываем его
    if (!isAutoParkVisible) {
        toggleAutoParkSection();
    }
});




buttontechcopied.addEventListener('click', () => {
    buttontech.click();
});

// Обработчик события клика на блок .auto_park__control
autoParkControl.addEventListener('click', () => {
    // Скрываем блок .tech_spec__visible, если он открыт
    if (!visibleBlock.classList.contains('hidden')) {
        visibleBlock.classList.add('hidden');
        buttonText.textContent = 'Подробнее';
        buttonIcon.classList.remove('rotate');
    } else if (visibleBlock.classList.contains('hidden') && (window.matchMedia("(orientation: landscape)").matches)) {
        techSpecWrapperText.style.height = 'auto';
        buttontechcopied.style.display = 'none';
        buttontech.style.display = 'block';
        interior.style.zIndex = 'none';
    }

    toggleAutoParkSection();
});

// Функция для скрытия/отображения блока .auto_park
// function toggleAutoParkSection() {
//     if (isAutoParkVisible) {
//         // Если секция .auto_park видима, скрываем ее
//         // const sliderHeight = autoParkSlider.offsetHeight;
//         autoParkSection.style.transform = `translateY(0)`;
//         buttonIcon2.classList.remove('rotate');
//     } else {
//         // Если секция .auto_park скрыта, возвращаем ее обратно
//         autoParkSection.style.transform = 'translateY(100%)';
//         buttonIcon2.classList.add('rotate');
//     }
//
//     // Инвертируем флаг видимости секции .auto_park
//     isAutoParkVisible = !isAutoParkVisible;
// }
function toggleAutoParkSection() {
    if (isAutoParkVisible) {
        // Если секция .auto_park видима, скрываем ее
        autoParkSection.style.transform = 'translateY(0)';
        buttonIcon2.classList.remove('rotate');
    } else {
        // Если секция .auto_park скрыта, возвращаем ее обратно
        if (screenWidth <= 391 && screenHeight <= 845) {
            autoParkSection.style.transform = 'translateY(72%)';
            autoParkSection.style.margin = '0';
        } else {
            autoParkSection.style.transform = 'translateY(100%)';
        }
        buttonIcon2.classList.add('rotate');
    }

    // Инвертируем флаг видимости секции .auto_park
    isAutoParkVisible = !isAutoParkVisible;
}

interior.addEventListener('click', () => {
    // Переключаем класс, чтобы показать/скрыть блок .tech_spec__visible с плавной анимацией
    visibleDescr.classList.toggle('hidden');
    visibleSlide.classList.toggle('hidden');
    sliderButton.forEach(e => {
        e.classList.toggle('hidden');
    });
    if (interiorText.textContent === 'В салон') {
        interiorText.textContent = 'В гараж';
        // interiorBlock.style.background = 'url("../img/layout/slider/slide_amarok.png") no-repeat center/cover';
        interiorBlock.classList.toggle('garage');
    } else {
        interiorText.textContent = 'В салон';
        // interiorBlock.style.background = 'url("../img/layout/amarok_prew.jpg") no-repeat center/cover';
        interiorBlock.classList.toggle('garage');
    }
});

gallery_toggle.forEach((e) => {
    e.addEventListener('click', () => {
        gallery_toggle.forEach((el) => el.classList.remove('active'));
        e.classList.add('active');
    });
});







// Слайдер

// Получаем элементы слайдера
const slider = document.querySelector('.auto_park_slider');
const sliderWrapper = slider.querySelector('.auto_park_slider-wrapper');
const prevButton = slider.querySelector('.prev_button');
const nextButton = slider.querySelector('.next_button');

// Получаем все слайды внутри слайдера
const slides = sliderWrapper.querySelectorAll('.gallery_item');

// Устанавливаем начальное значение индекса текущего слайда
let currentIndex = 0;

// Проверяем и скрываем кнопку предыдущего слайда, если текущий слайд первый
function checkPrevButton() {
    if (currentIndex === 0) {
        prevButton.style.visibility = 'hidden';
    } else {
        prevButton.style.visibility = 'visible';
    }
}

// Проверяем и скрываем кнопку следующего слайда, если текущий слайд последний
function checkNextButton() {
    if (currentIndex === slides.length - 1) {
        nextButton.style.visibility = 'hidden';
    } else {
        nextButton.style.visibility = 'visible';
    }
}

// Перемещаемся на слайд влево
function slideToPrev() {
    if (currentIndex > 0) {
        currentIndex--;
        const slide = slides[currentIndex];
        const slideWidth = slide.offsetWidth + parseInt(getComputedStyle(slide).marginLeft) + parseInt(getComputedStyle(slide).marginRight);
        const translateAmount = -slideWidth * currentIndex;
        sliderWrapper.style.transform = `translate3d(${translateAmount}px, 0, 0)`;
    }
    checkPrevButton();
    checkNextButton();
}

// Перемещаемся на слайд вправо
// function slideToNext() {
//     if (currentIndex < slides.length - 1) {
//         currentIndex++;
//         const slide = slides[currentIndex];
//         const slideWidth = slide.offsetWidth + parseInt(getComputedStyle(slide).marginLeft) + parseInt(getComputedStyle(slide).marginRight);
//         const translateAmount = -slideWidth * currentIndex;
//         sliderWrapper.style.transform = `translate3d(${translateAmount}px, 0, 0)`;
//     }
//     checkPrevButton();
//     checkNextButton();
//
//     // Проверяем, является ли текущий слайд последним
//     if (currentIndex === slides.length - 1) {
//         // Если текущий слайд последний, скрываем кнопку следующего слайда
//         nextButton.style.visibility = 'hidden';
//     }
// }


// Перемещаемся на слайд вправо
function slideToNext() {
    if (currentIndex < slides.length - 1) {
        currentIndex++;
        const slide = slides[currentIndex];
        const slideWidth = slide.offsetWidth + parseInt(getComputedStyle(slide).marginLeft) + parseInt(getComputedStyle(slide).marginRight);
        const translateAmount = -slideWidth * currentIndex;
        sliderWrapper.style.transform = `translate3d(${translateAmount}px, 0, 0)`;
    }
    checkPrevButton();
    checkNextButton();

    // Проверяем, является ли текущий слайд последним
    if (currentIndex === slides.length - 1) {
        // Если текущий слайд последний, скрываем кнопку следующего слайда
        nextButton.style.visibility = 'hidden';
    }

    // Проверяем видимость последнего слайда
    const lastSlide = slides[slides.length - 1];
    const slideRect = lastSlide.getBoundingClientRect();
    const sliderRect = slider.getBoundingClientRect();

    if (slideRect.right <= sliderRect.right) {
        nextButton.style.visibility = 'hidden';
    }
}



// Добавляем обработчики событий на кнопки
prevButton.addEventListener('click', slideToPrev);
nextButton.addEventListener('click', slideToNext);

// При загрузке страницы проверяем состояние кнопок
checkPrevButton();
checkNextButton();
if (currentIndex === slides.length - 1) {
    nextButton.style.visibility = 'hidden';
}