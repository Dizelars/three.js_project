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

// https://coddmac.store/THREE/3Dmodels/47/uv-1.png
// https://coddmac.store/THREE/3Dmodels/47/fara.png
// https://coddmac.store/THREE/3Dmodels/47/Main_texture_2.png
// model/47/uv-1.png
// model/47/fara.png
// model/47/Main_texture_2.png
// model/48/uv-1.png
// model/48/fara.png
// model/48/Main_texture_2.png
//https://coddmac.store/THREE/3Dmodels/Bake_optimize_1/opt.gltf
//model/Bake_optimize_1/opt.gltf

let mapTextureMainUrl;
let mapTextureFaraUrl;
let mapTextureMain_2Url;

if (screenWidth >= 850) {
    // Загрузка модели с другого пути для разрешения 850 и выше
    // mapTextureMainUrl = 'model/desctopTest/uv-1.png';
    // mapTextureFaraUrl = 'model/desctopTest/fara.png';
    // mapTextureMain_2Url = 'model/desctopTest/Main_texture_2.png';
    // mapTextureMainUrl = 'model/optimizeTest_2/uv.png';
    // mapTextureFaraUrl = 'model/optimizeTest_2/fara.png';
    // mapTextureMain_2Url = 'model/optimizeTest_2/Main_texture_2.png';
    mapTextureMainUrl = 'https://coddmac.store/THREE/3Dmodels/47/uv-1.png';
    mapTextureFaraUrl = 'https://coddmac.store/THREE/3Dmodels/47/fara.png';
    mapTextureMain_2Url = 'https://coddmac.store/THREE/3Dmodels/47/Main_texture_2.png';
    // mapTextureMainUrl = 'https://coddmac.store/THREE/3Dmodels/desctopTest/uv-1.png';
    // mapTextureFaraUrl = 'https://coddmac.store/THREE/3Dmodels/desctopTest/fara.png';
    // mapTextureMain_2Url = 'https://coddmac.store/THREE/3Dmodels/desctopTest/Main_texture_2.png';
    // mapTextureMainUrl = 'https://coddmac.store/THREE/3Dmodels/optimizeTest_2/uv.png';
    // mapTextureFaraUrl = 'https://coddmac.store/THREE/3Dmodels/optimizeTest_2/fara.png';
    // mapTextureMain_2Url = 'https://coddmac.store/THREE/3Dmodels/optimizeTest_2/Main_texture_2.png';
    // mapTextureMainUrl = 'https://coddmac.store/THREE/3Dmodels/49/uv.png';
    // mapTextureFaraUrl = 'https://coddmac.store/THREE/3Dmodels/49/fara.png';
    // mapTextureMain_2Url = 'https://coddmac.store/THREE/3Dmodels/49/Main_texture_2.png';
    // mapTextureMainUrl = 'https://coddmac.store/THREE/3Dmodels/android/uv.png';
    // mapTextureFaraUrl = 'https://coddmac.store/THREE/3Dmodels/android/fara.png';
    // mapTextureMain_2Url = 'https://coddmac.store/THREE/3Dmodels/android/Main_texture_2.png';
} else {
    // Загрузка модели с основного пути для разрешений ниже 850
    // mapTextureMainUrl = 'model/optimizeTest_2/uv.png';
    // mapTextureFaraUrl = 'model/optimizeTest_2/fara.png';
    // mapTextureMain_2Url = 'model/optimizeTest_2/Main_texture_2.png';
    // mapTextureMainUrl = 'model/optimizeTest/uv_optimise.png';
    // mapTextureFaraUrl = 'model/optimizeTest/fara.png';
    // mapTextureMain_2Url = 'model/optimizeTest/Main_texture_2.png';
    // mapTextureMainUrl = 'https://coddmac.store/THREE/3Dmodels/Bake_optimize_1/uv-1.png';
    // mapTextureFaraUrl = 'https://coddmac.store/THREE/3Dmodels/Bake_optimize_1/fara.png';
    // mapTextureMain_2Url = 'https://coddmac.store/THREE/3Dmodels/Bake_optimize_1/Main_texture_2.png';
    // mapTextureMainUrl = 'https://coddmac.store/THREE/3Dmodels/optimizeTest/uv-1.png';
    // mapTextureFaraUrl = 'https://coddmac.store/THREE/3Dmodels/optimizeTest/fara.png';
    // mapTextureMain_2Url = 'https://coddmac.store/THREE/3Dmodels/optimizeTest/Main_texture_2.png';
    // mapTextureMainUrl = 'https://coddmac.store/THREE/3Dmodels/optimizeTest_2/uv.png';
    // mapTextureFaraUrl = 'https://coddmac.store/THREE/3Dmodels/optimizeTest_2/fara.png';
    // mapTextureMain_2Url = 'https://coddmac.store/THREE/3Dmodels/optimizeTest_2/Main_texture_2.png';
    mapTextureMainUrl = 'https://coddmac.store/THREE/3Dmodels/49/uv.png';
    mapTextureFaraUrl = 'https://coddmac.store/THREE/3Dmodels/49/fara.png';
    mapTextureMain_2Url = 'https://coddmac.store/THREE/3Dmodels/49/Main_texture_2.png';
    // mapTextureMainUrl = 'https://coddmac.store/THREE/3Dmodels/android/uv.png';
    // mapTextureFaraUrl = 'https://coddmac.store/THREE/3Dmodels/android/fara.png';
    // mapTextureMain_2Url = 'https://coddmac.store/THREE/3Dmodels/android/Main_texture_2.png';
}

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

