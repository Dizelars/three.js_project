document.addEventListener('DOMContentLoaded', function () {

    // Скрытие и закрытие popup, с учетом скролла в Safari
    function closePopup() {
        popupForm.classList.remove('active');
        bodyOverflow.style.removeProperty("overflow");
        bodyOverflow.style.removeProperty("position");
        bodyOverflow.style.removeProperty("top");
        bodyOverflow.style.removeProperty("width");
        window.scrollTo(0, scrollPosition);
        resetForm();
    }

    function openPopup() {
        popupForm.classList.add('active');
        scrollPosition = window.scrollY;
        bodyOverflow.style.overflow = "hidden";
        bodyOverflow.style.position = "fixed";
        bodyOverflow.style.top = `-${scrollPosition}px`;
        bodyOverflow.style.width = "100%";
    }

    const contactForm = document.getElementById('form-contact');
    const popupButton = document.querySelector('.form_open_button');
    const popupButtonHeader = document.querySelector('.header_main .ARphotoForm');
    const popupForm = document.querySelector('.form-wrapper');
    const formClose = document.querySelector('.form-wrapper .form_close');
    let bodyOverflow = document.querySelector('body.main');
    let scrollPosition = 0;

    // Массив для хранения уникальных идентификаторов файлов
    let uniqueFileIds = [];

    popupButton.addEventListener('click', () => {
        openPopup();
    });

    popupButtonHeader.addEventListener('click', () => {
        openPopup();
    });

    formClose.addEventListener('click', () => {
        closePopup();
    });

    popupForm.addEventListener('mousedown', (event) => {
        const target = event.target;
        const isInsideTechSpec = target.closest('.form-content');
    
        if (!isInsideTechSpec) {
            closePopup();
        }
    });



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



    // Обработка поля files (удаление файлов + превью файлов)
    let inputs = document.querySelectorAll('.contact-form__input_file');
    Array.prototype.forEach.call(inputs, function (input) {
        let label = input.nextElementSibling,
            fileText = document.querySelector('.contact-form_file_text'),
            previewPhotosContainer = document.querySelector('.preview_photos'),
            plusFileButton = document.querySelector('.contact-form__file-button');

        input.addEventListener('change', function (e) {
            const updateFileText = function () {
                const remainingFiles = previewPhotosContainer.children.length;
                if (remainingFiles > 0) {
                    fileText.innerText = 'Снимки загружены: ' + remainingFiles;
                    fileText.style.color = 'white';
                } else if (remainingFiles == 0) {
                    fileText.innerText = 'Загрузите снимки';
                    fileText.style.color = 'white';
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
                            // previewImage.src = URL.createObjectURL(file);
                            // console.log(file);
                            // console.log(previewImage.src);
                            // Используем FileReader для чтения файла как Data URL
                            const reader = new FileReader();
                            reader.onload = function (e) {
                                previewImage.src = e.target.result;
                                console.log(previewImage.src);
                            };
                            reader.readAsDataURL(file);

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

    // Слушаем события отправки формы (какой статус)
    document.getElementById("form-contact").addEventListener("submit", async function(event) {
        event.preventDefault();
        // Дополнительная проверка перед отправкой формы
        const fileInput = document.getElementById("contact-form__input_file");
        let fileTextError = document.querySelector('.contact-form_file_text');
        if (fileInput.files.length === 0) {
            // Если нет выбранных файлов, вы можете предпринять необходимые действия, например, вывести сообщение об ошибке.
            console.error("Выберите хотя бы один файл.");
            fileTextError.style.color = 'red';
            return;
        }
    
        // Обрезаем файлы до первых трех
        const filesToProcess = Math.min(3, fileInput.files.length);
        const filesToSend = Array.from(fileInput.files).slice(0, filesToProcess);
    
        // Заменяем исходные файлы обрезанными
        const dataTransfer = new DataTransfer();
        filesToSend.forEach(file => {
            dataTransfer.items.add(file);
        });
        fileInput.files = dataTransfer.files;
    
        const form = this;
        const actionUrl = form.getAttribute("action");


        // Ошибки и статусы (оповещения)
        const messages = {
            send: 'Данные успешно отправлены',
            sendWithError: 'Ошибка отправки данных'
        }

        const hidden_if_send = form.querySelector('.hidden_if_send');
        const visible_if_send = form.querySelector('.visible_if_send');
    
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
                hidden_if_send.style.display = 'none';
                visible_if_send.innerHTML = messages.send;
                visible_if_send.style.display = 'flex';
                setTimeout(() => {
                    closePopup();
                }, 4000);
            } else {
                // Ошибка отправки формы
                console.error("Произошла ошибка при отправке формы.");
                hidden_if_send.style.display = 'none';
                visible_if_send.innerHTML = messages.sendWithError;
                visible_if_send.style.display = 'flex';
                visible_if_send.classList.add('red');
            }
        } catch (error) {
            // Обработка ошибок, например, сетевых проблем
            console.error("Произошла ошибка при отправке формы:", error);
            hidden_if_send.style.display = 'none';
            visible_if_send.innerHTML = messages.sendWithError;
            visible_if_send.style.display = 'flex';
            visible_if_send.classList.add('red');
        }
    });


    function resetForm() {
        contactForm.reset();
        clearInput();
        uniqueFileIds = [];
    
        const previewPhotosContainer = document.querySelector('.preview_photos');
        const fileTextReset = document.querySelector('.contact-form_file_text');
        const addFiles = document.querySelector('.contact-form__file-button');

        if (addFiles.classList.contains('tooManyFiles')) {
            addFiles.classList.remove('tooManyFiles');
        }

        previewPhotosContainer.innerHTML = '';
        fileTextReset.innerText = 'Загрузите снимки';
        fileTextReset.style.color = 'white';
    }
});