/**
* @Author: Alcwyn Parker <alcwynparker>
* @Date:   2017-03-28T21:35:37+01:00
* @Email:  alcwynparker@gmail.com
* @Project: GiffGaff - SpaceJunk
* @Filename: scripts.js
 * @Last modified by:   alcwynparker
 * @Last modified time: 2018-04-23T22:33:35+01:00
*/
/* eslint-disable */
import * as THREE from 'three'
import * as OC from 'three-orbit-controls'
let OrbitControls = OC(THREE)

import * as SubdivisionModifier from 'three-subdivision-modifier'
import Arduino from './Arduino.js'
import Ticks from './Ticks.js'

const HIGH  = 1
const LOW   = 0

const RED         = new THREE.MeshBasicMaterial( { color:0xee4122, wireframe: false } )
const BLUE        = new THREE.MeshBasicMaterial( { color:0x00b3e0, wireframe: false } )
const ORANGE      = new THREE.MeshBasicMaterial( { color:0xf7931e, wireframe: false } )
const GREEN       = new THREE.MeshBasicMaterial( { color:0x00bf9e, wireframe: false } )
const PURPLE      = new THREE.MeshBasicMaterial( { color:0x5551a3, wireframe: false } )
const BROWN       = new THREE.MeshBasicMaterial( { color:0xd4d0c3, wireframe: false } )
const DARK_BROWN  = new THREE.MeshBasicMaterial( { color:0x8e7f78, wireframe: false } )
const PINK        = new THREE.MeshBasicMaterial( { color:0xffdccb, wireframe: false } )
const WHITE       = new THREE.MeshBasicMaterial( { color:0xffffff, wireframe: false } )
const YELLOW      = new THREE.MeshBasicMaterial( { color:0xffcd00, wireframe: false } )
const GREY        = new THREE.MeshBasicMaterial( { color:0xaaaaaa, wireframe: false } )


Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

class Simulation {
  constructor(window, document) {
    'use strict'

    this.ticks = new Ticks()

    this.container // the elm that the three env is appended to
    this.containerWidth
    this.containerHeight
    this.scene
    this.camera
    this.renderer
    this.controls
    this.geometry
    this.anemoneMaterial
    this.material
    this.mesh


    this.anemone
    this.anemoneRad = 650
    this.mainSphere
    this.mainSphereGeometry
    this.base
    this.baseGeometry

    this.arduino

    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()
    this.sphere =  new THREE.MeshBasicMaterial( {transparent: true,  color: 0xd4d0c3, alpha: 0.1})
    this.sphere.opacity = 0.5

    this.rings = [33,  33,  30,  27,  23, 19, 14, 9,  4]

    this.init()
    this.animate()
  }


  /**
   * init - setup the three environment
   *
   */
  init (){

    //  get the DOM element
    this.container = document.getElementById('renderer')
    this.containerWidth = this.container.parentElement.offsetWidth
    this.containerHeight = this.container.parentElement.offsetHeight

    // create a basic scene
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color( 0xAAAAAA )

    // LIGHTS
    var light = new THREE.PointLight( 0xff0000, 1, 100 )
    light.position.set( 0, 50, 600 )
    this.scene.add( light )

    // CAMERA
  	this.camera = new THREE.PerspectiveCamera( 75, this.containerWidth / this.containerHeight, 1, 10000 )

    // ACTION
    this.renderer = new THREE.WebGLRenderer()
  	this.renderer.setSize(this.container.parentElement.offsetWidth, this.container.parentElement.offsetHeight, true  )// window.innerWidth, window.innerHeight );
    this.renderer.render( this.scene, this.camera )
    this.container.appendChild( this.renderer.domElement );

    // add the drag controls
    this.controls = new OrbitControls( this.camera, this.renderer.domElement )
    // enable animation loop when using damping or autorotation
    //controls.enableDamping = true;
    //controls.dampingFactor = 0.25;
    this.controls.enableZoom = false;

    // add the objects to the scene
    this.addGeometry()
    this.arduino = new Arduino(this.scene, this.camera, this.anemoneRad)

    // add all event listeners
    this.addOnControlsChange()
    this.addOnMouseClick()
    this.addOnWindowResize()
  }

