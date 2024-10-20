import '../../js/layout/script.js';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js';
// import gsap from "gsap";
import {createMaterialProperties} from './functions/new_materials/create_material_amarok.js';
// import Stats from 'stats.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { InteriorTransitionHelper } from '../../helpers/interiorTransitionHelper.js';
// import {SpriteMaterial, TextureLoader} from "three";

// import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';
// import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
// import {FirstPersonControls} from "three/addons/controls/FirstPersonControls";
// import {func} from "three/nodes";
// import * as AFRAME from "aframe";

// WebGLRenderer + настройки окружения
// Менеджер загрузки
// CSS2DRenderer (типоны)
//
// Сцена экстерьера Амарок
// 1) Фон и туман сцены экстерьер
// 2) Камера и управление камерой экстерьер
// 3) Свет экстерьер
// 4) Настройка GLTFLoader и сжатия модели DRACOLoader экстерьер
// 5) Загрузка карты отражений на моделе экстерьер
// 6) Загрузка gltf 3D модели экстерьер
// 7) Меняем Mesh-материал модели как отдельно, так и внутри Group экстерьер
// 8) Функция с моими параметрами материалов экстерьер
// 9) Обход загружаемой модели и замена материалов экстерьер
// 10) Вывод текущих координат камеры в консоль экстерьер
// 11) Пол + Загрузка текстуры бетона экстерьер
// 12) Вспомогательная система координат экстерьер
// 13) Перемещение по координатам при клике на кнопки или интерьер экстерьер
//
// Сцена интерьера Амарок
// 1) Фон интерьер
// 2) Камера и управление камерой интерьер
// 3) Свет интерьер
// 4) Вывод в сферу картинки в формате hdr интерьер
//
// Переключение активной сцены
// Измененение размера сцены под размер экрана
// Переключение между сценами при клике на кнопку с классом ".tech_spec__interior"

// Ширина экрана
const screenWidth = window.innerWidth;

let pixelRatio = window.devicePixelRatio
let AA = true
if (pixelRatio > 1) {
    AA = false
}

// Условие для версии модели и отбрасывание тени
let url;
let ShadowSwitch;
if (screenWidth >= 700) {
    // url = 'https://coddmac.store/THREE/3Dmodels/amarok/47/test2.gltf';
    // url = 'https://coddmac.store/THREE/3Dmodels/amarok/amarokVectary/Amarok_AR.gltf';
    url = 'https://coddmac.store/THREE/3Dmodels/amarok/amarokVectary_two/amarok.gltf';
    ShadowSwitch = true;
} else {
    url = 'https://coddmac.store/THREE/3Dmodels/amarok/49/opt.gltf';
    ShadowSwitch = false;
}

