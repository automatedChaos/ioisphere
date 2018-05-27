/**
 * @Author: alcwynparker
 * @Date:   2018-02-21T21:15:17+00:00
 * @Last modified by:   alcwynparker
 * @Last modified time: 2018-05-03T00:02:41+01:00
 */
import anySocket from '../Socket/Any.js'
import Vue from 'vue'
let vue = new Vue()

/**
* toggleLED
*
* @return {Coponent Object}
*/
function LEDWrite(){

  return new D3NE.Component("LED Write", {
    builder(node) {

      var processIn = new D3NE.Input("In", anySocket)
      var processOut = new D3NE.Output("Out", anySocket)

      var numberIn = new D3NE.Input("Number", anySocket)

      let numTemplate = '<input type="number" placeholder="LED Number">'
      let numControl = new D3NE.Control(numTemplate, (element, control) => {
        control.putData('LEDNum', '0'),
        control.setValue = val => {
          element.value = val
          control.putData('LEDNum', val)
        },
        element.value = '0'
        element.addEventListener('change',()=>{
          control.putData('LEDNum', element.value) // put data in the node under the key "num"
        });
      });

      let stateTemplate = `<select>
        <option value="true">ON</option>
        <option value="false">OFF</option>
      </select>`

      let stateControl = new D3NE.Control(stateTemplate, (element, control) => {
        control.putData('LEDState', 'true')
        element.value = 'false'
        element.addEventListener('change',()=>{
          control.putData('LEDState', element.value) // put data in the node under the key "num"
        });
      });

      return node
      .addInput(processIn)
      .addInput(numberIn)
      .addOutput(processOut)
      .addControl(numControl)
      .addControl(stateControl)
    },
    worker(node, inputs, outputs) {
      if (inputs[1][0]){
        node.data.LEDNum = inputs[1][0]
        vue.$editor.instance.nodes.find(n => n.id == node.id).controls[0].setValue(inputs[1][0])
      }
    }
  });
}

export default LEDWrite
