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
