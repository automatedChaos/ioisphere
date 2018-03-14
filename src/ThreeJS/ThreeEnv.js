/**
* @Author: Alcwyn Parker <alcwynparker>
* @Date:   2017-03-28T21:35:37+01:00
* @Email:  alcwynparker@gmail.com
* @Project: GiffGaff - SpaceJunk
* @Filename: scripts.js
 * @Last modified by:   alcwynparker
 * @Last modified time: 2018-03-14T00:19:34+00:00
*/
/* eslint-disable */
import * as THREE from 'three'
import * as OC from 'three-orbit-controls'
let OrbitControls = OC(THREE)

import * as SubdivisionModifier from 'three-subdivision-modifier'
import ToggleSwitchManager from './ToggleSwitchManager.js'

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

class ThreeEnv {
  constructor(window, document) {
    'use strict'

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

    this.horGeometry
    this.horSmooth
    this.bottomBlock
    this.topBlock
    this.verGeometry
    this.verSmooth
    this.leftBlock
    this.rightBlock
    this.cornerCircleGeometry
    this.tl
    this.tr
    this.bl
    this.br
    this.backgroundGeometry
    this.background;

    this.anemone
    this.anemoneRad = 650
    this.mainSphere
    this.mainSphereGeometry
    this.switchManager

    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()
    this.sphere =  new THREE.MeshBasicMaterial( {transparent: true,  color: 0xd4d0c3, alpha: 0.1})
    this.sphere.opacity = 0.5

    this.init()
    this.animate()
  }


  /**
   * init - setup the three environment
   *
   */
  init (){

    this.container = document.getElementById('renderer')
    //this.container.addEventListener( 'click', this.onMouseClick, false );
    this.containerWidth = this.container.parentElement.offsetWidth;
    this.containerHeight = this.container.parentElement.offsetHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xffffff );

  	this.camera = new THREE.PerspectiveCamera( 75, this.containerWidth / this.containerHeight, 1, 10000 );
  	this.camera.position.z = 2000
    this.camera.position.y = -300

    var light = new THREE.PointLight( 0xff0000, 1, 100 )
    light.position.set( 0, 50, 600 );
    this.scene.add( light );

    this.renderer = new THREE.WebGLRenderer()
  	this.renderer.setSize(this.container.parentElement.offsetWidth, this.container.parentElement.offsetHeight, true  )// window.innerWidth, window.innerHeight );
    this.renderer.render( this.scene, this.camera );

    this.controls = new OrbitControls( this.camera, this.renderer.domElement )

    // enable animation loop when using damping or autorotation
    //controls.enableDamping = true;
    //controls.dampingFactor = 0.25;
    this.controls.enableZoom = false;
    this.controls.addEventListener( 'change', this.render );


  	this.container.appendChild( this.renderer.domElement );
    console.log(this.renderer.domElement)

    this.material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
    this.backgroundGeometry = new THREE.BoxGeometry(2000, 200, 2000);
    this.background = new THREE.Mesh( this.backgroundGeometry, GREY );
    this.background.position.y = -500;
    this.scene.add(this.background);

    this.mainSphereGeometry = new THREE.SphereGeometry( this.anemoneRad, 32, 32 );

    this.mainSphere = new THREE.Mesh( this.mainSphereGeometry, this.sphere );
    this.scene.add( this.mainSphere );
    this.mainSphere.position.x = 0;
    this.mainSphere.position.z = 0;
    this.mainSphere.position.y = 0;

    this.cornerCircleGeometry = new THREE.SphereGeometry( 170, 12, 12 );

    this.tl = new THREE.Mesh( this.cornerCircleGeometry, YELLOW );
    this.scene.add( this.tl );
    this.tl.position.x = -600;
    this.tl.position.z = 600;
    this.tl.position.y =  -450;

    this.tr = new THREE.Mesh( this.cornerCircleGeometry, RED );
    this.scene.add( this.tr );
    this.tr.position.x = 600;
    this.tr.position.z = 600;
    this.tr.position.y = -450;

    this.bl = new THREE.Mesh( this.cornerCircleGeometry, DARK_BROWN );
    this.scene.add( this.bl );
    this.bl.position.x = -600;
    this.bl.position.z = -600;
    this.bl.position.y =  -450;

    this.br = new THREE.Mesh( this.cornerCircleGeometry, PINK );
    this.scene.add( this.br );
    this.br.position.x = 600;
    this.br.position.z = -600;
    this.br.position.y =  -450;

    this.horGeometry = new THREE.BoxGeometry(700, 200, 200,4, 4, 4  );
    this.verGeometry = new THREE.BoxGeometry(200, 200, 700,4, 4, 4  );

    var modifier = new SubdivisionModifier( 2 );

    this.horSmooth = modifier.modify( this.horGeometry );
    this.verSmooth = modifier.modify( this.verGeometry );

    this.bottomBlock = new THREE.Mesh( this.horSmooth, ORANGE );
    this.scene.add( this.bottomBlock );

    this.bottomBlock.position.y = -450;
    this.bottomBlock.position.z = 700;

    this.topBlock = new THREE.Mesh( this.horSmooth, BLUE );
    this.scene.add( this.topBlock );

    this.topBlock.position.y = -450;
    this.topBlock.position.z = -700;

    this.leftBlock = new THREE.Mesh( this.verSmooth, GREEN );
    this.scene.add( this.leftBlock );

    this.leftBlock.position.y = -450;
    this.leftBlock.position.x = -700;
    this.leftBlock.position.z = 0;

    this.rightBlock = new THREE.Mesh( this.verSmooth, PURPLE);
    this.scene.add( this.rightBlock );

    this.rightBlock.position.y = -450;
    this.rightBlock.position.x = 700;
    this.rightBlock.position.z = 0;


    this.switchManager = new ToggleSwitchManager(this.scene, this.camera, this.anemoneRad);
  }


  /**
   * onMouseClick - handle the click events. Mainly used for toggling the switches
   *
   * @param  {object} event information about the event
   */
  onMouseClick( event ){
    // calculate mouse position in normalized device coordinates
  	// (-1 to +1) for both components

  	this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  	this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    // update the picking ray with the camera and mouse position
    this.raycaster.setFromCamera( mouse, camera );

    // calculate objects intersecting the picking ray

    var intersects = raycaster.intersectObjects( switchManager._meshGroup.children );

    // only interact with the first intersect
    if (intersects.length > 0)	intersects[ 0 ].object.material.color.set( 0xff0000 );
  }


  /**
   * animate - manage the animation loop
   *
   */
  animate() {

  	requestAnimationFrame( this.animate.bind(this) )
  	this.switchManager._meshGroup.rotation.z += 0.001
    this.checkDims();
  	this.render()

  }


  /**
   * render - manage the render
   *
   */
  render() {

    this.renderer.render( this.scene, this.camera );
  }

  checkDims () {
    if (this.containerHeight != this.container.parentElement.offsetHeight ||
      this.containerWidth != this.container.parentElement.offsetWidth){

      this.containerWidth = this.container.parentElement.offsetWidth
      this.containerHeight = this.container.parentElement.offsetHeight
      this.camera = new THREE.PerspectiveCamera( 75, this.containerWidth / this.containerHeight, 1, 10000 );
      this.renderer.setSize( this.containerWidth, this.containerHeight, true  )
      this.controls = new OrbitControls( this.camera, this.renderer.domElement )

      this.camera.position.z = 2000
      this.camera.position.y = -300

      var light = new THREE.PointLight( 0xff0000, 1, 100 )
    }

  }

}

export default ThreeEnv
