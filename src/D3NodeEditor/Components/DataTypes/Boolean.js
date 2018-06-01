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
function Boolean(){

  return new D3NE.Component("Boolean", {
    builder(node) {

      var processOut = new D3NE.Output("Read/Write", anySocket)

      let nameTemplate = '<input type="text" placeholder="Unique name">'
      let nameControl = new D3NE.Control(nameTemplate, (element, control) => {
        control.putData('name', '')
        element.value = ''
        element.addEventListener('change',()=>{
          control.putData('name', element.value) // put data in the node under the key "num"
        });
      });


      let stateTemplate = `<select>
        <option value="true">TRUE</option>
        <option value="false">FALSE</option>
      </select>`

      let stateControl = new D3NE.Control(stateTemplate, (element, control) => {
        control.putData('state', 'true')
        control.toggleValue = val => {

          // generate the new values
          let newVal = (element.value === 'true' ? 'false' : 'true')
          let newData = (newVal === 'TRUE' ? 'true' : 'false')

          // set the new values
          element.value = newVal
          control.putData('state', newVal)
        }
        element.value = 'true'
        element.addEventListener('change',()=>{
          control.putData('state', element.value) // put data in the node under the key "num"
        });
      });


      return node
      .addOutput(processOut)
      .addControl(nameControl)
      .addControl(stateControl)
    },
    worker(node, inputs, outputs) {
      outputs[0] = node.data.state
    }
  });
}

export default Boolean
