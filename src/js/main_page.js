import { isAutoplayVideoScreenSize, isElementInViewport, isElementVisible, observeElementVisibility } from "../utils";

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
    const menuAnimationAdd = document.querySelectorAll('.menu .menu_navigation .menu_navigation-list li[class^="menu_navigation-"], .menu .menu-media a[class^="media-"]');
    menuBtn.addEventListener('click', function(){
        menu.classList.toggle('active');
        bodyOverflow.classList.toggle('overflow');
        blur.classList.toggle('active');
        menuAnimationAdd.forEach(e => {
            e.classList.toggle('animation');
        });
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




    // Размер видео в карточках такой же как размер картинок.
    // Получаем элементы изображения и видео
    // const cardMediaWrapper = document.querySelectorAll('.garage_model_card .slid_img');
    //
    // cardMediaWrapper.forEach((e) => {
    //     let img = e.querySelector('.menu_preview-img');
    //     let video = e.querySelector('.menu_preview-video');
    //
    //     // Проверяем, загружено ли изображение
    //     if (img.complete && img.naturalWidth > 0) {
    //         setTimeout(() => {
    //             applyChanges();
    //         }, 500);
    //     } else {
    //         // Слушаем событие загрузки изображения
    //         img.addEventListener('load', applyChanges);
    //     }
    //
    //     function applyChanges() {
    //         // Устанавливаем максимальную ширину и высоту видео с точностью до сотых
    //         video.style.maxWidth = `${img.offsetWidth}px`;
    //         video.style.maxHeight = `${img.offsetHeight}px`;
    //
    //         // Убираем обработчик события, чтобы избежать многократного вызова
    //         img.removeEventListener('load', applyChanges);
    //     }
    // });




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
        menuAnimationAdd.forEach(e => {
            e.classList.toggle('animation');
        });
        // Вызываем функцию плавного скроллинга к якорю
        smoothScrollTo(target);
    }

    navigationLinks.forEach(link => {
        link.addEventListener("mouseover", handleLinkHover);
        link.addEventListener("mouseout", handleLinkLeave);
        link.addEventListener("click", handleLinkCloseMenu);
    });




// ПОЯВЛЕНИЕ видео превью при наведении на список меню.
    // Получаем все элементы списка
    const menuItems = document.querySelectorAll('.menu_navigation-item');

    // Для каждого элемента списка добавляем обработчики событий
    menuItems.forEach(menuItem => {
        const previewBlock = menuItem.querySelector('.menu_preview-block');
        const previewVideo = menuItem.querySelector('.menu_preview-block .menu_preview-video');

        menuItem.addEventListener('mouseenter', () => {
            previewBlock.style.display = 'block';
            previewVideo.play();
            menuItem.style.zIndex = '5';
        });

        menuItem.addEventListener('mouseleave', () => {
            previewBlock.style.display = 'none';
            previewVideo.pause();
            previewVideo.currentTime = 0;
            menuItem.style.zIndex = 'unset';
        });

        menuItem.addEventListener('mousemove', (event) => {
            const xRelativeToItem = event.clientX - menuItem.getBoundingClientRect().left;
            const yRelativeToItem = event.clientY - menuItem.getBoundingClientRect().top;
            const previewBlockWidth = previewBlock.offsetWidth;
            const previewBlockHeight = previewBlock.offsetHeight;

            const x = xRelativeToItem - previewBlockWidth / 2; // Центрирование по X относительно курсора
            const y = yRelativeToItem - previewBlockHeight - 10; // Смещение чуть выше курсора

            previewBlock.style.left = x + 'px';
            previewBlock.style.top = y + 'px';
        });
    });



    // ВИДЕО при ховере на карточку .garage_model_card
    const modelCards = document.querySelectorAll('.garage_model_card');

    if (isAutoplayVideoScreenSize()) {
        setInterval(() => {
            modelCards.forEach(card => {
                let modelCardVideo = card.querySelector('.slid_img .menu_preview-video');
                let mediaWrap = card.querySelector('.garage_model_card .slid_img');
                let modelCardImage = card.querySelector('.garage_model_card .slid_img picture');
                // Так как метод вызывается в интервале, стоит оптимизировать 2 вызова getBoundingClientRect в методах на один, передавая например опционально в методы проверки готовый rect
                // if (isElementVisible(card) && isElementInViewport(card)) {
                //     modelCardVideo.style.display = 'block';
                //     modelCardVideo.play();
                //     modelCardImage.style.display = 'none';
                //     mediaWrap.style.background = '#090909 ';
                // } else {
                //     modelCardVideo.style.display = 'none';
                //     modelCardVideo.pause();
                //     modelCardVideo.currentTime = 0;
                //     modelCardImage.style.display = 'block';
                //     mediaWrap.style.background = '';
                // }
                observeElementVisibility(
                    card,
                    () => {
                        // Действия, когда элемент видим
                        // modelCardVideo.style.display = 'block';
                        modelCardVideo.style.visibility = 'visible';
                        modelCardVideo.play();
                        // modelCardImage.style.display = 'none';
                        modelCardImage.style.visibility = 'hidden';
                        mediaWrap.style.background = '#090909 ';
                    },
                    () => {
                        // Действия, когда элемент невидим
                        // modelCardVideo.style.display = 'none';
                        modelCardVideo.style.visibility = 'hidden';
                        modelCardVideo.pause();
                        modelCardVideo.currentTime = 0;
                        // modelCardImage.style.display = 'block';
                        modelCardImage.style.visibility = 'visible';
                        mediaWrap.style.background = '';
                    }
                );
            });
        }, 200);
    } else {
        modelCards.forEach(card => {
            let modelCardVideo = card.querySelector('.slid_img .menu_preview-video');
            let mediaWrap = card.querySelector('.garage_model_card .slid_img');
            let modelCardImage = card.querySelector('.garage_model_card .slid_img picture');

            card.addEventListener('mouseenter', () => {
                // modelCardVideo.style.display = 'block';
                modelCardVideo.style.visibility = 'visible';
                modelCardVideo.play();
                // modelCardImage.style.display = 'none';
                modelCardImage.style.visibility = 'hidden';
                mediaWrap.style.background = '#090909 ';
            });

            card.addEventListener('mouseleave', () => {
                // modelCardVideo.style.display = 'none';
                modelCardVideo.style.visibility = 'hidden';
                modelCardVideo.pause();
                modelCardVideo.currentTime = 0;
                // modelCardImage.style.display = 'block';
                modelCardImage.style.visibility = 'visible';
                mediaWrap.style.background = '';
            });
        });
    }


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
        slidesPerView: 1,
        spaceBetween: 0,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.btn_next',
            prevEl: '.btn_prev',
        },

        breakpoints: {
            441: { // when window width is >= 440px
                slidesPerView: "auto",
                spaceBetween: 24,
            },
            770: { // when window width is >= 768px
                slidesPerView: "auto",
            },
        }
    });
    const swiper2 = new Swiper('.swiper2', {
        // Optional parameters
        // loop: true,
        slidesPerView: "auto",
        spaceBetween: 20,

        pagination: {
            el: '.swiper-pagination2',
        },
    });
    const swiper3 = new Swiper('.swiper3', {
        // Optional parameters
        // loop: true,
        slidesPerView: 1,
        spaceBetween: 0,

        pagination: {
            el: '.swiper-pagination3',
        },

        breakpoints: {
            440: { // when window width is >= 440px
                slidesPerView: "auto",
                spaceBetween: 20,
            },
        }
    });



    // Выпадание блока Инвентарь
    // const controlBlock = document.querySelector('.equipment_mobile_control');
    // const skillsBlock = document.querySelector('.equipment_mobile_skills');
    // const equipmentArrow = document.querySelector('.equipment_mobile_control .equipment_mobile_control-img2');
    //
    // // Скрываем блок skills по умолчанию
    // skillsBlock.style.height = '0';
    // skillsBlock.style.padding = '0';
    // equipmentArrow.style.transform = "rotate(0)";
    //
    // // Добавляем обработчик клика на controlBlock
    // controlBlock.addEventListener('click', () => {
    //     const isSkillsVisible = skillsBlock.style.height === '100%';
    //     // console.log(isSkillsVisible);
    //
    //     if (isSkillsVisible) {
    //         skillsBlock.style.height = '0';
    //         skillsBlock.style.padding = '0';
    //         equipmentArrow.style.transform = "rotate(0)";
    //
    //     } else {
    //         skillsBlock.style.height = '100%';
    //         skillsBlock.style.padding = '50px 0 20px 0';
    //         equipmentArrow.style.transform = "rotate(180deg)";
    //     }
    // });

    // const mainContent = document.querySelector('main.gradient_move');

    // function moveBeforeElement(section) {
    //     // Генерируем случайные координаты для всех четырех сторон (0-100)
    //     const newPositionTop = Math.random() * 100;
    //     const newPositionRight = Math.random() * 100;
    //     const newPositionBottom = Math.random() * 100;
    //     const newPositionLeft = Math.random() * 100;
    //
    //     // Изменяем свойства для анимации перемещения псевдоэлемента "before"
    //     section.style.setProperty('--before-top', `${newPositionTop}%`);
    //     section.style.setProperty('--before-right', `${newPositionRight}%`);
    //     section.style.setProperty('--before-bottom', `${newPositionBottom}%`);
    //     section.style.setProperty('--before-left', `${newPositionLeft}%`);
    // }

    function moveBeforeElement(section) {
        if (section.classList.contains('help_desk')) {
            const pseudoElementHeight = 600;

            // Получаем высоту секции
            const sectionHeight = section.clientHeight;

            // Генерируем случайные координаты в пределах высоты и ширины секции
            const newPositionTop = Math.random() * (sectionHeight - pseudoElementHeight);
            const newPositionBottom = newPositionTop + pseudoElementHeight;
            const newPositionRight = Math.random() * 100;
            const newPositionLeft = Math.random() * 100;

            // Изменяем свойства для анимации перемещения псевдоэлемента "before"
            section.style.setProperty('--before-top', `${newPositionTop}px`);
            section.style.setProperty('--before-bottom', `${newPositionBottom}px`);
            section.style.setProperty('--before-left', `${newPositionLeft}%`);
            section.style.setProperty('--before-right', `${newPositionRight}%`);
        } else {
            const newPositionTop = Math.random() * 100;
            const newPositionBottom = Math.random() * 100;
            const newPositionRight = Math.random() * 100;
            const newPositionLeft = Math.random() * 100;

            section.style.setProperty('--before-top', `${newPositionTop}%`);
            section.style.setProperty('--before-bottom', `${newPositionBottom}%`);
            section.style.setProperty('--before-right', `${newPositionRight}%`);
            section.style.setProperty('--before-left', `${newPositionLeft}%`);
        }
    }

