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
function tick(){

  return new D3NE.Component('Tick', {
    builder(node) {

      let outSocket = new D3NE.Output('Start', anySocket)
      let activeSocket = new D3NE.Input('Active', anySocket)

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

      var activeTemplate = '<div class="checkbox-container">Active: <input class="checkbox" type="checkbox" checked></div>'
      var activeControl = new D3NE.Control(activeTemplate, (element, control) => {
        element.value = true
        element.addEventListener('change',()=>{

          // update the checked box value
          control.putData('active', element.childNodes[1].checked) // put data in the node under the key "num"
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

    }
  });
}

export default tick
