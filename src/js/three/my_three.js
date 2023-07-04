import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
// import {FirstPersonControls} from "three/addons/controls/FirstPersonControls";
import gsap from "gsap";
// import {func} from "three/nodes";
import {createMaterialProperties} from './functions/create_material.js';


// WebGLRenderer + настройки окружения
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



// WebGLRenderer + настройки окружения
const renderer = new THREE.WebGLRenderer({
    // precision: "lowp",
    antialias: true,
    physicallyCorrectLights: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding; // Сопоставление цветов hdr фото
renderer.toneMapping = THREE.ACESFilmicToneMapping;// Алгоритм отображения тонов
renderer.toneMappingExposure = 0.1;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Качество отображения теней
// renderer.toneMapping = THREE.NoToneMapping;
// Shadow Types
// THREE.BasicShadowMap
// THREE.PCFShadowMap
// THREE.PCFSoftShadowMap
// THREE.VSMShadowMap
document.body.appendChild(renderer.domElement);



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
const progressLoad = document.querySelector('.progress-bar-container > label');
const progressContainer = document.querySelector('.progress-bar-container');
LoadingManager.onProgress = function(url, loaded, total) {
    const progressPercent = Math.round((loaded / total) * 100);
    progressBar.value = progressPercent;
    progressLabel.textContent = `${progressPercent}%`;

    progressContainer.style.setProperty('--top-left-percentage', `${progressPercent}%`);
    progressContainer.style.setProperty('--bottom-right-percentage', `${progressPercent}%`);

    // Проверяем значение прогресса и выводим соответствующее сообщение
    if (progressPercent >= 50 && progressPercent < 70) {
        progressLoad.textContent = 'Экипируемся...';
    } else if (progressPercent >= 70 && progressPercent < 90) {
        progressLoad.textContent = 'Проводим ТО...';
    }else if (progressPercent >= 80 && progressPercent < 90) {
        progressLoad.textContent = 'Моем машину...';
    } else if (progressPercent >= 90) {
        progressLoad.textContent = 'Мы готовы!';
    }
}

// 3) onLoad - Запись по завершению загрузки.

const progressBarContainer = document.querySelector('.progress-bar');
LoadingManager.onLoad = function() {
    progressBarContainer.style.display = 'none';
}

// 4) onError - когда при загрузке одного из файлов происходит ошибка.
// LoadingManager.onError = function(url, loaded, total) {
//     console.error(`Ошибка во время загрузки: ${url}`);
// }

// const gltfLoaderForManager = new GLTFLoader(LoadingManager);
// const rgbeLoaderForManager = new RGBELoader(LoadingManager);


let activeScene = 1;
// Сцена экстерьера Амарок
const scene1 = new THREE.Scene();

// 1) Фон и туман сцены экстерьер
scene1.background = new THREE.Color(0x000000);
scene1.fog = new THREE.Fog(0x000000, 290, 600);
// scene1.fog = new THREE.FogExp2( 0xDFE9F3, 0.0005 );
// console.log(new THREE.Fog(0xDFE9F3, 0.0, 500))

//0xffffff
//0x000000
//0xB5B8B1


// 2) Камера и управление камерой экстерьер

const initialCameraPosition1 = new THREE.Vector3(-171.85716505033145, 74.93456415868356, 86.89998171402281);
const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera1.position.copy(initialCameraPosition1);

const controls1 = new OrbitControls(camera1, renderer.domElement);
controls1.minPolarAngle = 0;
controls1.maxPolarAngle = Math.PI * 0.5;
// controls1.minDistance = 210;
// controls1.maxDistance = 260;
// controls1.enabled = true;
// controls1.enablePan = false;
controls1.update();


// 3) Свет экстерьер
const lightPositions1 = [
    [-168, 38, -112],
    [-184, 37, -2],
    [-164, 33, 83],
    // [265.38149179418303, 29.66356022269588, 3.5128582340225742],
    // [197.0975889816967, 33.78571878903604, 156.13137890856612]
];
// const lightPositions1 = [
//     [-185.6241207481791, 32.07062433508278, 84.95199678588864],
//     [-204.3011171303053, 30.934039929212076, 2.412388785758053],
//     [-180.31006688957424, 33.01550961882396, -137.20319905907786],
//     // [265.38149179418303, 29.66356022269588, 3.5128582340225742],
//     // [197.0975889816967, 33.78571878903604, 156.13137890856612]
// ];
lightPositions1.forEach(position => {
    const light = new THREE.PointLight(0xffffff, 0.9);
    light.position.set(position[0], position[1], position[2]);
    scene1.add(light);
    // const helper = new THREE.PointLightHelper(light);
    // scene1.add(helper);
});

// Create Ambient and Point lights for the scene
// const ambientLight = new THREE.AmbientLight(0xededed, 0.01);
// scene1.add(ambientLight);

// const Hemilight = new THREE.HemisphereLight( 0xffffff, 5 );
// Hemilight.position.set(32, 30, -58);
// Hemilight.rotateY(200);
// scene1.add( Hemilight );
//
// const helper = new THREE.HemisphereLightHelper( Hemilight, 10);
// scene1.add( helper );

const SpotLight5 = new THREE.SpotLight(0xffffff, 3);
SpotLight5.position.set(0, 470, -0);
SpotLight5.castShadow = true;
// SpotLight5.shadow.bias = 0.001;
SpotLight5.shadow.mapSize.height = 64; // Разрешение отображения теней
SpotLight5.shadow.mapSize.width = 64; // Разрешение отображения теней
SpotLight5.shadow.camera.near = 1.0;
SpotLight5.shadow.camera.far = 550;
SpotLight5.shadow.camera.left = 1;
SpotLight5.shadow.camera.right = -1;
SpotLight5.shadow.camera.top = 1;
SpotLight5.shadow.camera.bottom = -1;
// SpotLight5.shadow.needsUpdate = true; // При анимации тени будут рендериться постоянно
// SpotLight5.shadow.focus = 1;
SpotLight5.angle = 0.5;
SpotLight5.penumbra = 1;
scene1.add(SpotLight5);

// const SpotLight5 = new THREE.SpotLight(0xffffff, 8);
// SpotLight5.position.set(-170, 160, 104);
// SpotLight5.castShadow = true;
// // SpotLight5.shadow.bias = 0.001;
// SpotLight5.shadow.mapSize.height = 2048; // Разрешение отображения теней
// SpotLight5.shadow.mapSize.width = 2048; // Разрешение отображения теней
// SpotLight5.shadow.camera.near = 1.0;
// SpotLight5.shadow.camera.far = 550;
// SpotLight5.shadow.camera.left = 1;
// SpotLight5.shadow.camera.right = -1;
// SpotLight5.shadow.camera.top = 1;
// SpotLight5.shadow.camera.bottom = -1;
// // SpotLight5.shadow.needsUpdate = true; // При анимации тени будут рендериться постоянно
// // SpotLight5.shadow.focus = 1;
// SpotLight5.angle = 0.5;
// SpotLight5.penumbra = 0.3;
// scene1.add(SpotLight5);

// const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
// directionalLight.position.set(63, 146, 145);
// directionalLight.castShadow = false;
// scene1.add( directionalLight );
// //
// const directionhelper1 = new THREE.DirectionalLightHelper( directionalLight, 6 );
// scene1.add( directionhelper1 );

const RectAreaLight = new THREE.RectAreaLight(0xffffff, 100, 100, 50);
RectAreaLight.position.set(45, 110, 120);
RectAreaLight.castShadow = false;
RectAreaLight.lookAt( 0, 0, 0 );
scene1.add( RectAreaLight );

const RectAreaLight2 = new THREE.RectAreaLight(0xffffff, 50, 150, 100);
RectAreaLight2.position.set(71, 56, -194);
RectAreaLight2.castShadow = false;
RectAreaLight2.lookAt( 0, 0, 0 );
scene1.add( RectAreaLight2 );
// const helper = new RectAreaLightHelper( RectAreaLight2 );
// scene1.add( helper ); // helper must be added as a child of the light
//
// const spothelper1 = new THREE.SpotLightHelper(SpotLight5);
// scene1.add( spothelper1 );

// const Pointlight = new THREE.PointLight( 0xffffff, 5, 100 );
// Pointlight.position.set( 10, 1, -51 );
// scene1.add( Pointlight );
//
// const sphereSize = 5;
// const pointLightHelper = new THREE.PointLightHelper( Pointlight, sphereSize );
// scene1.add( pointLightHelper );


// 4) Настройка GLTFLoader и сжатия модели DRACOLoader экстерьер

let gltfLoader = new GLTFLoader(LoadingManager);
const dLoader = new DRACOLoader();
dLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
dLoader.setDecoderConfig({type: 'js'});
gltfLoader.setDRACOLoader(dLoader);
let obj;
let url = 'https://coddmac.store/THREE/3Dmodels/36/car6.gltf';
// https://coddmac.store/THREE/3Dmodels/36/car6.gltf
// http://89.208.211.133/models/36/car6.gltf


// 5) Загрузка карты отражений на моделе экстерьер

// ../img/studio.hdr  toneMappingExposure = 0.1
// ../img/garage.hdr  toneMappingExposure = 0.1;
// ../img/MR_INT-005_WhiteNeons_NAD.hdr   toneMappingExposure = 0.3
const PhoneHDR = new URL('../../img/garage.hdr', import.meta.url);
const rgbLoaderPhone = new RGBELoader(LoadingManager);
rgbLoaderPhone.load(PhoneHDR, function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    // scene1.background = texture;
    scene1.environment = texture;

    // 6) Загрузка gltf 3D модели экстерьер
    gltfLoader.load(url, function(gltf) {
        obj = gltf.scene;
        scene1.add(obj);
        console.log(obj.children);
        obj.position.set(0, -1.5, -27.5);

        // 7) Меняем Mesh-материал модели как отдельно, так и внутри Group экстерьер
        let names = [];
        let materialProperties = {};
        for (let i = 0; i < obj.children.length; i++) {
            names.push(obj.children[i].name);
        }
        for (let i = 0; i < names.length; i++) {
            let name = names[i];
            materialProperties[name] = createMaterialProperties(name);
        }

        // 8) Функция с моими параметрами материалов экстерьер
        createMaterialProperties();
        console.log(materialProperties);

        // 9) Обход загружаемой модели и замена материалов экстерьер
        obj.traverse(function(child) {
            if (child.isMesh) {
                child.castShadow = true;
                // child.receiveShadow = true;
            }
            // Проверяем, является ли объект child мешем и имеет ли он имя, содержащееся в массиве names
            if (child.isMesh && names.includes(child.name)) {
                const properties = materialProperties[child.name];
                // Проверяем, есть ли свойства для данного имени и не является ли пустым массив свойств
                // Также проверяем, есть ли у свойств объект material
                if (properties && Object.keys(properties).length > 0 && properties.material) {
                    // Присваиваем материал из свойств child.material
                    child.material = properties.material;
                }
            }
            // Проверяем, является ли объект child группой и имеет ли он имя, содержащееся в массиве names
            else if (child.isGroup && names.includes(child.name)) {
                const groupProperties = materialProperties[child.name];
                // Проверяем, есть ли свойства для данного имени и не является ли пустым массив свойств
                // Также проверяем, есть ли у свойств объект material
                if (groupProperties && Object.keys(groupProperties).length > 0 && groupProperties.material) {
                    child.traverse(function(groupChild) {
                        // Проверяем, является ли объект groupChild мешем внутри группы
                        if (groupChild.isMesh) {
                            // Присваиваем материал из свойств groupChild.material
                            groupChild.material = groupProperties.material;
                            groupChild.castShadow = true;
                            // groupChild.receiveShadow = true;
                        }
                    });
                }
            }
        });

        // setMaterialProperties();
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
const BetonLoader = new THREE.TextureLoader(LoadingManager);
const BetonMap = BetonLoader.load('https://coddmac.store/THREE/beton_1111.jpg');
// const betonBmap = BetonLoader.load('https://coddmac.store/THREE/beton_bump.jpg');
const betonDmap= BetonLoader.load('https://coddmac.store/THREE/beton_displacement.jpg');
BetonMap.wrapS = THREE.RepeatWrapping; // Повторение текстуры по горизонтали
BetonMap.wrapT = THREE.RepeatWrapping; // Повторение текстуры по вертикали
BetonMap.repeat.set(8, 8); // Количество повторений текстуры

const planeMaterial = new THREE.MeshPhongMaterial({
    // color: 0x090909, // Цвет бетона
    // roughness: 1, // Шероховатость бетона
    // metalness: 0.0, // Отсутствие металличности
    // transmission: 0.0, // Непрозрачность (без прозрачности)
    // bumpMap: betonBmap,
    bumpScale: 2,
    map: BetonMap,
    displacementMap: betonDmap,
    displacementScale: 0.1,
    side: THREE.DoubleSide, // Применение к обеим сторонам
});
const planeGeometry = new THREE.PlaneGeometry(1500, 1500, 40, 40); // Модель №2 Подложка
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene1.add(plane);
plane.rotation.x = -0.5 * Math.PI; // Поворот плиты.
plane.position.set(0, -2, 0) // Поворот плиты.
plane.receiveShadow = true; // Плоскость получает тень, которую излучает модель


// 12) Вспомогательная система координат экстерьер
// const axesHelper = new THREE.AxesHelper(85);
// scene1.add(axesHelper);


// 13) Перемещение по координатам при клике на кнопки или интерьер экстерьер
function MyCoordinates(xPos, yPos, zPos, dur) {
    gsap.to(camera1.position, {
        x: xPos,
        y: yPos,
        z: zPos,
        duration: dur,
        onUpdate: function() {
            camera1.lookAt(0, 0, 0);
        }
    });
}

const coordinates = [
    [-4.709869959805082, 1.3231521819422856, -3.4736714388593297, 1.5],
    [4.419631461529943, 1.366719430512851, -3.82085536791349, 1.5],
    [4.612135343130454, 3.8370701385486443, 0.07141658424494553, 1.5],
    [4.548391730389692, 1.5106187886098281, 3.6097317826151065, 1.5],
    [-171.85716505033145, 74.93456415868356, 86.89998171402281, 1.5],
    [-51.38847217341723, 55.119928388623705, 29.436440217618962, 1.5]
];
//
// const go_to = document.querySelectorAll('.go_to');
//
// go_to.forEach((item, i) => {
//     item.addEventListener('click', () => {
//         const [x, y, z, dur] = coordinates[i];
//         MyCoordinates(x, y, z, dur);
//     });
// });


// Сцена интерьера Амарок

// 1) Фон интерьер
const scene2 = new THREE.Scene(LoadingManager);
scene2.background = new THREE.Color(0x000000)
//
// // 2) Камера и управление камерой интерьер
const initialCameraPosition2 = new THREE.Vector3(-0.0006, -0.00006, 0.0001);
const camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera2.position.copy(initialCameraPosition2);

const controls2 = new OrbitControls(camera2, renderer.domElement);
controls2.enabled = false;
controls2.update();

// 3) Свет интерьер
// let ambientLightScene_2 = new THREE.AmbientLight(0x40404,2000);
let ambientLightScene_2 = new THREE.AmbientLight(0xffffff,4);
scene2.add(ambientLightScene_2);
//0x40404  1500
//0xfffff  8-10

// Сфера
// const textureLoader = new THREE.TextureLoader(LoadingManager);
// https://coddmac.store/THREE/360/Amarok/amarok_interior.jpg
// const textureLoader = new THREE.TextureLoader(LoadingManager);
// const sphereGeometry = new THREE.SphereBufferGeometry(1000, 50, 50);
// const sphereMaterial = new THREE.MeshBasicMaterial({
//     map: textureLoader.load('https://coddmac.store/THREE/360/Amarok/amarok.jpg'),
//     side: THREE.BackSide,
// });
// sphereMaterial.map.wrapS = THREE.RepeatWrapping;
// sphereMaterial.map.repeat.x = -1; // Инвертирование UV-координат на внутренней стороне сферы
// const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
// scene2.add(sphere);
// sphere.position.set(0, 0, 0);
// sphere.castShadow = true;


let loader = new THREE.ImageLoader();
let texture = new THREE.Texture();

loader.load(
    'https://coddmac.store/THREE/360/Amarok/amarok.jpg',
    function (image) {
        texture.image = image;
        texture.needsUpdate = true;

        let sphereGeometry = new THREE.SphereGeometry(500, 32, 64);
        let sphereMaterial = new THREE.MeshPhysicalMaterial({
            map: texture,
            side: THREE.BackSide,
            color: '#fffff',
            opacity: 1,
            roughness: 0.5, // Нет отражений (матовый материал)
            metalness: 0, // Нет отражений (не металлический)
            transparent: false,
        });
        sphereMaterial.map.wrapS = THREE.RepeatWrapping;
        sphereMaterial.map.repeat.x = -1; // Инвертирование UV-координат на внутренней стороне сферы
        sphereGeometry.phiLength = 360;
        sphereGeometry.phiStart = 0;
        sphereGeometry.thetaLength = 180;
        sphereGeometry.thetaStart = 0;
        let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        scene2.add(sphere);
        sphere.position.set(0, 0, 0);
        sphere.castShadow = true;
        sphere.rotation.y = Math.PI;
    }
);


// const geometry = new THREE.SphereGeometry( 50, 32, 32 );
// // geometry.scale( - 1, 1, 1 );
//
// const texture = new THREE.TextureLoader().load( 'https://coddmac.store/THREE/360/Amarok/amarok.jpg' );
// texture.colorSpace = THREE.SRGBColorSpace;
// const material = new THREE.MeshBasicMaterial({
//     map: texture,
//     side: THREE.DoubleSide,
// });
// material.map.wrapS = THREE.RepeatWrapping;
// material.map.repeat.x = -1; // Инвертирование UV-координат на внутренней стороне сферы
// const mesh = new THREE.Mesh( geometry, material );
// scene2.add( mesh );






// 4) Вывод в сферу картинки в формате hdr интерьер

// const hdrTextureURL = new URL('https://coddmac.store/THREE/360/Amarok/amarok.hdr', import.meta.url);
// const rgbLoader = new RGBELoader(LoadingManager);
// rgbLoader.load(hdrTextureURL, (texture) => {
//     const sphereGeometry = new THREE.SphereGeometry(4, 60, 60); // Модель №3 Сфера В скобках радиус сферы и количество сегментов модели
//     const sphereMaterial = new THREE.MeshPhongMaterial({
//         map: texture,
//         // opacity: 1,
//         // transparent: true,
//         side: THREE.BackSide
//     });
//     sphereMaterial.map.wrapS = THREE.RepeatWrapping;
//     sphereMaterial.map.repeat.x = -1; // Инвертирование UV-координат на внутренней стороне сферы
//     const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
//     sphere.position.set(0, 0, 0);
//     scene2.add(sphere);
// })


// Переключение активной сцены
function animate() {
    if (activeScene === 1) {
        renderer.render(scene1, camera1);
    } else {
        renderer.render(scene2, camera2);
    }
}
renderer.setAnimationLoop(animate);


// Измененение размера сцены под размер экрана
window.addEventListener('resize', () => {
    camera1.aspect = window.innerWidth / window.innerHeight;
    camera1.updateProjectionMatrix();
    // camera2.aspect = window.innerWidth / window.innerHeight;
    // camera2.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Переключение между сценами при клике на кнопку с классом ".tech_spec__interior"
const interiorButton = document.querySelector('.tech_spec__interior');
const aFrameScene = document.querySelector('a-scene');

interiorButton.addEventListener('click', () => {
    if (activeScene === 1) {
        const [x, y, z, dur] = coordinates[5];
        MyCoordinates(x, y, z, dur);
        setTimeout(() => {
            activeScene = 2;
            aFrameScene.style.display = 'block';
            const [x2, y2, z2, dur2] = initialCameraPosition1.toArray();
            MyCoordinates(x2, y2, z2, dur2);
            controls1.enabled = false;
            controls2.enabled = true;
            animate();
        }, dur * 1000);
    } else {
        const [x, y, z, dur] = coordinates[4];
        MyCoordinates(x, y, z, dur);
        activeScene = 1;
        aFrameScene.style.display = 'none';
        setTimeout(() => {
            const [x2, y2, z2, dur2] = initialCameraPosition1.toArray();
            MyCoordinates(x2, y2, z2, dur2);
            controls1.enabled = true;
            controls2.enabled = false;
            animate();
        }, dur * 1000);
    }
});