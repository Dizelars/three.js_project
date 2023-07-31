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
