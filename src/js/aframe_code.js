let currentInfoPanel = null;

// Open the panel
document
    .querySelectorAll('[mixin="info-sphere"]')
    .forEach(function (sphere) {
        sphere.addEventListener("click", function () {
            console.log("Info sphere clicked: " + this.id);

            const currentSphereIdNumber = this.id.replace("sphere", "");

            // Get the template for this info sphere
            const template = document.querySelector(
                "#infoPanel" + currentSphereIdNumber
            );

            // Get the info panel entity
            const infoPanel = document.querySelector(
                "#infoPanelContainer" + currentSphereIdNumber
            );

            console.log("Current info panel: ", infoPanel);

            // Instantiate the new info panel from the template
            infoPanel.appendChild(document.importNode(template.content, true));

            const allInfoPanelContainerElements = document.querySelectorAll(
                "[id^=infoPanelContainer]"
            );

            document
                .querySelectorAll('[src="#crossIcon"]')
                .forEach(function (cross) {
                    cross.addEventListener("click", function () {
                        allInfoPanelContainerElements.forEach((container) => {
                            if (container.id === infoPanel.id) {
                                container.innerHTML = "";
                                document
                                    .querySelector("#sphere" + currentInfoPanel)
                                    .setAttribute("visible", true);
                            }
                        });
                    });
                });

            allInfoPanelContainerElements.forEach((container) => {
                if (container.id !== infoPanel.id) {
                    container.innerHTML = "";
                }
                this.setAttribute("visible", true);
            });

            // console.log("Current info panel insides: ", infoPanel.innerHTML);

            const idNumber = currentSphereIdNumber;
            if (currentInfoPanel) {
                document
                    .querySelector("#sphere" + currentInfoPanel)
                    .setAttribute("visible", true);
            }
            // document.querySelector("#info" + idNumber).style.display = "block";
            this.setAttribute("visible", false);
            currentInfoPanel = idNumber;
            console.log("Current info panel id: " + currentInfoPanel);
        });
    });