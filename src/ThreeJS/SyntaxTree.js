/**
* @Author: Alcwyn Parker <alcwynparker>
* @Date:   2017-04-17T21:03:57+01:00
* @Email:  alcwynparker@gmail.com
* @Project: Concept Shed - Anenome
* @Filename: TickManager.js
 * @Last modified by:   alcwynparker
 * @Last modified time: 2018-04-24T23:22:03+01:00
*/
import Vue from 'vue'
import {Howl, Howler} from 'howler';

class SyntaxTree {
  constructor(a){
    this.arduino = a
    this.nodes = null
    this.ticks = []
    this.onPlays = []
    this.switches = []

    this.vue = new Vue() // used for gaining access to the editor - update UI
  }

  /**
   * processSyntaxTree - Process the changes to the
   * syntax tree.
   *
   * @param  {object} nodes list of objects that represent nodes
   */
  processSyntaxTree (nodes) {

    // reset everything
    this.ticks = []
    this.onPlays = []
    this.switches = []

    // save a copy of the original syntax tree
    this.nodes = nodes

    // loop through each node
    for (let node in nodes) {
      if (nodes.hasOwnProperty(node)) {

        // get node type so that we can process it
        let type = nodes[node].title

        switch(type){
          case 'onPlay':
            this.onPlays.push(nodes[node])
            break;
          case 'Tick':
            // add the tick to the stack
            nodes[node].prevTick = performance.now()
            this.ticks.push(nodes[node])
            break;
          case 'Switch':
            // these should be checked every time
            this.switches.push(nodes[node])
            break;
          default:
            // console.log('Node Unrecognised')
            break;
        }
      }
    }
  }

  /**
   * setup - description
   *
   * @return {type}  description
   */
  setup () {
    // loop through all the ticks and set previous tick to now
    for (let i = 0, l = this.onPlays.length; i < l; i+= 1){

      // process node
      this.processNode(this.onPlays[i])
    }
  }

  /**
   * update - called every requestAnimationFrame and used trigger ticks
   *
   * @param  {Number} now timestamp
   */
  update (now) {

    // CHECK SWITCHES FIRST
    this.checkSwitches()

    // process everything else!
    this.checkTicks(now)
  }

  /**
   * checkSwitches - loop through and check for any active switches
   * process the node flow
   *
   */
  checkSwitches(){
    // loop through all the ticks and set previous tick to now
    for (let i = 0, l = this.switches.length; i < l; i+= 1){

      // check if switch is active
      if (this.arduino.checkSwitch (this.switches[i].data.num)) {

        console.log('Triggered switch ' + this.switches[i].data.num)
        // action
        //console.log(this.vue.$editor.instance.nodes.find(n => n.id === this.switches[i].id)) // .controls[0].setValue(newValue)
        // process node
        this.processNode(this.switches[i])
      }
    }
  }

  /**
   * checkTicks - process all of the ticks - fire their node flow if their time is up!
   *
   * @param  {type} now time from requestAnimationFrame
   */
  checkTicks(now){
    // loop through all the ticks and set previous tick to now
    for (let i = 0, l = this.ticks.length; i < l; i+= 1){

      // get time sensitive values
      let timePassed = now - this.ticks[i].prevTick;
      let interval = this.ticks[i].data.interval;

      // check to see if it is time to triger the node
      if (timePassed > interval){
        // process the nodes for this tick
        this.processTick(i)
        // set prevTick to now ready for the next time around.
        this.ticks[i].prevTick = now
      }
    }
  }

  /**
   * processTickNode - loop through and action all child nodes
   *
   * @param  {type} index description
   * @return {type}       description
   */
  processTick (index) {

    // get the out connections
    let connections = this.ticks[index].outputs[0].connections

    //stop process if there is nothing to do
    if (!connections) return false

    // check UI checkbox
    if (this.ticks[index].data.active === false) return false

    // get the first connection on this chain
    let node = this.nodes[connections[0].node]

    // begin a recursive process
    this.processNode(node)
  }

  processNode (node) {

    // run the script using the type
    this.executeCommand(node)

    // check if we have another node connected
    if (!node.outputs[0].connections[0]) return false

    // get nextNode ID
    let nextNodeID = node.outputs[0].connections[0].node
    if (!nextNodeID) return false

    // get the next node
    let nextNode = this.nodes[nextNodeID]

    // process the next node
    this.processNode(nextNode)
  }

