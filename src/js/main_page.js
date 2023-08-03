document.addEventListener("DOMContentLoaded", function() {
    // Получаем все элементы с классом "burger-menu"
    const burgerMenus = document.querySelectorAll(".burger-menu");
    const burgerClose = document.querySelectorAll(".burger-menu .bar");

    // Добавляем обработчик события "click" для каждого элемента
    burgerMenus.forEach((burgerMenu) => {
        burgerMenu.addEventListener("click", function () {
            // Добавляем/удаляем классы "burger-menu--opened" и "burger-menu--closed"
            this.classList.toggle("burger-menu--opened");
            this.classList.toggle("burger-menu--closed");
            burgerClose.forEach((e) => {
                e.classList.toggle("close_width");
            });
        });
    });

    // Функция для плавного скроллинга к якорю
    function smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            const offset = element.getBoundingClientRect().top + window.scrollX;

            window.scroll({
                top: offset,
                behavior: 'smooth'
            });
        }
    }


    // Появление и скрытие меню сайта
    let bodyOverflow = document.querySelector('body.main');
    let menuBtn = document.querySelector('.header__menu');
    let menu = document.querySelector('.menu');
    menuBtn.addEventListener('click', function(){
        menu.classList.toggle('active');
        bodyOverflow.classList.toggle('overflow');
    })


    // Замена цвета у других ссылок при наведении на одну из ниих
    const navigationLinks = document.querySelectorAll(".menu_navigation-link");

    function addHoveredClass(link) {
        link.classList.add("hovered");
    }

    function removeHoveredClass() {
        navigationLinks.forEach(link => link.classList.remove("hovered"));
    }

    function handleLinkHover(event) {
        const hoveredLink = event.target;
        removeHoveredClass();

        let prevSibling = hoveredLink.parentElement.previousElementSibling;
        while (prevSibling) {
            if (prevSibling.querySelector(".menu_navigation-link")) {
                addHoveredClass(prevSibling.querySelector(".menu_navigation-link"));
            }
            prevSibling = prevSibling.previousElementSibling;
        }

        let nextSibling = hoveredLink.parentElement.nextElementSibling;
        while (nextSibling) {
            if (nextSibling.querySelector(".menu_navigation-link")) {
                addHoveredClass(nextSibling.querySelector(".menu_navigation-link"));
            }
            nextSibling = nextSibling.nextElementSibling;
        }
    }

    function handleLinkLeave() {
        removeHoveredClass();
    }

    // Измененная функция обработчика события для ссылок
    function handleLinkCloseMenu(event) {
        event.preventDefault();
        const target = event.target.getAttribute("href"); // Получаем атрибут href якорной ссылки
        menu.classList.toggle('active');
        bodyOverflow.classList.toggle('overflow');
        burgerMenus.forEach((burgerMenu) => {
            burgerMenu.classList.remove("burger-menu--opened");
            burgerMenu.classList.add("burger-menu--closed");
            burgerClose.forEach((e) => {
                e.classList.remove("close_width");
            });
        });
        // Вызываем функцию плавного скроллинга к якорю
        smoothScrollTo(target);
    }

    navigationLinks.forEach(link => {
        link.addEventListener("mouseover", handleLinkHover);
        link.addEventListener("mouseout", handleLinkLeave);
        link.addEventListener("click", handleLinkCloseMenu);
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


    // Выпадание блока Инвентарь

    const controlBlock = document.querySelector('.equipment_mobile_control');
    const skillsBlock = document.querySelector('.equipment_mobile_skills');
    const equipmentArrow = document.querySelector('.equipment_mobile_control .equipment_mobile_control-img2');

    // Скрываем блок skills по умолчанию
    skillsBlock.style.height = '0';
    equipmentArrow.style.transform = "rotate(0)";

    // Добавляем обработчик клика на controlBlock
    controlBlock.addEventListener('click', () => {
        const isSkillsVisible = skillsBlock.style.height === '100%';
        console.log(isSkillsVisible);

        if (isSkillsVisible) {
            skillsBlock.style.height = '0';
            equipmentArrow.style.transform = "rotate(0)";
        } else {
            skillsBlock.style.height = '100%';
            equipmentArrow.style.transform = "rotate(180deg)";
        }
    });

});

