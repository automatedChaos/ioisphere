/**
* @Author: Alcwyn Parker <alcwynparker>
* @Date:   2017-04-17T21:03:57+01:00
* @Email:  alcwynparker@gmail.com
* @Project: Concept Shed - Anenome
* @Filename: TickManager.js
 * @Last modified by:   alcwynparker
 * @Last modified time: 2018-04-24T23:22:03+01:00
*/

class Ticks {
  constructor(){
    this.ticks = []
    this.switchControls = null
  }

  /**
   * processTick - validates whether the tick should be added or not
   *
   * @param  {Object} tick node
   */
  processTick (tick) {
    if (!this.tickExists(tick.id)) {
      tick.prevTick =  window.performance.now()
      this.ticks.push(tick)
    }
  }

  setEnv (simulator){
    this.env = simulator
  }

  /**
   * tickExists - Checks the tick array for a tick with the same id
   *
   * @param  {String} id id of the tick
   * @return {boolean}   whether it exists or not
   */
  tickExists (id) {
    // filter out any that don't match
    let results = this.ticks.filter(ticks => { return ticks.id === id })
    // return result
    if (results.length > 0){
      return true
    }else{
      return false
    }
  }


  /**
   * update - called every requestAnimationFrame and used trigger ticks
   *
   * @param  {Number} now timestamp
   */
  update (now) {
    // loop through all the ticks and set previous tick to now
    for (let i = 0, l = this.ticks.length; i < l; i+= 1){

      // get time sensitive values
      let timePassed = now - this.ticks[i].prevTick;
      let interval = this.ticks[i].data.interval;

      // check to see if it is time to triger the node
      if (timePassed > interval){
        // process the nodes for this tick
        this.processTickNodes(i)
        // set prevTick to now ready for the next time around.
        this.ticks[i].prevTick = now
      }
    }
  }

  /**
   * processTickNodes - loop through and action all child nodes
   *
   * @param  {type} index description
   * @return {type}       description
   */
  processTickNodes (index) {
    console.log(index + ': TICK')
    this.switchControls.toggleLED(10)
    this.switchControls.updateLEDs()
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
}

export default Ticks