// WebGLRenderer + настройки окружения
const renderer = new THREE.WebGLRenderer({
    antialias: AA,
    // logarithmicDepthBuffer: true, // логарифмический буфер глубины
    precision: "highp", // Точность шейдера:
    // 1. highp (по умолчанию) - Такстуры более детализированы и пропадают лаги исчезания модели
    // 2. mediump - Лаги с пропаданием шейдеров возвращаются
    // 3. lowp - Лаги с пропаданием шейдеров возвращаются
    physicallyCorrectLights: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.outputEncoding = THREE.sRGBEncoding; // Сопоставление цветов hdr фото
renderer.toneMapping = THREE.ACESFilmicToneMapping;// Алгоритм отображения тонов
renderer.toneMappingExposure = 0.1;
renderer.shadowMap.enabled = ShadowSwitch;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Качество отображения теней
renderer.setPixelRatio( window.devicePixelRatio * 0.9 );
renderer.domElement.id = 'myCanvas';
const CanvasWrapper = document.getElementById('Canvas_wrapper');
CanvasWrapper.appendChild(renderer.domElement);
let bounds = CanvasWrapper.getBoundingClientRect();
// renderer.localClippingEnabled = true; // соблюдает ли рендерер плоскости обрезания на уровне объекта
// renderer.sortObjects = false;
// renderer.useLegacyLights = false;
// renderer.toneMapping = THREE.NoToneMapping;

// Shadow Types
// THREE.BasicShadowMap
// THREE.PCFShadowMap
// THREE.PCFSoftShadowMap
// THREE.VSMShadowMap



// Менеджер загрузки
const LoadingManager = new THREE.LoadingManager();

// У LoadingManager есть 4-е метода загрузки:
// 1) onStart - вызыается на старте, аргументы:
// url-адрес загружаемого обьекта
// index-игдекс загружаемого обьекта
// total-общее количесво обьектов, которое будет загружено.
// LoadingManager.onStart = function(url, index, total) {
//     console.log(`Начало загрузки: ${url}`);
// }
// 2) onProgress - вызывается каждый раз, когда начинает загрузка одного из компонентов модели.
// url-путь к загруженному файлу
// loaded-игдекс загружаемого обьекта
// total-общее количесво загружаемых файлов.

const progressBar = document.getElementById('progress-bar');
const progressLabel = document.getElementById('progress-label');
// const progressLoad = document.querySelector('.progress-bar-container > label');
// const progressContainer = document.querySelector('.progress-bar-container');
LoadingManager.onProgress = function(url, loaded, total) {
    const progressPercent = Math.round((loaded / total) * 100);
    // progressBar.value = progressPercent;
    progressBar.style.width = `${progressPercent}%`;
    progressLabel.textContent = `${progressPercent}%`;
    // progressContainer.style.setProperty('--top-left-percentage', `${progressPercent}%`);
    // progressContainer.style.setProperty('--bottom-right-percentage', `${progressPercent}%`);
    // Проверяем значение прогресса и выводим соответствующее сообщение
    // if (progressPercent >= 50 && progressPercent < 70) {
    //     progressLoad.textContent = 'Экипируемся...';
    // } else if (progressPercent >= 70 && progressPercent < 90) {
    //     progressLoad.textContent = 'Проводим ТО...';
    // }else if (progressPercent >= 80 && progressPercent < 90) {
    //     progressLoad.textContent = 'Моем машину...';
    // } else if (progressPercent >= 90) {
    //     progressLoad.textContent = 'Мы готовы!';
    // }
}

// 3) onLoad - Запись по завершению загрузки.
const progressBarContainer = document.querySelector('.progress-bar');
LoadingManager.onLoad = function() {
    setTimeout( () => {
        progressBarContainer.style.display = 'none';
        const hotspotsAll = document.querySelectorAll('.hotspot');
        let activeHotspot = null;
        hotspotsAll.forEach((hotspot) => {
            hotspot.addEventListener('mousedown', (event) => {
                event.stopPropagation(); // Остановка всплытия события, чтобы не сработал pointerdown на CanvasWrapper

                if (activeHotspot) {
                    activeHotspot.classList.remove('clicked');
                }

                hotspot.classList.add('clicked');
                activeHotspot = hotspot;
            });
        });
        document.body.addEventListener('mousedown', () => {
            if (activeHotspot) {
                activeHotspot.classList.remove('clicked');
                activeHotspot = null;
            }
        });
    }, 0);
}

// 4) onError - когда при загрузке одного из файлов происходит ошибка.
// LoadingManager.onError = function(url, loaded, total) {
//     console.error(`Ошибка во время загрузки: ${url}`);
// }

// let stats = new Stats();
// stats.showPanel(0, 1, 2); // 0: fps, 1: ms, 2: mb, 3+: custom
// stats.dom.classList.add('my-stats');
// document.body.appendChild( stats.dom );

let activeScene = 1;
// Сцена экстерьера Амарок
const scene1 = new THREE.Scene();

// 1) Фон и туман сцены экстерьер
scene1.background = new THREE.Color(0x000000);
scene1.fog = new THREE.Fog(0x000000, 290, 600);

// 2) Камера и управление камерой экстерьер 75
const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const initialCameraPosition1 = new THREE.Vector3(-216, 94, 109);
camera1.position.copy(initialCameraPosition1);
// camera1.updateProjectionMatrix();

// const helper = new THREE.CameraHelper( camera1 );
// scene1.add( helper );

const controls1 = new OrbitControls(camera1, renderer.domElement);
controls1.minPolarAngle = 0;
controls1.maxPolarAngle = Math.PI * 0.5;
controls1.minDistance = 210;
controls1.maxDistance = 260;
controls1.enabled = true;
controls1.enablePan = false;
controls1.addEventListener( 'change', animate );
controls1.update();

// CSS2DRenderer (типоны)
// Создание объекта для рендеринга CSS-элементов в трехмерной сцене
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);

// Объект с текстами подсказок для каждого меша
const tooltipTexts = {
    sphereMesh1: 'Информационное табло',
    sphereMesh2: 'Дорожные знаки',
};

function createHotspots(numHotspots, positions) {
    const hotspots = [];

    for (let i = 0; i < numHotspots; i++) {
        const hotspotContainer = document.createElement('div');
        hotspotContainer.className = `Myhotspot`;

        const hotspotWrapper = document.createElement('div');
        hotspotWrapper.className = 'hotspot_wrapper';
        hotspotContainer.appendChild(hotspotWrapper);

        const hotspot = document.createElement('div');
        hotspot.className = `hotspot`;
        hotspotWrapper.appendChild(hotspot);

        const position = positions[i] || { x: 0, y: 0, z: 0 }; // Задаем позицию из переданных параметров или используем {0, 0, 0} по умолчанию

        const hotspotPointLabel = new CSS2DObject(hotspotContainer);
        hotspotPointLabel.position.set(position.x, position.y, position.z);

        hotspots.push(hotspotPointLabel);

        hotspotContainer.addEventListener('click', () => {
            let tooltipText;
            if(i === 0) {
                tooltipText = tooltipTexts.sphereMesh1;
            } else if(i === 1) {
                tooltipText = tooltipTexts.sphereMesh2;
            }

            pContainer.className = 'Mytext show';
            if (tooltipText) {
                cPointLabel.position.set(position.x, position.y, position.z); // Установка позиции подсказки над выбранным мешом
                p.textContent = tooltipText; // Установка текста подсказки
                tooltipWrapper.style.marginBottom = (p.getBoundingClientRect().height + 62) + "px";
            }
        });
    }

    return hotspots;
}


// Пример использования функции
const numHotspots = 2;
const positionsArray = [
    { x: 106, y: 63, z: -0 },
    { x: 26, y: 63, z: -0 },
];

const hotspots = createHotspots(numHotspots, positionsArray);
hotspots.forEach(hotspot => {
    scene1.add(hotspot);
});

CanvasWrapper.addEventListener("pointerdown", () => {
    pContainer.className = 'Mytext hide';
});

const pContainer = document.createElement('div');
pContainer.className = 'Mytext';
const tooltipWrapper = document.createElement('div');
tooltipWrapper.className = 'tooltip_wrapper';
pContainer.appendChild(tooltipWrapper);

// Создание HTML-элементов для отображения подсказки
const p = document.createElement('p');
p.className = 'tooltip';

tooltipWrapper.appendChild(p);
const cPointLabel = new CSS2DObject(pContainer);
scene1.add(cPointLabel);


// 3) Свет экстерьер
const lightPositions1 = [
    [-203, 38, -112],
    [-219, 37, -2],
    [-199, 33, 83],
];
lightPositions1.forEach(position => {
    const light = new THREE.PointLight(0xffffff, 0.9);
    light.position.set(position[0], position[1], position[2]);
    scene1.add(light);
    // const helper = new THREE.PointLightHelper(light);
    // scene1.add(helper);
});

const SpotLight5 = new THREE.SpotLight(0xffffff, 3);
SpotLight5.position.set(0, 470, -0);
SpotLight5.castShadow = ShadowSwitch;
SpotLight5.shadow.mapSize.height = 64; // Разрешение отображения теней
SpotLight5.shadow.mapSize.width = 64; // Разрешение отображения теней
SpotLight5.shadow.camera.near = 1.0;
SpotLight5.shadow.camera.far = 550;
SpotLight5.shadow.camera.left = 1;
SpotLight5.shadow.camera.right = -1;
SpotLight5.shadow.camera.top = 1;
SpotLight5.shadow.camera.bottom = -1;
// SpotLight5.shadow.bias = 0.001;  // Должен убирать акртефакты тени.
// SpotLight5.shadow.needsUpdate = true; // При анимации тени будут рендериться постоянно
// SpotLight5.shadow.focus = 1;
SpotLight5.angle = 0.5;
SpotLight5.penumbra = 1;
scene1.add(SpotLight5);

const RectAreaLight = new THREE.RectAreaLight(0xffffff, 100, 100, 50);
RectAreaLight.position.set(10, 110, 120);
RectAreaLight.castShadow = ShadowSwitch;
RectAreaLight.lookAt( 0, 0, 0 );
scene1.add( RectAreaLight );

const RectAreaLight2 = new THREE.RectAreaLight(0xffffff, 50, 150, 100);
RectAreaLight2.position.set(36, 56, -194);
RectAreaLight2.castShadow = ShadowSwitch;
RectAreaLight2.lookAt( 0, 0, 0 );
scene1.add( RectAreaLight2 );
// const helper = new RectAreaLightHelper( RectAreaLight );
// scene1.add( helper ); // helper must be added as a child of the light
//
// const helper2 = new RectAreaLightHelper( RectAreaLight2 );
// scene1.add( helper2 ); // helper must be added as a child of the light
// //
// const spothelper1 = new THREE.SpotLightHelper(SpotLight5);
// scene1.add( spothelper1 );


// 4) Настройка GLTFLoader и сжатия модели DRACOLoader экстерьер
let gltfLoader = new GLTFLoader(LoadingManager);
const dLoader = new DRACOLoader();
dLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
dLoader.setDecoderConfig({type: 'js'});
gltfLoader.setDRACOLoader(dLoader);
let obj;


// 5) Загрузка карты отражений на моделе экстерьер
// ../img/studio.hdr  toneMappingExposure = 0.1
// ../img/garage.hdr  toneMappingExposure = 0.1;
// ../img/MR_INT-005_WhiteNeons_NAD.hdr   toneMappingExposure = 0.3
// const PhoneHDR = new URL('../../img/garage.jpg', import.meta.url);
// const rgbLoaderPhone = new RGBELoader(LoadingManager);
const PhoneJPG = new URL('../../img/garage.jpg', import.meta.url);
const rgbLoaderPhone = new THREE.TextureLoader(LoadingManager);
rgbLoaderPhone.load(PhoneJPG, function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene1.environment = texture;

    // 6) Загрузка gltf 3D модели экстерьер
    gltfLoader.load(url, function(gltf) {
        obj = gltf.scene;
        obj.position.set(-35, -3, -27.5);

        // createMarker(obj, new Vector3(71, 88, -27.5));
        // createMarker(obj, new Vector3(-9, 60, -27.5));
        // obj.scale.set(55,55,55);

        scene1.add(obj);
        console.log(obj.children);
        // const box = new THREE.Box3().setFromObject(obj);
        // const size = new THREE.Vector3();
        // box.getSize(size);
        // const linearSize = size.length();
        // console.log('Linear size:', linearSize);

        // 7) Меняем Mesh-материал модели как отдельно, так и внутри Group экстерьер
        let names = [];
        for (let i = 0; i < obj.children.length; i++) {
            names.push(obj.children[i].name);
        }
        const materialProperties = names.reduce(function(props, name) {
            props[name] = createMaterialProperties(name);
            return props;
        }, {});

        const namesSet = new Set(names);

        // 8) Функция с моими параметрами материалов экстерьер
        createMaterialProperties();
        console.log(materialProperties);

        // 9) Обход загружаемой модели и замена материалов экстерьер
        obj.traverse(function(child) {
            if (child.isMesh) {
                child.castShadow = ShadowSwitch;
            }
            // Проверяем, является ли объект child мешем и имеет ли он имя, содержащееся в массиве names
            if (child.isMesh && namesSet.has(child.name)) {
                const properties = materialProperties[child.name];
                // Проверяем, есть ли свойства для данного имени и не является ли пустым массив свойств
                // Также проверяем, есть ли у свойств объект material
                if (properties && Object.keys(properties).length > 0 && properties.material) {
                    // Присваиваем материал из свойств child.material
                    child.material = properties.material;
                }
            }
            // Проверяем, является ли объект child группой и имеет ли он имя, содержащееся в массиве names
            else if (child.isGroup && namesSet.has(child.name)) {
                const groupProperties = materialProperties[child.name];
                // Проверяем, есть ли свойства для данного имени и не является ли пустым массив свойств
                // Также проверяем, есть ли у свойств объект material
                if (groupProperties && Object.keys(groupProperties).length > 0 && groupProperties.material) {
                    child.traverse(function(groupChild) {
                        // Проверяем, является ли объект groupChild мешем внутри группы
                        if (groupChild.isMesh) {
                            // Присваиваем материал из свойств groupChild.material
                            groupChild.material = groupProperties.material;
                            groupChild.castShadow = ShadowSwitch;
                        }
                    });
                }
            }
        });

        function setMaterialProperties(material, name) {
            const properties = materialProperties[name];

            if (properties) {
                if (properties.color) material.color.set(properties.color);
                if (properties.roughness) material.roughness = properties.roughness;
                if (properties.metalness) material.metalness = properties.metalness;
                // и другие свойства
            }
        }

        // 10) Вывод текущих координат камеры в консоль экстерьер
        window.addEventListener('mouseup', () => {
            console.log(camera1.position); // Выводим координаты камеры
        });
    });
});

