/**
* @Author: Alcwyn Parker <alcwynparker>
* @Date:   2017-04-17T21:03:57+01:00
* @Email:  alcwynparker@gmail.com
* @Project: Concept Shed - Anenome
* @Filename: TickManager.js
 * @Last modified by:   alcwynparker
 * @Last modified time: 2018-04-24T23:22:03+01:00
*/

class SyntaxTree {
  constructor(a){
    this.arduino = a
    this.nodes = null
    this.ticks = []
    this.switchControls = null
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

    // save a copy of the original syntax tree
    this.nodes = nodes

    // loop through each node
    for (let node in nodes) {
      if (nodes.hasOwnProperty(node)) {

        // get node type so that we can process it
        let type = nodes[node].title

        switch(type){
          case 'Tick':
            // add the tick to the stack
            nodes[node].prevTick = performance.now()
            this.ticks.push(nodes[node])
            break;
          default:
            console.log('Node Unrecognised')
            break;
        }
      }
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

      switch(type){
        case 'ToggleLED':
          // console.log(node.data.LEDNum)
          this.arduino.toggleLED(node.data.LEDNum)
          break
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
}

export default SyntaxTree
