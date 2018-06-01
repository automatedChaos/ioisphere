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
function tick(){

  return new D3NE.Component('Tick', {
    builder(node) {

      let outSocket = new D3NE.Output('Start', anySocket)
      let activeSocket = new D3NE.Input('Read Boolean', anySocket)

      let nameTemplate = '<input type="text" placeholder="Unique name">'
      let nameControl = new D3NE.Control(nameTemplate, (element, control) => {
        control.putData('name', '')
        element.value = ''
        element.addEventListener('change',()=>{
          control.putData('name', element.value) // put data in the node under the key "num"
        });
      });

      var numTemplate = '<input type="number" placeholder="Interval">'
      var numControl = new D3NE.Control(numTemplate, (element, control) => {
        control.putData('interval', 1000)
        element.value = 1000
        element.addEventListener('change',()=>{
          control.putData('interval', element.value) // put data in the node under the key "num"
        });
      });

      let activeTemplate = `<select>
        <option value="true">ACTIVE</option>
        <option value="false">IDLE</option>
      </select>`

      let activeControl = new D3NE.Control(activeTemplate, (element, control) => {
        control.putData('active', 'true')
        control.setValue = val => {

          console.log('setter ' + val)
          element.value = val
          control.putData('active', val)
        }
        element.value = 'true'
        element.addEventListener('change',()=>{
          control.putData('active', element.value) // put data in the node under the key "num"
        });
      });


      return node
      .addControl(nameControl)
      .addControl(numControl)
      .addControl(activeControl)
      .addOutput(outSocket)
      .addInput(activeSocket)

    },
    worker(node, inputs, outputs) {

      if (inputs[0][0]){
        console.log('worker ' + inputs[0][0])
        node.data.active = inputs[0][0]
        vue.$editor.instance.nodes.find(n => n.id == node.id).controls[2].setValue(inputs[0][0])
      }
    }
  });
}

export default tick
