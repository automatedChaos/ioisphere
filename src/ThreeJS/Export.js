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
let vue = new Vue()

class Export {

  constructor(){

    this.nodes = null

    this.varsArray = [] // easier to check if exists like this
    this.varsInsert = ''
    this.setupInsert= ''
    this.loopInsert = ''

  }

  run (nodes){
    this.varsArray = [] // easier to check if exists like this
    this.varsInsert = ''
    this.setupInsert = ''
    this.loopInsert = ''
    this.nodes = nodes

    // loop through each node
    for (let node in nodes) {
      if (nodes.hasOwnProperty(node)) {
        // get node type so that we can process it
        let type = nodes[node].title

        switch(type){
          case 'Tick':
            this.processTick(node)
            break;
          default:
            // console.log('Node Unrecognised')
            break;
        }
      }
    }

    console.log(this.build())
  }

  processTick (i) {
    // add the vars
    this.varsInsert += `const int delay${this.nodes[i].id} = ${this.nodes[i].data.interval}; \nunsigned long prevTick${this.nodes[i].id} = millis(); \n`

    let tickInserts = ''

    let finished = false
    let count = 0
    let nextNode = i
    while(!finished){

      let n = this.nodes[nextNode].outputs[0].connections[0]
      if (n === undefined ){
        console.log(n)
        finished = true
      }else{
        //process the commands in here
        nextNode = this.nodes[nextNode].outputs[0].connections[0].node

        // work with the next node
        let type = this.nodes[nextNode].title

        switch(type){
          case 'LED Toggle':
            let ledNum = this.nodes[nextNode].data.LEDNum + ''
            // overwrite ledNum with var
            if (this.nodes[nextNode].inputs[1].connections[0]) {
              // get the node id
              let varNode = this.nodes[nextNode].inputs[1].connections[0].node
              // create the name
              ledNum = this.nodes[varNode].title + varNode
              // get if added to the vars
              this.processVar(varNode)
            }
            tickInserts+= this.processLEDToggle(this.nodes[nextNode].id, ledNum )
            break;
          case 'LED Write':
            tickInserts+= this.processLEDWrite(this.nodes[nextNode].id)
            break;
          case 'Sound':
            tickInserts+= this.processSound(this.nodes[nextNode].data.sound);
            break;
          case 'Subtract One':
            if (this.nodes[nextNode].inputs[1].connections[0]) tickInserts = this.processSubtractOne(nextNode)
            break;
          case 'Add One':
            if (this.nodes[nextNode].inputs[1].connections[0]) tickInserts = this.processAddOne(nextNode)
            break;
        }

      }

      // safety net
      count++;
      if (count > 3) finished = true
    }

    this.loopInsert+= this.tick(i, tickInserts)

  }

  processSubtractOne(id){
    let varID = this.nodes[id].inputs[1].connections[0].node
    // process the number
    this.processVar(varID);

    let title = this.nodes[varID].title

    return `
      ${title}${varID}--;
      if (${title}${varID} < 0) ${title}${varID} = ${this.nodes[id].data.max};`
  }

  processAddOne(id){
    let varID = this.nodes[id].inputs[1].connections[0].node
    // process the number
    this.processVar(varID);

    let title = this.nodes[varID].title

    return `
      ${title}${varID}++;
      if (${title}${varID} > ${this.nodes[id].data.max}) ${title}${varID} = ${this.nodes[id].data.start};`
  }

  processSound (num) {
    return `sendI2C(${num});`

  }

  processLEDWrite (id) {

    let ledNum = this.nodes[id].data.LEDNum + ''

    // overwrite ledNum with var
    if (this.nodes[id].inputs[1].connections[0]) {
      // get the node id
      let varNode = this.nodes[id].inputs[1].connections[0].node
      // create the name
      ledNum = this.nodes[varNode].title + varNode
      // get if added to the vars
      this.processVar(varNode)
    }

    let stateVal = (this.nodes[id].data.LEDState === 'true' ? 'LEDHIGH' : 'LEDLOW')
    return `anemone.ledWrite(${ledNum}, ${stateVal});\n`

  }

  processLEDToggle (id, LED) {
    this.varsInsert+= `bool bool${id} = true;`
    return `bool${id} = !bool${id}; \n
            int newState = (bool${id} ? LEDHIGH : LEDLOW);\n
            anemone.ledWrite(${LED}, newState);\n`
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
        prevTick${id} = now;
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

      ${this.variables(this.varsInsert)}

      ${this.variablesArray()}

      ${this.setup(this.setupInsert)}

      ${this.update(this.loopInsert)}

      ${this.i2c()}
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
  variables (insert) {

    return `
      ${insert}
    `
  }

  variablesArray (){
    let varString = ''
    for (let i = 0, l = this.varsArray.length; i < l; i+= 1){
      varString+= this.varsArray[i] + '\n'
    }
    return varString
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

  i2c(){
    return `
    void sendI2C(int num) {
      Wire.beginTransmission(4); // transmit to device #4

      Wire.write(num);           // sends one byte

      Wire.endTransmission();    // stop transmitting
    }
    `
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

  processVar(id){
    // work with the next node
    let type = this.nodes[id].title
    let name = type.replace(/\s/g, '');

    let newVar = ''
    switch(type){
      case 'Number':
        newVar = `int ${name}${id} = ${this.nodes[id].data.num};`
        break
      default:
        break
    }

    if (!this.varExists(newVar)) this.varsArray.push(newVar)
  }

  varExists (str) {
    if (this.varsArray.indexOf(str) > -1){
      return true
    }else{
      return false
    }
  }
}

export default Export
