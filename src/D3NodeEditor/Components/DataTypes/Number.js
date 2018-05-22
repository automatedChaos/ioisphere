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
function Number(){

  return new D3NE.Component("Number", {
    builder(node) {

      var processIn = new D3NE.Input("In", anySocket)
      var processOut = new D3NE.Output("Out", anySocket)


      let numTemplate = '<input type="number" placeholder="LED Number">'
      let numControl = new D3NE.Control(numTemplate, (element, control) => {
        control.putData('LEDNum', '0')
        element.value = '0'
        element.addEventListener('change',()=>{
          control.putData('LEDNum', element.value) // put data in the node under the key "num"
        });
      });

      return node
      .addInput(processIn)
      .addOutput(processOut)
      .addControl(numControl)
    },
    worker(node, inputs, outputs) {

    }
  });
}

export default Number