// Список секций, к которым применяется анимация
    const sections = document.querySelectorAll('section.traffic_patrol, section.situation_centre, section.velo_patrol, section.help_desk');

// Обработчик для вызова функции перемещения псевдоэлемента через интервал для каждой секции
    sections.forEach(section => {
        setInterval(() => {
            moveBeforeElement(section);
        }, 1800);
    });


    // Анимация градиента в футере, изменение интенсивности при движении курсора
    const container = document.querySelector('footer.footer_main .container_main');

    container.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = container.getBoundingClientRect();
        const centerX = width / 2;
        const centerY = height / 2;
        const offsetX = e.clientX - left;
        const offsetY = e.clientY - top;
        const distance = Math.sqrt((offsetX - centerX) ** 2 + (offsetY - centerY) ** 2);

        const maxOpacity = 1.0;
        const minOpacity = 0.3;
        const opacityRange = maxOpacity - minOpacity;

        const beforeOpacity = Math.max(minOpacity, maxOpacity - (distance / centerX) * opacityRange);
        const afterOpacity = Math.max(minOpacity, (distance / centerX) * opacityRange);

        container.style.setProperty('--before-opacity', beforeOpacity);
        container.style.setProperty('--after-opacity', afterOpacity);
    });


    // Анимации появления контента на странице при скролле:
    // Функция для применения анимаций к элементам секции
    function animateElementsOnScroll(sectionSelector) {
        const elements = document.querySelectorAll(sectionSelector + ' [class*="-animation-"]');
        elements.forEach(element => {
            if (!element.classList.contains('animated') && isElementInViewport(element)) {
                const animationDelay = parseFloat(window.getComputedStyle(element).animationDelay);
                element.style.animation = 'none'; // Отключаем анимацию, чтобы перезапустить ее
                element.style.opacity = '0';
                setTimeout(() => {
                    element.style.animation = ''; // Включаем анимацию
                    element.classList.add('animated'); // Добавляем класс для пометки анимации
                }, animationDelay);
            }
        });
    }

// Обработчик события прокрутки
    function handleScroll() {
        animateElementsOnScroll('section.traffic_patrol');
        animateElementsOnScroll('section.water_patrol');
        animateElementsOnScroll('section.velo_patrol');
        animateElementsOnScroll('section.situation_centre');
        animateElementsOnScroll('section.help_desk');
    }

// Добавляем обработчик события прокрутки окна
    window.addEventListener('scroll', handleScroll);

// Вызываем обработчик события прокрутки в начале для проверки видимости элементов при загрузке страницы
    handleScroll();
});