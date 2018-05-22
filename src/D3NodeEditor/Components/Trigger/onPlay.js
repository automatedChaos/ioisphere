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
function onPlay(){

  return new D3NE.Component("onPlay", {
    builder(node) {

      let outSocket = new D3NE.Output("Start", anySocket)

      return node
      .addOutput(outSocket)

    },
    worker(node, inputs, outputs) {

    }
  });
}

export default onPlay
