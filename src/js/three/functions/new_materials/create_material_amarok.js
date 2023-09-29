import * as THREE from "three";

// Ширина экрана
const screenWidth = window.innerWidth;

let clipShadowsSwitch;
clipShadowsSwitch = screenWidth >= 850;

const textures = {
    mapTexture: null,
    mapTextureFara: null,
    mapTexture2: null
};

let mapTextureMainUrl;
let mapTextureFaraUrl;
let mapTextureMain_2Url;

if (screenWidth >= 850) {
    mapTextureMainUrl = 'https://coddmac.store/THREE/3Dmodels/amarok/47/uv-1.png';
    mapTextureFaraUrl = 'https://coddmac.store/THREE/3Dmodels/amarok/47/fara.png';
    mapTextureMain_2Url = 'https://coddmac.store/THREE/3Dmodels/amarok/47/Main_texture_2.png';
    // mapTextureMain_2Url = 'https://coddmac.store/THREE/3Dmodels/amarok/amarok_opt_last/Amarok_low_Material_BaseColor.png';
    // mapTextureMain_2Url = 'https://coddmac.store/THREE/THREE/3Dmodels/amarok/amarok_opt_last/Amarok_low_Material_BaseColor.png';
} else {
    mapTextureMainUrl = 'https://coddmac.store/THREE/3Dmodels/amarok/49/uv.png';
    mapTextureFaraUrl = 'https://coddmac.store/THREE/3Dmodels/amarok/49/fara.png';
    mapTextureMain_2Url = 'https://coddmac.store/THREE/3Dmodels/amarok/49/Main_texture_2.png';
}
// sftp://design@62.109.20.91/var/www/html/THREE/3Dmodels/amarok/47/Main_texture_2.png
function loadTextures() {
    const textureLoader = new THREE.TextureLoader();
    textures.mapTextureMain = textureLoader.load(mapTextureMainUrl);
    textures.mapTextureFara = textureLoader.load(mapTextureFaraUrl);
    textures.mapTextureMain_2 = textureLoader.load(mapTextureMain_2Url);
    textures.mapTextureMain.flipY = false;
    textures.mapTextureMain_2.flipY = false;
    textures.mapTextureFara.flipY = false;
}

loadTextures();

let CastomMaterial = 'MeshPhysicalMaterial';

// Использовать ли смещение полигонов. По умолчанию значение false. Это соответствует WebGL-функции GL_POLYGON_OFFSET_FILL
// depthWrite: false,
// polygonOffset: true,
// polygonOffsetFactor: -4
// transparent: false,

