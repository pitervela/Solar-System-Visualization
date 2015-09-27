define(function() {
  'use strict';

  class Scene extends THREE.Scene {
    constructor() {
      super();

      this._camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5 * Math.pow(10, 12));

      this.setCamera();
      this.setLights();
      this.setAxis();
    };

    get camera() {
      return this._camera;
    };

    setCamera() {
      this._camera.position.set(0, 0, 300);
      this._camera.lookAt(new THREE.Vector3(0,0,0));
    };

    setLights() {
      var ambientLightCount = 4;

      for (var i = 0; i < ambientLightCount; i++) {
        var directionalLight = new THREE.DirectionalLight(0xffffff, 0.85);

        this.setObjectPosition(directionalLight, i);

        super.add(directionalLight);
      }
    };

    setObjectPosition(object, index) {
      switch(index) {
        case 0:
          object.position.set(0, 0, 1000);
          break;
        case 1:
          object.position.set(0, 0, -1000);
          break;
        case 2:
          object.position.set(1000, 0, 0);
          break;
        case 3:
          object.position.set(-1000, 0, 0);
          break;
      }
    };

    setAxis() {
      // this.rotation.x = 90 * 0.0174532925;
    };
  }

  return Scene;
});
