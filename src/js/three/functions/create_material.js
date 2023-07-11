import * as THREE from "three";

// Ширина экрана
const screenWidth = window.innerWidth;

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

let mapTextureMainUrl;
let mapTextureFaraUrl;
let mapTextureMain_2Url;
// let mapTextureKuzovUrl;

if (screenWidth >= 850) {
    // Загрузка модели с другого пути для разрешения 850 и выше
    mapTextureMainUrl = 'https://coddmac.store/THREE/3Dmodels/47/uv-1.png';
    mapTextureFaraUrl = 'https://coddmac.store/THREE/3Dmodels/47/fara.png';
    mapTextureMain_2Url = 'https://coddmac.store/THREE/3Dmodels/47/Main_texture_2.png';
    // mapTextureKuzovUrl = 'https://coddmac.store/THREE/3Dmodels/47/kuzov.png';
    // mapTextureMainUrl = 'model/47/uv-1.png';
    // mapTextureFaraUrl = 'model/47/fara.png';
    // mapTextureMain_2Url = 'model/47/Main_texture_2.png';
    // mapTextureKuzovUrl = 'model/47/kuzov.png';
} else {
    // Загрузка модели с основного пути для разрешений ниже 850
    mapTextureMainUrl = 'https://coddmac.store/THREE/3Dmodels/48/uv-1.png';
    mapTextureFaraUrl = 'https://coddmac.store/THREE/3Dmodels/48/fara.png';
    mapTextureMain_2Url = 'https://coddmac.store/THREE/3Dmodels/48/Main_texture_2.png';
    // mapTextureKuzovUrl = 'https://coddmac.store/THREE/3Dmodels/48/kuzov.png';
    // mapTextureMainUrl = 'model/48/uv-1.png';
    // mapTextureFaraUrl = 'model/48/fara.png';
    // mapTextureMain_2Url = 'model/48/Main_texture_2.png';
    // mapTextureKuzovUrl = 'model/48/kuzov.png';
}

function loadTextures() {
    const textureLoader = new THREE.TextureLoader();
    textures.mapTextureMain = textureLoader.load(mapTextureMainUrl);
    textures.mapTextureFara = textureLoader.load(mapTextureFaraUrl);
    textures.mapTextureMain_2 = textureLoader.load(mapTextureMain_2Url);
    textures.mapTextureMain.flipY = false;
    textures.mapTextureMain_2.flipY = false;
    textures.mapTextureFara.flipY = false;
    // textures.mapTextureKuzov.flipY = false;
}

loadTextures();

const materials = {
    main: {
        roughness: 0.4,
        metalness: 0.7,
        clearcoat: 0.3,
        clearcoatRoughness: 0.3,
        map: textures.mapTextureMain,
        side: THREE.DoubleSide,
        clipShadows: true
    },
    Main_2: {
        roughness: 0.4,
        metalness: 0.7,
        clearcoat: 0.3,
        clearcoatRoughness: 0.3,
        map: textures.mapTextureMain_2,
        clipShadows: true
    },
    main002: {
        roughness: 0.4,
        metalness: 0.7,
        clearcoat: 0.3,
        clearcoatRoughness: 0.3,
        map: textures.mapTextureMain,
        clipShadows: true
    },
    Stekla: {
        color: 0xB8B8B8,
        roughness: 0.1,
        metalness: 0.8,
        transmission: 1,
        ior: 1.450
    },
    Fari_perednie_stekla: {
        color: 0xffffff,
        roughness: 0.2,
        metalness: 0.9,
        transmission: 1,
        transparent: true,
        opacity: 0.4
    },
    steklo_nuzhnie_fari: {
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
        color: 0xA52019,
        roughness: 0.2,
        metalness: 0.9,
        transmission: 1,
        transparent: true,
        opacity: 0.8
    },
    Ekran: {
        roughness: 0.4,
        metalness: 0.7,
        clearcoat: 0.3,
        clearcoatRoughness: 0.3,
        map: textures.mapTextureMain,
        clipShadows: true,
        side: THREE.DoubleSide
    },
    Ekran2: {
        color: 0x000000,
        roughness: 0.1,
        metalness: 0.8,
        transmission: 1,
        ior: 1.450,
        clipShadows: true
    },
    Mayachok: {
        color: 0xffffff,
        roughness: 0.2,
        metalness: 0.9,
        transmission: 1,
        transparent: true,
        opacity: 0.7
    },
    Mayachokvnutri: {
        color: 0xffffff,
        roughness: 0,
        metalness: 1
    },
    Reylingi: {
        color: 0x000000,
        roughness: 0.9,
        metalness: 1
    },
    Podnozhka: {
        color: 0x000000,
        roughness: 0.2,
        metalness: 0.9
    },
    Dvorniki: {
        color: 0x000000,
        roughness: 0.9,
        metalness: 1
    },
    Salon: {
        color: 0x000000,
        roughness: 1
    },
    Reshetka: {
        color: 0x000000,
        roughness: 0.9,
        metalness: 1
    },
    Reshetka_metal: {
        color: 0xBCBCBC,
        roughness: 0.2,
        metalness: 1
    },
    Kolesa_diski: {
        color: 0xBCBCBC,
        roughness: 0.2,
        metalness: 1
    },
    "Kolesa-shini": {
        color: 0x000000,
        roughness: 0.35,
        metalness: 0.0
    },
    Tormoza: {
        color: 0x000000,
        roughness: 0.2,
        metalness: 0.0
    },
    Brzgoviki: {
        color: 0x000000,
        roughness: 0.2,
        metalness: 0.9
    },
    Krishka_pod_bazazhnikom: {
        color: 0x000000,
        roughness: 0.9,
        metalness: 1
    }
};

export function createMaterialProperties(name) {
    const materialData = materials[name];
    if (!materialData) {
        return {}; // Возвращаем пустой объект, если имя не найдено
    }

    const properties = { ...materialData };
    properties.material = new THREE.MeshPhysicalMaterial(properties);
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