const materials = {
    Main_low: {
        material: CastomMaterial,
        roughness: 0.4,
        metalness: 0.7,
        clearcoat: 0.3,
        clearcoatRoughness: 0.3,
        map: textures.mapTextureMain_2,
        // color: 0xff0000,
        side: THREE.DoubleSide,
        clipShadows: clipShadowsSwitch,
        // depthWrite: false,
        // polygonOffset: true,
        // polygonOffsetFactor: -4
    },
    Main_2: {
        material: CastomMaterial,
        roughness: 0.4,
        metalness: 0.7,
        clearcoat: 0.3,
        clearcoatRoughness: 0.3,
        map: textures.mapTextureMain_2,
        side: THREE.DoubleSide,
        clipShadows: clipShadowsSwitch,
        // depthWrite: false,
        // polygonOffset: true,
        // polygonOffsetFactor: -4
    },
    main001: {
        color: 0x000000,
        roughness: 0.9,
        metalness: 1
    },
    main: {
        material: CastomMaterial,
        roughness: 0.4,
        metalness: 0.7,
        clearcoat: 0.3,
        clearcoatRoughness: 0.3,
        map: textures.mapTextureMain,
        side: THREE.DoubleSide,
        clipShadows: clipShadowsSwitch,
        // depthWrite: false,
        // polygonOffset: true,
        // polygonOffsetFactor: -4
    },
    Main: {
        material: CastomMaterial,
        roughness: 0.4,
        metalness: 0.7,
        clearcoat: 0.3,
        clearcoatRoughness: 0.3,
        map: textures.mapTextureMain,
        side: THREE.DoubleSide,
        clipShadows: clipShadowsSwitch,
        // depthWrite: false,
        // polygonOffset: true,
        // polygonOffsetFactor: -4
    },
    main002: {
        material: CastomMaterial,
        roughness: 0.4,
        metalness: 0.7,
        clearcoat: 0.3,
        clearcoatRoughness: 0.3,
        map: textures.mapTextureMain,
        side: THREE.DoubleSide,
        clipShadows: clipShadowsSwitch,
        // depthWrite: false,
        // polygonOffset: true,
        // polygonOffsetFactor: -4
    },
    main003: {
        material: CastomMaterial,
        roughness: 0.4,
        metalness: 0.7,
        clearcoat: 0.3,
        clearcoatRoughness: 0.3,
        map: textures.mapTextureMain,
        side: THREE.DoubleSide,
        clipShadows: clipShadowsSwitch,
        // depthWrite: false,
        // polygonOffset: true,
        // polygonOffsetFactor: -4
    },
    main004: {
        material: CastomMaterial,
        roughness: 0.4,
        metalness: 0.7,
        clearcoat: 0.3,
        clearcoatRoughness: 0.3,
        map: textures.mapTextureMain,
        side: THREE.DoubleSide,
        clipShadows: clipShadowsSwitch,
        // depthWrite: false,
        // polygonOffset: true,
        // polygonOffsetFactor: -4
    },
    tablo: {
        material: CastomMaterial,
        roughness: 0.4,
        metalness: 0.7,
        clearcoat: 0.3,
        clearcoatRoughness: 0.3,
        map: textures.mapTextureMain,
        side: THREE.DoubleSide,
        clipShadows: clipShadowsSwitch,
        // depthWrite: false,
        // polygonOffset: true,
        // polygonOffsetFactor: -4
    },
    Stekla: {
        material: CastomMaterial,
        color: 0xB8B8B8,
        roughness: 0.1,
        metalness: 0.8,
        transmission: 1,
        ior: 1.450,
    },
    Fari_perednie_stekla: {
        material: CastomMaterial,
        color: 0xffffff,
        roughness: 0.2,
        metalness: 0.9,
        transmission: 1,
        transparent: true,
        opacity: 0.4
    },
    Fari_nizhnie: {
        material: CastomMaterial,
        color: 0xffffff,
        roughness: 0.2,
        metalness: 0.9,
        transmission: 1,
        transparent: true,
        opacity: 0.4
    },
    Fari_perednie_zad: {
        color: 0xffffff,
        roughness: 0,
        metalness: 1
    },
    Fari_perednie_pravolevo_vnutri: {
        roughness: 1,
        metalness: 0,
        map: textures.mapTextureFara,
        side: THREE.DoubleSide
    },
    Fari_zadnie: {
        material: CastomMaterial,
        color: 0xA52019,
        roughness: 0.2,
        metalness: 0.9,
        transmission: 1,
        transparent: true,
        opacity: 0.8
    },
    Ekran: {
        material: CastomMaterial,
        roughness: 0.4,
        metalness: 0.7,
        clearcoat: 0.3,
        clearcoatRoughness: 0.3,
        map: textures.mapTextureMain,
        clipShadows: clipShadowsSwitch,
        side: THREE.DoubleSide
    },
    Ekran2: {
        material: CastomMaterial,
        color: 0x000000,
        roughness: 0.1,
        metalness: 0.8,
        transmission: 1,
        ior: 1.450,
        clipShadows: clipShadowsSwitch
    },
    Mayachok: {
        material: CastomMaterial,
        color: 0xffffff,
        roughness: 0.2,
        metalness: 0.9,
        transmission: 1,
        transparent: true,
        opacity: 0.7
    },
    Mayachokvnutri: {
        color: 0xffffff,
        // roughness: 0,
        // metalness: 1
    },
    Reylingi: {
        color: 0x000000,
        // roughness: 0.9,
        // metalness: 1
    },
    Podnozhka: {
        material: CastomMaterial,
        color: 0x000000,
        roughness: 0.2,
        metalness: 0.9
    },
    Dvorniki: {
        color: 0x000000,
        // roughness: 0.9,
        // metalness: 1
    },
    Salon: {
        color: 0x000000,
        // roughness: 1
    },
    Reshetka: {
        color: 0x000000,
        roughness: 0.9,
        metalness: 1
    },
    Reshetka_metal: {
        material: CastomMaterial,
        color: 0xBCBCBC,
        roughness: 0.2,
        metalness: 1
    },
    Kolesa_diski: {
        material: CastomMaterial,
        color: 0xBCBCBC,
        roughness: 0.2,
        metalness: 1
    },
    "Kolesa-shini": {
        color: 0x000000,
        // roughness: 0.35,
        // metalness: 0.0
    },
    Tormoza: {
        color: 0x000000,
        // roughness: 0.2,
        // metalness: 0.0
    },
    Brzgoviki: {
        color: 0x000000,
        // roughness: 0.2,
        // metalness: 0.9
    },
    Krishka_pod_bazazhnikom: {
        material: CastomMaterial,
        color: 0x000000,
        roughness: 0.9,
        metalness: 1
    },
};

export function createMaterialProperties(name) {
    const materialData = materials[name];
    if (!materialData) {
        return {};
    }

    const properties = { ...materialData };
    const materialType = materialData.material;

    let materialConstructor;
    switch (materialType) {
        case 'MeshPhysicalMaterial':
            materialConstructor = THREE.MeshPhysicalMaterial;
            break;
        case 'MeshStandardMaterial':
            materialConstructor = THREE.MeshStandardMaterial;
            break;
        case 'MeshPhongMaterial':
            materialConstructor = THREE.MeshPhongMaterial;
            break;
        default:
            materialConstructor = THREE.MeshBasicMaterial;
    }

    properties.material = new materialConstructor(properties);
    return properties;
}