  /**
   * executeCommand - check the node type and execute the expected behavior
   *
   * @return {type}  description
   */
  executeCommand (node) {

    if (node){

      let type = node.title
      console.log(type)
      switch(type){
        case 'Add One':
          this.exAddOne(node)
          break;
        case 'Subtract One':
          this.exSubtractOne(node)
          break;
        case 'Random':
          this.exRandom(node)
          break;
        case 'LED Toggle':
          //console.log(this.vue.$editor.instance.nodes.find(n => n.id === node.id).getStatement())
          this.arduino.toggleLED(node.data.LEDNum)
          break
        case 'LED Write':
          console.log(node.data.getStatement('asdfasdf'))
          this.arduino.ledWrite(node.data.LEDNum, node.data.LEDState)
          break;
        case 'Sound':
          this.exSound(node)
          break;
        default:
          break
      }
    }
  }

  /**
   * deactivateTicks - loops through and removes all the timers
   *
   * @return {type}  description
   */
  deactivateTicks () {
    // loop through all the ticks and set previous tick to now
    for (let i = 0, l = this.ticks.length; i < l; i+= 1){

    }
  }

  /**
   * activateTicks - loops through and adds all the timers
   */
  activateTicks (now) {
    // loop through all the ticks and set previous tick to now
    for (let i = 0, l = this.ticks.length; i < l; i+= 1){
      //this.ticks[i].prevTick = now;
    }
  }

  /**
   * exAddOne - executes the add one functionality
   *
   * @param  {type} node object for addOne
   */
  exAddOne (node) {
    if (node.inputs[1].connections[0]){
      // get the id of the number node - connected through the second input
      let numberNode = node.inputs[1].connections[0].node

      // update the data and UI
      let newValue = Number(this.vue.$editor.instance.nodes.find(n => n.id == numberNode).data.num) + 1

      // check we are in the range
      if (newValue > node.data.max) newValue = node.data.start

      //let originalValue = this.vue.$editor.instance.nodes.find(n => n.id === numberNode).controls[1].getData().num
      this.vue.$editor.instance.nodes.find(n => n.id === numberNode).controls[1].setValue(newValue)

      // Trigger on change event
      this.vue.$editor.instance.eventListener.trigger("change")
    }
  }

  /**
   * exSubtractOne - executes the add one functionality
   *
   * @param  {type} node object for addOne
   */
  exSubtractOne (node) {
    if (node.inputs[1].connections[0]){
      // get the id of the number node - connected through the second input
      let numberNode = node.inputs[1].connections[0].node

      // update the data and UI
      let newValue = Number(this.vue.$editor.instance.nodes.find(n => n.id == numberNode).data.num) - 1

      // check we are in the range
      if (newValue < node.data.start) newValue = node.data.max

      //let originalValue = this.vue.$editor.instance.nodes.find(n => n.id === numberNode).controls[1].getData().num
      this.vue.$editor.instance.nodes.find(n => n.id === numberNode).controls[1].setValue(newValue)

      // Trigger on change event
      this.vue.$editor.instance.eventListener.trigger("change")
    }
  }

  /**
   * exAddOne - executes the add one functionality
   *
   * @param  {type} node object for addOne
   */
  exRandom (node) {
    if (node.inputs[1].connections[0]){
      // get the id of the number node - connected through the second input
      let numberNode = node.inputs[1].connections[0].node
      console.log(node)
      // update the data and UI
      let newValue = this.getRandomInt(Number(node.data.min), Number(node.data.max))

      //let originalValue = this.vue.$editor.instance.nodes.find(n => n.id === numberNode).controls[1].getData().num
      this.vue.$editor.instance.nodes.find(n => n.id === numberNode).controls[1].setValue(newValue)

      // Trigger on change event
      this.vue.$editor.instance.eventListener.trigger("change")
    }
  }

  /**
   * exSound - execute the sound - using howler
   *
   * @param  {Object} node in question
   */

  exSound(node){

    let file = this.pad(node.data.sound, 3)
    var sound = new Howl({
      src: [require(`@/assets/audio/${file}.mp3`)]
    })
    sound.play();
  }

  /**
   * getTicks - returns the ticks - basic getter
   *
   * @return {Array}  list of ticks
   */
  getTicks () {
    return this.ticks
  }

  /**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
}

export default SyntaxTree
