// import * as THREE from "three";
//
// // Ширина экрана
// const screenWidth = window.innerWidth;
//
// let clipShadowsSwitch;
// clipShadowsSwitch = screenWidth >= 850;
//
// const textures = {
//     mapTexture: null,
//     mapTextureFara: null,
//     mapTexture2: null
// };
//
// let mapTextureKuzov;
// let mapNormalKuzov;
// let mapTextureKrilo;
// let mapNormalKrilo;
// let mapNormalWheel;
//
// if (screenWidth >= 850) {
//     mapTextureKuzov = 'https://coddmac.store/THREE/3Dmodels/ford/ford_last_2/base_clr.png';
//     mapNormalKuzov = 'https://coddmac.store/THREE/3Dmodels/ford/ford_last_2/base_nrm.png';
//     mapTextureKrilo = 'https://coddmac.store/THREE/3Dmodels/ford/ford_last_2/sides.png';
//     mapNormalKrilo = 'https://coddmac.store/THREE/3Dmodels/ford/ford_last_2/sides_nrm.png';
//     mapNormalWheel = 'https://coddmac.store/THREE/3Dmodels/ford/ford_last_2/wheel_nrm.png';
// } else {
//     mapTextureKuzov = 'https://coddmac.store/THREE/3Dmodels/ford/ford_last_2/base_clr.png';
//     mapNormalKuzov = 'https://coddmac.store/THREE/3Dmodels/ford/ford_last_2/base_nrm.png';
//     mapTextureKrilo = 'https://coddmac.store/THREE/3Dmodels/ford/ford_last_2/sides.png';
//     mapNormalKrilo = 'https://coddmac.store/THREE/3Dmodels/ford/ford_last_2/sides_nrm.png';
//     mapNormalWheel = 'https://coddmac.store/THREE/3Dmodels/ford/ford_last_2/wheel_nrm.png';
// }
//
// function loadTextures() {
//     const textureLoader = new THREE.TextureLoader();
//     textures.mapTextureKuzov = textureLoader.load(mapTextureKuzov);
//     textures.mapNormalKuzov = textureLoader.load(mapNormalKuzov);
//     textures.mapTextureKrilo = textureLoader.load(mapTextureKrilo);
//     textures.mapNormalKrilo = textureLoader.load(mapNormalKrilo);
//     textures.mapNormalWheel = textureLoader.load(mapNormalWheel);
//     textures.mapTextureKuzov.flipY = false;
//     // textures.mapTextureKuzov.flipX = false;
//     // textures.mapTextureKuzov.flipZ = false;
//     textures.mapNormalKuzov.flipY = false;
//     textures.mapTextureKrilo.flipY = false;
//     textures.mapNormalKrilo.flipY = false;
//     textures.mapNormalWheel.flipY = false;
// }
//
// loadTextures();
//
// let CastomMaterial = 'MeshPhysicalMaterial';
//
// // Использовать ли смещение полигонов. По умолчанию значение false. Это соответствует WebGL-функции GL_POLYGON_OFFSET_FILL
// // depthWrite: false,
// // polygonOffset: true,
// // polygonOffsetFactor: -4
// // transparent: false,
//
// const materials = {
//     Window: {
//         material: CastomMaterial,
//         color: 0xB8B8B8,
//         roughness: 0.1,
//         metalness: 0.8,
//         transmission: 1,
//         ior: 1.450,
//     },
//     Glass: {
//         material: CastomMaterial,
//         // color: 0xB8B8B8,
//         color: 0xffffff,
//         roughness: 0,
//         metalness: 0,
//         transmission: 1,
//         transparent: false,
//         thickness: 0.6,
//         clearcoat: 0.5,
//         clearcoatRoughness: 0.01,
//         // opacity: 0.4
//     },
//     Red_glass: {
//         material: CastomMaterial,
//         color: 0xA52019,
//         roughness: 0,
//         metalness: 0,
//         transmission: 1,
//         transparent: false,
//         thickness: 0.6,
//         clearcoat: 0.5,
//         clearcoatRoughness: 0.01,
//         // opacity: 0.4
//     },
//     Probleskovi_mayachok: {
//         material: CastomMaterial,
//         color: 0xffffff,
//         roughness: 0.4,
//         metalness: 0.5,
//         transmission: 1,
//         ior: 1.450,
//     },
//     Kuzov001: {
//         material: CastomMaterial,
//         roughness: 0.6,
//         metalness: 0.7,
//         clearcoat: 0.5,
//         clearcoatRoughness: 0.1,
//         map: textures.mapTextureKuzov,
//         // metalnessMap: textures.metalnessMap,
//         // normalMap: textures.mapNormalKuzov,
//         side: THREE.FrontSide,
//         clipShadows: clipShadowsSwitch,
//         opacity: 0,
//         polygonOffset: true,
//     },
//     krilo1: {
//         material: CastomMaterial,
//         color: 0x000000,
//         // color: 0xff0000,
//         roughness: 0.5,
//     },
//     Metall: {
//         material: CastomMaterial,
//         color: 0xBCBCBC,
//         roughness: 0.2,
//         metalness: 1
//     },
//     Radiator_black: {
//         material: CastomMaterial,
//         color: 0x000000,
//         // color: 0xff0000,
//         roughness: 0.5,
//     },
//     Others: {
//         material: CastomMaterial,
//         color: 0xff0000,
//         // roughness: 0.5,
//     },
//     // Interior: {
//     //     material: CastomMaterial,
//     //     color: 0x626262,
//     //     // roughness: 1
//     // },
//     // Tires: {
//     //     material: CastomMaterial,
//     //     color: 0x232323,
//     //     normalMap: textures.normalMap,
//     //     roughness: 0.6,
//     // },
// };
//
// export function createMaterialProperties(name) {
//     const materialData = materials[name];
//     if (!materialData) {
//         return {};
//     }
//
//     const properties = { ...materialData };
//     const materialType = materialData.material;
//
//     let materialConstructor;
//     switch (materialType) {
//         case 'MeshPhysicalMaterial':
//             materialConstructor = THREE.MeshPhysicalMaterial;
//             break;
//         case 'MeshStandardMaterial':
//             materialConstructor = THREE.MeshStandardMaterial;
//             break;
//         case 'MeshPhongMaterial':
//             materialConstructor = THREE.MeshPhongMaterial;
//             break;
//         default:
//             materialConstructor = THREE.MeshBasicMaterial;
//     }
//
//     properties.material = new materialConstructor(properties);
//     return properties;
// }