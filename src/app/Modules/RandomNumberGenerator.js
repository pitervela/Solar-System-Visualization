define(function() {
  'use strict';

  class RandomNumberGenerator {
    constructor(base) {
      this.base = Number.parseFloat(base);
    }

    /**
     * Gets a random point of a sphere, evenly distributed over the sphere.
     * The sphere is centered at (x0,y0,z0) with the passed in radius.
     * The returned point is returned as a three element array [x,y,z].
     *
     * @return Vector3 [THREE object]
     */
    getRandomPointInSphere(radius, x0, y0, z0){
      if (!x0) { x0 = 0 }
      if (!y0) { y0 = 0 }
      if (!z0) { z0 = 0 }

      var u = Math.random();
      var v = Math.random();
      var theta = 2 * Math.PI * u;
      var phi = Math.acos(1 - 2 * v);
      var x = x0 + (radius * Math.sin(phi) * Math.cos(theta));
      var y = y0 + (radius * Math.sin(phi) * Math.sin(theta));
      var z = z0 + (radius * Math.cos(phi));

      return new THREE.Vector3(x, y, z);
    }

    /**
     * Gets a random number based off arbitrary timestamps and randomizing with other operations.
     * This method facilitates randomizing the position of the astroids.
     *
     * @return integer
     */
    getRandomNumber() {
      var randomNumA = new Date().getMilliseconds() - (new Date().getMilliseconds() / 3.5);
      var randomNumB = Math.random() * randomNumA;

      if (randomNumB > 80) {
          return Number.parseFloat(randomNumB - 100 * Math.PI / 2);
      }

      return randomNumB;
    }

    /**
     * Gets a random number between a range min and range max.
     *
     * @param rangeMin [integer]
     * @param rangeMax [integer]
     * @return integer
     */
    getRandomNumberWithinRange(rangeMin, rangeMax) {
      // Create byte array and fill with 1 random number
      var byteArray = new Uint8Array(1);

      window.crypto.getRandomValues(byteArray);

      var range = rangeMax - rangeMin + 1;
      var maxRange = rangeMax;

      if (byteArray[0] >= Math.floor(maxRange / range) * range) {
        return this.getRandomNumberWithinRange(rangeMin, rangeMax);
      }

      return rangeMin + (byteArray[0] % range);
    }
  }

  return RandomNumberGenerator;
});
