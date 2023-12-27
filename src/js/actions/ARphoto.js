document.addEventListener('DOMContentLoaded', function () {

    const popupButton = document.querySelector('.form_open_button');
    const popupForm = document.querySelector('.form-wrapper');
    const formSubmit = document.querySelector('.form-wrapper form .contact-form__button');
    const formClose = document.querySelector('.form-wrapper .form_close');
    let bodyOverflow = document.querySelector('body.main');
    let scrollPosition = 0;

    // const applicantForm = document.getElementById('form-contact');
    // function handleFormSubmit(event) {
    //     // Просим форму не отправлять данные самостоятельно
    //     event.preventDefault()
    //     console.log('Отправка!')
    // }
    
    // applicantForm.addEventListener('submit', handleFormSubmit);

    popupButton.addEventListener('click', () => {
        popupForm.classList.add('active');
        scrollPosition = window.scrollY;
        bodyOverflow.style.overflow = "hidden";
        bodyOverflow.style.position = "fixed";
        bodyOverflow.style.top = `-${scrollPosition}px`;
        bodyOverflow.style.width = "100%";
    });
    
    formSubmit.addEventListener('click', (e) => {
        popupForm.classList.remove('active');
        bodyOverflow.style.removeProperty("overflow");
        bodyOverflow.style.removeProperty("position");
        bodyOverflow.style.removeProperty("top");
        bodyOverflow.style.removeProperty("width");
        window.scrollTo(0, scrollPosition);
    });

    formClose.addEventListener('click', () => {
        popupForm.classList.remove('active');
        bodyOverflow.style.removeProperty("overflow");
        bodyOverflow.style.removeProperty("position");
        bodyOverflow.style.removeProperty("top");
        bodyOverflow.style.removeProperty("width");
        window.scrollTo(0, scrollPosition);
    });

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
});