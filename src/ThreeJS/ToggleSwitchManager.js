/**
* @Author: Alcwyn Parker <alcwynparker>
* @Date:   2017-04-05T22:46:37+01:00
* @Email:  alcwynparker@gmail.com
* @Project: Anemone
* @Filename: ToggleSwitchManager.js
 * @Last modified by:   alcwynparker
 * @Last modified time: 2018-04-23T13:56:11+01:00
*/
import * as THREE from 'three'
import ToggleSwitch from './ToggleSwitch.js'

class ToggleSwitchManager {
  constructor (parent, camera, rad) {
    'use strict'
    // create a mesh group and add it to the parent scene
    this._parent = parent
    this._camera = camera
    this._meshGroup = new THREE.Object3D();
    this._parent.add(this._meshGroup);

    this._rad  = rad;
    this._radOffset = 5;
    this._toggleSwitches = [];
    this._toggleSwitcheLocations = [];

    this._testData1 = [];
    this._testData2 = [];
    this._testData3 = [];


    this.addToggleSwitches()

  }

  // r     is the Radius
  // alpha is the horizontal angle from the X axis
  // polar is the vertical angle from the Z axis
  addToggleSwitches () {

      // switch and ring details
      var switchNum = [1, 4, 9, 14, 19, 23, 27, 30, 33, 33]
      var ringSpacing = 140/13
      var rad = this._rad + this._radOffset

      // loop through the rings
      for(var r = 0; r < switchNum.length - 1; r++){

        // calculate the distance between switches
        var switchDist = 360/switchNum[r]

          // loop through each switch
          for (var i = 0; i < switchNum[r]; i++){

            // calculate polar in radians
            var polar = Math.radians(ringSpacing*r);
            var alpha = Math.radians(switchDist*i);


            // create new switch
            this.addSwitch( polar, alpha, rad);

          }
        }

      // orientate the toggle switches to face up
      this._meshGroup.rotation.x += Math.radians(-90);
  }


  addSwitch (polar, alpha, rad) {


    // POLAR -> CARTESIAN
    var x = rad * Math.sin(polar) * Math.cos(alpha);
    var y = rad * Math.sin(polar) * Math.sin(alpha);
    var z = rad * Math.cos(polar);

    // Materials
    var onStateMaterial   = new THREE.MeshBasicMaterial( { color:0xff0000, wireframe: false } );
    var offStateMaterial  = new THREE.MeshBasicMaterial( { color:0x00ff00, wireframe: false } );

    // Mesh
    var geometry = new THREE.SphereGeometry( 10, 32, 32 );

    var ts = new ToggleSwitch(this._meshGroup, geometry, x, y, z, onStateMaterial, offStateMaterial);

    // add the switch to the main array
    this._toggleSwitches.push( ts );
    this._toggleSwitcheLocations.push([x , y, z]);

    // generate some random test data
    var randomState;
    randomState = Math.random() < 0.95 ? 0 : 1;
    this._testData1.push(randomState);
    randomState = Math.random() < 0.95 ? 0 : 1;
    this._testData2.push(randomState);
    randomState = Math.random() < 0.95 ? 0 : 1;
    this._testData3.push(randomState);

  }


/**
 * ToggleSwitchManager.prototype.setSwitches - Takes a string of 0s and 1s and
 * applies them to the switches as if it were the protocol.
 *
 * @param  {string} 0s & 1s
 */
  setSwitches (bits) {

    for (var i = 0, l = bits.length; i < l; i+= 1){

      if (bits.charAt(i) === '1'){
        this._toggleSwitches[i].digitalWrite(HIGH);
      }else{
        this._toggleSwitches[i].digitalWrite(LOW);
      }
    }
  }
}

export default ToggleSwitchManager
