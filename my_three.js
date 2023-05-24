import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
// import {FirstPersonControls} from "three/addons/controls/FirstPersonControls";
import gsap from "gsap";

const renderer = new THREE.WebGLRenderer({
    // precision: "lowp",
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let activeScene = 1;

// 1-я сцена
const scene1 = new THREE.Scene();
scene1.background = new THREE.Color(0x000000);

const initialCameraPosition1 = new THREE.Vector3(-5.680156277820456, 1.5032113113583057, 2.3163283637778207);
const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera1.position.copy(initialCameraPosition1);

const controls1 = new OrbitControls(camera1, renderer.domElement);
controls1.minPolarAngle = 0;
controls1.maxPolarAngle = Math.PI * 0.5;
controls1.minDistance = 6;
controls1.maxDistance = 9;
controls1.update();

const lightPositions1 = [
    [-6.6949320476748895, 0.6394380104152245, 0.2525267068988812],
    [-5.890447905989216, 0.28536090943213066, 2.5924728987819785],
    [-4.541980914648881, 0.7065124503210292, 3.7635398733832703],
    [1.5975045898229867, 2.2735571726268664, 3.2748116863335843],
    [8.79287998211111, 0.9465531822234525, -4.977844830639549],
    [-5.680156277820456, 1.5032113113583057, 2.3163283637778207]
];

lightPositions1.forEach(position => {
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(position[0], position[1], position[2]);
    scene1.add(light);
});

let gltfLoader = new GLTFLoader();
// const dLoader = new DRACOLoader();
// dLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
// dLoader.setDecoderConfig({type: 'js'});
// gltfLoader.setDRACOLoader(dLoader);
let obj;
let url = 'https://coddmac.store/THREE/3Dmodels/13/car.gltf';
gltfLoader.load(url, function(gltf) {
    obj = gltf.scene;
    scene1.add(obj);
    obj.position.set(0, 0, 0);

    window.addEventListener('mouseup', () => {
        console.log(camera1.position); // Выводим координаты камеры
    });
});

// Плита или пол
// const planeGeometry = new THREE.CircleGeometry(4.5, 50); // Модель №2 Подложка
// const planeMaterial = new THREE.MeshStandardMaterial({
//     color: 0x62a744,              // Цвет
//     side: THREE.DoubleSide        // Применение ко всем сторонам
// });
// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// scene.add(plane);
// plane.rotation.x = -0.5 * Math.PI; // Поворот плиты.
// plane.position.set(1.8, -0.6, 0) // Поворот плиты.
// plane.receiveShadow = true; // Плоскость получает тень, которую излучает модель Сфера перед источником света.

// 5. Вспомогательные объекты
// Вспомогательная система координат
// const axesHelper = new THREE.AxesHelper(7);
// scene.add(axesHelper);

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
    [-5.680156277820456, 1.5032113113583057, 2.3163283637778207, 1.5]
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
controls2.update();

const hLight = new THREE.AmbientLight(0x404040, 2);
scene2.add(hLight);

const textureLoader = new THREE.TextureLoader();

// Сфера
const sphereGeometry = new THREE.SphereBufferGeometry(4, 30, 30);
const sphereMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('https://coddmac.store/THREE/360/Amarok/20230421_161001_041.jpg'),
    side: THREE.BackSide, // Отрисовка на внутренней стороне сферы
});
sphereMaterial.map.wrapS = THREE.RepeatWrapping;
sphereMaterial.map.repeat.x = -1; // Инвертирование UV-координат на внутренней стороне сферы
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene2.add(sphere);
sphere.position.set(0, 0, 0);
sphere.castShadow = true;

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
const interierButton = document.querySelector('.interior');
interierButton.addEventListener('click', () => {
    if (activeScene === 1) {
        camera1.position.copy(initialCameraPosition1);
        controls1.reset();
    } else {
        camera2.position.copy(initialCameraPosition2);
        controls2.reset();
    }

    activeScene = (activeScene === 1) ? 2 : 1;

    // Сразу рендерим активную сцену после сброса камеры
    animate();
});