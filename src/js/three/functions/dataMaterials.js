// import * as THREE from "three";

// const AllModelMaterial = {
//     amarok: {
//         Main_low: {
//             material: CastomMaterial,
//             roughness: 0.4,
//             metalness: 0.7,
//             clearcoat: 0.3,
//             clearcoatRoughness: 0.3,
//             map: textures.mapTextureMain_2,
//             // color: 0xff0000,
//             side: THREE.DoubleSide,
//             clipShadows: clipShadowsSwitch,
//             // depthWrite: false,
//             // polygonOffset: true,
//             // polygonOffsetFactor: -4
//         },
//         Main_2: {
//             material: CastomMaterial,
//             roughness: 0.4,
//             metalness: 0.7,
//             clearcoat: 0.3,
//             clearcoatRoughness: 0.3,
//             map: textures.mapTextureMain_2,
//             side: THREE.DoubleSide,
//             clipShadows: clipShadowsSwitch,
//             // depthWrite: false,
//             // polygonOffset: true,
//             // polygonOffsetFactor: -4
//         },
//         main001: {
//             color: 0x000000,
//             roughness: 0.9,
//             metalness: 1
//         },
//         main: {
//             material: CastomMaterial,
//             roughness: 0.4,
//             metalness: 0.7,
//             clearcoat: 0.3,
//             clearcoatRoughness: 0.3,
//             map: textures.mapTextureMain,
//             side: THREE.DoubleSide,
//             clipShadows: clipShadowsSwitch,
//             // depthWrite: false,
//             // polygonOffset: true,
//             // polygonOffsetFactor: -4
//         },
//         Main: {
//             material: CastomMaterial,
//             roughness: 0.4,
//             metalness: 0.7,
//             clearcoat: 0.3,
//             clearcoatRoughness: 0.3,
//             map: textures.mapTextureMain,
//             side: THREE.DoubleSide,
//             clipShadows: clipShadowsSwitch,
//             // depthWrite: false,
//             // polygonOffset: true,
//             // polygonOffsetFactor: -4
//         },
//         main002: {
//             material: CastomMaterial,
//             roughness: 0.4,
//             metalness: 0.7,
//             clearcoat: 0.3,
//             clearcoatRoughness: 0.3,
//             map: textures.mapTextureMain,
//             side: THREE.DoubleSide,
//             clipShadows: clipShadowsSwitch,
//             // depthWrite: false,
//             // polygonOffset: true,
//             // polygonOffsetFactor: -4
//         },
//         main003: {
//             material: CastomMaterial,
//             roughness: 0.4,
//             metalness: 0.7,
//             clearcoat: 0.3,
//             clearcoatRoughness: 0.3,
//             map: textures.mapTextureMain,
//             side: THREE.DoubleSide,
//             clipShadows: clipShadowsSwitch,
//             // depthWrite: false,
//             // polygonOffset: true,
//             // polygonOffsetFactor: -4
//         },
//         main004: {
//             material: CastomMaterial,
//             roughness: 0.4,
//             metalness: 0.7,
//             clearcoat: 0.3,
//             clearcoatRoughness: 0.3,
//             map: textures.mapTextureMain,
//             side: THREE.DoubleSide,
//             clipShadows: clipShadowsSwitch,
//             // depthWrite: false,
//             // polygonOffset: true,
//             // polygonOffsetFactor: -4
//         },
//         tablo: {
//             material: CastomMaterial,
//             roughness: 0.4,
//             metalness: 0.7,
//             clearcoat: 0.3,
//             clearcoatRoughness: 0.3,
//             map: textures.mapTextureMain,
//             side: THREE.DoubleSide,
//             clipShadows: clipShadowsSwitch,
//             // depthWrite: false,
//             // polygonOffset: true,
//             // polygonOffsetFactor: -4
//         },
//         Stekla: {
//             material: CastomMaterial,
//             color: 0xB8B8B8,
//             roughness: 0.1,
//             metalness: 0.8,
//             transmission: 1,
//             ior: 1.450,
//         },
//         Fari_perednie_stekla: {
//             material: CastomMaterial,
//             color: 0xffffff,
//             roughness: 0.2,
//             metalness: 0.9,
//             transmission: 1,
//             transparent: true,
//             opacity: 0.4
//         },
//         Fari_nizhnie: {
//             material: CastomMaterial,
//             color: 0xffffff,
//             roughness: 0.2,
//             metalness: 0.9,
//             transmission: 1,
//             transparent: true,
//             opacity: 0.4
//         },
//         Fari_perednie_zad: {
//             color: 0xffffff,
//             roughness: 0,
//             metalness: 1
//         },
//         Fari_perednie_pravolevo_vnutri: {
//             roughness: 1,
//             metalness: 0,
//             map: textures.mapTextureFara,
//             side: THREE.DoubleSide
//         },
//         Fari_zadnie: {
//             material: CastomMaterial,
//             color: 0xA52019,
//             roughness: 0.2,
//             metalness: 0.9,
//             transmission: 1,
//             transparent: true,
//             opacity: 0.8
//         },
//         Ekran: {
//             material: CastomMaterial,
//             roughness: 0.4,
//             metalness: 0.7,
//             clearcoat: 0.3,
//             clearcoatRoughness: 0.3,
//             map: textures.mapTextureMain,
//             clipShadows: clipShadowsSwitch,
//             side: THREE.DoubleSide
//         },
//         Ekran2: {
//             material: CastomMaterial,
//             color: 0x000000,
//             roughness: 0.1,
//             metalness: 0.8,
//             transmission: 1,
//             ior: 1.450,
//             clipShadows: clipShadowsSwitch
//         },
//         Mayachok: {
//             material: CastomMaterial,
//             color: 0xffffff,
//             roughness: 0.2,
//             metalness: 0.9,
//             transmission: 1,
//             transparent: true,
//             opacity: 0.7
//         },
//         Mayachokvnutri: {
//             color: 0xffffff,
//             // roughness: 0,
//             // metalness: 1
//         },
//         Reylingi: {
//             color: 0x000000,
//             // roughness: 0.9,
//             // metalness: 1
//         },
//         Podnozhka: {
//             material: CastomMaterial,
//             color: 0x000000,
//             roughness: 0.2,
//             metalness: 0.9
//         },
//         Dvorniki: {
//             color: 0x000000,
//             // roughness: 0.9,
//             // metalness: 1
//         },
//         Salon: {
//             color: 0x000000,
//             // roughness: 1
//         },
//         Reshetka: {
//             color: 0x000000,
//             roughness: 0.9,
//             metalness: 1
//         },
//         Reshetka_metal: {
//             material: CastomMaterial,
//             color: 0xBCBCBC,
//             roughness: 0.2,
//             metalness: 1
//         },
//         Kolesa_diski: {
//             material: CastomMaterial,
//             color: 0xBCBCBC,
//             roughness: 0.2,
//             metalness: 1
//         },
//         "Kolesa-shini": {
//             color: 0x000000,
//             // roughness: 0.35,
//             // metalness: 0.0
//         },
//         Tormoza: {
//             color: 0x000000,
//             // roughness: 0.2,
//             // metalness: 0.0
//         },
//         Brzgoviki: {
//             color: 0x000000,
//             // roughness: 0.2,
//             // metalness: 0.9
//         },
//         Krishka_pod_bazazhnikom: {
//             material: CastomMaterial,
//             color: 0x000000,
//             roughness: 0.9,
//             metalness: 1
//         },
//     },
//     solaris_green: {
//         Windows: {
//             material: CastomMaterial,
//             color: 0xB8B8B8,
//             roughness: 0.1,
//             metalness: 0.8,
//             transmission: 1,
//             ior: 1.450,
//         },
//         Glass: {
//             material: CastomMaterial,
//             color: 0xB8B8B8,
//             roughness: 0,
//             metalness: 0,
//             transmission: 1,
//             transparent: false,
//             thickness: 0.6,
//             clearcoat: 0.5,
//             clearcoatRoughness: 0.01,
//             // opacity: 0.4
//         },
//         Glass_1: {
//             material: CastomMaterial,
//             color: 0xffffff,
//             roughness: 0.4,
//             metalness: 0.5,
//             transmission: 1,
//             ior: 1.450,
//         },
//         // Front_Headlights: {
//         //     material: CastomMaterial,
//         //     color: 0xffffff,
//         //     roughness: 0.4,
//         //     metalness: 0.9,
//         //     transmission: 1,
//         //     transparent: true,
//         //     opacity: 0.6
//         // },
//         // Back_Headlights: {
//         //     material: CastomMaterial,
//         //     color: 0xA52019,
//         //     roughness: 0.2,
//         //     metalness: 0.9,
//         //     transmission: 1,
//         //     transparent: true,
//         //     opacity: 0.8
//         // },
//         Body: {
//             material: CastomMaterial,
//             // color: 0x12CE16,
//             roughness: 0.6,
//             metalness: 0.7,
//             clearcoat: 0.5,
//             clearcoatRoughness: 0.1,
//             map: textures.mapTextureMain_2,
//             // metalnessMap: textures.metalnessMap,
//             // normalMap: textures.normalMap,
//             side: THREE.FrontSide,
//             clipShadows: clipShadowsSwitch,
//             opacity: 0,
//             // depthWrite: false,
//             polygonOffset: true,
//             // polygonOffsetFactor: -4
//         },
//         Metal: {
//             material: CastomMaterial,
//             color: 0xBCBCBC,
//             roughness: 0.2,
//             metalness: 1
//         },
//         // Radiator: {
//         //     material: CastomMaterial,
//         //     map: textures.mapTextureMain_2,
//         //     color: 0xBCBCBC,
//         //     roughness: 0.2,
//         //     metalness: 1
//         // },
//         Radiator_1: {
//             material: CastomMaterial,
//             // map: textures.mapTextureMain_2,
//             color: 0x000000,
//             roughness: 0.5,
//         },
//         Radiator_2: {
//             material: CastomMaterial,
//             color: 0x000000,
//             roughness: 0.2,
//         },
//         Radiator_3: {
//             material: CastomMaterial,
//             roughness: 0.2,
//             metalness: 1
//         },
//         Interior: {
//             material: CastomMaterial,
//             color: 0x626262,
//             // roughness: 1
//         },
//         Tires: {
//             material: CastomMaterial,
//             color: 0x232323,
//             normalMap: textures.normalMap,
//             roughness: 0.6,
//             // metalness: 0.0
//         },
//         // main001: {
//         //     color: 0x000000,
//         //     roughness: 0.9,
//         //     metalness: 1
//         // },
//         // main: {
//         //     material: CastomMaterial,
//         //     roughness: 0.4,
//         //     metalness: 0.7,
//         //     clearcoat: 0.3,
//         //     clearcoatRoughness: 0.3,
//         //     map: textures.mapTextureMain,
//         //     side: THREE.DoubleSide,
//         //     clipShadows: clipShadowsSwitch,
//         //     // depthWrite: false,
//         //     polygonOffset: true,
//         //     // polygonOffsetFactor: -4
//         // },
//         // Main: {
//         //     material: CastomMaterial,
//         //     roughness: 0.4,
//         //     metalness: 0.7,
//         //     clearcoat: 0.3,
//         //     clearcoatRoughness: 0.3,
//         //     map: textures.mapTextureMain,
//         //     side: THREE.DoubleSide,
//         //     clipShadows: clipShadowsSwitch,
//         //     // depthWrite: false,
//         //     polygonOffset: true,
//         //     // polygonOffsetFactor: -4
//         // },
//         // main002: {
//         //     material: CastomMaterial,
//         //     roughness: 0.4,
//         //     metalness: 0.7,
//         //     clearcoat: 0.3,
//         //     clearcoatRoughness: 0.3,
//         //     map: textures.mapTextureMain,
//         //     side: THREE.DoubleSide,
//         //     clipShadows: clipShadowsSwitch,
//         //     // depthWrite: false,
//         //     polygonOffset: true,
//         //     // polygonOffsetFactor: -4
//         // },
//         // main003: {
//         //     material: CastomMaterial,
//         //     roughness: 0.4,
//         //     metalness: 0.7,
//         //     clearcoat: 0.3,
//         //     clearcoatRoughness: 0.3,
//         //     map: textures.mapTextureMain,
//         //     side: THREE.DoubleSide,
//         //     clipShadows: clipShadowsSwitch,
//         //     // depthWrite: false,
//         //     polygonOffset: true,
//         //     // polygonOffsetFactor: -4
//         // },
//         // main004: {
//         //     material: CastomMaterial,
//         //     roughness: 0.4,
//         //     metalness: 0.7,
//         //     clearcoat: 0.3,
//         //     clearcoatRoughness: 0.3,
//         //     map: textures.mapTextureMain,
//         //     side: THREE.DoubleSide,
//         //     clipShadows: clipShadowsSwitch,
//         //     // depthWrite: false,
//         //     polygonOffset: true,
//         //     // polygonOffsetFactor: -4
//         // },
//         // tablo: {
//         //     material: CastomMaterial,
//         //     roughness: 0.4,
//         //     metalness: 0.7,
//         //     clearcoat: 0.3,
//         //     clearcoatRoughness: 0.3,
//         //     map: textures.mapTextureMain,
//         //     side: THREE.DoubleSide,
//         //     clipShadows: clipShadowsSwitch,
//         //     // depthWrite: false,
//         //     polygonOffset: true,
//         //     // polygonOffsetFactor: -4
//         // },
//         // Fari_perednie_stekla: {
//         //     material: CastomMaterial,
//         //     color: 0xffffff,
//         //     roughness: 0.2,
//         //     metalness: 0.9,
//         //     transmission: 1,
//         //     transparent: true,
//         //     opacity: 0.4
//         // },
//         // Fari_nizhnie: {
//         //     material: CastomMaterial,
//         //     color: 0xffffff,
//         //     roughness: 0.2,
//         //     metalness: 0.9,
//         //     transmission: 1,
//         //     transparent: true,
//         //     opacity: 0.4
//         // },
//         // Fari_perednie_zad: {
//         //     color: 0xffffff,
//         //     roughness: 0,
//         //     metalness: 1
//         // },
//         // Fari_perednie_pravolevo_vnutri: {
//         //     roughness: 1,
//         //     metalness: 0,
//         //     map: textures.mapTextureFara,
//         //     side: THREE.DoubleSide
//         // },
//         // Ekran: {
//         //     material: CastomMaterial,
//         //     roughness: 0.4,
//         //     metalness: 0.7,
//         //     clearcoat: 0.3,
//         //     clearcoatRoughness: 0.3,
//         //     map: textures.mapTextureMain,
//         //     clipShadows: clipShadowsSwitch,
//         //     side: THREE.DoubleSide
//         // },
//         // Ekran2: {
//         //     material: CastomMaterial,
//         //     color: 0x000000,
//         //     roughness: 0.1,
//         //     metalness: 0.8,
//         //     transmission: 1,
//         //     ior: 1.450,
//         //     clipShadows: clipShadowsSwitch
//         // },
//         // Mayachok: {
//         //     material: CastomMaterial,
//         //     color: 0xffffff,
//         //     roughness: 0.2,
//         //     metalness: 0.9,
//         //     transmission: 1,
//         //     transparent: true,
//         //     opacity: 0.7
//         // },
//         // Mayachokvnutri: {
//         //     color: 0xffffff,
//         //     // roughness: 0,
//         //     // metalness: 1
//         // },
//         // Reylingi: {
//         //     color: 0x000000,
//         //     // roughness: 0.9,
//         //     // metalness: 1
//         // },
//         // Podnozhka: {
//         //     material: CastomMaterial,
//         //     color: 0x000000,
//         //     roughness: 0.2,
//         //     metalness: 0.9
//         // },
//         // Dvorniki: {
//         //     color: 0x000000,
//         //     // roughness: 0.9,
//         //     // metalness: 1
//         // },
//         // Reshetka: {
//         //     color: 0x000000,
//         //     roughness: 0.9,
//         //     metalness: 1
//         // },
//         // Reshetka_metal: {
//         //     material: CastomMaterial,
//         //     color: 0xBCBCBC,
//         //     roughness: 0.2,
//         //     metalness: 1
//         // },
//         // Tormoza: {
//         //     color: 0x000000,
//         //     // roughness: 0.2,
//         //     // metalness: 0.0
//         // },
//         // Brzgoviki: {
//         //     color: 0x000000,
//         //     // roughness: 0.2,
//         //     // metalness: 0.9
//         // },
//         // Krishka_pod_bazazhnikom: {
//         //     material: CastomMaterial,
//         //     color: 0x000000,
//         //     roughness: 0.9,
//         //     metalness: 1
//         // },
//     },
// };

// const AllModelTexture = {
//     amarok: {
//         desctop: {
//
//         },
//         mobile: {
//
//         }
//     },
//     solaris_green: {
//         desctop: {
//
//         },
//         mobile: {
//
//         }
//     }
// };