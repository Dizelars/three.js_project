const THREE = require("three");
const {createMaterialProperties} = require("./new_materials/create_material_amarok");

function textPrint(textStroke) {
    console.log(textStroke);
}

function changeModel() {
    rgbLoaderPhone.load(PhoneJPG, function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene1.environment = texture;

        // 6) Загрузка gltf 3D модели экстерьер
        gltfLoader.load(url, function(gltf) {
            obj = gltf.scene;
            scene1.add(obj);
            console.log(obj.children);
            obj.position.set(-35, -3, -27.5);
            // const box = new THREE.Box3().setFromObject(obj);
            // const size = new THREE.Vector3();
            // box.getSize(size);
            // const linearSize = size.length();
            // console.log('Linear size:', linearSize);

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

            // 9) Обход загружаемой модели и замена материалов экстерьер
            obj.traverse(function(child) {
                if (child.isMesh) {
                    child.castShadow = ShadowSwitch;
                }
                // Проверяем, является ли объект child мешем и имеет ли он имя, содержащееся в массиве names
                if (child.isMesh && namesSet.has(child.name)) {
                    const properties = materialProperties[child.name];
                    // Проверяем, есть ли свойства для данного имени и не является ли пустым массив свойств
                    // Также проверяем, есть ли у свойств объект material
                    if (properties && Object.keys(properties).length > 0 && properties.material) {
                        // Присваиваем материал из свойств child.material
                        child.material = properties.material;
                    }
                }
                // Проверяем, является ли объект child группой и имеет ли он имя, содержащееся в массиве names
                else if (child.isGroup && namesSet.has(child.name)) {
                    const groupProperties = materialProperties[child.name];
                    // Проверяем, есть ли свойства для данного имени и не является ли пустым массив свойств
                    // Также проверяем, есть ли у свойств объект material
                    if (groupProperties && Object.keys(groupProperties).length > 0 && groupProperties.material) {
                        child.traverse(function(groupChild) {
                            // Проверяем, является ли объект groupChild мешем внутри группы
                            if (groupChild.isMesh) {
                                // Присваиваем материал из свойств groupChild.material
                                groupChild.material = groupProperties.material;
                                groupChild.castShadow = ShadowSwitch;
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

            // 10) Вывод текущих координат камеры в консоль экстерьер
            window.addEventListener('mouseup', () => {
                console.log(camera1.position); // Выводим координаты камеры
            });
        });
    });
}

module.exports = textPrint;