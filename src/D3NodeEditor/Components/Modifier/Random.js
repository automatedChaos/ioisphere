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
function Random(){

  return new D3NE.Component('Random', {
    builder(node) {

      var processIn = new D3NE.Input('In', anySocket)
      var processOut = new D3NE.Output('Out', anySocket)
      var numberIn = new D3NE.Input('Write', anySocket)

      let maxTemplate = '<div><label>MAX</label><input type="number"></div>'
      let maxControl = new D3NE.Control(maxTemplate, (element, control) => {
        control.putData('max', '192'),
        element.childNodes[1].value = '192'
        element.addEventListener('change',()=>{
          control.putData('max', element.childNodes[1].value) // put data in the node under the key "num"
        });
      });

      let startTemplate = '<div><label>MIN</label><input type="number"></div>'
      let startControl = new D3NE.Control(startTemplate, (element, control) => {
        control.putData('min', '0'),
        element.childNodes[1].value = '0'
        element.addEventListener('change',()=>{
          control.putData('min', element.childNodes[1].value) // put data in the node under the key "num"
        });
      });

      return node
      .addInput(processIn)
      .addInput(numberIn)
      .addControl(startControl)
      .addControl(maxControl)
      .addOutput(processOut)
    },
    worker(node, inputs, outputs) {

    }
  });
}

export default Random
