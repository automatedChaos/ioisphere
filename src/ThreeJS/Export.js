/**
* @Author: Alcwyn Parker <alcwynparker>
* @Date:   2017-04-17T21:03:57+01:00
* @Email:  alcwynparker@gmail.com
* @Project: Concept Shed - Anenome
* @Filename: TickManager.js
 * @Last modified by:   alcwynparker
 * @Last modified time: 2018-04-24T23:22:03+01:00
 *
 * Download textfile with name:
 * https://jsfiddle.net/UselessCode/qm5AG/
*/
import Vue from 'vue'

class Export {

  constructor(){

    this.nodes = null
    this.ticks = []
    this.onPlays = []
    this.switches = []

    this.varsArray = [] // easier to check if exists like this
    this.varsInsert = ''
    this.setupInsert = ''
    this.loopInsert = ''

    this.vue = new Vue() // used for gaining access to the editor - update UI

  }

  run () {
    this.processTicks()
  }

  /**
   * processNode - description
   *
   * @param  {type} id description
   * @return {type}    description
   */
  processNodeChain (node) {

    // get the out connections
    let connections = node.outputs[0].connections

    //stop process if there is nothing to do
    if (!connections[0]) return false

    // get the first connection on this chain
    let nodeID = this.nodes[connections[0].node]

    // get the first connection on this chain
    node = this.nodes[connections[0].node]


    let finished = false
    let inserts = ''
    let count = 0

    while (!finished){
      count++

      console.log('process' + count)
      if (count > 10) finished = true
      // action this node

      // check if we have another node connected
      if (!node.outputs[0].connections[0]) {
        finished = true
        return false
      }

      // get nextNode ID
      let nextNodeID = node.outputs[0].connections[0].node
      if (!nextNodeID) {
        finished = true
        return false
      }

      // get the next node
      node = this.nodes[nextNodeID]

    }


    // loop through all of the others



    return inserts

    /*
    switch (node.title){
      case 'Add One':
        // check it has connection, create a ++ statement
        break;
      case 'Subtract One':
        // check it has connection, create a -- statement
        break;
      case 'Random':
        // check it has connection, create random number
        break;
      case 'LED Toggle':
        statement+= `bool testState = anemone.ledRead(${node.data.LEDNum});`
        statement+= `if (testState == true){
          anemone.ledWrite(${node.data.LEDNum}, ${LEDLOW});
        }else{
          anemone.ledWrite(${node.data.LEDNum}, ${LEDHIGH});
        }`
        break
      case 'LED Write':
        // read state set LED
        let state = (node.data.LEDState === 'HIGH' ? 'LEDHIGH' : 'LEDLOW')
        statement = `anemone.ledWrite(${node.data.LEDNum}, ${state});`
        break;
      case 'Sound':
        statement = `sendI2C(${num});`
        break;
      default:
        break
    }*/
  }

  /**
   * processTicks - loop through an array of ticks and create the arduino code
   *
   * @return {String}
   */
  processTicks () {
    for (let i = 0, l = this.ticks.length; i < l; i+= 1){
      // create a unique idea
      let uID = this.guid()

      // create the variables
      let delayVar = `const int delay${uID} = ${this.ticks[i].data.interval}; \n`
      let prevTick = `unsigned long prevTick${uID} = millis(); \n`

      // add the vars
      this.vars+= delayVar
      this.vars+= prevTick

      let tickInsert = this.processNodeChain(this.ticks[i])
      let tickIf = this.tick(uID, 'Serial.println("booop"); \n')

      this.loopInsert+= tickIf
    }
  }

  /**
   * tick - description
   *
   * @param  {type} id     description
   * @param  {type} insert description
   * @return {type}        description
   */
  tick (id, insert) {
    return `
    \/\/ TICK BEAT ${id}
    if (now - prevTick${id} > delay${id}) {
        ${insert}
    } \n`
  }

  /**
   * build - pieces everything together
   *
   * @return {String}  the final sketch
   */
  build(){
    return `
      ${this.includes()}

      ${this.vars}

      ${this.setup(this.setupInsert)}

      ${this.update(this.loopInsert)}
    `
  }

  // BUILDER FUNCTIONS --------------------------------------------
  /**
   * update - the update functionality of the sketch
   *
   * @param  {string} insert the new functionality generated from editor
   * @return {string}        final update functionality
   */
  update (insert) {
    return `
    void loop() {
      unsigned long now = millis();

      // process, send and receive everything!
      anemone.update();

      ${insert}

    }`
  }

  /**
   * vars - add variables for the sketch
   *
   * @param  {string} insert new variables from the editor
   * @return {string}        the final variable list for the skecth
   */
  vars (insert) {
    return `
      Anemone anemone(8);

      ${insert}
    `
  }

  /**
   * setup - The basic sketch setup with an insert at the bottom for any
   * new setup
   *
   * @param  {string} insert a string that adds functionality to the setpu
   * @return {string}        setup function
   */
  setup (insert) {
    return `void setup() {
      Bridge.begin();  // Initialize the Bridge
      SerialUSB.begin(9600);  // Initialize the Serial

      // Wait until a Serial Monitor is connected.
      // while (!SerialUSB);
      SPI.begin();
      Serial.begin(115200);
      Wire.begin(); // join i2c bus (address optional for master)

      // reset the sphere
      anemone.clear();
      anemone.saveSwitchStates();

      Serial.println("Anemone Ready!");
      randomSeed(analogRead(A3));
      delay(500);

      ${insert}
    }`
  }


  /**
   * includes - returns all of the includes for the Arduino sketch
   *
   * @return {String}  includes
   */
  includes () {
    return `
      //  Important! You must have these libraries installed in the Arduino IDE
      #include <Wire.h>
      #include <Anemone.h>
      #include <SPI.h>
      #include <Bridge.h>
      #include <Process.h>

      Anemone anemone(8);`
  }


  /**
   * guid - craete a new ID
   * https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
   *
   * @return {String}  unique id
   */
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4();
  }



  setNodes (n) {
    this.nodes = n
  }

  setTicks (t) {
    this.ticks = t
  }

  setOnPlays (p){
    this.onPlays = p
  }

  setSwitches (s) {
    this.switches = s
  }
}

export default Export
