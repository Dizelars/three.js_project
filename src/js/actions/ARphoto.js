document.addEventListener('DOMContentLoaded', function () {

    // Скрытие и закрытие popup, с учетом скролла в Safari
    // const formSubmit = document.querySelector('.form-wrapper form .contact-form__button');


    const popupButton = document.querySelector('.form_open_button');
    const popupForm = document.querySelector('.form-wrapper');
    const formClose = document.querySelector('.form-wrapper .form_close');
    let bodyOverflow = document.querySelector('body.main');
    let scrollPosition = 0;

    popupButton.addEventListener('click', () => {
        popupForm.classList.add('active');
        scrollPosition = window.scrollY;
        bodyOverflow.style.overflow = "hidden";
        bodyOverflow.style.position = "fixed";
        bodyOverflow.style.top = `-${scrollPosition}px`;
        bodyOverflow.style.width = "100%";
    });

    formClose.addEventListener('click', () => {
        popupForm.classList.remove('active');
        bodyOverflow.style.removeProperty("overflow");
        bodyOverflow.style.removeProperty("position");
        bodyOverflow.style.removeProperty("top");
        bodyOverflow.style.removeProperty("width");
        window.scrollTo(0, scrollPosition);
    });


    // formSubmit.addEventListener('click', (e) => {
    //     popupForm.classList.remove('active');
    //     bodyOverflow.style.removeProperty("overflow");
    //     bodyOverflow.style.removeProperty("position");
    //     bodyOverflow.style.removeProperty("top");
    //     bodyOverflow.style.removeProperty("width");
    //     window.scrollTo(0, scrollPosition);
    // });



    // Обработка поля Telegram, прослушка ввода мользователя
    const inputTelegram = document.querySelector('.contact-form__input_telegram');
    const placeholder = document.querySelector('.telegram-custom-placeholder');
    const closeIcon = document.querySelector('.telegram-custom-close');

    // Функция, которая обрабатывает ввод пользователя
    function handleInput() {
        const inputValue = inputTelegram.value.trim();

        // Если в поле ввода что-то написано, добавляем класс и меняем видимость элементов
        if (inputValue !== '') {
        inputTelegram.classList.add('initial-padding');
        placeholder.style.visibility = 'visible';
        closeIcon.style.visibility = 'visible';
        } else {
        inputTelegram.classList.remove('initial-padding');
        placeholder.style.visibility = 'hidden';
        closeIcon.style.visibility = 'hidden';
        }
    }

    // Функция, которая очищает поле ввода
    function clearInput() {
        inputTelegram.value = ''; // Очищаем поле ввода
        inputTelegram.classList.remove('initial-padding');
        placeholder.style.visibility = 'hidden';
        closeIcon.style.visibility = 'hidden';
    }

    // Слушаем событие ввода
    inputTelegram.addEventListener('input', handleInput);
    // Слушаем событие клика по элементу .telegram-custom-close
    closeIcon.addEventListener('click', clearInput);

    // let inputs = document.querySelectorAll('.contact-form__input_file');
    // Array.prototype.forEach.call(inputs, function (input) {
    //     let label = input.nextElementSibling,
    //     fileText = document.querySelector('.contact-form_file_text'),
    //     previewPhotosContainer = document.querySelector('.preview_photos'),
    //     plusFileButton = document.querySelector('.contact-form__file-button');

    //     // Массив для хранения уникальных идентификаторов файлов
    //     let uniqueFileIds = [];

    //     input.addEventListener('change', function (e) {
    //     const updateFileText = function () {
    //         const remainingFiles = previewPhotosContainer.children.length;
    //         if (remainingFiles > 0) {
    //         fileText.innerText = 'Снимки загружены: ' + remainingFiles;
    //         } else if (remainingFiles == 0) {
    //         fileText.innerText = 'Загрузите снимки';
    //         }

    //         // Добавление или удаление класса в зависимости от количества файлов
    //         if (previewPhotosContainer.children.length < 3) {
    //         plusFileButton.classList.remove('tooManyFiles');
    //         } else {
    //         plusFileButton.classList.add('tooManyFiles');
    //         }
    //     };

    //     const files = input.files;

    //     const deleteFileAndUpdateText = function (previewPhoto, fileId) {
    //         // Удаление файла из списка
    //         input.value = '';
    //         // Удаление превью из контейнера
    //         previewPhotosContainer.removeChild(previewPhoto);
    //         // Удаление идентификатора из массива
    //         uniqueFileIds = uniqueFileIds.filter(id => id !== fileId);
    //         // Обновление текста
    //         updateFileText();
    //     };

    //     // const files = input.files;
    //     const filesToProcess = Math.min(3, files.length); // Обработка не более 3 файлов

    //     for (let i = 0; i < filesToProcess; i++) {
    //         const file = files[i];
    //         if (file) {
    //         if (previewPhotosContainer.children.length < 3) {
    //             // Создание уникального идентификатора для файла
    //             const fileId = file.name + file.size;

    //             // Проверка на уникальность файла
    //             const isDuplicate = uniqueFileIds.includes(fileId);

    //             if (!isDuplicate) {
    //             const previewPhoto = document.createElement('div');
    //             previewPhoto.classList.add('preview_photo');

    //             const previewImage = document.createElement('img');
    //             previewImage.classList.add('contact-form__input_preview');
    //             previewImage.src = URL.createObjectURL(file);

    //             // Добавление обработчика событий для удаления при клике на фотографию
    //             previewImage.addEventListener('click', function () {
    //                 deleteFileAndUpdateText(previewPhoto, fileId);
    //             });

    //             previewPhoto.appendChild(previewImage);
    //             previewPhotosContainer.appendChild(previewPhoto);

    //             // Добавление идентификатора в массив
    //             uniqueFileIds.push(fileId);
    //             }
    //         }
    //         }
    //     }

    //     // Обновление текста после добавления файлов
    //     updateFileText();
    //     });
    // });


    // Обработка поля files (удаление файлов + превью файлов)
    let inputs = document.querySelectorAll('.contact-form__input_file');
    Array.prototype.forEach.call(inputs, function (input) {
        let label = input.nextElementSibling,
            fileText = document.querySelector('.contact-form_file_text'),
            previewPhotosContainer = document.querySelector('.preview_photos'),
            plusFileButton = document.querySelector('.contact-form__file-button');

        // Массив для хранения уникальных идентификаторов файлов
        let uniqueFileIds = [];

        input.addEventListener('change', function (e) {
            const updateFileText = function () {
                const remainingFiles = previewPhotosContainer.children.length;
                if (remainingFiles > 0) {
                    fileText.innerText = 'Снимки загружены: ' + remainingFiles;
                } else if (remainingFiles == 0) {
                    fileText.innerText = 'Загрузите снимки';
                }

                // Добавление или удаление класса в зависимости от количества файлов
                if (previewPhotosContainer.children.length < 3) {
                    plusFileButton.classList.remove('tooManyFiles');
                } else {
                    plusFileButton.classList.add('tooManyFiles');
                }
            };

            const files = input.files;

            const deleteFileAndUpdateText = function (previewPhoto, fileId) {
                // Удаление файла из списка
                const fileIndex = Array.from(input.files).findIndex(file => file.name + file.size === fileId);
                if (fileIndex !== -1) {
                    const newFiles = Array.from(input.files);
                    newFiles.splice(fileIndex, 1);
            
                    const dataTransfer = new DataTransfer();
                    newFiles.forEach(file => {
                        dataTransfer.items.add(file);
                    });
            
                    input.files = dataTransfer.files;
                }
            
                // Удаление превью из контейнера
                previewPhotosContainer.removeChild(previewPhoto);
                // Удаление идентификатора из массива
                uniqueFileIds = uniqueFileIds.filter(id => id !== fileId);
                // Обновление текста
                updateFileText();
            };

            const filesToProcess = Math.min(3, files.length); // Обработка не более 3 файлов

            for (let i = 0; i < filesToProcess; i++) {
                const file = files[i];
                if (file) {
                    if (previewPhotosContainer.children.length < 3) {
                        // Создание уникального идентификатора для файла
                        const fileId = file.name + file.size;
                        // Проверка на уникальность файла
                        const isDuplicate = uniqueFileIds.includes(fileId);

                        if (!isDuplicate) {
                            const previewPhoto = document.createElement('div');
                            previewPhoto.classList.add('preview_photo');

                            const previewImage = document.createElement('img');
                            previewImage.classList.add('contact-form__input_preview');
                            previewImage.src = URL.createObjectURL(file);

                            const previewDelete = document.createElement('img');
                            previewDelete.classList.add('contact-form__input_delete');
                            previewDelete.src = 'competition/deleteFile.svg';

                            const gradient = document.createElement('div');
                            gradient.classList.add('contact-form__input_gradient');

                            // Добавление обработчика событий для удаления при клике на фотографию
                            previewDelete.addEventListener('click', function () {
                                deleteFileAndUpdateText(previewPhoto, fileId);
                            });

                            previewPhoto.appendChild(previewImage);
                            previewPhoto.appendChild(previewDelete);
                            previewPhoto.appendChild(gradient);
                            previewPhotosContainer.appendChild(previewPhoto);

                            // Добавление идентификатора в массив
                            uniqueFileIds.push(fileId);
                        }
                    }
                }
            }
            // Обновление текста после добавления файлов
            updateFileText();
        });
    });


    // Отслеживание отправки формы
    document.getElementById("form-contact").addEventListener("submit", async function(event) {
        event.preventDefault();
    
        const form = this;
        const actionUrl = form.getAttribute("action");
    
        try {
            const response = await fetch(actionUrl, {
                method: "POST",
                body: new FormData(form),
                headers: {
                    "Accept": "application/json"
                    // Дополнительные заголовки, если необходимо
                }
            });
    
            if (response.ok) {
                // Успешный ответ от сервера
                console.log("Форма успешно отправлена!");

                // Продолжаем отправку формы
                form.submit();
            } else {
                // Ошибка отправки формы
                console.error("Произошла ошибка при отправке формы.");
            }
        } catch (error) {
            // Обработка ошибок, например, сетевых проблем
            console.error("Произошла ошибка при отправке формы:", error);
        }
    });
});