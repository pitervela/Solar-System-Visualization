define(
[
  'Environment/Constants',
  'Environment/Stats'
  // 'Controllers/TimeController'
],
function(Constants, Stats) {
  'use strict';

  // class RenderController extends THREE.WebGLRenderer {
  //   constructor(scene, threePlanets) {
  //     super();

  //     this._scene = scene;
  //     this._threePlanets = threePlanets;
  //   };

  //   render() {
  //     requestAnimationFrame(this.render);
  //     super.render(this._scene, this._scene.camera);
  //   };
  // }

  var tweening = false;

  document.addEventListener('travelStart', (e)=> {
    tweening = true;
  }, false);

  document.addEventListener('travelComplete', (e)=> {
    tweening = false;
  }, false);

  function getElapsedTimeSec(start, end) {
    return (end - start) * 0.001;
  }

  function roundHundred(value) {
    return Math.round(value / 100) * 100;
  }

  function RenderController(scene, planets) {
    this._renderEngine = new THREE.WebGLRenderer();
    this._scene = scene;
    this._camera = scene.camera;
    this._planets = planets || [];

    this.setFrame();

    var self = this;

    var frameEvent = new CustomEvent('frame');

    function render() {
      // Moniter javascript performance
      Stats.begin();

      requestAnimationFrame(render);
      document.dispatchEvent(frameEvent);
      self._renderEngine.render(self._scene, self._camera);

      // console.debug('Tweening?', tweening);

      if (tweening) {
        TWEEN.update();
      }

      Stats.end();
    }

    render();
  }

  RenderController.prototype.setFrame = function() {
    var framecontainer = document.getElementById('solar-system');

    if (framecontainer) {
      framecontainer.appendChild(this._renderEngine.domElement);
    } else {
      document.body.appendChild(this._renderEngine.domElement);
    }

    this._renderEngine.setSize(window.innerWidth, window.innerHeight);
  };

  return RenderController;
});

