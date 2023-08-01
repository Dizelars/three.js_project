// Получаем все элементы с классом "burger-menu"
const burgerMenus = document.querySelectorAll(".burger-menu");

// Добавляем обработчик события "click" для каждого элемента
burgerMenus.forEach((burgerMenu) => {
    burgerMenu.addEventListener("click", function () {
        // Добавляем/удаляем классы "burger-menu--opened" и "burger-menu--closed"
        this.classList.toggle("burger-menu--opened");
        this.classList.toggle("burger-menu--closed");
    });
});

// Swiper slider

const swiper = new Swiper('.swiper', {
    // Optional parameters
    // loop: true,
    slidesPerView: "auto",
    spaceBetween: 20,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.btn_next',
        prevEl: '.btn_prev',
    },

    // And if we need scrollbar
    // scrollbar: {
    //     el: '.swiper-scrollbar',
    // },
});

const swiper2 = new Swiper('.swiper2', {
    // Optional parameters
    // loop: true,
    slidesPerView: "auto",
    spaceBetween: 20,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination2',
    },

    // Navigation arrows
    // navigation: {
    //     nextEl: '.btn_next',
    //     prevEl: '.btn_prev',
    // },

    // And if we need scrollbar
    // scrollbar: {
    //     el: '.swiper-scrollbar',
    // },
});

const swiper3 = new Swiper('.swiper3', {
    // Optional parameters
    // loop: true,
    slidesPerView: "auto",
    spaceBetween: 20,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination3',
    },

    // Navigation arrows
    // navigation: {
    //     nextEl: '.btn_next',
    //     prevEl: '.btn_prev',
    // },

    // And if we need scrollbar
    // scrollbar: {
    //     el: '.swiper-scrollbar',
    // },
});


// Получаем ссылки на элементы
const controlBlock = document.querySelector('.equipment_mobile_control');
const skillsBlock = document.querySelector('.equipment_mobile_skills');
const equipmentMobileContainer = document.querySelector('.equipment_mobile');
const helpDeskGrid = document.querySelector('.help_desk_grid-wrapper');

// Скрываем блок skills по умолчанию
skillsBlock.style.display = 'none';

if (window.innerWidth <= 768) {
    equipmentMobileContainer.style.gridTemplateRows = '84px auto';
    helpDeskGrid.style.gridTemplateRows = '28px 388px 72px 84px';
}

// Добавляем обработчик клика на controlBlock
controlBlock.addEventListener('click', () => {
    // Проверяем текущее состояние блока skills
    const isSkillsVisible = skillsBlock.style.display !== 'none';

    // В зависимости от состояния, скрываем или показываем блок skills
    if (isSkillsVisible) {
        // Скрываем блок с использованием visibility: hidden
        skillsBlock.style.display = 'none';

        // Изменяем стили родительского grid контейнера
        equipmentMobileContainer.style.gridTemplateRows = '84px 0';
        helpDeskGrid.style.gridTemplateRows = '28px 388px 72px 84px';
    } else {
        // Показываем блок с использованием visibility: visible и display: grid
        skillsBlock.style.visibility = 'visible';
        skillsBlock.style.display = 'grid';

        // Восстанавливаем стили родительского grid контейнера
        equipmentMobileContainer.style.gridTemplateRows = '84px auto';
        helpDeskGrid.style.gridTemplateRows = '28px 388px 72px 810px';
    }
});

// Функция для обновления параметров gridTemplateRows в зависимости от ширины экрана
function updateGridHeight() {
    if (window.innerWidth <= 440) {
        equipmentMobileContainer.style.gridTemplateRows = '84px auto';
        helpDeskGrid.style.gridTemplateRows = '30px 332px 115px 940px 388px';
    }
    // } else {
    //     equipmentMobileContainer.style.gridTemplateRows = '84px auto';
    //     helpDeskGrid.style.gridTemplateRows = '28px 388px 72px 810px';
    // }
}

// Добавляем обработчик на изменение размеров окна браузера
window.addEventListener('resize', updateGridHeight);