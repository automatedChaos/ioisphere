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

      var processOut = new D3NE.Output("Out", anySocket)

      let nameTemplate = '<input type="text" placeholder="Unique name">'
      let nameControl = new D3NE.Control(nameTemplate, (element, control) => {
        control.putData('name', '')
        element.value = ''
        element.addEventListener('change',()=>{
          control.putData('name', element.value) // put data in the node under the key "num"
        });
      });


      let numTemplate = '<input type="number" placeholder="LED Number">'
      let numControl = new D3NE.Control(numTemplate, (element, control) => {
        control.putData('num', '0')
        control.setValue = val => {
          element.value = val
          control.putData('num', val)
        }
        element.value = '0'
        element.addEventListener('change',()=>{
          control.putData('num', element.value) // put data in the node under the key "num"
        });
      });

      return node
      .addOutput(processOut)
      .addControl(nameControl)
      .addControl(numControl)
    },
    worker(node, inputs, outputs) {
      outputs[0] = node.data.num
    }
  });
}

export default Number
