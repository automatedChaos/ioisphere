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

class Export {
  constructor(){
    console.log(this.build())
  }

  /**
   * build - pieces everything together
   *
   * @return {String}  the final sketch
   */
  build(){
    return `
      ${this.includes()}

      ${this.vars()}

      ${this.setup()}

      ${this.update()}
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
      #include <Process.h>`
  }
}

export default Export
