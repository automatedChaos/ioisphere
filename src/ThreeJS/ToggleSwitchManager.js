/**
* @Author: Alcwyn Parker <alcwynparker>
* @Date:   2017-04-05T22:46:37+01:00
* @Email:  alcwynparker@gmail.com
* @Project: Anemone
* @Filename: ToggleSwitchManager.js
 * @Last modified by:   alcwynparker
 * @Last modified time: 2018-04-25T23:33:39+01:00
*/
import * as THREE from 'three'
import ToggleSwitch from './ToggleSwitch.js'

const LOW = false;
const HIGH = true;

class ToggleSwitchManager {
  constructor (parent, camera, rad) {
    'use strict'
    // create a mesh group and add it to the parent scene
    this._parent = parent
    this._camera = camera
    this._meshGroup = new THREE.Object3D()
    this._parent.add(this._meshGroup)

    this._rad = rad
    this._radOffset = 5
    this._toggleSwitches = []
    this._toggleSwitcheLocations = []

    this.switchNumbers = [1, 4, 9, 14, 19, 23, 27, 30, 33, 33]
    this.LEDTotal = this.calculateTotal(this.switchNumbers);

    this.addToggleSwitches(this.switchNumbers)

    this._LEDStates = this.clear(this.LEDTotal)

    this.ledWriteScript(192, true)

    this.setSwitches(this._LEDStates)

    this.runScript(3000)
  }

  /**
   * ledWrite - update a single LEDs state
   *
   * @param  {int} ledNumber
   * @param  {stateBool} a boolean that is mapped to zero or one
   */
  ledWrite (ledNumber, stateBool) {
    if (ledNumber < this._LEDStates.length) {
      // convert true of false to one or zero repectively
      let stateValue = (stateBool ? 1 : 0)

      // update state string with the new state spliced in
      this._LEDStates = `${this._LEDStates.substr(0, ledNumber)}${stateValue}${this._LEDStates.substr(ledNumber + 1)}`
    }else{
      console.log('ledNumber is out of range')
    }
  }

  ledWriteScript(ledNumber, stateBool){
    let code = `this.ledWrite(${ledNumber},${stateBool})`
    eval(code)
  }


  runScript (delay) {

    let helter = `
      var num = this.LEDTotal

      let timerCallback = () => {

        this._LEDStates = this.clear(this.LEDTotal)

        this.ledWrite(num, true)
        this.setSwitches(this._LEDStates)
        setTimeout(timerCallback,100)
        num--
        if (num === 0) num = this.LEDTotal
      }
      setTimeout(timerCallback, 3000)
    `

    let code = `
    var num = 0;
    let timerCallback = () => {
      this._LEDStates = this.randomStates(this.LEDTotal)
      this.setSwitches(this._LEDStates)
      setTimeout(timerCallback,10)
    }
    setTimeout(timerCallback,${delay})`

    eval(helter)
  }

  // r     is the Radius
  // alpha is the horizontal angle from the X axis
  // polar is the vertical angle from the Z axis
  addToggleSwitches (switchNum) {

      // switch and ring details
      var ringSpacing = 140/13.5
      var rad = this._rad + this._radOffset

      // loop through the rings
      for(var r = switchNum.length - 1; r >= 0; r--){

        // calculate the distance between switches
        var switchDist = 360/switchNum[r]

          // loop through each switch
          for (var i = 0; i < switchNum[r]; i++){

            // calculate polar in radians
            var polar = Math.radians(ringSpacing*r)
            var alpha = Math.radians(switchDist*i)

            // create new switch
            this.addSwitch( polar, alpha, rad)

          }
        }

      // orientate the toggle switches to face up
      this._meshGroup.rotation.x += Math.radians(-90);
  }

  /**
   * addSwitch - takes the polar coordinates and converts them to cartesian for
   * placing in the 3d scene. Then creates a switch and adds it to the array
   * r - is the Radius
   * alpha - is the horizontal angle from the X axis
   * polar - is the vertical angle from the Z axis
   *
   * @param  {Number} polar
   * @param  {Number} alpha
   * @param  {Number} rad
   */
  addSwitch (polar, alpha, rad) {
    // POLAR -> CARTESIAN
    var x = rad * Math.sin(polar) * Math.cos(alpha)
    var y = rad * Math.sin(polar) * Math.sin(alpha)
    var z = rad * Math.cos(polar);

    // Materials
    var onStateMaterial   = new THREE.MeshBasicMaterial( { color:0xef4224, wireframe: false } )
    var offStateMaterial  = new THREE.MeshBasicMaterial( { color:0x877c78, wireframe: false } )

    // Mesh
    var geometry = new THREE.SphereGeometry( 10, 32, 32 )

    var ts = new ToggleSwitch(this._meshGroup, geometry, x, y, z, onStateMaterial, offStateMaterial)

    // add the switch to the main array
    this._toggleSwitches.push( ts )
    this._toggleSwitcheLocations.push([x , y, z])
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
        this._toggleSwitches[i].digitalWrite(HIGH)
      }else{
        this._toggleSwitches[i].digitalWrite(LOW)
      }
    }
  }

  /**
   * clear - returns an array of 0s to represent the default of state
   *
   * @return {Array}  zeros
   */
  clear (numLEDs) {
    var zeros = ''
    for (let i = 0; i < numLEDs; i++ ){
      zeros+=(0)
    }
    return zeros
  }


  /**
   * randomStates - produces a certain number of random 0s and 1s in an arrat
   *
   * @param  {int} numLEDs
   * @return {Array}   zeros and ones
   */
  randomStates (numLEDs) {
    // generate some random test data
    var randomStates = ''
    for (let i = 0; i < numLEDs; i++){
      let newState = Math.random() < 0.95 ? 0 : 1
      randomStates+= newState
    }

    return randomStates
  }

  /**
   * calculateTotal - takes an array of numbers and adds them all togather
   *
   * @param  {Array} switchNumbers array that describes each ring of the sphere
   * @return {int}    The total number of switches
   */
  calculateTotal (switchNumbers) {
    var total = 0
    for (var i = 0, l = switchNumbers.length; i < l; i++){
      total += switchNumbers[i]
    }
    return total
  }
}

export default ToggleSwitchManager
