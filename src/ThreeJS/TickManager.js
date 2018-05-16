/**
* @Author: Alcwyn Parker <alcwynparker>
* @Date:   2017-04-17T21:03:57+01:00
* @Email:  alcwynparker@gmail.com
* @Project: Concept Shed - Anenome
* @Filename: TickManager.js
 * @Last modified by:   alcwynparker
 * @Last modified time: 2018-04-24T23:22:03+01:00
*/
class TickManager {
  constructor(){
    this.ticks = []
  }


  /**
   * processTick - validates whether the tick should be added or not
   *
   * @param  {Object} tick node
   */
  processTick (tick) {
    if (!this.tickExists(tick.id)) this.ticks.push(tick)
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

  updateTicks () {
    console.log('UPDATE')
  }

  /**
   * deactivateTicks - loops through and removes all the timers
   *
   * @return {type}  description
   */
  deactivateTicks () {

  }

  /**
   * activateTicks - loops through and adds all the timers
   */
  activateTicks () {

  }

  outputTest () {
    console.log('magic')
  }
}

export default new TickManager()