// 11) Пол + Загрузка текстуры бетона экстерьер
const betonMapJPG = new URL('../../img/beton/betonMap.jpg', import.meta.url);
const betonDmapJPG = new URL('../../img/beton/betonDmap.jpg', import.meta.url);
const BetonLoader = new THREE.TextureLoader(LoadingManager);
const BetonMap = BetonLoader.load(betonMapJPG);
const BetonDmap= BetonLoader.load(betonDmapJPG);
BetonMap.wrapS = THREE.RepeatWrapping; // Повторение текстуры по горизонтали
BetonMap.wrapT = THREE.RepeatWrapping; // Повторение текстуры по вертикали
BetonMap.repeat.set(4, 4); // Количество повторений текстуры

const planeMaterial = new THREE.MeshPhongMaterial({
    bumpScale: 2,
    map: BetonMap,
    displacementMap: BetonDmap,
    displacementScale: 0.1,
    side: THREE.DoubleSide, // Применение к обеим сторонам
});
const planeGeometry = new THREE.PlaneGeometry(750, 750, 5, 5); // Модель №2 Подложка
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene1.add(plane);
plane.rotation.x = -0.5 * Math.PI; // Поворот плиты.
plane.position.set(0, -2, 0) // Поворот плиты.
plane.receiveShadow = ShadowSwitch; // Плоскость получает тень, которую излучает модель


