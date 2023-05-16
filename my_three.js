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

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

//0xd0d0d0

// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,0.1,1000);

const controls = new OrbitControls(camera, renderer.domElement);
controls.minPolarAngle = 0;
controls.maxPolarAngle =  Math.PI * 0.5;
// controls.minDistance = 8;
// controls.maxDistance = 13;

camera.position.set(-7.36836992196104, 2.0811091967427804, 3.114729667185521);
controls.update();

// Передвижение камеры в стиле кино
// const controlPosition = new FirstPersonControls(camera, renderer.domElement);
// controlPosition.movementSpeed = 5; // Скорость перемещения. По умолчанию 1.
// controlPosition.lookSpeed = 0.05; // Скорость оглядывания. По умолчанию 0,005.
// controlPosition.constrainVertical = true; // Ограничивает ли осмотр по вертикали [.verticalMin, .verticalMax]. По умолчанию - false.
// controlPosition.lookVertical = false; // Можно ли оглядываться по вертикали. По умолчанию - true.


// Свет
// const hLight = new THREE.AmbientLight (0x404040,2);
// scene.add(hLight);

const directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(0,1,0);
directionalLight.castShadow = true;
scene.add(directionalLight);

const light = new THREE.PointLight(0xc4c4c4,1.2);
light.position.set(0,300,500);
scene.add(light);

const light2 = new THREE.PointLight(0xc4c4c4,1.2);
light2.position.set(500,100,0);
scene.add(light2);

const light3 = new THREE.PointLight(0xc4c4c4,1.2);
light3.position.set(0,100,-500);
scene.add(light3);

const light4 = new THREE.PointLight(0xc4c4c4,1.2);
light4.position.set(-500,300,500);
scene.add(light4);


// const textureLoader = new THREE.TextureLoader();
// // Сфера
// const sphereGeometry = new THREE.SphereGeometry(4, 30, 30); // Модель №3 Сфера В скобках радиус сферы и количество сегментов модели
// const sphereMaterial = new THREE.MeshPhongMaterial({
//      wireframe: false,  // Показываем сегменты модели
//      map: textureLoader.load('https://i.ibb.co/Y3XC8tq/20230421-161001-041-2.jpg'),
//      opacity: 1,
//      transparent: true,
//      side: THREE.DoubleSide
//  });
//  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
//  scene.add(sphere);
//  sphere.position.set(23.043001596634266, 0.8264735004000033, 0.04629555732088334);
//  sphere.castShadow = true; // Модель Сфера отбрасывает тень, находясь перед источником света.


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


// Загрузка модели уже в сжатом формате

let gltfLoader = new GLTFLoader();
// const dLoader = new DRACOLoader();
// dLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
// dLoader.setDecoderConfig({type: 'js'});
// gltfLoader.setDRACOLoader(dLoader);

let obj;
gltfLoader.load('models/11/хай поли3.glb', function(gltf){
  obj = gltf.scene;
  scene.add(obj);
  obj.position.set(0, 0, 1.25);

  window.addEventListener('mouseup', () => {
      console.log(camera.position); // Выводим координаты камеры
  });
});

// Форматы:
// ./models/GLTF_15.05/car.gltf    Сжатый
// ./models/GLTF_2/car.gltf (тяжелый формат) БЕЗ DRACO
// ./models/GLTF_3/car.gltf (легкий формат)  DRACO
// ./models/GLB_4_compress/3глтф.glb  (самый легкий) DRACO


// 5. Вспомогательные объекты
// Вспомогательная система координат
// const axesHelper = new THREE.AxesHelper(7);
// scene.add(axesHelper);

// Вспомогательное направление света ПРОЖЕКТОР
// const sLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(sLightHelper);
// const sLightHelper_2 = new THREE.SpotLightHelper(spotLight_2);
// scene.add(sLightHelper_2);


// Движение камеры по координатам

function MyCoordinates(xPos, yPos, zPos, dur) {
    gsap.to(camera.position, {
        x: xPos,
        y: yPos,
        z: zPos,
        duration: dur,
        onUpdate: function () {
            camera.lookAt(0, 0, 0);
        }
    });
}

const go_to = document.querySelectorAll('.go_to');

go_to.forEach((item, i) => {
    item.addEventListener('click', () => {
        switch (i) {
            case 0 :
                MyCoordinates(-6.488568294527393, 1.8228449042914627, -4.785514563495294, 1.5);
                break;
            case 1 :
                MyCoordinates(5.303005116532745, 1.9245924107286163, -4.881144531392381, 1.5);
                break;
            case 2 :
                MyCoordinates(5.423930557944375, 5.1184082737645955, 0.18537851926200818, 1.5);
                break;
            case 3 :
                MyCoordinates(6.266107038291952, 2.0811091967427857, 4.97295875623096, 1.5);
                break;
            case 4 :
                MyCoordinates(-7.36836992196104, 2.0811091967427804, 3.114729667185521, 1.5);
                break;
        }
    });
});

function animate() {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

// Адаптивная сцена при изменении окна браузера
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});