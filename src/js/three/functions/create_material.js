import * as THREE from "three";

export function createMaterialProperties(name) {
    let properties = {};
    const textureLoader = new THREE.TextureLoader();
    const mapTexture = textureLoader.load('https://coddmac.store/THREE/3Dmodels/41/uv.png');
    const mapTextureFara = textureLoader.load('https://coddmac.store/THREE/3Dmodels/41/fara.png');
    //http://89.208.211.133/models/36/uv.png
    //http://89.208.211.133/models/36/fara.png
    //https://coddmac.store/THREE/3Dmodels/36/uv.png
    //https://coddmac.store/THREE/3Dmodels/36/fara.png
    mapTexture.flipY = false;
    mapTextureFara.flipY = false;
    switch (name) {
        case "Stekla":
            properties.color = 0xB8B8B8;
            properties.roughness = 0.1;
            properties.metalness = 0.8;
            properties.transmission = 1;
            properties.ior = 1.450;
            properties.material = new THREE.MeshPhysicalMaterial(properties);
            break;
        case "Fari_perednie_stekla":
            properties.color = 0xffffff;
            properties.roughness = 0.2;
            properties.metalness = 0.9;
            properties.transmission = 1; // Небольшая прозрачность фар
            properties.transparent = true; // Включение прозрачности фар
            properties.opacity = 0.4;
            properties.material = new THREE.MeshPhysicalMaterial(properties);
            break;
        case "Fari_perednie_zad":
            properties.color = 0xffffff;
            properties.roughness = 0;
            properties.metalness = 1;
            properties.material = new THREE.MeshPhysicalMaterial(properties);
            break;
        case "Fari_perednie_pravolevo_vnutri":
            properties.roughness = 1;
            properties.metalness = 0;
            properties.map = mapTextureFara;
            properties.side = THREE.DoubleSide;
            properties.material = new THREE.MeshPhysicalMaterial(properties);
            break;
        case "Fari_zadnie":
            properties.color = 0xA52019; // Сигнальный красный
            properties.roughness = 0.2;
            properties.metalness = 0.9;
            properties.transmission = 1; // Небольшая прозрачность фар
            properties.transparent = true; // Включение прозрачности фар
            properties.opacity = 0.8;
            properties.material = new THREE.MeshPhysicalMaterial(properties);
            break;
        case "main":
            // properties.roughness = 0.13; // Низкая шероховатость
            properties.roughness = 0.3; // Низкая шероховатость
            properties.metalness = 0.8;
            properties.clearcoat = 0.3; // Интенсивность слоя лака
            properties.clearcoatRoughness = 0.3; // Шероховатость слоя лака
            properties.map = mapTexture;
            properties.side = THREE.DoubleSide;
            properties.clipShadows = true;
            // THREE.FrontSide
            // THREE.BackSide
            // THREE.DoubleSide
            properties.material = new THREE.MeshPhysicalMaterial(properties);
            break;
        case "Ekran":
            properties.roughness = 0.3; // Низкая шероховатость
            properties.metalness = 0.8;
            properties.clearcoat = 0.3; // Интенсивность слоя лака
            properties.clearcoatRoughness = 0.3; // Шероховатость слоя лака
            properties.map = mapTexture;
            properties.clipShadows = true;
            properties.side = THREE.DoubleSide;
            properties.material = new THREE.MeshPhysicalMaterial(properties);
            break;
        case "Ekran2":
            // properties.color = 0xB8B8B8;
            properties.color = 0x000000;
            properties.roughness = 0.1;
            properties.metalness = 0.8;
            properties.transmission = 1;
            properties.ior = 1.450;
            properties.clipShadows = true;
            properties.material = new THREE.MeshPhysicalMaterial(properties);
            break;
        case "Mayachok":
            properties.color = 0xffffff;
            properties.roughness = 0.2;
            properties.metalness = 0.9;
            properties.transmission = 1; // Небольшая прозрачность фар
            properties.transparent = true; // Включение прозрачности фар
            properties.opacity = 0.7;
            properties.material = new THREE.MeshPhysicalMaterial(properties);
            break;
        case "Mayachokvnutri":
            properties.color = 0xffffff;
            properties.roughness = 0;
            properties.metalness = 1;
            properties.material = new THREE.MeshPhysicalMaterial(properties);
            break;
        case "Reylingi":
            properties.color = 0x000000;
            properties.roughness = 0.9;
            properties.metalness = 1;
            properties.material = new THREE.MeshPhysicalMaterial(properties);
            break;
        case "Podnozhka":
            properties.color = 0x000000;
            properties.roughness = 0.2;
            properties.metalness = 0.9;
            properties.material = new THREE.MeshPhysicalMaterial(properties);
            break;
        case "Dvorniki":
            properties.color = 0x000000;
            properties.roughness = 0.9;
            properties.metalness = 1;
            properties.material = new THREE.MeshPhysicalMaterial(properties);
            break;
        case "Salon":
            properties.color = 0x000000;
            properties.roughness = 1;
            properties.material = new THREE.MeshPhysicalMaterial(properties);
            break;
        case "Reshetka":
            properties.color = 0x000000;
            properties.roughness = 0.9;
            properties.metalness = 1;
            properties.material = new THREE.MeshPhysicalMaterial(properties);
            break;
        case "Reshetka_metal":
            properties.color = 0xBCBCBC;
            properties.roughness = 0.2;
            properties.metalness = 1;
            properties.material = new THREE.MeshPhysicalMaterial(properties);
            break;
        case "Kolesa_diski":
            properties.color = 0xBCBCBC;
            properties.roughness = 0.2;
            properties.metalness = 1;
            properties.material = new THREE.MeshPhysicalMaterial(properties);
            break;
        case "Kolesa-shini":
            properties.color = 0x000000;
            properties.roughness = 0.35;
            properties.metalness = 0.0;
            properties.material = new THREE.MeshPhysicalMaterial(properties);
            break;
        case "Tormoza":
            properties.color = 0x000000;
            properties.roughness = 0.2;
            properties.metalness = 0.0;
            properties.material = new THREE.MeshPhysicalMaterial(properties);
            break;
        case "Brzgoviki":
            properties.color = 0x000000;
            properties.roughness = 0.2;
            properties.metalness = 0.9;
            properties.material = new THREE.MeshPhysicalMaterial(properties);
            break;
        case "Krishka_pod_bazazhnikom":
            properties.color = 0x000000;
            properties.roughness = 0.9;
            properties.metalness = 1;
            properties.material = new THREE.MeshPhysicalMaterial(properties);
            break;
        // Добавьте другие случаи, если необходимо
    }
    return properties;
}
// export default createMaterialProperties;