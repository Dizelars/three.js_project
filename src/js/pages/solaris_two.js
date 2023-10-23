import '../../js/layout/script.js';
import '../../js/loader.js';
// import * as THREE from 'three';
// import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
// import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
// import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js';
// import gsap from "gsap";
// import {createMaterialProperties} from '../three/functions/new_materials/create_material_solaris_green.js';
// import Stats from 'stats.js';
import { InteriorTransitionHelper } from '../../helpers/interiorTransitionHelper.js';
// // import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
// // import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';
// // import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
// // import {FirstPersonControls} from "three/addons/controls/FirstPersonControls";
// // import {func} from "three/nodes";
// // import * as AFRAME from "aframe";
//
//
// // const myFunction = require('../three/functions/dataMaterials.js');
// // myFunction('Второй');
//
//
//
// // Ширина экрана
// const screenWidth = window.innerWidth;
//
// let pixelRatio = window.devicePixelRatio
// let AA = true
// if (pixelRatio > 1) {
//     AA = false
// }
//
// // https://coddmac.store/THREE/3Dmodels/solaris_1/Solaris_Low.gltf
// // solaris_3
//
// // Условие для версии модели и отбрасывание тени
// let url;
// let ShadowSwitch;
// if (screenWidth >= 850) {
//     url = 'https://coddmac.store/THREE/3Dmodels/solaris_green/solaris_18/untitled.gltf';
//     ShadowSwitch = true;
// }
// // else {
// //     url = 'https://coddmac.store/THREE/3Dmodels/solaris_7/Solaris_Green_Textures.gltf';
// //     ShadowSwitch = false;
// // }
//
// // WebGLRenderer + настройки окружения
// const renderer = new THREE.WebGLRenderer({
//     antialias: AA,
//     physicallyCorrectLights: true,
// });
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.toneMapping = THREE.ACESFilmicToneMapping;// Алгоритм отображения тонов
// renderer.toneMappingExposure = 0.1;
// renderer.shadowMap.enabled = ShadowSwitch;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Качество отображения теней
// // renderer.setPixelRatio( window.devicePixelRatio * 0.9 );
// renderer.domElement.id = 'myCanvas';
//
//
// document.body.appendChild(renderer.domElement);
//
// // Менеджер загрузки
// const LoadingManager = new THREE.LoadingManager();
// const progressBar = document.getElementById('progress-bar');
// const progressLabel = document.getElementById('progress-label');
// const progressLoad = document.querySelector('.progress-bar-container > label');
// LoadingManager.onProgress = function(url, loaded, total) {
//     const progressPercent = Math.round((loaded / total) * 100);
//     progressBar.value = progressPercent;
//     progressLabel.textContent = `${progressPercent}%`;
//     if (progressPercent >= 50 && progressPercent < 70) {
//         progressLoad.textContent = 'Экипируемся...';
//     } else if (progressPercent >= 70 && progressPercent < 90) {
//         progressLoad.textContent = 'Проводим ТО...';
//     }else if (progressPercent >= 80 && progressPercent < 90) {
//         progressLoad.textContent = 'Моем машину...';
//     } else if (progressPercent >= 90) {
//         progressLoad.textContent = 'Мы готовы!';
//     }
// }
//
// // 3) onLoad - Запись по завершению загрузки.
// const progressBarContainer = document.querySelector('.progress-bar');
// LoadingManager.onLoad = function() {
//     setTimeout( () => {
//         progressBarContainer.style.display = 'none';
//     }, 0);
// }
//
// let stats = new Stats();
// // stats.showPanel(0, 1, 2);
// // stats.dom.classList.add('my-stats');
// // document.body.appendChild( stats.dom );
//
// let activeScene = 1;
// const scene1 = new THREE.Scene();
//
// // 1) Фон и туман сцены экстерьер
// scene1.background = new THREE.Color(0x000000);
// scene1.fog = new THREE.Fog(0x000000, 290, 600);
//
// const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const initialCameraPosition1 = new THREE.Vector3(-216, 94, 109);
// camera1.position.copy(initialCameraPosition1);
//
//
// const controls1 = new OrbitControls(camera1, renderer.domElement);
// // controls1.minPolarAngle = 0;
// // controls1.maxPolarAngle = Math.PI * 0.5;
// // controls1.minDistance = 210;
// // controls1.maxDistance = 260;
// // controls1.enabled = true;
// // controls1.enablePan = false;
// controls1.update();
//
//
// // 3) Свет экстерьер
// const lightPositions1 = [
//     [-203, 38, -112],
//     [-219, 37, -2],
//     [-199, 33, 83],
// ];
// lightPositions1.forEach(position => {
//     const light = new THREE.PointLight(0xffffff, 0.9);
//     light.position.set(position[0], position[1], position[2]);
//     scene1.add(light);
// });
//
// const SpotLight5 = new THREE.SpotLight(0xffffff, 3);
// SpotLight5.position.set(0, 470, -0);
// SpotLight5.castShadow = ShadowSwitch;
// SpotLight5.shadow.mapSize.height = 64; // Разрешение отображения теней
// SpotLight5.shadow.mapSize.width = 64; // Разрешение отображения теней
// SpotLight5.shadow.camera.near = 1.0;
// SpotLight5.shadow.camera.far = 550;
// // SpotLight5.shadow.camera.left = 1;
// // SpotLight5.shadow.camera.right = -1;
// // SpotLight5.shadow.camera.top = 1;
// // SpotLight5.shadow.camera.bottom = -1;
// SpotLight5.angle = 0.5;
// SpotLight5.penumbra = 1;
// scene1.add(SpotLight5);
//
// const RectAreaLight = new THREE.RectAreaLight(0xffffff, 100, 100, 50);
// RectAreaLight.position.set(10, 110, 120);
// RectAreaLight.castShadow = ShadowSwitch;
// RectAreaLight.lookAt( 0, 0, 0 );
// scene1.add( RectAreaLight );
//
// const RectAreaLight2 = new THREE.RectAreaLight(0xffffff, 50, 150, 100);
// RectAreaLight2.position.set(36, 56, -194);
// RectAreaLight2.castShadow = ShadowSwitch;
// RectAreaLight2.lookAt( 0, 0, 0 );
// scene1.add( RectAreaLight2 );
//
// // 4) Настройка GLTFLoader и сжатия модели DRACOLoader экстерьер
//
// let gltfLoader = new GLTFLoader(LoadingManager);
// const dLoader = new DRACOLoader();
// dLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
// dLoader.setDecoderConfig({type: 'js'});
// gltfLoader.setDRACOLoader(dLoader);
// let obj;
//
//
// // 5) Загрузка карты отражений на моделе экстерьер
// const PhoneJPG = new URL('../../img/garage.jpg', import.meta.url);
// const rgbLoaderPhone = new THREE.TextureLoader(LoadingManager);
// rgbLoaderPhone.load(PhoneJPG, function (texture) {
//     texture.mapping = THREE.EquirectangularReflectionMapping;
//     // scene1.background = texture;
//     scene1.environment = texture;
//
//     // 6) Загрузка gltf 3D модели экстерьер
//     gltfLoader.load(url, function(gltf) {
//         obj = gltf.scene;
//         scene1.add(obj);
//         console.log(obj.children);
//         // obj.position.set(-35, -3, -27.5);
//         obj.position.set(-15, 0, 25);
//         obj.rotation.y += -1.55;
//         // console.log(url);
//
//         // const box = new THREE.Box3().setFromObject(obj);
//         // const size = new THREE.Vector3();
//         // box.getSize(size);
//         // const linearSize = size.length();
//         // console.log('Linear size:', linearSize);
//
//         // 7) Меняем Mesh-материал модели как отдельно, так и внутри Group экстерьер
//         let names = [];
//         for (let i = 0; i < obj.children.length; i++) {
//             names.push(obj.children[i].name);
//         }
//         const materialProperties = names.reduce(function(props, name) {
//             props[name] = createMaterialProperties(name);
//             return props;
//         }, {});
//
//         const namesSet = new Set(names);
//
//         // 8) Функция с моими параметрами материалов экстерьер
//         createMaterialProperties();
//         console.log(materialProperties);
//
//         // 9) Обход загружаемой модели и замена материалов экстерьер
//         obj.traverse(function(child) {
//             if (child.isMesh) {
//                 child.castShadow = ShadowSwitch;
//                 child.frustumCulled = false;
//             }
//             if (child.isMesh && namesSet.has(child.name)) {
//                 const properties = materialProperties[child.name];
//                 if (properties && Object.keys(properties).length > 0 && properties.material) {
//                     child.material = properties.material;
//                     child.frustumCulled = false;
//                 }
//             }
//             else if (child.isGroup && namesSet.has(child.name)) {
//                 const groupProperties = materialProperties[child.name];
//                 child.frustumCulled = false;
//                 if (groupProperties && Object.keys(groupProperties).length > 0 && groupProperties.material) {
//                     child.traverse(function(groupChild) {
//                         if (groupChild.isMesh) {
//                             groupChild.material = groupProperties.material;
//                             groupChild.castShadow = ShadowSwitch;
//                             groupChild.frustumCulled = false;
//                         }
//                     });
//                 }
//             }
//         });
//
//         function setMaterialProperties(material, name) {
//             const properties = materialProperties[name];
//
//             if (properties) {
//                 if (properties.color) material.color.set(properties.color);
//                 if (properties.roughness) material.roughness = properties.roughness;
//                 if (properties.metalness) material.metalness = properties.metalness;
//             }
//         }
//     });
// });
//
// // 11) Пол + Загрузка текстуры бетона экстерьер
// const betonMapJPG = new URL('../../img/beton/betonMap.jpg', import.meta.url);
// const betonDmapJPG = new URL('../../img/beton/betonDmap.jpg', import.meta.url);
// const BetonLoader = new THREE.TextureLoader(LoadingManager);
// const BetonMap = BetonLoader.load(betonMapJPG);
// const BetonDmap= BetonLoader.load(betonDmapJPG);
// BetonMap.wrapS = THREE.RepeatWrapping; // Повторение текстуры по горизонтали
// BetonMap.wrapT = THREE.RepeatWrapping; // Повторение текстуры по вертикали
// BetonMap.repeat.set(4, 4); // Количество повторений текстуры
//
// const planeMaterial = new THREE.MeshPhongMaterial({
//     bumpScale: 2,
//     map: BetonMap,
//     displacementMap: BetonDmap,
//     displacementScale: 0.1,
//     side: THREE.DoubleSide, // Применение к обеим сторонам
// });
// const planeGeometry = new THREE.PlaneGeometry(750, 750, 5, 5); // Модель №2 Подложка
// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// scene1.add(plane);
// plane.rotation.x = -0.5 * Math.PI; // Поворот плиты.
// plane.position.set(0, -2, 0) // Поворот плиты.
// plane.receiveShadow = ShadowSwitch; // Плоскость получает тень, которую излучает модель
//
//
// // 12) Вспомогательная система координат экстерьер
// // const axesHelper = new THREE.AxesHelper(200);
// // scene1.add(axesHelper);
//
// // 13) Перемещение по координатам при клике на кнопки интерьер или экстерьер
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
//
// const coordinates = [
//     [-4.709869959805082, 1.3231521819422856, -3.4736714388593297, 1.5],
//     [4.419631461529943, 1.366719430512851, -3.82085536791349, 1.5],
//     [4.612135343130454, 3.8370701385486443, 0.07141658424494553, 1.5],
//     [4.548391730389692, 1.5106187886098281, 3.6097317826151065, 1.5],
//     [-216, 94, 109, 1.5],
//     [-51.38847217341723, 55.119928388623705, 29.436440217618962, 1.5]
// ];
//
// // Переключение активной сцены
// function animate() {
//     stats.begin();
//     renderer.render(scene1, camera1);
//     // console.log( renderer.info.render.triangles );
//     stats.end();
// }
// renderer.setAnimationLoop(animate);
//
// // Измененение размера сцены под размер экрана
// window.addEventListener('resize', () => {
//     camera1.aspect = window.innerWidth / window.innerHeight;
//     renderer.setSize(window.innerWidth, window.innerHeight);
// });
//
// // Переключение между сценами при клике на кнопку с классом ".tech_spec__interior"
// const interiorButton = document.querySelector('.tech_spec__interior');
// const aFrameScene = document.querySelector('a-scene');
//
// const transitionHelper = new InteriorTransitionHelper(interiorButton);
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
//             animate();
//             transitionHelper.endTransition();
//         }, dur * 1000);
//     }
// });

const interiorButton = document.querySelector('.tech_spec__interior');
const aFrameScene = document.querySelector('a-scene');
aFrameScene.pause();

let activeScene = 1;

const transitionHelper = new InteriorTransitionHelper(interiorButton);
interiorButton.addEventListener('click', () => {
    if (transitionHelper.isTransition()) {
        return;
    }
    transitionHelper.startTransition();
    if (activeScene === 1) {
        activeScene = 2;
        aFrameScene.style.opacity = '1';
        aFrameScene.style.height = 'auto';
        aFrameScene.style.pointerEvents = 'auto';
        aFrameScene.play();
        transitionHelper.endTransition();
    } else {
        activeScene = 1;
        aFrameScene.style.opacity = '0';
        aFrameScene.style.height = '0';
        aFrameScene.style.pointerEvents = 'none';
        aFrameScene.pause();
        transitionHelper.endTransition();
    }
});