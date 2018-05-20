/**
 * @Author: alcwynparker
 * @Date:   2018-02-21T21:15:17+00:00
 * @Last modified by:   alcwynparker
 * @Last modified time: 2018-05-03T00:02:41+01:00
 */
import anySocket from '../Socket/Any.js'
/**
* toggleLED
*
* @return {Coponent Object}
*/
function toggleLED(){

  return new D3NE.Component("ToggleLED", {
    builder(node) {
      var processIn = new D3NE.Input("In", anySocket)
      var processOut = new D3NE.Output("Out", anySocket)

      var numControl = new D3NE.Control(
        '<input type="number" placeholder="LED Number">'
      );

      return node
      .addInput(processIn)
      .addOutput(processOut)
      .addControl(numControl)
    },
    worker(node, inputs, outputs) {

    }
  });
}

export default toggleLED
