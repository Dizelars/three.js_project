const THREE = require("three");
const {createMaterialProperties} = require("./new_materials/create_material_amarok");

function changeModel(scene, modelLoader, urlModel, modelPosition, ShadowOnOff, manager) {
    const PhoneJPG = new URL('../../../img/garage.jpg', import.meta.url);
    const rgbLoaderPhone = new THREE.TextureLoader(manager);
    rgbLoaderPhone.load(PhoneJPG, function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        let obj;
        let positionArray = modelPosition.split(',');
        let x = parseFloat(positionArray[0]);
        let y = parseFloat(positionArray[1]);
        let z = parseFloat(positionArray[2]);

        // 6) Загрузка gltf 3D модели экстерьер
        modelLoader.load(urlModel, function(gltf) {
            obj = gltf.scene;
            scene.add(obj);
            console.log(obj.children);
            obj.position.set(x, y, z);

            // 7) Меняем Mesh-материал модели как отдельно, так и внутри Group экстерьер
            let names = [];
            for (let i = 0; i < obj.children.length; i++) {
                names.push(obj.children[i].name);
            }
            const materialProperties = names.reduce(function(props, name) {
                props[name] = createMaterialProperties(name);
                return props;
            }, {});

            const namesSet = new Set(names);

            // 8) Функция с моими параметрами материалов экстерьер
            createMaterialProperties();
            console.log(materialProperties);

            obj.traverse(function(child) {
                if (child.isMesh) {
                    child.castShadow = ShadowOnOff;
                }
                if (child.isMesh && namesSet.has(child.name)) {
                    const properties = materialProperties[child.name];
                    if (properties && Object.keys(properties).length > 0 && properties.material) {
                        child.material = properties.material;
                    }
                }
                else if (child.isGroup && namesSet.has(child.name)) {
                    const groupProperties = materialProperties[child.name];
                    if (groupProperties && Object.keys(groupProperties).length > 0 && groupProperties.material) {
                        child.traverse(function(groupChild) {
                            if (groupChild.isMesh) {
                                groupChild.material = groupProperties.material;
                                groupChild.castShadow = ShadowOnOff;
                            }
                        });
                    }
                }
            });
        });
    });
}

module.exports = changeModel;