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
function ToggleBoolean(){

  return new D3NE.Component('Toggle Boolean', {
    builder(node) {

      var processIn = new D3NE.Input('In', anySocket)
      var processOut = new D3NE.Output('Out', anySocket)
      var booleanIn = new D3NE.Input('Write', anySocket)



      return node
      .addInput(processIn)
      .addInput(booleanIn)
      .addOutput(processOut)
    },
    worker(node, inputs, outputs) {

    }
  });
}

export default ToggleBoolean
