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
// // map
// // let mapTextureMainUrl;
// // let mapTextureFaraUrl;
// let mapTextureMain_2Url;
//
// // metalnessMap
// let metalnessMapMainUrl;
//
// // normalMap
// let normalMapMainUrl;
// // Solaris_low_1_Solaris_Texture_BaseColor.png
// // Solaris_low_1_Solaris_Texture_BaseColor2.png
//
// if (screenWidth >= 850) {
//     // mapTextureMainUrl = 'https://coddmac.store/THREE/3Dmodels/47/uv-1.png';
//     // mapTextureFaraUrl = 'https://coddmac.store/THREE/3Dmodels/47/fara.png';
//     mapTextureMain_2Url = 'https://coddmac.store/THREE/3Dmodels/solaris_green/solaris_18/Solaris_low_1_Solaris_Texture_BaseColor4.png';
//
//     metalnessMapMainUrl = 'https://coddmac.store/THREE/3Dmodels/solaris_green/solaris_18/Solaris_low_1_Solaris_Texture_Metallic-Solaris_low_1_Solaris_Texture_Roughness.png';
//     normalMapMainUrl = 'https://coddmac.store/THREE/3Dmodels/solaris_green/solaris_18/Solaris_low_1_Solaris_Texture_Normal.png';
// } else {
//     // mapTextureMainUrl = 'https://coddmac.store/THREE/3Dmodels/49/uv.png';
//     // mapTextureFaraUrl = 'https://coddmac.store/THREE/3Dmodels/49/fara.png';
//     mapTextureMain_2Url = 'https://coddmac.store/THREE/3Dmodels/solaris_green/solaris_18/Solaris_low_1_Solaris_Texture_BaseColor4.png';
//
//     metalnessMapMainUrl = 'https://coddmac.store/THREE/3Dmodels/solaris_green/solaris_18/Solaris_low_1_Solaris_Texture_Metallic-Solaris_low_1_Solaris_Texture_Roughness.png';
//     normalMapMainUrl = 'https://coddmac.store/THREE/3Dmodels/solaris_green/solaris_18/Solaris_low_1_Solaris_Texture_Normal.png';
// }
//
// function loadTextures() {
//     const textureLoader = new THREE.TextureLoader();
//     // textures.mapTextureMain = textureLoader.load(mapTextureMainUrl);
//     // textures.mapTextureFara = textureLoader.load(mapTextureFaraUrl);
//     textures.mapTextureMain_2 = textureLoader.load(mapTextureMain_2Url);
//
//     textures.metalnessMap = textureLoader.load(metalnessMapMainUrl);
//     textures.normalMap = textureLoader.load(normalMapMainUrl);
//
//     // textures.mapTextureMain.flipY = false;
//     textures.mapTextureMain_2.flipY = false;
//     // textures.mapTextureFara.flipY = false;
//     textures.metalnessMap.flipY = false;
//     textures.normalMap.flipY = false;
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
//     Windows: {
//         material: CastomMaterial,
//         color: 0xB8B8B8,
//         roughness: 0.1,
//         metalness: 0.8,
//         transmission: 1,
//         ior: 1.450,
//     },
//     Glass: {
//         material: CastomMaterial,
//         color: 0xB8B8B8,
//         roughness: 0,
//         metalness: 0,
//         transmission: 1,
//         transparent: false,
//         thickness: 0.6,
//         clearcoat: 0.5,
//         clearcoatRoughness: 0.01,
//         // opacity: 0.4
//     },
//     Glass_1: {
//         material: CastomMaterial,
//         color: 0xffffff,
//         roughness: 0.4,
//         metalness: 0.5,
//         transmission: 1,
//         ior: 1.450,
//     },
//     // Front_Headlights: {
//     //     material: CastomMaterial,
//     //     color: 0xffffff,
//     //     roughness: 0.4,
//     //     metalness: 0.9,
//     //     transmission: 1,
//     //     transparent: true,
//     //     opacity: 0.6
//     // },
//     // Back_Headlights: {
//     //     material: CastomMaterial,
//     //     color: 0xA52019,
//     //     roughness: 0.2,
//     //     metalness: 0.9,
//     //     transmission: 1,
//     //     transparent: true,
//     //     opacity: 0.8
//     // },
//     Body: {
//         material: CastomMaterial,
//         // color: 0x12CE16,
//         roughness: 0.6,
//         metalness: 0.7,
//         clearcoat: 0.5,
//         clearcoatRoughness: 0.1,
//         map: textures.mapTextureMain_2,
//         // metalnessMap: textures.metalnessMap,
//         // normalMap: textures.normalMap,
//         side: THREE.FrontSide,
//         clipShadows: clipShadowsSwitch,
//         opacity: 0,
//         // depthWrite: false,
//         polygonOffset: true,
//         // polygonOffsetFactor: -4
//     },
//     Metal: {
//         material: CastomMaterial,
//         color: 0xBCBCBC,
//         roughness: 0.2,
//         metalness: 1
//     },
//     // Radiator: {
//     //     material: CastomMaterial,
//     //     map: textures.mapTextureMain_2,
//     //     color: 0xBCBCBC,
//     //     roughness: 0.2,
//     //     metalness: 1
//     // },
//     Radiator_1: {
//         material: CastomMaterial,
//         // map: textures.mapTextureMain_2,
//         color: 0x000000,
//         roughness: 0.5,
//     },
//     Radiator_2: {
//         material: CastomMaterial,
//         color: 0x000000,
//         roughness: 0.2,
//     },
//     Radiator_3: {
//         material: CastomMaterial,
//         roughness: 0.2,
//         metalness: 1
//     },
//     Interior: {
//         material: CastomMaterial,
//         color: 0x626262,
//         // roughness: 1
//     },
//     Tires: {
//         material: CastomMaterial,
//         color: 0x232323,
//         normalMap: textures.normalMap,
//         roughness: 0.6,
//         // metalness: 0.0
//     },
//     // main001: {
//     //     color: 0x000000,
//     //     roughness: 0.9,
//     //     metalness: 1
//     // },
//     // main: {
//     //     material: CastomMaterial,
//     //     roughness: 0.4,
//     //     metalness: 0.7,
//     //     clearcoat: 0.3,
//     //     clearcoatRoughness: 0.3,
//     //     map: textures.mapTextureMain,
//     //     side: THREE.DoubleSide,
//     //     clipShadows: clipShadowsSwitch,
//     //     // depthWrite: false,
//     //     polygonOffset: true,
//     //     // polygonOffsetFactor: -4
//     // },
//     // Main: {
//     //     material: CastomMaterial,
//     //     roughness: 0.4,
//     //     metalness: 0.7,
//     //     clearcoat: 0.3,
//     //     clearcoatRoughness: 0.3,
//     //     map: textures.mapTextureMain,
//     //     side: THREE.DoubleSide,
//     //     clipShadows: clipShadowsSwitch,
//     //     // depthWrite: false,
//     //     polygonOffset: true,
//     //     // polygonOffsetFactor: -4
//     // },
//     // main002: {
//     //     material: CastomMaterial,
//     //     roughness: 0.4,
//     //     metalness: 0.7,
//     //     clearcoat: 0.3,
//     //     clearcoatRoughness: 0.3,
//     //     map: textures.mapTextureMain,
//     //     side: THREE.DoubleSide,
//     //     clipShadows: clipShadowsSwitch,
//     //     // depthWrite: false,
//     //     polygonOffset: true,
//     //     // polygonOffsetFactor: -4
//     // },
//     // main003: {
//     //     material: CastomMaterial,
//     //     roughness: 0.4,
//     //     metalness: 0.7,
//     //     clearcoat: 0.3,
//     //     clearcoatRoughness: 0.3,
//     //     map: textures.mapTextureMain,
//     //     side: THREE.DoubleSide,
//     //     clipShadows: clipShadowsSwitch,
//     //     // depthWrite: false,
//     //     polygonOffset: true,
//     //     // polygonOffsetFactor: -4
//     // },
//     // main004: {
//     //     material: CastomMaterial,
//     //     roughness: 0.4,
//     //     metalness: 0.7,
//     //     clearcoat: 0.3,
//     //     clearcoatRoughness: 0.3,
//     //     map: textures.mapTextureMain,
//     //     side: THREE.DoubleSide,
//     //     clipShadows: clipShadowsSwitch,
//     //     // depthWrite: false,
//     //     polygonOffset: true,
//     //     // polygonOffsetFactor: -4
//     // },
//     // tablo: {
//     //     material: CastomMaterial,
//     //     roughness: 0.4,
//     //     metalness: 0.7,
//     //     clearcoat: 0.3,
//     //     clearcoatRoughness: 0.3,
//     //     map: textures.mapTextureMain,
//     //     side: THREE.DoubleSide,
//     //     clipShadows: clipShadowsSwitch,
//     //     // depthWrite: false,
//     //     polygonOffset: true,
//     //     // polygonOffsetFactor: -4
//     // },
//     // Fari_perednie_stekla: {
//     //     material: CastomMaterial,
//     //     color: 0xffffff,
//     //     roughness: 0.2,
//     //     metalness: 0.9,
//     //     transmission: 1,
//     //     transparent: true,
//     //     opacity: 0.4
//     // },
//     // Fari_nizhnie: {
//     //     material: CastomMaterial,
//     //     color: 0xffffff,
//     //     roughness: 0.2,
//     //     metalness: 0.9,
//     //     transmission: 1,
//     //     transparent: true,
//     //     opacity: 0.4
//     // },
//     // Fari_perednie_zad: {
//     //     color: 0xffffff,
//     //     roughness: 0,
//     //     metalness: 1
//     // },
//     // Fari_perednie_pravolevo_vnutri: {
//     //     roughness: 1,
//     //     metalness: 0,
//     //     map: textures.mapTextureFara,
//     //     side: THREE.DoubleSide
//     // },
//     // Ekran: {
//     //     material: CastomMaterial,
//     //     roughness: 0.4,
//     //     metalness: 0.7,
//     //     clearcoat: 0.3,
//     //     clearcoatRoughness: 0.3,
//     //     map: textures.mapTextureMain,
//     //     clipShadows: clipShadowsSwitch,
//     //     side: THREE.DoubleSide
//     // },
//     // Ekran2: {
//     //     material: CastomMaterial,
//     //     color: 0x000000,
//     //     roughness: 0.1,
//     //     metalness: 0.8,
//     //     transmission: 1,
//     //     ior: 1.450,
//     //     clipShadows: clipShadowsSwitch
//     // },
//     // Mayachok: {
//     //     material: CastomMaterial,
//     //     color: 0xffffff,
//     //     roughness: 0.2,
//     //     metalness: 0.9,
//     //     transmission: 1,
//     //     transparent: true,
//     //     opacity: 0.7
//     // },
//     // Mayachokvnutri: {
//     //     color: 0xffffff,
//     //     // roughness: 0,
//     //     // metalness: 1
//     // },
//     // Reylingi: {
//     //     color: 0x000000,
//     //     // roughness: 0.9,
//     //     // metalness: 1
//     // },
//     // Podnozhka: {
//     //     material: CastomMaterial,
//     //     color: 0x000000,
//     //     roughness: 0.2,
//     //     metalness: 0.9
//     // },
//     // Dvorniki: {
//     //     color: 0x000000,
//     //     // roughness: 0.9,
//     //     // metalness: 1
//     // },
//     // Reshetka: {
//     //     color: 0x000000,
//     //     roughness: 0.9,
//     //     metalness: 1
//     // },
//     // Reshetka_metal: {
//     //     material: CastomMaterial,
//     //     color: 0xBCBCBC,
//     //     roughness: 0.2,
//     //     metalness: 1
//     // },
//     // Tormoza: {
//     //     color: 0x000000,
//     //     // roughness: 0.2,
//     //     // metalness: 0.0
//     // },
//     // Brzgoviki: {
//     //     color: 0x000000,
//     //     // roughness: 0.2,
//     //     // metalness: 0.9
//     // },
//     // Krishka_pod_bazazhnikom: {
//     //     material: CastomMaterial,
//     //     color: 0x000000,
//     //     roughness: 0.9,
//     //     metalness: 1
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