// 12) Вспомогательная система координат экстерьер
// const axesHelper = new THREE.AxesHelper(200);
// scene1.add(axesHelper);


// 13) Перемещение по координатам при клике на кнопки интерьер или экстерьер
// function MyCoordinates(xPos, yPos, zPos, dur) {
//     gsap.to(camera1.position, {
//         x: xPos,
//         y: yPos,
//         z: zPos,
//         duration: dur,
//         onUpdate: function() {
//             camera1.lookAt(0, 0, 0);
//         }
//     });
// }

// const coordinates = [
//     [-4.709869959805082, 1.3231521819422856, -3.4736714388593297, 1.5],
//     [4.419631461529943, 1.366719430512851, -3.82085536791349, 1.5],
//     [4.612135343130454, 3.8370701385486443, 0.07141658424494553, 1.5],
//     [4.548391730389692, 1.5106187886098281, 3.6097317826151065, 1.5],
//     [-216, 94, 109, 1.5],
//     [-51.38847217341723, 55.119928388623705, 29.436440217618962, 1.5]
// ];
//
// const go_to = document.querySelectorAll('.go_to');
//
// go_to.forEach((item, i) => {
//     item.addEventListener('click', () => {
//         const [x, y, z, dur] = coordinates[i];
//         MyCoordinates(x, y, z, dur);
//     });
// });

