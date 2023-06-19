import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js';
// import {FirstPersonControls} from "three/addons/controls/FirstPersonControls";
import gsap from "gsap";

const renderer = new THREE.WebGLRenderer({
    // precision: "lowp",
    antialias: true,
    physicallyCorrectLights: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let activeScene = 1;

// 1-я сцена
const scene1 = new THREE.Scene();
scene1.background = new THREE.Color(0x000000);

//0xffffff
//0x000000
//0xB5B8B1

const initialCameraPosition1 = new THREE.Vector3(-171.85716505033145, 74.93456415868356, 86.89998171402281);
const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera1.position.copy(initialCameraPosition1);

const controls1 = new OrbitControls(camera1, renderer.domElement);
controls1.minPolarAngle = 0;
controls1.maxPolarAngle = Math.PI * 0.5;
// controls1.minDistance = 200;
controls1.maxDistance = 350;
controls1.enabled = true;
controls1.update();

// const lightPositions1 = [
//     [-5.867325070813964, 0.875893944836542, 2.1671416628122966],
//     [-5.996793371323893, 0.55869131539196, -0.5149670786661111],
//     [-4.70987, 1.323152, -3.473671],
//     [4.548392, 1.510619, 3.609732],
//     // [6.541486076530456, 1.1843171131607289, 0.07006254067916627]
// ];

// const lightPositions1 = [
//     [0.000005999387780526352, 5.999999999997, -1.0269702929669093e-7],
//     [4.612135, 3.83707, 0.071417],
//     [4.419631, 1.366719, -3.820855],
//     [4.548392, 1.510619, 3.609732],
//     [-4.70987, 1.323152, -3.473671],
//     [-5.680156, 1.503211, 2.316328]
// ];

// lightPositions1.forEach(position => {
//     const light = new THREE.PointLight(0xffffff, 0.9);
//     light.position.set(position[0], position[1], position[2]);
//     scene1.add(light);
//     const helper = new THREE.PointLightHelper(light);
//     scene1.add(helper);
// });
//
// const light2 = new THREE.SpotLight(0xffffff, 0.9);
// light2.position.set(0.4414868941158466, 6.315789619633837, -0.1345017011849941);
// light2.angle = 0.7;
// scene1.add(light2);
// const helper2 = new THREE.SpotLightHelper(light2);
// scene1.add(helper2);

// Create Ambient and Point lights for the scene
const ambientLight = new THREE.AmbientLight(0xffffff);
const pointLight = new THREE.DirectionalLight(0xffffff, 2.5);
pointLight.position.set(4.535622620739531, 280.0453245202818, 24.052762487525687);
pointLight.castShadow = true;
scene1.add(ambientLight);
scene1.add(pointLight);

// const pointLightHelper = new THREE.DirectionalLightHelper(pointLight);
// scene1.add( pointLightHelper );


let gltfLoader = new GLTFLoader();
const dLoader = new DRACOLoader();
dLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
dLoader.setDecoderConfig({type: 'js'});
gltfLoader.setDRACOLoader(dLoader);
let obj;
let url = 'https://coddmac.store/THREE/3Dmodels/27/car4.gltf';
gltfLoader.load(url, function(gltf) {
    obj = gltf.scene;
    scene1.add(obj);
    console.log(obj.children);
    obj.position.set(0, 0, -27.5);

    // https://coddmac.store/THREE/3Dmodels/26/car.gltf
    // https://coddmac.store/THREE/3Dmodels/27/car4.gltf

    const PhoneHDR = new URL('../img/studio.hdr', import.meta.url);
    const rgbLoaderPhone = new RGBELoader();

    renderer.outputEncoding = THREE.sRGBEncoding; // Сопоставление цветов hdr фото
    renderer.toneMapping = THREE.ACESFilmicToneMapping;// Алгоритм отображения тонов

    rgbLoaderPhone.load(PhoneHDR, function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        // scene1.background = texture;
        scene1.environment = texture;
    });

    // Меняет Mesh как отдельно, так и внутри Group

    let names = [];
    let materialProperties = {};

    for (let i = 0; i < obj.children.length; i++) {
        names.push(obj.children[i].name);
    }

    for (let i = 0; i < names.length; i++) {
        let name = names[i];
        materialProperties[name] = createMaterialProperties(name);
    }

    function createMaterialProperties(name) {
        let properties = {};

        switch (name) {
            case 'Стекла_машины':
                properties.color = 0xB8B8B8;
                properties.roughness = 0;
                properties.metalness = 0.8;
                properties.transmission = 1;
                properties.ior = 1.450;
                properties.material = new THREE.MeshPhysicalMaterial(properties);
                // properties.thickness = 0.5;
                // properties.envMapIntensity = 1.0;
                // properties.emissive = 0x000000;
                // properties.emissiveIntensity = 1.0;
                break;
            case 'Фары':
                properties.color = 0xffffff; // Цвет света фар (белый)
                // properties.emissive = 0xffffff; // Цвет свечения фар (белый)
                // properties.emissiveIntensity = 1.0; // Максимальная интенсивность свечения фар
                // properties.emissiveMap = emissiveMap; // Текстура свечения фар (если есть)
                // properties.envMap = envMap; // Текстура сферической карты окружения
                properties.transmission = 0.9; // Небольшая прозрачность фар
                properties.transparent = true; // Включение прозрачности фар
                properties.depthWrite = false; // Отключение записи в буфер глубины для фар
                properties.material = new THREE.MeshPhysicalMaterial(properties);
                break;
            case 'кузов_+_прицеп':
                properties.color = 0x56B53F;
                properties.roughness = 0.1; // Низкая шероховатость
                properties.metalness = 1;
                properties.clearcoat = 0.1; // Интенсивность слоя лака
                properties.clearcoatRoughness = 0.1; // Шероховатость слоя лака
                // properties.transmission = 0.0;
                // properties.ior = 1.450;
                properties.material = new THREE.MeshPhysicalMaterial(properties);
                break;
            case 'проблесковый_мячок':
                properties.color = 0xB8B8B8;
                properties.roughness = 0;
                properties.metalness = 0.8;
                properties.transmission = 1;
                properties.ior = 1.450;
                properties.material = new THREE.MeshPhysicalMaterial(properties);
                break;
            case 'Рейлинги':
                properties.color = 0x000000;
                properties.roughness = 0.9;
                properties.metalness = 1;
                properties.material = new THREE.MeshPhysicalMaterial(properties);
                break;
            case 'Подножие_авто':
                properties.color = 0xffffff;
                properties.roughness = 0;
                properties.metalness = 1;
                properties.material = new THREE.MeshPhysicalMaterial(properties);
                break;
            case 'Дворники':
                properties.color = 0x000000;
                properties.roughness = 0.9;
                properties.metalness = 1;
                properties.material = new THREE.MeshPhysicalMaterial(properties);
                break;
            // Добавьте другие случаи, если необходимо
        }

        return properties;
    }

    console.log(materialProperties);

    obj.traverse(function(child) {
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

    window.addEventListener('mouseup', () => {
        console.log(camera1.position); // Выводим координаты камеры
    });
});

// // Плита или пол
// const planeGeometry = new THREE.CircleGeometry(200, 200); // Модель №2 Подложка
// const planeMaterial = new THREE.MeshPhysicalMaterial({     // Цвет
//     color: 0x090909,
//     roughness: 0,
//     metalness: 0.8,
//     transmission: 1,
//     ior: 1.450,
//     side: THREE.DoubleSide        // Применение ко всем сторонам
// });
// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// scene1.add(plane);
// plane.rotation.x = -0.5 * Math.PI; // Поворот плиты.
// plane.position.set(1.8, -0.6, 0) // Поворот плиты.
// plane.receiveShadow = true; // Плоскость получает тень, которую излучает модель Сфера перед источником света.

// 5. Вспомогательные объекты
// Вспомогательная система координат
const axesHelper = new THREE.AxesHelper(85);
scene1.add(axesHelper);

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

const go_to = document.querySelectorAll('.go_to');

go_to.forEach((item, i) => {
    item.addEventListener('click', () => {
        const [x, y, z, dur] = coordinates[i];
        MyCoordinates(x, y, z, dur);
    });
});

// 2-я сцена
const scene2 = new THREE.Scene();
scene2.background = new THREE.Color(0x000000);

const initialCameraPosition2 = new THREE.Vector3(-0.0006, -0.00006, 0.0001);
const camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera2.position.copy(initialCameraPosition2);

const controls2 = new OrbitControls(camera2, renderer.domElement);
controls2.enabled = false;
controls2.update();

const hLight = new THREE.AmbientLight(0x404040);
scene2.add(hLight);

const textureLoader = new THREE.TextureLoader();

// Сфера
// https://coddmac.store/THREE/360/Amarok/amarok.jpg
// https://coddmac.store/THREE/360/Amarok/20230421_161001_041.jpg
// https://coddmac.store/THREE/360/Amarok/IMG_20230425_124930_00_merged.jpg
const sphereGeometry = new THREE.SphereBufferGeometry(4, 30, 30);
const sphereMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('https://coddmac.store/THREE/360/Amarok/amarok.jpg'),
    side: THREE.BackSide, // Отрисовка на внутренней стороне сферы
});
sphereMaterial.map.wrapS = THREE.RepeatWrapping;
sphereMaterial.map.repeat.x = -1; // Инвертирование UV-координат на внутренней стороне сферы
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene2.add(sphere);
sphere.position.set(0, 0, 0);
// sphere.castShadow = true;

// Вывод в сферу картинки в формате hdr
// const hdrTextureURL = new URL('./img/photo_2023-04-21_16-11-51.hdr', import.meta.url);
// const rgbLoader = new RGBELoader();
// rgbLoader.load(hdrTextureURL, (texture) => {
//     const sphereGeometry = new THREE.SphereGeometry(4, 30, 30); // Модель №3 Сфера В скобках радиус сферы и количество сегментов модели
//     const sphereMaterial = new THREE.MeshPhongMaterial({
//         wireframe: false,  // Показываем сегменты модели
//         map: texture,
//         opacity: 1,
//         transparent: true,
//         side: THREE.DoubleSide
//     });
//     const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
//     scene.add(sphere);
//     sphere.position.set(0, 0, 0);
//     sphere.castShadow = true; // Модель Сфера отбрасывает тень, находясь перед источником света.
// })

function animate() {
    if (activeScene === 1) {
        renderer.render(scene1, camera1);
    } else {
        renderer.render(scene2, camera2);
    }
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', () => {
    camera1.aspect = window.innerWidth / window.innerHeight;
    camera1.updateProjectionMatrix();
    camera2.aspect = window.innerWidth / window.innerHeight;
    camera2.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Переключение между сценами при клике на кнопку с классом ".interior"
const interiorButton = document.querySelector('.tech_spec__interior');
interiorButton.addEventListener('click', () => {
    if (activeScene === 1) {
        const [x, y, z, dur] = coordinates[5];
        MyCoordinates(x, y, z, dur);
        setTimeout(() => {
            activeScene = 2;
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
        setTimeout(() => {
            const [x2, y2, z2, dur2] = initialCameraPosition1.toArray();
            MyCoordinates(x2, y2, z2, dur2);
            controls1.enabled = true;
            controls2.enabled = false;
            animate();
        }, dur * 1000);
    }
});