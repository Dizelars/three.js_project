import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
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

const initialCameraPosition1 = new THREE.Vector3(-171.85716505033145, 74.93456415868356, 86.89998171402281);
const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera1.position.copy(initialCameraPosition1);

const controls1 = new OrbitControls(camera1, renderer.domElement);
// controls1.minPolarAngle = 0;
// controls1.maxPolarAngle = Math.PI * 0.5;
controls1.minDistance = 6;
controls1.maxDistance = 1000;
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
const pointLight = new THREE.DirectionalLight(0xffffff);
pointLight.position.set(4.535622620739531, 280.0453245202818, 24.052762487525687);
pointLight.castShadow = true;
scene1.add(ambientLight);
scene1.add(pointLight);

const pointLightHelper = new THREE.DirectionalLightHelper(pointLight);
scene1.add( pointLightHelper );


let gltfLoader = new GLTFLoader();
const dLoader = new DRACOLoader();
dLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
dLoader.setDecoderConfig({type: 'js'});
gltfLoader.setDRACOLoader(dLoader);
let obj;
let url = 'https://coddmac.store/THREE/3Dmodels/25/car.gltf';
gltfLoader.load(url, function(gltf) {
    obj = gltf.scene;
    scene1.add(obj);
    console.log(obj.children);
    obj.position.set(0, 0, 0);

    // Изменение материалов модели и поиск по имени
    // obj.traverse(function(child) {
    //     if (child.isMesh) {
    //         const materials = child.material;
    //
    //         if (Array.isArray(materials)) {
    //             // Если материалы являются массивом
    //             materials.forEach(function(material, index) {
    //                 // console.log('Material', index + 1, ':', material);
    //
    //                 // Изменение параметров материала
    //                 // material.color.set(0xff0000); // Задание цвета
    //                 // material.map = texture; // Задание текстуры
    //                 // material.envMap = envMap; // Задание отражения окружающей среды
    //                 // material.opacity = 0.5; // Задание прозрачности
    //                 // material.shininess = 50; // Задание блеска
    //                 // material.specular.set(0xffffff); // Задание цвета отражаемого света
    //                 // material.size = 5; // Задание размера точек (для Points или PointCloud)
    //                 // material.side = THREE.DoubleSide; // Задание видимости сторон
    //
    //                 // Фильтрация материалов по ключу name
    //                 if (material.name === 'Стекла_машины') {
    //                     // Код для материала с определенным именем
    //                     console.log('Material with name "Стекла_машины":', material);
    //                 }
    //             });
    //         } else {
    //             // console.log('Material:', materials);
    //
    //             // Изменение параметров материала (аналогично массиву материалов)
    //             // materials.color.set(0xff0000);
    //             // materials.map = texture;
    //             // materials.envMap = envMap;
    //             // materials.opacity = 0.5;
    //             // materials.shininess = 50;
    //             // materials.specular.set(0xffffff);
    //             // materials.size = 5;
    //             // materials.side = THREE.DoubleSide;
    //
    //             // Фильтрация материалов по ключу name
    //             if (materials.name === 'myMaterial') {
    //                 // Код для материала с определенным именем
    //             }
    //         }
    //     }
    // });


    // Показывает массивы Mesh внутри Group

    // let names = [];
    // let materialProperties = {};
    //
    // for (let i = 0; i < obj.children.length; i++) {
    //     names.push(obj.children[i].name);
    // }
    //
    // for (let i = 0; i < names.length; i++) {
    //     let name = names[i];
    //     materialProperties[name] = createMaterialProperties(name);
    // }
    //
    // function createMaterialProperties(name) {
    //     let properties = {};
    //
    //     switch (name) {
    //         case 'Стекла_машины':
    //             properties.color = 0xff0000;
    //             properties.roughness = 0.5;
    //             properties.metalness = 0.8;
    //             properties.envMapIntensity = 1.0;
    //             properties.emissive = 0x000000;
    //             properties.emissiveIntensity = 1.0;
    //             break;
    //         case 'Фары':
    //             properties.color = 0x00ff00;
    //             properties.roughness = 0.4;
    //             properties.metalness = 0.6;
    //             break;
    //         case 'проблесковый_мячок':
    //             properties.color = 0x0000ff;
    //             properties.roughness = 0.6;
    //             properties.metalness = 0.4;
    //             break;
    //         // Добавьте другие случаи, если необходимо
    //     }
    //
    //     return properties;
    // }
    //
    // console.log(materialProperties);
    //
    // obj.traverse(function(child) {
    //     if (names.includes(child.name) && (child.isMesh || child.isGroup)) {
    //         const material = child.material;
    //         const group = child.children;
    //         console.log(group);
    //         setMaterialProperties(material, child.name);
    //     }
    // });
    //
    // function setMaterialProperties(material, name) {
    //     const properties = materialProperties[name];
    //
    //     if (properties) {
    //         if (properties.color) material.color.set(properties.color);
    //         if (properties.roughness) material.roughness = properties.roughness;
    //         if (properties.metalness) material.metalness = properties.metalness;
    //         // и другие свойства
    //     }
    // }

    // Меняет только все Mesh внутри Group

    // let names = [];
    // let materialProperties = {};
    //
    // for (let i = 0; i < obj.children.length; i++) {
    //     names.push(obj.children[i].name);
    // }
    //
    // for (let i = 0; i < names.length; i++) {
    //     let name = names[i];
    //     materialProperties[name] = createMaterialProperties(name);
    // }
    //
    // function createMaterialProperties(name) {
    //     let properties = {};
    //
    //     switch (name) {
    //         case 'Стекла_машины':
    //             properties.color = 0xff0000;
    //             properties.roughness = 0.5;
    //             properties.metalness = 0.8;
    //             properties.envMapIntensity = 1.0;
    //             properties.emissive = 0x000000;
    //             properties.emissiveIntensity = 1.0;
    //             break;
    //         case 'Фары':
    //             properties.color = 0x00ff00;
    //             properties.roughness = 0.4;
    //             properties.metalness = 0.6;
    //             break;
    //         case 'проблесковый_мячок':
    //             properties.color = 0x0000ff;
    //             properties.roughness = 0.6;
    //             properties.metalness = 0.4;
    //             break;
    //         // Добавьте другие случаи, если необходимо
    //     }
    //
    //     return properties;
    // }
    //
    // console.log(materialProperties);
    //
    // obj.traverse(function(child) {
    //     if (names.includes(child.name) && (child.isMesh || child.isGroup)) {
    //         if (child.isMesh) {
    //             const material = child.material;
    //             setMaterialProperties(material, child.name);
    //         } else if (child.isGroup) {
    //             const materials = child.material;
    //             child.traverse(function(mesh) {
    //                 if (mesh.isMesh) {
    //                     setMaterialProperties(mesh.material, child.name);
    //                 }
    //             });
    //         }
    //     }
    // });
    //
    // function setMaterialProperties(material, name) {
    //     const properties = materialProperties[name];
    //
    //     if (properties) {
    //         if (properties.color) material.color.set(properties.color);
    //         if (properties.roughness) material.roughness = properties.roughness;
    //         if (properties.metalness) material.metalness = properties.metalness;
    //         // и другие свойства
    //     }
    // }

    // Меняет только Mesh

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
                properties.color = 0xff0000;
                properties.roughness = 0.5;
                properties.metalness = 0.8;
                properties.envMapIntensity = 1.0;
                properties.emissive = 0x000000;
                properties.emissiveIntensity = 1.0;
                break;
            case 'Фары':
                properties.color = 0x00ff00;
                properties.roughness = 0.4;
                properties.metalness = 0.6;
                break;
            case 'проблесковый_мячок':
                properties.color = 0x0000ff;
                properties.roughness = 0.6;
                properties.metalness = 0.4;
                break;
            // Добавьте другие случаи, если необходимо
        }

        return properties;
    }

    console.log(materialProperties);

    obj.traverse(function(child) {
        if (names.includes(child.name)) {
            if (child.isMesh) {
                const material = child.material;
                console.log(material);
                setMaterialProperties(material, child.name);
            } else if (child.isGroup) {
                child.traverse(function(groupChild) {
                    if (groupChild.isMesh) {
                        const material = groupChild.material;
                        // console.log(material);
                        setMaterialProperties(material, groupChild.name);
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


    // Должно менять все

    // let names = [];
    // let materialProperties = {};
    //
    // for (let i = 0; i < obj.children.length; i++) {
    //     names.push(obj.children[i].name);
    // }
    //
    // for (let i = 0; i < names.length; i++) {
    //     let name = names[i];
    //     materialProperties[name] = createMaterialProperties(name);
    // }
    //
    // function createMaterialProperties(name) {
    //     let properties = {};
    //
    //     switch (name) {
    //         case 'Стекла_машины':
    //             properties.color = 0xff0000;
    //             properties.roughness = 0.5;
    //             properties.metalness = 0.8;
    //             properties.envMapIntensity = 1.0;
    //             properties.emissive = 0x000000;
    //             properties.emissiveIntensity = 1.0;
    //             break;
    //         case 'Фары':
    //             properties.color = 0x00ff00;
    //             properties.roughness = 0.4;
    //             properties.metalness = 0.6;
    //             break;
    //         case 'проблесковый_мячок':
    //             properties.color = 0x0000ff;
    //             properties.roughness = 0.6;
    //             properties.metalness = 0.4;
    //             break;
    //         // Добавьте другие случаи, если необходимо
    //     }
    //
    //     return properties;
    // }
    //
    // console.log(materialProperties);
    //
    // obj.traverse(function (child) {
    //     if (child.isGroup) {
    //         const groupName = child.name;
    //         const groupProperties = materialProperties[groupName];
    //         if (groupProperties) {
    //             child.traverse(function (mesh) {
    //                 if (mesh.isMesh) {
    //                     const meshName = mesh.name;
    //                     const meshProperties = materialProperties[meshName];
    //                     setMaterialProperties(mesh, meshProperties || groupProperties);
    //                 }
    //             });
    //         }
    //     } else if (child.isMesh) {
    //         const meshName = child.name;
    //         const meshProperties = materialProperties[meshName];
    //         setMaterialProperties(child, meshProperties);
    //     }
    // });
    //
    // function setMaterialProperties(object, properties) {
    //     const material = object.material;
    //     if (properties && material) {
    //         if (properties.hasOwnProperty('color')) material.color.set(properties.color);
    //         if (properties.hasOwnProperty('roughness')) material.roughness = properties.roughness;
    //         if (properties.hasOwnProperty('metalness')) material.metalness = properties.metalness;
    //         // и другие свойства
    //     }
    // }






    window.addEventListener('mouseup', () => {
        console.log(camera1.position); // Выводим координаты камеры
    });
});

// https://coddmac.store/THREE/3Dmodels/25/car.gltf
// https://coddmac.store/THREE/3Dmodels/bus/1/cop2y.gltf
// https://coddmac.store/THREE/3Dmodels/bus/2/cop2y.gltf

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
// const axesHelper = new THREE.AxesHelper(85);
// scene1.add(axesHelper);

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
    [-5.680156277820456, 1.5032113113583057, 2.3163283637778207, 1.5],
    [-1.6416573959597511, 1.1981686266100635, 1.2447508461030132, 1.5]
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