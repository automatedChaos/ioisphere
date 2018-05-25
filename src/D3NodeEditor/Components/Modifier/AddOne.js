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
function AddOne(){

  return new D3NE.Component("Add One", {
    builder(node) {

      var processOut = new D3NE.Output("Out", anySocket)

      let maxTemplate = '<input type="number">'
      let maxControl = new D3NE.Control(maxTemplate, (element, control) => {
        control.putData('max', '100'),
        element.value = '100'
        element.addEventListener('change',()=>{
          control.putData('max', element.value) // put data in the node under the key "num"
        });
      });

      let startTemplate = '<input type="number" >'
      let startControl = new D3NE.Control(startTemplate, (element, control) => {
        control.putData('start', '0'),
        element.value = '0'
        element.addEventListener('change',()=>{
          control.putData('start', element.value) // put data in the node under the key "num"
        });
      });

      return node
      .addControl(startControl)
      .addControl(maxControl)
      .addOutput(processOut)
    },
    worker(node, inputs, outputs) {

    }
  });
}

export default AddOne