// Переключение активной сцены
function animate() {
    // stats.begin();
    labelRenderer.render(scene1, camera1);
    renderer.render(scene1, camera1);
    // stats.end();
}
renderer.setAnimationLoop(animate);

// Измененение размера сцены под размер экрана
window.addEventListener('resize', () => {
    bounds = CanvasWrapper.getBoundingClientRect();
    camera1.aspect = bounds.width / bounds.height;
    // camera1.updateProjectionMatrix();
    // camera2.aspect = window.innerWidth / window.innerHeight;
    // camera2.updateProjectionMatrix();
    labelRenderer.setSize(bounds.width, bounds.height);
    renderer.setSize(bounds.width, bounds.height);
});

// Переключение между сценами при клике на кнопку с классом ".tech_spec__interior"
const interiorButton = document.querySelector('.tech_spec__interior');
const aFrameScene = document.querySelector('a-scene');

const transitionHelper = new InteriorTransitionHelper(interiorButton);
interiorButton.addEventListener('click', () => {
    if (transitionHelper.isTransition()) {
        return;
    }

    transitionHelper.startTransition();

    if (activeScene === 1) {
        setTimeout(() => {
            activeScene = 2;
            aFrameScene.style.opacity = '1';
            aFrameScene.style.height = 'auto';
            aFrameScene.style.pointerEvents = 'auto';
            aFrameScene.play();
            controls1.enabled = false;
            transitionHelper.endTransition();
        }, 1500);
    } else {
        setTimeout(() => {
            activeScene = 1;
            aFrameScene.style.opacity = '0';
            aFrameScene.style.height = '0';
            aFrameScene.style.pointerEvents = 'none';
            aFrameScene.pause();
            controls1.enabled = true;
            transitionHelper.endTransition();
        }, 1500);
    }
});