//transparent: false,
// depthWrite: true,

// Whether to use polygon offset. Default is false. This corresponds to the GL_POLYGON_OFFSET_FILL WebGL feature. .polygonOffset = true;
// depthWrite: false,
// polygonOffset: true,
// polygonOffsetFactor: -4

const materials = {
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
        polygonOffset: true,
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
        polygonOffset: true,
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
        polygonOffset: true,
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
        polygonOffset: true,
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
        polygonOffset: true,
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
        polygonOffset: true,
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
        polygonOffset: true,
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

// export function createMaterialProperties(name) {
//     const materialData = materials[name];
//     if (!materialData) {
//         return {}; // Возвращаем пустой объект, если имя не найдено
//     }
//
//     const properties = { ...materialData };
//     // properties.material = new THREE.MeshPhysicalMaterial(properties);
//     // properties.material = materialData.material;
//     properties.material = new materialData.material(properties); // Создаем экземпляр материала, используя конструктор из materialData
//     console.log(properties.material);
//     return properties;
// }

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


// export function createMaterialProperties(name) {
//     let properties = {};
//     switch (name) {
//         case "main":
//             properties.roughness = 0.4;
//             properties.metalness = 0.7;
//             properties.clearcoat = 0.3;
//             properties.clearcoatRoughness = 0.3;
//             properties.map = textures.mapTexture;
//             properties.side = THREE.DoubleSide;
//             properties.clipShadows = true;
//             properties.material = new THREE.MeshPhysicalMaterial(properties);
//             break;
//         case "Main_2":
//             properties.roughness = 0.4;
//             properties.metalness = 0.7;
//             properties.clearcoat = 0.3;
//             properties.clearcoatRoughness = 0.3;
//             properties.map = textures.mapTexture2;
//             properties.clipShadows = true;
//             properties.material = new THREE.MeshPhysicalMaterial(properties);
//             break;
//         case "main002":
//             properties.roughness = 0.4;
//             properties.metalness = 0.7;
//             properties.clearcoat = 0.3;
//             properties.clearcoatRoughness = 0.3;
//             properties.map = textures.mapTexture;
//             properties.clipShadows = true;
//             properties.material = new THREE.MeshPhysicalMaterial(properties);
//             break;
//         case "Stekla":
//             properties.color = 0xB8B8B8;
//             properties.roughness = 0.1;
//             properties.metalness = 0.8;
//             properties.transmission = 1;
//             properties.ior = 1.450;
//             properties.material = new THREE.MeshPhysicalMaterial(properties);
//             break;
//         case "Fari_perednie_stekla":
//             properties.color = 0xffffff;
//             properties.roughness = 0.2;
//             properties.metalness = 0.9;
//             properties.transmission = 1;
//             properties.transparent = true;
//             properties.opacity = 0.4;
//             properties.material = new THREE.MeshPhysicalMaterial(properties);
//             break;
//         case "steklo_nuzhnie_fari":
//             properties.color = 0xffffff;
//             properties.roughness = 0.2;
//             properties.metalness = 0.9;
//             properties.transmission = 1;
//             properties.transparent = true;
//             properties.opacity = 0.4;
//             properties.material = new THREE.MeshPhysicalMaterial(properties);
//             break;
//         case "Fari_perednie_zad":
//             properties.color = 0xffffff;
//             properties.roughness = 0;
//             properties.metalness = 1;
//             properties.material = new THREE.MeshPhysicalMaterial(properties);
//             break;
//         case "Fari_perednie_pravolevo_vnutri":
//             properties.roughness = 1;
//             properties.metalness = 0;
//             properties.map = textures.mapTextureFara;
//             properties.side = THREE.DoubleSide;
//             properties.material = new THREE.MeshPhysicalMaterial(properties);
//             break;
//         case "Fari_zadnie":
//             properties.color = 0xA52019;
//             properties.roughness = 0.2;
//             properties.metalness = 0.9;
//             properties.transmission = 1;
//             properties.transparent = true;
//             properties.opacity = 0.8;
//             properties.material = new THREE.MeshPhysicalMaterial(properties);
//             break;
//         case "Ekran":
//             properties.roughness = 0.4;
//             properties.metalness = 0.7;
//             properties.clearcoat = 0.3;
//             properties.clearcoatRoughness = 0.3;
//             properties.map = textures.mapTexture;
//             properties.clipShadows = true;
//             properties.side = THREE.DoubleSide;
//             properties.material = new THREE.MeshPhysicalMaterial(properties);
//             break;
//         case "Ekran2":
//             properties.color = 0x000000;
//             properties.roughness = 0.1;
//             properties.metalness = 0.8;
//             properties.transmission = 1;
//             properties.ior = 1.450;
//             properties.clipShadows = true;
//             properties.material = new THREE.MeshPhysicalMaterial(properties);
//             break;
//         case "Mayachok":
//             properties.color = 0xffffff;
//             properties.roughness = 0.2;
//             properties.metalness = 0.9;
//             properties.transmission = 1;
//             properties.transparent = true;
//             properties.opacity = 0.7;
//             properties.material = new THREE.MeshPhysicalMaterial(properties);
//             break;
//         case "Mayachokvnutri":
//             properties.color = 0xffffff;
//             properties.roughness = 0;
//             properties.metalness = 1;
//             properties.material = new THREE.MeshPhysicalMaterial(properties);
//             break;
//         case "Reylingi":
//             properties.color = 0x000000;
//             properties.roughness = 0.9;
//             properties.metalness = 1;
//             properties.material = new THREE.MeshPhysicalMaterial(properties);
//             break;
//         case "Podnozhka":
//             properties.color = 0x000000;
//             properties.roughness = 0.2;
//             properties.metalness = 0.9;
//             properties.material = new THREE.MeshPhysicalMaterial(properties);
//             break;
//         case "Dvorniki":
//             properties.color = 0x000000;
//             properties.roughness = 0.9;
//             properties.metalness = 1;
//             properties.material = new THREE.MeshPhysicalMaterial(properties);
//             break;
//         case "Salon":
//             properties.color = 0x000000;
//             properties.roughness = 1;
//             properties.material = new THREE.MeshPhysicalMaterial(properties);
//             break;
//         case "Reshetka":
//             properties.color = 0x000000;
//             properties.roughness = 0.9;
//             properties.metalness = 1;
//             properties.material = new THREE.MeshPhysicalMaterial(properties);
//             break;
//         case "Reshetka_metal":
//             properties.color = 0xBCBCBC;
//             properties.roughness = 0.2;
//             properties.metalness = 1;
//             properties.material = new THREE.MeshPhysicalMaterial(properties);
//             break;
//         case "Kolesa_diski":
//             properties.color = 0xBCBCBC;
//             properties.roughness = 0.2;
//             properties.metalness = 1;
//             properties.material = new THREE.MeshPhysicalMaterial(properties);
//             break;
//         case "Kolesa-shini":
//             properties.color = 0x000000;
//             properties.roughness = 0.35;
//             properties.metalness = 0.0;
//             properties.material = new THREE.MeshPhysicalMaterial(properties);
//             break;
//         case "Tormoza":
//             properties.color = 0x000000;
//             properties.roughness = 0.2;
//             properties.metalness = 0.0;
//             properties.material = new THREE.MeshPhysicalMaterial(properties);
//             break;
//         case "Brzgoviki":
//             properties.color = 0x000000;
//             properties.roughness = 0.2;
//             properties.metalness = 0.9;
//             properties.material = new THREE.MeshPhysicalMaterial(properties);
//             break;
//         case "Krishka_pod_bazazhnikom":
//             properties.color = 0x000000;
//             properties.roughness = 0.9;
//             properties.metalness = 1;
//             properties.material = new THREE.MeshPhysicalMaterial(properties);
//             break;
//     }
//     return properties;
// }