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
function Sound(){

  return new D3NE.Component("Sound", {
    builder(node) {

      var processIn = new D3NE.Input("In", anySocket)
      var processOut = new D3NE.Output("Out", anySocket)

      var numberIn = new D3NE.Input("Number", anySocket)

      let numTemplate = '<input type="number" min="0" max="62">'
      let numControl = new D3NE.Control(numTemplate, (element, control) => {
        control.putData('sound', '0'),
        control.setValue = val => {
          element.value = val
          control.putData('sound', val)
        },
        element.value = '0'
        element.addEventListener('change',()=>{
          control.putData('sound', element.value) // put data in the node under the key "num"
        });
      });

      return node
      .addInput(processIn)
      .addInput(numberIn)
      .addOutput(processOut)
      .addControl(numControl)
    },
    worker(node, inputs, outputs) {
      if (inputs[1][0]){
        node.data.sound = inputs[1][0]
        vue.$editor.instance.nodes.find(n => n.id == node.id).controls[0].setValue(inputs[1][0])
      }
    }
  });
}

export default Sound