// interiorButton.addEventListener('click', () => {
//     if (transitionHelper.isTransition()) {
//         return;
//     }
//
//     transitionHelper.startTransition();
//
//     if (activeScene === 1) {
//         const [x, y, z, dur] = coordinates[5];
//         MyCoordinates(x, y, z, dur);
//         setTimeout(() => {
//             activeScene = 2;
//             aFrameScene.style.opacity = '1';
//             aFrameScene.style.height = 'auto';
//             aFrameScene.style.pointerEvents = 'auto';
//             const [x2, y2, z2, dur2] = initialCameraPosition1.toArray();
//             MyCoordinates(x2, y2, z2, dur2);
//             controls1.enabled = false;
//             // controls2.enabled = true;
//             animate();
//             transitionHelper.endTransition();
//         }, dur * 1000);
//     } else {
//         const [x, y, z, dur] = coordinates[4];
//         MyCoordinates(x, y, z, dur);
//         activeScene = 1;
//         aFrameScene.style.opacity = '0';
//         aFrameScene.style.height = '0';
//         aFrameScene.style.pointerEvents = 'none';
//         setTimeout(() => {
//             const [x2, y2, z2, dur2] = initialCameraPosition1.toArray();
//             MyCoordinates(x2, y2, z2, dur2);
//             controls1.enabled = true;
//             // controls2.enabled = false;
//             animate();
//             transitionHelper.endTransition();
//         }, dur * 1000);
//     }
// });