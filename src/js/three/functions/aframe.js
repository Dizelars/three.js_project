// import * as AFRAME from "aframe";
// require('aframe');

// AFRAME.registerComponent('rotation-reader', {
//     init() {
//         this.onDeviceOrientation = this.onDeviceOrientation.bind(this);
//         this.addEventListeners();
//     },
//
//     addEventListeners() {
//         window.addEventListener('deviceorientation', this.onDeviceOrientation);
//     },
//
//     onDeviceOrientation(event) {
//         const cameraEl = this.el;
//         const { alpha, beta, gamma } = event;
//
//         // Применение поворота к камере
//         cameraEl.setAttribute('rotation', {
//             x: beta,
//             y: alpha,
//             z: -gamma
//         });
//     }
// });