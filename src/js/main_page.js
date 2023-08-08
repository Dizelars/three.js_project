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
            const offset = element.getBoundingClientRect().top + window.scrollY;

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
    let blur = document.querySelector('.block_blur');
    // let menuContainer = document.querySelector('.menu .container_main');
    menuBtn.addEventListener('click', function(){
        menu.classList.toggle('active');
        bodyOverflow.classList.toggle('overflow');
        blur.classList.toggle('active');
        // menuContainer.classList.toggle('blur');
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
        blur.classList.toggle('active');
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


    // Получаем ссылки футера для плавного скролла
    const footerLinks = document.querySelectorAll('footer.footer_main .footer-menu-links a');
    footerLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Предотвращаем переход по ссылке
            const target2 = link.getAttribute("href"); // Используем link.getAttribute("href") вместо link.target.getAttribute("href")
            smoothScrollTo(target2);
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
    });


    // Выпадание блока Инвентарь

    const controlBlock = document.querySelector('.equipment_mobile_control');
    const skillsBlock = document.querySelector('.equipment_mobile_skills');
    const equipmentArrow = document.querySelector('.equipment_mobile_control .equipment_mobile_control-img2');

    // Скрываем блок skills по умолчанию
    skillsBlock.style.height = '0';
    skillsBlock.style.padding = '0';
    equipmentArrow.style.transform = "rotate(0)";

    // Добавляем обработчик клика на controlBlock
    controlBlock.addEventListener('click', () => {
        const isSkillsVisible = skillsBlock.style.height === '100%';
        // console.log(isSkillsVisible);

        if (isSkillsVisible) {
            skillsBlock.style.height = '0';
            skillsBlock.style.padding = '0';
            equipmentArrow.style.transform = "rotate(0)";
        } else {
            skillsBlock.style.height = '100%';
            skillsBlock.style.padding = '50px 0 20px 0';
            equipmentArrow.style.transform = "rotate(180deg)";
        }
    });



    // Анимация перемещения градиентов при скролле

    // Функция для проверки, находится ли элемент в области видимости
    // function isElementInViewport(element) {
    //     const rect = element.getBoundingClientRect();
    //     return (
    //         rect.top >= 0 &&
    //         rect.left >= 0 &&
    //         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    //         rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    //     );
    // }

    // // Функция для перемещения псевдоэлемента before при скролле страницы, когда секция видима
    // function moveBeforeElement() {
    //     const section = document.querySelector('section.traffic_patrol');
    //
    //     // Проверяем, находится ли секция в области видимости
    //     if (isElementInViewport(section)) {
    //         // Получаем высоту и ширину секции и текущую позицию скролла
    //         const sectionHeight = section.offsetHeight;
    //         const sectionWidth = section.offsetWidth;
    //         const scrollPosition = window.scrollY;
    //
    //         // Вычисляем новые позиции элемента before в зависимости от скролла страницы
    //         const newPositionX = (scrollPosition / sectionHeight) * 100;
    //         const newPositionY = (scrollPosition / sectionWidth) * 100;
    //
    //         // Изменяем свойства top и right для анимации перемещения псевдоэлемента before
    //         section.style.setProperty('--before-top', `${newPositionY}%`);
    //         section.style.setProperty('--before-right', `${newPositionX}%`);
    //     }
    // }
    //
    // // Обработчик события скролла, который вызывает функцию перемещения псевдоэлемента before
    // window.addEventListener('scroll', moveBeforeElement);
    //
    // // Вызов функции перемещения псевдоэлемента при загрузке страницы, чтобы элемент начинал перемещаться сразу, если секция видима
    // moveBeforeElement();



    // Функция, которая перемещает псевдоэлемент "before" внутри секции
    function moveBeforeElement() {
        const section = document.querySelector('section.traffic_patrol');

        // Получаем высоту и положение секции относительно окна просмотра
        const sectionRect = section.getBoundingClientRect();
        const sectionHeight = section.offsetHeight;
        const sectionTop = sectionRect.top;

        // Вычисляем текущую позицию скролла и процент видимости секции
        const scrollPosition = window.scrollY;
        const visibilityPercent = Math.min(
            (scrollPosition - sectionTop) / sectionHeight * 100,
            100
        );

        // Вычисляем новые позиции элемента before в зависимости от скролла страницы и видимости секции
        let newPositionX, newPositionY;
        if (scrollPosition > lastScrollPosition) {
            // Прокрутка вниз
            newPositionX = 100 - visibilityPercent;
            newPositionY = 100 - visibilityPercent;
        } else {
            // Прокрутка вверх
            newPositionX = visibilityPercent;
            newPositionY = visibilityPercent;
        }

        // Изменяем свойства top и right для анимации перемещения псевдоэлемента "before"
        section.style.setProperty('--before-top', `${newPositionY}%`);
        section.style.setProperty('--before-right', `${newPositionX}%`);

        // Сохраняем текущую позицию скролла
        lastScrollPosition = scrollPosition;
    }

// Переменная для хранения последней позиции скролла (используется для определения направления прокрутки)
    let lastScrollPosition = 0;

// Обработчик события скролла, который вызывает функцию перемещения псевдоэлемента "before"
    window.addEventListener('scroll', moveBeforeElement);

// Вызов функции перемещения псевдоэлемента при загрузке страницы, чтобы элемент начинал перемещаться сразу, если секция видима
    moveBeforeElement();


// Что можно еще сделать с элементом, который двигается?
//
// Изменить анимацию: В данном коде элемент "before" перемещается с помощью изменения свойств "top" и "right". Вы можете экспериментировать с другими свойствами, такими как "transform" или "opacity", чтобы создать различные анимационные эффекты.
//
// Добавить разные движения: Вместо линейного движения элемента вы можете добавить кривые или инерционное движение для более естественного и интересного эффекта.
//
// Изменить направление движения: В данном коде элемент двигается по диагонали в зависимости от направления прокрутки. Вы можете изменить направление движения элемента, чтобы он перемещался горизонтально или вертикально в зависимости от вашего предпочтения.
//
// Добавить переходы: Вы можете добавить плавные переходы, чтобы анимация перемещения выглядела более плавно и эффектно.
//
// Изменить условия анимации: В данном коде элемент перемещается только в пределах видимости секции. Вы можете изменить условия анимации, чтобы элемент двигался по-разному в зависимости от его положения на странице или других параметров.
//
// Создать параллакс-эффект: Если у вас есть несколько элементов на странице, которые двигаются при прокрутке, вы можете использовать различные коэффициенты движения, чтобы создать эффект параллакса.
//
// Использовать другие события: Вместо события "scroll" вы можете использовать другие события, такие как "mousemove" или "click", чтобы анимировать элементы в зависимости от действий пользователя.
//
// Использовать другие элементы: Вместо псевдоэлемента "before" вы можете анимировать реальные элементы DOM, добавив их динамически или управляя их стилями и позицией.
//
// Ограничить анимацию: Вы можете добавить условия, чтобы анимация не происходила, если элемент находится за пределами определенной области или видимости.
//
// Настроить скорость анимации: Вы можете регулировать скорость анимации, добавляя трансишены, изменяя интервалы обновления или используя CSS-анимации.


});

