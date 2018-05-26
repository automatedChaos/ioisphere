/**
* @Author: Alcwyn Parker <alcwynparker>
* @Date:   2017-04-17T21:03:57+01:00
* @Email:  alcwynparker@gmail.com
* @Project: Concept Shed - Anenome
* @Filename: ToggleSwitch.js
 * @Last modified by:   alcwynparker
 * @Last modified time: 2018-04-24T23:22:03+01:00
*/
import * as THREE from 'three'

class ToggleSwitch {
  constructor(parent, geom, x, y, z, onStateMaterial, offStateMaterial){

    this._parent = parent
    this._geom = geom
    this._x = x
    this._y = y
    this._z = z
    this._lat = undefined
    this._lng = undefined

    this._onStateMaterial = onStateMaterial
    this._offStateMaterial = offStateMaterial

    this._sphere = new THREE.Mesh( this._geom, this._offStateMaterial )
    this._led = null
    // Position
    this._sphere.position.x = this._x
    this._sphere.position.y = this._y
    this._sphere.position.z = this._z

    this._sphere._onStateMaterial = this._onStateMaterial
    this._sphere._offStateMaterial = this._offStateMaterial

    this._sphere.index = 5

    // add the mesh to the scene
    this._parent.add( this._sphere )

  }

  setLED(LEDPos){

    var g = new THREE.SphereGeometry( 7, 32, 32 )

    this._led = new THREE.Mesh( g, this._onStateMaterial )
    this._led.index = this._sphere.index
    this._led.position.x = LEDPos.x
    this._led.position.y = LEDPos.y
    this._led.position.z = LEDPos.z

    this._parent.add( this._led )
  }

  digitalWrite (state) {

    if (state){
      this._led.material = this._onStateMaterial
    }else{
      this._led.material =  this._offStateMaterial
    }
  }

  setIndex (i){
    this._sphere.index = i
  }
}

export default ToggleSwitch