  /**
   * addGeometry - creates the core geometry
   *
   */
  addGeometry () {

      // add sphere
      this.mainSphereGeometry = new THREE.SphereGeometry( this.anemoneRad, 32, 32 );
      this.mainSphere = new THREE.Mesh( this.mainSphereGeometry, this.sphere );
      this.scene.add( this.mainSphere );
      this.mainSphere.position.x = 0;
      this.mainSphere.position.z = 0;
      this.mainSphere.position.y = 0;

      // add base
      this.baseGeometry = new THREE.CylinderGeometry( this.anemoneRad+ 50, this.anemoneRad + 50, 650, 200 );
      this.base = new THREE.Mesh(this.baseGeometry, WHITE);
      this.scene.add(this.base);
      this.base.position.x = 0;
      this.base.position.z = 0;
      this.base.position.y = -400;
  }

  /**
   * addOnControlsChange - waits for the controls to move the sphere and
   * renders the new position
   *
   */
  addOnControlsChange () {

    let onControlsChange = (event) => {
      this.render()
    }
    this.controls.addEventListener( 'change', onControlsChange )
  }

  /**
   * addOnWindowChange - create and add the onWindowResize Listener
   *
   */
  addOnWindowResize () {

    let onWindowResize = (event) => {

      this.camera.aspect = this.containerWidth / this.containerHeight;
			this.camera.updateProjectionMatrix();

			this.renderer.setSize( this.containerWidth, this.containerHeight );
    }

    window.addEventListener( 'resize', onWindowResize, false );
  }


  /**
   * addOnMouseClick - handle the click events. Mainly used for toggling the switches
   *
   * @param  {object} event information about the event
   */
  addOnMouseClick () {

    let onMouseClick = (event) => {

      console.log('asdfasfdsdfs')
      // calculate mouse position in normalized device coordinates
      // (-1 to +1) for both components

      this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

      // update the picking ray with the camera and mouse position
      this.raycaster.setFromCamera( this.mouse, this.camera );

      // calculate objects intersecting the picking ray

      var intersects = this.raycaster.intersectObjects( this.arduino._meshGroup.children );

      // only interact with the first intersect
      if (intersects.length > 0)	intersects[ 0 ].object.material.color.set( 0xff0000 );

    }

    this.container.addEventListener( 'click', onMouseClick, false );

  }


  /**
   * animate - manage the animation loop
   *
   */
  animate() {

  	requestAnimationFrame( this.animate.bind(this) )
  	this.arduino._meshGroup.rotation.z += 0.001
    this.checkDims();
  	this.render()

  }


  /**
   * render - manage the render
   *
   */
  render() {
    //console.log(this.renderer)
    if (this.renderer != null){
      this.renderer.render( this.scene, this.camera )
    }
  }


  /**
   * checkDims - used for resizing the canvas
   *
   */
  checkDims () {
    if (this.containerHeight != this.container.parentElement.offsetHeight ||
      this.containerWidth != this.container.parentElement.offsetWidth){

      this.containerWidth = this.container.parentElement.offsetWidth
      this.containerHeight = this.container.parentElement.offsetHeight
      this.camera = new THREE.PerspectiveCamera( 75, this.containerWidth / this.containerHeight, 1, 10000 );
      this.renderer.setSize( this.containerWidth, this.containerHeight, true  )
      this.controls = new OrbitControls( this.camera, this.renderer.domElement )

      // position the camera
      this.camera.position.z = 1150
      this.camera.position.y = 300

      // aim the camerea
      let point = new THREE.Vector3(0, 200, 0)
      this.camera.lookAt( point )


      var light = new THREE.PointLight( 0xff0000, 1, 100 )
    }
  }

}

export default Simulation
