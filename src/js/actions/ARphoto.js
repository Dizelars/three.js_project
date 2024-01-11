document.addEventListener('DOMContentLoaded', function () {

    // Скрытие и закрытие popup, с учетом скролла в Safari
    function closePopup() {
        if (window.innerWidth < 851) {
            setTimeout(() => {
                popupForm.style.visibility = 'hidden';
            }, 450);
        } else {
            popupForm.style.visibility = 'hidden';
        }
        popupForm.classList.remove('active');
        bodyOverflow.style.removeProperty("overflow");
        bodyOverflow.style.removeProperty("position");
        bodyOverflow.style.removeProperty("top");
        bodyOverflow.style.removeProperty("width");
        window.scrollTo(0, scrollPosition);
        resetForm();
    }

    function openPopup() {
        popupForm.style.visibility = 'visible';
        popupForm.classList.add('active');
        scrollPosition = window.scrollY;
        bodyOverflow.style.overflow = "hidden";
        bodyOverflow.style.position = "fixed";
        bodyOverflow.style.top = `-${scrollPosition}px`;
        bodyOverflow.style.width = "100%";
    }

    const contactForm = document.getElementById('form-contact');
    // const popupButton = document.querySelector('.form_open_button');
    const popupButtonHeader = document.querySelector('.header_main .ARphotoForm');
    const popupForm = document.querySelector('.form-wrapper');
    const formClose = document.querySelector('.form-wrapper .form_close');
    let bodyOverflow = document.querySelector('body.main');
    let scrollPosition = 0;

    // Массив для хранения уникальных идентификаторов файлов
    let uniqueFileIds = [];

    // popupButton.addEventListener('click', () => {
    //     openPopup();
    // });

    // Открытие попапа после загрузки сайта и спустя 1 секунду
    setTimeout(() => {
        openPopup();
    }, 2500);

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
            fileCountBlock = document.querySelector('.contact-form_file_info'),
            fileCountText = document.querySelectorAll('.contact-form_file_info p'),
            counterFiles = document.querySelector('.counter_files'),
            previewPhotosContainer = document.querySelector('.preview_photos'),
            plusFileButton = document.querySelector('.contact-form__file-button');

        input.addEventListener('change', () => {
            const updateFileText = () => {
                const remainingFiles = previewPhotosContainer.children.length;
                counterFiles.innerText = remainingFiles;
                if (remainingFiles > 0) {
                    fileCountText.forEach((e) => {
                        e.style.color = 'white';
                        e.style.opacity = 0.5;
                    });
                    fileCountBlock.style.visibility = 'visible';
                } else if (remainingFiles == 0) {
                    fileCountText.forEach((e) => {
                        e.style.color = 'white';
                        e.style.opacity = 0.5;
                    });
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

                            // const previewImage = document.createElement('img');
                            const previewImage = document.createElement('div');
                            previewImage.classList.add('contact-form__input_preview');
                            // previewImage.src = 'competition/loading.gif';
                            previewImage.innerHTML = `
                            <svg x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                                <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                                <animateTransform attributeType="xml"
                                    attributeName="transform"
                                    type="rotate"
                                    from="0 25 25"
                                    to="360 25 25"
                                    dur="0.9s"
                                    repeatCount="indefinite"/>
                                </path>
                            </svg>
                            `;

                            //* Превью формируется из blob ссылки на файл с Абсолютным путем
                            //! Этот URL предоставляет прямой доступ к данным в Blob-объекте. 
                            //! Данный подход не работает в Safari
                            // previewImage.src = URL.createObjectURL(file);

                            //* Используем FileReader для чтения файла как Data URL
                            //! Этот метод использует Data URL, который кодирует данные файла в строку base64 и вставляет их в URL.
                            //! В таком случае превью в Safari работают
                            //* Использование FileReader с readAsDataURL более универсально и широко поддерживается в различных браузерах, включая Safari.
                            const reader = new FileReader();
                            reader.onload = function (e) {
                                const newImage = document.createElement('img');
                                newImage.classList.add('contact-form__input_preview');
                                // Установите атрибут src для нового изображения
                                newImage.src = e.target.result;
                                // Замените previewImage новым изображением
                                previewImage.parentNode.replaceChild(newImage, previewImage);
                                // previewImage.src = e.target.result;
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
        let fileCountTextError = document.querySelectorAll('.contact-form_file_info p');
        if (fileInput.files.length === 0) {
            // Если нет выбранных файлов, вы можете предпринять необходимые действия, например, вывести сообщение об ошибке.
            fileCountTextError.forEach((e) => {
                e.style.color = 'red';
                e.style.opacity = 1;
            });
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

        const visible_if_send_img = document.createElement('img');
        visible_if_send_img.classList.add('visible_if_send_img');
        const visible_if_send_text = document.createElement('p');
        visible_if_send_text.classList.add('visible_if_send_text');
    
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
                // visible_if_send.innerHTML = messages.send;
                visible_if_send.appendChild(visible_if_send_img);
                visible_if_send.appendChild(visible_if_send_text);
                visible_if_send_img.src = 'competition/download.svg';
                visible_if_send_text.innerHTML = messages.send;
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
        fileTextReset.innerText = 'Загружено';
        fileTextReset.style.color = 'white';
    }
});